/**
 * Seed / update the five origin SPOKE packages under
 * /somnath-dwarka-tour-package/from-{city}/ from the client-supplied JSON
 * blueprints (scripts/data/origin-from-*.json, 15 July 2026 canon).
 *
 *   node --env-file=.env.local scripts/seed-origin-packages.mjs [--dry]
 *
 * Unlike the duration spokes these JSONs carry the full `copy` block inline, so
 * everything on the page comes straight from the file: the quick answer, the
 * argument sections, the hour by hour itinerary, the price matrix, why-choose,
 * the honest-fit list, the FAQ and the final CTA. Nothing is invented here.
 *
 * Re-running is safe: records are upserted by slug.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "data");

const SLUGS = ["from-ahmedabad", "from-rajkot", "from-mumbai", "from-jamnagar", "from-vadodara"];

/** Days / nights each origin page actually recommends, per its own copy. */
const PLAN = {
  "from-ahmedabad": { days: 4, nights: 3, city: "Ahmedabad" },
  "from-rajkot": { days: 3, nights: 2, city: "Rajkot" },
  "from-mumbai": { days: 4, nights: 3, city: "Mumbai" },
  "from-jamnagar": { days: 4, nights: 3, city: "Jamnagar" },
  "from-vadodara": { days: 4, nights: 3, city: "Vadodara" },
};

const HERO = { image: "/images/home/HomeHero.webp", alt: "Somnath Dwarka pilgrimage circuit" };
const CHILD_IMAGES = [
  { image: "/images/home/DwarikaLongImage.webp", alt: "Dwarkadhish Temple in Dwarka" },
  { image: "/images/home/SomnathLongImage.webp", alt: "Somnath Temple on the Gujarat coast" },
  { image: "/images/CTA.webp", alt: "Somnath Dwarka temple tour" },
];

const load = (name) => JSON.parse(readFileSync(path.join(dataDir, name), "utf8"));

/** "Rs.15,000 pp" in the title is the page's own headline price. */
const priceFromTitle = (title) => {
  const m = /Rs\.?\s*([\d,]+)/i.exec(title || "");
  return m ? Number(m[1].replace(/,/g, "")) : 0;
};

const rupeesToNum = (s) => {
  const m = /([\d,]+)/.exec(String(s || ""));
  return m ? Number(m[1].replace(/,/g, "")) : 0;
};

/** Turn a price_sheet.table key into a human column header. */
const COL_LABEL = {
  tier: "Tier",
  per_night_pp: "Per person, per night",
  one_night: "1 night",
  two_nights: "2 nights",
  two_nights_recommended: "2 nights (recommended)",
  three_nights: "3 nights",
  three_nights_recommended: "3 nights (recommended)",
  four_nights: "4 nights",
  hotels: "Hotels",
};

/** Build a generic matrix table from the price_sheet rows, preserving column order. */
function buildPriceMatrix(table) {
  if (!Array.isArray(table) || !table.length) return null;
  const keys = Object.keys(table[0]);
  return {
    headers: keys.map((k) => COL_LABEL[k] || k.replace(/_/g, " ")),
    rows: table.map((r) => keys.map((k) => String(r[k] ?? ""))),
  };
}

/** priceTiers powers price_from and the admin editor; totals use the recommended column. */
function buildPriceTiers(table) {
  if (!Array.isArray(table)) return [];
  return table.map((r) => {
    const recKey = Object.keys(r).find((k) => k.includes("recommended"));
    const total = recKey ? rupeesToNum(r[recKey]) : rupeesToNum(r.three_nights ?? r.two_nights ?? "");
    return {
      id: randomUUID(),
      tier: String(r.tier || ""),
      perNight: rupeesToNum(r.per_night_pp),
      total,
      hotel: String(r.hotels || ""),
    };
  });
}

/** Itinerary days: stops become hour steps; shared-middle blocks become prose days. */
function buildItinerary(itin) {
  const days = Array.isArray(itin?.days) ? itin.days : [];
  return days.map((d, i) => {
    const steps = (Array.isArray(d.stops) ? d.stops : []).map((s) => ({
      time: String(s.time || ""),
      activity: String(s.text || ""),
    }));
    const description = [d.intro, d.summary, d.handoff, d.note].filter(Boolean).join(" ");
    return {
      id: randomUUID(),
      day: i + 1,
      title: String(d.title || ""),
      description,
      steps,
    };
  });
}

