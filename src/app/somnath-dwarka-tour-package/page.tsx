import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, touristTripSchema } from "@/src/lib/seo";
import { CORE_FACTS } from "@/src/config/site";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import TrustBand from "@/src/components/shared/TrustBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { getPublishedPackages, packagePath } from "@/src/lib/content";
import { SEED_PACKAGES } from "@/src/lib/seed/packages";
import { buildRelatedLinks } from "@/src/lib/links";

const PATH = "/somnath-dwarka-tour-package/";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Tour Package — Itinerary, Price & Booking",
  description:
    "Somnath Dwarka tour packages with day-wise itinerary, inclusions, indicative prices and cab + hotel help. Choose by duration, starting city or budget.",
  path: PATH,
});

export default async function PackagePillarPage() {
  const cms = (await getPublishedPackages()) as Array<Record<string, unknown>>;
  // Merge CMS variants with seed variants (seed fills the matrix pre-launch).
  const cmsSlugs = new Set(cms.map((p) => String(p.slug)));
  const variants = [
    ...cms.map((p) => ({
      slug: String(p.slug),
      title: String(p.h1 || p.title || p.slug),
      duration: String(p.duration || ""),
      price_from: Number(p.price_from || (p as { price?: number }).price || 0),
    })),
    ...SEED_PACKAGES.filter((s) => !cmsSlugs.has(s.slug)).map((s) => ({
      slug: s.slug,
      title: s.h1,
      duration: s.duration,
      price_from: s.price_from,
    })),
  ];

  const byDuration = variants.filter((v) => /days|nights/i.test(v.duration) || /\d-days/.test(v.slug));
  const byCity = variants.filter((v) => v.slug.startsWith("from-"));
  const byType = variants.filter((v) => ["for-family", "budget", "senior-citizen"].includes(v.slug));

  const related = buildRelatedLinks({
    self: PATH,
    money: "taxi",
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "pillar" },
      { target: "/dwarka/", anchor: "Dwarka travel guide", type: "pillar" },
      { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "how many days you need", type: "sibling" },
      { target: "/hotels/", anchor: "hotels near the temples", type: "money" },
    ],
  });

  const pillarFaq = [
    {
      question: "What does a Somnath Dwarka tour package include?",
      answer:
        "Most packages include hotel stays, a private vehicle with driver, daily breakfast and a temple-sequenced itinerary. Air/train fare and lunch/dinner are usually excluded. Exact inclusions are listed on each variant.",
    },
    {
      question: "How much does a Somnath Dwarka tour package cost?",
      answer:
        "Prices shown are indicative starting points pending confirmation and vary by duration, starting city, hotel tier and group size. Share your dates for a firm quote.",
    },
    {
      question: "How many days are ideal for Somnath and Dwarka?",
      answer:
        "Three days is the minimum to cover both temples; four to five days is more comfortable and adds Nageshwar, Bet Dwarka and Porbandar.",
    },
  ];

  const VariantGrid = ({ items }: { items: typeof variants }) =>
    items.length ? (
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((v) => (
          <li key={v.slug}>
            <Link
              href={packagePath(v.slug)}
              className="block h-full p-4 rounded-xl border border-orange-100 bg-white hover:border-[#E87722] hover:shadow-sm transition"
            >
              <span className="block font-semibold text-gray-800">{v.title}</span>
              <span className="block text-sm text-gray-500 mt-1">{v.duration}</span>
              {v.price_from ? (
                <span className="block text-sm text-[#B85C10] mt-2">
                  from ₹{v.price_from.toLocaleString("en-IN")}*
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Tour packages", path: PATH },
      ]}
    >
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Somnath Dwarka Tour Package
        </h1>
        <AnswerFirst>
          Our Somnath Dwarka tour packages cover Dwarkadhish Temple, Nageshwar Jyotirlinga,
          Bet Dwarka and Somnath Temple with the evening aarti, using private transport and
          hand-picked hotels. Choose by duration, starting city or budget below — every plan
          is sequenced around darshan timings, and prices shown are indicative until confirmed.
        </AnswerFirst>
      </div>

      <Section id="by-duration" title="By duration">
        <VariantGrid items={byDuration} />
      </Section>

      <Section id="by-city" title="By starting city">
        <VariantGrid items={byCity} />
      </Section>

      {byType.length ? (
        <Section id="by-traveller" title="By traveller & budget">
          <VariantGrid items={byType} />
        </Section>
      ) : null}

      <Section id="price" title="Indicative price guide">
        <p className="text-gray-600 mb-2">
          Package prices start from the figures shown on each variant. These are indicative
          starting points and depend on group size, hotel tier, vehicle and season.
        </p>
        <VerifyStamp fact={{ key: "pkgPrice", label: "Package prices", value: "", verify: false }} />
      </Section>

      <TrustBand />
      <Faq items={pillarFaq} heading="Somnath Dwarka package FAQs" />
      <CtaBand context="Somnath Dwarka tour package" />
      <RelatedLinks links={related} />

      <JsonLd
        data={touristTripSchema({
          name: "Somnath Dwarka Tour Package",
          description:
            "Pilgrimage tour packages covering Somnath and Dwarka temples with private transport and hotels.",
          path: PATH,
        })}
      />
      <p className="max-w-5xl mx-auto px-4 text-xs text-gray-400">
        * Indicative starting prices, pending confirmation ({CORE_FACTS.circuitLength.label.toLowerCase()}: {CORE_FACTS.circuitLength.value}).
      </p>
    </PageShell>
  );
}
