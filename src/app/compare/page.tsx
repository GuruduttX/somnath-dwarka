import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import { SEED_COMPARISONS } from "@/src/lib/seed/destinations";

const PATH = "/compare/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Comparisons — Which to Choose",
  description:
    "Side-by-side comparisons to plan your Somnath–Dwarka trip: Somnath vs Dwarka and other choices, with clear verdicts and recommendations.",
  path: PATH,
});

export default function CompareHubPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Compare", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Comparisons</h1>
        <AnswerFirst>
          Not sure how to choose? These side-by-side comparisons give a clear verdict for the
          common decisions travellers face when planning a Somnath–Dwarka pilgrimage.
        </AnswerFirst>
      </div>

      <Section id="comparisons" title="All comparisons">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_COMPARISONS.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/compare/${c.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">{c.h1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand context="Somnath Dwarka trip planning" />
    </PageShell>
  );
}
