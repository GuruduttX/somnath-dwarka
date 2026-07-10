import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Data / research asset (SOP §12) — /data/{slug}/: crowd calendar, fare index,
 * temple-timings changelog. These are the first-party citation assets the GEO
 * strategy leans on, so provenance is mandatory, not optional.
 *
 * A row renders only when the dataset it belongs to has `methodology` and
 * `last_updated` filled. An uncited "data" page is worse than no data page.
 */
export type DataRow = {
  id?: string;
  label: string;
  value?: string;
  note?: string;
};

export type IDataPage = SharedFields & {
  title: string;
  dataset_name: string;
  /** How the numbers were collected. Required before the page can be indexed. */
  methodology?: string;
  methodology_url?: string;
  last_updated?: string;
  source_note?: string;
  rows?: DataRow[];
};

const DataPageSchema = new Schema<IDataPage>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    dataset_name: { type: String, required: true },
    methodology: { type: String, default: "" },
    methodology_url: { type: String, default: "" },
    last_updated: { type: String, default: "" },
    source_note: { type: String, default: "" },
    rows: [
      {
        id: { type: String },
        label: { type: String, required: true },
        value: { type: String, default: "" },
        note: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const DataPageModel: Model<IDataPage> =
  mongoose.models.DataPage || mongoose.model<IDataPage>("DataPage", DataPageSchema);

export default DataPageModel;
