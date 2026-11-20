import type { CmsGroup, PageMatch, PageResolver } from "./types";
import { asAnyDataset, type DatasetDef } from "@/src/lib/datasets/types";
import type { PageDef } from "@/src/lib/pages/types";
import { SEED_JOURNEYS, SEED_TEMPLE_INFO, type SeedJourney, type SeedTempleInfo } from "@/src/lib/seed/destinations";
import { DESTINATION_THEMES, type DestinationTheme } from "@/src/config/destinations";
import { destinationPath, destinationTopicPath } from "@/src/lib/destinationRoutes";
import { getHubSpokesFor } from "@/src/lib/content";
import { getDataset, getDatasetRecord, recordItems } from "@/src/lib/datasets/store";
import {
  DESTINATION_HERO_ITEMS,
  PILLAR_ITEMS,
  type DestinationHeroItem,
  type PillarItem,
} from "@/src/components/templates/destination/data";
import {
  DESTINATION_HUB_TEMPLATE_PAGE,
  DWARKA_PILLAR_PAGE,
  PLACE_TEMPLATE_PAGE,
  SOMNATH_PILLAR_PAGE,
} from "@/src/components/templates/destination/content";
import { TEMPLE_TOPIC_TEMPLATE_PAGE } from "@/src/components/templates/temple/content";
import { GIR_PILLAR_PAGE, JUNAGADH_GIRNAR_PILLAR_PAGE } from "@/src/components/templates/clusterContent";
import {
  INTEREST_HUB_ITEMS,
  INTEREST_SPOKE_IMAGE_ITEMS,
  type InterestHubItem,
  type InterestSpokeImage,
} from "@/src/components/templates/interest/content";
import { HUB_SECTION_ITEMS, type HubSectionsItem } from "@/src/components/hub/content";
import { TEMPLE_CARD_ITEMS, TEMPLES_PAGE, type TempleCardItem } from "@/src/app/temples/content";
import { PLAN_GUIDE_TEMPLATE_PAGE, PLAN_PAGE } from "@/src/app/plan/content";
import { AUTHOR_PAGE } from "@/src/app/author/harsh-rawat/content";
import { GUIDE_BLOCKS_PAGE, GUIDES_PAGE } from "@/src/app/guides/content";

/*
  CMS coverage for the "destinations & guides" part of the site: the
  destination pillars (/somnath/, /dwarka/, /gir/, /junagadh-girnar/), their
  temple topic and place pages, the destination and interest hubs, /plan/,
  /guides/, /temples/ and the author page. Code datasets, code-built page copy
  and URL resolvers registered with the /mcp/ connector. See ./types.ts.
*/

const GROUP_NAME = "Destinations & guides";

/* ── Datasets ─────────────────────────────────────────────────────────── */

export const PILLARS_DATASET: DatasetDef<PillarItem> = {
  id: "site_destination_pillars",
  label: "Destination pillars Somnath & Dwarka (/somnath/, /dwarka/ and their place pages)",
  group: GROUP_NAME,
  description:
    "The content of the two destination pillar pages /somnath/ and /dwarka/ (one item each, key = slug). Fields: " +
    "destination (display name), title (SEO title), h1, answer_first (40-60 word direct answer, also the meta " +
    "description), significance (faith tradition; shown tagged as faith, not fact), best_time, how_to_reach (paragraph), " +
    "top_places[{name, slug, blurb, image, image_alt}] = the \"Places to visit\" cards — each one is also the page " +
    "/<destination>/places/<slug>/ (add an entry to add a place page; image is an https URL or /images/... path, \"\" " +
    "shows the glyph panel), key_distances[{from, to, distance, duration}] (shown behind an \"unverified\" stamp: keep them " +
    "honest), map_query (Google Maps search text), faq[{question, answer}]. The section headings and labels are the " +
    "\"somnath-pillar\" / \"dwarka-pillar\" page items; the hero is site_destination_heroes.",
  defaults: PILLAR_ITEMS,
  key: (d) => d.slug,
  keyFields: ["slug"],
  path: (d) => destinationPath(d.slug),
  title: (d) => d.destination,
  // Only /somnath/ and /dwarka/ have a route of their own.
  allowCreate: false,
  allowDelete: false,
};

