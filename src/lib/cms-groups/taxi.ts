import type { CmsGroup, PageMatch } from "./types";
import { asAnyDataset, type DatasetDef } from "@/src/lib/datasets/types";
import type { PageDef } from "@/src/lib/pages/types";
import { datasetsCollection, mergeDataset, recordItems, type StoredDatasetDoc } from "@/src/lib/datasets/store";
import {
  SEED_AIRPORT_TAXIS,
  SEED_CAB_ROUTES,
  SEED_VEHICLES,
  cabPath,
  type SeedAirportTaxi,
  type SeedCabRoute,
  type SeedVehicle,
} from "@/src/lib/seed/cabs";
import {
  AIRPORT_COPY,
  SPOKE_COPY,
  VEHICLE_COPY,
  type AirportCopy,
  type SpokeCopy,
  type VehicleCopy,
} from "@/src/config/taxiSpokes";
import { RATE_CARD_ROUTES, type RateCardRoute } from "@/src/config/taxiFares";
import { SEED_TOOLS, type SeedTool } from "@/src/lib/seed/destinations";
import { TAXI_HUB_PAGE } from "@/src/app/somnath-dwarka-taxi-service/content";
import { CAB_ROUTE_TEMPLATE_PAGE, VEHICLE_TEMPLATE_PAGE } from "@/src/app/somnath-dwarka-taxi-service/[slug]/content";
import { AIRPORT_INDEX_PAGE, AIRPORT_TEMPLATE_PAGE } from "@/src/app/somnath-dwarka-taxi-service/airport-taxi/content";
import { FARE_RATE_CARD_PAGE } from "@/src/app/somnath-dwarka-taxi-service/fare-rate-card/content";
import { TOOLS_PAGE, TOOL_TEMPLATE_PAGE } from "@/src/app/tools/content";

/*
  CMS coverage for the "taxi" part of the site (the taxi hub, cab route and
  vehicle pages, airport transfers, the fare rate card and the planning
  tools): the code datasets, code-built page copy and URL resolvers this part
  registers with the /mcp/ connector. See src/lib/cms-groups/types.ts.

  A cab route or vehicle page shows the published `taxi` CMS item with that
  slug when there is one; site_cab_routes / site_taxi_vehicles are only the
  fallback facts for a slug with no published taxi item.
*/

const HUB = "/somnath-dwarka-taxi-service/";
const AIRPORT_BASE = `${HUB}airport-taxi/`;
const airportPath = (slug: string) => `${AIRPORT_BASE}${slug}/`;

const NO_INVENTING =
  "Never invent fares, ratings, reviews or trip counts; a fare stays '₹—' (the page then hides the fare table) until the business confirms one.";

export const CAB_ROUTES_DATASET: DatasetDef<SeedCabRoute> = {
  id: "site_cab_routes",
  label: "Cab route facts, fallback (/somnath-dwarka-taxi-service/<route>/)",
  group: "Taxi",
  description:
    "Fallback facts for the cab route pages at /somnath-dwarka-taxi-service/<slug>/ (e.g. somnath-to-dwarka-taxi). IMPORTANT: a published `taxi` CMS item with the same slug " +
    "wins over this item, so edit that `taxi` item first (find_page lists it); this item only renders when no published taxi item exists. Fields: slug, kind (always 'route'), " +
    "title (SEO title when the route has no copy item), h1, origin, destination, distance and duration (road estimates, e.g. '≈ 233 km', '~ 4.5–5 hours'), verified " +
    "(true only once the business confirmed distance and time), answer_first, fares[{vehicle, seats, oneWay, roundTrip}], stops[] (en-route halts), faq[{question, answer}] " +
    "(used only when the route has no copy item). The page's prose is its item in site_taxi_route_copy. " + NO_INVENTING,
  defaults: SEED_CAB_ROUTES,
  key: (r) => r.slug,
  keyFields: ["slug"],
  path: (r) => cabPath(r.slug),
  title: (r) => r.h1 || `${r.origin} to ${r.destination}`,
};

