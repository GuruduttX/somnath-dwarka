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

const PATH = "/hotels/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Hotels for Somnath Dwarka — Near Temples, Budget to Luxury",
  description:
    "Hotel guidance for Somnath and Dwarka: where to stay near the temples across budget, mid-range and premium tiers. We help you pick and book — no fake inventory.",
  path: PATH,
});

const FAQ = [
  {
    question: "Where should I stay in Somnath and Dwarka?",
    answer:
      "Staying near the temple keeps early darshan and the evening aarti within walking distance. In Somnath, temple-road and sea-facing stays are popular; in Dwarka, hotels cluster around Dwarkadhish Temple and the main road.",
  },
  {
    question: "Do you have budget hotels near the temples?",
    answer:
      "Yes. Clean budget lodges near Somnath Temple and Dwarkadhish start from roughly ₹700–₹1,500 a night. We help you pick and book the right tier — we never list fake inventory or ratings.",
  },
  {
    question: "Can you book the hotel for me?",
    answer:
      "Yes. Share your dates, city and budget and we recommend and book a suitable stay across budget, mid-range or premium tiers, confirming availability before you pay.",
  },
  {
    question: "How far in advance should I book a room?",
    answer:
      "For regular dates a week's notice is usually fine. For peak festivals like Janmashtami in Dwarka or Maha Shivratri at Somnath, book 6–10 weeks ahead as rooms fill fast and tariffs rise.",
  },
  {
    question: "Are there sea-facing hotels in Somnath?",
    answer:
      "Yes — a few mid-range and premium sea-facing hotels sit along the promenade, a short walk from the temple and the evening light-and-sound show.",
  },
];

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

      <Faq items={FAQ} heading="Hotel FAQs" subheading="Common questions about staying near Somnath and Dwarka." />

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
