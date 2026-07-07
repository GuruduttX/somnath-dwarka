import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import { CORE_FACTS } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import PlanHero from "@/src/components/plan/PlanHero";
import { PlanCards } from "@/src/components/plan/PlanCards";
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
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Plan your trip", path: PATH }]}>
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

      <Faq items={FAQ} heading="Trip planning FAQs" subheading="Quick answers to the questions travellers ask before booking." />

      <CtaBand context="Somnath Dwarka trip planning" />

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
