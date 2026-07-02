import Link from "next/link";
import { buildMetadata, placeSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Toc from "@/src/components/shared/Toc";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import FactTag from "@/src/components/shared/FactTag";
import MapEmbed from "@/src/components/shared/MapEmbed";
import JsonLd from "@/src/components/seo/JsonLd";
import { findSeedDestination, SEED_TEMPLE_INFO } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export function destinationMetadata(slug: string) {
  const d = findSeedDestination(slug);
  if (!d) return {};
  return buildMetadata({ title: d.title, description: d.answer_first, path: `/${slug}/` });
}

export default function DestinationPillar({ slug }: { slug: string }) {
  const d = findSeedDestination(slug);
  if (!d) return null;

  const temples = SEED_TEMPLE_INFO.filter((t) => t.destination === slug);

  const related = buildRelatedLinks({
    self: `/${slug}/`,
    money: "packages",
    siblings: [
      { target: slug === "somnath" ? "/dwarka/" : "/somnath/", anchor: slug === "somnath" ? "Dwarka travel guide" : "Somnath travel guide", type: "pillar" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "how many days you need", type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
    ],
  });

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: d.destination, path: `/${slug}/` }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{d.h1}</h1>
        <AnswerFirst tag="verified">{d.answer_first}</AnswerFirst>
      </div>

      <Toc
        items={[
          { id: "significance", label: "Significance" },
          { id: "reach", label: "How to reach" },
          { id: "temple", label: "Temple timings" },
          { id: "places", label: "Places to visit" },
          { id: "distances", label: "Key distances" },
          { id: "map", label: "Map" },
        ]}
      />

      <Section id="significance" title="Significance">
        <div className="mb-2"><FactTag type="faith" /></div>
        <p className="text-gray-700">{d.significance}</p>
        <p className="text-gray-700 mt-3"><strong>Best time to visit:</strong> {d.best_time}</p>
      </Section>

      <Section id="reach" title="How to reach">
        <p className="text-gray-700">{d.how_to_reach}</p>
      </Section>

      {temples.length ? (
        <Section id="temple" title="Temple timings & darshan">
          <ul className="grid gap-3 sm:grid-cols-2">
            {temples.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${slug}/${t.slug}/`}
                  className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
                >
                  <span className="block font-semibold text-gray-800">{t.h1}</span>
                  <span className="block text-sm text-gray-500 mt-1">Timings, aarti &amp; darshan</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section id="places" title="Places to visit">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {d.top_places.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${slug}/places/${p.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">{p.name}</span>
                <span className="block text-sm text-gray-500 mt-1">{p.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="distances" title="Key distances">
        <DataTable
          columns={["From", "To", "Distance", "Time"]}
          rows={d.key_distances.map((k) => [k.from, k.to, k.distance, k.duration])}
          verify={{ key: "dist", label: "Distances", value: "", verify: false }}
        />
      </Section>

      <Section id="map" title="Map">
        <MapEmbed query={d.map_query} title={`Map of ${d.destination}`} />
      </Section>

      <Faq items={d.faq} heading={`${d.destination} FAQs`} />
      <CtaBand context={`${d.destination} trip`} />
      <RelatedLinks links={related} />

      <JsonLd
        data={placeSchema({
          name: d.destination,
          description: d.answer_first,
          path: `/${slug}/`,
        })}
      />
    </PageShell>
  );
}
