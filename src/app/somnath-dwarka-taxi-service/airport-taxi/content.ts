import type { PageDef } from "@/src/lib/pages/types";
import {
  AIRPORT_AUTHOR,
  AIRPORT_SCOPE,
  AIRPORT_VEHICLES_INTRO,
  MEET_AND_GREET_BODY,
} from "@/src/config/taxiSpokes";

/*
  Copy of the airport taxi pages, editable through the CMS (the connector's
  "page" type):
    "taxi-airports"          the index /somnath-dwarka-taxi-service/airport-taxi/
    "taxi-airport-template"  blocks shared by every /airport-taxi/<airport>/ page
  The airports themselves (name, distance, fares, ...) are the
  site_airport_taxis dataset, and one airport page's own copy is its item in
  site_taxi_airport_copy.
*/

export const AIRPORT_INDEX_DEFAULTS = {
  meta: {
    title: "Airport Taxi for Somnath & Dwarka — Transfers & Fares",
    description:
      "Pre-booked airport taxis from Diu, Rajkot, Jamnagar and Ahmedabad to Somnath and Dwarka. Meet-and-greet transfers with indicative fares by vehicle.",
  },
  h1: "Airport Taxi for Somnath & Dwarka",
  intro:
    "Arriving by air? We arrange pre-booked airport taxis from Diu, Rajkot, Jamnagar, and Ahmedabad to Somnath and Dwarka, with meet-and-greet reception right at the arrival terminal.",
  badge: "Airport pick-up",
  airportsHeading: "Select departure airport",
  airportsIntro:
    "Choose the airport you are landing at to view driving distances, travel times, and vehicle fare options.",
  ctaBand: { title: "Book an airport transfer", subtitle: "Share your flight details for a firm fare." },
  schema: {
    name: "Airport Taxi for Somnath & Dwarka",
    description:
      "Pre-booked meet-and-greet airport transfers from Diu, Rajkot, Jamnagar and Ahmedabad to Somnath and Dwarka.",
  },
};

export const AIRPORT_INDEX_PAGE: PageDef<typeof AIRPORT_INDEX_DEFAULTS> = {
  id: "taxi-airports",
  title: "Airport taxi index",
  group: "Taxi pages",
  path: "/somnath-dwarka-taxi-service/airport-taxi/",
  notes:
    "The airport taxi index at /somnath-dwarka-taxi-service/airport-taxi/. meta {title, description} are the SEO tags; h1, intro and badge fill the hero; " +
    "airportsHeading/airportsIntro head the airport cards, which come from the " +
    "site_airport_taxis dataset; ctaBand is the closing booking band; schema {name, description} is the Service JSON-LD. airportsIntro takes [link](/path/) and **bold**.",
  defaults: AIRPORT_INDEX_DEFAULTS,
};

export const AIRPORT_TEMPLATE_DEFAULTS = {
  atAGlanceHeading: "At a glance",
  meetAndGreetHeading: "Meet and greet at {airport} airport",
  meetAndGreetBody: MEET_AND_GREET_BODY,
  vehiclesHeading: "Vehicles and fares",
  vehiclesIntro: AIRPORT_VEHICLES_INTRO,
  /** Shown instead of vehiclesIntro on an airport with no copy item. */
  vehiclesIntroFallback: "Pick your car by group size.",
  rateCardLinkLabel: "See every price on the fare rate card",
  scopeHeading: "What your transfer includes, and what it does not",
  scope: {
    includedTitle: AIRPORT_SCOPE.includedTitle,
    included: [...AIRPORT_SCOPE.included],
    excludedTitle: AIRPORT_SCOPE.excludedTitle,
    excluded: [...AIRPORT_SCOPE.excluded],
  },
  author: { line: AIRPORT_AUTHOR.line, links: AIRPORT_AUTHOR.links.map((l) => ({ label: l.label, href: l.href })) },
  notForYouHeading: "This transfer may not be the right fit if",
  beforeYouFlyHeading: "Before you fly in",
  faqHeading: "{airport} airport taxi FAQs",
  keepPlanningHeading: "Keep planning",
  callLabel: "Call",
  ctaBand: { title: "Book an airport transfer", subtitle: "Send your flight details for a firm meet-and-greet fare." },
};

export const AIRPORT_TEMPLATE_PAGE: PageDef<typeof AIRPORT_TEMPLATE_DEFAULTS> = {
  id: "taxi-airport-template",
  title: "Airport taxi pages (shared copy)",
  group: "Taxi pages",
  path: "/somnath-dwarka-taxi-service/airport-taxi/[airport]",
  notes:
    "Headings and blocks shared by every airport page (/somnath-dwarka-taxi-service/airport-taxi/<airport>/). One airport's own copy is its item in site_taxi_airport_copy, " +
    "its facts (distance, fares) its item in site_airport_taxis. meetAndGreetHeading and faqHeading may use {airport}; meetAndGreetBody and vehiclesIntro take " +
    "[link](/path/) and **bold**; scope is the included/excluded list; author {line, links[{label, href}]} closes the why-book block; ctaBand is the closing booking band. " +
    "Changing a value here changes every airport page.",
  defaults: AIRPORT_TEMPLATE_DEFAULTS,
};
