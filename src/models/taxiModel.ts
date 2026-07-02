import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, verifyFieldSchema, type SharedFields, type VerifyField } from "./shared";

/**
 * CabRoute / Vehicle (SOP §2). One model serves both route pages
 * (/{origin}-to-{dest}-taxi/) and vehicle fare pages
 * (/somnath-dwarka-taxi-service/{vehicle}/) via `kind`.
 */
export type Fare = {
  id?: string;
  vehicle: string;
  seats?: number;
  per_km?: string;
  package_rate?: string;
};

export type ITaxi = SharedFields & {
  kind: "route" | "vehicle";
  title: string;
  // route fields
  origin?: string;
  destination?: string;
  distance_km?: VerifyField;
  duration_hrs?: VerifyField;
  trip_type?: "one_way" | "round_trip" | "both";
  stops?: string[];
  // vehicle fields
  vehicle_name?: string;
  seats?: number;
  suitable_for?: string;
  // shared money fields
  fares?: Fare[];
  inclusions?: string[];
  exclusions?: string[];
};

const fareSchema = {
  id: { type: String },
  vehicle: { type: String, required: true },
  seats: { type: Number },
  per_km: { type: String },
  package_rate: { type: String },
};

const TaxiSchema = new Schema<ITaxi>(
  {
    ...sharedFields,
    kind: { type: String, enum: ["route", "vehicle"], default: "route", index: true },
    title: { type: String, required: true, trim: true },
    origin: { type: String, default: "" },
    destination: { type: String, default: "" },
    distance_km: verifyFieldSchema,
    duration_hrs: verifyFieldSchema,
    trip_type: { type: String, enum: ["one_way", "round_trip", "both"], default: "both" },
    stops: [{ type: String }],
    vehicle_name: { type: String, default: "" },
    seats: { type: Number },
    suitable_for: { type: String, default: "" },
    fares: [fareSchema],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
  },
  { timestamps: true }
);

const TaxiModel: Model<ITaxi> =
  mongoose.models.Taxi || mongoose.model<ITaxi>("Taxi", TaxiSchema);

export default TaxiModel;
