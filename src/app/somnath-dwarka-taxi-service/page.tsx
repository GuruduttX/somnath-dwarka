import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import { CORE_FACTS } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, SEED_VEHICLES, SEED_AIRPORT_TAXIS } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";

const PATH = "/somnath-dwarka-taxi-service/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Taxi Service — Cab Fare, Routes & Booking",
  description:
    "Book a private cab for the Somnath–Dwarka circuit. Compare routes, distances and vehicle fares (sedan, SUV, Innova). Indicative rates, confirmed at booking.",
  path: PATH,
});

export default function CabHubPage() {
  const routeRows = SEED_CAB_ROUTES.map((r) => [
    r.origin + " → " + r.destination,
    r.distance,
    r.duration,
  ]);
  const vehicleRows = SEED_VEHICLES.map((v) => [v.vehicle_name, String(v.seats) + " seats", v.suitable_for]);

  const related = buildRelatedLinks({
    self: PATH,
    money: "packages",
    siblings: [
      ...SEED_CAB_ROUTES.slice(0, 2).map((r) => ({ target: `/${r.slug}/`, anchor: `${r.origin} to ${r.destination} taxi`, type: "sibling" as const })),
      { target: "/plan/dwarka-to-somnath-distance/", anchor: "Dwarka to Somnath distance", type: "sibling" },
    ],
  });

  const faq = [
    {
      question: "How much does a Somnath Dwarka taxi cost?",
      answer:
        "Fares depend on route, vehicle type and one-way vs round-trip. Rates shown are indicative and confirmed at booking. Share your itinerary for a firm quote.",
    },
    {
      question: "What is the distance between Somnath and Dwarka by taxi?",
      answer: `The road distance is ${CORE_FACTS.dwarkaSomnathDistance.value} and takes ${CORE_FACTS.dwarkaSomnathDuration.value}, typically via Porbandar.`,
    },
  ];

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Taxi service", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Somnath Dwarka Taxi Service</h1>
        <AnswerFirst>
          We arrange private cabs for the entire Somnath–Dwarka circuit — one-way transfers,
          round trips and full multi-day tours. Choose a sedan, SUV or Innova with an
          experienced driver. The Somnath–Dwarka leg is about {CORE_FACTS.dwarkaSomnathDistance.value}
          {" "}(~{CORE_FACTS.dwarkaSomnathDuration.value}); fares are indicative until confirmed at booking.
        </AnswerFirst>
      </div>

      <Section id="routes" title="Popular routes">
        <DataTable columns={["Route", "Distance", "Time"]} rows={routeRows} />
        <ul className="flex flex-wrap gap-2 mt-2">
          {SEED_CAB_ROUTES.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}/`} className="text-sm px-3 py-1 rounded-full border border-orange-100 hover:border-[#E87722]">
                {r.origin} → {r.destination}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="airport" title="Airport transfers">
        <p className="text-gray-600 mb-3">
          Pre-booked meet-and-greet taxis from the nearest airports to Somnath and Dwarka.
        </p>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link href="/somnath-dwarka-taxi-service/airport-taxi/" className="text-sm px-3 py-1 rounded-full border border-orange-100 hover:border-[#E87722] font-medium">
              All airport taxis
            </Link>
          </li>
          {SEED_AIRPORT_TAXIS.map((a) => (
            <li key={a.slug}>
              <Link href={`/somnath-dwarka-taxi-service/airport-taxi/${a.slug}/`} className="text-sm px-3 py-1 rounded-full border border-orange-100 hover:border-[#E87722]">
                {a.airport} airport
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="vehicles" title="Vehicles & fares">
        <DataTable columns={["Vehicle", "Capacity", "Best for"]} rows={vehicleRows} />
        <ul className="flex flex-wrap gap-2 mt-2">
          {SEED_VEHICLES.map((v) => (
            <li key={v.slug}>
              <Link href={`${PATH}${v.slug}/`} className="text-sm px-3 py-1 rounded-full border border-orange-100 hover:border-[#E87722]">
                {v.vehicle_name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Faq items={faq} heading="Taxi service FAQs" />
      <CtaBand context="Somnath Dwarka taxi booking" title="Book a cab" subtitle="Tell us your route and dates for a firm fare." />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: "Somnath Dwarka Taxi Service",
          description: "Private cab service for the Somnath–Dwarka pilgrimage circuit.",
          path: PATH,
          areaServed: "Saurashtra, Gujarat",
        })}
      />
    </PageShell>
  );
}
