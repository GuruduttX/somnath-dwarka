import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Festival (SOP §2, §5 #12) — /festivals/{festival}/. Event schema renders
 * ONLY with a real date (SOP §12 gate). Rituals carry a faith tag.
 */
export type IFestival = SharedFields & {
  title: string;
  festival: string;
  date_this_year?: string; // ISO — verify; drives Event schema gate
  date_verified?: boolean;
  rituals?: string; // faith-tagged
  travel_advice?: string;
  event_venue?: string;
};

const FestivalSchema = new Schema<IFestival>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    festival: { type: String, required: true, index: true },
    date_this_year: { type: String, default: "" },
    date_verified: { type: Boolean, default: false },
    rituals: { type: String, default: "" },
    travel_advice: { type: String, default: "" },
    event_venue: { type: String, default: "" },
  },
  { timestamps: true }
);

const FestivalModel: Model<IFestival> =
  mongoose.models.Festival || mongoose.model<IFestival>("Festival", FestivalSchema);

export default FestivalModel;
