/**
 * Import the seeded cab routes and vehicles into the CMS `taxis` collection.
 *
 *   node --env-file=.env.local scripts/import-cabs.mjs [--dry] [--force]
 *
 * The taxi silo was the last part of the site rendering entirely from a
 * hardcoded TypeScript array (src/lib/seed/cabs.ts): the pages called
 * findSeedCab(slug) and never touched Mongo, so the CMS's "Cab routes &
 * vehicles" section listed nothing. This lifts those 25 entries into the
 * collection so they become editable, and the pages now read the CMS first and
 * fall back to the seed for anything not yet imported.
 *
 * Existing documents are left alone unless --force is passed, so re-running
 * never clobbers an edit made in the admin.
 *
 * Fares are carried across in the shape each page kind actually renders: routes
 * keep one-way/round-trip per vehicle, vehicles keep route/rate. Distance and
 * duration are free text in the seed ("≈ 233 km"), so they land in the value
 * half of the verify-field with verified copied from the seed's own flag —
 * which is false for every entry, by the seed file's own admission.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");

const here = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.join(here, "..", "src", "lib", "seed", "cabs.ts");

/**
 * Read the seed arrays out of the TypeScript module.
 *
 * The file is TS, so it cannot be imported from a plain .mjs script without a
 * build step. Rather than add one for a one-off import, evaluate the two array
 * literals directly — they are plain data with no imports or expressions.
 */
function loadSeed() {
  const src = readFileSync(seedPath, "utf8");

  const grab = (name) => {
    const start = src.indexOf(`export const ${name}`);
    if (start === -1) throw new Error(`${name} not found in ${seedPath}`);
    // Skip past the type annotation: `SeedCabRoute[] = [` would otherwise match
    // the empty brackets of the array type rather than the literal itself.
    const eq = src.indexOf("=", start);
    const open = src.indexOf("[", eq);
    let depth = 0;
    for (let i = open; i < src.length; i++) {
      if (src[i] === "[") depth++;
      else if (src[i] === "]") {
        depth--;
        if (depth === 0) {
          const literal = src.slice(open, i + 1);
          return eval(`(${literal})`);
        }
      }
    }
    throw new Error(`Unbalanced array literal for ${name}`);
  };

  return { routes: grab("SEED_CAB_ROUTES"), vehicles: grab("SEED_VEHICLES") };
}

const faqOf = (faq) =>
  (Array.isArray(faq) ? faq : []).map((f) => ({
    id: randomUUID(),
    question: String(f.question || ""),
    answer: String(f.answer || ""),
  }));

const verify = (value, verified) => ({
  value: String(value || ""),
  verified: Boolean(verified),
  verified_at: "",
  source_url: "",
});

function routeDoc(r) {
  return {
    slug: r.slug,
    kind: "route",
    title: r.title,
    h1: r.h1,
    title_tag: r.title,
    meta_description: r.answer_first,
    answer_first: r.answer_first,
    origin: r.origin,
    destination: r.destination,
    distance_km: verify(r.distance, r.verified),
    duration_hrs: verify(r.duration, r.verified),
    trip_type: "both",
    stops: Array.isArray(r.stops) ? r.stops.map(String) : [],
    fares: (Array.isArray(r.fares) ? r.fares : []).map((f) => ({
      id: randomUUID(),
      vehicle: String(f.vehicle || ""),
      seats: Number(f.seats || 0),
      one_way: String(f.oneWay || ""),
      round_trip: String(f.roundTrip || ""),
    })),
    faq: faqOf(r.faq),
    status: "published",
  };
}

function vehicleDoc(v) {
  return {
    slug: v.slug,
    kind: "vehicle",
    title: v.title,
    h1: v.h1,
    title_tag: v.title,
    meta_description: v.answer_first,
    answer_first: v.answer_first,
    vehicle_name: v.vehicle_name,
    seats: Number(v.seats || 0),
    suitable_for: v.suitable_for || "",
    image_src: v.image?.src || "",
    image_alt: v.image?.alt || "",
    fares: (Array.isArray(v.fares) ? v.fares : []).map((f) => ({
      id: randomUUID(),
      route: String(f.route || ""),
      rate: String(f.rate || ""),
    })),
    faq: faqOf(v.faq),
    status: "published",
  };
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (use --env-file=.env.local)");

  const { routes, vehicles } = loadSeed();
  const docs = [...routes.map(routeDoc), ...vehicles.map(vehicleDoc)];
  console.log(`seed: ${routes.length} routes + ${vehicles.length} vehicles = ${docs.length} docs\n`);

  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("taxis");
  const now = new Date();

  let written = 0;
  let skipped = 0;

  for (const d of docs) {
    const existing = await col.findOne({ slug: d.slug }, { projection: { _id: 1 } });
    if (existing && !FORCE) {
      console.log(`skip  ${d.slug.padEnd(32)} already in CMS`);
      skipped++;
      continue;
    }

    const fareSummary =
      d.kind === "route"
        ? d.fares.map((f) => `${f.vehicle} ${f.one_way}/${f.round_trip}`).join(", ")
        : d.fares.map((f) => `${f.route} ${f.rate}`).join(", ");

    console.log(
      `${DRY ? "would " : ""}write ${d.slug.padEnd(32)} ${d.kind.padEnd(8)} faq=${d.faq.length} fares=${d.fares.length}${fareSummary ? ` [${fareSummary}]` : ""}`,
    );

    if (!DRY) {
      await col.updateOne(
        { slug: d.slug },
        { $set: { ...d, updatedAt: now }, $setOnInsert: { createdAt: now } },
        { upsert: true },
      );
    }
    written++;
  }

  console.log(`\n${DRY ? "[dry] would write" : "wrote"} ${written}, skipped ${skipped}, of ${docs.length}`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("IMPORT FAILED:", e.message);
  process.exit(1);
});