function buildDoc(slug) {
  const j = load(`origin-${slug}.json`);
  const c = j.copy;
  const plan = PLAN[slug];
  const duration = `${plan.days} Days ${plan.nights} Nights`;
  const price = priceFromTitle(j.head.title) || rupeesToNum(c.price_sheet?.table?.[0]?.three_nights_recommended);

  const ps = c.price_sheet || {};
  // Every price_sheet prose field except the table, in the page's own order.
  const noteKeys = (ps._order || []).filter((k) => k !== "intro" && k !== "table");
  const priceNotes = [ps.intro, ...noteKeys.map((k) => ps[k])].filter(Boolean).map(String);

  return {
    slug,
    status: "published",
    noindex: false,

    title: `Somnath Dwarka From ${plan.city}`,
    // Drop the ": Itinerary, Price and Booking" tail from the visible heading.
    h1: String(j.head.h1 || "").replace(/:\s*Itinerary,\s*Price and Booking\s*$/i, "").trim(),
    title_tag: j.head.title,
    meta_description: j.head.meta_description,
    metaTitle: j.head.title,
    metaDescription: j.head.meta_description,
    schemaTitle: j.head.title,
    schemaDescription: j.head.meta_description,
    overview: c.quick_answer,
    answer_first: c.quick_answer,

    duration,
    days: plan.days,
    nights: plan.nights,
    price,
    price_from: price,
    destination: `${plan.city} to Dwarka, Somnath`,
    category: "Pilgrimage",

    highlights: (j.aeo_geo?.quotable_first_party_claims || []).map((d) => ({ id: randomUUID(), description: d })),
    itinerary: buildItinerary(c.itinerary),
    inclusions: [
      { id: randomUUID(), description: "Hotel at your chosen tier" },
      { id: randomUUID(), description: "Breakfast" },
      { id: randomUUID(), description: "Vehicle with driver for the full itinerary" },
    ],
    exclusions: String(ps.exclusions || "")
      .split(/[.,]\s+/)
      .map((s) => s.trim().replace(/\.$/, ""))
      .filter(Boolean)
      .map((d) => ({ id: randomUUID(), description: d[0].toUpperCase() + d.slice(1) })),
    faqs: (c.faq || []).map((f) => ({ id: randomUUID(), question: f.q, answer: f.a })),
    priceTiers: buildPriceTiers(ps.table),

    // Long-form sections read by resolvePackage -> SpokeContent.
    sections: (c.sections || []).map((s) => ({ h2: s.h2, body: s.body })),
    priceMatrix: buildPriceMatrix(ps.table),
    decision: null,
    whyChoose: c.why_choose?.length ? { title: "Why choose Experience My India", points: c.why_choose } : null,
    notForYou: c.not_for_you_if?.length
      ? { title: c.not_for_you_if_heading || "This trip is not for you if", items: c.not_for_you_if }
      : null,
    priceNotes,
    finalCta: c.final_cta?.summary || "",

    heroImage: HERO,
    childImages: CHILD_IMAGES.map((x) => ({ ...x, id: randomUUID() })),

    isTransferIncluded: true,
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
  };
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (use --env-file=.env.local)");

  const docs = SLUGS.map(buildDoc);

  if (DRY) {
    for (const d of docs) {
      console.log(
        `${d.slug}: ₹${d.price} ${d.duration} | days=${d.itinerary.length}(steps ${d.itinerary.map((x) => x.steps.length).join(",")}) sections=${d.sections.length} matrix=${d.priceMatrix?.rows.length || 0}x${d.priceMatrix?.headers.length || 0} why=${d.whyChoose?.points.length || 0} notfor=${d.notForYou?.items.length || 0} faq=${d.faqs.length} excl=${d.exclusions.length} notes=${d.priceNotes.length} qa=${d.overview.length}ch`,
      );
    }
    return;
  }

  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("packages");
  const now = new Date();
  for (const d of docs) {
    const res = await col.updateOne(
      { slug: d.slug },
      { $set: { ...d, updatedAt: now }, $setOnInsert: { createdAt: now } },
      { upsert: true },
    );
    console.log(res.upsertedCount ? `Inserted ${d.slug}` : `Updated ${d.slug} (matched ${res.matchedCount})`);
  }
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("SEED FAILED:", e.message);
  process.exit(1);
});
