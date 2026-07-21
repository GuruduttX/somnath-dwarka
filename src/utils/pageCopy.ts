/**
 * Map the stored long-form copy to and from the editor's shape.
 *
 * The documents were written by seed scripts and are not internally consistent:
 * whyChoose carries `points` while notForYou carries `items`, and decision /
 * priceMatrix may be absent or null rather than empty. Normalising at this one
 * boundary keeps that out of both the editor UI and the page components.
 */
import {
  emptyPageCopy,
  type PageCopyState,
} from "@/src/components/Admin/PackageEditor/PageCopy";

const str = (v: unknown) => String(v ?? "");
const strArr = (v: unknown) => (Array.isArray(v) ? v.map(str) : []);
const rows = (v: unknown) => (Array.isArray(v) ? v.map((r) => strArr(r)) : []);

const newId = (): string =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;

/** Stored document -> editor state. */
export function toPageCopyState(data: Record<string, unknown> | null | undefined): PageCopyState {
  if (!data) return emptyPageCopy();

  const d = (data.decision ?? {}) as Record<string, unknown>;
  const pm = (data.priceMatrix ?? {}) as Record<string, unknown>;
  const wc = (data.whyChoose ?? {}) as Record<string, unknown>;
  const nf = (data.notForYou ?? {}) as Record<string, unknown>;

  return {
    decision: {
      title: str(d.title),
      // Seed JSON stores the intro as an array of paragraphs on some packages
      // and a single string on others; the page renders one block either way.
      intro: Array.isArray(d.intro) ? strArr(d.intro).join("\n\n") : str(d.intro),
      headers: strArr(d.headers),
      rows: rows(d.rows),
      note: str(d.note),
    },
    sections: (Array.isArray(data.sections) ? data.sections : []).map((s) => {
      const sec = (s ?? {}) as Record<string, unknown>;
      return { id: newId(), h2: str(sec.h2), body: strArr(sec.body) };
    }),
    priceMatrix: { headers: strArr(pm.headers), rows: rows(pm.rows) },
    whyChoose: { title: str(wc.title), items: strArr(wc.points) },
    notForYou: { title: str(nf.title), items: strArr(nf.items) },
    priceNotes: strArr(data.priceNotes),
    finalCta: str(data.finalCta),
  };
}

/**
 * Editor state -> payload. Blocks the editor left completely empty are sent as
 * null so a package that never had them does not gain an empty shell that the
 * page would then try to render.
 */
export function fromPageCopyState(state: PageCopyState) {
  const decisionFilled =
    state.decision.title.trim() || state.decision.intro.trim() || state.decision.rows.length;
  const matrixFilled = state.priceMatrix.rows.length || state.priceMatrix.headers.length;
  const clean = (xs: string[]) => xs.map((x) => x.trim()).filter(Boolean);

  return {
    decision: decisionFilled
      ? {
          title: state.decision.title,
          intro: state.decision.intro,
          headers: state.decision.headers,
          rows: state.decision.rows,
          note: state.decision.note,
        }
      : null,
    sections: state.sections
      .map((s) => ({ h2: s.h2, body: clean(s.body) }))
      .filter((s) => s.h2.trim() && s.body.length),
    priceMatrix: matrixFilled
      ? { headers: state.priceMatrix.headers, rows: state.priceMatrix.rows }
      : null,
    whyChoose: clean(state.whyChoose.items).length
      ? { title: state.whyChoose.title, points: clean(state.whyChoose.items) }
      : null,
    notForYou: clean(state.notForYou.items).length
      ? { title: state.notForYou.title, items: clean(state.notForYou.items) }
      : null,
    priceNotes: clean(state.priceNotes),
    finalCta: state.finalCta,
  };
}
