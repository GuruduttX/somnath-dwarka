import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import HotelHero from "@/src/components/hotels/HotelHero";
import { HotelCityCards } from "@/src/components/hotels/HotelCityCards";
import { SEED_HOTELS } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

const PATH = "/hotels/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Hotels for Somnath Dwarka — Near Temples, Budget to Luxury",
  description:
    "Hotel guidance for Somnath and Dwarka: where to stay near the temples across budget, mid-range and premium tiers. We help you pick and book — no fake inventory.",
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
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Hotels", path: PATH }]}>
      <HotelHero />

      {/* ── CITY CARDS ── */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
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

      <CtaBand context="Hotel assistance for Somnath Dwarka" title="Get hotel help" subtitle="Tell us your dates and budget and we'll recommend and book a stay." />
      <RelatedLinks links={related} />
    </PageShell>
  );
}
