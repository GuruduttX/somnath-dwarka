import type { Metadata } from "next";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, SEED_VEHICLES, CAB_HUB, cabPath } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";

/**
 * /somnath-dwarka-taxi-service/fare-rate-card/ — MVP wave, the "taxi rates per
 * km" head term. A static folder, so it takes precedence over the sibling
 * [slug] segment.
 *
 * Fares are drawn from the cab seed, where every rate is still a "₹—"
 * placeholder carrying verified: false. The table is rendered with a VERIFY
 * stamp so an unconfirmed rate can never read as a quoted price.
 */
const PATH = `${CAB_HUB}fare-rate-card/`;

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Taxi Rates Per Km — Fare Rate Card",
  description:
    "Fare rate card for Somnath–Dwarka taxis: per-route and per-vehicle rates, what is included, and what is charged extra. Rates confirmed at booking.",
  path: PATH,
});

const FAQS = [
  {
    question: "Are these taxi rates final?",
    answer:
      "No. The rate card is indicative. Your final fare depends on the exact route, halts, vehicle and season, and is confirmed in writing before you pay a deposit.",
  },
  {
    question: "What is not included in the fare?",
    answer:
      "Tolls, parking, state permits and driver allowance are charged separately unless your quote says otherwise. We itemise these rather than fold them into a headline number.",
  },
  {
    question: "Is a round trip cheaper than two one-way trips?",
    answer:
      "Usually yes, because the return leg avoids a dead-head charge. Ask us for both figures and pick whichever suits your plan.",
  },
];

export default function FareRateCardPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: CAB_HUB },
    { name: "Fare rate card", path: PATH },
  ];

  const related = buildRelatedLinks({
    self: PATH,
    pillar: { target: CAB_HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: SEED_CAB_ROUTES.slice(0, 3).map((r) => ({
      target: cabPath(r.slug),
      anchor: `${r.origin} to ${r.destination} taxi`,
      type: "sibling" as const,
    })),
  });

  return (
    <PageShell crumbs={crumbs}>
      <Section>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Somnath Dwarka Taxi Rates Per Km
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-gray-700">
          Cab fares on the Somnath–Dwarka circuit are set by route distance and vehicle, not by a
          flat per-kilometre number alone. Below is the rate card by route and by vehicle. Every
          figure is confirmed with you in writing before any deposit — we would rather quote late
          than quote wrong.
        </p>
      </Section>

      <Section id="by-route" title="Rates by route" wide>
        <DataTable
          columns={["Route", "Distance", "Duration", "One-way", "Round-trip"]}
          rows={SEED_CAB_ROUTES.map((r) => [
            `${r.origin} to ${r.destination}`,
            r.distance,
            r.duration,
            r.fares[0]?.oneWay ?? "₹—",
            r.fares[0]?.roundTrip ?? "₹—",
          ])}
          verify={{ key: "fare", label: "Route fares", value: "", verify: false }}
        />
      </Section>

      <Section id="by-vehicle" title="Rates by vehicle" wide>
        <DataTable
          columns={["Vehicle", "Seats", "Suitable for"]}
          rows={SEED_VEHICLES.map((v) => [v.vehicle_name, String(v.seats), v.suitable_for])}
        />
      </Section>

      <Section id="extras" title="What is charged extra">
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li>• Tolls and state permit charges</li>
          <li>• Parking at temples and monuments</li>
          <li>• Driver night allowance on overnight halts</li>
          <li>• Any sightseeing detour added on the day</li>
        </ul>
      </Section>

      <Faq items={FAQS} heading="Taxi fare FAQs" />
      <CtaBand
        context="Somnath Dwarka taxi rate card"
        title="Get a firm fare"
        subtitle="Share your route, dates and group size for a written quote."
      />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: "Somnath Dwarka Taxi Rates Per Km",
          description: "Indicative fare rate card for Somnath–Dwarka taxi routes and vehicles.",
          path: PATH,
          areaServed: "Saurashtra, Gujarat",
        })}
      />
    </PageShell>
  );
}
