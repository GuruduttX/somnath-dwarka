/**
 * Map a CMS `taxis` document into the shape the cab templates render.
 *
 * The taxi silo used to render straight from src/lib/seed/cabs.ts, so the
 * templates take that seed shape. Rather than rewrite both templates, translate
 * at this boundary: the CMS becomes the source of truth while the rendering code
 * stays untouched, and any route not yet imported still falls back to the seed.
 *
 * The two shapes differ in three places — free-text distance/duration are stored
 * in the value half of a verify-field, fares are stored with snake_case keys, and
 * the vehicle photo is stored flat.
 */
import type { SeedCabRoute, SeedVehicle } from "@/src/lib/seed/cabs";

type Doc = Record<string, unknown>;

const str = (v: unknown) => String(v ?? "");
const arr = (v: unknown) => (Array.isArray(v) ? v : []);

/** Verify-fields hold { value, verified }; the templates want the string. */
const verifyValue = (v: unknown) => str((v as { value?: unknown } | null)?.value);
const verifyFlag = (v: unknown) => Boolean((v as { verified?: unknown } | null)?.verified);

const faqOf = (v: unknown) =>
  arr(v).map((f) => {
    const x = (f ?? {}) as Doc;
    return { question: str(x.question), answer: str(x.answer) };
  });

export function cabRouteFromCms(doc: Doc): SeedCabRoute {
  return {
    slug: str(doc.slug),
    kind: "route",
    title: str(doc.title),
    h1: str(doc.h1) || str(doc.title),
    origin: str(doc.origin),
    destination: str(doc.destination),
    distance: verifyValue(doc.distance_km),
    duration: verifyValue(doc.duration_hrs),
    // A route is only "verified" when both figures have been confirmed.
    verified: verifyFlag(doc.distance_km) && verifyFlag(doc.duration_hrs),
    answer_first: str(doc.answer_first),
    fares: arr(doc.fares).map((f) => {
      const x = (f ?? {}) as Doc;
      return {
        vehicle: str(x.vehicle),
        seats: Number(x.seats || 0),
        oneWay: str(x.one_way),
        roundTrip: str(x.round_trip),
      };
    }),
    stops: arr(doc.stops).map(str),
    faq: faqOf(doc.faq),
  };
}

export function vehicleFromCms(doc: Doc): SeedVehicle {
  const src = str(doc.image_src);
  return {
    slug: str(doc.slug),
    kind: "vehicle",
    title: str(doc.title),
    h1: str(doc.h1) || str(doc.title),
    vehicle_name: str(doc.vehicle_name),
    seats: Number(doc.seats || 0),
    suitable_for: str(doc.suitable_for),
    answer_first: str(doc.answer_first),
    fares: arr(doc.fares).map((f) => {
      const x = (f ?? {}) as Doc;
      return { route: str(x.route), rate: str(x.rate) };
    }),
    ...(src ? { image: { src, alt: str(doc.image_alt) } } : {}),
    faq: faqOf(doc.faq),
  };
}

/** Either kind, dispatched on the document's own `kind`. */
export const cabFromCms = (doc: Doc): SeedCabRoute | SeedVehicle =>
  str(doc.kind) === "vehicle" ? vehicleFromCms(doc) : cabRouteFromCms(doc);
