/**
 * Field definitions for the admin content editor (model-free — safe to import
 * in client components). Drives real form inputs instead of raw JSON, per type.
 * Shared SEO fields are handled separately by ContentManager.
 */
export type FieldDef =
  | { name: string; label: string; type: "text" | "textarea" | "number" | "checkbox"; hint?: string }
  | { name: string; label: string; type: "select"; options: string[]; hint?: string }
  | { name: string; label: string; type: "list"; hint?: string }
  | { name: string; label: string; type: "verify"; hint?: string }
  | { name: string; label: string; type: "objectList"; fields: FieldDef[]; hint?: string };

export const CONTENT_SCHEMAS: Record<string, FieldDef[]> = {
  taxi: [
    { name: "kind", label: "Kind", type: "select", options: ["route", "vehicle"] },
    { name: "title", label: "Title", type: "text" },
    { name: "origin", label: "Origin (route)", type: "text" },
    { name: "destination", label: "Destination (route)", type: "text" },
    { name: "distance_km", label: "Distance (km)", type: "verify" },
    { name: "duration_hrs", label: "Duration (hrs)", type: "verify" },
    { name: "trip_type", label: "Trip type", type: "select", options: ["one_way", "round_trip", "both"] },
    { name: "stops", label: "Stops en route", type: "list" },
    { name: "vehicle_name", label: "Vehicle name (vehicle)", type: "text" },
    { name: "seats", label: "Seats (vehicle)", type: "number" },
    { name: "suitable_for", label: "Suitable for (vehicle)", type: "textarea" },
    {
      name: "fares",
      label: "Fares",
      type: "objectList",
      fields: [
        { name: "vehicle", label: "Vehicle", type: "text" },
        { name: "seats", label: "Seats", type: "number" },
        { name: "per_km", label: "Per km", type: "text" },
        { name: "package_rate", label: "Package rate", type: "text" },
      ],
    },
    { name: "inclusions", label: "Inclusions", type: "list" },
    { name: "exclusions", label: "Exclusions", type: "list" },
  ],
  hotel: [
    { name: "title", label: "Title", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "near_temple", label: "Near temple", type: "text" },
    {
      name: "tiers",
      label: "Tiers",
      type: "objectList",
      fields: [
        { name: "tier", label: "Tier (Budget/Mid/Luxury)", type: "text" },
        { name: "area", label: "Area", type: "text" },
        { name: "typical_range", label: "Typical range / night", type: "text" },
        { name: "typical_range_verified", label: "Range verified?", type: "checkbox" },
      ],
    },
  ],
  pooja: [
    { name: "title", label: "Title", type: "text" },
    { name: "temple", label: "Temple", type: "text" },
    { name: "price_from", label: "Price from (₹)", type: "number" },
    { name: "duration", label: "Duration", type: "text" },
    {
      name: "benefits",
      label: "Benefits",
      type: "objectList",
      fields: [{ name: "description", label: "Benefit", type: "text" }],
    },
  ],
  destination: [
    { name: "title", label: "Title", type: "text" },
    { name: "destination", label: "Destination name", type: "text" },
    { name: "significance", label: "Significance (faith-tagged)", type: "textarea" },
    { name: "best_time", label: "Best time to visit", type: "text" },
    { name: "how_to_reach", label: "How to reach", type: "textarea" },
    { name: "map_query", label: "Map query", type: "text" },
    {
      name: "top_places",
      label: "Top places",
      type: "objectList",
      fields: [
        { name: "name", label: "Name", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        { name: "blurb", label: "Blurb", type: "text" },
      ],
    },
    {
      name: "key_distances",
      label: "Key distances",
      type: "objectList",
      fields: [
        { name: "from", label: "From", type: "text" },
        { name: "to", label: "To", type: "text" },
        { name: "distance", label: "Distance", type: "text" },
        { name: "duration", label: "Duration", type: "text" },
        { name: "verified", label: "Verified?", type: "checkbox" },
      ],
    },
  ],
  "temple-info": [
    { name: "title", label: "Title", type: "text" },
    { name: "destination", label: "Parent destination (somnath/dwarka)", type: "text" },
    { name: "topic", label: "Topic (timings/aarti/darshan)", type: "text" },
    { name: "official_source_url", label: "Official source URL", type: "text" },
    { name: "timings_verified", label: "Timings verified?", type: "checkbox" },
    { name: "dress_code", label: "Dress code", type: "textarea" },
    { name: "photography_rule", label: "Photography rule", type: "textarea" },
    {
      name: "timings_table",
      label: "Timings table",
      type: "objectList",
      fields: [
        { name: "label", label: "Session (e.g. Morning aarti)", type: "text" },
        { name: "open", label: "Opens", type: "text" },
        { name: "close", label: "Closes", type: "text" },
      ],
    },
  ],
  journey: [
    { name: "title", label: "Title", type: "text" },
    { name: "question", label: "Question", type: "text" },
    { name: "direct_answer", label: "Direct answer", type: "textarea" },
    {
      name: "distance_mode_table",
      label: "Distance / mode table",
      type: "objectList",
      fields: [
        { name: "mode", label: "Mode (Road/Train/Air)", type: "text" },
        { name: "distance", label: "Distance", type: "text" },
        { name: "duration", label: "Duration", type: "text" },
        { name: "note", label: "Note", type: "text" },
        { name: "verified", label: "Verified?", type: "checkbox" },
      ],
    },
    {
      name: "itinerary_days",
      label: "Itinerary days",
      type: "objectList",
      fields: [
        { name: "day", label: "Day", type: "number" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "stops", label: "Stops", type: "list" },
      ],
    },
  ],
  place: [
    { name: "title", label: "Title", type: "text" },
    { name: "place", label: "Place name", type: "text" },
    { name: "parent_destination", label: "Parent destination (somnath/dwarka)", type: "text" },
    { name: "distance_from_base", label: "Distance from base", type: "text" },
    { name: "how_to_reach", label: "How to reach", type: "textarea" },
    { name: "timing_ferry", label: "Timing / ferry", type: "text" },
    { name: "significance", label: "Significance (faith-tagged)", type: "textarea" },
    { name: "tips", label: "Tips", type: "textarea" },
    { name: "map_query", label: "Map query", type: "text" },
  ],
  festival: [
    { name: "title", label: "Title", type: "text" },
    { name: "festival", label: "Festival name", type: "text" },
    { name: "image", label: "Card image", type: "text", hint: "e.g. /images/festivals/hero.jpg or a full URL" },
    { name: "deity", label: "Deity / occasion", type: "text", hint: "e.g. Lord Krishna" },
    { name: "city", label: "City", type: "text", hint: "Somnath or Dwarka" },
    { name: "season", label: "Season", type: "text", hint: "e.g. Aug – Sep" },
    { name: "crowd", label: "Crowd level", type: "select", options: ["Very high", "High", "Moderate"] },
    { name: "highlights", label: "Highlights", type: "list", hint: "Short bullets shown on the card" },
    { name: "date_this_year", label: "Date this year (ISO, e.g. 2026-08-15)", type: "text" },
    { name: "date_verified", label: "Date verified?", type: "checkbox" },
    { name: "rituals", label: "Rituals (faith-tagged)", type: "textarea" },
    { name: "travel_advice", label: "Travel advice", type: "textarea" },
    { name: "event_venue", label: "Event venue", type: "text" },
  ],
  comparison: [
    { name: "title", label: "Title", type: "text" },
    { name: "optionA_label", label: "Option A label", type: "text" },
    { name: "optionB_label", label: "Option B label", type: "text" },
    { name: "verdict", label: "Verdict", type: "textarea" },
    { name: "recommended_target", label: "Recommended target (path)", type: "text" },
    {
      name: "comparison_table",
      label: "Comparison rows",
      type: "objectList",
      fields: [
        { name: "criterion", label: "Criterion", type: "text" },
        { name: "optionA", label: "Option A value", type: "text" },
        { name: "optionB", label: "Option B value", type: "text" },
      ],
    },
  ],
  tool: [
    { name: "title", label: "Title", type: "text" },
    { name: "tool_type", label: "Tool type (itinerary-planner/fare-calculator)", type: "text" },
    { name: "static_shell_copy", label: "Static shell copy", type: "textarea" },
    { name: "result_cta_target", label: "Result CTA target (path)", type: "text" },
  ],
  author: [
    { name: "name", label: "Name", type: "text" },
    { name: "job_title", label: "Job title", type: "text" },
    { name: "bio", label: "Bio", type: "textarea" },
    { name: "bio_verified", label: "Bio verified?", type: "checkbox" },
    { name: "experience_years", label: "Experience (years)", type: "number" },
    { name: "photo", label: "Photo URL", type: "text" },
    { name: "sameAs", label: "Profile links (sameAs)", type: "list" },
  ],
};

/** Shared FAQ field def (used by every type). */
export const FAQ_FIELD: FieldDef = {
  name: "faq",
  label: "FAQs",
  type: "objectList",
  fields: [
    { name: "question", label: "Question", type: "text" },
    { name: "answer", label: "Answer", type: "textarea" },
    { name: "fact_tag", label: "Fact tag", type: "select", options: ["verified", "faith", "local", "opinion"] },
  ],
};

export function getSchema(type: string): FieldDef[] {
  return CONTENT_SCHEMAS[type] ?? [];
}