export const TAXI_VEHICLES_DATASET: DatasetDef<SeedVehicle> = {
  id: "site_taxi_vehicles",
  label: "Vehicle facts, fallback (/somnath-dwarka-taxi-service/<vehicle>/)",
  group: "Taxi",
  description:
    "Fallback facts for the vehicle pages /somnath-dwarka-taxi-service/innova-crysta/, /ertiga/, /tempo-traveller/. IMPORTANT: a published `taxi` CMS item (kind vehicle) with " +
    "the same slug wins over this item, so edit that first; this item only renders when no published taxi item exists. Fields: slug, kind (always 'vehicle'), title, h1, " +
    "vehicle_name, seats (number), suitable_for, answer_first, fares[{route, rate}], image {src, alt} (optional photo: https URL or /images/... path), faq[{question, answer}] " +
    "(used only when the vehicle has no copy item). The page's prose is its item in site_taxi_vehicle_copy. " + NO_INVENTING,
  defaults: SEED_VEHICLES,
  key: (v) => v.slug,
  keyFields: ["slug"],
  path: (v) => cabPath(v.slug),
  title: (v) => v.vehicle_name || v.h1,
};

export const AIRPORT_TAXIS_DATASET: DatasetDef<SeedAirportTaxi> = {
  id: "site_airport_taxis",
  label: "Airport transfers (/somnath-dwarka-taxi-service/airport-taxi/<airport>/)",
  group: "Taxi",
  description:
    "The airports served, one item per /somnath-dwarka-taxi-service/airport-taxi/<slug>/ page; also the airport cards and table on the taxi hub and the airport-taxi index. " +
    "Fields: slug (e.g. diu), airport (short city name used in headings, e.g. 'Diu'), airportName (e.g. 'Diu Airport (DIU)'), title (SEO title when the airport has no copy item), " +
    "h1, serves (temple town(s) it transfers to), distance and duration (road estimates), verified (true only once confirmed), answer_first, " +
    "fares[{vehicle, seats, rate}], faq[{question, answer}] (used only when the airport has no copy item). The page's prose is its item in site_taxi_airport_copy. " + NO_INVENTING,
  defaults: SEED_AIRPORT_TAXIS,
  key: (a) => a.slug,
  keyFields: ["slug"],
  path: (a) => airportPath(a.slug),
  title: (a) => a.airportName || a.airport,
};

export type RouteCopyItem = SpokeCopy & { slug: string };
export type VehicleCopyItem = VehicleCopy & { slug: string };
export type AirportCopyItem = AirportCopy & { slug: string };

const COPY_SHAPE =
  "titleTag and metaDescription are the SEO tags; h1, quickAnswer (40-60 word direct answer, the hero text) and crumbLabel (breadcrumb); atAGlance[{label, value}] " +
  "is the fact strip, followed by intro; whyBook {heading, points[]}; notForYou[] is the honest-fit list; faq[{question, answer}] replaces the fallback FAQ and feeds the FAQPage schema; " +
  "keepPlanning {intro, links[{label, href}]}; cta {heading, body} is the closing booking card. intro, keepPlanning.intro and cta.body take [link](/path/) and **bold**. " +
  "The Tripadvisor rating, trip count and GSTIN in whyBook are the business's own facts: never raise or invent them.";

export const ROUTE_COPY_DATASET: DatasetDef<RouteCopyItem> = {
  id: "site_taxi_route_copy",
  label: "Cab route page copy (/somnath-dwarka-taxi-service/<route>/)",
  group: "Taxi",
  description:
    "The prose of each cab route page at /somnath-dwarka-taxi-service/<slug>/, keyed by the route's slug (the facts are its `taxi` CMS item or site_cab_routes item). " +
    "A route with no copy item shows only its fact sections. " + COPY_SHAPE +
    " Route-only fields: driveSection {heading, body} and tripTypes {heading, body} (bodies take markup), vehiclesIntro (markup), faresIncluded[] / faresExcluded[] " +
    "(rows appended to the shared fare scope in the 'taxi-route-template' page item), beforeYouTravel[].",
  defaults: recordItems(SPOKE_COPY, "slug"),
  key: (c) => c.slug,
  keyFields: ["slug"],
  path: (c) => cabPath(c.slug),
  title: (c) => c.h1 || c.slug,
};

