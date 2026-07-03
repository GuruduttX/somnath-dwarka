import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
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

      <CtaBand context="Somnath Dwarka trip planning" />
    </PageShell>
  );
}
