import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * JourneyItinerary (SOP §2, §5 #11) — /plan/{topic}/ e.g. distance, which-first,
 * how-many-days, 3-day, 4-day. Direct-answer block + distance/mode table (verify)
 * + day-wise itinerary. Speakable-ready.
 */
export type ModeRow = {
  id?: string;
  mode: string; // Road / Train / Air
  distance?: string;
  duration?: string;
  note?: string;
  verified?: boolean;
};

export type IJourney = SharedFields & {
  title: string;
  question: string;
  direct_answer?: string;
  distance_mode_table?: ModeRow[];
  itinerary_days?: { id?: string; day: number; title: string; description?: string; stops?: string[] }[];
};

const JourneySchema = new Schema<IJourney>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    question: { type: String, required: true },
    direct_answer: { type: String, default: "" },
    distance_mode_table: [
      {
        id: { type: String },
        mode: { type: String, required: true },
        distance: { type: String, default: "" },
        duration: { type: String, default: "" },
        note: { type: String, default: "" },
        verified: { type: Boolean, default: false },
      },
    ],
    itinerary_days: [
      {
        id: { type: String },
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        stops: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

const JourneyModel: Model<IJourney> =
  mongoose.models.Journey || mongoose.model<IJourney>("Journey", JourneySchema);

export default JourneyModel;
