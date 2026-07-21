/**
 * The place-per-day strip shown above the itinerary (PackageDurationStrip).
 *
 * The CMS "Duration breakdown" section is the source of truth. It was unreadable
 * for a long time — every route derived the strip from itinerary prose instead —
 * so most packages still have the field empty. Until they are filled in, the old
 * keyword derivation stands in, which keeps existing pages rendering exactly as
 * before while letting an editor override any of them by filling the section.
 */
export type BreakdownItem = { id: string; days: number; place: string };

type ItineraryDay = {
  title?: string;
  description?: string;
  stops?: string[];
};

/** Place names we recognise in itinerary prose, longest-match first. */
const PLACES = [
  "ahmedabad drop",
  "bet dwarka",
  "ahmedabad",
  "dwarka",
  "somnath",
  "porbandar",
  "rajkot",
  "mumbai",
  "jamnagar",
  "diu",
];

const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/** Best-effort place for one itinerary day, from its title, body and stops. */
function placeOf(item: ItineraryDay): string {
  const text = `${item.title || ""} ${item.description || ""} ${item.stops?.join(" ") || ""}`.toLowerCase();
  const hit = PLACES.find((p) => text.includes(p));
  if (hit) return titleCase(hit);

  const cleanTitle = (item.title || "").replace(/arrival|departure|sightseeing|to/gi, "").trim();
  const words = cleanTitle.split(/\s+/).filter((w) => w.length > 2);
  return words[0] || "Dwarka";
}

/**
 * The CMS section, normalised — or null when the editor has not filled it in.
 *
 * Routes call this first and fall back to their own derivation, which differs by
 * route: the Gir pages recognise Sasan Gir, Junagadh and Diu, the themed spokes
 * label days by title. Collapsing those into one matcher here would silently
 * change what published pages render.
 */
export function cmsBreakdown(input: unknown): BreakdownItem[] | null {
  const rows = (Array.isArray(input) ? input : []) as BreakdownItem[];
  const filled = rows.filter((b) => b && String(b.place || "").trim());
  if (!filled.length) return null;
  return filled.map((b, i) => ({
    id: String(b.id || `stop-${i}`),
    days: Number(b.days) || 1,
    place: String(b.place),
  }));
}

/** CMS breakdown when present, else one entry per itinerary day by place keyword. */
export function breakdownOf(
  input: unknown,
  itinerary: ItineraryDay[],
): BreakdownItem[] {
  return (
    cmsBreakdown(input) ??
    (itinerary || []).map((item, index) => ({
      id: `stop-${index}`,
      days: 1,
      place: placeOf(item),
    }))
  );
}