export const HEROES_DATASET: DatasetDef<DestinationHeroItem> = {
  id: "site_destination_heroes",
  label: "Destination pillar heroes (/somnath/, /dwarka/, /gir/, /junagadh-girnar/)",
  group: GROUP_NAME,
  description:
    "The hero and display data of each destination pillar page (key = pillar slug). Fields: heroImage (hero photo URL; " +
    "\"\" paints the accent colour instead — never use a photo of a different place), deity (line under the title, e.g. " +
    "\"Lord Shiva · First Jyotirlinga\"), deityShort, accent / accentSoft (CSS colours), glyph (large watermark " +
    "character), tagline, chips[{icon, label}] (under the tagline), stats[{value, label, icon}] (the 4-cell stat bar), " +
    "reach[{icon, mode, detail, photo, photo_alt}] (the \"How to reach\" cards), placeIcon (icon of the place cards), " +
    "templePhoto / templePhotoAlt (side photo of the temple-timings card; Somnath and Dwarka only). Icons are one of: " +
    "plane, train, car, sun, clock, route, landmark, waves, moon, flower, star, flame. Facts here must match the pillar " +
    "content; do not add claims.",
  defaults: DESTINATION_HERO_ITEMS,
  key: (d) => d.slug,
  keyFields: ["slug"],
  path: (d) => `/${d.slug}/`,
  title: (d) => d.slug,
  allowCreate: false,
  allowDelete: false,
};

export const TEMPLE_TOPICS_DATASET: DatasetDef<SeedTempleInfo> = {
  id: "site_temple_topics",
  label: "Temple topic pages (/somnath/<slug>/, /dwarka/<slug>/)",
  group: GROUP_NAME,
  description:
    "The temple topic pages under the two pillars — timings, aarti, darshan, history, dress code, live darshan, ... " +
    "(key = \"<destination>/<slug>\", destination is somnath or dwarka). They also make the topic cards in the pillar's " +
    "\"Temple timings & darshan\" section (the item with topic \"timings\" is the large card). Fields: slug, destination, " +
    "topic (timings | aarti | darshan | vip-darshan | live-darshan | history | jyotirlinga | char-dham | dress-code | " +
    "best-time | how-to-reach | pooja-booking | light-and-sound-show | dhwaja-ceremony; sets the card's icon and link " +
    "label), title (SEO title), h1, answer_first (also the meta description), timings[{label, open, close}] (close \"—\" " +
    "for none), verified (true only when checked against the official source), official_source_url, dress_code, " +
    "photography_rule, faq[{question, answer}]. Timings are indicative unless verified; never invent them.",
  defaults: SEED_TEMPLE_INFO,
  key: (t) => `${t.destination}/${t.slug}`,
  keyFields: ["destination", "slug"],
  path: (t) => (t.destination === "somnath" || t.destination === "dwarka" ? destinationTopicPath(t.destination, t.slug) : null),
  title: (t) => t.h1,
};

export const PLAN_GUIDES_DATASET: DatasetDef<SeedJourney> = {
  id: "site_plan_guides",
  label: "Planning guides (/plan/<slug>/)",
  group: GROUP_NAME,
  description:
    "The trip-planning guides at /plan/<slug>/ and their cards on /plan/ (key = slug). Fields: slug, title (SEO title), " +
    "h1, question (the card heading and related-link text), direct_answer (the answer under the h1, also the meta " +
    "description), modes[{mode, distance, duration, note}] (the distance table; a mode containing \"road\" also shows its " +
    "distance and time on the card), itinerary[{day, title, description, stops[]}] (optional day plan), " +
    "month_table[{month, weather, crowd, note}] (optional month grid), faq[{question, answer}]. Distances and times are " +
    "shown as unverified; keep them consistent with the rest of the site.",
  defaults: SEED_JOURNEYS,
  key: (j) => j.slug,
  keyFields: ["slug"],
  path: (j) => `/plan/${j.slug}/`,
  title: (j) => j.question || j.h1,
};

export type DestinationHubItem = DestinationTheme & { slug: string };

