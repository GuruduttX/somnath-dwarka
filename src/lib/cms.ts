/**
 * Field accessors for CMS docs returned by `.lean()`, which are plain objects
 * typed as Record<string, unknown>. Keeps route files free of casts.
 */
import type { RelatedLink } from "@/src/components/shared/RelatedLinks";

export type Doc = Record<string, unknown>;

export const s = (d: Doc, k: string, fallback = ""): string =>
  typeof d[k] === "string" && d[k] ? (d[k] as string) : fallback;

export const num = (d: Doc, k: string, fallback = 0): number =>
  typeof d[k] === "number" ? (d[k] as number) : fallback;

export const bool = (d: Doc, k: string): boolean => d[k] === true;

export const list = <T>(d: Doc, k: string): T[] =>
  Array.isArray(d[k]) ? (d[k] as T[]) : [];

/** A VerifyField publishes its value only once an editor has verified it. */
export const verifiedValue = (d: Doc, k: string): string | null => {
  const f = d[k] as { value?: string; verified?: boolean } | undefined;
  return f?.verified && f.value ? f.value : null;
};

/**
 * Drop the URL map's "— Itinerary, Price & Booking" tail.
 *
 * That phrase is a keyword pattern from the v5 URL map, not a headline: it
 * repeats on every money page and says nothing a reader needs. Some CMS docs
 * were seeded carrying it, and an editor can always paste it back in, so strip
 * it on read. The function is idempotent, so re-stripping a clean title is safe.
 */
export const stripHeadTail = (text: string): string =>
  text.replace(/\s*[—–:-]\s*Itinerary,\s*Price (?:&|and)\s*Booking\s*$/i, "").trim();

export const h1Of = (d: Doc): string => stripHeadTail(s(d, "h1") || s(d, "title"));
export const titleOf = (d: Doc): string => stripHeadTail(s(d, "title_tag") || s(d, "title"));
export const descOf = (d: Doc): string =>
  s(d, "meta_description") || s(d, "answer_first") || h1Of(d);

/** The leading whole sentences of `text` that fit within `max` characters. */
export const leadSentences = (text: string, max: number): string => {
  let out = "";
  for (const sentence of text.match(/[^.!?]+[.!?]+/g) ?? []) {
    const next = `${out} ${sentence.trim()}`.trim();
    if (next.length > max) break;
    out = next;
  }
  return out;
};

/**
 * descOf for a package or package hub, which is a money page: when the editor
 * has written neither a meta description nor an answer-first line, say what
 * the page offers instead of repeating the H1 as the snippet. `about` is a
 * factual summary of the place (the destination theme's standfirst), used
 * only in whole sentences.
 */
export const packageDescOf = (d: Doc, about?: string): string => {
  const own = s(d, "meta_description") || s(d, "answer_first");
  if (own) return own;
  const h1 = h1Of(d);
  const duration = s(d, "duration");
  const lead = `${h1}${duration ? ` (${duration})` : ""}.`;
  const context = about ? leadSentences(about, 155 - lead.length - 1) : "";
  if (context) return `${lead} ${context}`;
  // The longest pitch that still fits, so the snippet never ends mid-word.
  const pitch = [
    "Planned by a local Gujarat team: share your dates for a day-wise plan, named hotels and a price.",
    "Share your dates for a day-wise plan and price from a local team.",
    "Get a day-wise plan and price.",
  ].find((p) => lead.length + 1 + p.length <= 155);
  return pitch ? `${lead} ${pitch}` : lead;
};

export const faqOf = (d: Doc) =>
  list<{ question: string; answer: string }>(d, "faq").filter((f) => f.question && f.answer);

/** Editor-authored related links, merged on top of the rules in lib/links.ts. */
export const relatedOf = (d: Doc): RelatedLink[] =>
  list<RelatedLink>(d, "related_links").filter((l) => l.target && l.anchor);
