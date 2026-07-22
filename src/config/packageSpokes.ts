/**
 * The package variants the URL map authorises under /somnath-dwarka-tour-package/.
 *
 * Transcribed from the v5 URL map (36 spokes); this file is now the canonical
 * copy. This is the allowlist for the hub's variant explorer: a package record
 * whose slug is not here is not part of the planned architecture and is never
 * listed, so a stray or legacy CMS record cannot leak onto the money page.
 *
 * `bucket` decides which explorer group a variant appears under. Every slug in
 * the map has one, so no authorised variant can fall through and render nowhere.
 */
export type PackageBucket = "duration" | "city" | "traveller" | "route" | "transport";

export type PackageSpoke = {
  wave: string;
  bucket: PackageBucket;
};

export const PACKAGE_SPOKES: Record<string, PackageSpoke> = {
  "4-days-3-nights": { wave: "MVP", bucket: "duration" },
  "3-days-2-nights": { wave: "MVP", bucket: "duration" },
  "from-ahmedabad": { wave: "MVP", bucket: "city" },
  "from-rajkot": { wave: "MVP", bucket: "city" },
  "from-mumbai": { wave: "MVP", bucket: "city" },
  "1-day-somnath": { wave: "MVP", bucket: "duration" },
  "1-day-dwarka": { wave: "MVP", bucket: "duration" },
  "with-gir": { wave: "A", bucket: "route" },
  "with-dakor": { wave: "C", bucket: "route" },
  "with-ahmedabad": { wave: "C", bucket: "route" },
  "2-days-1-night": { wave: "D1", bucket: "duration" },
  "5-days-4-nights": { wave: "D1", bucket: "duration" },
  "6-days-5-nights": { wave: "D1", bucket: "duration" },
  "from-jamnagar": { wave: "D1", bucket: "city" },
  "from-vadodara": { wave: "D1", bucket: "city" },
  "from-surat": { wave: "D1", bucket: "city" },
  "from-delhi": { wave: "D1", bucket: "city" },
  "from-pune": { wave: "D1", bucket: "city" },
  "from-bangalore": { wave: "D1", bucket: "city" },
  "from-hyderabad": { wave: "D1", bucket: "city" },
  "with-diu": { wave: "D1", bucket: "route" },
  "with-porbandar": { wave: "D1", bucket: "route" },
  "with-junagadh-girnar": { wave: "D1", bucket: "route" },
  "with-statue-of-unity": { wave: "D1", bucket: "route" },
  "for-family": { wave: "D1", bucket: "traveller" },
  "for-couples-honeymoon": { wave: "D1", bucket: "traveller" },
  "for-senior-citizens": { wave: "D1", bucket: "traveller" },
  "group": { wave: "D1", bucket: "traveller" },
  "for-nri-international": { wave: "D1", bucket: "traveller" },
  "budget": { wave: "D1", bucket: "traveller" },
  "deluxe": { wave: "D1", bucket: "traveller" },
  "luxury": { wave: "D1", bucket: "traveller" },
  "by-tempo-traveller": { wave: "D1", bucket: "transport" },
  "by-car": { wave: "D1", bucket: "transport" },
  "by-train": { wave: "D1", bucket: "transport" },
  "by-bus": { wave: "D1", bucket: "transport" },
};

export const isAuthorisedPackage = (slug: string): boolean => slug in PACKAGE_SPOKES;

export const packageBucket = (slug: string): PackageBucket | null =>
  PACKAGE_SPOKES[slug]?.bucket ?? null;
