import type { Metadata } from "next";
import DestinationPillar, { destinationMetadata } from "@/src/components/templates/DestinationPillar";

/* Content and copy are editable through the CMS (see DestinationPillar); a save refreshes this page at once. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return destinationMetadata("dwarka");
}

export default function DwarkaPage() {
  return <DestinationPillar slug="dwarka" />;
}
