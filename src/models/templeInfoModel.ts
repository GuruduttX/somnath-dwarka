import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * TempleInfo (SOP §2, §5 #9) — /{destination}/{topic}/ e.g. timings/aarti/darshan.
 * Timings table is verify data with stamp + official source URL. Speakable-ready.
 */
export type TimingRow = {
  id?: string;
  label: string; // e.g. "Mangla Aarti" / "Mon–Sun"
  open?: string;
  close?: string;
};

export type ITempleInfo = SharedFields & {
  title: string;
  destination: string; // parent: somnath | dwarka
  topic: string; // timings | aarti | darshan
  timings_table?: TimingRow[];
  timings_verified?: boolean;
  timings_verified_at?: string;
  official_source_url?: string;
  dress_code?: string;
  photography_rule?: string;
};

const TempleInfoSchema = new Schema<ITempleInfo>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, index: true },
    topic: { type: String, required: true },
    timings_table: [
      {
        id: { type: String },
        label: { type: String, required: true },
        open: { type: String, default: "" },
        close: { type: String, default: "" },
      },
    ],
    timings_verified: { type: Boolean, default: false },
    timings_verified_at: { type: String, default: "" },
    official_source_url: { type: String, default: "" },
    dress_code: { type: String, default: "" },
    photography_rule: { type: String, default: "" },
  },
  { timestamps: true }
);

const TempleInfoModel: Model<ITempleInfo> =
  mongoose.models.TempleInfo ||
  mongoose.model<ITempleInfo>("TempleInfo", TempleInfoSchema);

export default TempleInfoModel;
