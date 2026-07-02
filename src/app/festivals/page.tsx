import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import { SEED_FESTIVALS } from "@/src/lib/seed/destinations";

const PATH = "/festivals/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Festivals — Dates, Rituals & Travel Guide",
  description:
    "Major festivals at Somnath and Dwarka including Janmashtami and Maha Shivratri: what to expect, travel advice and how to plan darshan around the crowds.",
  path: PATH,
});

export default function FestivalHubPage() {
  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Festivals", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Festivals at Somnath &amp; Dwarka</h1>
        <AnswerFirst>
          Somnath and Dwarka host major Hindu festivals — Maha Shivratri at Somnath and
          Janmashtami at Dwarka draw the biggest crowds. These guides cover what to expect and
          how to plan travel and darshan; exact dates change yearly and are confirmed before publishing.
        </AnswerFirst>
      </div>

      <Section id="festivals" title="Festival guides">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_FESTIVALS.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/festivals/${f.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">{f.h1}</span>
                <span className="block text-sm text-gray-500 mt-1">{f.event_venue}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand context="Festival trip to Somnath Dwarka" />
    </PageShell>
  );
}
