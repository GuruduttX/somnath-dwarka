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
import { SEED_HOTELS } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";
import { HOTELS_HUB as C } from "@/src/config/hotels";
import HotelSopSections from "@/src/components/hotels/HotelSopSections";

const PATH = "/hotels/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: C.titleTag,
  description: C.metaDescription,
  path: PATH,
});


export default function HotelHubPage() {
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
      <HotelHero />

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
        <div className="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              Choose your city
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              Stays near <span className="text-orange-500">Somnath &amp; Dwarka</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500 sm:text-base">
              Pick a temple town and we&apos;ll match you with the right hotel tier — from
              walkable budget lodges to sea-facing premium stays.
            </p>
          </div>

          <div className="mt-10 pb-4">
            <HotelCityCards hotels={SEED_HOTELS} />
          </div>
        </div>
      </div>

      <HotelSopSections copy={C} />

      <Faq items={[...C.faq]} heading="Somnath and Dwarka hotel FAQs" />

      <CtaBand context="Hotel assistance for Somnath Dwarka" title="Get hotel help" subtitle="Tell us your dates and budget and we'll recommend and book a stay." />
      <RelatedLinks links={related} />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Hotels near Somnath & Dwarka",
          description:
            "Curated stays near Somnath and Dwarka across budget, mid-range and premium tiers, booked to your dates.",
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
