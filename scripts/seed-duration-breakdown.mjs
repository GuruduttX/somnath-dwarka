/**
 * Seed the CMS "Duration breakdown" section for every package that has none.
 *
 *   node --env-file=.env.local scripts/seed-duration-breakdown.mjs [--dry] [--force]
 *
 * Background: the duration strip above the itinerary was never read from the CMS.
 * Each route derived it at render time by keyword-matching the itinerary prose, so
 * `durationbreakdown` sat empty on all 20 packages while the strip still rendered.
 * The routes now read the field and fall back to that derivation when it is empty.
 *
 * This backfills the field with exactly what the derivation already produces, so
 * no page changes appearance — but the rows become editable in the CMS, which is
 * the point. Editors can then fix the ones the keyword matcher gets wrong.
 *
 * Only `durationbreakdown` is written. Unlike the other seed scripts this never
 * $sets a whole document, so hand edits to any other field are safe.
 *
 * Packages that already have rows are left alone unless --force is passed.
 */
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const FORCE = process.argv.includes("--force");

/**
 * Mirrors placeOf() in src/utils/durationBreakdown.ts. Kept in step with it by
 * hand: this is a one-off backfill, and reaching into the app's TS from a plain
 * .mjs script would need a build step for no lasting benefit.
 */
const PLACES = [
  "ahmedabad drop",
  "bet dwarka",
  "ahmedabad",
  "dwarka",
  "somnath",
  "porbandar",
  "rajkot",
  "mumbai",
  "jamnagar",
  "diu",
  // The longer circuits run inland through Gir and Junagadh. The Gir route's own
  // matcher already knows these; the flagship one never did, which is why
  // 6-days-5-nights had a day resolving to "Safari,".
  "sasan gir",
  "junagadh",
  "girnar",
  "surat",
  "vadodara",
  "bhavnagar",
  // Origin cities, so a "flight home to Delhi" day resolves to Delhi rather than
  // to the Rajkot earlier in the same title.
  "delhi",
  "pune",
  "bengaluru",
  "bangalore",
  "hyderabad",
];

/** "Sasan Gir" reads better than the raw match for a day spent on safari. */
const PLACE_LABEL = { "sasan gir": "Sasan Gir", girnar: "Junagadh" };

const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Every place named in `s`, in the order they appear. "Bet Dwarka" wins over the
 * "Dwarka" inside it, so longer names are matched first and their span consumed.
 */
function placesIn(s) {
  const text = String(s || "").toLowerCase();
  const found = [];
  const byLength = [...PLACES].sort((a, b) => b.length - a.length);
  const taken = new Array(text.length).fill(false);

  for (const p of byLength) {
    let from = 0;
    for (;;) {
      const at = text.indexOf(p, from);
      if (at === -1) break;
      if (!taken.slice(at, at + p.length).some(Boolean)) {
        for (let i = at; i < at + p.length; i++) taken[i] = true;
        found.push({ at, place: PLACE_LABEL[p] || titleCase(p) });
      }
      from = at + p.length;
    }
  }
  return found.sort((a, b) => a.at - b.at).map((f) => f.place);
}

/**
 * Where the traveller actually spends the day — the day's endpoint, not its start.
 *
 * "Dwarka to Somnath via Porbandar" is a Somnath day: you wake in Dwarka but the
 * night is in Somnath, and the strip reads "3rd day in ___". So take the last
 * place named in the title. Titles with no place at all (the shared "Days 2 and 3"
 * middle block) fall through to the description, which does name them.
 */
/**
 * "Dwarka to Somnath via Porbandar" ends at Somnath, not Porbandar — a waypoint
 * is passed through, not stayed in. Drop everything from "via" onwards before
 * looking for the endpoint.
 */
const withoutWaypoints = (title) => String(title || "").split(/\bvia\b/i)[0];

function placeOf(item) {
  const fromTitle = placesIn(withoutWaypoints(item.title));
  if (fromTitle.length) return fromTitle[fromTitle.length - 1];

  const fromBody = placesIn(`${item.description || ""} ${Array.isArray(item.stops) ? item.stops.join(" ") : ""}`);
  if (fromBody.length) return fromBody[fromBody.length - 1];

  return null;
}

/**
 * One row per itinerary day. A day naming no place at all is reported rather than
 * guessed at, so the run surfaces it instead of writing a placeholder.
 */
function breakdownOf(itinerary) {
  const rows = [];
  const unresolved = [];
  (itinerary || []).forEach((item, i) => {
    const place = placeOf(item);
    if (!place) {
      unresolved.push(`day ${i + 1} "${String(item.title || "").slice(0, 48)}"`);
      return;
    }
    rows.push({ id: randomUUID(), days: 1, place });
  });
  return { rows, unresolved };
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (use --env-file=.env.local)");

  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("packages");
  const docs = await col.find({}, { projection: { slug: 1, itinerary: 1, durationbreakdown: 1 } }).toArray();

  let written = 0;
  let skipped = 0;

  for (const d of docs) {
    const has = Array.isArray(d.durationbreakdown) && d.durationbreakdown.length > 0;
    if (has && !FORCE) {
      console.log(`skip  ${String(d.slug).padEnd(20)} already has ${d.durationbreakdown.length} rows`);
      skipped++;
      continue;
    }

    const { rows, unresolved } = breakdownOf(d.itinerary);
    if (unresolved.length) {
      // The strip numbers rows by position ("3rd day in ..."), so a breakdown
      // missing a day would mislabel every day after it. Better no rows at all —
      // the itinerary fallback still renders — than confidently wrong ones.
      console.log(`skip  ${String(d.slug).padEnd(20)} unresolved: ${unresolved.join("; ")}`);
      skipped++;
      continue;
    }
    if (!rows.length) {
      // No itinerary to read places off. Inventing a breakdown here would put
      // words in the client's mouth; these need filling in by hand in the CMS.
      console.log(`skip  ${String(d.slug).padEnd(20)} no itinerary days`);
      skipped++;
      continue;
    }

    console.log(`write ${String(d.slug).padEnd(20)} ${rows.map((r) => r.place).join(" > ")}`);
    if (!DRY) {
      await col.updateOne({ _id: d._id }, { $set: { durationbreakdown: rows } });
    }
    written++;
  }

  console.log(`\n${DRY ? "[dry] would write" : "wrote"} ${written}, skipped ${skipped}, of ${docs.length}`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("SEED FAILED:", e.message);
  process.exit(1);
});
