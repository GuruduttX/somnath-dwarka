/**
 * Content for the Junagadh–Girnar cluster.
 *
 *   node --env-file=.env.local scripts/seed-junagadh-girnar.mjs [--dry]
 *
 * Mirrors scripts/seed-gir.mjs. Honesty gates hold: no ropeway ticket price, no
 * temple timing and no parikrama date is stated here — those live behind VERIFY
 * on their own pages. Road distances are written with verified:false so the UI
 * stamps them unconfirmed, and the step count is given as the widely-cited
 * approximate figure, not asserted as exact.
 *
 * Re-running is safe: a field is written only when it is currently empty, so an
 * editor's words are never overwritten. Also clears the map's unresolved
 * {placeholder} from the ropeway title if the Gir seed has not already.
 */
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const schema = new mongoose.Schema({}, { strict: false, timestamps: true });

const Destination = mongoose.models.Destination || mongoose.model("Destination", schema, "destinations");
const TempleInfo = mongoose.models.TempleInfo || mongoose.model("TempleInfo", schema, "templeinfos");
const Place = mongoose.models.Place || mongoose.model("Place", schema, "places");

const TITLE_FIXES = [
  [TempleInfo, "girnar-ropeway", "Girnar Ropeway — Ticket Price, Booking & Tips"],
];

const JG = {
  h1: "Junagadh & Girnar",
  title_tag: "Junagadh & Girnar — Girnar Climb, Ropeway, Temples & Guide",
  meta_description:
    "Girnar's sacred climb and ropeway, the Jain and Hindu temples on the summit, the Lili Parikrama, Uparkot Fort and how to reach Junagadh — a local team's guide.",
  answer_first:
    "Junagadh sits at the foot of Girnar, a sacred mountain climbed by Jain and Hindu pilgrims alike. The ascent is a stone stairway of roughly ten thousand steps to temples near the summit, and a ropeway now carries visitors part of the way. Around it lie Uparkot Fort, the Ashoka rock edict and the Bhavnath fair — a full two-day base rather than a half-day stop.",
  significance:
    "Girnar is holy to two faiths at once. Its summit temples are among the most revered Jain tirths in western India, while Hindus climb to the shrines of Amba Mata, Gorakhnath and Dattatreya higher up. The annual Lili Parikrama circles the whole massif, and the Bhavnath fair at Shivratri draws sadhus from across the country.",
  best_time:
    "October to March is the comfortable window for the climb — cool mornings and clear air. Avoid the summer months, when the stone steps turn punishing by mid-morning. The mountain is busiest during the Lili Parikrama and the Bhavnath fair, so plan around them unless the crowd is the reason you are going.",
  how_to_reach:
    "Junagadh has its own railway station on the Ahmedabad–Veraval line and is an easy road drive from Rajkot (about two hours) and Somnath. The nearest airport is Rajkot, roughly 100 km away. The Girnar taleti — the foot of the climb — is a short local hop from the town centre.",
  map_query: "Girnar, Junagadh, Gujarat",
  top_places: [
    { name: "Damodar Kund", slug: "damodar-kund", blurb: "A sacred tank at the foot of Girnar, where pilgrims bathe before the climb." },
    { name: "Ashoka Rock Edict", slug: "ashoka-rock-edict", blurb: "Emperor Ashoka's edicts carved into a boulder, over two thousand years old." },
    { name: "Mahabat Maqbara", slug: "mahabat-maqbara", blurb: "An ornate mausoleum in the town, a landmark of Indo-Islamic architecture." },
  ],
  key_distances: [
    { from: "Junagadh", to: "Girnar taleti (climb base)", distance: "≈ 5 km", duration: "~ 15 min", verified: false },
    { from: "Junagadh", to: "Somnath", distance: "≈ 85 km", duration: "~ 2 hr", verified: false },
    { from: "Junagadh", to: "Sasan Gir", distance: "≈ 60 km", duration: "~ 1.5 hr", verified: false },
    { from: "Junagadh", to: "Rajkot", distance: "≈ 100 km", duration: "~ 2 hr", verified: false },
  ],
  faq: [
    {
      question: "How many steps is the Girnar climb?",
      answer:
        "It is widely cited as around ten thousand stone steps to the upper temples. Treat that as approximate — pilgrims usually start before dawn to reach the top before the heat.",
      fact_tag: "local",
    },
    {
      question: "Can I take the ropeway instead of climbing?",
      answer:
        "The Girnar ropeway covers the lower section up to the Amba Mata temple area. You still climb on foot to the higher Gorakhnath and Dattatreya peaks. Ticket prices and running hours are set by the operator — check the current figures before you go.",
      fact_tag: "verified",
    },
    {
      question: "How many days do I need for Junagadh and Girnar?",
      answer:
        "Two days is comfortable — one for the climb or ropeway, one for Uparkot Fort, the Ashoka edict and the town. The climb alone can take most of a day on foot.",
      fact_tag: "verified",
    },
    {
      question: "Can Junagadh be combined with Somnath and Gir?",
      answer:
        "Yes, easily. Junagadh sits between Gir and Somnath, so many travellers string all three together — a safari at Sasan, the Girnar climb, and darshan at Somnath over four to five days.",
      fact_tag: "verified",
    },
  ],
};

