/**
 * The package variants the URL map authorises under /gujarat-tour-packages/.
 *
 * Mirrors config/packageSpokes.ts and config/girPackageSpokes.ts for the state
 * umbrella hub: 11 spokes from the v5 URL map. A CMS record whose
 * slug is not here is not part of the planned architecture and never reaches
 * the money page.
 *
 * The buckets are the explorer's five groups, read against what this hub
 * actually sells: `route` is the multi-day circuits, `duration` the short
 * single-temple trips, `city` the round trips from outside Gujarat, and
 * `traveller` the corporate plan. Nothing here is sold by transport.
 */
export type GujaratPackageBucket = "duration" | "city" | "traveller" | "route";

export type GujaratPackageSpoke = {
  wave: string;
  bucket: GujaratPackageBucket;
};

export const GUJARAT_PACKAGE_SPOKES: Record<string, GujaratPackageSpoke> = {
  "dwarka-somnath-nageshwar-jyotirlinga-tour": { wave: "B", bucket: "route" },
  "saurashtra-darshan": { wave: "B", bucket: "route" },
  "complete-gujarat-yatra": { wave: "C", bucket: "route" },
  "heritage-unesco-circuit": { wave: "C", bucket: "route" },
  "wildlife-safari-circuit": { wave: "C", bucket: "route" },
  "pavagadh-mahakali-tour": { wave: "C", bucket: "duration" },
  "dakor-ranchhodrai-tour": { wave: "C", bucket: "duration" },
  "modhera-becharaji-circuit": { wave: "C", bucket: "duration" },
  "from-mumbai": { wave: "C", bucket: "city" },
  "from-delhi": { wave: "C", bucket: "city" },
  "corporate-offsite": { wave: "D1", bucket: "traveller" },
};

export const isAuthorisedGujaratPackage = (slug: string): boolean =>
  slug in GUJARAT_PACKAGE_SPOKES;

export const gujaratPackageBucket = (slug: string): GujaratPackageBucket | null =>
  GUJARAT_PACKAGE_SPOKES[slug]?.bucket ?? null;
