import { cache } from "react";
import { getPublishedFestivals } from "@/src/lib/content";
import { getDatasetItem } from "@/src/lib/datasets/store";
import { FESTIVALS_DATASET } from "@/src/lib/cms-groups/catalog";
import type { SeedFestival } from "@/src/lib/seed/destinations";

/*
  One festival page's data. The /festivals/ listing shows the published
  Festival CMS items when any exist (else the site_festivals dataset), so the
  detail page looks in the same order: a published CMS festival first, mapped
  onto the dataset shape, then the dataset item. A festival the listing links
  to therefore never 404s.
*/

export type FestivalPage = SeedFestival & {
  /** SEO title and meta description (a CMS item may set its own; else title / answer_first). */
  metaTitle: string;
  metaDescription: string;
};

const str = (v: unknown) => (typeof v === "string" ? v : "");

const CROWDS: SeedFestival["crowd"][] = ["Very high", "High", "Moderate"];

/** A published Festival CMS document in the shape the festival page renders. */
export function festivalFromCms(f: Record<string, unknown>): FestivalPage {
  const festival = str(f.festival) || str(f.title) || "Festival";
  const crowd = CROWDS.find((c) => c.toLowerCase() === str(f.crowd).toLowerCase()) ?? (str(f.crowd) as SeedFestival["crowd"]);
  const faq = Array.isArray(f.faq)
    ? (f.faq as Array<Record<string, unknown>>)
        .map((q) => ({ question: str(q?.question), answer: str(q?.answer) }))
        .filter((q) => q.question && q.answer)
    : [];
  const title = str(f.title) || festival;
  const answerFirst = str(f.answer_first);
  return {
    slug: String(f.slug),
    festival,
    title,
    h1: str(f.h1) || title,
    answer_first: answerFirst,
    rituals: str(f.rituals),
    travel_advice: str(f.travel_advice),
    event_venue: str(f.event_venue),
    // The Event schema gate: only a date the editor marked verified is used.
    date_this_year: f.date_verified ? str(f.date_this_year) : "",
    image: str(f.image) || str((f.hero_image as { url?: unknown } | undefined)?.url),
    deity: str(f.deity),
    city: str(f.city),
    season: str(f.season) || "Seasonal",
    crowd: crowd || "High",
    highlights: Array.isArray(f.highlights) ? (f.highlights as unknown[]).map(String).filter(Boolean) : [],
    faq,
    metaTitle: str(f.title_tag) || title,
    metaDescription: str(f.meta_description) || answerFirst,
  };
}

/** The festival at /festivals/<slug>/, or null. Read once per request. */
export const getFestival = cache(async (slug: string): Promise<FestivalPage | null> => {
  const cms = (await getPublishedFestivals()).find((f) => f.slug === slug);
  if (cms) return festivalFromCms(cms);
  const item = await getDatasetItem(FESTIVALS_DATASET, slug);
  return item ? { ...item, metaTitle: item.title, metaDescription: item.answer_first } : null;
});
