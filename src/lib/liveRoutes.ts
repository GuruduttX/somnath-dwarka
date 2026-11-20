import { getDataset } from "@/src/lib/datasets/store";
import { destinationPlacePath, destinationTopicPath } from "@/src/lib/destinationRoutes";
import { SD_PACKAGES_DATASET } from "@/src/lib/cms-groups/packages";
import { AIRPORT_TAXIS_DATASET, CAB_ROUTES_DATASET, TAXI_VEHICLES_DATASET, TOOLS_DATASET } from "@/src/lib/cms-groups/taxi";
import { PILLARS_DATASET, PLAN_GUIDES_DATASET, TEMPLE_TOPICS_DATASET } from "@/src/lib/cms-groups/destinations";
import { COMPARISONS_DATASET, FESTIVALS_DATASET, HOTELS_DATASET } from "@/src/lib/cms-groups/catalog";

/**
 * The live version of src/lib/seed/routes.ts: every seed-backed spoke URL, read
 * from the CMS datasets, so pages added through the /mcp/ connector join the
 * sitemap and removed ones leave it. Each dataset falls back to its code list
 * when the database cannot be read.
 */
export async function getLiveSeedRoutePaths(): Promise<string[]> {
  const [packages, cabRoutes, vehicles, airports, pillars, topics, journeys, hotels, festivals, comparisons, tools] = await Promise.all([
    getDataset(SD_PACKAGES_DATASET),
    getDataset(CAB_ROUTES_DATASET),
    getDataset(TAXI_VEHICLES_DATASET),
    getDataset(AIRPORT_TAXIS_DATASET),
    getDataset(PILLARS_DATASET),
    getDataset(TEMPLE_TOPICS_DATASET),
    getDataset(PLAN_GUIDES_DATASET),
    getDataset(HOTELS_DATASET),
    getDataset(FESTIVALS_DATASET),
    getDataset(COMPARISONS_DATASET),
    getDataset(TOOLS_DATASET),
  ]);
  const paths: string[] = [];
  packages.forEach((p) => paths.push(`/somnath-dwarka-tour-package/${p.slug}/`));
  cabRoutes.forEach((r) => paths.push(`/somnath-dwarka-taxi-service/${r.slug}/`));
  paths.push("/somnath-dwarka-taxi-service/fare-rate-card/");
  vehicles.forEach((v) => paths.push(`/somnath-dwarka-taxi-service/${v.slug}/`));
  paths.push("/somnath-dwarka-taxi-service/airport-taxi/");
  airports.forEach((a) => paths.push(`/somnath-dwarka-taxi-service/airport-taxi/${a.slug}/`));
  topics.forEach((t) => paths.push(destinationTopicPath(t.destination, t.slug)));
  pillars.forEach((d) => d.top_places.forEach((pl) => paths.push(destinationPlacePath(d.slug, pl.slug))));
  journeys.forEach((j) => paths.push(`/plan/${j.slug}/`));
  hotels.forEach((h) => paths.push(`/hotels/${h.slug}/`));
  festivals.forEach((f) => paths.push(`/festivals/${f.slug}/`));
  comparisons.forEach((c) => paths.push(`/compare/${c.slug}/`));
  tools.forEach((t) => paths.push(`/tools/${t.slug}/`));
  return paths;
}
