import type { Metadata } from "next";
import { Sparkles, CalendarClock, Users, BedDouble } from "lucide-react";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import JsonLd from "@/src/components/seo/JsonLd";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import FestivalsHero from "@/src/components/festivals/FestivalsHero";
import { FestivalCards, type FestivalItem } from "@/src/components/festivals/FestivalCards";
import { SEED_FESTIVALS } from "@/src/lib/seed/destinations";
import { getPublishedFestivals } from "@/src/lib/content";

const PATH = "/festivals/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Festivals — Dates, Rituals & Travel Guide",
  description:
    "Major festivals at Somnath and Dwarka including Janmashtami and Maha Shivratri: what to expect, travel advice and how to plan darshan around the crowds.",
  path: PATH,
});

// Map an admin/DB festival doc onto the card shape, filling gaps from sensible defaults.
function fromDb(f: Record<string, unknown>): FestivalItem {
  return {
    slug: String(f.slug),
    festival: String(f.festival ?? f.title ?? "Festival"),
    h1: String(f.h1 ?? f.festival ?? ""),
    answer_first: String(f.answer_first ?? ""),
    event_venue: String(f.event_venue ?? ""),
    image: String((f.image as string) || (f.hero_image as { url?: string })?.url || "/images/festivals/hero.jpg"),
    deity: String(f.deity ?? ""),
    city: String(f.city ?? ""),
    season: String(f.season ?? "Seasonal"),
    crowd: String(f.crowd ?? "High"),
    highlights: Array.isArray(f.highlights) ? (f.highlights as string[]) : [],
  };
}

const FAQ = [
  {
    question: "What are the biggest festivals at Somnath and Dwarka?",
    answer:
      "Janmashtami at Dwarka (Krishna's birth) and Maha Shivratri at Somnath are the largest celebrations. Kartik Purnima (Dev Diwali) at Somnath is a quieter, scenic alternative with a holy dip at Triveni Sangam.",
  },
  {
    question: "When is Janmashtami celebrated in Dwarka?",
    answer:
      "Janmashtami falls in August–September and the exact date changes each year with the Hindu calendar. We confirm the dates before each season rather than publishing an unverified one.",
  },
  {
    question: "How early should I book for a festival trip?",
    answer:
      "Reserve stays and cabs 6–10 weeks ahead for peak festivals. Tariffs rise and rooms near the temples fill quickly during Janmashtami and Maha Shivratri.",
  },
  {
    question: "Are the temples very crowded during festivals?",
    answer:
      "Yes — expect heavy crowds and long darshan queues, especially overnight on Maha Shivratri and around midnight on Janmashtami. Plan your darshan around the aarti timings to avoid the biggest rush.",
  },
  {
    question: "Can you plan a festival itinerary for me?",
    answer:
      "Yes. We arrange hotels, transport and a festival-ready day-wise itinerary covering both temple towns, timed around the crowds.",
  },
];

export default async function FestivalHubPage() {
  const dbFestivals = (await getPublishedFestivals()) as Array<Record<string, unknown>>;
  // Admin-published festivals win; otherwise fall back to the seeded guides.
  const festivals: FestivalItem[] = dbFestivals.length
    ? dbFestivals.map(fromDb)
    : SEED_FESTIVALS.map((f) => ({
        slug: f.slug,
        festival: f.festival,
        h1: f.h1,
        answer_first: f.answer_first,
        event_venue: f.event_venue,
        image: f.image,
        deity: f.deity,
        city: f.city,
        season: f.season,
        crowd: f.crowd,
        highlights: f.highlights,
      }));

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Festivals", path: PATH }]}>
      <FestivalsHero count={festivals.length} />

      {/* ── Festival guides ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              Festival guides
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              Celebrate at <span className="text-orange-500">Somnath &amp; Dwarka</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              Each guide covers the rituals, what to expect and how to plan travel and darshan
              around the crowds. Exact dates change yearly and are confirmed before publishing.
            </p>
          </div>

          <div className="mt-10 pb-2">
            <FestivalCards festivals={festivals} />
          </div>
        </div>
      </div>

      {/* ── Plan-ahead strip ── */}
      <div className="mx-auto max-w-5xl px-4 pt-12 pb-2">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { Icon: CalendarClock, t: "Book early", s: "Reserve stays and cabs 6–10 weeks ahead for peak festivals." },
            { Icon: Users, t: "Time your darshan", s: "Plan queues around aarti timings to avoid the biggest rush." },
            { Icon: BedDouble, t: "We handle logistics", s: "Hotels, transport and a festival-ready itinerary in one place." },
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

      <Faq items={FAQ} heading="Festival FAQs" subheading="Planning a trip around Somnath and Dwarka's festivals." />

      <CtaBand context="Festival trip to Somnath Dwarka" />

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Somnath & Dwarka Festivals",
          description:
            "Guides to major festivals at Somnath and Dwarka — dates, rituals and how to plan darshan around the crowds.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Festivals", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
