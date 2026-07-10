import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Temple leaf (SOP §5) — /temples/{slug}/ under the /temples/ statewide hub:
 * Dakor, Virpur, Salangpur, Chotila, Koteshwar, Narayan Sarovar, Akshardham...
 *
 * Distinct from TempleInfo, which is a topic spoke under a destination pillar
 * (/{destination}/{topic}/). This is the temple itself as a place page.
 *
 * `timings_table` renders only when `timings_verified` is true and an official
 * source URL is present — the SOP forbids publishing unverified darshan timings.
 */
export type TempleTimingRow = {
  id?: string;
  label: string;
  open?: string;
  close?: string;
};

export type ITemple = SharedFields & {
  title: string;
  temple: string;
  deity?: string;
  town?: string;
  district?: string;
  /** Faith-tagged; never asserted as verified fact. */
  significance?: string;
  timings_table?: TempleTimingRow[];
  timings_verified?: boolean;
  official_source_url?: string;
  how_to_reach?: string;
  distance_from_ahmedabad?: string;
  distance_verified?: boolean;
  dress_code?: string;
  map_query?: string;
};

const TempleSchema = new Schema<ITemple>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    temple: { type: String, required: true },
    deity: { type: String, default: "" },
    town: { type: String, default: "" },
    district: { type: String, default: "" },
    significance: { type: String, default: "" },
    timings_table: [
      {
        id: { type: String },
        label: { type: String, required: true },
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
    ],
    timings_verified: { type: Boolean, default: false },
    official_source_url: { type: String, default: "" },
    how_to_reach: { type: String, default: "" },
    distance_from_ahmedabad: { type: String, default: "" },
    distance_verified: { type: Boolean, default: false },
    dress_code: { type: String, default: "" },
    map_query: { type: String, default: "" },
  },
  { timestamps: true }
);

const TempleModel: Model<ITemple> =
  mongoose.models.Temple || mongoose.model<ITemple>("Temple", TempleSchema);

export default TempleModel;
