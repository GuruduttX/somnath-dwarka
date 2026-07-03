import type { Metadata } from "next";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import { SEED_AIRPORT_TAXIS } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { AirportCardGrid } from "@/src/components/taxi/TaxiCardGrids";

const HUB = "/somnath-dwarka-taxi-service/";
const PATH = `${HUB}airport-taxi/`;
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Airport Taxi for Somnath & Dwarka — Transfers & Fares",
  description:
    "Pre-booked airport taxis from Diu, Rajkot, Jamnagar and Ahmedabad to Somnath and Dwarka. Meet-and-greet transfers with indicative fares by vehicle.",
  path: PATH,
});

export default function AirportTaxiHubPage() {
  const related = buildRelatedLinks({
    self: PATH,
    pillar: { target: HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: [{ target: "/somnath-to-dwarka-taxi/", anchor: "Somnath to Dwarka taxi", type: "sibling" }],
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: HUB },
    { name: "Airport taxi", path: PATH },
  ];

  return (
    <PageShell crumbs={crumbs}>
      <TaxiHero
        title="Airport Taxi for Somnath &amp; Dwarka"
        description="Arriving by air? We arrange pre-booked airport taxis from Diu, Rajkot, Jamnagar, and Ahmedabad to Somnath and Dwarka, with meet-and-greet reception right at the arrival terminal."
        breadcrumbs={crumbs}
        badge="Airport pick-up"
        ctaContext="Airport taxi to Somnath Dwarka"
      />

      {/* Airports Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-sky-50/40 via-white to-orange-50/40 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Plane SVG decoration */}
        <svg className="absolute right-10 bottom-6 w-32 h-32 opacity-[0.06] text-blue-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 22 L22 2 M18 6 L20 4 M14 10 L16 8" />
          <path d="M12 18 L19 11 L17 9 L10 16 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>

        <Section id="airports" title="Select departure airport" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Choose the airport you are landing at to view driving distances, travel times, and vehicle fare options.
          </p>
          <AirportCardGrid airports={SEED_AIRPORT_TAXIS} basePath={PATH} />
        </Section>
      </div>

      <CtaBand context="Airport taxi to Somnath Dwarka" title="Book an airport transfer" subtitle="Share your flight details for a firm fare." />
      <RelatedLinks links={related} />
    </PageShell>
  );
}
