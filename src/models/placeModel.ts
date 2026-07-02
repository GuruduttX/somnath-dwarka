import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Place spoke (SOP §2, §5 #10) — /{destination}/places/{place}/.
 * how-to-reach + timing/ferry are verify data; significance separates
 * faith-vs-verified via the four-tag system.
 */
export type IPlace = SharedFields & {
  title: string;
  place: string;
  parent_destination: string; // somnath | dwarka
  distance_from_base?: string; // verify
  distance_verified?: boolean;
  how_to_reach?: string;
  timing_ferry?: string; // verify
  timing_verified?: boolean;
  significance?: string; // faith-tagged
  tips?: string;
  map_query?: string;
};

const PlaceSchema = new Schema<IPlace>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    place: { type: String, required: true },
    parent_destination: { type: String, required: true, index: true },
    distance_from_base: { type: String, default: "" },
    distance_verified: { type: Boolean, default: false },
    how_to_reach: { type: String, default: "" },
    timing_ferry: { type: String, default: "" },
    timing_verified: { type: Boolean, default: false },
    significance: { type: String, default: "" },
    tips: { type: String, default: "" },
    map_query: { type: String, default: "" },
  },
  { timestamps: true }
);

const PlaceModel: Model<IPlace> =
  mongoose.models.Place || mongoose.model<IPlace>("Place", PlaceSchema);

export default PlaceModel;
