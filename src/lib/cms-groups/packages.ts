import type { CmsGroup, PageMatch } from "./types";
import type { PageDef } from "@/src/lib/pages/types";
import { getDataset } from "@/src/lib/datasets/store";
import { asAnyDataset, type DatasetDef } from "@/src/lib/datasets/types";
import { SEED_PACKAGES, type SeedPackage } from "@/src/lib/seed/packages";
import { GIR_SEED_PACKAGES, type GirSeedPackage } from "@/src/lib/seed/girPackages";
import { GUJARAT_SEED_PACKAGES, type GujaratSeedPackage } from "@/src/lib/seed/gujaratPackages";
import { SD_PACKAGES_HUB_PAGE } from "@/src/app/somnath-dwarka-tour-package/content";
import { PACKAGE_VARIANT_PAGE } from "@/src/app/somnath-dwarka-tour-package/[slug]/content";
import { GIR_HUB_PAGE } from "@/src/app/somnath-dwarka-gir-tour-package/content";
import { GUJARAT_HUB_PAGE } from "@/src/app/gujarat-tour-packages/content";
import { HOME_CMS_SECTIONS_PAGE } from "@/src/components/Home/v6/cmsSectionsContent";

/*
  CMS coverage for the "packages" part of the site: the code datasets, code-built
  page copy and URL resolvers this part registers with the /mcp/ connector.
  See src/lib/cms-groups/types.ts.

  The three package hubs (/somnath-dwarka-tour-package/, the Gir triangle and the
  Gujarat umbrella) each list the variants their URL map authorises
  (src/config/packageSpokes.ts, girPackageSpokes.ts, gujaratPackageSpokes.ts).
  Those maps stay code: they are the planned URL architecture (which slugs exist
  and which list section each sits in), not copy. Every authorised slug already
  has a code item below, so the datasets allow editing and removing items but
  not adding new ones; a new variant needs a URL-map entry in code first.
*/

const ITEM_FIELDS =
  "Fields: slug (the URL's last part, fixed), title (the <title> tag), h1, facet ('duration' | 'from-city' | 'addon' | 'traveller'; picks the " +
  "card's badge and subtitle on the listing), duration (e.g. '4 Days / 3 Nights'; its first number is the card's day count), price_from " +
  "(indicative starting price in rupees, shown as 'Starts from'), answer_first (40-60 word direct answer: the overview text and the meta " +
  "description), highlights[], itinerary[{day, title, description, stops[]}], inclusions[], exclusions[], faq[{question, answer}].";

const HONESTY =
  " Prices are placeholders until the business confirms them; never invent prices, timings, ratings or reviews. All text is plain (no markup).";

export const SD_PACKAGES_DATASET: DatasetDef<SeedPackage> = {
  id: "site_packages",
  label: "Somnath Dwarka package variants (/somnath-dwarka-tour-package/<slug>/)",
  group: "Tour packages",
  description:
    "The code copy of the 36 Somnath Dwarka package variants: their pages at /somnath-dwarka-tour-package/<slug>/, their cards on " +
    "/somnath-dwarka-tour-package/ and the home page's traveller-type tiles. A published CMS 'package' item with the same slug replaces the " +
    "whole page and card, so edit that item instead when one exists (find_page tells you). " +
    ITEM_FIELDS +
    " price_verified: set true only once the business has confirmed price_from; it lets the price appear in the page's schema markup. " +
    "On 'from-city' items the card subtitle is the h1 after 'Somnath Dwarka Tour Package from ', so keep that wording. " +
    "Removing an item takes its page (404) and card off the site unless a CMS package item has the slug. New variants cannot be added here." +
    HONESTY,
  defaults: SEED_PACKAGES,
  key: (p) => p.slug,
  keyFields: ["slug"],
  path: (p) => `/somnath-dwarka-tour-package/${p.slug}/`,
  title: (p) => p.h1 || p.title,
  allowCreate: false,
};

const HUB_ITEM_NOTES =
  " A CMS hub-spoke item for the same slug wins field by field where it is filled (title, h1, meta_description, duration, a verified " +
  "price_from, answer_first, inclusions, exclusions, itinerary_days, faq); this item supplies everything it leaves empty, and the highlights. " +
  "price_verified is not used on these pages (only a verified price on the hub-spoke item counts as confirmed). location is the card subtitle. " +
  "Removing an item takes its page (404) and card off the site. New variants cannot be added here.";

export const GIR_PACKAGES_DATASET: DatasetDef<GirSeedPackage> = {
  id: "site_gir_packages",
  label: "Somnath Dwarka Gir package variants (/somnath-dwarka-gir-tour-package/<slug>/)",
  group: "Tour packages",
  description:
    "The code copy of the 13 Somnath–Dwarka–Gir triangle variants: their pages at /somnath-dwarka-gir-tour-package/<slug>/ and their cards " +
    "on /somnath-dwarka-gir-tour-package/. " +
    ITEM_FIELDS +
    " location (optional card subtitle)." +
    HUB_ITEM_NOTES +
    " Never state a Gir safari permit fee, slot price or gate timing (the permit is booked separately at actuals), and keep the monsoon " +
    "closure approximate (roughly mid-June to mid-October; the forest department sets it each year)." +
    HONESTY,
  defaults: GIR_SEED_PACKAGES,
  key: (p) => p.slug,
  keyFields: ["slug"],
  path: (p) => `/somnath-dwarka-gir-tour-package/${p.slug}/`,
  title: (p) => p.h1 || p.title,
  allowCreate: false,
};

