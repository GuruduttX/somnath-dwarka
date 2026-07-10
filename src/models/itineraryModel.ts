import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Itinerary (SOP §5 #11) — /plan/itinerary/{slug}/, e.g. 3-day, 4-day.
 *
 * Kept in its own collection rather than folded into Journey: a Journey record
 * with slug "3-day" would also resolve at /plan/3-day/ via /plan/[topic]/ and
 * duplicate this page at two URLs.
 */
export type IItinerary = SharedFields & {
  title: string;
  days: number;
  question?: string;
  direct_answer?: string;
  itinerary_days?: {
    id?: string;
    day: number;
    title: string;
    description?: string;
    stops?: string[];
  }[];
};

const ItinerarySchema = new Schema<IItinerary>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    days: { type: Number, required: true },
    question: { type: String, default: "" },
    direct_answer: { type: String, default: "" },
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

const ItineraryModel: Model<IItinerary> =
  mongoose.models.Itinerary || mongoose.model<IItinerary>("Itinerary", ItinerarySchema);

export default ItineraryModel;
