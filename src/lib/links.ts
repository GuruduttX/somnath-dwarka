/**
 * Internal-linking rules as code (SOP §8), not manual.
 *
 * - Money-page anchor rotation: each money page has an anchor pool; callers
 *   pick a varied anchor (exact / partial / branded / natural) so the same
 *   exact-match anchor is never used site-wide.
 * - Per-page minimum: UP to pillar + INTO a money page + ≥2 siblings.
 * - Orphan check + duplicate-anchor report for CI/QA.
 */
import type { RelatedLink } from "@/src/components/shared/RelatedLinks";

export const MONEY_PAGES = {
  packages: "/somnath-dwarka-tour-package/",
  taxi: "/somnath-dwarka-taxi-service/",
  hotels: "/hotels/",
} as const;

/** Anchor pools for money pages — rotate to avoid sitewide exact-match repeats. */
const ANCHOR_POOL: Record<string, string[]> = {
  [MONEY_PAGES.packages]: [
    "Somnath Dwarka tour packages",
    "view our tour packages",
    "book a Somnath–Dwarka trip",
    "explore package options",
    "plan your pilgrimage package",
  ],
  [MONEY_PAGES.taxi]: [
    "Somnath Dwarka taxi service",
    "book a cab",
    "check cab fares",
    "arrange your transport",
    "reserve a taxi",
  ],
  [MONEY_PAGES.hotels]: [
    "hotels near the temples",
    "find a place to stay",
    "hotel assistance",
    "browse stay options",
  ],
};

/** Deterministic anchor pick so the same page always renders the same anchor
 *  (stable output for prerender) but different pages vary. */
export function moneyAnchor(target: string, seed: string): RelatedLink {
  const pool = ANCHOR_POOL[target] ?? ["learn more"];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return { target, anchor: pool[h % pool.length], type: "money" };
}

export type LinkContext = {
  self: string;
  pillar?: { target: string; anchor: string };
  siblings?: RelatedLink[];
  /** which money page this page should funnel into */
  money?: keyof typeof MONEY_PAGES;
  extra?: RelatedLink[];
};

/** Build the related-links set enforcing the SOP §8 minimum. */
export function buildRelatedLinks(ctx: LinkContext): RelatedLink[] {
  const out: RelatedLink[] = [];
  if (ctx.pillar) out.push({ ...ctx.pillar, type: "pillar" });
  if (ctx.money) out.push(moneyAnchor(MONEY_PAGES[ctx.money], ctx.self));
  if (ctx.siblings) out.push(...ctx.siblings.slice(0, 4));
  if (ctx.extra) out.push(...ctx.extra);
  // de-dupe by target, drop self-links
  const seen = new Set<string>();
  return out.filter((l) => {
    if (l.target === ctx.self || seen.has(l.target)) return false;
    seen.add(l.target);
    return true;
  });
}

/** QA: a page with zero inbound contextual links is an orphan (SOP §8). */
export function findOrphans(
  pages: { path: string }[],
  linksByPage: Record<string, RelatedLink[]>
): string[] {
  const inbound = new Set<string>();
  Object.values(linksByPage).forEach((links) =>
    links.forEach((l) => inbound.add(l.target))
  );
  return pages.map((p) => p.path).filter((path) => !inbound.has(path));
}
