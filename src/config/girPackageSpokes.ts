/**
 * The package variants the URL map authorises under /somnath-dwarka-gir-tour-package/.
 *
 * Mirrors config/packageSpokes.ts for the Gir triangle hub: 13 spokes from
 * scripts/data/url-map-v5.json. This is the allowlist for the hub's variant
 * explorer — a CMS record whose slug is not here is not part of the planned
 * architecture and never reaches the money page.
 *
 * `bucket` decides which explorer group a variant appears under, so no
 * authorised variant can fall through and render nowhere.
 */
export type GirPackageBucket = "duration" | "city" | "traveller" | "route";

export type GirPackageSpoke = {
  wave: string;
  bucket: GirPackageBucket;
};

export const GIR_PACKAGE_SPOKES: Record<string, GirPackageSpoke> = {
  "4-days": { wave: "A", bucket: "duration" },
  "5-days": { wave: "A", bucket: "duration" },
  "3-days": { wave: "D1", bucket: "duration" },
  "6-days": { wave: "D1", bucket: "duration" },
  "from-ahmedabad": { wave: "A", bucket: "city" },
  "from-rajkot": { wave: "A", bucket: "city" },
  "from-mumbai": { wave: "D1", bucket: "city" },
  "from-surat": { wave: "D1", bucket: "city" },
  "with-diu": { wave: "D1", bucket: "route" },
  "with-junagadh-girnar": { wave: "D1", bucket: "route" },
  "for-family": { wave: "D1", bucket: "traveller" },
  "for-senior-citizens": { wave: "D1", bucket: "traveller" },
  "group": { wave: "D1", bucket: "traveller" },
};

export const isAuthorisedGirPackage = (slug: string): boolean => slug in GIR_PACKAGE_SPOKES;

export const girPackageBucket = (slug: string): GirPackageBucket | null =>
  GIR_PACKAGE_SPOKES[slug]?.bucket ?? null;
