import type { Metadata } from "next";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import { CORE_FACTS } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, SEED_VEHICLES, SEED_AIRPORT_TAXIS } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { RouteCardGrid, VehicleCardGrid, AirportCardGrid } from "@/src/components/taxi/TaxiCardGrids";

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
    {
      question: "Which vehicles are available?",
      answer:
        "We offer air-conditioned sedans, SUVs and premium Innovas for groups of all sizes — pick by seating and comfort, with luggage space confirmed for airport transfers.",
    },
    {
      question: "Do you provide airport pickups?",
      answer:
        "Yes. We arrange meet-and-greet transfers from Diu, Rajkot, Jamnagar and Ahmedabad airports directly to your temple destination.",
    },
    {
      question: "Can I book a multi-day cab for the whole circuit?",
      answer:
        "Yes. We arrange one-way transfers, round trips and multi-day tours with the same experienced driver covering both Somnath and Dwarka, plus stops like Nageshwar and Bet Dwarka.",
    },
    {
      question: "Are tolls, parking and driver charges included?",
      answer:
        "Your firm quote spells out exactly what's included so there are no surprises. Share your route and dates and we'll confirm an all-in fare before booking.",
    },
  ];

  const crumbs = [{ name: "Home", path: "/" }, { name: "Taxi service", path: PATH }];

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title="Somnath Dwarka Taxi Service"
        description={`Book premium private cabs for the complete Somnath–Dwarka pilgrimage circuit. We arrange one-way transfers, round trips, and customized multi-day tours with experienced drivers.`}
        breadcrumbs={crumbs}
        badge="Saurashtra Cabs"
        ctaContext="Somnath Dwarka Taxi Service"
        distance={CORE_FACTS.dwarkaSomnathDistance.value}
        duration={CORE_FACTS.dwarkaSomnathDuration.value}
      />

      {/* Routes Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-amber-50/45 via-white to-orange-50/50 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Winding road SVG decoration */}
        <svg className="absolute right-0 top-4 w-60 h-40 opacity-[0.12] text-orange-500 pointer-events-none" viewBox="0 0 200 100" fill="none">
          <path d="M 0,50 Q 50,20 100,50 T 200,50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
          <circle cx="100" cy="50" r="4" fill="currentColor" />
        </svg>

        <Section id="routes" title="Popular taxi routes" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Compare driving distances and estimated durations for key pilgrimage connections. Select a route to see details.
          </p>
          <RouteCardGrid routes={SEED_CAB_ROUTES} />
          <div className="mt-6 bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-orange-100/40">
            <DataTable columns={["Route Quick List", "Est. Distance", "Est. Drive Time"]} rows={routeRows} />
          </div>
        </Section>
      </div>

      {/* Vehicles Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-orange-50/60 via-white to-amber-50/70 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Rotating Compass SVG decoration */}
        <svg className="absolute -left-10 top-10 w-44 h-44 opacity-[0.08] text-orange-500 pointer-events-none animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animationDuration: '40s' }}>
          <circle cx="50" cy="50" r="40" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <path d="M 50,10 L 55,45 L 90,50 L 55,55 L 50,90 L 45,55 L 10,50 L 45,45 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>

        <Section id="vehicles" title="Vehicles & fleet options" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            We maintain well-serviced, air-conditioned sedans, SUVs, and premium Innovas to accommodate groups of all sizes.
          </p>
          <VehicleCardGrid vehicles={SEED_VEHICLES} hubPath={PATH} />
          <div className="mt-6 bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-orange-100/40">
            <DataTable columns={["Vehicle Fleet", "Passenger Seating", "Best Suited For"]} rows={vehicleRows} />
          </div>
        </Section>
      </div>

      {/* Airport Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-sky-50/40 via-white to-orange-50/40 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Map pin connection SVG decoration */}
        <svg className="absolute right-10 bottom-6 w-32 h-32 opacity-[0.06] text-blue-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 22 L22 2 M18 6 L20 4 M14 10 L16 8" />
          <path d="M12 18 L19 11 L17 9 L10 16 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>

        <Section id="airport" title="Airport transfers & pickups" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Arriving by air? Book meet-and-greet transfers from Diu, Rajkot, Jamnagar, or Ahmedabad airports directly to your temple destination.
          </p>
          <AirportCardGrid airports={SEED_AIRPORT_TAXIS} basePath={`${PATH}airport-taxi/`} />
        </Section>
      </div>

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
