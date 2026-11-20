import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import { Calculator, Calendar, Navigation } from "lucide-react";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { plain } from "@/src/lib/pages/rich";
import { TOOLS_DATASET } from "@/src/lib/cms-groups/taxi";
import { taxiRich } from "@/src/components/taxi/TaxiRich";
import { TOOLS_PAGE } from "./content";

const PATH = "/tools/";
export const revalidate = 3600;

/* Copy lives in ./content.ts and is editable through the CMS; the tool cards are the site_tools dataset. */
export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(TOOLS_PAGE);
  return buildMetadata({ title: c.meta.title, description: c.meta.description, path: PATH });
}

export default async function ToolsHubPage() {
  const [c, tools] = await Promise.all([getPageContent(TOOLS_PAGE), getDataset(TOOLS_DATASET)]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: c.crumbLabel, path: PATH },
  ];
  return (
    <PageShell crumbs={crumbs}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{c.h1}</h1>
        <AnswerFirst>{taxiRich(c.answerFirst)}</AnswerFirst>

        {/* Tool Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <div
              key={t.slug}
              className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm hover:border-[#E87722] hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-orange-600">
                    {t.slug.includes("fare") || t.slug.includes("cost") ? (
                      <Calculator size={24} />
                    ) : (
                      <Calendar size={24} />
                    )}
                  </span>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 border border-orange-100">
                    {t.tool_type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.h1}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{t.card_text}</p>
              </div>
              <Link
                href={`/tools/${t.slug}/`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 text-sm font-bold text-white hover:from-orange-600 hover:to-amber-600 shadow-sm transition"
              >
                <span>{c.launchLabel}</span>
                <Navigation size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Distance & Travel Time Cheat Sheet */}
      <Section id="distances" title={c.distances.heading}>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">{taxiRich(c.distances.intro)}</p>
        <div className="overflow-x-auto rounded-xl border border-orange-200 shadow-sm">
          <table className="w-full text-left text-sm text-gray-700 border-collapse">
            <thead className="bg-orange-100 text-gray-900 font-semibold">
              <tr>
                <th className="p-3.5 border-b border-orange-200">{c.distances.columns.segment}</th>
                <th className="p-3.5 border-b border-orange-200">{c.distances.columns.distance}</th>
                <th className="p-3.5 border-b border-orange-200">{c.distances.columns.time}</th>
                <th className="p-3.5 border-b border-orange-200">{c.distances.columns.notes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100 bg-white">
              {c.distances.rows.map((row) => (
                <tr key={row.segment} className="hover:bg-orange-50/30">
                  <td className="p-3.5 font-medium text-gray-900">{row.segment}</td>
                  <td className="p-3.5">{row.distance}</td>
                  <td className="p-3.5">{row.time}</td>
                  <td className="p-3.5">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Practical Travel Budgeting Tips */}
      <Section id="budgeting-tips" title={c.budgeting.heading}>
        <div className="grid gap-4 sm:grid-cols-3">
          {c.budgeting.tips.map((tip) => (
            <div key={tip.title} className="rounded-xl border border-orange-100 bg-white p-5">
              <h4 className="font-bold text-gray-900 text-base mb-2">{tip.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{taxiRich(tip.text)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQs */}
      <Faq items={c.faqs} heading={c.faqHeading} />

      <CtaBand context={c.ctaContext} />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: c.schema.name,
          description: plain(c.schema.description),
          path: PATH,
          crumbs,
        })}
      />
    </PageShell>
  );
}

