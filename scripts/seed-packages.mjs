/**
 * Seed the tour-package collection from the URL map's money-circuit spokes.
 *
 *   node --env-file=.env.local scripts/seed-packages.mjs [--dry]
 *
 * These are real CMS records, editable in the admin — they replace the
 * ADMIN_DEMO_PACKAGES hardcoded fallback the home page used to render.
 *
 * Placeholder hero images are used (local /images/home/*.webp) so the cards have
 * something to show; swap them in the admin. No price, rating or review count is
 * written: TourCard renders "Custom" when price is absent and hides the rating
 * when it is absent, so nothing on screen claims a number nobody confirmed.
 *
 * Re-running is safe: records are upserted by slug and never overwrite an
 * editor's title, overview, price, images or rating.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const MAP = JSON.parse(readFileSync(path.join(here, "data", "url-map-v5.json"), "utf8"));

const HUB = "/somnath-dwarka-tour-package/";

/** Local placeholder art already shipped in /public. Replace in the admin. */
const HERO = "/images/home/HomeHero.webp";

/**
 * Every item in an editor array needs its own `id`: the admin's PackageEditor
 * lists key on `item.id`, so an item without one produces duplicate empty keys
 * and React drops or duplicates rows. Built fresh per document — sharing one
 * array across docs would also share the ids.
 */
const childImages = () =>
  [
    { image: "/images/home/SomnathLongImage.webp", alt: "Somnath temple by the Arabian Sea" },
    { image: "/images/home/DwarikaLongImage.webp", alt: "Dwarkadhish Temple in Dwarka" },
    { image: "/images/CTA.webp", alt: "Somnath Dwarka pilgrimage route" },
  ].map((c) => ({ id: randomUUID(), ...c }));

/** slug -> the trip shape we can state without inventing anything. */
const SHAPE = {
  "1-day-somnath": { days: 1, nights: 0, destination: "Somnath", category: "Day Trip", source: "Somnath", dest: "Somnath" },
  "1-day-dwarka": { days: 1, nights: 0, destination: "Dwarka", category: "Day Trip", source: "Dwarka", dest: "Dwarka" },
  "2-days-1-night": { days: 2, nights: 1, destination: "Somnath, Dwarka", category: "Short Yatra", source: "Dwarka", dest: "Somnath" },
  "3-days-2-nights": { days: 3, nights: 2, destination: "Dwarka, Bet Dwarka, Somnath", category: "Private Trip", source: "Dwarka", dest: "Somnath" },
  "4-days-3-nights": { days: 4, nights: 3, destination: "Dwarka, Bet Dwarka, Somnath", category: "Family Pilgrimage", source: "Dwarka", dest: "Somnath" },
  "5-days-4-nights": { days: 5, nights: 4, destination: "Dwarka, Somnath, Gir", category: "Extended Circuit", source: "Dwarka", dest: "Somnath" },
  "from-ahmedabad": { days: 4, nights: 3, destination: "Somnath, Dwarka", category: "From Ahmedabad", source: "Ahmedabad", dest: "Somnath" },
  "from-rajkot": { days: 3, nights: 2, destination: "Somnath, Dwarka", category: "From Rajkot", source: "Rajkot", dest: "Dwarka" },
  "from-mumbai": { days: 5, nights: 4, destination: "Somnath, Dwarka", category: "From Mumbai", source: "Mumbai", dest: "Somnath" },
  "for-family": { days: 4, nights: 3, destination: "Somnath, Dwarka", category: "Family Pilgrimage", source: "Dwarka", dest: "Somnath" },
  budget: { days: 3, nights: 2, destination: "Somnath, Dwarka", category: "Budget", source: "Dwarka", dest: "Somnath" },
  // Wave A modifier: the circuit with Gir added. It does not replace
  // /somnath-dwarka-gir-tour-package/, which owns the triangle head term.
  "with-gir": { days: 5, nights: 4, destination: "Somnath, Dwarka, Gir", category: "With Gir", source: "Dwarka", dest: "Somnath" },
};

const OVERVIEW = {
  "1-day-somnath":
    "A single day in Somnath: the jyotirlinga darshan, Triveni Sangam and Bhalka Tirth, timed so you are at the temple for the evening aarti before you leave.",
  "1-day-dwarka":
    "One day in Dwarka covering Dwarkadhish darshan, Nageshwar Jyotirlinga and Rukmini Devi Temple, with Bet Dwarka added if the ferry timings allow.",
  "with-gir":
    "The Somnath–Dwarka circuit with a night at Sasan Gir added for a lion safari. Safari permits are limited and released on a fixed schedule, so this variant is planned around the permit, not the hotel.",
};

const baseInclusions = () =>
  ["Private AC cab with driver", "Darshan route planning", "On-trip local support"].map(
    (description) => ({ id: randomUUID(), description }),
  );

