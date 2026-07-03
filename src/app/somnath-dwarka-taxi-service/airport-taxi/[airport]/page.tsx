import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_AIRPORT_TAXIS, findSeedAirportTaxi } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";

const HUB = "/somnath-dwarka-taxi-service/";
const BASE = `${HUB}airport-taxi/`;
export const revalidate = 3600;

type Params = { params: Promise<{ airport: string }> };

export function generateStaticParams() {
  return SEED_AIRPORT_TAXIS.map((a) => ({ airport: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { airport } = await params;
  const a = findSeedAirportTaxi(airport);
  if (!a) return {};
  return buildMetadata({ title: a.title, description: a.answer_first, path: `${BASE}${airport}/` });
}

export default async function AirportTaxiPage({ params }: Params) {
  const { airport } = await params;
  const a = findSeedAirportTaxi(airport);
  if (!a) notFound();

  const related = buildRelatedLinks({
    self: `${BASE}${airport}/`,
    pillar: { target: HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: SEED_AIRPORT_TAXIS.filter((x) => x.slug !== airport).map((x) => ({
      target: `${BASE}${x.slug}/`,
      anchor: `${x.airport} airport taxi`,
      type: "sibling" as const,
    })),
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: HUB },
    { name: `${a.airport} airport taxi`, path: `${BASE}${airport}/` },
  ];

  return (
    <PageShell crumbs={crumbs}>
      <TaxiHero
        title={a.h1}
        description={a.answer_first}
        breadcrumbs={crumbs}
        badge="Airport Transfer"
        ctaContext={`${a.airport} airport taxi`}
        airportName={a.airportName}
        serves={a.serves}
        distance={a.distance}
        duration={a.duration}
        verified={a.verified}
      />

      {/* Fares Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-amber-50/45 via-white to-orange-50/50 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Plane SVG decoration */}
        <svg className="absolute right-10 bottom-6 w-32 h-32 opacity-[0.06] text-blue-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 22 L22 2 M18 6 L20 4 M14 10 L16 8" />
          <path d="M12 18 L19 11 L17 9 L10 16 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>

        <Section id="fares" title="Airport transfer fare by vehicle" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Indicative meet-and-greet pickup fares from the airport terminal. Includes terminal parking fee and chauffeur greeting.
          </p>
          <div className="bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-orange-100/40">
            <DataTable
              columns={["Vehicle Fleet", "Passenger Seating", "Indicative Fare"]}
              rows={a.fares.map((f) => [f.vehicle, String(f.seats), f.rate])}
              verify={{ key: "fare", label: "Fares", value: "", verify: false }}
            />
          </div>
        </Section>
      </div>

      <Faq items={a.faq} heading={`${a.airport} airport taxi FAQs`} />
      <CtaBand context={`${a.airport} airport taxi`} title="Book an airport transfer" subtitle="Send your flight details for a firm meet-and-greet fare." />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: a.h1,
          description: a.answer_first,
          path: `${BASE}${airport}/`,
          areaServed: a.serves,
        })}
      />
    </PageShell>
  );
}
