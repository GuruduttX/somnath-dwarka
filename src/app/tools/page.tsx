import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import { SEED_TOOLS } from "@/src/lib/seed/destinations";

const PATH = "/tools/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Trip Tools — Planner & Fare Calculator",
  description:
    "Free tools to plan your Somnath–Dwarka trip: an itinerary planner and a cab fare calculator. Static, crawlable guidance plus an interactive layer.",
  path: PATH,
});

export default function ToolsHubPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Tools", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Trip planning tools</h1>
        <AnswerFirst>
          Use these free tools to shape your Somnath–Dwarka trip — build a day-wise itinerary or
          estimate cab fares. Each tool ships a static, crawlable version that works without
          JavaScript, with an interactive layer on top.
        </AnswerFirst>
      </div>

      <Section id="tools" title="Available tools">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_TOOLS.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tools/${t.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">{t.h1}</span>
                <span className="block text-sm text-gray-500 mt-1">{t.tool_type}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          name: "Somnath Dwarka Trip Tools",
          description:
            "Free trip-planning tools for Somnath and Dwarka — an itinerary planner and a cab fare calculator.",
          path: PATH,
          crumbs: [
            { name: "Home", path: "/" },
            { name: "Tools", path: PATH },
          ],
        })}
      />
    </PageShell>
  );
}
