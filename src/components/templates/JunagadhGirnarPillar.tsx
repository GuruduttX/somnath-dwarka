import { CalendarHeart, Castle, Footprints, Landmark, Mountain, Route, Sparkles, Star } from "lucide-react";
import ClusterPillar, { type ClusterConfig } from "./ClusterPillar";
import { JUNAGADH_GIRNAR_PILLAR_PAGE } from "./clusterContent";
import type { Doc } from "@/src/lib/cms";

/**
 * /junagadh-girnar/ — the sacred-mountain pillar. All layout lives in
 * ClusterPillar; Junagadh–Girnar's copy and link graph are the
 * "junagadh-girnar-pillar" page copy (clusterContent.ts, editable through the
 * CMS). Only the icons and accent stay here.
 */
const CONFIG: ClusterConfig = {
  slug: "junagadh-girnar",
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
  clusterBannerIcon: Footprints,
  page: JUNAGADH_GIRNAR_PILLAR_PAGE,
};

export default async function JunagadhGirnarPillar({ doc }: { doc: Doc }) {
  return <ClusterPillar doc={doc} config={CONFIG} />;
}
