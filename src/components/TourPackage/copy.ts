/*
  Default copy of the package-detail layout (PackageDetailTemplate and the
  flagship variant route) and of the ProductRatings tiles. A plain module, not
  "use client": the variant routes read the CMS-editable copy (PageDef
  "package-variant-pages") on the server and pass it down as props; the
  components fall back to these constants when a caller passes nothing (e.g.
  the destination spoke pages), so server and client always agree.
*/

/** Headings and labels shared by every package-detail page. */
export type PackageDetailLabels = {
  overviewEyebrow: string;
  priceLabel: string;
  priceOnRequest: string;
  /** Second line of the price card. */
  includedLine: string;
  highlightsHeading: string;
  itineraryHeading: string;
  faqHeading: string;
};

export const PACKAGE_DETAIL_LABELS: PackageDetailLabels = {
  overviewEyebrow: "Package overview",
  priceLabel: "Starts from",
  priceOnRequest: "On request",
  includedLine: "Hotel, breakfast & vehicle included",
  highlightsHeading: "Trip highlights",
  itineraryHeading: "Day-wise itinerary",
  faqHeading: "Package FAQs",
};

/** One ProductRatings tile; the icons (people, star, heart, phone) follow the order. */
export type RatingTile = { title: string; desc: string };

export const PRODUCT_RATING_TILES: RatingTile[] = [
  { title: "3 Million+", desc: "Happy travelers from 70+ countries." },
  { title: "4.8 / 5", desc: "Top-rated experiences on Google & TripAdvisor." },
  { title: "Curated with Care", desc: "Thoughtfully designed spiritual journeys." },
  { title: "24/7 Support", desc: "Assistance before, during & after travel." },
];
