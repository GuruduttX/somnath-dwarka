import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Trust page (SOP §6 / E-E-A-T) — /team/, /methodology/, /editorial-policy/,
 * /referral/. These are MVP-wave pages: the home page's "why us" block links
 * into them, so they must exist before launch.
 *
 * Body content is authored by a human in the admin. Nothing here asserts a
 * credential; registration numbers and association memberships live in the
 * site config behind their own VERIFY gate.
 */
export type ITrust = SharedFields & {
  title: string;
  page_kind: "team" | "methodology" | "editorial-policy" | "referral" | "other";
  sections?: { id?: string; heading: string; body?: string }[];
};

const TrustSchema = new Schema<ITrust>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    page_kind: {
      type: String,
      required: true,
      enum: ["team", "methodology", "editorial-policy", "referral", "other"],
      default: "other",
    },
    sections: [
      {
        id: { type: String },
        heading: { type: String, required: true },
        body: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const TrustModel: Model<ITrust> =
  mongoose.models.Trust || mongoose.model<ITrust>("Trust", TrustSchema);

export default TrustModel;