/**
 * Titles that read better than the URL map's h1_pattern. The map's H1 is written
 * for the SERP ("Add Gir To Somnath Dwarka Trip (Modifier)"); the card title is
 * written for a human.
 */
const TITLES = {
  "with-gir": "Somnath Dwarka Package with Gir",
};

const packageSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const TourPackage =
  mongoose.models.TourPackage || mongoose.model("TourPackage", packageSchema, "packages");

function buildDoc(row, slug) {
  const shape = SHAPE[slug];
  if (!shape) return null;

  const nights = shape.nights;
  const duration = nights ? `${shape.days} Days / ${nights} Nights` : `${shape.days} Day`;

  return {
    slug,
    title: TITLES[slug] || (row?.h1_pattern || "").split(" — ")[0] || slug,
    category: shape.category,
    duration,
    days: shape.days,
    nights,
    destination: shape.destination,
    // Deliberately absent: price, rating, reviews. TourCard shows "Custom" and
    // hides the star row rather than displaying a number nobody has confirmed.
    overview:
      OVERVIEW[slug] ||
      `A private ${duration.toLowerCase()} covering ${shape.destination}, planned around darshan and aarti timings by a local Gujarat team.`,
    heroImage: { image: HERO, alt: `${shape.destination} pilgrimage package` },
    childImages: childImages(),
    inclusions: baseInclusions(),
    routes: { source: shape.source, destination: shape.dest },
    isTransferIncluded: true,
    isStayIncluded: nights > 0,
    isBreakfastIncluded: nights > 0,
    isSightseeingIncluded: true,
    status: "published",
  };
}

/** Editor arrays whose items the admin keys on `id`. */
const ID_ARRAYS = [
  "inclusions", "exclusions", "childImages", "itinerary",
  "duration", "documents", "testimonials", "knowBeforeYouGo",
];

/**
 * `--repair`: backfill missing item ids and correct titles on records already in
 * the database. Seeded documents predate the id fix, and the admin's list keys
 * break on an item without one. Touches nothing else an editor may have written.
 */
async function repair() {
  const docs = await TourPackage.find({}).lean();
  let touched = 0;

  for (const doc of docs) {
    const set = {};

    const wanted = TITLES[doc.slug];
    if (wanted && doc.title !== wanted) set.title = wanted;

    for (const field of ID_ARRAYS) {
      const arr = doc[field];
      if (!Array.isArray(arr) || !arr.length) continue;
      if (arr.every((it) => it && typeof it.id === "string" && it.id)) continue;
      set[field] = arr.map((it) => ({ ...it, id: it?.id || randomUUID() }));
    }

    const seg = doc.routes?.segments;
    if (Array.isArray(seg) && seg.some((s) => !s?.id)) {
      set["routes.segments"] = seg.map((s) => ({ ...s, id: s?.id || randomUUID() }));
    }

    if (!Object.keys(set).length) continue;
    touched++;
    console.log(`  ${doc.slug.padEnd(18)} ${Object.keys(set).join(", ")}`);
    if (!DRY) await TourPackage.updateOne({ _id: doc._id }, { $set: set });
  }

  console.log(`\n${touched} of ${docs.length} records ${DRY ? "would be" : ""} repaired`);
}

async function main() {
  if (process.argv.includes("--repair")) return repair();

  const spokes = MAP.rows
    .filter((r) => r.url.startsWith(HUB) && r.url !== HUB)
    .map((r) => ({ row: r, slug: r.url.slice(HUB.length).replace(/\/$/, "") }))
    .filter(({ slug }) => slug && !slug.includes("/") && SHAPE[slug]);

  // Keep the seed's own variants even when the map schedules them for later.
  for (const slug of Object.keys(SHAPE)) {
    if (!spokes.some((s) => s.slug === slug)) spokes.push({ row: null, slug });
  }

  let created = 0;
  let kept = 0;

  for (const { row, slug } of spokes) {
    const doc = buildDoc(row, slug);
    if (!doc) continue;

    if (DRY) {
      console.log(`  ${slug.padEnd(18)} ${doc.days}d/${doc.nights}n  ${doc.title}`);
      continue;
    }

    const res = await TourPackage.updateOne(
      { slug },
      { $setOnInsert: doc },
      { upsert: true }
    );
    if (res.upsertedCount) created++;
    else kept++;
  }

  console.log(`\n${spokes.length} package spokes`);
  if (!DRY) console.log(`created ${created}, left untouched ${kept} (no price/rating written)`);
}

// --repair reads existing records, so it needs a connection even when dry.
const NEEDS_DB = !DRY || process.argv.includes("--repair");

const run = async () => {
  if (NEEDS_DB) {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing (use node --env-file=.env.local)");
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  }
  await main();
  if (NEEDS_DB) await mongoose.disconnect();
};

run().then(
  () => process.exit(0),
  (e) => {
    console.error(e.message);
    process.exit(1);
  }
);
