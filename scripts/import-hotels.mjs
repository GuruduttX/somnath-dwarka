/**
 * Seed the two city hotel documents from the hotel SOPs.
 *
 *   node --env-file=.env.local scripts/import-hotels.mjs [--dry] [--force]
 *
 * The named hotels shown on /hotels/hotels-in-somnath/ and /hotels/hotels-in-dwarka/
 * are `properties` on the `hotels` collection. The Mongoose model has always had
 * the field, but the admin form never exposed it, so the collection sat empty and
 * the pages fell back to the seed file. The form now has it; this fills it.
 *
 * rating and reviews are deliberately left at 0. The SOPs name hotels and say
 * what each is known for, but quote no ratings, and the city page's own copy
 * promises "no fake inventory or ratings". The card hides the rating pill until
 * a real figure is entered in the admin.
 *
 * Existing documents are left alone unless --force is passed.
 */
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");

const prop = (name, tier, area, distance, description) => ({
  id: randomUUID(),
  name,
  tier,
  area,
  distance,
  description,
  image: "",
  price_range: "",
  rating: 0,
  reviews: 0,
  amenities: [],
  tags: [],
});

const DOCS = [
  {
    slug: "hotels-in-somnath",
    city: "Somnath",
    near_temple: "Somnath Jyotirlinga",
    properties: [
      prop("The Fern Residency Somnath", "4-star", "Prabhas Patan", "About 1 km from the temple", "Sea-facing terrace, restaurant"),
      prop("Lords Inn Somnath", "4-star", "Prabhas Patan", "Near the temple", "Pure vegetarian dining"),
      prop("Sarovar Portico Somnath", "4-star", "Veraval", "A short drive to the temple", "Spa and outdoor pool"),
      prop("Regenta Central Somnath", "4-star", "Bhalpara, Veraval", "", "Outdoor pool and cafe"),
      prop("Lemon Tree Resort Somnath", "4-star", "Somnath, near the coast", "", "Outdoor pool and sea views"),
    ],
  },
  {
    slug: "hotels-in-dwarka",
    city: "Dwarka",
    near_temple: "Dwarkadhish Temple",
    properties: [
      prop("Hawthorn Suites by Wyndham Dwarka", "Premier", "Near the temple", "", "Wyndham-branded, full service"),
      prop("Lemon Tree Premier Dwarka", "4-star", "Near the temple", "About 10 min walk to the temple", "Spa and wellness centre"),
      prop("VITS Devbhumi Dwarka", "4-star", "Near the temple", "", "Restaurant, modern rooms"),
      prop("Enrise by Sayaji Dwarka", "4-star", "Near the temple", "A short drive to the temple", "Outdoor pool and restaurant"),
      prop("Pride Elite Dwarka", "4-star", "Near the temple", "A few steps from the temple", "Temple-facing rooms"),
      prop("Grand Continent Dwarka", "4-star", "Near the temple", "About 10 min walk to the temple", "Terrace and buffet breakfast"),
    ],
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (use --env-file=.env.local)");

  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("hotels");
  const now = new Date();
  let written = 0, skipped = 0;

  for (const d of DOCS) {
    const existing = await col.findOne({ slug: d.slug }, { projection: { properties: 1 } });
    if (existing?.properties?.length && !FORCE) {
      console.log(`skip  ${d.slug.padEnd(20)} already has ${existing.properties.length} hotels`);
      skipped++;
      continue;
    }
    console.log(
      `${DRY ? "would " : ""}write ${d.slug.padEnd(20)} ${d.properties.length} hotels: ${d.properties.map((p) => p.name).join(", ")}`,
    );
    if (!DRY) {
      // Only the fields this import owns; anything else on the doc is untouched.
      await col.updateOne(
        { slug: d.slug },
        {
          $set: { city: d.city, near_temple: d.near_temple, properties: d.properties, updatedAt: now },
          $setOnInsert: { slug: d.slug, title: `Hotels in ${d.city}`, status: "published", createdAt: now },
        },
        { upsert: true },
      );
    }
    written++;
  }
  console.log(`\n${DRY ? "[dry] would write" : "wrote"} ${written}, skipped ${skipped}`);
  await mongoose.disconnect();
}

main().catch((e) => { console.error("IMPORT FAILED:", e.message); process.exit(1); });
