import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/src/lib/seo";
import CabRoutePage from "@/src/components/templates/CabRoutePage";
import VehiclePage from "@/src/components/templates/VehiclePage";
import { SEED_CAB_ROUTES, SEED_VEHICLES, cabPath, type SeedCabRoute, type SeedVehicle } from "@/src/lib/seed/cabs";
import { getTaxiBySlug } from "@/src/lib/content";
import { cabFromCms } from "@/src/utils/cabFromCms";
import { getDataset, getDatasetItem } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { plain } from "@/src/lib/pages/rich";
import {
  CAB_ROUTES_DATASET,
  ROUTE_COPY_DATASET,
  TAXI_VEHICLES_DATASET,
  VEHICLE_COPY_DATASET,
} from "@/src/lib/cms-groups/taxi";
import { CAB_ROUTE_TEMPLATE_PAGE, VEHICLE_TEMPLATE_PAGE } from "./content";

/**
 * CMS first, dataset as fallback.
 *
 * Every seeded route and vehicle has been imported into the `taxis` collection,
 * so in practice the CMS answers. The code list (site_cab_routes /
 * site_taxi_vehicles, editable through the connector) stays as a safety net for
 * a slug that has not been imported, or if a record is unpublished.
 */
async function resolveCab(slug: string): Promise<SeedCabRoute | SeedVehicle | null> {
  const doc = (await getTaxiBySlug(slug)) as Record<string, unknown> | null;
  if (doc) return cabFromCms(doc);
  const route = await getDatasetItem(CAB_ROUTES_DATASET, slug);
  if (route) return { ...route, kind: "route" };
  const vehicle = await getDatasetItem(TAXI_VEHICLES_DATASET, slug);
  return vehicle ? { ...vehicle, kind: "vehicle" } : null;
}

/** The page's own prose (site_taxi_route_copy / site_taxi_vehicle_copy), or null. */
async function copyFor(slug: string) {
  return (await getDatasetItem(ROUTE_COPY_DATASET, slug)) ?? (await getDatasetItem(VEHICLE_COPY_DATASET, slug));
}

/**
 * Taxi hub spoke (/somnath-dwarka-taxi-service/{slug}/). The URL map puts cab
 * routes and vehicles at the same level under the hub, and the App Router allows
 * one dynamic segment per level, so this route dispatches on the record's
 * `kind`. `airport-taxi` and `fare-rate-card` are static folders and take
 * precedence over this segment.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

/* Prerenders the code routes and vehicles; ones added through the CMS render on first visit. */
export function generateStaticParams() {
  return [...SEED_CAB_ROUTES, ...SEED_VEHICLES].map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const r = await resolveCab(slug);
  if (!r) return {};
  // The SOP fixes the title tag and meta description per route; fall back to the
  // record for any route or vehicle that has no copy item.
  const copy = await copyFor(slug);
  return buildMetadata({
    title: plain(copy?.titleTag ?? r.title),
    description: plain(copy?.metaDescription ?? r.answer_first),
    path: cabPath(slug),
  });
}

export default async function TaxiSpokePage({ params }: Params) {
  const { slug } = await params;
  const r = await resolveCab(slug);
  if (!r) notFound();

  if (r.kind === "route") {
    const [copy, t, siblings] = await Promise.all([
      getDatasetItem(ROUTE_COPY_DATASET, slug),
      getPageContent(CAB_ROUTE_TEMPLATE_PAGE),
      getDataset(CAB_ROUTES_DATASET),
    ]);
    return <CabRoutePage slug={slug} route={r} copy={copy} t={t} siblings={siblings} />;
  }
  const [copy, t, siblings] = await Promise.all([
    getDatasetItem(VEHICLE_COPY_DATASET, slug),
    getPageContent(VEHICLE_TEMPLATE_PAGE),
    getDataset(TAXI_VEHICLES_DATASET),
  ]);
  return <VehiclePage slug={slug} vehicle={r} copy={copy} t={t} siblings={siblings} />;
}
