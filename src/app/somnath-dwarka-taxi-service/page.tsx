import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import { CORE_FACTS } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, SEED_VEHICLES, SEED_AIRPORT_TAXIS, cabPath } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { RouteCardGrid, VehicleCardGrid, AirportCardGrid } from "@/src/components/taxi/TaxiCardGrids";
import { Sparkles, MapPin, Compass, Shield, ArrowRight, ReceiptText } from "lucide-react";

const PATH = "/somnath-dwarka-taxi-service/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Taxi Service — Cab Fare, Routes & Booking",
  description:
    "Book a private cab for the Somnath–Dwarka pilgrimage circuit. Compare routes, distances and vehicle fares (sedan, SUV, Innova). Indicative rates, confirmed at booking.",
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
      ...SEED_CAB_ROUTES.slice(0, 2).map((r) => ({ target: cabPath(r.slug), anchor: `${r.origin} to ${r.destination} taxi`, type: "sibling" as const })),
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
      <div className="w-full bg-gradient-to-br from-amber-50/25 via-white to-orange-50/20 border-b border-orange-100/30 relative overflow-hidden py-14 sm:py-16">
        {/* Ambient Top Glow */}
        <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-orange-50/20 to-transparent pointer-events-none" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        {/* Winding road SVG decoration */}
        <svg className="absolute right-0 top-6 w-72 h-44 opacity-[0.14] text-orange-500 pointer-events-none hidden md:block" viewBox="0 0 200 100" fill="none">
          <path d="M 0,50 Q 50,20 100,50 T 200,50" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 8" />
          <circle cx="100" cy="50" r="4.5" fill="currentColor" />
        </svg>

        <Section id="routes" wide={true} className="!py-0 relative z-10">
          {/* Custom styled section header */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-850">
                <Compass size={11} className="text-orange-500 animate-pulse" />
                Saurashtra Highway Segments
              </span>
              <h2 className="mt-3 text-3xl font-black text-[#2d1b10] tracking-tight sm:text-4xl">
                Popular Taxi Routes
              </h2>
              <p className="mt-2 text-sm text-gray-650 leading-relaxed">
                Compare driving distances and estimated durations for key pilgrimage connections. Select a route to see details and base rates.
              </p>
            </div>

            {/* Full rate card — per-route and per-vehicle rates on one page. */}
            <Link
              href="/somnath-dwarka-taxi-service/fare-rate-card/"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md"
            >
              <ReceiptText size={16} className="text-orange-500" />
              View fare rate card
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <RouteCardGrid routes={SEED_CAB_ROUTES} />
          
          <div className="mt-8 bg-white/75 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
            <DataTable columns={["Route Quick List", "Est. Distance", "Est. Drive Time"]} rows={routeRows} />
          </div>
        </Section>
      </div>

      {/* Vehicles Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-orange-50/20 via-white to-amber-50/25 border-b border-orange-100/30 relative overflow-hidden py-14 sm:py-16">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        {/* Rotating Compass SVG decoration */}
        <svg className="absolute -left-12 top-12 w-48 h-48 opacity-[0.08] text-orange-500 pointer-events-none animate-spin-slow hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animationDuration: '40s' }}>
          <circle cx="50" cy="50" r="40" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
          <path d="M 50,10 L 55,45 L 90,50 L 55,55 L 50,90 L 45,55 L 10,50 L 45,45 Z" fill="currentColor" fillOpacity="0.1" />
        </svg>

        <Section id="vehicles" wide={true} className="!py-0 relative z-10">
          {/* Custom styled section header */}
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-850">
              <Shield size={11} className="text-orange-500" />
              Verified Fleet comfort
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#2d1b10] tracking-tight sm:text-4xl">
              Vehicles & Fleet Options
            </h2>
            <p className="mt-2 text-sm text-gray-650 leading-relaxed">
              We maintain well-serviced, air-conditioned sedans, SUVs, and premium Innovas to accommodate groups of all sizes.
            </p>
          </div>

          <VehicleCardGrid vehicles={SEED_VEHICLES} hubPath={PATH} />
          
          <div className="mt-8 bg-white/75 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
            <DataTable columns={["Vehicle Fleet Class", "Passenger Seating", "Best Suited For"]} rows={vehicleRows} />
          </div>
        </Section>
      </div>

      {/* Airport Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-sky-50/20 via-white to-orange-50/20 border-b border-orange-100/30 relative overflow-hidden py-14 sm:py-16">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        {/* Map pin connection SVG decoration */}
        <svg className="absolute right-10 bottom-6 w-36 h-36 opacity-[0.08] text-blue-500 pointer-events-none hidden md:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 22 L22 2 M18 6 L20 4 M14 10 L16 8" />
          <path d="M12 18 L19 11 L17 9 L10 16 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>

        <Section id="airport" wide={true} className="!py-0 relative z-10">
          {/* Custom styled section header */}
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-900">
              <Sparkles size={11} className="text-blue-500 animate-pulse" />
              Meet & Greet Pickup Service
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#2d1b10] tracking-tight sm:text-4xl">
              Airport Transfers & Pickups
            </h2>
            <p className="mt-2 text-sm text-gray-650 leading-relaxed">
              Arriving by air? Book meet-and-greet transfers from Diu, Rajkot, Jamnagar, or Ahmedabad airports directly to your temple destination.
            </p>
          </div>

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
