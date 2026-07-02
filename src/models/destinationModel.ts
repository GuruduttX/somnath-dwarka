import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, verifyFieldSchema, type SharedFields, type VerifyField } from "./shared";

/**
 * DestinationPillar (SOP §2, §5 #8) — /somnath/, /dwarka/. answer-first is
 * faith-tagged; key distances are verify data; links to temple + place spokes.
 */
export type KeyDistance = {
  id?: string;
  from: string;
  to: string;
  distance?: string;
  duration?: string;
  verified?: boolean;
};

export type IDestination = SharedFields & {
  title: string;
  destination: string; // Somnath | Dwarka
  significance?: string; // faith tag
  best_time?: string;
  how_to_reach?: string;
  top_places?: { id?: string; name: string; slug: string; blurb?: string }[];
  key_distances?: KeyDistance[];
  map_query?: string;
  timings_summary?: VerifyField;
};

const DestinationSchema = new Schema<IDestination>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, index: true },
    significance: { type: String, default: "" },
    best_time: { type: String, default: "" },
    how_to_reach: { type: String, default: "" },
    top_places: [
      {
        id: { type: String },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        blurb: { type: String, default: "" },
      },
    ],
    key_distances: [
      {
        id: { type: String },
        from: { type: String, required: true },
        to: { type: String, required: true },
        distance: { type: String, default: "" },
        duration: { type: String, default: "" },
        verified: { type: Boolean, default: false },
      },
    ],
    map_query: { type: String, default: "" },
    timings_summary: verifyFieldSchema,
  },
  { timestamps: true }
);

const DestinationModel: Model<IDestination> =
  mongoose.models.Destination ||
  mongoose.model<IDestination>("Destination", DestinationSchema);

export default DestinationModel;
