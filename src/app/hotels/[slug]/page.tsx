import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles, ShieldCheck, Wallet } from "lucide-react";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import HotelCityHero from "@/src/components/hotels/HotelCityHero";
import { HotelPropertyCards } from "@/src/components/hotels/HotelPropertyCards";
import { SEED_HOTELS, findSeedHotel } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ slug: string }> };

// City → banner image for the hero.
const CITY_IMAGE: Record<string, string> = {
  Somnath: "/images/hotels/somnath.jpg",
  Dwarka: "/images/hotels/dwarka.jpg",
};

export function generateStaticParams() {
  return SEED_HOTELS.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const h = findSeedHotel(slug);
  if (!h) return {};
  return buildMetadata({ title: h.title, description: h.answer_first, path: `/hotels/${slug}/` });
}

export default async function HotelCityPage({ params }: Params) {
  const { slug } = await params;
  const h = findSeedHotel(slug);
  if (!h) notFound();

  const properties = h.properties ?? [];
  const avgRating =
    properties.length > 0
      ? properties.reduce((s, p) => s + (p.rating || 0), 0) / properties.length
      : 4.5;

  const related = buildRelatedLinks({
    self: `/hotels/${slug}/`,
    pillar: { target: "/hotels/", anchor: "all hotel guidance" },
    money: "packages",
    siblings: [
      { target: `/${h.city.toLowerCase()}/`, anchor: `${h.city} travel guide`, type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Hotels", path: "/hotels/" },
        { name: `Hotels in ${h.city}`, path: `/hotels/${slug}/` },
      ]}
    >
      <HotelCityHero
        city={h.city}
        h1={h.h1}
        nearTemple={h.near_temple}
        image={CITY_IMAGE[h.city] ?? "/images/hotels/hero.jpg"}
        tiers={h.tiers}
        count={properties.length}
        rating={avgRating}
      />

      {/* ── Intro / answer-first ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 pt-12 text-center sm:pt-14">
          <p className="text-[15px] leading-[1.8] text-[#6b4c38] sm:text-base">{h.answer_first}</p>
        </div>
      </div>

      {/* ── Hotel listing ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              Handpicked in {h.city}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              Places to stay in <span className="text-orange-500">{h.city}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              Filter by comfort tier and enquire on any stay — we confirm real availability
              and a firm price for your exact dates.
            </p>
          </div>

          <div className="mt-10 pb-2">
            <HotelPropertyCards properties={properties} city={h.city} />
          </div>
        </div>
      </div>

      {/* ── Tier price guide ── */}
      <Section id="tiers" title="Price guide by tier">
        <DataTable
          columns={["Tier", "Area", "Typical range / night"]}
          rows={h.tiers.map((t) => [t.tier, t.area, t.typical_range])}
          verify={{ key: "range", label: "Price ranges", value: "", verify: false }}
        />
        <p className="mt-2 text-sm text-gray-500">
          Ranges are indicative and confirmed when we quote a specific hotel for your dates.
          We do not publish ratings or inventory unless it is real.
        </p>
      </Section>

      {/* ── Why book with us strip ── */}
      <div className="mx-auto max-w-5xl px-4 pb-2">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { Icon: ShieldCheck, t: "Real, verified stays", s: "No fake inventory or ratings — only hotels we can actually book." },
            { Icon: Wallet, t: "Best-fit for your budget", s: "We match the right tier and area to your dates and group size." },
            { Icon: Sparkles, t: "Local pilgrim know-how", s: "Advice tuned around darshan and aarti timings near the temple." },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 ring-1 ring-orange-100">
                <Icon size={18} />
              </span>
              <p className="mt-3 text-[15px] font-bold text-[#3a2416]">{t}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#6b4c38]">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <Faq items={h.faq} heading={`Hotels in ${h.city} FAQs`} />
      <CtaBand context={`Hotels in ${h.city}`} title="Get a hotel recommendation" subtitle="Share your dates and budget for a real, bookable option." />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(h.faq)} />
    </PageShell>
  );
}
