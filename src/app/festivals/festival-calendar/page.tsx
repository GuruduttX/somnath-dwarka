import type { Metadata } from "next";
import PageShell from "@/src/components/shared/PageShell";
import CalendarClient from "./CalendarClient";
import { getPublishedFestivals } from "@/src/lib/content";
import { buildMetadata } from "@/src/lib/seo";

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

  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Festivals", path: "/festivals/" },
        { name: "Calendar", path: "/festivals/festival-calendar/" },
      ]}
    >
      <CalendarClient dbFestivals={serializedDbFestivals} />
    </PageShell>
  );
}
