import type { PageDef } from "@/src/lib/pages/types";
import { HERO_LABEL_DEFAULTS } from "./destination/content";

/*
  Copy of the cluster pillars /gir/ and /junagadh-girnar/, editable through the
  CMS ("page" type, ids "gir-pillar" and "junagadh-girnar-pillar"). The pillar's
  own facts (h1, answer, significance, best time, distances, map, FAQ) are its
  CMS destination item; its spokes and places are CMS items too. Icons and the
  accent colour stay in GirPillar.tsx / JunagadhGirnarPillar.tsx.
*/

const SHARED_LABELS = {
  hero: HERO_LABEL_DEFAULTS,
  tocHeading: "On this page",
  significanceEyebrow: "Why it matters",
  bestTimeLabel: "Best time to visit",
  reachEyebrow: "Getting there",
  spokeCta: "Read the guide",
  placeCta: "Explore Route Guide",
  distancesEyebrow: "Plan the drive",
  distancesTitle: "Key distances",
  distanceColumns: ["From", "To", "Distance", "Time"],
  distancesVerifyLabel: "Distances",
  journeysEyebrow: "Book it",
  overnightLead: "Staying overnight?",
  mapEyebrow: "Find it",
};

const GIR_DEFAULTS = {
  heroTitle: "Sasan Gir Travel Guide",
  label: "Gir",
  placeName: "Gir National Park & Sasan Gir",
  spokeOrder: [
    "gir-safari-booking",
    "gir-safari-timings-price",
    "best-time-to-visit-gir",
    "devalia-safari-park",
    "how-to-reach-gir",
  ],
  journeys: [
    { href: "/gir-tour-package/", title: "Gir tour package", blurb: "Safari-led trips built around the permit, not the hotel.", primary: true },
    { href: "/somnath-dwarka-gir-tour-package/", title: "Somnath, Dwarka & Gir", blurb: "The pilgrimage circuit with a night at Sasan added.", primary: false },
    { href: "/somnath-dwarka-tour-package/with-gir/", title: "Add Gir to your circuit", blurb: "Already planning Somnath–Dwarka? Bolt on a safari.", primary: false },
    { href: "/wildlife-nature-tours/", title: "Wildlife & nature tours", blurb: "Gir, Velavadar, the Rann and the rest of wild Gujarat.", primary: false },
  ],
  overnight: { href: "/hotels/sasan-gir-hotels/", label: "Sasan Gir hotels & resorts" },
  toc: [
    { id: "significance", label: "Why Gir" },
    { id: "reach", label: "How to reach" },
    { id: "cluster", label: "Plan your safari" },
    { id: "places", label: "Inside the forest" },
    { id: "distances", label: "Key distances" },
    { id: "journeys", label: "Ways to visit" },
    { id: "map", label: "Map" },
  ],
  ...SHARED_LABELS,
  significanceTitle: "Why people come to Gir",
  comeForLabel: "What you come for",
  reachTitle: "How to reach Sasan Gir",
  clusterEyebrow: "Permits & gates",
  clusterTitle: "Plan your safari",
  clusterBanner: "Permits are limited and released in advance — book the permit first and the stay around it.",
  placesEyebrow: "Things to do",
  placesTitle: "Inside the forest",
  distancesBanner: "Sasan Gir sits an easy drive from Somnath — most travellers add a night here to the pilgrimage circuit.",
  journeysTitle: "Ways to visit Gir",
  mapTitle: "Gir on the map",
  faqHeading: "Gir FAQs",
  ctaContext: "Gir safari trip",
  ctaTitle: "Book the permit first",
  ctaSubtitle: "Tell us your dates and we will tell you honestly whether a permit is still realistic.",
  related: {
    pillar: { target: "/wildlife-nature-tours/", anchor: "wildlife tours across Gujarat" },
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" },
      { target: "/junagadh-girnar/", anchor: "Junagadh & Girnar", type: "sibling" },
    ],
    extra: [{ target: "/gir-tour-package/", anchor: "Gir tour packages", type: "money" }],
  },
};

export type ClusterCopy = typeof GIR_DEFAULTS;

