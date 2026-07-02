import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import { SEED_HOTELS } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

const PATH = "/hotels/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Hotels for Somnath Dwarka — Near Temples, Budget to Luxury",
  description:
    "Hotel guidance for Somnath and Dwarka: where to stay near the temples across budget, mid-range and premium tiers. We help you pick and book — no fake inventory.",
  path: PATH,
});

export default function HotelHubPage() {
  const related = buildRelatedLinks({
    self: PATH,
    money: "packages",
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" },
      { target: "/dwarka/", anchor: "Dwarka travel guide", type: "sibling" },
    ],
  });

  return (
    <PageShell crumbs={[{ name: "Home", path: "/" }, { name: "Hotels", path: PATH }]}>
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Hotels for Somnath &amp; Dwarka</h1>
        <AnswerFirst>
          We help you choose and book the right stay near the Somnath and Dwarka temples,
          across budget, mid-range and premium tiers. We do not list fabricated inventory or
          ratings — you get honest area guidance and assistance to book a real hotel for your dates.
        </AnswerFirst>
      </div>

      <Section id="cities" title="By city">
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEED_HOTELS.map((h) => (
            <li key={h.slug}>
              <Link
                href={`/hotels/${h.slug}/`}
                className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
              >
                <span className="block font-semibold text-gray-800">Hotels in {h.city}</span>
                <span className="block text-sm text-gray-500 mt-1">Near {h.near_temple}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand context="Hotel assistance for Somnath Dwarka" title="Get hotel help" subtitle="Tell us your dates and budget and we'll recommend and book a stay." />
      <RelatedLinks links={related} />
    </PageShell>
  );
}
