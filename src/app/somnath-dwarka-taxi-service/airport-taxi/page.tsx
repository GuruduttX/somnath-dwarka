import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import { SEED_AIRPORT_TAXIS } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";

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

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Taxi service", path: HUB },
        { name: "Airport taxi", path: PATH },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Airport taxi for Somnath &amp; Dwarka</h1>
        <AnswerFirst>
          Arriving by air? We arrange pre-booked airport taxis from Diu, Rajkot, Jamnagar and
          Ahmedabad to Somnath and Dwarka, with meet-and-greet at arrivals. Choose your airport
          below for distance, drive time and indicative fares by vehicle.
        </AnswerFirst>
      </div>

      <Section id="airports" title="By airport">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_AIRPORT_TAXIS.map((a) => (
            <li key={a.slug}>
              <Link
                href={`${PATH}${a.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">{a.airportName}</span>
                <span className="block text-sm text-gray-500 mt-1">Serves {a.serves} · {a.distance}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand context="Airport taxi to Somnath Dwarka" title="Book an airport transfer" subtitle="Share your flight details for a firm fare." />
      <RelatedLinks links={related} />
    </PageShell>
  );
}
