import type { Metadata } from "next";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { AirportCardGrid } from "@/src/components/taxi/TaxiCardGrids";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { AIRPORT_TAXIS_DATASET } from "@/src/lib/cms-groups/taxi";
import { taxiRich } from "@/src/components/taxi/TaxiRich";
import { AIRPORT_INDEX_PAGE } from "./content";

const HUB = "/somnath-dwarka-taxi-service/";
const PATH = `${HUB}airport-taxi/`;
/* Copy lives in ./content.ts and is editable through the CMS; the airports are the site_airport_taxis dataset. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(AIRPORT_INDEX_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

export default async function AirportTaxiHubPage() {
  const [c, airports] = await Promise.all([getPageContent(AIRPORT_INDEX_PAGE), getDataset(AIRPORT_TAXIS_DATASET)]);
  const related = buildRelatedLinks({
    self: PATH,
    pillar: { target: HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: [{ target: "/somnath-dwarka-taxi-service/somnath-to-dwarka-taxi/", anchor: "Somnath to Dwarka taxi", type: "sibling" }],
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: HUB },
    { name: "Airport taxi", path: PATH },
  ];

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title={c.h1}
        description={c.intro}
        breadcrumbs={crumbs}
        badge={c.badge}
        ctaContext="Airport taxi to Somnath Dwarka"
      />

      {/* Airports Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-sky-50/40 via-white to-orange-50/40 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Plane SVG decoration */}
        <svg className="absolute right-10 bottom-6 w-32 h-32 opacity-[0.06] text-blue-500 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 22 L22 2 M18 6 L20 4 M14 10 L16 8" />
          <path d="M12 18 L19 11 L17 9 L10 16 Z" fill="currentColor" fillOpacity="0.2" />
        </svg>

        <Section id="airports" title={c.airportsHeading} wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">{taxiRich(c.airportsIntro)}</p>
          <AirportCardGrid airports={airports} basePath={PATH} />
        </Section>
      </div>

      <CtaBand context="Airport taxi to Somnath Dwarka" title={c.ctaBand.title} subtitle={c.ctaBand.subtitle} />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: c.schema.name,
          description: c.schema.description,
          path: PATH,
          areaServed: "Saurashtra, Gujarat",
        })}
      />
    </PageShell>
  );
}
