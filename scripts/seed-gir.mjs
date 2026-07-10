/**
 * Content for the Gir cluster, plus a sitewide fix for titles that still carry
 * the URL map's unresolved {placeholders}.
 *
 *   node --env-file=.env.local scripts/seed-gir.mjs [--dry]
 *
 * Honesty gates hold. Nothing here states a safari permit fee, a slot price or
 * a gate timing — those live behind VERIFY on their own pages. Road distances
 * are written with verified:false so the UI stamps them as unconfirmed, and the
 * monsoon closure is phrased as approximate because the forest department moves
 * it year to year.
 *
 * Re-running is safe: a field is written only when it is currently empty, so an
 * editor's words are never overwritten.
 */
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const schema = new mongoose.Schema({}, { strict: false, timestamps: true });
const model = (name, collection) =>
  mongoose.models[name] || mongoose.model(name, schema, collection);

const Destination = model("Destination", "destinations");
const TempleInfo = model("TempleInfo", "templeinfos");
const Place = model("Place", "places");
const Temple = model("Temple", "temples");
const DataPage = model("DataPage", "datapages");

/** Titles where the map's placeholder was never filled in. */
const TITLE_FIXES = [
  [TempleInfo, "gir-safari-booking", "Gir Safari Booking & Permit — Price, Process & Tips"],
  [TempleInfo, "gir-safari-timings-price", "Gir Safari Timings & Price"],
  [TempleInfo, "girnar-ropeway", "Girnar Ropeway — Ticket Price, Booking & Tips"],
  [Temple, "live-darshan-online-aarti", "Live Darshan Online — Official Streams & Aarti Times"],
  [DataPage, "gujarat-temple-timings-changelog", "Gujarat Temple Timings — Change Log"],
];

const GIR = {
  h1: "Gir National Park & Sasan Gir",
  title_tag: "Gir National Park & Sasan Gir — Safari, Best Time & Guide",
  meta_description:
    "The only wild home of the Asiatic lion. Safari permits, Devalia, best time to visit, how to reach Sasan Gir, and where Gir fits in a Somnath–Dwarka circuit.",
  answer_first:
    "Gir, in Gujarat's Saurashtra, is the only place on earth where the Asiatic lion still lives in the wild. Jeep safaris run from the Sasan gate into the sanctuary, and the smaller Devalia enclosure offers a shorter drive with a far higher chance of a sighting. Permits are limited and released in advance — that, not the hotel, is what to book first.",
  significance:
    "Gir is not a pilgrimage site, but the forest holds shrines that are: Kankai Mata deep inside the sanctuary and Tulsishyam on its edge draw devotees through the year, and many travellers pair a safari with darshan at Somnath, roughly two hours away.",
  best_time:
    "December to March is the most comfortable, with cool mornings and good visibility. April and May are hot but sightings are often better as animals gather at water. The park closes for the monsoon, roughly mid-June to mid-October — confirm the current dates before you plan.",
  how_to_reach:
    "Sasan Gir has its own small railway station on the Junagadh–Veraval line. Junagadh and Veraval are the practical railheads; Rajkot and Diu are the nearest airports. Most travellers arrive by road from Somnath, which is the shortest hop.",
  map_query: "Sasan Gir, Gujarat",
  top_places: [
    { name: "Kankai Mata Temple", slug: "kankai-mata-temple", blurb: "A shrine deep inside the sanctuary, reached on a forest road." },
    { name: "Tulsishyam", slug: "tulsishyam", blurb: "Hot springs and a Krishna temple on the sanctuary's edge." },
    { name: "Kamleshwar Dam", slug: "kamleshwar-dam", blurb: "The reservoir inside Gir, known for marsh crocodiles." },
  ],
  key_distances: [
    { from: "Sasan Gir", to: "Somnath", distance: "≈ 45 km", duration: "~ 1.5 hr", verified: false },
    { from: "Sasan Gir", to: "Junagadh", distance: "≈ 60 km", duration: "~ 1.5 hr", verified: false },
    { from: "Sasan Gir", to: "Veraval railhead", distance: "≈ 45 km", duration: "~ 1 hr", verified: false },
    { from: "Sasan Gir", to: "Rajkot airport", distance: "≈ 160 km", duration: "~ 3.5 hr", verified: false },
  ],
  faq: [
    {
      question: "Do I need to book a Gir safari permit in advance?",
      answer:
        "Yes. Permits are limited, released on a fixed schedule and routinely sell out long before hotel rooms do. Book the permit first and the stay around it.",
      fact_tag: "verified",
    },
    {
      question: "Will I definitely see a lion?",
      answer:
        "No one can promise that, and you should not trust an operator who does. Sightings in the sanctuary are good but never guaranteed. The Devalia enclosure is a fenced area where a sighting is close to certain, which is why many families do both.",
      fact_tag: "verified",
    },
    {
      question: "How many days do I need at Gir?",
      answer:
        "One night is enough for a single morning safari. Two nights lets you take a second drive if the first is quiet, and add Devalia without rushing.",
      fact_tag: "verified",
    },
    {
      question: "Can Gir be added to a Somnath–Dwarka trip?",
      answer:
        "Easily. Somnath is the closest of the two, and a night at Sasan slots in between the temples and the drive back. It usually adds one to two days to the circuit.",
      fact_tag: "verified",
    },
  ],
};

