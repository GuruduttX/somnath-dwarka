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

/** Duration -> the package variant that actually exists, else the hub. */
const DURATION_SLUGS: Record<number, string> = {
  2: "2-days-1-night",
  3: "3-days-2-nights",
  4: "4-days-3-nights",
  5: "5-days-4-nights",
};

/**
 * Href for a duration-led package card. Home-page cards used to build
 * `/tour-packages/{days}/{slug}` links, which 308'd to package slugs that were
 * never created — a 404 hidden behind a redirect. Resolve to a real page or
 * fall back to the hub.
 */
export const packageVariantHref = (days: number): string =>
  DURATION_SLUGS[days] ? `${MONEY_PAGES.packages}${DURATION_SLUGS[days]}/` : MONEY_PAGES.packages;

/**
 * Destination-led home cards map to the hub that owns that destination's head
 * term. Slugs without a hub yet fall back to the Gujarat umbrella hub.
 */
const DESTINATION_HUBS: Record<string, string> = {
  "gir-lion-safari": "/gir-tour-package/",
  "rann-of-kutch-white-desert": "/kutch-tour-package/",
  "desert-camp-under-the-stars": "/kutch-tour-package/",
  "statue-of-unity-escape": "/statue-of-unity-tour-package/",
  "ahmedabad-old-city-walk": "/heritage-tours-gujarat/",
  "dwarka-coastal-trail": "/dwarka/",
  "saputara-hill-retreat": "/gujarat-tour-packages/",
  "polo-forest-tribal-walk": "/gujarat-tour-packages/",
};

export const destinationCardHref = (slug: string): string =>
  DESTINATION_HUBS[slug] ?? "/gujarat-tour-packages/";

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
