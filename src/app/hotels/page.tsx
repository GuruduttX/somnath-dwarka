import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import HotelHero from "@/src/components/hotels/HotelHero";
import { HotelCityCards } from "@/src/components/hotels/HotelCityCards";
import { buildRelatedLinks } from "@/src/lib/links";
import HotelSopSections from "@/src/components/hotels/HotelSopSections";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { HOTELS_DATASET } from "@/src/lib/cms-groups/catalog";
import { HOTELS_PAGE } from "./content";

const PATH = HOTELS_PAGE.path;
/* Copy: ./content.ts (CMS page "hotels"); the city cards: the site_hotels dataset. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const C = await getPageContent(HOTELS_PAGE);
  return buildMetadata({ title: C.titleTag, description: C.metaDescription, path: PATH });
}

export default async function HotelHubPage() {
  const [C, hotels] = await Promise.all([getPageContent(HOTELS_PAGE), getDataset(HOTELS_DATASET)]);
  const related = buildRelatedLinks({
    self: PATH,
    money: "packages",
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" },
      { target: "/dwarka/", anchor: "Dwarka travel guide", type: "sibling" },
    ],
  });

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Hotels", path: PATH }]} flushHero>
      <HotelHero copy={C.hero} />

      {/* ── Quick answer ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pt-12 text-center sm:pt-14">
          <p className="text-[15px] leading-[1.8] text-[#6b4c38] sm:text-base">{C.quickAnswer}</p>
        </div>
      </div>

      {/* ── At a glance ── */}
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-10">
        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {C.atAGlance.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-orange-100/60 bg-gradient-to-r from-orange-50/30 via-white to-transparent p-4"
              >
                <dt className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{f.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-slate-800 leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-slate-600 leading-relaxed">{C.intro}</p>
        </div>
      </div>

      {/* ── CITY CARDS ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/60 via-white to-amber-50/40">
        {/* soft decorative glow behind glass cards */}
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="relative mx-auto max-w-[1600px] px-4 pt-14 sm:px-6 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              {C.citySection.badge}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              {C.citySection.headingStart} <span className="text-orange-500">{C.citySection.headingHighlight}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-base">
              {C.citySection.intro}
            </p>
          </div>

          <div className="mt-10 pb-4">
            <HotelCityCards hotels={hotels} labels={C.cards} />
          </div>
        </div>
      </div>

      <HotelSopSections copy={C} />

      <Faq items={[...C.faq]} heading={C.faqHeading} />

      <CtaBand context={C.ctaBand.context} title={C.ctaBand.title} subtitle={C.ctaBand.subtitle} />
      <RelatedLinks links={related} />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: C.schema.name,
          description: C.schema.description,
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Hotels", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
