/**
 * The fare rate card, from its SOP.
 *
 * Single source for both /somnath-dwarka-taxi-service/fare-rate-card/ and the
 * fare calculator tool, so the two can never quote differently.
 *
 * Read the `fare` field carefully: the SOP prices exactly ONE leg — Somnath to
 * Dwarka (and its reverse) from ₹4,500 for a sedan. Every other route and every
 * vehicle is "confirmed at booking" / "on request", and the document gives no
 * per-kilometre rate for anything. Nothing here is interpolated from that single
 * figure: a route without a quoted price says so rather than showing a number
 * the business has not agreed to honour.
 */
import { OPERATOR } from "@/src/config/taxiSpokes";

export type RateCardRoute = {
  slug: string;
  label: string;
  /** Road estimate as the SOP words it. */
  distance: string;
  /** Numeric km for the calculator; null where the SOP gives a range. */
  km: number | null;
  /** Quoted fare, or null when the SOP says "confirmed at booking". */
  fare: string | null;
};

export const RATE_CARD_ROUTES: RateCardRoute[] = [
  { slug: "somnath-to-dwarka-taxi", label: "Somnath to Dwarka", distance: "233 km", km: 233, fare: "From ₹4,500 (sedan)" },
  { slug: "dwarka-to-somnath-cab", label: "Dwarka to Somnath", distance: "233 km", km: 233, fare: "From ₹4,500 (sedan)" },
  { slug: "ahmedabad-to-somnath-taxi", label: "Ahmedabad to Somnath", distance: "400 km", km: 400, fare: null },
  { slug: "ahmedabad-to-dwarka-taxi", label: "Ahmedabad to Dwarka", distance: "440 km", km: 440, fare: null },
  { slug: "rajkot-to-dwarka-taxi", label: "Rajkot to Dwarka", distance: "225 km", km: 225, fare: null },
  { slug: "jamnagar-to-dwarka-taxi", label: "Jamnagar to Dwarka", distance: "130 km", km: 130, fare: null },
  { slug: "veraval-to-dwarka-taxi", label: "Veraval to Dwarka", distance: "240 km", km: 240, fare: null },
  { slug: "veraval-to-somnath-taxi", label: "Veraval to Somnath", distance: "7 km", km: 7, fare: null },
  { slug: "ahmedabad-to-statue-of-unity-taxi", label: "Ahmedabad to Statue of Unity", distance: "200 km", km: 200, fare: null },
  { slug: "bhuj-to-white-rann-taxi", label: "Bhuj to White Rann", distance: "80 km", km: 80, fare: null },
  { slug: "rajkot-to-virpur-chotila-taxi", label: "Rajkot to Virpur and Chotila", distance: "55 to 65 km each", km: null, fare: null },
];

export const RATE_CARD_VEHICLES = [
  { slug: "innova-crysta", vehicle: "Innova Crysta", seats: "7", priced: "Per km with driver, on request" },
  { slug: "ertiga", vehicle: "Ertiga", seats: "6", priced: "Per km with driver, on request" },
  { slug: "tempo-traveller", vehicle: "Tempo Traveller", seats: "9 to 17", priced: "On request for the group and route" },
] as const;

/** Shown under the route table, verbatim from the SOP. */
export const RATE_CARD_DISCLAIMER = `Prices shown are indicative. The Somnath to Dwarka figure is a sedan base fare; other vehicles and round trips are priced on request. Send your route and dates to ${OPERATOR.phone} for a firm quote.`;

