import { Binoculars, CalendarHeart, Clock, Route, Ticket } from "lucide-react";
import ClusterPillar, { type ClusterConfig } from "./ClusterPillar";
import { GIR_PILLAR_PAGE } from "./clusterContent";
import type { Doc } from "@/src/lib/cms";

/**
 * /gir/ — the Asiatic-lion pillar. All layout lives in ClusterPillar; the
 * Gir-specific copy and link graph are the "gir-pillar" page copy
 * (clusterContent.ts, editable through the CMS). Only the icons and accent
 * stay here.
 */
const CONFIG: ClusterConfig = {
  slug: "gir",
  accent: "emerald",
  spokeIcons: {
    "gir-safari-booking": Ticket,
    "gir-safari-timings-price": Clock,
    "best-time-to-visit-gir": CalendarHeart,
    "devalia-safari-park": Binoculars,
    "how-to-reach-gir": Route,
  },
  spokeFallbackIcon: Binoculars,
  clusterBannerIcon: Ticket,
  page: GIR_PILLAR_PAGE,
};

export default async function GirPillar({ doc }: { doc: Doc }) {
  return <ClusterPillar doc={doc} config={CONFIG} />;
}
