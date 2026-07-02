import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import ItineraryAccordion from "@/src/components/shared/ItineraryAccordion";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_JOURNEYS, findSeedJourney } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return SEED_JOURNEYS.map((j) => ({ topic: j.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { topic } = await params;
  const j = findSeedJourney(topic);
  if (!j) return {};
  return buildMetadata({ title: j.title, description: j.direct_answer, path: `/plan/${topic}/` });
}

export default async function JourneyPage({ params }: Params) {
  const { topic } = await params;
  const j = findSeedJourney(topic);
  if (!j) notFound();

  const related = buildRelatedLinks({
    self: `/plan/${topic}/`,
    pillar: { target: "/plan/", anchor: "all trip-planning guides" },
    money: "packages",
    siblings: SEED_JOURNEYS.filter((x) => x.slug !== topic).map((x) => ({
      target: `/plan/${x.slug}/`,
      anchor: x.question,
      type: "sibling" as const,
    })),
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Plan", path: "/plan/" },
        { name: j.h1, path: `/plan/${topic}/` },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{j.h1}</h1>
        <div className="speakable">
          <AnswerFirst>{j.direct_answer}</AnswerFirst>
        </div>
      </div>

      {j.modes?.length ? (
        <Section id="modes" title="Distance & modes">
          <DataTable
            columns={["Mode", "Distance", "Time", "Notes"]}
            rows={j.modes.map((m) => [m.mode, m.distance, m.duration, m.note])}
            verify={{ key: "modes", label: "Distances & times", value: "", verify: false }}
          />
        </Section>
      ) : null}

      {j.itinerary?.length ? (
        <Section id="itinerary" title="Sample itinerary">
          <ItineraryAccordion days={j.itinerary} />
        </Section>
      ) : null}

      <Faq items={j.faq} heading="FAQs" />
      <CtaBand context={j.h1} />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(j.faq)} />
    </PageShell>
  );
}