export const DESTINATION_HUBS_DATASET: DatasetDef<DestinationHubItem> = {
  id: "site_destination_hubs",
  label: "Destination hub themes (/gir-tour-package/, /kutch-tour-package/, ...)",
  group: GROUP_NAME,
  description:
    "Display data of the destination package hubs (CMS hubs with hub_kind \"destination\"; key = the hub slug). Fields: " +
    "name (short display name used across the page), accent [from, to] (two CSS colours), photo (hero photo and package " +
    "photo; leave \"\" when the site has no real photo of the place — never use a photo of somewhere else), standfirst " +
    "(summary under the headline until the CMS hub item has an answer_first; also the fallback meta description), " +
    "highlights[] (chips under the headline, topping up the hub h1's own subtitle). The hub's h1, answer, variants and FAQ " +
    "are the CMS hub item; the page labels are the \"destination-hub-template\" page item. A hub without an item here " +
    "uses the name \"Gujarat\" and no photo.",
  defaults: recordItems(DESTINATION_THEMES, "slug"),
  key: (h) => h.slug,
  keyFields: ["slug"],
  path: (h) => `/${h.slug}/`,
  title: (h) => h.name,
};

export const INTEREST_HUBS_DATASET: DatasetDef<InterestHubItem> = {
  id: "site_interest_hubs",
  label: "Interest hubs (/wildlife-nature-tours/, /heritage-tours-gujarat/, /circuits/)",
  group: GROUP_NAME,
  description:
    "Theme and labels of the interest hubs (CMS hubs with hub_kind \"vertical\"; key = the hub slug). Fields: eyebrow " +
    "(above the headline), name (short label used in the WhatsApp message and FAQ), standfirst (summary under the " +
    "headline until the CMS hub item has an answer_first), highlights[] (chips), headlineBreakBefore (word the headline's " +
    "second line starts on; \"\" lets it wrap freely), gridHeading / gridBlurb (above the card grid), labels = the page's " +
    "button texts, card labels, FAQ heading and defaultFaq (shown when the hub item has no FAQ). Placeholders in labels: " +
    "{count} (number of cards), {s} (\"s\" unless count is 1), {name}. The cards themselves are the hub's CMS spokes; " +
    "their photos are site_interest_spoke_images.",
  defaults: INTEREST_HUB_ITEMS,
  key: (h) => h.slug,
  keyFields: ["slug"],
  path: (h) => `/${h.slug}/`,
  title: (h) => h.name,
};

export const INTEREST_SPOKE_IMAGES_DATASET: DatasetDef<InterestSpokeImage> = {
  id: "site_interest_spoke_images",
  label: "Interest hub card photos (by spoke slug)",
  group: GROUP_NAME,
  description:
    "The card photo of each spoke on the interest hubs (/wildlife-nature-tours/, /heritage-tours-gujarat/, /circuits/), " +
    "key = the spoke's slug, image = an https URL or /images/... path. The defaults are subject-matched stand-in photos, " +
    "not photographs of the actual sites: replace them with real photos of the place when available (upload_image). A " +
    "spoke with no item gets a rotating generic photo.",
  defaults: INTEREST_SPOKE_IMAGE_ITEMS,
  key: (i) => i.slug,
  keyFields: ["slug"],
  title: (i) => i.slug,
};

export const PACKAGE_HUB_SECTIONS_DATASET: DatasetDef<HubSectionsItem> = {
  id: "site_package_hub_sections",
  label: "Circuit package hubs: long-form section headings",
  group: GROUP_NAME,
  description:
    "Headings and table labels of the long-form block (chooser, constraints, hour-by-hour plan, price sheet, why us, not " +
    "for you, practical notes) on the circuit package hubs /somnath-dwarka-tour-package/, " +
    "/somnath-dwarka-gir-tour-package/ and /gujarat-tour-packages/ (key = hub slug). The block's content (tables, prices, " +
    "notes) is the CMS hub item; a section only shows when the hub item has content for it. *Columns lists are table " +
    "headings: keep their number.",
  defaults: HUB_SECTION_ITEMS,
  key: (h) => h.hub,
  keyFields: ["hub"],
  path: (h) => `/${h.hub}/`,
  title: (h) => h.hub,
  allowCreate: false,
  allowDelete: false,
};

