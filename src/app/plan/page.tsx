import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
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
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Plan your Somnath Dwarka trip</h1>
        <AnswerFirst>
          These planning guides answer the practical questions before you book: how far Dwarka
          is from Somnath, how many days you need, which temple to visit first, and how a
          typical 3–5 day itinerary flows. Start with the question closest to your trip.
        </AnswerFirst>
      </div>

      <Section id="guides" title="Planning guides">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_JOURNEYS.map((j) => (
            <li key={j.slug}>
              <Link
                href={`/plan/${j.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">{j.question}</span>
                <span className="block text-sm text-gray-500 mt-1 line-clamp-2">{j.direct_answer}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand context="Somnath Dwarka trip planning" />
    </PageShell>
  );
}
