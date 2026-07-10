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
  },
  { timestamps: true }
);

const HubModel: Model<IHub> =
  mongoose.models.Hub || mongoose.model<IHub>("Hub", HubSchema);

export default HubModel;
