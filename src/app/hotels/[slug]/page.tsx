import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, faqSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_HOTELS, findSeedHotel } from "@/src/lib/seed/destinations";
import { buildRelatedLinks } from "@/src/lib/links";

export const revalidate = 3600;
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SEED_HOTELS.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const h = findSeedHotel(slug);
  if (!h) return {};
  return buildMetadata({ title: h.title, description: h.answer_first, path: `/hotels/${slug}/` });
}

export default async function HotelCityPage({ params }: Params) {
  const { slug } = await params;
  const h = findSeedHotel(slug);
  if (!h) notFound();

  const related = buildRelatedLinks({
    self: `/hotels/${slug}/`,
    pillar: { target: "/hotels/", anchor: "all hotel guidance" },
    money: "packages",
    siblings: [
      { target: `/${h.city.toLowerCase()}/`, anchor: `${h.city} travel guide`, type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
    ],
  });

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Hotels", path: "/hotels/" },
        { name: `Hotels in ${h.city}`, path: `/hotels/${slug}/` },
      ]}
    >
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{h.h1}</h1>
        <AnswerFirst>{h.answer_first}</AnswerFirst>
      </div>

      <Section id="tiers" title="Where to stay by tier">
        <DataTable
          columns={["Tier", "Area", "Typical range / night"]}
          rows={h.tiers.map((t) => [t.tier, t.area, t.typical_range])}
          verify={{ key: "range", label: "Price ranges", value: "", verify: false }}
        />
        <p className="text-sm text-gray-500 mt-2">
          We do not publish ratings or bookable inventory unless it is real. Ranges are
          indicative and confirmed when we quote a specific hotel for your dates.
        </p>
      </Section>

      <Faq items={h.faq} heading={`Hotels in ${h.city} FAQs`} />
      <CtaBand context={`Hotels in ${h.city}`} title="Get a hotel recommendation" subtitle="Share your dates and budget for a real, bookable option." />
      <RelatedLinks links={related} />

      <JsonLd data={faqSchema(h.faq)} />
    </PageShell>
  );
}
