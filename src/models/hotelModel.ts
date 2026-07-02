import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Hotel (assistance) — SOP §2. NO bookable inventory or ratings unless real;
 * we only publish tiered guidance + assistance CTA (SOP §5 #7, §12 gate).
 */
export type HotelTier = {
  id?: string;
  tier: string; // Budget / Mid / Luxury
  area?: string;
  typical_range?: string; // verify datum, rendered with stamp
  typical_range_verified?: boolean;
};

export type IHotel = SharedFields & {
  title: string;
  city: string;
  near_temple?: string;
  tiers?: HotelTier[];
};

const tierSchema = {
  id: { type: String },
  tier: { type: String, required: true },
  area: { type: String, default: "" },
  typical_range: { type: String, default: "" },
  typical_range_verified: { type: Boolean, default: false },
};

const HotelSchema = new Schema<IHotel>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    city: { type: String, required: true, index: true },
    near_temple: { type: String, default: "" },
    tiers: [tierSchema],
  },
  { timestamps: true }
);

const HotelModel: Model<IHotel> =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

export default HotelModel;
