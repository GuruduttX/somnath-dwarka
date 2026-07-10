/**
 * Import the URL map's MVP + Wave A + Wave B pages into the CMS as scaffolds.
 *
 *   node --env-file=.env.local scripts/import-url-map.mjs [--dry]
 *
 * Every record is created with `status: published` so the page resolves (the
 * home page and hub links must not 404) and `noindex: true` so it stays out of
 * the sitemap and the index until an editor fills the verified fields.
 *
 * Nothing here invents a fact. H1s, SERP targets and answer templates are
 * copied verbatim from the URL map; prices, timings and credentials are left
 * empty behind their VERIFY / OPS-CONFIRM gates.
 *
 * Re-running is safe: records are upserted by slug and existing `answer_first`,
 * `body`, `faq` and verified fields are never overwritten.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mongoose from "mongoose";

const DRY = process.argv.includes("--dry");
const here = path.dirname(fileURLToPath(import.meta.url));
const MAP = JSON.parse(readFileSync(path.join(here, "data", "url-map-v5.json"), "utf8"));

const WAVES = new Set(["MVP", "A", "B"]);

/* ----------------------------- helpers ----------------------------- */

const segs = (url) => url.split("/").filter(Boolean);

const humanize = (slug) =>
  slug
    .split("-")
    .map((w) => (w.length <= 3 && w !== "gir" ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

/**
 * Root segments owned by hand-built static routes. Anything under them already
 * has a page, so the importer must not shadow it with a CMS record. Mirrors
 * RESERVED_ROOT_SLUGS in src/lib/content.ts.
 *
 * /plan/itinerary/ is the one exception: the segment is reserved but those two
 * nested pages are MVP-wave gaps with no route until now.
 */
const RESERVED_FIRST_SEGMENTS = new Set([
  "about", "author", "booking-policy", "cancellation-refund", "compare",
  "contact", "dwarka", "festivals", "guides", "hotels", "plan", "privacy",
  "reviews", "sitemap", "somnath", "somnath-dwarka-taxi-service",
  "somnath-dwarka-tour-package", "terms", "thank-you", "tools",
]);

function isReserved(url) {
  const p = segs(url);
  if (p.length === 0) return true; // "/"
  if (p[0] === "plan" && p[1] === "itinerary") return false;
  return RESERVED_FIRST_SEGMENTS.has(p[0]);
}

/** Parent hubs a Wave-B spoke needs but the map schedules for Wave C. */
const PULLED_FORWARD = ["/kutch-rann/", "/statue-of-unity/"];

/** /data/ has spokes in the map but no hub row of its own — a gap in the spec. */
const SYNTHESISED = [
  {
    url: "/data/",
    wave: "B",
    silo: "data",
    role: "HUB",
    parent_hub: "/",
    h1_pattern: "Our Data & Research on Gujarat Pilgrimage Travel",
    serp_feature_target: "",
    aeo_answer_snippet_template: "",
    schema_set: "CollectionPage+Breadcrumb",
    conversion_action: "nurture_optin",
  },
];

const HUB_KIND = (slug) => {
  if (slug === "temples") return "temples";
  if (slug === "data") return "data";
  if (slug === "gujarat-tour-packages") return "umbrella";
  if (slug === "somnath-dwarka-gir-tour-package") return "triangle";
  if (slug === "somnath-dwarka-tour-package") return "circuit";
  if (slug.endsWith("-tour-package")) return "destination";
  return "vertical";
};

/** Destination hub -> the informational pillar it pairs with (ACROSS link). */
const HUB_PILLAR = {
  "gir-tour-package": "/gir/",
  "kutch-tour-package": "/kutch-rann/",
  "statue-of-unity-tour-package": "/statue-of-unity/",
  "somnath-dwarka-gir-tour-package": "/gir/",
};

const PILLAR_NAME = {
  gir: "Gir",
  "junagadh-girnar": "Junagadh & Girnar",
  "kutch-rann": "Kutch & the Rann",
  "statue-of-unity": "Statue of Unity",
};

const TRUST_KIND = (slug) =>
  ["team", "methodology", "editorial-policy", "referral"].includes(slug) ? slug : "other";

/* --------------------------- classification --------------------------- */

function classify(row) {
  const p = segs(row.url);
  const silo = row.silo || "";

  if (p[0] === "plan" && p[1] === "itinerary") return { type: "itinerary", slug: p[2] };

  if (p.length === 1) {
    if (silo === "trust") return { type: "trust", slug: p[0] };
    if (silo.startsWith("pillar")) return { type: "pillar", slug: p[0] };
    return { type: "hub", slug: p[0] };
  }

  if (p.length === 2) {
    if (p[0] === "temples") return { type: "temple", slug: p[1] };
    if (p[0] === "data") return { type: "data-page", slug: p[1] };
    if (silo.startsWith("pillar")) return { type: "pillar-spoke", parent: p[0], slug: p[1] };
    return { type: "hub-spoke", parent: p[0], slug: p[1] };
  }

  if (p.length === 3 && p[1] === "places") return { type: "place", parent: p[0], slug: p[2] };

  return null;
}

/* ------------------------------ schemas ------------------------------ */
/* Mirror src/models/*.ts loosely; strict:false lets the real models own the
   canonical shape while this script only writes the fields it knows about. */

const shared = {
  slug: { type: String, required: true, unique: true, index: true },
  title_tag: String, meta_description: String, h1: String, answer_first: String,
  body: String, breadcrumb_parent: String, noindex: Boolean, status: String,
  faq: [{ question: String, answer: String, fact_tag: String }],
  related_links: [{ target: String, anchor: String, type: String }],
};

const model = (name, extra) =>
  mongoose.models[name] ||
  mongoose.model(name, new mongoose.Schema({ ...shared, ...extra }, { timestamps: true, strict: false }));

const Hub = model("Hub", {
  title: String, hub_kind: String, head_term: String, pillar_path: String,
  sibling_hubs: [String], variants: [{ label: String, slug: String, blurb: String }],
  answer_template: String, serp_feature_target: String,
});
const HubSpoke = model("HubSpoke", { title: String, hub: String, spoke_kind: String, answer_template: String });
const Temple = model("Temple", { title: String, temple: String, timings_verified: Boolean });
const Trust = model("Trust", { title: String, page_kind: String });
const DataPage = model("DataPage", { title: String, dataset_name: String });
const Itinerary = model("Itinerary", { title: String, days: Number });
const Destination = model("Destination", { title: String, destination: String });
const TempleInfo = model("TempleInfo", { title: String, destination: String, topic: String });
const Place = model("Place", { title: String, place: String, parent_destination: String });

const MODELS = {
  hub: Hub, "hub-spoke": HubSpoke, temple: Temple, trust: Trust,
  "data-page": DataPage, itinerary: Itinerary, pillar: Destination,
  "pillar-spoke": TempleInfo, place: Place,
};

/* ------------------------------- build ------------------------------- */

/**
 * Written only when the record is first created. Re-running the import must not
 * clobber an editor's prose — and must never flip a verified, indexed page back
 * to noindex.
 */
function insertOnlyFields(kind, row, slug) {
  const base = {
    slug,
    title: humanize(slug),
    h1: row.h1_pattern || humanize(slug),
    title_tag: row.h1_pattern || humanize(slug),
    // Left empty on purpose: the SOP forbids publishing an unverified claim.
    answer_first: "",
    meta_description: "",
    noindex: true,
    status: "published",
  };

  switch (kind.type) {
    case "hub":
      return { ...base, hub_kind: HUB_KIND(slug) };
    case "hub-spoke":
      return { ...base, hub: kind.parent, spoke_kind: (row.silo || "").startsWith("money") ? "money" : "info" };
    case "temple":
      return { ...base, temple: humanize(slug), timings_verified: false };
    case "trust":
      return { ...base, page_kind: TRUST_KIND(slug) };
    case "data-page":
      return { ...base, dataset_name: humanize(slug) };
    case "itinerary":
      return { ...base, days: Number((slug.match(/^(\d+)/) || [])[1] || 0) };
    case "pillar":
      return { ...base, destination: PILLAR_NAME[slug] || humanize(slug) };
    case "pillar-spoke":
      return { ...base, destination: kind.parent, topic: slug };
    case "place":
      return { ...base, place: humanize(slug), parent_destination: kind.parent };
    default:
      return base;
  }
}

/**
 * Refreshed on every run: these are derived from the URL map, not authored by a
 * human, so the map stays the source of truth for the link graph.
 */
function specDerivedFields(kind, row, slug, ctx) {
  const base = { breadcrumb_parent: row.parent_hub || "/" };
  if (kind.type !== "hub") {
    return kind.type === "hub-spoke"
      ? { ...base, answer_template: row.aeo_answer_snippet_template || "" }
      : base;
  }
  return {
    ...base,
    head_term: row.target_intent || "",
    pillar_path: HUB_PILLAR[slug] || "",
    sibling_hubs: ctx.siblingsOf(slug),
    variants: ctx.variantsOf(slug),
    answer_template: row.aeo_answer_snippet_template || "",
    serp_feature_target: row.serp_feature_target || "",
  };
}

async function main() {
  const byUrl = new Map(MAP.rows.map((r) => [r.url, r]));

  const inScope = MAP.rows.filter(
    (r) =>
      WAVES.has(r.wave) &&
      !r.url.startsWith("/hi/") &&
      !r.url.startsWith("/gu/") &&
      !isReserved(r.url)
  );

  for (const url of PULLED_FORWARD) if (byUrl.has(url)) inScope.push(byUrl.get(url));
  inScope.push(...SYNTHESISED);

  const planned = [];
  for (const row of inScope) {
    const kind = classify(row);
    if (!kind || !kind.slug) continue;
    planned.push({ row, kind });
  }

  const hubSlugs = planned.filter((p) => p.kind.type === "hub").map((p) => p.kind.slug);

  const ctx = {
    // DOWN links: only variants that this import actually creates, so a hub
    // never links to a page that does not exist yet.
    variantsOf: (hub) =>
      planned
        .filter((p) => p.kind.type === "hub-spoke" && p.kind.parent === hub)
        .map((p) => ({ label: humanize(p.kind.slug), slug: p.kind.slug, blurb: "" })),
    // ACROSS links: two sibling hubs, per the linking contract.
    siblingsOf: (hub) =>
      hubSlugs.filter((s) => s !== hub && HUB_KIND(s) === HUB_KIND(hub)).slice(0, 2).map((s) => `/${s}/`),
  };

  const counts = {};
  let created = 0;
  let refreshed = 0;

  for (const { row, kind } of planned) {
    const Model = MODELS[kind.type];
    if (!Model) continue;
    counts[kind.type] = (counts[kind.type] || 0) + 1;

    if (DRY) {
      console.log(`  ${kind.type.padEnd(13)} ${row.url}`);
      continue;
    }

    const res = await Model.updateOne(
      { slug: kind.slug },
      {
        $setOnInsert: insertOnlyFields(kind, row, kind.slug),
        $set: specDerivedFields(kind, row, kind.slug, ctx),
      },
      { upsert: true }
    );
    if (res.upsertedCount) created++;
    else refreshed++;
  }

  console.log("\nplanned by type:");
  for (const [k, v] of Object.entries(counts).sort()) console.log(`  ${k.padEnd(14)} ${v}`);
  console.log(`  ${"TOTAL".padEnd(14)} ${planned.length}`);
  if (!DRY) console.log(`\ncreated ${created}, refreshed ${refreshed} (all noindex until verified)`);
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
