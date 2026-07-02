import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TempleInfo, { templeMetadata, templeExists } from "@/src/components/templates/TempleInfo";
import { SEED_TEMPLE_INFO } from "@/src/lib/seed/destinations";

export const revalidate = 3600;
type Params = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return SEED_TEMPLE_INFO.filter((t) => t.destination === "dwarka").map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topic } = await params;
  return templeMetadata("dwarka", topic);
}

export default async function DwarkaTopicPage({ params }: Params) {
  const { topic } = await params;
  if (!templeExists("dwarka", topic)) notFound();
  return <TempleInfo destination="dwarka" topic={topic} />;
}
