import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/src/lib/seo";
import CabRoutePage from "@/src/components/templates/CabRoutePage";
import VehiclePage from "@/src/components/templates/VehiclePage";
import { SEED_CAB_ROUTES, SEED_VEHICLES, cabPath, findSeedCab } from "@/src/lib/seed/cabs";
import { getTaxiBySlug } from "@/src/lib/content";
import { cabFromCms } from "@/src/utils/cabFromCms";
import { spokeCopyFor, vehicleCopyFor } from "@/src/config/taxiSpokes";

/**
 * CMS first, seed as fallback.
 *
 * Every seeded route and vehicle has been imported into the `taxis` collection,
 * so in practice the CMS answers. The seed stays as a safety net for a slug that
 * has not been imported, or if a record is unpublished.
 */
async function resolveCab(slug: string) {
  const doc = (await getTaxiBySlug(slug)) as Record<string, unknown> | null;
  return doc ? cabFromCms(doc) : findSeedCab(slug);
}

/**
 * Taxi hub spoke (/somnath-dwarka-taxi-service/{slug}/). The URL map puts cab
 * routes and vehicles at the same level under the hub, and the App Router allows
 * one dynamic segment per level, so this route dispatches on the seed record's
 * `kind`. `airport-taxi` and `fare-rate-card` are static folders and take
 * precedence over this segment.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...SEED_CAB_ROUTES, ...SEED_VEHICLES].map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const r = await resolveCab(slug);
  if (!r) return {};
  // The SOP fixes the title tag and meta description per route; fall back to the
  // CMS record for any route that has no config entry yet.
  // Routes and vehicles keep their SOP copy in separate blocks; either may be
  // absent, in which case the CMS record supplies the tags.
  const copy = spokeCopyFor(slug) ?? vehicleCopyFor(slug);
  return buildMetadata({
    title: copy?.titleTag ?? r.title,
    description: copy?.metaDescription ?? r.answer_first,
    path: cabPath(slug),
  });
}

export default async function TaxiSpokePage({ params }: Params) {
  const { slug } = await params;
  const r = await resolveCab(slug);
  if (!r) notFound();

  return r.kind === "route" ? (
    <CabRoutePage slug={slug} route={r} />
  ) : (
    <VehiclePage slug={slug} vehicle={r} />
  );
}