export const VEHICLE_COPY_DATASET: DatasetDef<VehicleCopyItem> = {
  id: "site_taxi_vehicle_copy",
  label: "Vehicle page copy (/somnath-dwarka-taxi-service/<vehicle>/)",
  group: "Taxi",
  description:
    "The prose of each vehicle page (/somnath-dwarka-taxi-service/innova-crysta/, /ertiga/, /tempo-traveller/), keyed by the vehicle's slug (the facts are its `taxi` CMS " +
    "item or site_taxi_vehicles item). " + COPY_SHAPE +
    " Vehicle-only fields: features {heading, items[]}, whoItSuits / ratesBooking / popularRoutes {heading, body} (bodies take markup), includedFirst (first row of the " +
    "included list) and excludedExtra (last row of the excluded list), added to the shared scope in the 'taxi-vehicle-template' page item.",
  defaults: recordItems(VEHICLE_COPY, "slug"),
  key: (c) => c.slug,
  keyFields: ["slug"],
  path: (c) => cabPath(c.slug),
  title: (c) => c.h1 || c.slug,
};

export const AIRPORT_COPY_DATASET: DatasetDef<AirportCopyItem> = {
  id: "site_taxi_airport_copy",
  label: "Airport page copy (/somnath-dwarka-taxi-service/airport-taxi/<airport>/)",
  group: "Taxi",
  description:
    "The prose of each airport transfer page at /somnath-dwarka-taxi-service/airport-taxi/<slug>/, keyed by the airport's slug (its facts are the site_airport_taxis item). " +
    "An airport with no copy item shows only its fact sections. " + COPY_SHAPE +
    " Airport-only fields: transfers {heading, body} (body takes markup), beforeYouFly[].",
  defaults: recordItems(AIRPORT_COPY, "slug"),
  key: (c) => c.slug,
  keyFields: ["slug"],
  path: (c) => airportPath(c.slug),
  title: (c) => c.h1 || c.slug,
};

export const RATE_CARD_DATASET: DatasetDef<RateCardRoute> = {
  id: "site_taxi_rate_card",
  label: "Fare rate card routes (/somnath-dwarka-taxi-service/fare-rate-card/)",
  group: "Taxi",
  description:
    "The rows of the 'Fares by route' table on /somnath-dwarka-taxi-service/fare-rate-card/ and the route picker of the fare calculator at /tools/distance-fare-calculator/ " +
    "(the first item is the calculator's default). Fields: slug (the cab route page it links to, /somnath-dwarka-taxi-service/<slug>/), label (e.g. 'Somnath to Dwarka'), " +
    "distance (as shown, e.g. '233 km'), km (number, or 0/empty when only a range is known), fare (the quoted fare, e.g. 'From ₹4,500 (sedan)'; leave empty for " +
    "'Confirmed at booking'). The business has agreed exactly one price, Somnath to Dwarka from ₹4,500 for a sedan: never invent a fare or derive one from a per-km rate.",
  defaults: RATE_CARD_ROUTES,
  key: (r) => r.slug,
  keyFields: ["slug"],
  title: (r) => r.label,
};

const FARE_CARD_TEXT =
  "Estimate exact dedicated AC taxi fares between Ahmedabad, Rajkot, Dwarka, Somnath, and Sasan Gir with itemized toll and driver fee breakdowns.";
const PLANNER_CARD_TEXT =
  "Generate an hour-by-hour day-wise pilgrimage plan tailored to your arrival hub, group size, and preferred pace of darshan.";

export type ToolItem = SeedTool & { card_text: string };

export const TOOLS_DATASET: DatasetDef<ToolItem> = {
  id: "site_tools",
  label: "Planning tools (/tools/<slug>/)",
  group: "Tools",
  description:
    "The planning tool pages at /tools/<slug>/ and their cards on /tools/. Fields: slug, tool_type ('itinerary-planner' or 'fare-calculator': picks the interactive widget, " +
    "only these two exist), title (SEO title), h1, answer_first (direct answer, also the meta description), static_shell_copy (the crawlable 'How it works' text; takes " +
    "[link](/path/) and **bold**), result_cta_target (kept for reference; the widget buttons are set in the 'tool-template' page item), faq[{question, answer}], " +
    "card_text (the description on the /tools/ card). The widget's own words live in the 'tool-template' page item.",
  defaults: SEED_TOOLS.map((t) => ({
    ...t,
    card_text: t.slug.includes("fare") || t.slug.includes("calculator") ? FARE_CARD_TEXT : PLANNER_CARD_TEXT,
  })),
  key: (t) => t.slug,
  keyFields: ["slug"],
  path: (t) => `/tools/${t.slug}/`,
  title: (t) => t.h1 || t.title,
};

/* ---------------------------------- find_page --------------------------------- */

