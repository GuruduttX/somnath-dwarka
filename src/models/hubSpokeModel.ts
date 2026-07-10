import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, verifyFieldSchema, type SharedFields, type VerifyField } from "./shared";

/**
 * HubSpoke (SOP §3, §8) — depth-2 variants under a root hub:
 * /somnath-dwarka-gir-tour-package/4-days/, /gujarat-tour-packages/saurashtra-darshan/,
 * /heritage-tours-gujarat/rani-ki-vav-patan/.
 *
 * `hub` carries the parent hub slug (no leading slash) and is the breadcrumb UP
 * target. Price and day-wise plans are verify-gated.
 */
export type IHubSpoke = SharedFields & {
  title: string;
  /** Parent hub slug, e.g. "somnath-dwarka-gir-tour-package". */
  hub: string;
  spoke_kind: "money" | "info";
  duration?: string;
  price_from?: VerifyField;
  inclusions?: string[];
  exclusions?: string[];
  itinerary_days?: { id?: string; day: number; title: string; description?: string }[];
  answer_template?: string;
};

const HubSpokeSchema = new Schema<IHubSpoke>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    hub: { type: String, required: true, index: true },
    spoke_kind: { type: String, required: true, enum: ["money", "info"], default: "money" },
    duration: { type: String, default: "" },
    price_from: verifyFieldSchema,
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    itinerary_days: [
      {
        id: { type: String },
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
      },
    ],
    answer_template: { type: String, default: "" },
  },
  { timestamps: true }
);

const HubSpokeModel: Model<IHubSpoke> =
  mongoose.models.HubSpoke || mongoose.model<IHubSpoke>("HubSpoke", HubSpokeSchema);

export default HubSpokeModel;
