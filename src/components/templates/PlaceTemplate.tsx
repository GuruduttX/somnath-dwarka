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
import { findSeedDestination } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";
import { destinationPath, destinationPlacePath } from "@/src/lib/destinationRoutes";

function getPlace(destination: string, place: string) {
  const d = findSeedDestination(destination);
  const p = d?.top_places.find((x) => x.slug === place);
  return d && p ? { d, p } : null;
}

export function placeExists(destination: string, place: string) {
  return !!getPlace(destination, place);
}

export function placeMetadata(destination: string, place: string) {
  const found = getPlace(destination, place);
  if (!found) return {};
  const { d, p } = found;
  return buildMetadata({
    title: `${p.name} — Timings, How to Reach & Guide`,
    description: `${p.name} in ${d.destination}: ${p.blurb} How to reach, timings and visitor tips.`,
    path: destinationPlacePath(destination, place),
  });
}

export default function PlaceTemplate({ destination, place }: { destination: string; place: string }) {
  const found = getPlace(destination, place);
  if (!found) return null;
  const { d, p } = found;
  const parentPath = destinationPath(destination);
  const selfPath = destinationPlacePath(destination, place);

  const related = buildRelatedLinks({
    self: selfPath,
    pillar: { target: parentPath, anchor: `${d.destination} travel guide` },
    money: "packages",
    siblings: d.top_places
      .filter((x) => x.slug !== place)
      .slice(0, 3)
      .map((x) => ({ target: destinationPlacePath(destination, x.slug), anchor: x.name, type: "sibling" as const })),
  });

  const faq = [
    {
      question: `How do you reach ${p.name}?`,
      answer: `${p.name} is in ${d.destination}. ${d.how_to_reach} A private cab is the easiest way to combine it with nearby darshans.`,
    },
  ];

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
        <AnswerFirst>
          {p.name} is one of the key places to visit in {d.destination}. {p.blurb} Below is how
          to reach it, what to expect and how it fits into a Somnath–Dwarka itinerary.
        </AnswerFirst>
      </div>

      <Section id="reach" title="How to reach & timings">
        <p className="text-gray-700">{d.how_to_reach}</p>
        <div className="mt-2">
          <VerifyStamp fact={{ key: "place", label: "Timings & access", value: "", verify: false }} />
        </div>
      </Section>

      <Section id="significance" title="Significance">
        <div className="mb-2"><FactTag type="faith" /></div>
        <p className="text-gray-700">{d.significance}</p>
      </Section>

      <Faq items={faq} heading={`${p.name} FAQs`} />
      <CtaBand context={`${p.name}, ${d.destination}`} />
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
