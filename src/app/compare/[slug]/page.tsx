import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_COMPARISONS, findSeedComparison } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SEED_COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = findSeedComparison(slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.answer_first, path: `/compare/${slug}/` });
}

export default async function ComparisonPage({ params }: Params) {
  const { slug } = await params;
  const c = findSeedComparison(slug);
  if (!c) notFound();

  const related = buildRelatedLinks({
    self: `/compare/${slug}/`,
    pillar: { target: "/compare/", anchor: "all comparisons" },
    money: "packages",
    siblings: [
      { target: "/somnath-tour-package/", anchor: "Somnath travel guide", type: "sibling" },
      { target: "/dwarka-tour-package/", anchor: "Dwarka travel guide", type: "sibling" },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare/" },
        {
          name: c.optionC
            ? `${c.optionA} vs ${c.optionB} vs ${c.optionC}`
            : `${c.optionA} vs ${c.optionB}`,
          path: `/compare/${slug}/`,
        },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{c.h1}</h1>
        <AnswerFirst tag="opinion">{c.answer_first}</AnswerFirst>
      </div>

      <Section id="table" title="Side by side">
        {/* The URL map has three-way comparisons; the third column renders only
            when the record defines optionC. */}
        <DataTable
          columns={
            c.optionC
              ? ["Criterion", c.optionA, c.optionB, c.optionC]
              : ["Criterion", c.optionA, c.optionB]
          }
          rows={c.rows.map((r) =>
            c.optionC ? [r.criterion, r.a, r.b, r.c ?? "—"] : [r.criterion, r.a, r.b],
          )}
        />
      </Section>

      <Section id="verdict" title="Verdict">
        <p className="text-gray-700">{c.verdict}</p>
        {c.recommended_target ? (
          <Link
            href={c.recommended_target}
            className="inline-block mt-4 px-5 py-3 rounded-full bg-[#E87722] text-white font-semibold"
          >
            See recommended packages
          </Link>
        ) : null}
      </Section>

      <Faq items={c.faq} heading="FAQs" />
      <CtaBand context={c.h1} />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(c.faq)} />
    </PageShell>
  );
}
