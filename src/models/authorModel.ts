import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Author / Trust (SOP §2, §5 #16). Real bio/photo/sameAs are pre-publish
 * blockers (SOP §16). Person(sameAs) schema. bio/experience are verify data —
 * do NOT publish a placeholder bio as fact.
 */
export type IAuthor = SharedFields & {
  name: string;
  bio?: string;
  bio_verified?: boolean;
  experience_years?: number;
  experience_verified?: boolean;
  photo?: string;
  job_title?: string;
  sameAs?: string[];
};

const AuthorSchema = new Schema<IAuthor>(
  {
    ...sharedFields,
    name: { type: String, required: true, trim: true },
    bio: { type: String, default: "" },
    bio_verified: { type: Boolean, default: false },
    experience_years: { type: Number },
    experience_verified: { type: Boolean, default: false },
    photo: { type: String, default: "" },
    job_title: { type: String, default: "" },
    sameAs: [{ type: String }],
  },
  { timestamps: true }
);

const AuthorModel: Model<IAuthor> =
  mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);

export default AuthorModel;
