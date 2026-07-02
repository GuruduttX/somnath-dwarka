import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import ToolWidget from "@/src/components/shared/ToolWidget";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_TOOLS, findSeedTool } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ tool: string }> };

export function generateStaticParams() {
  return SEED_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tool } = await params;
  const t = findSeedTool(tool);
  if (!t) return {};
  return buildMetadata({ title: t.title, description: t.answer_first, path: `/tools/${tool}/` });
}

export default async function ToolPage({ params }: Params) {
  const { tool } = await params;
  const t = findSeedTool(tool);
  if (!t) notFound();

  const related = buildRelatedLinks({
    self: `/tools/${tool}/`,
    pillar: { target: "/tools/", anchor: "all tools" },
    money: t.tool_type === "fare-calculator" ? "taxi" : "packages",
    siblings: SEED_TOOLS.filter((x) => x.slug !== tool).map((x) => ({
      target: `/tools/${x.slug}/`,
      anchor: x.h1,
      type: "sibling" as const,
    })),
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tools", path: "/tools/" },
        { name: t.h1, path: `/tools/${tool}/` },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t.h1}</h1>
        <AnswerFirst>{t.answer_first}</AnswerFirst>
      </div>

      {/* Interactive layer — enhances the static shell below */}
      <Section id="tool" title="Try it">
        <ToolWidget type={t.tool_type} />
      </Section>

      {/* Static, crawlable shell — always in the HTML (SOP §1) */}
      <Section id="explainer" title="How it works">
        <p className="text-gray-700">{t.static_shell_copy}</p>
      </Section>

      <Faq items={t.faq} heading="Tool FAQs" />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(t.faq)} />
    </PageShell>
  );
}
