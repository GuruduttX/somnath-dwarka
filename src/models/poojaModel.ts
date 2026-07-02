import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Pooja / darshan assistance (project extension, styled on SOP shared model).
 * Rituals carry a faith tag; any price is optional and rendered plainly.
 */
export type IPooja = SharedFields & {
  title: string;
  temple?: string;
  benefits?: { id?: string; description: string }[];
  price_from?: number;
  duration?: string;
};

const PoojaSchema = new Schema<IPooja>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    temple: { type: String, default: "" },
    benefits: [{ id: { type: String }, description: { type: String, required: true } }],
    price_from: { type: Number },
    duration: { type: String, default: "" },
  },
  { timestamps: true }
);

const PoojaModel: Model<IPooja> =
  mongoose.models.Pooja || mongoose.model<IPooja>("Pooja", PoojaSchema);

export default PoojaModel;
