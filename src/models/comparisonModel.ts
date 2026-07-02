import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Comparison (SOP §2, §5 #14) — /compare/{x-vs-y}/. answer-first verdict +
 * comparison table + recommendation. FAQPage schema.
 */
export type CompareRow = {
  id?: string;
  criterion: string;
  optionA: string;
  optionB: string;
};

export type IComparison = SharedFields & {
  title: string;
  optionA_label: string;
  optionB_label: string;
  verdict?: string;
  comparison_table?: CompareRow[];
  recommended_target?: string; // path of the recommended money page
};

const ComparisonSchema = new Schema<IComparison>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    optionA_label: { type: String, required: true },
    optionB_label: { type: String, required: true },
    verdict: { type: String, default: "" },
    comparison_table: [
      {
        id: { type: String },
        criterion: { type: String, required: true },
        optionA: { type: String, default: "" },
        optionB: { type: String, default: "" },
      },
    ],
    recommended_target: { type: String, default: "" },
  },
  { timestamps: true }
);

const ComparisonModel: Model<IComparison> =
  mongoose.models.Comparison ||
  mongoose.model<IComparison>("Comparison", ComparisonSchema);

export default ComparisonModel;
