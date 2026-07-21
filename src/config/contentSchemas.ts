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
  
  hub: [
    { name: "title", label: "Title", type: "text" },
    {
      name: "hub_kind",
      label: "Hub kind",
      type: "select",
      options: ["circuit", "triangle", "umbrella", "destination", "vertical", "temples", "data"],
    },
    { name: "head_term", label: "Head term owned", type: "text", hint: "e.g. gir tour package — never share a head term with another hub" },
    { name: "pillar_path", label: "Pillar path (ACROSS)", type: "text", hint: "Informational pillar this hub pairs with, e.g. /gir/" },
    { name: "sibling_hubs", label: "Sibling hubs (ACROSS)", type: "list", hint: "At least 2 paths" },
    {
      name: "variants",
      label: "Variants (DOWN)",
      type: "objectList",
      fields: [
        { name: "label", label: "Label", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        { name: "blurb", label: "Blurb", type: "text" },
      ],
    },
    { name: "price_from", label: "Price from (₹ pp)", type: "verify", hint: "OPS-CONFIRM — renders only when verified" },
    { name: "inclusions", label: "Inclusions", type: "list" },
    { name: "exclusions", label: "Exclusions", type: "list" },
    { name: "answer_template", label: "Answer template (from URL map)", type: "textarea", hint: "Resolve every {placeholder} before publishing" },
    { name: "serp_feature_target", label: "SERP feature target", type: "text" },

    { name: "chooser_intro", label: "Chooser intro", type: "textarea", hint: "Paragraph above the 'Choose your version' tables" },
    {
      name: "duration_matrix",
      label: "By duration (chooser + price matrix)",
      type: "objectList",
      fields: [
        { name: "plan", label: "Plan", type: "text", hint: "e.g. 4 days 3 nights" },
        { name: "nights", label: "Nights", type: "text" },
        { name: "price_3star", label: "3 star, pp", type: "text" },
        { name: "price_4star", label: "4 star, pp", type: "text" },
        { name: "price_5star", label: "5 star, pp", type: "text" },
        { name: "best_for", label: "Best for", type: "text" },
        { name: "slug", label: "Spoke slug (optional link)", type: "text", hint: "e.g. 4-days-3-nights" },
      ],
    },
    {
      name: "start_cities",
      label: "By start city",
      type: "objectList",
      fields: [
        { name: "city", label: "City", type: "text" },
        { name: "road_reality", label: "Road reality", type: "text" },
        { name: "slug", label: "Spoke slug (optional link)", type: "text", hint: "e.g. from-ahmedabad" },
      ],
    },
    { name: "chooser_note", label: "Chooser closing note", type: "textarea" },
    { name: "constraint_intro", label: "Constraints — intro", type: "textarea", hint: "Above 'the clock that decides this circuit' table" },
    {
      name: "constraint_table",
      label: "Constraint table (the clock)",
      type: "objectList",
      fields: [
        { name: "constraint", label: "Fixed constraint", type: "text" },
        { name: "time", label: "The time", type: "textarea" },
        { name: "forces", label: "What it forces", type: "textarea" },
      ],
    },
    { name: "constraint_footnote", label: "Constraints — footnote", type: "textarea" },
    { name: "itinerary_intro", label: "Hour-by-hour — intro", type: "textarea" },
    {
      name: "hourly_itinerary",
      label: "Hour-by-hour itinerary",
      type: "objectList",
      fields: [
        { name: "day", label: "Day heading", type: "text", hint: "e.g. Day 1: Ahmedabad to Dwarka" },
        {
          name: "steps",
          label: "Steps",
          type: "objectList",
          fields: [
            { name: "time", label: "Time", type: "text", hint: "e.g. 05:30" },
            { name: "activity", label: "What happens", type: "textarea" },
          ],
        },
      ],
    },
    { name: "itinerary_footnote", label: "Hour-by-hour — footnote", type: "textarea" },
    { name: "price_intro", label: "Price sheet — intro", type: "textarea" },
    {
      name: "price_tiers",
      label: "Price tiers",
      type: "objectList",
      fields: [
        { name: "tier", label: "Tier", type: "text", hint: "e.g. 3 star" },
        { name: "price", label: "Per person, per night", type: "text" },
        { name: "hotels", label: "Hotels we use", type: "text" },
        { name: "included", label: "Included", type: "text" },
      ],
    },
    { name: "price_tier_note", label: "5 star tier note (plain talk)", type: "textarea" },
    { name: "vehicle_note", label: "Vehicle — intro note", type: "textarea" },
    {
      name: "vehicle_table",
      label: "Vehicle by group size",
      type: "objectList",
      fields: [
        { name: "travellers", label: "Travellers", type: "text", hint: "e.g. Up to 6" },
        { name: "vehicle", label: "Vehicle", type: "text" },
      ],
    },
    { name: "exclusions_note", label: "Not-included note", type: "textarea", hint: "Prose around the exclusions list" },
    { name: "fraud_advisory", label: "Fraud advisory", type: "textarea", hint: "Shree Somnath Trust buyer-protection paragraph" },
    { name: "why_choose_intro", label: "Why choose — intro", type: "textarea" },
    {
      name: "why_choose",
      label: "Why choose us (points)",
      type: "objectList",
      fields: [
        { name: "heading", label: "Heading (optional)", type: "text" },
        { name: "text", label: "Text", type: "textarea" },
      ],
    },
    {
      name: "not_for_you",
      label: "This circuit is not for you if…",
      type: "objectList",
      fields: [
        { name: "heading", label: "Heading (optional)", type: "text" },
        { name: "text", label: "Text", type: "textarea" },
      ],
    },
    {
      name: "practical_notes",
      label: "Practical notes",
      type: "objectList",
      fields: [
        { name: "label", label: "Label", type: "text", hint: "e.g. Dress code" },
        { name: "text", label: "Text", type: "textarea" },
      ],
    },
    { name: "final_cta_note", label: "Final CTA note", type: "textarea" },
  ],
  "hub-spoke": [
    { name: "title", label: "Title", type: "text" },
    { name: "hub", label: "Parent hub slug", type: "text", hint: "No slashes, e.g. somnath-dwarka-gir-tour-package" },
    { name: "spoke_kind", label: "Spoke kind", type: "select", options: ["money", "info"] },
    { name: "duration", label: "Duration", type: "text" },
    { name: "price_from", label: "Price from (₹ pp)", type: "verify" },
    { name: "inclusions", label: "Inclusions", type: "list" },
    { name: "exclusions", label: "Exclusions", type: "list" },
    {
      name: "itinerary_days",
      label: "Day-wise plan",
      type: "objectList",
      fields: [
        { name: "day", label: "Day", type: "number" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
    },
    { name: "answer_template", label: "Answer template (from URL map)", type: "textarea" },
  ],
  temple: [
    { name: "title", label: "Title", type: "text" },
    { name: "temple", label: "Temple name", type: "text" },
    { name: "deity", label: "Deity", type: "text" },
    { name: "town", label: "Town", type: "text" },
    { name: "district", label: "District", type: "text" },
    { name: "significance", label: "Significance (faith-tagged)", type: "textarea", hint: "Written as tradition, never asserted as verified fact" },
    {
      name: "timings_table",
      label: "Timings",
      type: "objectList",
      fields: [
        { name: "label", label: "Label", type: "text" },
        { name: "open", label: "Open", type: "text" },
        { name: "close", label: "Close", type: "text" },
      ],
    },
    { name: "timings_verified", label: "Timings verified?", type: "checkbox", hint: "Timings render only when checked and a source URL is set" },
    { name: "official_source_url", label: "Official source URL", type: "text" },
    { name: "how_to_reach", label: "How to reach", type: "textarea" },
    { name: "distance_from_ahmedabad", label: "Distance from Ahmedabad", type: "text" },
    { name: "dress_code", label: "Dress code", type: "text" },
    { name: "map_query", label: "Map query", type: "text" },
  ],
  trust: [
    { name: "title", label: "Title", type: "text" },
    {
      name: "page_kind",
      label: "Page kind",
      type: "select",
      options: ["team", "methodology", "editorial-policy", "referral", "other"],
    },
    {
      name: "sections",
      label: "Sections",
      type: "objectList",
      fields: [
        { name: "heading", label: "Heading", type: "text" },
        { name: "body", label: "Body", type: "textarea" },
      ],
    },
  ],
  "data-page": [
    { name: "title", label: "Title", type: "text" },
    { name: "dataset_name", label: "Dataset name", type: "text" },
    { name: "methodology", label: "Methodology", type: "textarea", hint: "Required before this page can be indexed" },
    { name: "methodology_url", label: "Methodology URL", type: "text" },
    { name: "last_updated", label: "Last updated", type: "text" },
    { name: "source_note", label: "Source note", type: "textarea" },
    {
      name: "rows",
      label: "Rows",
      type: "objectList",
      fields: [
        { name: "label", label: "Label", type: "text" },
        { name: "value", label: "Value", type: "text" },
        { name: "note", label: "Note", type: "text" },
      ],
    },
  ],
  itinerary: [
    { name: "title", label: "Title", type: "text" },
    { name: "days", label: "Days", type: "number" },
    { name: "question", label: "Question", type: "text" },
    { name: "direct_answer", label: "Direct answer", type: "textarea" },
    {
      name: "itinerary_days",
      label: "Day-wise plan",
      type: "objectList",
      fields: [
        { name: "day", label: "Day", type: "number" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
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
    { name: "luggage", label: "Luggage (vehicle), e.g. 4 bags", type: "text" },
    { name: "image_src", label: "Vehicle photo path (vehicle)", type: "text" },
    { name: "image_alt", label: "Vehicle photo alt (vehicle)", type: "text" },
    {
      // A route row uses vehicle/seats/one-way/round-trip; a vehicle row uses
      // route/rate. Both live here because one model serves both page kinds.
      name: "fares",
      label: "Fares — routes use vehicle + one-way/round-trip, vehicles use route + rate",
      type: "objectList",
      fields: [
        { name: "vehicle", label: "Vehicle (route page)", type: "text" },
        { name: "seats", label: "Seats (route page)", type: "number" },
        { name: "one_way", label: "One way (route page)", type: "text" },
        { name: "round_trip", label: "Round trip (route page)", type: "text" },
        { name: "route", label: "Route (vehicle page)", type: "text" },
        { name: "rate", label: "Rate (vehicle page)", type: "text" },
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
