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
import { SEED_VEHICLES } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";

const HUB = "/somnath-dwarka-taxi-service/";
export const revalidate = 3600;

type Params = { params: Promise<{ vehicle: string }> };

export async function generateStaticParams() {
  return SEED_VEHICLES.map((v) => ({ vehicle: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { vehicle } = await params;
  const v = SEED_VEHICLES.find((x) => x.slug === vehicle);
  if (!v) return {};
  return buildMetadata({ title: v.title, description: v.answer_first, path: `${HUB}${vehicle}/` });
}

export default async function VehiclePage({ params }: Params) {
  const { vehicle } = await params;
  const v = SEED_VEHICLES.find((x) => x.slug === vehicle);
  if (!v) notFound();

  const related = buildRelatedLinks({
    self: `${HUB}${vehicle}/`,
    pillar: { target: HUB, anchor: "all cabs & fares" },
    money: "packages",
    siblings: SEED_VEHICLES.filter((x) => x.slug !== vehicle).map((x) => ({
      target: `${HUB}${x.slug}/`,
      anchor: `${x.vehicle_name} fare`,
      type: "sibling" as const,
    })),
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Taxi service", path: HUB },
        { name: v.vehicle_name, path: `${HUB}${vehicle}/` },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{v.h1}</h1>
        <AnswerFirst>{v.answer_first}</AnswerFirst>
      </div>

      <Section id="fares" title="Indicative fares">
        <DataTable columns={["Route / basis", "Rate"]} rows={v.fares.map((f) => [f.route, f.rate])} />
        <VerifyStamp fact={{ key: "fare", label: "Fares", value: "", verify: false }} />
      </Section>

      <Section id="suitability" title="Who it suits">
        <p className="text-gray-700">{v.suitable_for}. Seats up to {v.seats} passengers.</p>
      </Section>

      <Faq items={v.faq} heading={`${v.vehicle_name} FAQs`} />
      <CtaBand context={`${v.vehicle_name} for Somnath Dwarka`} title="Book this vehicle" subtitle="Share your route and dates for a firm fare." />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: v.h1,
          description: v.answer_first,
          path: `${HUB}${vehicle}/`,
          areaServed: "Saurashtra, Gujarat",
        })}
      />
    </PageShell>
  );
}
