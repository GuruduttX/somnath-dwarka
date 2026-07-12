import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Compass, Map, Building2, Calendar } from "lucide-react";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import { CORE_FACTS } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import PlanHero from "@/src/components/plan/PlanHero";
import { PlanCards } from "@/src/components/plan/PlanCards";
import CompareSection from "@/src/components/plan/CompareSection";
import { SEED_JOURNEYS } from "@/src/lib/seed/destinations";

const PATH = "/plan/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Plan Your Somnath Dwarka Trip — Distance, Days & Routes",
  description:
    "Planning guides for the Somnath–Dwarka pilgrimage: distance and drive time, how many days you need, which temple to visit first, and sample itineraries.",
  path: PATH,
});

const FAQ = [
  {
    question: "How many days do you need for Somnath and Dwarka?",
    answer:
      "Plan 3–5 days. Three days covers both temples at a brisk pace; four to five days adds Nageshwar, Bet Dwarka and Porbandar with unhurried darshan and no long single-day drives.",
  },
  {
    question: "What is the distance between Somnath and Dwarka?",
    answer: `The road distance is ${CORE_FACTS.dwarkaSomnathDistance.value} and takes ${CORE_FACTS.dwarkaSomnathDuration.value}, typically via Porbandar.`,
  },
  {
    question: "Should I visit Somnath or Dwarka first?",
    answer:
      "Either order works — pick the temple town closer to your entry point to avoid backtracking. Flying into Diu, start with Somnath; arriving via Jamnagar, start with Dwarka.",
  },
  {
    question: "What is the best time to visit?",
    answer:
      "October to March offers pleasant coastal weather. Avoid peak monsoon if you plan the Bet Dwarka ferry crossing, which can be disrupted by rough seas.",
  },
  {
    question: "Is there a direct train between Somnath and Dwarka?",
    answer:
      "There is no convenient direct train. Most pilgrims cover the route by road, which is the practical option when visiting both temples.",
  },
];

export default function PlanHubPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Plan your trip", path: PATH }]} flushHero>
      <PlanHero />

      {/* ── Planning guides ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              Planning guides
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              Answers before you <span className="text-orange-500">book</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              Start with the question closest to your trip — distance, trip length, route order,
              or a ready-made day-wise itinerary.
            </p>
          </div>

          <div className="mt-10 pb-4">
            <PlanCards journeys={SEED_JOURNEYS} />
          </div>
        </div>
      </div>

      {/* ── Compare & decide ── */}
      <CompareSection />

      <Faq items={FAQ} heading="Trip planning FAQs" subheading="Quick answers to the questions travellers ask before booking." />

      <CtaBand context="Somnath Dwarka trip planning" />

      {/* ── Related guides & services (Below CTA) ── */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="border-t border-orange-100/60 pt-8">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-600 mb-4 flex items-center gap-1.5">
            <Sparkles size={11} className="text-orange-500" />
            <span>Related guides & services</span>
          </p>
          <ul className="grid gap-4 sm:grid-cols-3">
            {[
              { target: "/tools/itinerary-planner/", anchor: "Gujarat Itinerary Planner", type: "tool" },
              { target: "/circuits/gandhi-circuit-gujarat/", anchor: "Gandhi Circuit Gujarat", type: "circuit" },
              { target: "/somnath/", anchor: "Somnath Travel Guide", type: "pillar" },
              { target: "/dwarka/", anchor: "Dwarka Travel Guide", type: "pillar" },
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
              } else if (l.type === "tool") {
                Icon = Calendar;
                label = "Free tool";
              } else if (l.type === "circuit") {
                Icon = Map;
                label = "Circuit route";
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
          name: "Plan Your Somnath Dwarka Trip",
          description:
            "Trip-planning answers for Somnath and Dwarka — how many days, best routes, distances and season tips.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Plan your trip", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
