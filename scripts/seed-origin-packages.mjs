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
import { canonFor } from "./lib/canon-inclusions.mjs";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "data");

const SLUGS = [
  "from-ahmedabad",
  "from-rajkot",
  "from-mumbai",
  "from-jamnagar",
  "from-vadodara",
  "from-pune",
  "from-delhi",
  "from-surat",
  "from-bangalore",
  "from-hyderabad",
];

/** Days / nights each origin page actually recommends, per its own copy. */
const PLAN = {
  "from-ahmedabad": { days: 4, nights: 3, city: "Ahmedabad" },
  "from-rajkot": { days: 3, nights: 2, city: "Rajkot" },
  "from-mumbai": { days: 4, nights: 3, city: "Mumbai" },
  "from-jamnagar": { days: 4, nights: 3, city: "Jamnagar" },
  "from-vadodara": { days: 4, nights: 3, city: "Vadodara" },
  "from-pune": { days: 4, nights: 3, city: "Pune" },
  "from-delhi": { days: 4, nights: 3, city: "Delhi" },
  "from-surat": { days: 4, nights: 3, city: "Surat" },
  "from-bangalore": { days: 4, nights: 3, city: "Bangalore" },
  "from-hyderabad": { days: 4, nights: 3, city: "Hyderabad" },
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
  // Flight-inclusive origin pages (Bangalore, Hyderabad) price the ground and
  // the airfare separately, so their matrix carries two extra columns.
  ground_four_day_pp: "Ground, 4 days (pp)",
  all_in_four_day_pp: "Typical all-in, 4 days (pp)",
  hotels: "Hotels",
};

/** The column holding the headline total, whichever shape the page uses. */
const totalOf = (r) =>
  rupeesToNum(
    r[Object.keys(r).find((k) => k.includes("recommended")) ?? ""] ??
      r.ground_four_day_pp ??
      r.three_nights ??
      r.two_nights ??
      "",
  );

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
  return table.map((r) => ({
    id: randomUUID(),
    tier: String(r.tier || ""),
    perNight: rupeesToNum(r.per_night_pp),
    total: totalOf(r),
    hotel: String(r.hotels || ""),
  }));
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

/**
 * The circuit each origin actually runs, read off its own itinerary day titles.
 *
 * `via` are the waypoints between the origin and Somnath, in travel order, and
 * become routes.segments. `stay` is days-at-place for durationbreakdown and sums
 * to PLAN.days. Neither is derivable from the JSON — the blueprints carry prose
 * titles, not structured stops — so they are written out per origin and checked
 * against the titles rather than guessed at run time.
 */
const CIRCUIT = {
  // Road origins: out to Dwarka, down the coast to Somnath, back home.
  "from-ahmedabad": { via: ["Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Ahmedabad", 1]] },
  "from-jamnagar": { via: ["Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Jamnagar", 1]] },
  "from-vadodara": { via: ["Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Vadodara", 1]] },
  "from-surat": { via: ["Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Surat", 1]] },
  "from-rajkot": { via: ["Dwarka", "Porbandar"], stay: [["Dwarka", 1], ["Somnath", 1], ["Rajkot", 1]] },
  // Rail origin: an overnight train in, the same circuit, the long leg home.
  "from-mumbai": { via: ["Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Mumbai", 1]] },
  // Air origins: fly to Rajkot Hirasar, pick the circuit up there.
  "from-delhi": { via: ["Rajkot", "Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Rajkot", 1]] },
  "from-pune": { via: ["Rajkot", "Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Rajkot", 1]] },
  "from-hyderabad": { via: ["Rajkot", "Dwarka", "Porbandar"], stay: [["Dwarka", 2], ["Somnath", 1], ["Rajkot", 1]] },
  // Bangalore runs the circuit in reverse: Somnath first, Dwarka on the last day.
  "from-bangalore": { via: ["Rajkot", "Somnath", "Porbandar"], stay: [["Somnath", 1], ["Dwarka", 2], ["Rajkot", 1]] },
};

/** routes: origin -> waypoints -> Somnath. Powers "Starts from" and the route strip. */
function buildRoutes(slug, city) {
  const circuit = CIRCUIT[slug];
  if (!circuit) return null;
  // Bangalore ends at Dwarka, every other origin ends at Somnath.
  const destination = slug === "from-bangalore" ? "Dwarka" : "Somnath";
  const legs = [city, ...circuit.via, destination];
  const segments = [];
  for (let i = 0; i < legs.length - 1; i++) {
    segments.push({ id: randomUUID(), from: legs[i], to: legs[i + 1] });
  }
  return { source: city, destination, segments };
}

/** durationbreakdown: days at each place on the circuit. */
function buildBreakdown(slug) {
  const circuit = CIRCUIT[slug];
  if (!circuit) return [];
  return circuit.stay.map(([place, days]) => ({ id: randomUUID(), days, place }));
}

function buildDoc(slug) {
  const j = load(`origin-${slug}.json`);
  const c = j.copy;
  const plan = PLAN[slug];
  const duration = `${plan.days} Days ${plan.nights} Nights`;
  // Flight-inclusive titles carry no "Rs." figure, so fall back to the matrix.
  const price = priceFromTitle(j.head.title) || totalOf(c.price_sheet?.table?.[0] ?? {});

  const ps = c.price_sheet || {};
  // Every price_sheet prose field except the table, in the page's own order.
  // `exclusions` is dropped: the canonical list renders as its own chips, and
  // keeping the page's older prose beside it would contradict it.
  const noteKeys = (ps._order || []).filter((k) => k !== "intro" && k !== "table" && k !== "exclusions");
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

    // The three admin sections that had no source until now. availableSrc is the
    // origin itself, lowercased to match the CMS city picker's own casing.
    availableSrc: [plan.city.toLowerCase()],
    routes: buildRoutes(slug, plan.city),
    durationbreakdown: buildBreakdown(slug),

    highlights: (j.aeo_geo?.quotable_first_party_claims || []).map((d) => ({ id: randomUUID(), description: d })),
    itinerary: buildItinerary(c.itinerary),
    // Canonical client-supplied lists. Flight-inclusive origins get the variant
    // that keeps the airfare on the included side.
    inclusions: canonFor(slug, plan.city).inclusions.map((d) => ({ id: randomUUID(), description: d })),
    exclusions: canonFor(slug, plan.city).exclusions.map((d) => ({ id: randomUUID(), description: d })),
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
      const stops = [d.routes.source, ...d.routes.segments.map((s) => s.to)].join(" > ");
      console.log(
        `${d.slug}: src=${JSON.stringify(d.availableSrc)} | route=${stops} | stay=${d.durationbreakdown
          .map((b) => `${b.place} ${b.days}d`)
          .join(", ")} (${d.durationbreakdown.reduce((n, b) => n + b.days, 0)}d vs ${d.days}d plan)`,
      );
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
