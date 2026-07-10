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
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const MAP = JSON.parse(readFileSync(path.join(here, "data", "url-map-v5.json"), "utf8"));

const HUB = "/somnath-dwarka-tour-package/";

/** Local placeholder art already shipped in /public. Replace in the admin. */
const HERO = "/images/home/HomeHero.webp";
const CHILD = [
  { image: "/images/home/SomnathLongImage.webp", alt: "Somnath temple by the Arabian Sea" },
  { image: "/images/home/DwarikaLongImage.webp", alt: "Dwarkadhish Temple in Dwarka" },
  { image: "/images/CTA.webp", alt: "Somnath Dwarka pilgrimage route" },
];

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
};

const OVERVIEW = {
  "1-day-somnath":
    "A single day in Somnath: the jyotirlinga darshan, Triveni Sangam and Bhalka Tirth, timed so you are at the temple for the evening aarti before you leave.",
  "1-day-dwarka":
    "One day in Dwarka covering Dwarkadhish darshan, Nageshwar Jyotirlinga and Rukmini Devi Temple, with Bet Dwarka added if the ferry timings allow.",
};

const item = (description) => ({ description });

const BASE_INCLUSIONS = [
  item("Private AC cab with driver"),
  item("Darshan route planning"),
  item("On-trip local support"),
];

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
    title: (row?.h1_pattern || "").split(" — ")[0] || slug,
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
    childImages: CHILD,
    inclusions: BASE_INCLUSIONS,
    routes: { source: shape.source, destination: shape.dest },
    isTransferIncluded: true,
    isStayIncluded: nights > 0,
    isBreakfastIncluded: nights > 0,
    isSightseeingIncluded: true,
    status: "published",
  };
}

async function main() {
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

const run = async () => {
  if (!DRY) {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing (use node --env-file=.env.local)");
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  }
  await main();
  if (!DRY) await mongoose.disconnect();
};

run().then(
  () => process.exit(0),
  (e) => {
    console.error(e.message);
    process.exit(1);
  }
);