export const FARE_RATE_CARD = {
  titleTag: "Somnath Dwarka Taxi Fare | Rate Card",
  metaDescription:
    "See the Somnath Dwarka taxi fare rate card. Per km rates and route prices for Sedan, Ertiga, Innova Crysta and Tempo Traveller across Gujarat.",
  h1: "Somnath Dwarka Taxi Fare and Rate Card",
  crumbLabel: "Fare rate card",

  quickAnswer:
    "The Experience My India rate card prices every Somnath and Dwarka cab by the route, the vehicle and whether you travel one-way or round-trip, with the driver's charges included. Indicative sedan fares start around ₹4,500 for the 233 km Somnath to Dwarka leg, and every fare is confirmed in writing before you book. Ask for the full rate sheet, or open any route below for its price.",

  intro:
    "This is the price guide for cabs across the Somnath and Dwarka circuit, run by Experience My India, the local Gujarat unit operating since 2018. Fares are indicative and confirmed in writing before you book. Open any route for its own fare, or ask for the full rate sheet on WhatsApp.",

  atAGlance: [
    { label: "Priced by", value: "Route, vehicle, and one-way or round trip" },
    { label: "Vehicles", value: "Sedan, Ertiga, Innova Crysta and Tempo Traveller" },
    { label: "Driver charges", value: "Included in every fare" },
    { label: "Example", value: "Somnath to Dwarka, sedan, from ₹4,500 (indicative)" },
    { label: "Confirmed", value: "In writing before you book, with no hidden fees" },
    { label: "Get a quote", value: `Call or WhatsApp ${OPERATOR.phone}` },
  ],

  howFaresWork: {
    heading: "How our fares work",
    points: [
      "Fares are built from the route and the vehicle you choose, with the driver's charges always included.",
      "You pick one-way for a single drop, or round trip to keep the same car and driver for the return.",
      "Tolls, parking and state permits are shown in your quote where they apply, so the fare is all-in with no surprises.",
      "Multi-day trips add a driver night halt charge, which is stated up front.",
      "There are no hidden fees. The fare you agree in writing is the fare you pay.",
    ],
  },

  routes: {
    heading: "Fares by route",
    intro:
      "Every route has its own fare. Distances below are road estimates for a private cab. Open a route for its price, or send it to us for a firm all-in quote.",
  },

  vehicles: {
    heading: "Fares by vehicle",
    intro: "Each vehicle is priced per kilometre with the driver included. Open a vehicle for its seating and features.",
  },

  scope: {
    heading: "What every fare includes, and what it does not",
    includedTitle: "Included in every fare",
    included: [
      "An air-conditioned vehicle and fuel",
      "An experienced driver and the driver allowance",
      "GPS tracked, door to door travel",
      "A written fare confirmed before you travel",
    ],
    excludedTitle: "Shown separately in your quote where they apply",
    excluded: [
      "Tolls, parking and state permits",
      "Temple entry, boat tickets and guide charges",
      "Driver night halt charges on multi-day trips",
      "Sightseeing detours added mid-trip",
    ],
  },

  whyBook: {
    heading: "Why book with Experience My India",
    points: [
      `The local Gujarat unit of ${OPERATOR.parent}, ${OPERATOR.parentSlogan}, running Saurashtra yatras since ${OPERATOR.foundingDate}.`,
      `Drivers and guides who speak ${OPERATOR.languagesProse}, so pilgrims from the south travel with someone they can talk to.`,
      "A 4.5 star rating on Tripadvisor, across more than 2,400 completed trips.",
      "Transparent fares confirmed in writing, driver included, with no hidden tolls or parking.",
      "GPS tracked, air-conditioned cars, and airport meet and greet from Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar.",
      `A GST registered business, GSTIN ${OPERATOR.gstin}, with clear booking and cancellation terms.`,
    ],
    author: "Rates are maintained by Harsh Sharma, who leads the Gujarat operations.",
  },

  faq: [
    {
      question: "What is the per km taxi rate in Gujarat?",
      answer:
        "Each vehicle is priced per kilometre with the driver included, and the rate is confirmed before you book. Share your route and dates for a firm all-in quote.",
    },
    {
      question: "What is the Somnath to Dwarka taxi price?",
      answer:
        "Indicative sedan fares start around ₹4,500 for the 233 km leg. Other vehicles and round trips are priced on request and confirmed before booking.",
    },
    {
      question: "Are tolls, parking and driver charges included?",
      answer:
        "The driver's charges are included in every fare. Tolls, parking and permits are shown separately in your quote where they apply, so you see the all-in fare before you travel.",
    },
    {
      question: "Is a round trip cheaper than two one-way cabs?",
      answer:
        "Often, yes, since a round trip keeps the same car and driver. Share your plan and we quote both so you can compare.",
    },
    {
      question: "How do I get the full rate sheet?",
      answer: "Call or message us on WhatsApp with your route and dates, and we send a firm all-in fare.",
    },
    { question: "Which languages do your drivers speak?", answer: OPERATOR.languagesProse + "." },
  ],

  keepPlanning: {
    intro:
      "Back to all routes and vehicles on the taxi service hub. Price a popular leg, or compare the vehicles.",
    links: [
      { label: "Somnath Dwarka taxi service hub", href: "/somnath-dwarka-taxi-service/" },
      { label: "Somnath to Dwarka taxi", href: "/somnath-dwarka-taxi-service/somnath-to-dwarka-taxi/" },
      { label: "Ahmedabad to Somnath taxi", href: "/somnath-dwarka-taxi-service/ahmedabad-to-somnath-taxi/" },
      { label: "Innova Crysta", href: "/somnath-dwarka-taxi-service/innova-crysta/" },
      { label: "Ertiga", href: "/somnath-dwarka-taxi-service/ertiga/" },
      { label: "Tempo Traveller", href: "/somnath-dwarka-taxi-service/tempo-traveller/" },
    ],
  },

  cta: {
    heading: "Get your fare",
    body: `Send your route, dates and number of travellers, and we send a firm all-in fare with the vehicle confirmed. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
  },
} as const;
