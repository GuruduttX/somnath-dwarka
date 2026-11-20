import type { PageDef } from "@/src/lib/pages/types";
import { TAXI_HUB } from "@/src/config/taxiHub";

/*
  Copy of the taxi hub /somnath-dwarka-taxi-service/, editable through the CMS
  (the connector's "page" type, id "taxi-hub"). The prose stays in
  src/config/taxiHub.ts as the default; the words that were written inline in
  the page and its card grid are added here. The route and vehicle cards come
  from the published `taxi` CMS items, the airport cards from the
  site_airport_taxis dataset.
*/

export const TAXI_HUB_DEFAULTS = {
  ...TAXI_HUB,
  /** The two figures shown in the hero's info strip. */
  hero: { distance: "about 233 km", duration: "4.5 to 5 hours" },
  atAGlanceHeading: "At a glance",
  routesEyebrow: "Saurashtra Highway Segments",
  rateCardLinkLabel: "View fare rate card",
  vehiclesEyebrow: "Verified Fleet comfort",
  airportsEyebrow: "Meet & Greet Pickup Service",
  faqHeading: "Somnath Dwarka taxi FAQs",
  /**
   * The checklist and luggage pill on each vehicle card. A card uses the first
   * entry whose `match` appears in the vehicle name (lowercase), else `vehicleCardDefault`.
   */
  vehicleCards: [
    {
      match: "innova",
      badge: "★ Premium Standard",
      luggage: "4 bags",
      features: [
        "Dual AC vents & blower control",
        "Adjustable Captain seats with armrests",
        "Generous cargo volume (4 large suitcases)",
        "Premium highway suspension comfort",
      ],
    },
    {
      match: "ertiga",
      badge: "",
      luggage: "3 bags",
      features: [
        "Roof-mounted rear AC vents",
        "Comfortable seating for up to 6 passenger seats",
        "Flexible third-row boot layout",
        "Best balance of cost and utility",
      ],
    },
  ],
  vehicleCardDefault: {
    luggage: "2 bags",
    features: [
      "AC climate control cabin",
      "Experienced highway pilot driver",
      "Fully sanitised dashboard & sheets",
      "24/7 client roadside assistance",
    ],
  },
};


export const TAXI_HUB_PAGE: PageDef<typeof TAXI_HUB_DEFAULTS> = {
  id: "taxi-hub",
  title: "Taxi service hub",
  group: "Taxi pages",
  path: "/somnath-dwarka-taxi-service/",
  notes:
    "The taxi hub at /somnath-dwarka-taxi-service/. titleTag/metaDescription are the SEO tags; h1 and quickAnswer open the hero (hero.distance/duration are its two figures); " +
    "atAGlance[{label, value, note?}] is the fact strip (note is an optional muted second line) followed by intro; wholeYatra {heading, body[]} is one paragraph per string; " +
    "routes / vehicles / airports {heading, intro} head the three card sections (the cards themselves come from the published `taxi` CMS items and the site_airport_taxis dataset); " +
    "fareScope is the included/excluded block; whyBook {heading, points[], author, authorLinks[{label, href}]} closes with the author line; notForYou, beforeYouTravel, " +
    "howToBook {heading, steps[]}, faq[{question, answer}] (also the FAQPage schema), keepPlanning {heading, intro, links[]}, cta {heading, subtitle, body}. " +
    "vehicleCards[{match, badge, luggage, features[]}] are the checklists on the vehicle cards (matched by a lowercase word in the vehicle name; badge '' shows none), vehicleCardDefault for any other vehicle. " +
    "intro, wholeYatra.body, routes/vehicles/airports.intro, fareScope.note and keepPlanning.intro take [link](/path/) and **bold**. " +
    "The Tripadvisor rating and '2,400+ trips' are the business's own claims: never raise them or invent reviews; fares stay 'indicative, confirmed at booking'.",
  defaults: TAXI_HUB_DEFAULTS,
};
