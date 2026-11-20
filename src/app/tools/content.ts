import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of the planning tools, editable through the CMS (the connector's
  "page" type):
    "tools"          the index /tools/
    "tool-template"  headings shared by every /tools/<tool>/ page, plus the
                     words of the interactive itinerary planner and fare
                     calculator (ToolWidget is a client component, so the
                     page passes these in as props)
  Each tool's own title, intro, explainer and FAQ is its item in the
  site_tools dataset; the calculator's routes and fares are site_taxi_rate_card.
*/

export const TOOLS_PAGE_DEFAULTS = {
  meta: {
    title: "Somnath Dwarka Trip Planning Tools — Itinerary Builder & Fare Calculator",
    description:
      "Free online pilgrimage planning tools: calculate cab fares, build day-wise Saurashtra itineraries, check highway distances, and plan your Gujarat yatra budget.",
  },
  crumbLabel: "Planning Tools",
  h1: "Trip Planning Tools for Somnath & Dwarka",
  answerFirst:
    "Planning a Gujarat pilgrimage requires balancing temple aarti schedules, coastal highway distances, and group accommodation needs. Use our free, interactive trip-planning tools below to estimate outstation cab fares, craft realistic day-by-day itineraries, and calculate your total yatra budget without guesswork.",
  launchLabel: "Launch Tool",
  distances: {
    heading: "Saurashtra Highway Distance & Travel Time Reference",
    intro: "Reference driving distances and realistic travel times when building your Gujarat pilgrimage schedule:",
    columns: { segment: "Route Segment", distance: "Distance", time: "Driving Time", notes: "Highway Route & Highlights" },
    rows: [
      { segment: "Rajkot to Dwarka", distance: "225 km", time: "4.5 hours", notes: "Via Jamnagar & Khambhalia (NH 947). Smooth 4-lane highway." },
      { segment: "Dwarka to Bet Dwarka (Okha)", distance: "32 km", time: "40 minutes", notes: "Direct transit via the new 4-lane Sudarshan Setu cable-stayed bridge." },
      { segment: "Dwarka to Somnath", distance: "230 km", time: "4.5 to 5 hours", notes: "Scenic coastal highway NH 51 via Porbandar & Madhavpur Beach." },
      { segment: "Somnath to Sasan Gir", distance: "45 km", time: "1 hour", notes: "Pleasant rural road through Hiran River valley and mango orchards." },
      { segment: "Somnath to Diu Airport", distance: "85 km", time: "2 hours", notes: "Smooth coastal corridor through Kodinar." },
      { segment: "Somnath to Ahmedabad", distance: "410 km", time: "7.5 hours", notes: "Via Junagadh, Rajkot & Bagodara (NH 27 / NH 47)." },
    ],
  },
  budgeting: {
    heading: "Essential Pilgrimage Budgeting Guidelines",
    tips: [
      {
        title: "Transport Sizing",
        text: "For 1 to 4 passengers with light luggage, a Sedan (Dzire/Etios) offers peak efficiency. For 4 to 6 passengers or multi-generational families with strollers/luggage, an Ertiga or Innova Crysta is essential for legroom on longer highway stretches.",
      },
      {
        title: "Temple Proximity",
        text: "Booking hotels within 1 km of Dwarkadhish temple and Somnath mandir saves substantial daily auto-rickshaw costs and makes attending early 6:30 AM Mangla Aarti or late 7:00 PM Sandhya Aarti stress-free for senior citizens.",
      },
      {
        title: "Buffer Time Management",
        text: "Always budget a minimum of 2 hours for security checks, footwear deposit, and general darshan queue movement at major shrines during weekends, Ekadashi, and Purnima days.",
      },
    ],
  },
  faqHeading: "Frequently Asked Questions About Trip Tools",
  faqs: [
    {
      question: "How accurate is the online cab fare calculator?",
      answer:
        "Our cab fare calculator uses exact Saurashtra highway route distances and current commercial vehicle fuel/toll baselines. The computed estimate covers total vehicle rental, fuel, driver night allowances, and highway toll taxes with zero hidden extras.",
    },
    {
      question: "Can I customize the generated day-wise itinerary for elder family members?",
      answer:
        "Yes. The itinerary builder provides a realistic, time-tested framework that accounts for 2-hour darshan buffers, meal breaks, and coastal highway driving speeds (average 50–60 km/h). You can share the plan directly with our team to add wheelchair assistance or ground-floor hotel preferences.",
    },
    {
      question: "Are toll taxes and parking charges included in Gujarat cab estimates?",
      answer:
        "All dedicated tour package bookings and outstation cab quotes provided by Somnath Dwarka Tour Package include toll taxes, state permits, and temple parking charges, so you never have to make out-of-pocket cash payments on the highway.",
    },
  ],
  ctaContext: "Gujarat pilgrimage trip planning",
  schema: {
    name: "Somnath Dwarka Trip Planning Tools",
    description: "Free trip-planning tools for Somnath and Dwarka — an itinerary planner and a cab fare calculator.",
  },
};

