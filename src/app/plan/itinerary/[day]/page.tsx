import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/src/lib/seo";
import CmsPage from "@/src/components/templates/cms/CmsPage";
import { ItineraryDays } from "@/src/components/templates/cms/blocks";
import { buildRelatedLinks } from "@/src/lib/links";
import { getItineraryBySlug, getPublishedItineraries } from "@/src/lib/content";
import { bool, descOf, faqOf, h1Of, list, relatedOf, s, titleOf } from "@/src/lib/cms";

/**
 * /plan/itinerary/{day}/ — the two MVP-wave nested itinerary pages. A nested
 * static folder rather than converting /plan/[topic]/ to a catch-all, which
 * would change matching for every existing journey page.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ day: string }> };

export async function generateStaticParams() {
  const items = await getPublishedItineraries();
  return items.map((i) => ({ day: String(i.slug) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { day } = await params;
  const doc = await getItineraryBySlug(day);
  if (!doc) return {};
  return buildMetadata({
    title: titleOf(doc),
    description: descOf(doc),
    path: `/plan/itinerary/${day}/`,
    noindex: bool(doc, "noindex"),
    canonicalOverride: s(doc, "canonical_override") || undefined,
  });
}

export default async function ItineraryPage({ params }: Params) {
  const { day } = await params;
  const doc = await getItineraryBySlug(day);
  if (!doc) notFound();

  const path = `/plan/itinerary/${day}/`;

  return (
    <CmsPage
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Plan your trip", path: "/plan/" },
        { name: s(doc, "title"), path },
      ]}
      h1={h1Of(doc)}
      path={path}
      answerFirst={s(doc, "direct_answer") || s(doc, "answer_first") || undefined}
      body={s(doc, "body") || undefined}
      faq={faqOf(doc)}
      related={buildRelatedLinks({
        self: path,
        pillar: { target: "/plan/", anchor: "plan your Somnath–Dwarka trip" },
        money: "packages",
        extra: relatedOf(doc),
      })}
      ctaContext={s(doc, "title")}
    >
      <ItineraryDays days={list(doc, "itinerary_days")} />
    </CmsPage>
  );
}
