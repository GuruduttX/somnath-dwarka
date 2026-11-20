import type { Metadata } from "next";
import PageShell from "@/src/components/shared/PageShell";
import CalendarClient from "./CalendarClient";
import { getPublishedFestivals } from "@/src/lib/content";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { SITE_URL } from "@/src/config/site";
import JsonLd from "@/src/components/seo/JsonLd";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { FESTIVAL_CALENDAR_DATASET } from "@/src/lib/cms-groups/catalog";
import { CALENDAR_PAGE, type CalendarEvent } from "./content";

/* Entries: the site_festival_calendar dataset; copy: ./content.ts (CMS page "festival-calendar"). */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(CALENDAR_PAGE);
  return buildMetadata({
    title: c.meta.title,
    description: c.meta.description,
    path: "/festivals/festival-calendar/",
    noindex: false,
  });
}

export default async function FestivalCalendarPage() {
  const [dbFestivals, entries, c] = await Promise.all([
    getPublishedFestivals(),
    getDataset(FESTIVAL_CALENDAR_DATASET),
    getPageContent(CALENDAR_PAGE),
  ]);

  // Safe Mongoose-to-JSON serialization
  const serializedDbFestivals = dbFestivals.map((f) => ({
    slug: String(f.slug),
    festival: String(f.festival || f.title || ""),
    date_this_year: String(f.date_this_year || ""),
    date_verified: Boolean(f.date_verified),
    rituals: String(f.rituals || ""),
    travel_advice: String(f.travel_advice || ""),
    event_venue: String(f.event_venue || ""),
    deity: String(f.deity || ""),
    city: String(f.city || ""),
    season: String(f.season || ""),
    crowd: String(f.crowd || ""),
    highlights: Array.isArray(f.highlights) ? f.highlights.map(String) : [],
  }));

  // A published Festival CMS item with an entry's slug overrides that entry's fields.
  const events: CalendarEvent[] = entries.map((entry) => {
    const db = serializedDbFestivals.find((d) => d.slug === entry.slug);
    if (!db) return entry;
    const e = { ...entry };
    if (db.date_this_year && db.date_verified) e.date2026 = db.date_this_year;
    if (db.rituals) e.rituals = db.rituals;
    if (db.travel_advice) e.travelAdvice = db.travel_advice;
    if (db.event_venue) e.location = db.event_venue;
    if (db.deity) e.deity = db.deity;
    if (db.crowd) e.crowdLevel = db.crowd;
    return e;
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Festivals", path: "/festivals/" },
    { name: "Calendar", path: "/festivals/festival-calendar/" },
  ];

  /**
   * Only festivals whose date is actually confirmed become Event nodes. A
   * calendar is the one page where a wrong date is the whole failure: an Event
   * with a guessed startDate can surface in a search result as a fact, so an
   * unconfirmed festival stays a list entry and never becomes an Event.
   */
  const datedEvents = serializedDbFestivals.filter(
    (f) => f.date_verified && f.date_this_year
  );

  return (
    <PageShell crumbs={crumbs}>
      <CalendarClient events={events} copy={c} />
      <JsonLd
        data={[
          webPageSchema({
            name: c.schema.name,
            description: c.schema.description,
            path: "/festivals/festival-calendar/",
            type: "CollectionPage",
            crumbs,
          }),
          ...datedEvents.map((f) => ({
            "@context": "https://schema.org",
            "@type": "Event",
            "@id": `${SITE_URL}/festivals/${f.slug}/#event`,
            name: f.festival,
            startDate: f.date_this_year,
            url: `${SITE_URL}/festivals/${f.slug}/`,
            ...(f.rituals ? { description: f.rituals } : {}),
            ...(f.event_venue || f.city
              ? {
                  location: {
                    "@type": "Place",
                    name: f.event_venue || f.city,
                    address: {
                      "@type": "PostalAddress",
                      ...(f.city ? { addressLocality: f.city } : {}),
                      addressRegion: "Gujarat",
                      addressCountry: "IN",
                    },
                  },
                }
              : {}),
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          })),
        ]}
      />
    </PageShell>
  );
}