export const GUJARAT_PACKAGES_DATASET: DatasetDef<GujaratSeedPackage> = {
  id: "site_gujarat_packages",
  label: "Gujarat tour package variants (/gujarat-tour-packages/<slug>/)",
  group: "Tour packages",
  description:
    "The code copy of the 11 Gujarat umbrella packages (circuits, short temple trips, from-city plans, corporate offsite): their pages at " +
    "/gujarat-tour-packages/<slug>/ and their cards on /gujarat-tour-packages/. " +
    ITEM_FIELDS +
    " location (the card subtitle on the listing, e.g. 'Dwarka, Bet Dwarka, Somnath'). The price card's 'hotel' and 'breakfast' " +
    "chips are read off the inclusions (words 'hotel'/'night' and 'breakfast'), so day trips without a hotel must not list one." +
    HUB_ITEM_NOTES +
    " Monument tickets, ropeway fares and safari permits are charged at actuals; do not quote them." +
    HONESTY,
  defaults: GUJARAT_SEED_PACKAGES,
  key: (p) => p.slug,
  keyFields: ["slug"],
  path: (p) => `/gujarat-tour-packages/${p.slug}/`,
  title: (p) => p.h1 || p.title,
  allowCreate: false,
};

/** "/<hub>/<slug>/" → slug, for a hub's variant URLs. */
function variantSlug(path: string, hub: string): string | null {
  const m = path.match(new RegExp(`^/${hub}/([a-z0-9-]+)/$`));
  return m ? m[1] : null;
}

const hasSlug = (items: { slug: string }[], slug: string) => items.some((p) => p.slug === slug);

const TEMPLATE_MATCH: PageMatch = {
  type: "page",
  id: PACKAGE_VARIANT_PAGE.id,
  what: "Headings, price-card lines and rating tiles shared by every package variant page (not this package's own text)",
};

/** One match per card on a hub listing (the listing's own copy is its page item, matched by path). */
async function cardMatches(def: DatasetDef<SeedPackage>, note = ""): Promise<PageMatch[]> {
  return (await getDataset(def)).map((p) => ({ type: def.id, id: p.slug, what: `Card "${p.h1}" on this listing${note}` }));
}

export const GROUP: CmsGroup = {
  datasets: [asAnyDataset(SD_PACKAGES_DATASET), asAnyDataset(GIR_PACKAGES_DATASET), asAnyDataset(GUJARAT_PACKAGES_DATASET)],
  pages: [SD_PACKAGES_HUB_PAGE, PACKAGE_VARIANT_PAGE, GIR_HUB_PAGE, GUJARAT_HUB_PAGE, HOME_CMS_SECTIONS_PAGE] as PageDef[],
  resolvers: [
    (path) => {
      // Flagship variants. The "/somnath-dwarka-tour-package/[slug]" page item and any CMS package item are matched by find_page itself.
      const slug = variantSlug(path, "somnath-dwarka-tour-package");
      if (!slug || !hasSlug(SD_PACKAGES_DATASET.defaults, slug)) return [];
      return [
        {
          type: SD_PACKAGES_DATASET.id,
          id: slug,
          what: "This package's code copy (H1, overview, price, itinerary, inclusions, FAQ). A CMS 'package' item with this slug, when one exists, replaces it: edit that instead",
        },
      ];
    },
    (path) => {
      const out: PageMatch[] = [];
      for (const [hub, def] of [
        ["somnath-dwarka-gir-tour-package", GIR_PACKAGES_DATASET],
        ["gujarat-tour-packages", GUJARAT_PACKAGES_DATASET],
      ] as const) {
        const slug = variantSlug(path, hub);
        if (!slug || !hasSlug(def.defaults, slug)) continue;
        out.push({
          type: def.id,
          id: slug,
          what: "This package's code copy (H1, overview, price, highlights, itinerary, inclusions, FAQ); a CMS hub-spoke item with this slug wins for the fields it fills",
        });
        out.push(TEMPLATE_MATCH);
      }
      return out;
    },
    async (path) => {
      if (path === "/somnath-dwarka-tour-package/") return cardMatches(SD_PACKAGES_DATASET, " (a CMS package item with the same slug wins)");
      if (path === "/somnath-dwarka-gir-tour-package/") return cardMatches(GIR_PACKAGES_DATASET);
      if (path === "/gujarat-tour-packages/") return cardMatches(GUJARAT_PACKAGES_DATASET);
      return [];
    },
  ],
};
