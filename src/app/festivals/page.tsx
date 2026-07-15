import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CalendarClock, Users, BedDouble, ArrowUpRight, Compass, Map, Building2, Calendar, ArrowRight } from "lucide-react";
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
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Festivals", path: PATH }]} flushHero lightCrumb>
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

          {/* ── Festival Calendar Banner ── */}
          <div className="mt-8 mx-auto max-w-3xl">
            <Link
              href="/festivals/festival-calendar/"
              className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50/60 via-amber-50/20 to-orange-50/60 p-6 shadow-sm hover:shadow-md hover:border-orange-350 transition duration-300 group"
            >
              <div className="flex items-center gap-4 text-left">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-md">
                  <CalendarClock size={20} className="animate-pulse" />
                </span>
                <div>
                  <h3 className="text-[15px] font-extrabold text-[#3a2416] leading-tight">
                    Explore the Complete Festival Calendar
                  </h3>
                  <p className="text-xs text-[#6b4c38] mt-1 leading-relaxed">
                    View upcoming dates (2026 – 2027), auspicious timing details, locations, and special darshan crowd tips.
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition shadow-md shadow-orange-600/10 group-hover:shadow-orange-600/20 whitespace-nowrap">
                Open Calendar
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          <div className="mt-12 pb-2">
            <FestivalCards festivals={festivals} />
          </div>
        </div>
      </div>

      {/* ── Plan-ahead strip ── */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { Icon: CalendarClock, t: "Book early", s: "Reserve stays and cabs 6–10 weeks ahead for peak festivals." },
            { Icon: Users, t: "Time your darshan", s: "Plan queues around aarti timings to avoid the biggest rush." },
            { Icon: BedDouble, t: "We handle logistics", s: "Hotels, transport and a festival-ready itinerary in one place." },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="group relative h-full overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)]">
              <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-orange-50 transition-transform duration-300 group-hover:scale-125" />
              <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                <Icon size={18} />
              </span>
              <p className="relative mt-4 text-[15px] font-bold text-[#3a2416]">{t}</p>
              <p className="relative mt-1 text-[13px] leading-relaxed text-[#6b4c38]">{s}</p>
            </div>
          ))}
        </div>
      </div>

      <Faq items={FAQ} heading="Festival FAQs" subheading="Planning a trip around Somnath and Dwarka's festivals." />

      <CtaBand context="Festival trip to Somnath Dwarka" />

      {/* ── Related guides & services (Below CTA) ── */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="border-t border-orange-100/60 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-4 flex items-center gap-1.5">
            <Sparkles size={11} className="text-orange-500" />
            <span>Related guides & services</span>
          </p>
          <ul className="grid gap-4 sm:grid-cols-4">
            {[
              { target: "/somnath-tour-package/", anchor: "Somnath Travel Guide", type: "pillar" },
              { target: "/dwarka-tour-package/", anchor: "Dwarka Travel Guide", type: "pillar" },
              { target: "/somnath-dwarka-taxi-service/", anchor: "Book Taxi Service", type: "sibling" },
              { target: "/somnath-dwarka-tour-package/", anchor: "Tour Packages", type: "money" },
            ].map((l) => {
              let Icon = Calendar;
              let label = "Read more";
              if (l.type === "pillar") {
                Icon = Compass;
                label = "Travel guide";
              } else if (l.type === "money") {
                Icon = Building2;
                label = "Book & compare";
              } else if (l.type === "sibling") {
                Icon = Map;
                label = "Plan your trip";
              }
              
              return (
                <li key={l.target + l.anchor}>
                  <Link
                    href={l.target}
                    className="group flex h-full items-center gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-[0_4px_20px_rgba(234,88,12,0.03)] transition-all duration-250 hover:-translate-y-0.5 hover:border-orange-250 hover:shadow-[0_12px_36px_rgba(234,88,12,0.08)]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                      <Icon size={18} />
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block text-[9.5px] font-bold uppercase tracking-wider text-orange-400">
                        {label}
                      </span>
                      <span className="mt-1 block text-xs sm:text-sm font-extrabold text-[#2a1a10] capitalize line-clamp-2">
                        {l.anchor}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange-600"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

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