/** Card blurbs for the templeinfo spokes. No prices, timings or dates. */
const SPOKE_BLURBS = {
  "girnar-steps-climb-guide": "How long the ascent takes, when to start, and what to carry.",
  "girnar-ropeway": "The cable-car route, what it covers, and where the climb resumes on foot.",
  "girnar-lili-parikrama": "The pilgrimage that circles the whole massif, and when it falls.",
  "bhavnath-mahadev-mela": "The Shivratri fair at the foot of Girnar, and the sadhus it draws.",
  "ambaji-temple-girnar": "The first major summit shrine, sacred to both faiths.",
  "dattatreya-temple": "The highest peak on Girnar and its Dattatreya shrine.",
  "jain-temples-girnar": "The cluster of Jain tirth temples on the mountain.",
  "uparkot-fort": "The ancient hill fort above Junagadh, with step-wells and caves.",
  "how-to-reach-junagadh": "Railheads, the nearest airport, and the drive from Somnath.",
};

const PLACE_BLURBS = {
  "damodar-kund": "A sacred tank at the foot of Girnar, where pilgrims bathe before the climb.",
  "ashoka-rock-edict": "Emperor Ashoka's edicts carved into a boulder, over two thousand years old.",
  "mahabat-maqbara": "An ornate mausoleum in the town, a landmark of Indo-Islamic architecture.",
};

const withIds = (arr) => arr.map((it) => ({ id: crypto.randomUUID(), ...it }));

function fillMissing(doc, updates) {
  const set = {};
  for (const [key, value] of Object.entries(updates)) {
    const current = doc?.[key];
    const empty =
      current === undefined ||
      current === null ||
      current === "" ||
      (Array.isArray(current) && current.length === 0);
    if (empty) set[key] = value;
  }
  return set;
}

async function main() {
  const jg = await Destination.findOne({ slug: "junagadh-girnar" }).lean();
  if (!jg) throw new Error("destinations/junagadh-girnar missing — run scripts/import-url-map.mjs first");

  const set = fillMissing(jg, {
    ...JG,
    top_places: withIds(JG.top_places),
    key_distances: withIds(JG.key_distances),
    faq: withIds(JG.faq),
  });

  if (Object.keys(set).length) {
    console.log(`  destinations/junagadh-girnar  <- ${Object.keys(set).join(", ")}`);
    if (!DRY) await Destination.updateOne({ _id: jg._id }, { $set: set });
  } else {
    console.log("  destinations/junagadh-girnar  already populated");
  }

  for (const [slug, blurb] of Object.entries(SPOKE_BLURBS)) {
    const doc = await TempleInfo.findOne({ slug, destination: "junagadh-girnar" }).lean();
    if (!doc) continue;
    const patch = fillMissing(doc, { meta_description: blurb });
    if (!Object.keys(patch).length) continue;
    console.log(`  templeinfos/${slug}  <- meta_description`);
    if (!DRY) await TempleInfo.updateOne({ _id: doc._id }, { $set: patch });
  }

  for (const [slug, blurb] of Object.entries(PLACE_BLURBS)) {
    const doc = await Place.findOne({ slug, parent_destination: "junagadh-girnar" }).lean();
    if (!doc) continue;
    const patch = fillMissing(doc, { meta_description: blurb });
    if (!Object.keys(patch).length) continue;
    console.log(`  places/${slug}  <- meta_description`);
    if (!DRY) await Place.updateOne({ _id: doc._id }, { $set: patch });
  }

  console.log("\n  unresolved-placeholder titles:");
  for (const [Model, slug, title] of TITLE_FIXES) {
    const doc = await Model.findOne({ slug }).lean();
    if (!doc) continue;
    if (!/[{]/.test(doc.h1 || "") && !/[{]/.test(doc.title_tag || "")) {
      console.log(`    ${slug.padEnd(28)} already clean`);
      continue;
    }
    console.log(`    ${slug.padEnd(28)} -> ${title}`);
    if (!DRY) await Model.updateOne({ _id: doc._id }, { $set: { h1: title, title_tag: title } });
  }
}

const run = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing (use node --env-file=.env.local)");
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  await main();
  await mongoose.disconnect();
  console.log(DRY ? "\ndry run — nothing written" : "\ndone");
};

run().then(
  () => process.exit(0),
  (e) => {
    console.error(e.message);
    process.exit(1);
  },
);