const m = (type: string, id: string, what: string): PageMatch => ({ type, id, what });

/** One match per live item of a dataset that a listing section shows (the hub's airport cards, the rate card rows, ...). */
async function each<T extends Record<string, unknown>>(def: DatasetDef<T>, what: string): Promise<PageMatch[]> {
  let docs: StoredDatasetDoc[] = [];
  try {
    docs = (await (await datasetsCollection()).find({ dataset: def.id }, { projection: { _id: 0 } }).toArray()) as StoredDatasetDoc[];
  } catch {
    // Database unreachable: list the code items.
  }
  return mergeDataset(def, docs).map((e) => m(def.id, e.key, `${what}: ${def.title ? def.title(e.item) : e.key}`));
}

async function taxiResolver(path: string): Promise<PageMatch[]> {
  if (!path.startsWith(HUB)) return [];
  const segs = path.slice(HUB.length).split("/").filter(Boolean);
  // The hub: its route and vehicle cards are the published `taxi` CMS items.
  if (segs.length === 0) return each(AIRPORT_TAXIS_DATASET, "An airport card and table row on the hub");
  if (segs[0] === "fare-rate-card") {
    return segs.length === 1 ? each(RATE_CARD_DATASET, "A row of the 'Fares by route' table (also a fare calculator route)") : [];
  }
  if (segs[0] === "airport-taxi") {
    if (segs.length === 1) return each(AIRPORT_TAXIS_DATASET, "An airport card");
    if (segs.length !== 2) return [];
    return [
      m(AIRPORT_COPY_DATASET.id, segs[1], "This airport page's prose (hero text, at a glance, why book, FAQ, ...)"),
      m(AIRPORT_TAXIS_DATASET.id, segs[1], "This airport's facts (name, distance, time, fares)"),
    ];
  }
  if (segs.length !== 1) return [];
  const slug = segs[0];
  const isVehicle = SEED_VEHICLES.some((v) => v.slug === slug) || slug in VEHICLE_COPY;
  return isVehicle
    ? [
        m(VEHICLE_COPY_DATASET.id, slug, "This vehicle page's prose (hero text, features, who it suits, FAQ, ...)"),
        m(TAXI_VEHICLES_DATASET.id, slug, "Fallback vehicle facts, used only when no published `taxi` CMS item has this slug"),
      ]
    : [
        m(ROUTE_COPY_DATASET.id, slug, "This route page's prose (hero text, at a glance, the drive, why book, FAQ, ...)"),
        m(CAB_ROUTES_DATASET.id, slug, "Fallback route facts, used only when no published `taxi` CMS item has this slug"),
      ];
}

async function toolsResolver(path: string): Promise<PageMatch[]> {
  const hit = path.match(/^\/tools\/(?:([a-z0-9-]+)\/)?$/);
  if (!hit) return [];
  if (!hit[1]) return each(TOOLS_DATASET, "A tool card on /tools/");
  const matches = [m(TOOLS_DATASET.id, hit[1], "This tool page's title, intro, explainer and FAQ")];
  if (SEED_TOOLS.find((t) => t.slug === hit[1])?.tool_type === "fare-calculator") {
    matches.push(...(await each(RATE_CARD_DATASET, "A fare calculator route (shared with the fare rate card)")));
  }
  return matches;
}

export const GROUP: CmsGroup = {
  datasets: [
    asAnyDataset(CAB_ROUTES_DATASET),
    asAnyDataset(TAXI_VEHICLES_DATASET),
    asAnyDataset(AIRPORT_TAXIS_DATASET),
    asAnyDataset(ROUTE_COPY_DATASET),
    asAnyDataset(VEHICLE_COPY_DATASET),
    asAnyDataset(AIRPORT_COPY_DATASET),
    asAnyDataset(RATE_CARD_DATASET),
    asAnyDataset(TOOLS_DATASET),
  ],
  pages: [
    TAXI_HUB_PAGE,
    CAB_ROUTE_TEMPLATE_PAGE,
    VEHICLE_TEMPLATE_PAGE,
    AIRPORT_INDEX_PAGE,
    AIRPORT_TEMPLATE_PAGE,
    FARE_RATE_CARD_PAGE,
    TOOLS_PAGE,
    TOOL_TEMPLATE_PAGE,
  ] as PageDef[],
  resolvers: [taxiResolver, toolsResolver],
};
