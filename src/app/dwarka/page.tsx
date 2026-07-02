import type { Metadata } from "next";
import DestinationPillar, { destinationMetadata } from "@/src/components/templates/DestinationPillar";

export const revalidate = 3600;
export const metadata: Metadata = destinationMetadata("dwarka");

export default function DwarkaPage() {
  return <DestinationPillar slug="dwarka" />;
}
