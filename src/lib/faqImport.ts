/**
 * Parse pasted FAQ text into question/answer pairs for the CMS importer.
 *
 * Editors paste FAQs from wherever they were drafted — a Doc, a ChatGPT reply,
 * a competitor page, a JSON-LD blob lifted from a SERP — and each source has its
 * own shape. Rather than making the editor reformat by hand, this recognises the
 * handful of shapes that actually turn up:
 *
 *   Q: … / A: …            (also "Question:" / "Answer:", "Q1." , "1) Q -")
 *   ## Heading / body      (markdown headings, or **bold question** lines)
 *   1. Question? / body    (numbered lists)
 *   Question?\nAnswer      (bare lines, question detected by the "?")
 *   blank-line blocks      (first line question, rest answer)
 *   JSON                   ([{question,answer}] or a schema.org FAQPage)
 *
 * Pure and side-effect free so the behaviour can be reasoned about (and tested)
 * without a DOM.
 */

export type ParsedFaq = { question: string; answer: string };

/** "**Q1. What is …?**" → "What is …?" — strips markers editors paste along. */
function clean(s: string): string {
  return s
    .replace(/^\s*[>\-*•]+\s*/, "")            // quote/bullet markers
    .replace(/^\s*#{1,6}\s*/, "")               // markdown heading
    .replace(/^\s*\d+\s*[.)\]]\s*/, "")         // "1." / "2)" / "3]"
    .replace(/^\s*(?:\*\*|__)\s*/, "")          // opening bold
    .replace(/\s*(?:\*\*|__)\s*$/, "")          // closing bold
    .replace(/^\s*(?:Q(?:uestion)?|A(?:nswer)?)\s*\d*\s*[:.)\-–]\s*/i, "") // Q:/A:
    .replace(/^\s*\d+\s*[.)\]]\s*/, "")         // number that sat behind a label
    .replace(/^["“'']+|["”'']+$/g, "")          // wrapping quotes
    .trim();
}

const isQLabel = (l: string) => /^\s*(?:\*\*|__)?\s*(?:Q|Question)\s*\d*\s*[:.)\-–]/i.test(l);
const isALabel = (l: string) => /^\s*(?:\*\*|__)?\s*(?:A|Ans|Answer)\s*\d*\s*[:.)\-–]/i.test(l);
const isHeading = (l: string) => /^\s*#{1,6}\s+\S/.test(l);
const isNumbered = (l: string) => /^\s*\d+\s*[.)\]]\s+\S/.test(l);
const isBoldLine = (l: string) => /^\s*(?:\*\*|__).+(?:\*\*|__)\s*:?\s*$/.test(l);
const endsWithQuestion = (l: string) => /\?\s*["”'']?\s*$/.test(l);

/** Drop rows an editor would have to delete anyway. */
const usable = (f: ParsedFaq) => f.question.length > 0 && f.answer.length > 0;

const finish = (rows: ParsedFaq[]): ParsedFaq[] =>
  rows
    .map((r) => ({ question: r.question.trim(), answer: r.answer.trim() }))
    .filter(usable);

/**
 * JSON path: a plain array of objects, or a schema.org FAQPage / @graph blob.
 * Returns null (not []) when the input is not JSON, so the caller falls through
 * to the text parsers rather than reporting "0 found".
 */
function parseJson(raw: string): ParsedFaq[] | null {
  if (!/^\s*[[{]/.test(raw)) return null;

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }

  const out: ParsedFaq[] = [];

  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;
    const o = node as Record<string, unknown>;

    // Containers: FAQPage.mainEntity, a JSON-LD @graph, or a { faqs: [...] } wrapper.
    for (const key of ["mainEntity", "@graph", "faqs", "faq", "items", "questions"]) {
      if (o[key]) walk(o[key]);
    }

    const q = o.question ?? o.q ?? o.name ?? o.title;
    // schema.org nests the text one level down in acceptedAnswer.
    const accepted = o.acceptedAnswer as Record<string, unknown> | undefined;
    const a = o.answer ?? o.a ?? o.text ?? o.body ?? accepted?.text;

    if (typeof q === "string" && typeof a === "string") {
      out.push({ question: clean(q), answer: clean(a) });
    }
  };

  walk(data);
  return out.length ? finish(out) : null;
}

/**
 * Marker-driven pass: every question is announced by something (a Q: label, a
 * heading, a number, a bold line), so a new marker closes the previous answer.
 */
function parseByMarker(lines: string[], isMarker: (l: string) => boolean): ParsedFaq[] {
  const rows: ParsedFaq[] = [];
  let current: ParsedFaq | null = null;
  let answerLines: string[] = [];

  const flush = () => {
    if (current) {
      current.answer = answerLines.join("\n").trim();
      rows.push(current);
    }
    answerLines = [];
  };

  for (const line of lines) {
    if (isMarker(line)) {
      flush();
      current = { question: clean(line), answer: "" };
      continue;
    }
    if (!current) continue; // preamble before the first question
    // An "A:" label just introduces the answer — keep the text, drop the label.
    answerLines.push(isALabel(line) ? clean(line) : line.trim());
  }
  flush();

  return finish(rows);
}

/** Blank-line blocks: first line is the question, the remainder is the answer. */
function parseByBlock(raw: string): ParsedFaq[] {
  const blocks = raw
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const rows: ParsedFaq[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const lines = blocks[i].split("\n").map((l) => l.trim()).filter(Boolean);

    if (lines.length >= 2) {
      rows.push({ question: clean(lines[0]), answer: lines.slice(1).map(clean).join("\n") });
      continue;
    }
    // A lone question line takes the next block as its answer.
    if (lines.length === 1 && endsWithQuestion(lines[0]) && blocks[i + 1]) {
      rows.push({ question: clean(lines[0]), answer: clean(blocks[i + 1]) });
      i++;
    }
  }

  return finish(rows);
}

export function parseFaqInput(raw: string): ParsedFaq[] {
  const text = (raw ?? "").replace(/\r\n?/g, "\n").trim();
  if (!text) return [];

  const json = parseJson(text);
  if (json) return json;

  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  // Most specific marker first: an explicit Q: label beats a heading beats a
  // number beats a bare "?". Checking in this order stops a numbered list of
  // "Q1. …" from being split twice.
  if (lines.some(isQLabel)) return parseByMarker(lines, isQLabel);
  if (lines.some(isHeading)) return parseByMarker(lines, isHeading);
  if (lines.some(isNumbered)) return parseByMarker(lines, isNumbered);
  if (lines.some(isBoldLine)) return parseByMarker(lines, isBoldLine);

  // No markers at all. If some lines end in "?" treat those as the questions;
  // otherwise fall back to blank-line blocks.
  if (lines.some(endsWithQuestion)) {
    const byQuestion = parseByMarker(lines, endsWithQuestion);
    if (byQuestion.length) return byQuestion;
  }

  return parseByBlock(text);
}
