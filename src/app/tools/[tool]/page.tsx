import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { SITE_URL } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import ToolWidget from "@/src/components/shared/ToolWidget";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_TOOLS } from "@/src/lib/seed/destinations";
import { getDataset, getDatasetItem } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { plain } from "@/src/lib/pages/rich";
import { RATE_CARD_DATASET, TOOLS_DATASET } from "@/src/lib/cms-groups/taxi";
import { taxiRich } from "@/src/components/taxi/TaxiRich";
import { TOOL_TEMPLATE_PAGE } from "../content";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ tool: string }> };

/* Prerenders the code tools; ones added through the CMS (site_tools) render on first visit. */
export function generateStaticParams() {
  return SEED_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tool } = await params;
  const t = await getDatasetItem(TOOLS_DATASET, tool);
  if (!t) return {};
  return buildMetadata({ title: plain(t.title), description: plain(t.answer_first), path: `/tools/${tool}/` });
}

export default async function ToolPage({ params }: Params) {
  const { tool } = await params;
  const [t, tools, c, fareRoutes] = await Promise.all([
    getDatasetItem(TOOLS_DATASET, tool),
    getDataset(TOOLS_DATASET),
    getPageContent(TOOL_TEMPLATE_PAGE),
    getDataset(RATE_CARD_DATASET),
  ]);
  if (!t) notFound();

  const related = buildRelatedLinks({
    self: `/tools/${tool}/`,
    pillar: { target: "/tools/", anchor: "all tools" },
    money: t.tool_type === "fare-calculator" ? "taxi" : "packages",
    siblings: tools.filter((x) => x.slug !== tool).map((x) => ({
      target: `/tools/${x.slug}/`,
      anchor: x.h1,
      type: "sibling" as const,
    })),
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: c.crumbLabel, path: "/tools/" },
    { name: t.h1, path: `/tools/${tool}/` },
  ];

  return (
    <PageShell crumbs={crumbs}>
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t.h1}</h1>
        <AnswerFirst>{t.answer_first}</AnswerFirst>
      </div>

      {/* Interactive layer — enhances the static shell below */}
      <Section id="tool" title={c.tryItHeading}>
        <ToolWidget type={t.tool_type} copy={{ planner: c.planner, calculator: c.calculator }} routes={fareRoutes} />
      </Section>

      {/* Static, crawlable shell — always in the HTML (SOP §1) */}
      <Section id="explainer" title={c.explainerHeading}>
        <p className="text-gray-700">{taxiRich(t.static_shell_copy)}</p>
      </Section>

      <Faq items={t.faq} heading={c.faqHeading} />
      <RelatedLinks links={related} />

      {/* Faq emits the FAQPage node itself; this is the page entity. A
          calculator page is a WebApplication as much as a document, so both
          nodes ship and the tool one carries the free-to-use offer. */}
      <JsonLd
        data={[
          webPageSchema({
            name: t.h1,
            description: t.answer_first,
            path: `/tools/${tool}/`,
            crumbs,
            speakable: true,
          }),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "@id": `${SITE_URL}/tools/${tool}/#app`,
            name: t.h1,
            description: t.answer_first,
            url: `${SITE_URL}/tools/${tool}/`,
            applicationCategory: "TravelApplication",
            browserRequirements: "Requires JavaScript for the interactive layer",
            operatingSystem: "Any",
            isPartOf: { "@id": `${SITE_URL}/tools/${tool}/#webpage` },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
            },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />
    </PageShell>
  );
}
