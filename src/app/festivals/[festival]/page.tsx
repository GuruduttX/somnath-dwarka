import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, eventSchema, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import FactTag from "@/src/components/shared/FactTag";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_FESTIVALS, findSeedFestival } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ festival: string }> };

export function generateStaticParams() {
  return SEED_FESTIVALS.map((f) => ({ festival: f.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { festival } = await params;
  const f = findSeedFestival(festival);
  if (!f) return {};
  return buildMetadata({ title: f.title, description: f.answer_first, path: `/festivals/${festival}/` });
}

export default async function FestivalPage({ params }: Params) {
  const { festival } = await params;
  const f = findSeedFestival(festival);
  if (!f) notFound();

  const related = buildRelatedLinks({
    self: `/festivals/${festival}/`,
    pillar: { target: "/festivals/", anchor: "all festivals" },
    money: "packages",
    siblings: [
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab for the festival", type: "money" },
      { target: "/hotels/", anchor: "find a place to stay", type: "money" },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Festivals", path: "/festivals/" },
        { name: f.festival, path: `/festivals/${festival}/` },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{f.h1}</h1>
        <AnswerFirst>{f.answer_first}</AnswerFirst>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-sm text-gray-600"><strong>Dates this year:</strong> {f.date_this_year || "to be confirmed"}</span>
          <VerifyStamp fact={{ key: "date", label: "Date", value: "", verify: !!f.date_this_year }} />
        </div>
      </div>

      <Section id="rituals" title="Rituals">
        <div className="mb-2"><FactTag type="faith" /></div>
        <p className="text-gray-700">{f.rituals}</p>
      </Section>

      <Section id="travel" title="Travel & booking advice">
        <p className="text-gray-700">{f.travel_advice}</p>
      </Section>

      <Faq items={f.faq} heading={`${f.festival} FAQs`} />
      <CtaBand context={`${f.festival} at ${f.event_venue}`} />
      <RelatedLinks links={related} />

      {/* Event schema is gated: only renders when a real date is set (SOP §12) */}
      <JsonLd
        data={[
          eventSchema({
            name: f.h1,
            path: `/festivals/${festival}/`,
            startDate: f.date_this_year || undefined,
            location: f.event_venue,
          }),
          faqSchema(f.faq),
        ]}
      />
    </PageShell>
  );
}
