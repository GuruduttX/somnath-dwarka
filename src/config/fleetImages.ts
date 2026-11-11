/**
 * Photos of the three vehicles actually on the fleet (matching the `vehicle`
 * entries in the taxis CMS collection: Ertiga, Innova Crysta, Tempo Traveller).
 *
 * Hosted on Cloudflare R2 under `somnath-dwarka/fleet/` as 960px WebP and
 * served as-is. Uploading a new file to the same key swaps it site-wide with
 * no code change.
 */
import { r2Url } from "@/src/lib/imageHost";

export const FLEET_IMAGE = {
  ertiga: r2Url("somnath-dwarka/fleet/ertiga.webp"),
  innova: r2Url("somnath-dwarka/fleet/innova-crysta.webp"),
  tempo: r2Url("somnath-dwarka/fleet/tempo-traveller.webp"),
} as const;

/** Ertiga / Innova alternating, for card grids that just need a taxi photo. */
export const FLEET_ALTERNATE = [FLEET_IMAGE.ertiga, FLEET_IMAGE.innova];

/** The closest fleet photo for a free-text vehicle name from the CMS. */
export function fleetImageFor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("tempo") || n.includes("traveller")) return FLEET_IMAGE.tempo;
  if (n.includes("innova") || n.includes("crysta")) return FLEET_IMAGE.innova;
  return FLEET_IMAGE.ertiga;
}
