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

// An individual hotel property admins can add under a city page.
export type HotelProperty = {
  id?: string;
  name: string;
  image?: string;
  tier?: string; // Budget / Mid-range / Premium
  area?: string;
  price_range?: string;
  rating?: number;
  reviews?: number;
  distance?: string;
  amenities?: string[];
  tags?: string[];
  description?: string;
};

export type IHotel = SharedFields & {
  title: string;
  city: string;
  near_temple?: string;
  tiers?: HotelTier[];
  properties?: HotelProperty[];
};

const tierSchema = {
  id: { type: String },
  tier: { type: String, required: true },
  area: { type: String, default: "" },
  typical_range: { type: String, default: "" },
  typical_range_verified: { type: Boolean, default: false },
};

const propertySchema = {
  id: { type: String },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  tier: { type: String, default: "" },
  area: { type: String, default: "" },
  price_range: { type: String, default: "" },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  distance: { type: String, default: "" },
  amenities: { type: [String], default: [] },
  tags: { type: [String], default: [] },
  description: { type: String, default: "" },
};

const HotelSchema = new Schema<IHotel>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    city: { type: String, required: true, index: true },
    near_temple: { type: String, default: "" },
    tiers: [tierSchema],
    properties: [propertySchema],
  },
  { timestamps: true }
);

const HotelModel: Model<IHotel> =
  mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema);

export default HotelModel;
