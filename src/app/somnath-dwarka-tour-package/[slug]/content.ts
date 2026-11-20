import type { PageDef } from "@/src/lib/pages/types";
import { HEAD_TERM_ANCHOR, HEAD_TERM_HUB } from "@/src/lib/links";
import { PACKAGE_DETAIL_LABELS, PRODUCT_RATING_TILES } from "@/src/components/TourPackage/copy";

/*
  Copy shared by every package variant page, editable through the CMS (the
  Claude connector's "page" type, id "package-variant-pages"): the section
  headings and price-card lines of /somnath-dwarka-tour-package/<slug>/,
  /somnath-dwarka-gir-tour-package/<slug>/ and /gujarat-tour-packages/<slug>/,
  and the four ProductRatings tiles. Each package's own content (H1, overview,
  price, itinerary, inclusions, FAQ) is its CMS package / hub-spoke item or its
  item in the site_packages, site_gir_packages or site_gujarat_packages dataset.
*/

export const PACKAGE_VARIANT_DEFAULTS = {
  labels: PACKAGE_DETAIL_LABELS,
  flagship: {
    overviewHeading: "A clear, temple-first plan for your Somnath Dwarka trip",
    headTermLine: `This is one variation of our [${HEAD_TERM_ANCHOR}](${HEAD_TERM_HUB}). See the main 2 night, 3 day plan with named hotels and tier prices.`,
    assurance: "Private cab & hotel support",
    priceTiersHeading: "Pricing by tier",
    priceTiersNote:
      "Per person. The tier is the hotel; hotel, breakfast and your vehicle with driver are included in every tier.",
  },
  gir: {
    overviewHeading: "A temple-first plan with the Gir safari built around its morning slot",
    assurance: "Safari booking handled for you",
  },
  gujarat: {
    overviewHeading: "A day-wise plan built around darshan timings and the drives between them",
    assurance: "Tickets & permits arranged for you",
  },
  ratings: PRODUCT_RATING_TILES,
};

export type PackageVariantContent = typeof PACKAGE_VARIANT_DEFAULTS;

export const PACKAGE_VARIANT_PAGE: PageDef<PackageVariantContent> = {
  id: "package-variant-pages",
  title: "Package variant pages (shared headings)",
  group: "Tour package pages",
  path: "/somnath-dwarka-tour-package/[slug]",
  alsoRevalidate: ["/somnath-dwarka-gir-tour-package/[slug]", "/gujarat-tour-packages/[slug]"],
  notes:
    "Headings and labels shared by every package variant page under /somnath-dwarka-tour-package/<slug>/, " +
    "/somnath-dwarka-gir-tour-package/<slug>/ and /gujarat-tour-packages/<slug>/ (a change shows on all of them). " +
    "labels: the overview eyebrow, the price card's 'Starts from' / 'On request' and its second line (includedLine), and the highlights, " +
    "itinerary and FAQ headings. flagship / gir / gujarat: each hub's overview heading (H2 above the package's answer) and the price card's " +
    "third line (assurance). flagship.headTermLine sits under the overview on /somnath-dwarka-tour-package/<slug>/ pages; it takes " +
    "[anchor](/path/) and **bold** and must keep its link to the home page (which owns the 'Somnath Dwarka tour package' term). " +
    "flagship.priceTiersHeading/priceTiersNote head the per-tier price table where a package has tiers. " +
    "ratings[{title, desc}] are the four tiles under the CTA band (icons follow the order). Their figures are claims: only use numbers the " +
    "business has confirmed, never invent ratings, review counts or traveller numbers. " +
    "Each package's own text is edited on its package item, not here.",
  defaults: PACKAGE_VARIANT_DEFAULTS,
};
