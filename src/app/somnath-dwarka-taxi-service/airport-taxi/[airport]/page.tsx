import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_AIRPORT_TAXIS, findSeedAirportTaxi } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";

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

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Taxi service", path: HUB },
        { name: `${a.airport} airport taxi`, path: `${BASE}${airport}/` },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{a.h1}</h1>
        <AnswerFirst>{a.answer_first}</AnswerFirst>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
          <span>Airport: <strong>{a.airportName}</strong></span>
          <span>Serves: <strong>{a.serves}</strong></span>
          <span>Distance: <strong>{a.distance}</strong></span>
          <span>Time: <strong>{a.duration}</strong></span>
        </div>
        <div className="mt-1">
          <VerifyStamp fact={{ key: "dist", label: "Distance/time", value: "", verify: a.verified }} />
        </div>
      </div>

      <Section id="fares" title="Airport transfer fare by vehicle">
        <DataTable
          columns={["Vehicle", "Seats", "Indicative fare"]}
          rows={a.fares.map((f) => [f.vehicle, String(f.seats), f.rate])}
          verify={{ key: "fare", label: "Fares", value: "", verify: false }}
        />
      </Section>

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
