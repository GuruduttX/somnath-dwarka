/**
 * Photos of the three vehicles actually on the fleet (matching the `vehicle`
 * entries in the taxis CMS collection: Ertiga, Innova Crysta, Tempo Traveller).
 *
 * Hosted on Cloudinary under `somnath-dwarka/fleet/`, version-less so replacing
 * the image on the same public_id swaps it site-wide with no code change.
 */
const CLOUD = "https://res.cloudinary.com/dnhau4zv2/image/upload/somnath-dwarka/fleet";

export const FLEET_IMAGE = {
  ertiga: `${CLOUD}/ertiga.jpg`,
  innova: `${CLOUD}/innova-crysta.jpg`,
  tempo: `${CLOUD}/tempo-traveller.jpg`,
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
