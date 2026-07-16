/**
 * Seed / update the five duration SPOKE packages under
 * /somnath-dwarka-tour-package/{slug}/ from the client-supplied DOCX content
 * (scripts/data/spoke-content-*.json, extracted from the .docx) plus the JSON
 * blueprints (scripts/data/spoke-*.json) for the price tiers and highlights.
 *
 *   node --env-file=.env.local scripts/seed-spoke-packages.mjs [--dry]
 *
 * These are real TourPackage records. Long-form sections (quick answer, the
 * decision block, hour-by-hour days, why-choose, honest-fit, price notes, final
 * CTA and the full FAQ) come straight from the docx. Re-running is safe:
 * records are upserted by slug.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, "data");

const SLUGS = ["2-days-1-night", "3-days-2-nights", "4-days-3-nights", "5-days-4-nights", "6-days-5-nights"];

const HERO = { image: "/images/home/HomeHero.webp", alt: "Somnath Dwarka pilgrimage circuit" };
const CHILD_IMAGES = [
  { image: "/images/home/DwarikaLongImage.webp", alt: "Dwarkadhish Temple in Dwarka" },
  { image: "/images/home/SomnathLongImage.webp", alt: "Somnath Temple on the Gujarat coast" },
  { image: "/images/CTA.webp", alt: "Somnath Dwarka temple tour" },
];

const tierLabel = { "3_star": "3 star", "4_star": "4 star", "5_star": "5 star" };

const load = (name) => JSON.parse(readFileSync(path.join(dataDir, name), "utf8"));

const wordsFromSlug = (slug) =>
  slug.split("-").map((w) => (/^\d+$/.test(w) ? w : w[0].toUpperCase() + w.slice(1))).join(" ");

/** Strip a leading "Day N:" / "Days N to M:" label from a day title. */
const cleanDayTitle = (t) => {
  const s = t.replace(/^days?\s*[\d\s]+(?:to\s*\d+)?\s*:\s*/i, "").trim();
  return s ? s[0].toUpperCase() + s.slice(1) : t;
};

/** Real (non-wrapper) day entries with an hour table, in order. */
function realDays(content) {
  return content.days.filter((d) => !/^day by day/i.test(d.title) && d.steps.length > 0);
}

/** Build the final day list, expanding "Days 1 to 3" into the 4-day plan's first three. */
function buildItinerary(content, fourDayFirst3) {
  const out = [];
  for (const d of content.days) {
    if (/^day by day/i.test(d.title)) continue; // wrapper heading
    if (d.steps.length === 0 && /days?\s*1\s*to\s*3/i.test(d.title)) {
      for (const fd of fourDayFirst3) out.push({ title: fd.title, steps: fd.steps, note: "" });
      continue;
    }
    if (d.steps.length === 0 && !d.note) continue; // empty stub
    out.push({ title: d.title, steps: d.steps, note: d.note || "" });
  }
  return out.map((d, i) => ({
    id: randomUUID(),
    day: i + 1,
    title: cleanDayTitle(d.title),
    description: d.note,
    steps: d.steps.map((s) => ({ time: s.time, activity: s.activity })),
  }));
}

function buildExtras(content) {
  const dec = content.decision;
  const decision = dec
    ? {
        title: dec.title || "",
        intro: (dec.intro || [])[0] || "",
        note: (dec.intro || []).slice(1).filter(Boolean).join(" "),
        headers: (dec.table && dec.table[0]) || [],
        rows: (dec.table || []).slice(1),
      }
    : null;

  const whyChoose = content.why_choose
    ? { title: content.why_choose.title || "Why choose Experience My India", points: content.why_choose.points || [] }
    : null;

  const notForYou = content.not_for_you
    ? { title: content.not_for_you.title || "This plan is not for you if", items: content.not_for_you.items || [] }
    : null;

  // Price notes: the vehicle-by-group + trust/fraud paragraphs. Drop the
  // "Not included" line since exclusions render as their own chips.
  const priceNotes = (content.price?.notes || []).filter((n) => !/^not included/i.test(n));

  return { decision, whyChoose, notForYou, priceNotes, finalCta: content.final_cta || "" };
}

function buildDoc(slug, fourDayContent) {
  const bp = load(`spoke-${slug}.json`); // blueprint JSON
  const content = load(`spoke-content-${slug}.json`); // docx content
  const duration = wordsFromSlug(slug);
  const nights = bp.pricing.nights;
  const days = nights + 1;

  const priceTiers = Object.entries(bp.pricing.tiers).map(([key, t]) => ({
    id: randomUUID(),
    tier: tierLabel[key] || key,
    perNight: t.per_night,
    total: t.total_pp,
    hotel: t.hotel,
  }));
  const lowest = bp.pricing.tiers["3_star"].total_pp;

  const itinerary = buildItinerary(content, realDays(fourDayContent).slice(0, 3));

  return {
    slug,
    status: "published",
    noindex: false,

    title: `Somnath Dwarka ${duration}`,
    // Drop the ": Itinerary, Price and Booking" tail from the visible heading.
    h1: (content.head?.h1 || bp.head.h1 || "").replace(/:\s*Itinerary,\s*Price and Booking\s*$/i, "").trim(),
    title_tag: content.head?.title || bp.head.title,
    meta_description: content.head?.meta || bp.head.meta_description,
    metaTitle: content.head?.title || bp.head.title,
    metaDescription: content.head?.meta || bp.head.meta_description,
    schemaTitle: content.head?.title || bp.head.title,
    schemaDescription: content.head?.meta || bp.head.meta_description,
    overview: content.quick_answer || bp.aeo_geo.answer_snippet,
    answer_first: content.quick_answer || bp.aeo_geo.answer_snippet,

    duration,
    days,
    nights,
    price: lowest,
    price_from: lowest,
    destination: "Dwarka, Somnath",
    category: "Pilgrimage",

    highlights: (bp.aeo_geo.quotable_first_party_claims || []).map((c) => ({ id: randomUUID(), description: c })),
    itinerary,
    inclusions: (bp.pricing.included || []).map((d) => ({ id: randomUUID(), description: d })),
    exclusions: (bp.pricing.excluded || []).map((d) => ({ id: randomUUID(), description: d })),
    faqs: (content.faq || []).map((f) => ({ id: randomUUID(), question: f.question, answer: f.answer })),
    priceTiers,

    // Long-form docx sections (read by resolvePackage → SpokeContent).
    ...buildExtras(content),

    heroImage: HERO,
    childImages: CHILD_IMAGES.map((c) => ({ ...c, id: randomUUID() })),

    isTransferIncluded: true,
    isStayIncluded: true,
    isBreakfastIncluded: true,
    isSightseeingIncluded: true,
  };
}

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (use --env-file=.env.local)");

  const fourDayContent = load("spoke-content-4-days-3-nights.json");
  const docs = SLUGS.map((slug) => buildDoc(slug, fourDayContent));

  if (DRY) {
    for (const d of docs) {
      console.log(
        `${d.slug}: days=${d.itinerary.length}(steps ${d.itinerary.map((x) => x.steps.length).join(",")}) faq=${d.faqs.length} decision=${d.decision ? "Y" : "N"} why=${d.whyChoose?.points.length || 0} notfor=${d.notForYou?.items.length || 0} priceNotes=${d.priceNotes.length} finalCta=${d.finalCta ? "Y" : "N"} qa=${d.overview.length}ch`,
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