export const TEMPLE_CARDS_DATASET: DatasetDef<TempleCardItem> = {
  id: "site_temple_cards",
  label: "Temple directory cards (/temples/)",
  group: GROUP_NAME,
  description:
    "Card details on the /temples/ directory for each CMS temple (key = the temple's slug). A field is used only where " +
    "the CMS temple item leaves it empty. Fields: deity, town, district, significance (one or two lines; legend stays " +
    "legend), distance (from Ahmedabad), dressCode, category (sets the filter, icon and photo: Shiva & Jyotirlinga | " +
    "Krishna & Vishnu | Shakti/Mata | Saint Yatras | Kutch & Border | Monuments & Heritage | Virtual Portal), " +
    "timingsFallback[{label, open, close}] (shown when the CMS temple has no timings table; indicative, never verified).",
  defaults: TEMPLE_CARD_ITEMS,
  key: (t) => t.slug,
  keyFields: ["slug"],
  path: (t) => `/temples/${t.slug}/`,
  title: (t) => t.slug,
};

/* ── Resolvers ────────────────────────────────────────────────────────── */

const page = (def: PageDef, what: string): PageMatch => ({ type: "page", id: def.id, what });
const item = (def: { id: string }, id: string, what: string): PageMatch => ({ type: def.id, id, what });
const asPage = <T extends Record<string, unknown>>(def: PageDef<T>) => def as unknown as PageDef;

const PILLAR_PAGES: Record<string, PageDef> = {
  somnath: asPage(SOMNATH_PILLAR_PAGE),
  dwarka: asPage(DWARKA_PILLAR_PAGE),
};
const CLUSTER_PAGES: Record<string, PageDef> = {
  gir: asPage(GIR_PILLAR_PAGE),
  "junagadh-girnar": asPage(JUNAGADH_GIRNAR_PILLAR_PAGE),
};

/** /somnath/, /dwarka/ and everything under them. */
const pillarResolver: PageResolver = async (path) => {
  const m = path.match(/^\/(somnath|dwarka)\/(?:places\/([a-z0-9-]+)\/|([a-z0-9-]+)\/)?$/);
  if (!m) return [];
  const [, dest, place, topic] = m;
  if (place) {
    return [
      item(PILLARS_DATASET, dest, `The place's name, blurb and card photo (its entry in top_places of the "${dest}" item), and the reach and significance text`),
      page(asPage(PLACE_TEMPLATE_PAGE), "Copy shared by every place page (intro, headings, FAQ)"),
    ];
  }
  if (topic) {
    if (topic === "places") return [];
    return [
      item(TEMPLE_TOPICS_DATASET, `${dest}/${topic}`, "The topic page's content (h1, answer, timings, dress code, FAQ)"),
      page(asPage(TEMPLE_TOPIC_TEMPLATE_PAGE), "Headings and labels shared by every temple topic page"),
    ];
  }
  const topics = (await getDataset(TEMPLE_TOPICS_DATASET)).filter((t) => t.destination === dest);
  return [
    item(PILLARS_DATASET, dest, "The pillar's content: h1, answer, significance, how to reach, places, distances, map, FAQ"),
    item(HEROES_DATASET, dest, "The hero (photo, deity line, tagline, chips, stats), the how-to-reach cards and the temple-card photo"),
    page(PILLAR_PAGES[dest], "Section headings, labels and related links"),
    ...topics.map((t) =>
      item(TEMPLE_TOPICS_DATASET, `${t.destination}/${t.slug}`, `Temple-timings card "${t.h1}" (and its own page)`)
    ),
  ];
};

/** /gir/ and /junagadh-girnar/ (their content is a CMS destination item, which find_page resolves site-wide). */
const clusterResolver: PageResolver = (path) => {
  const m = path.match(/^\/(gir|junagadh-girnar)\/$/);
  if (!m) return [];
  return [
    item(HEROES_DATASET, m[1], "The hero (photo, deity line, tagline, chips, stats) and the how-to-reach cards"),
    page(CLUSTER_PAGES[m[1]], "Section headings, banners, ways-to-visit cards and related links"),
  ];
};

