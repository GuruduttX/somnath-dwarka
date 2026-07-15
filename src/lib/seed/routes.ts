/**
 * All strategic, indexable spoke URLs backed by seed content (SOP §11).
 * The sitemap merges these with the static routes + live CMS entries so every
 * seeded page is discoverable even before a matching CMS entry exists.
 */
import { SEED_PACKAGES } from "./packages";
import { SEED_CAB_ROUTES, SEED_VEHICLES, SEED_AIRPORT_TAXIS } from "./cabs";
import {
  SEED_DESTINATIONS,
  SEED_TEMPLE_INFO,
  SEED_JOURNEYS,
  SEED_HOTELS,
  SEED_FESTIVALS,
  SEED_COMPARISONS,
  SEED_TOOLS,
} from "./destinations";
import { destinationPlacePath, destinationTopicPath } from "../destinationRoutes";

export function getSeedRoutePaths(): string[] {
  const paths: string[] = [];

  SEED_PACKAGES.forEach((p) => paths.push(`/somnath-dwarka-tour-package/${p.slug}/`));
  SEED_CAB_ROUTES.forEach((r) => paths.push(`/somnath-dwarka-taxi-service/${r.slug}/`));
  paths.push("/somnath-dwarka-taxi-service/fare-rate-card/");
  SEED_VEHICLES.forEach((v) => paths.push(`/somnath-dwarka-taxi-service/${v.slug}/`));
  paths.push("/somnath-dwarka-taxi-service/airport-taxi/");
  SEED_AIRPORT_TAXIS.forEach((a) => paths.push(`/somnath-dwarka-taxi-service/airport-taxi/${a.slug}/`));
  SEED_TEMPLE_INFO.forEach((t) => paths.push(destinationTopicPath(t.destination, t.slug)));
  SEED_DESTINATIONS.forEach((d) =>
    d.top_places.forEach((pl) => paths.push(destinationPlacePath(d.slug, pl.slug)))
  );
  SEED_JOURNEYS.forEach((j) => paths.push(`/plan/${j.slug}/`));
  SEED_HOTELS.forEach((h) => paths.push(`/hotels/${h.slug}/`));
  SEED_FESTIVALS.forEach((f) => paths.push(`/festivals/${f.slug}/`));
  SEED_COMPARISONS.forEach((c) => paths.push(`/compare/${c.slug}/`));
  SEED_TOOLS.forEach((t) => paths.push(`/tools/${t.slug}/`));

  return paths;
}
