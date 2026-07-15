import { Binoculars, CalendarHeart, Clock, Route, Ticket } from "lucide-react";
import ClusterPillar, { type ClusterConfig } from "./ClusterPillar";
import type { Doc } from "@/src/lib/cms";

/**
 * /gir/ — the Asiatic-lion pillar. All layout lives in ClusterPillar; this file
 * is only the Gir-specific copy and link graph.
 */
const CONFIG: ClusterConfig = {
  slug: "gir",
  heroTitle: "Sasan Gir Travel Guide",
  label: "Gir",
  placeName: "Gir National Park & Sasan Gir",
  accent: "emerald",
  spokeIcons: {
    "gir-safari-booking": Ticket,
    "gir-safari-timings-price": Clock,
    "best-time-to-visit-gir": CalendarHeart,
    "devalia-safari-park": Binoculars,
    "how-to-reach-gir": Route,
  },
  spokeFallbackIcon: Binoculars,
  spokeOrder: [
    "gir-safari-booking",
    "gir-safari-timings-price",
    "best-time-to-visit-gir",
    "devalia-safari-park",
    "how-to-reach-gir",
  ],
  journeys: [
    { href: "/gir-tour-package/", title: "Gir tour package", blurb: "Safari-led trips built around the permit, not the hotel.", primary: true },
    { href: "/somnath-dwarka-gir-tour-package/", title: "Somnath, Dwarka & Gir", blurb: "The pilgrimage circuit with a night at Sasan added." },
    { href: "/somnath-dwarka-tour-package/with-gir/", title: "Add Gir to your circuit", blurb: "Already planning Somnath–Dwarka? Bolt on a safari." },
    { href: "/wildlife-nature-tours/", title: "Wildlife & nature tours", blurb: "Gir, Velavadar, the Rann and the rest of wild Gujarat." },
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
  copy: {
    significanceTitle: "Why people come to Gir",
    comeForLabel: "What you come for",
    reachTitle: "How to reach Sasan Gir",
    clusterEyebrow: "Permits & gates",
    clusterTitle: "Plan your safari",
    clusterBanner: "Permits are limited and released in advance — book the permit first and the stay around it.",
    clusterBannerIcon: Ticket,
    placesEyebrow: "Things to do",
    placesTitle: "Inside the forest",
    distancesBanner: "Sasan Gir sits an easy drive from Somnath — most travellers add a night here to the pilgrimage circuit.",
    journeysTitle: "Ways to visit Gir",
    mapTitle: "Gir on the map",
    faqHeading: "Gir FAQs",
    ctaContext: "Gir safari trip",
    ctaTitle: "Book the permit first",
    ctaSubtitle: "Tell us your dates and we will tell you honestly whether a permit is still realistic.",
  },
  related: {
    pillar: { target: "/wildlife-nature-tours/", anchor: "wildlife tours across Gujarat" },
    money: "packages",
    siblings: [
      { target: "/somnath/", anchor: "Somnath travel guide", type: "sibling" },
      { target: "/junagadh-girnar/", anchor: "Junagadh & Girnar", type: "sibling" },
    ],
    extra: [{ target: "/gir-tour-package/", anchor: "Gir tour packages", type: "money" }],
  },
};

export default async function GirPillar({ doc }: { doc: Doc }) {
  return <ClusterPillar doc={doc} config={CONFIG} />;
}