/** Short, factual card blurbs. No prices, no timings. */
const SPOKE_BLURBS = {
  "gir-safari-booking": "How permits are released, what the process looks like, and when to book.",
  "gir-safari-timings-price": "Safari slots and what a permit covers. Rates confirmed with the forest department.",
  "best-time-to-visit-gir": "Month by month, including the monsoon closure.",
  "devalia-safari-park": "The fenced interpretation zone, and why it is the surer sighting.",
  "how-to-reach-gir": "Railheads, airports and the drive from Somnath.",
};

const PLACE_BLURBS = {
  "kankai-mata-temple": "A shrine deep inside the sanctuary, reached on a forest road.",
  tulsishyam: "Hot springs and a Krishna temple on the sanctuary's edge.",
  "kamleshwar-dam": "The reservoir inside Gir, known for its marsh crocodiles.",
};

const withIds = (arr) => arr.map((it) => ({ id: crypto.randomUUID(), ...it }));

/** Only fill a field that is currently empty — never clobber an editor. */
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
  // 1. Pillar content.
  const gir = await Destination.findOne({ slug: "gir" }).lean();
  if (!gir) throw new Error("destinations/gir missing — run scripts/import-url-map.mjs first");

  const set = fillMissing(gir, {
    ...GIR,
    top_places: withIds(GIR.top_places),
    key_distances: withIds(GIR.key_distances),
    faq: withIds(GIR.faq),
  });

  if (Object.keys(set).length) {
    console.log(`  destinations/gir  <- ${Object.keys(set).join(", ")}`);
    if (!DRY) await Destination.updateOne({ _id: gir._id }, { $set: set });
  } else {
    console.log("  destinations/gir  already populated");
  }

  // 2. Card blurbs on the spokes and places.
  for (const [slug, blurb] of Object.entries(SPOKE_BLURBS)) {
    const doc = await TempleInfo.findOne({ slug, destination: "gir" }).lean();
    if (!doc) continue;
    const patch = fillMissing(doc, { meta_description: blurb });
    if (!Object.keys(patch).length) continue;
    console.log(`  templeinfos/${slug}  <- meta_description`);
    if (!DRY) await TempleInfo.updateOne({ _id: doc._id }, { $set: patch });
  }

  for (const [slug, blurb] of Object.entries(PLACE_BLURBS)) {
    const doc = await Place.findOne({ slug, parent_destination: "gir" }).lean();
    if (!doc) continue;
    const patch = fillMissing(doc, { meta_description: blurb });
    if (!Object.keys(patch).length) continue;
    console.log(`  places/${slug}  <- meta_description`);
    if (!DRY) await Place.updateOne({ _id: doc._id }, { $set: patch });
  }

  // 3. Titles the importer copied with unresolved {placeholders}.
  console.log("\n  unresolved-placeholder titles:");
  for (const [Model, slug, title] of TITLE_FIXES) {
    const doc = await Model.findOne({ slug }).lean();
    if (!doc) continue;
    if (!/[{]/.test(doc.h1 || "") && !/[{]/.test(doc.title_tag || "")) {
      console.log(`    ${slug.padEnd(34)} already clean`);
      continue;
    }
    console.log(`    ${slug.padEnd(34)} -> ${title}`);
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