const JUNAGADH_GIRNAR_DEFAULTS: ClusterCopy = {
  heroTitle: "Junagadh & Girnar Travel Guide",
  label: "Junagadh & Girnar",
  placeName: "Girnar, Junagadh",
  spokeOrder: [
    "girnar-steps-climb-guide",
    "girnar-ropeway",
    "girnar-lili-parikrama",
    "bhavnath-mahadev-mela",
    "ambaji-temple-girnar",
    "dattatreya-temple",
    "jain-temples-girnar",
    "uparkot-fort",
    "how-to-reach-junagadh",
  ],
  journeys: [
    { href: "/somnath-dwarka-gir-tour-package/", title: "Somnath, Dwarka & Gir", blurb: "The Saurashtra circuit — pair Girnar with Somnath and a Gir safari.", primary: true },
    { href: "/gujarat-tour-packages/", title: "Gujarat tour packages", blurb: "Longer itineraries that fold Junagadh into a wider Gujarat trip.", primary: false },
    { href: "/gir-tour-package/", title: "Gir tour package", blurb: "Sasan Gir is an hour and a half away — add a lion safari.", primary: false },
    { href: "/heritage-tours-gujarat/", title: "Heritage tours", blurb: "Uparkot, the Ashoka edict and Gujarat's wider heritage trail.", primary: false },
  ],
  overnight: { href: "/hotels/", label: "Find a place to stay in Junagadh" },
  toc: [
    { id: "significance", label: "Why Girnar" },
    { id: "reach", label: "How to reach" },
    { id: "cluster", label: "The climb & temples" },
    { id: "places", label: "In & around town" },
    { id: "distances", label: "Key distances" },
    { id: "journeys", label: "Ways to visit" },
    { id: "map", label: "Map" },
  ],
  ...SHARED_LABELS,
  significanceTitle: "Why people climb Girnar",
  comeForLabel: "What you come for",
  reachTitle: "How to reach Junagadh",
  clusterEyebrow: "The climb & the temples",
  clusterTitle: "Girnar, step by step",
  clusterBanner: "Pilgrims start the climb before dawn to reach the summit temples before the heat — plan your day around that.",
  placesEyebrow: "Things to do",
  placesTitle: "In & around Junagadh",
  distancesBanner: "Junagadh sits between Gir and Somnath — most travellers fold the Girnar climb into the wider Saurashtra circuit.",
  journeysTitle: "Ways to visit Junagadh & Girnar",
  mapTitle: "Girnar on the map",
  faqHeading: "Junagadh & Girnar FAQs",
  ctaContext: "Junagadh & Girnar trip",
  ctaTitle: "Plan the climb",
  ctaSubtitle: "Tell us your dates and fitness, and we will plan the climb, the ropeway and the rest of the circuit.",
  related: {
    pillar: { target: "/heritage-tours-gujarat/", anchor: "heritage tours across Gujarat" },
    siblings: [
      { target: "/gir/", anchor: "Gir travel guide", type: "sibling" },
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" },
    ],
    extra: [{ target: "/somnath-dwarka-gir-tour-package/", anchor: "Somnath Dwarka Gir packages", type: "money" }],
  },
};

const CLUSTER_NOTES =
  "The words and links around this pillar's CMS content. The pillar's h1, answer_first, significance, best_time, " +
  "key_distances, map_query and FAQ are its CMS destination item; the topic cards are its CMS spokes (ordered by " +
  "spokeOrder, a list of spoke slugs) and the place cards its CMS places; the hero image, deity line, tagline, chips, " +
  "stats and how-to-reach cards are its item in site_destination_heroes. Fields: heroTitle (the hero h1; keep the " +
  "ending in hero.titleSuffix, which gets the gradient), label (breadcrumb and hero name), placeName (schema name), " +
  "journeys[{href,title,blurb,primary}] (\"Ways to visit\" cards; primary = highlighted), overnight {href,label} (the " +
  "\"Staying overnight?\" link; empty href hides it), toc[{id,label}] (keep the ids: they are the section anchors), the " +
  "section eyebrows/titles/banners, faqHeading, cta*, related {pillar, siblings[], extra[]} (related links; type is " +
  "pillar|sibling|money|spoke|hub). {destination} in hero labels is replaced by `label`.";

export const GIR_PILLAR_PAGE: PageDef<ClusterCopy> = {
  id: "gir-pillar",
  title: "Gir travel guide (pillar copy)",
  group: "Destination pages",
  path: "/gir/",
  notes: CLUSTER_NOTES,
  defaults: GIR_DEFAULTS,
};

export const JUNAGADH_GIRNAR_PILLAR_PAGE: PageDef<ClusterCopy> = {
  id: "junagadh-girnar-pillar",
  title: "Junagadh & Girnar travel guide (pillar copy)",
  group: "Destination pages",
  path: "/junagadh-girnar/",
  notes: CLUSTER_NOTES,
  defaults: JUNAGADH_GIRNAR_DEFAULTS,
};
