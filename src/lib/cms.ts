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
 * That phrase is a keyword pattern from scripts/data/url-map-v5.json, not a
 * headline: it repeats on every money page and says nothing a reader needs. The
 * seed scripts already strip it at write time, but docs seeded before that (and
 * anything re-imported from the map) still carry it, so strip it on read too —
 * the function is idempotent, so doing both is safe.
 */
export const stripHeadTail = (text: string): string =>
  text.replace(/\s*[—–:-]\s*Itinerary,\s*Price (?:&|and)\s*Booking\s*$/i, "").trim();

export const h1Of = (d: Doc): string => stripHeadTail(s(d, "h1") || s(d, "title"));
export const titleOf = (d: Doc): string => stripHeadTail(s(d, "title_tag") || s(d, "title"));
export const descOf = (d: Doc): string =>
  s(d, "meta_description") || s(d, "answer_first") || h1Of(d);

export const faqOf = (d: Doc) =>
  list<{ question: string; answer: string }>(d, "faq").filter((f) => f.question && f.answer);

/** Editor-authored related links, merged on top of the rules in lib/links.ts. */
export const relatedOf = (d: Doc): RelatedLink[] =>
  list<RelatedLink>(d, "related_links").filter((l) => l.target && l.anchor);