/** Destination hubs and their package pages, the interest hubs, the circuit package hubs. */
const hubResolver: PageResolver = async (path) => {
  const m = path.match(/^\/([a-z0-9-]+)\/(?:([a-z0-9-]+)\/)?$/);
  if (!m) return [];
  const [, hub, spoke] = m;
  const out: PageMatch[] = [];
  const themes = await getDatasetRecord(DESTINATION_HUBS_DATASET);
  if (themes[hub]) {
    out.push(
      item(
        DESTINATION_HUBS_DATASET,
        hub,
        spoke ? "The destination's name and photo used on this package page" : "The hub's display name, photo, standfirst and highlight chips"
      )
    );
    if (spoke) out.push(page(asPage(DESTINATION_HUB_TEMPLATE_PAGE), "The package page's overview heading, assurance line and location (packagePage)"));
  }
  if (spoke) return out;
  const interest = await getDatasetRecord(INTEREST_HUBS_DATASET);
  if (interest[hub]) {
    out.push(item(INTEREST_HUBS_DATASET, hub, "The hub's eyebrow, standfirst, chips, grid heading and page labels"));
    const images = await getDatasetRecord(INTEREST_SPOKE_IMAGES_DATASET);
    for (const doc of await getHubSpokesFor(hub)) {
      const slug = String(doc.slug);
      if (images[slug]) out.push(item(INTEREST_SPOKE_IMAGES_DATASET, slug, `Card photo of the "${slug}" card`));
    }
  }
  if (HUB_SECTION_ITEMS.some((h) => h.hub === hub)) {
    out.push(item(PACKAGE_HUB_SECTIONS_DATASET, hub, "Headings of the long-form sections (chooser, price sheet, why us, ...)"));
  }
  return out;
};

/** /plan/, /plan/<slug>/, /temples/, /temples/<slug>/. */
const listingResolver: PageResolver = async (path) => {
  if (path === "/plan/") {
    return (await getDataset(PLAN_GUIDES_DATASET)).map((j) => item(PLAN_GUIDES_DATASET, j.slug, `Planning-guide card "${j.question}"`));
  }
  const plan = path.match(/^\/plan\/([a-z0-9-]+)\/$/);
  if (plan && plan[1] !== "itinerary") {
    return [item(PLAN_GUIDES_DATASET, plan[1], "The planning guide's content (h1, answer, tables, itinerary, FAQ)")];
  }
  if (path === "/temples/") {
    return (await getDataset(TEMPLE_CARDS_DATASET)).map((t) =>
      item(TEMPLE_CARDS_DATASET, t.slug, `Card details of "${t.slug}" (used where the CMS temple leaves a field empty)`)
    );
  }
  const temple = path.match(/^\/temples\/([a-z0-9-]+)\/$/);
  if (temple && (await getDatasetRecord(TEMPLE_CARDS_DATASET))[temple[1]]) {
    return [item(TEMPLE_CARDS_DATASET, temple[1], "This temple's card on /temples/ (not this page's own content)")];
  }
  return [];
};

export const GROUP: CmsGroup = {
  datasets: [
    asAnyDataset(PILLARS_DATASET),
    asAnyDataset(HEROES_DATASET),
    asAnyDataset(TEMPLE_TOPICS_DATASET),
    asAnyDataset(PLAN_GUIDES_DATASET),
    asAnyDataset(DESTINATION_HUBS_DATASET),
    asAnyDataset(INTEREST_HUBS_DATASET),
    asAnyDataset(INTEREST_SPOKE_IMAGES_DATASET),
    asAnyDataset(PACKAGE_HUB_SECTIONS_DATASET),
    asAnyDataset(TEMPLE_CARDS_DATASET),
  ],
  pages: [
    SOMNATH_PILLAR_PAGE,
    DWARKA_PILLAR_PAGE,
    TEMPLE_TOPIC_TEMPLATE_PAGE,
    PLACE_TEMPLATE_PAGE,
    GIR_PILLAR_PAGE,
    JUNAGADH_GIRNAR_PILLAR_PAGE,
    DESTINATION_HUB_TEMPLATE_PAGE,
    PLAN_PAGE,
    PLAN_GUIDE_TEMPLATE_PAGE,
    AUTHOR_PAGE,
    GUIDES_PAGE,
    GUIDE_BLOCKS_PAGE,
    TEMPLES_PAGE,
  ] as unknown as PageDef[],
  resolvers: [pillarResolver, clusterResolver, hubResolver, listingResolver],
};
