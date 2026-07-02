import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { findSeedTempleInfo, findSeedDestination } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export function templeMetadata(destination: string, topic: string) {
  const t = findSeedTempleInfo(destination, topic);
  if (!t) return {};
  return buildMetadata({ title: t.title, description: t.answer_first, path: `/${destination}/${topic}/` });
}

export function templeExists(destination: string, topic: string) {
  return !!findSeedTempleInfo(destination, topic);
}

export default function TempleInfo({ destination, topic }: { destination: string; topic: string }) {
  const t = findSeedTempleInfo(destination, topic);
  const parent = findSeedDestination(destination);
  if (!t) return null;

  const related = buildRelatedLinks({
    self: `/${destination}/${topic}/`,
    pillar: { target: `/${destination}/`, anchor: `${parent?.destination ?? destination} travel guide` },
    money: "packages",
    siblings: [
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab for darshan", type: "money" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "plan your days", type: "sibling" },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: parent?.destination ?? destination, path: `/${destination}/` },
        { name: t.h1, path: `/${destination}/${topic}/` },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t.h1}</h1>
        {/* speakable: the answer-first block carries the timing summary */}
        <div className="speakable">
          <AnswerFirst>{t.answer_first}</AnswerFirst>
        </div>
      </div>

      <Section id="timings" title="Timings">
        <DataTable
          columns={["Session", "Opens", "Closes"]}
          rows={t.timings.map((r) => [r.label, r.open, r.close])}
          verify={{
            key: "timings",
            label: "Timings",
            value: "",
            verify: t.verified,
            source: t.official_source_url,
          }}
        />
        <p className="text-sm text-gray-500 mt-2">
          Official source:{" "}
          <a href={t.official_source_url} target="_blank" rel="noopener noreferrer nofollow" className="underline">
            {t.official_source_url}
          </a>
        </p>
      </Section>

      <Section id="rules" title="Dress code & photography">
        <ul className="space-y-2 text-gray-700">
          <li><strong>Dress code:</strong> {t.dress_code}</li>
          <li><strong>Photography:</strong> {t.photography_rule}</li>
        </ul>
      </Section>

      <Faq items={t.faq} heading="Timings FAQs" />
      <CtaBand context={`${t.h1}`} title="Plan darshan with us" subtitle="We time the itinerary around aarti and darshan windows." />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(t.faq)} />
    </PageShell>
  );
}
