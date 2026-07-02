import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceTemplate, { placeMetadata, placeExists } from "@/src/components/templates/PlaceTemplate";
import { findSeedDestination } from "@/src/lib/seed/destinations";

export const revalidate = 3600;
type Params = { params: Promise<{ place: string }> };

export function generateStaticParams() {
  return (findSeedDestination("somnath")?.top_places ?? []).map((p) => ({ place: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { place } = await params;
  return placeMetadata("somnath", place);
}

export default async function SomnathPlacePage({ params }: Params) {
  const { place } = await params;
  if (!placeExists("somnath", place)) notFound();
  return <PlaceTemplate destination="somnath" place={place} />;
}
