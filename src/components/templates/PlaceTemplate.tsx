import { buildMetadata, placeSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import FactTag from "@/src/components/shared/FactTag";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { buildRelatedLinks } from "@/src/lib/links";
import { destinationPath, destinationPlacePath } from "@/src/lib/destinationRoutes";
import { getDatasetItem } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { PILLARS_DATASET } from "@/src/lib/cms-groups/destinations";
import { PLACE_TEMPLATE_PAGE } from "./destination/content";
import { fillVars } from "./copy";

/*
  /somnath/places/<place>/ and /dwarka/places/<place>/. The place is an entry of
  top_places in the destination's site_destination_pillars item; the words
  around it are the "place-template" page copy. Both are editable through the CMS.
*/

async function getPlace(destination: string, place: string) {
  const d = await getDatasetItem(PILLARS_DATASET, destination);
  const p = d?.top_places.find((x) => x.slug === place);
  return d && p ? { d, p } : null;
}

const varsOf = (d: { destination: string; how_to_reach: string }, p: { name: string; blurb: string }) => ({
  place: p.name,
  destination: d.destination,
  blurb: p.blurb,
  how_to_reach: d.how_to_reach,
});

export async function placeExists(destination: string, place: string) {
  return !!(await getPlace(destination, place));
}

export async function placeMetadata(destination: string, place: string) {
  const [found, c] = await Promise.all([getPlace(destination, place), getPageContent(PLACE_TEMPLATE_PAGE)]);
  if (!found) return {};
  const v = varsOf(found.d, found.p);
  return buildMetadata({
    title: fillVars(c.metaTitle, v),
    description: fillVars(c.metaDescription, v),
    path: destinationPlacePath(destination, place),
  });
}

export default async function PlaceTemplate({ destination, place }: { destination: string; place: string }) {
  const [found, c] = await Promise.all([getPlace(destination, place), getPageContent(PLACE_TEMPLATE_PAGE)]);
  if (!found) return null;
  const { d, p } = found;
  const v = varsOf(d, p);
  const parentPath = destinationPath(destination);
  const selfPath = destinationPlacePath(destination, place);

  const related = buildRelatedLinks({
    self: selfPath,
    pillar: { target: parentPath, anchor: fillVars(c.pillarAnchor, v) },
    money: "packages",
    siblings: d.top_places
      .filter((x) => x.slug !== place)
      .slice(0, 3)
      .map((x) => ({ target: destinationPlacePath(destination, x.slug), anchor: x.name, type: "sibling" as const })),
  });

  const faq = c.faq.map((f) => ({ question: fillVars(f.question, v), answer: fillVars(f.answer, v) }));

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: d.destination, path: parentPath },
        { name: p.name, path: selfPath },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{p.name}</h1>
        <AnswerFirst>{fillVars(c.answerFirst, v)}</AnswerFirst>
      </div>

      <Section id="reach" title={c.reachTitle}>
        <p className="text-gray-700">{d.how_to_reach}</p>
        <div className="mt-2">
          <VerifyStamp fact={{ key: "place", label: c.verifyLabel, value: "", verify: false }} />
        </div>
      </Section>

      <Section id="significance" title={c.significanceTitle}>
        <div className="mb-2"><FactTag type="faith" /></div>
        <p className="text-gray-700">{d.significance}</p>
      </Section>

      <Faq items={faq} heading={fillVars(c.faqHeading, v)} />
      <CtaBand context={fillVars(c.ctaContext, v)} />
      <RelatedLinks links={related} />

      <JsonLd
        data={placeSchema({
          name: p.name,
          description: p.blurb,
          path: selfPath,
        })}
      />
    </PageShell>
  );
}
