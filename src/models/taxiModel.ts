import mongoose, { Schema, Model } from "mongoose";
import { sharedFields, verifyFieldSchema, type SharedFields, type VerifyField } from "./shared";

/**
 * CabRoute / Vehicle (SOP §2). One model serves both route pages
 * (/{origin}-to-{dest}-taxi/) and vehicle fare pages
 * (/somnath-dwarka-taxi-service/{vehicle}/) via `kind`.
 */
/**
 * One fare row.
 *
 * Route pages and vehicle pages quote differently, and the pages have always
 * rendered both shapes: a route lists vehicles with a one-way and a round-trip
 * price, a vehicle lists named routes with a single rate. The original schema
 * modelled only per-km/package-rate, which is why the seeded cab pages could
 * never be imported without losing every fare on the site.
 *
 * `vehicle` is no longer required: on a vehicle page the row is keyed by `route`.
 */
export type Fare = {
  id?: string;
  vehicle?: string;
  seats?: number;
  per_km?: string;
  package_rate?: string;
  /** Route-page fares. */
  one_way?: string;
  round_trip?: string;
  /** Vehicle-page fares: a named route and its rate. */
  route?: string;
  rate?: string;
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
  /** Luggage capacity as shown on the hub's vehicle table, e.g. "4 bags". */
  luggage?: string;
  /**
   * Photo of the actual vehicle, shown on its page. Stored flat because the
   * generic content form writes flat keys; the page resolver composes them back
   * into the { src, alt } shape the template expects.
   */
  image_src?: string;
  image_alt?: string;
  // shared money fields
  fares?: Fare[];
  inclusions?: string[];
  exclusions?: string[];
};

const fareSchema = {
  id: { type: String },
  vehicle: { type: String, default: "" },
  seats: { type: Number },
  per_km: { type: String, default: "" },
  package_rate: { type: String, default: "" },
  one_way: { type: String, default: "" },
  round_trip: { type: String, default: "" },
  route: { type: String, default: "" },
  rate: { type: String, default: "" },
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
    luggage: { type: String, default: "" },
    image_src: { type: String, default: "" },
    image_alt: { type: String, default: "" },
    fares: [fareSchema],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
  },
  { timestamps: true }
);

const TaxiModel: Model<ITaxi> =
  mongoose.models.Taxi || mongoose.model<ITaxi>("Taxi", TaxiSchema);

export default TaxiModel;
