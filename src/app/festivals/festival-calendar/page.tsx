import type { Metadata } from "next";
import PageShell from "@/src/components/shared/PageShell";
import CalendarClient from "./CalendarClient";
import { getPublishedFestivals } from "@/src/lib/content";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { SITE_URL } from "@/src/config/site";
import JsonLd from "@/src/components/seo/JsonLd";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Somnath Dwarka Festival Calendar — 2026 & 2027 Dates & Guide",
  description:
    "Complete month-wise festival calendar for Somnath, Dwarka, Dakor, and Salangpur. Find auspicious tithis, exact dates for Janmashtami & Shivratri, and crowd advisory guides.",
  path: "/festivals/festival-calendar/",
  noindex: false,
});

export default async function FestivalCalendarPage() {
  const dbFestivals = await getPublishedFestivals();

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
      <CalendarClient dbFestivals={serializedDbFestivals} />
      <JsonLd
        data={[
          webPageSchema({
            name: "Somnath Dwarka Festival Calendar",
            description:
              "Month-wise festival calendar for Somnath, Dwarka, Dakor and Salangpur, with dates and crowd advisories.",
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