export const TOOLS_PAGE: PageDef<typeof TOOLS_PAGE_DEFAULTS> = {
  id: "tools",
  title: "Planning tools index",
  group: "Tool pages",
  path: "/tools/",
  notes:
    "The tools index at /tools/. meta {title, description} are the SEO tags; h1 and answerFirst open the page; the tool cards come from the site_tools dataset " +
    "(launchLabel is their button); distances is the reference table (rows[{segment, distance, time, notes}]); budgeting.tips[{title, text}] are the three tip cards; " +
    "faqs[{question, answer}] also feed the FAQPage schema; schema {name, description} is the CollectionPage JSON-LD. answerFirst, distances.intro and the tip texts take " +
    "[link](/path/) and **bold**. Distances are road estimates: keep them in line with the taxi pages, and do not promise exact fares (the business quotes only Somnath–Dwarka).",
  defaults: TOOLS_PAGE_DEFAULTS,
};

export const TOOL_TEMPLATE_DEFAULTS = {
  crumbLabel: "Tools",
  tryItHeading: "Try it",
  explainerHeading: "How it works",
  faqHeading: "Tool FAQs",
  /** The interactive itinerary planner (tools whose tool_type is "itinerary-planner"). */
  planner: {
    daysLabel: "Days",
    /** Option text in the days picker; {days} is the number. */
    daysOption: "{days} days",
    startLabel: "Starting city",
    startCities: ["Ahmedabad", "Rajkot", "Mumbai"],
    /** Days picked when the planner opens. */
    defaultDays: 4,
    /** One plan per length; each step is one day. */
    plans: [
      { days: 3, steps: ["Dwarka darshan + Nageshwar", "Drive to Somnath, evening aarti", "Somnath darshan, depart"] },
      { days: 4, steps: ["Arrive Dwarka, aarti", "Nageshwar + Bet Dwarka", "Drive to Somnath, aarti + show", "Somnath darshan, depart"] },
      { days: 5, steps: ["Arrive Dwarka", "Dwarka sightseeing", "Drive to Somnath via Porbandar", "Somnath + Triveni Sangam", "Buffer / depart"] },
    ],
    ctaLabel: "Get a quote for this plan",
    ctaHref: "/somnath-dwarka-tour-package/",
  },
  /** The fare calculator (tool_type "fare-calculator"); its routes and fares are the site_taxi_rate_card dataset. */
  calculator: {
    routeLabel: "Route",
    distanceLabel: "Distance",
    fareLabel: "Indicative fare",
    noFareLabel: "Confirmed at booking",
    pricedNote: "Sedan base fare, indicative. Other vehicles and round trips are priced on request.",
    unpricedNote: "This route is quoted per trip. Send your dates for a firm all-in fare.",
    ctaLabel: "Get a firm fare",
    ctaHref: "/somnath-dwarka-taxi-service/fare-rate-card/",
  },
};

export type ToolWidgetCopy = Pick<typeof TOOL_TEMPLATE_DEFAULTS, "planner" | "calculator">;

export const TOOL_TEMPLATE_PAGE: PageDef<typeof TOOL_TEMPLATE_DEFAULTS> = {
  id: "tool-template",
  title: "Tool pages (shared copy)",
  group: "Tool pages",
  path: "/tools/[tool]",
  notes:
    "Copy shared by every tool page (/tools/<tool>/): the section headings, and the words of the two interactive widgets. planner: the itinerary planner's labels, " +
    "startCities[], defaultDays and plans[{days, steps[]}] (one step per day; the days picker lists the plans in order); calculator: the fare calculator's labels and notes " +
    "(its routes and fares come from site_taxi_rate_card). Each tool's own title/intro/explainer/FAQ is its item in site_tools. Plain text.",
  defaults: TOOL_TEMPLATE_DEFAULTS,
};
