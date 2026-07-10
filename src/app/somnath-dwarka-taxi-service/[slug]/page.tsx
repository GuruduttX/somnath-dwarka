import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/src/lib/seo";
import CabRoutePage from "@/src/components/templates/CabRoutePage";
import VehiclePage from "@/src/components/templates/VehiclePage";
import { SEED_CAB_ROUTES, SEED_VEHICLES, cabPath, findSeedCab } from "@/src/lib/seed/cabs";

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
  const r = findSeedCab(slug);
  if (!r) return {};
  return buildMetadata({ title: r.title, description: r.answer_first, path: cabPath(slug) });
}

export default async function TaxiSpokePage({ params }: Params) {
  const { slug } = await params;
  const r = findSeedCab(slug);
  if (!r) notFound();

  return r.kind === "route" ? (
    <CabRoutePage slug={slug} route={r} />
  ) : (
    <VehiclePage slug={slug} vehicle={r} />
  );
}
