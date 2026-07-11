import { CalendarHeart, Castle, Footprints, Landmark, Mountain, Route, Sparkles, Star } from "lucide-react";
import ClusterPillar, { type ClusterConfig } from "./ClusterPillar";
import type { Doc } from "@/src/lib/cms";

/**
 * /junagadh-girnar/ — the sacred-mountain pillar. All layout lives in
 * ClusterPillar; this file is only Junagadh–Girnar's copy and link graph.
 */
const CONFIG: ClusterConfig = {
  slug: "junagadh-girnar",
  heroTitle: "Junagadh & Girnar Travel Guide",
  label: "Junagadh & Girnar",
  placeName: "Girnar, Junagadh",
  accent: "amber",
  spokeIcons: {
    "girnar-steps-climb-guide": Footprints,
    "girnar-ropeway": Route,
    "girnar-lili-parikrama": Sparkles,
    "bhavnath-mahadev-mela": CalendarHeart,
    "ambaji-temple-girnar": Star,
    "dattatreya-temple": Mountain,
    "jain-temples-girnar": Landmark,
    "uparkot-fort": Castle,
    "how-to-reach-junagadh": Route,
  },
  spokeFallbackIcon: Landmark,
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
    { href: "/gujarat-tour-packages/", title: "Gujarat tour packages", blurb: "Longer itineraries that fold Junagadh into a wider Gujarat trip." },
    { href: "/gir-tour-package/", title: "Gir tour package", blurb: "Sasan Gir is an hour and a half away — add a lion safari." },
    { href: "/heritage-tours-gujarat/", title: "Heritage tours", blurb: "Uparkot, the Ashoka edict and Gujarat's wider heritage trail." },
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
  copy: {
    significanceTitle: "Why people climb Girnar",
    comeForLabel: "What you come for",
    reachTitle: "How to reach Junagadh",
    clusterEyebrow: "The climb & the temples",
    clusterTitle: "Girnar, step by step",
    clusterBanner: "Pilgrims start the climb before dawn to reach the summit temples before the heat — plan your day around that.",
    clusterBannerIcon: Footprints,
    placesEyebrow: "Things to do",
    placesTitle: "In & around Junagadh",
    distancesBanner: "Junagadh sits between Gir and Somnath — most travellers fold the Girnar climb into the wider Saurashtra circuit.",
    journeysTitle: "Ways to visit Junagadh & Girnar",
    mapTitle: "Girnar on the map",
    faqHeading: "Junagadh & Girnar FAQs",
    ctaContext: "Junagadh & Girnar trip",
    ctaTitle: "Plan the climb",
    ctaSubtitle: "Tell us your dates and fitness, and we will plan the climb, the ropeway and the rest of the circuit.",
  },
  related: {
    pillar: { target: "/heritage-tours-gujarat/", anchor: "heritage tours across Gujarat" },
    money: "packages",
    siblings: [
      { target: "/gir/", anchor: "Gir travel guide", type: "sibling" },
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" },
    ],
    extra: [{ target: "/somnath-dwarka-gir-tour-package/", anchor: "Somnath Dwarka Gir packages", type: "money" }],
  },
};

export default async function JunagadhGirnarPillar({ doc }: { doc: Doc }) {
  return <ClusterPillar doc={doc} config={CONFIG} />;
}
