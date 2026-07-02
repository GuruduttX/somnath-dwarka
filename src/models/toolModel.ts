import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, type SharedFields } from "./shared";

/**
 * Tool (SOP §2, §5 #15) — /tools/{tool}/. Ships a crawlable static shell +
 * explainer + FAQ; JS enhances on top. WebApplication schema optional.
 */
export type ITool = SharedFields & {
  title: string;
  tool_type: string; // itinerary-planner | fare-calculator
  static_shell_copy?: string;
  result_cta_target?: string; // money page path
};

const ToolSchema = new Schema<ITool>(
  {
    ...sharedFields,
    title: { type: String, required: true, trim: true },
    tool_type: { type: String, required: true, index: true },
    static_shell_copy: { type: String, default: "" },
    result_cta_target: { type: String, default: "" },
  },
  { timestamps: true }
);

const ToolModel: Model<ITool> =
  mongoose.models.Tool || mongoose.model<ITool>("Tool", ToolSchema);

export default ToolModel;
