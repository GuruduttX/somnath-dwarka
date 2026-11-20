import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import Faq from "@/src/components/shared/Faq";
import { CheckCircle2, Clock, Car, Hotel } from "lucide-react";
import { Fragment } from "react";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { rich } from "@/src/lib/pages/rich";
import { COMPARISONS_DATASET } from "@/src/lib/cms-groups/catalog";
import { COMPARE_PAGE } from "./content";

const PATH = COMPARE_PAGE.path;
/* Copy: ./content.ts (CMS page "compare"); the guide list: the site_comparisons dataset. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(COMPARE_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

/** Summary card icons by position. */
const SUMMARY_ICONS = [Clock, Car, Hotel];

/** Transport card colours by position: badge, tick icon. */
const TRANSPORT_STYLES = [
  { badge: "bg-green-100 text-green-800", tick: "text-green-600" },
  { badge: "bg-amber-100 text-amber-800", tick: "text-amber-600" },
  { badge: "bg-blue-100 text-blue-800", tick: "text-blue-600" },
];

export default async function CompareHubPage() {
  const [c, comparisons] = await Promise.all([getPageContent(COMPARE_PAGE), getDataset(COMPARISONS_DATASET)]);
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Compare Tour Packages", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          {c.h1}
        </h1>
        <AnswerFirst>
          {c.answerFirst}
        </AnswerFirst>

        {/* Quick Decision Summary Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {c.summaryCards.map((card, i) => {
            const Icon = SUMMARY_ICONS[i % SUMMARY_ICONS.length];
            return (
              <div key={card.title} className="rounded-2xl border border-orange-100 bg-orange-50/50 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-orange-600 font-semibold mb-2">
                  <Icon size={18} />
                  <span>{card.title}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {card.lines.map((line, j) => (
                    <Fragment key={j}>
                      {rich(line)}
                      {j < card.lines.length - 1 ? <br /> : null}
                    </Fragment>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-side Itinerary Comparison Table */}
      <Section id="duration-comparison" title={c.durationTable.title}>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {c.durationTable.intro}
        </p>
        <div className="overflow-x-auto rounded-xl border border-orange-200 shadow-sm">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-orange-100 text-gray-900 font-semibold">
              <tr>
                {c.durationTable.columns.map((col) => (
                  <th key={col} className="p-3.5 border-b border-orange-200">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 bg-white">
              {c.durationTable.rows.map((row) => (
                <tr key={row.factor} className="hover:bg-orange-50/30">
                  <td className="p-3.5 font-medium text-gray-900">{row.factor}</td>
                  {row.cells.map((cell, j) => (
                    <td key={j} className="p-3.5">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Travel Options Comparison */}
      <Section id="travel-modes" title={c.transport.title}>
        <div className="grid gap-4 sm:grid-cols-3">
          {c.transport.cards.map((card, i) => {
            const style = TRANSPORT_STYLES[i % TRANSPORT_STYLES.length];
            return (
              <div key={card.name} className="rounded-xl border border-gray-200 bg-white p-5 hover:border-orange-300 transition">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{card.name}</h3>
                <span className={`inline-block rounded ${style.badge} px-2.5 py-0.5 text-xs font-semibold mb-3`}>
                  {card.badge}
                </span>
                <ul className="space-y-2 text-sm text-gray-600">
                  {card.points.map((pt) => (
                    <li key={pt.text} className="flex items-start gap-1.5">
                      {pt.plus ? (
                        <CheckCircle2 size={16} className={`${style.tick} shrink-0 mt-0.5`} />
                      ) : (
                        <span className="text-gray-400 font-bold shrink-0">•</span>
                      )}
                      <span>{pt.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Guide Links */}
      <Section id="comparisons" title={c.guidesTitle}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {comparisons.map((cmp) => (
            <li key={cmp.slug}>
              <Link
                href={`/compare/${cmp.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-900">{cmp.h1}</span>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{cmp.answer_first}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQs */}
      <Faq items={c.faqs} heading={c.faqHeading} />

      <CtaBand context={c.ctaContext} />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: c.schema.name,
          description: c.schema.description,
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Compare Tour Packages", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
