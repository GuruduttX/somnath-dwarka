import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, verifyFieldSchema, type SharedFields, type VerifyField } from "./shared";

/**
 * Hub (SOP §3, §8) — the root-level money and vertical hubs:
 * /somnath-dwarka-gir-tour-package/, /gir-tour-package/, /gujarat-tour-packages/,
 * /heritage-tours-gujarat/, /wildlife-nature-tours/, /temples/, /data/.
 *
 * Linking contract per the destination-hub spec: UP -> /gujarat-tour-packages/,
 * ACROSS -> its pillar + >=2 sibling hubs, DOWN -> its variants.
 *
 * `price_from` is a VerifyField and `answer_template` holds the URL-map
 * aeo_answer_snippet_template verbatim: both stay unpublished until an editor
 * fills real numbers, so no fabricated price ever renders.
 */
export type HubVariant = {
  id?: string;
  label: string;
  slug: string;
  blurb?: string;
};

/* ------------------------------------------------------------------ *
 * Rich, admin-editable content blocks for the money-circuit hub.
 * Every block is optional and hides when empty, so a hub that does not
 * carry a full sales page (temples, data) is unaffected. The public page
 * renders these from the CMS doc — nothing here is hardcoded in the route.
 * ------------------------------------------------------------------ */

/** A row of the "by duration" chooser + price matrix. */
export type DurationRow = {
  plan: string;
  nights?: string;
  price_3star?: string;
  price_4star?: string;
  price_5star?: string;
  best_for?: string;
  slug?: string;
};

/** A row of the "by start city" chooser. */
export type StartCityRow = { city: string; road_reality?: string; slug?: string };

/** A row of the constraint ("the clock that decides this circuit") table. */
export type ConstraintRow = { constraint: string; time?: string; forces?: string };

/** One hour-by-hour step inside a day. */
export type ItineraryStep = { time: string; activity: string };

/** A single day of the hour-by-hour itinerary. */
export type ItineraryDay = { day: string; steps?: ItineraryStep[] };

/** A row of the price-tier sheet. */
export type PriceTierRow = { tier: string; price?: string; hotels?: string; included?: string };

/** A row of the vehicle-by-group-size table. */
export type VehicleRow = { travellers: string; vehicle?: string };

/** A titled paragraph block (why-choose, not-for-you). */
export type PointBlock = { heading?: string; text: string };

/** A labelled practical note. */
export type NoteRow = { label: string; text?: string };

export type IHub = SharedFields & {
  title: string;
  hub_kind: "circuit" | "triangle" | "umbrella" | "destination" | "vertical" | "temples" | "data";
  head_term?: string;
  /** ACROSS link to the informational pillar this transactional hub pairs with. */
  pillar_path?: string;
  /** ACROSS links to sibling hubs (>= 2 per the linking contract). */
  sibling_hubs?: string[];
  /** DOWN links to variant spokes. */
  variants?: HubVariant[];
  price_from?: VerifyField;
  inclusions?: string[];
  exclusions?: string[];
  /** Verbatim aeo_answer_snippet_template from the URL map, for the editor to resolve. */
  answer_template?: string;
  serp_feature_target?: string;

  /* Rich sales-page content (all optional). */
  chooser_intro?: string;
  duration_matrix?: DurationRow[];
  start_cities?: StartCityRow[];
  chooser_note?: string;
  constraint_intro?: string;
  constraint_table?: ConstraintRow[];
  constraint_footnote?: string;
  itinerary_intro?: string;
  hourly_itinerary?: ItineraryDay[];
  itinerary_footnote?: string;
  price_intro?: string;
  price_tiers?: PriceTierRow[];
  price_tier_note?: string;
  vehicle_note?: string;
  vehicle_table?: VehicleRow[];
  exclusions_note?: string;
  fraud_advisory?: string;
  why_choose_intro?: string;
  why_choose?: PointBlock[];
  not_for_you?: PointBlock[];
  practical_notes?: NoteRow[];
  final_cta_note?: string;
};

const HubSchema = new Schema<IHub>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    hub_kind: {
      type: String,
      required: true,
      enum: ["circuit", "triangle", "umbrella", "destination", "vertical", "temples", "data"],
      index: true,
    },
    head_term: { type: String, default: "" },
    pillar_path: { type: String, default: "" },
    sibling_hubs: [{ type: String }],
    variants: [
      {
        id: { type: String },
        label: { type: String, required: true },
        slug: { type: String, required: true },
        blurb: { type: String, default: "" },
      },
    ],
    price_from: verifyFieldSchema,
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    answer_template: { type: String, default: "" },
    serp_feature_target: { type: String, default: "" },

    /* Rich sales-page content. */
    chooser_intro: { type: String, default: "" },
    duration_matrix: [
      {
        plan: { type: String, required: true },
        nights: { type: String, default: "" },
        price_3star: { type: String, default: "" },
        price_4star: { type: String, default: "" },
        price_5star: { type: String, default: "" },
        best_for: { type: String, default: "" },
        slug: { type: String, default: "" },
      },
    ],
    start_cities: [
      {
        city: { type: String, required: true },
        road_reality: { type: String, default: "" },
        slug: { type: String, default: "" },
      },
    ],
    chooser_note: { type: String, default: "" },
    constraint_intro: { type: String, default: "" },
    constraint_table: [
      {
        constraint: { type: String, required: true },
        time: { type: String, default: "" },
        forces: { type: String, default: "" },
      },
    ],
    constraint_footnote: { type: String, default: "" },
    itinerary_intro: { type: String, default: "" },
    hourly_itinerary: [
      {
        day: { type: String, required: true },
        steps: [
          {
            time: { type: String, default: "" },
            activity: { type: String, default: "" },
          },
        ],
      },
    ],
    itinerary_footnote: { type: String, default: "" },
    price_intro: { type: String, default: "" },
    price_tiers: [
      {
        tier: { type: String, required: true },
        price: { type: String, default: "" },
        hotels: { type: String, default: "" },
        included: { type: String, default: "" },
      },
    ],
    price_tier_note: { type: String, default: "" },
    vehicle_note: { type: String, default: "" },
    vehicle_table: [
      {
        travellers: { type: String, required: true },
        vehicle: { type: String, default: "" },
      },
    ],
    exclusions_note: { type: String, default: "" },
    fraud_advisory: { type: String, default: "" },
    why_choose_intro: { type: String, default: "" },
    why_choose: [
      {
        heading: { type: String, default: "" },
        text: { type: String, required: true },
      },
    ],
    not_for_you: [
      {
        heading: { type: String, default: "" },
        text: { type: String, required: true },
      },
    ],
    practical_notes: [
      {
        label: { type: String, required: true },
        text: { type: String, default: "" },
      },
    ],
    final_cta_note: { type: String, default: "" },
  },
  { timestamps: true }
);

const HubModel: Model<IHub> =
  mongoose.models.Hub || mongoose.model<IHub>("Hub", HubSchema);

export default HubModel;
