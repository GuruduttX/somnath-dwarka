import type { PageDef } from "@/src/lib/pages/types";
import { FARE_RATE_CARD, RATE_CARD_DISCLAIMER, RATE_CARD_VEHICLES } from "@/src/config/taxiFares";
import { SPOKE_AUTHOR } from "@/src/config/taxiSpokes";

/*
  Copy of /somnath-dwarka-taxi-service/fare-rate-card/, editable through the
  CMS (the connector's "page" type, id "taxi-fare-rate-card"). The prose stays
  in src/config/taxiFares.ts as the default. The route rows (and their one
  quoted fare) are the site_taxi_rate_card dataset, which the fare calculator
  at /tools/distance-fare-calculator/ reads too, so the two never disagree.
*/

export const FARE_RATE_CARD_DEFAULTS = {
  ...FARE_RATE_CARD,
  atAGlanceHeading: "At a glance",
  /** Shown in the Fare column (and the calculator) for a route without a quoted fare. */
  noFareLabel: "Confirmed at booking",
  /** Shown under the route table. */
  disclaimer: RATE_CARD_DISCLAIMER,
  /** The "Fares by vehicle" table; each slug also links to /somnath-dwarka-taxi-service/<slug>/. */
  vehicleRows: RATE_CARD_VEHICLES.map((v) => ({ slug: v.slug, vehicle: v.vehicle, seats: v.seats, priced: v.priced })),
  authorLinks: SPOKE_AUTHOR.links.map((l) => ({ label: l.label, href: l.href })),
  faqHeading: "Fare and rate card FAQs",
  keepPlanningHeading: "Keep planning",
  callLabel: "Call",
  ctaBand: { title: "Get your fare", subtitle: "Send your route and dates for a firm all-in price." },
};

export const FARE_RATE_CARD_PAGE: PageDef<typeof FARE_RATE_CARD_DEFAULTS> = {
  id: "taxi-fare-rate-card",
  title: "Taxi fare rate card",
  group: "Taxi pages",
  path: "/somnath-dwarka-taxi-service/fare-rate-card/",
  notes:
    "The fare rate card at /somnath-dwarka-taxi-service/fare-rate-card/. titleTag/metaDescription are the SEO tags; h1 and quickAnswer open the page; atAGlance[{label, value}] then intro; " +
    "howFaresWork {heading, points[]}; routes {heading, intro} heads the route table, whose rows are the site_taxi_rate_card dataset (noFareLabel fills a route without a fare, " +
    "disclaimer sits under it); vehicles {heading, intro} heads vehicleRows[{slug, vehicle, seats, priced}]; scope is the included/excluded block; whyBook {heading, points[], author} " +
    "plus authorLinks[{label, href}]; faq[{question, answer}] (also the FAQPage schema); keepPlanning {intro, links[]}; cta {heading, body}; ctaBand is the closing band. " +
    "intro, routes.intro, vehicles.intro, disclaimer, keepPlanning.intro and cta.body take [link](/path/) and **bold**. " +
    "Pricing rule: the business has agreed exactly one price (Somnath to Dwarka, sedan, from ₹4,500); never invent other fares or per-km rates.",
  defaults: FARE_RATE_CARD_DEFAULTS,
};
