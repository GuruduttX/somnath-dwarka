/**
 * Registry of CMS content types for the generic admin (SOP §2, §15 — add
 * pages by data entry, not code). Maps a URL-safe type key to its Mongoose
 * model, label, the public path pattern, and hints for the editor.
 */
import type { Model } from "mongoose";
import TaxiModel from "@/src/models/taxiModel";
import HotelModel from "@/src/models/hotelModel";
import PoojaModel from "@/src/models/poojaModel";
import DestinationModel from "@/src/models/destinationModel";
import TempleInfoModel from "@/src/models/templeInfoModel";
import JourneyModel from "@/src/models/journeyModel";
import PlaceModel from "@/src/models/placeModel";
import FestivalModel from "@/src/models/festivalModel";
import ComparisonModel from "@/src/models/comparisonModel";
import ToolModel from "@/src/models/toolModel";
import AuthorModel from "@/src/models/authorModel";
import HubModel from "@/src/models/hubModel";
import HubSpokeModel from "@/src/models/hubSpokeModel";
import TempleModel from "@/src/models/templeModel";
import TrustModel from "@/src/models/trustModel";
import DataPageModel from "@/src/models/dataPageModel";
import ItineraryModel from "@/src/models/itineraryModel";

export type ContentTypeDef = {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: Model<any>;
  /** How the public URL is built from a record. */
  pathHint: string;
  /** Type-specific field names to expose in the editor's JSON block. */
  typeFields: string[];
};

export const CONTENT_TYPES: Record<string, ContentTypeDef> = {
  hub: {
    key: "hub",
    label: "Hubs (money & vertical)",
    model: HubModel,
    pathHint: "/{slug}/ — e.g. /gir-tour-package/, /temples/, /data/",
    typeFields: ["title", "hub_kind", "head_term", "pillar_path", "sibling_hubs", "variants", "price_from", "inclusions", "exclusions", "answer_template", "serp_feature_target"],
  },
  "hub-spoke": {
    key: "hub-spoke",
    label: "Hub variants",
    model: HubSpokeModel,
    pathHint: "/{hub}/{slug}/",
    typeFields: ["title", "hub", "spoke_kind", "duration", "price_from", "inclusions", "exclusions", "itinerary_days", "answer_template"],
  },
  temple: {
    key: "temple",
    label: "Temples (/temples)",
    model: TempleModel,
    pathHint: "/temples/{slug}/",
    typeFields: ["title", "temple", "deity", "town", "district", "significance", "timings_table", "timings_verified", "official_source_url", "how_to_reach", "distance_from_ahmedabad", "dress_code", "map_query"],
  },
  trust: {
    key: "trust",
    label: "Trust pages",
    model: TrustModel,
    pathHint: "/{slug}/ — team, methodology, editorial-policy, referral",
    typeFields: ["title", "page_kind", "sections"],
  },
  "data-page": {
    key: "data-page",
    label: "Data & research",
    model: DataPageModel,
    pathHint: "/data/{slug}/",
    typeFields: ["title", "dataset_name", "methodology", "methodology_url", "last_updated", "source_note", "rows"],
  },
  itinerary: {
    key: "itinerary",
    label: "Itineraries (/plan/itinerary)",
    model: ItineraryModel,
    pathHint: "/plan/itinerary/{slug}/",
    typeFields: ["title", "days", "question", "direct_answer", "itinerary_days"],
  },
  taxi: {
    key: "taxi",
    label: "Cab routes & vehicles",
    model: TaxiModel,
    pathHint: "/{slug}/ (route) or /somnath-dwarka-taxi-service/{slug}/ (vehicle)",
    typeFields: ["kind", "title", "origin", "destination", "distance_km", "duration_hrs", "trip_type", "stops", "vehicle_name", "seats", "suitable_for", "fares", "inclusions", "exclusions"],
  },
  hotel: {
    key: "hotel",
    label: "Hotels",
    model: HotelModel,
    pathHint: "/hotels/{slug}/",
    typeFields: ["title", "city", "near_temple", "tiers"],
  },
  pooja: {
    key: "pooja",
    label: "Pooja / darshan",
    model: PoojaModel,
    pathHint: "/pooja/{slug}/",
    typeFields: ["title", "temple", "benefits", "price_from", "duration"],
  },
  destination: {
    key: "destination",
    label: "Destinations",
    model: DestinationModel,
    pathHint: "/{slug}/",
    typeFields: ["title", "destination", "significance", "best_time", "how_to_reach", "top_places", "key_distances", "map_query"],
  },
  "temple-info": {
    key: "temple-info",
    label: "Temple info",
    model: TempleInfoModel,
    pathHint: "/{destination}/{topic}/",
    typeFields: ["title", "destination", "topic", "timings_table", "timings_verified", "official_source_url", "dress_code", "photography_rule"],
  },
  journey: {
    key: "journey",
    label: "Journeys (/plan)",
    model: JourneyModel,
    pathHint: "/plan/{slug}/",
    typeFields: ["title", "question", "direct_answer", "distance_mode_table", "itinerary_days"],
  },
  place: {
    key: "place",
    label: "Places",
    model: PlaceModel,
    pathHint: "/{parent_destination}/places/{slug}/",
    typeFields: ["title", "place", "parent_destination", "distance_from_base", "how_to_reach", "timing_ferry", "significance", "tips", "map_query"],
  },
  festival: {
    key: "festival",
    label: "Festivals",
    model: FestivalModel,
    pathHint: "/festivals/{slug}/",
    typeFields: ["title", "festival", "date_this_year", "date_verified", "rituals", "travel_advice", "event_venue"],
  },
  comparison: {
    key: "comparison",
    label: "Comparisons",
    model: ComparisonModel,
    pathHint: "/compare/{slug}/",
    typeFields: ["title", "optionA_label", "optionB_label", "verdict", "comparison_table", "recommended_target"],
  },
  tool: {
    key: "tool",
    label: "Tools",
    model: ToolModel,
    pathHint: "/tools/{slug}/",
    typeFields: ["title", "tool_type", "static_shell_copy", "result_cta_target"],
  },
  author: {
    key: "author",
    label: "Authors",
    model: AuthorModel,
    pathHint: "/author/{slug}/",
    typeFields: ["name", "bio", "bio_verified", "experience_years", "photo", "job_title", "sameAs"],
  },
};

export { SHARED_FIELD_KEYS } from "@/src/config/contentFields";

export function getContentType(key: string): ContentTypeDef | null {
  return CONTENT_TYPES[key] ?? null;
}
