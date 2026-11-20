import type { PageDef } from "@/src/lib/pages/types";
import { CORE_FACTS } from "@/src/config/site";

/*
  Copy of /plan/ (PLAN_PAGE) and the words shared by every planning guide
  /plan/<slug>/ (PLAN_GUIDE_TEMPLATE_PAGE), editable through the CMS ("page"
  type). Each planning guide's own content is its item in the site_plan_guides
  dataset (src/lib/cms-groups/destinations.ts). The "Compare & decide" block on
  /plan/ is edited separately.
*/

export const PLAN_PAGE_DEFAULTS = {
  meta: {
    title: "Plan Your Somnath Dwarka Trip — Distance, Days & Routes",
    description:
      "Planning guides for the Somnath–Dwarka pilgrimage: distance and drive time, how many days you need, which temple to visit first, and sample itineraries.",
  },
  hero: {
    h1: { before: "Plan your", highlight: "Somnath Dwarka", after: "trip" },
    intro:
      "Everything you need before you book — distance and drive time, how many days you need, which temple to visit first, and ready-made **day-wise itineraries**.",
    facts: [
      { icon: "route", label: "≈ 233 km", sub: "Dwarka ↔ Somnath" },
      { icon: "clock", label: "4.5–5 hr", sub: "Drive time" },
      { icon: "calendar", label: "3–5 days", sub: "Ideal circuit" },
    ],
    ctaLabel: "Plan My Trip",
    whatsappLabel: "Ask on WhatsApp",
    whatsappMessage: "Hi, help me plan a Somnath Dwarka trip",
    card: {
      title: "Journey at a glance",
      subtitle: "Classic 3-day circuit",
      badge: "≈ 233 km",
      stops: [
        { name: "Dwarka", d: "Day 1" },
        { name: "Porbandar", d: "En route" },
        { name: "Somnath", d: "Day 2–3" },
      ],
      days: [
        { d: "Day 1", t: "Dwarka darshan" },
        { d: "Day 2", t: "Drive + aarti" },
        { d: "Day 3", t: "Somnath" },
      ],
    },
  },
  guides: {
    eyebrow: "Planning guides",
    heading: { before: "Answers before you", highlight: "book" },
    intro:
      "Start with the question closest to your trip — distance, trip length, route order, or a ready-made day-wise itinerary.",
  },
  cards: {
    itineraryLabel: "Day-wise itinerary",
    routeLabel: "Distance & route",
    tipLabel: "Planning tip",
    dayPlan: "{days}-day plan",
    readMore: "Read the guide",
  },
  faqHeading: "Trip planning FAQs",
  faqSubheading: "Quick answers to the questions travellers ask before booking.",
  faqs: [
    {
      question: "How many days do you need for Somnath and Dwarka?",
      answer:
        "Plan 3–5 days. Three days covers both temples at a brisk pace; four to five days adds Nageshwar, Bet Dwarka and Porbandar with unhurried darshan and no long single-day drives.",
    },
    {
      question: "What is the distance between Somnath and Dwarka?",
      answer: `The road distance is ${CORE_FACTS.dwarkaSomnathDistance.value} and takes ${CORE_FACTS.dwarkaSomnathDuration.value}, typically via Porbandar.`,
    },
    {
      question: "Should I visit Somnath or Dwarka first?",
      answer:
        "Either order works — pick the temple town closer to your entry point to avoid backtracking. Flying into Diu, start with Somnath; arriving via Jamnagar, start with Dwarka.",
    },
    {
      question: "What is the best time to visit?",
      answer:
        "October to March offers pleasant coastal weather. Avoid peak monsoon if you plan the Bet Dwarka ferry crossing, which can be disrupted by rough seas.",
    },
    {
      question: "Is there a direct train between Somnath and Dwarka?",
      answer:
        "There is no convenient direct train. Most pilgrims cover the route by road, which is the practical option when visiting both temples.",
    },
  ],
  ctaContext: "Somnath Dwarka trip planning",
  relatedHeading: "Related guides & services",
  related: [
    { target: "/tools/itinerary-planner/", anchor: "Gujarat Itinerary Planner", type: "tool" },
    { target: "/circuits/gandhi-circuit-gujarat/", anchor: "Gandhi Circuit Gujarat", type: "circuit" },
    { target: "/somnath/", anchor: "Somnath Travel Guide", type: "pillar" },
    { target: "/dwarka/", anchor: "Dwarka Travel Guide", type: "pillar" },
    { target: "/somnath-dwarka-taxi-service/", anchor: "Book Taxi Service", type: "sibling" },
    { target: "/somnath-dwarka-tour-package/", anchor: "Tour Packages", type: "money" },
  ],
  schema: {
    name: "Plan Your Somnath Dwarka Trip",
    description:
      "Trip-planning answers for Somnath and Dwarka — how many days, best routes, distances and season tips.",
  },
};

export type PlanCopy = typeof PLAN_PAGE_DEFAULTS;
export type PlanHeroCopy = PlanCopy["hero"];
export type PlanCardLabels = PlanCopy["cards"];

export const PLAN_PAGE: PageDef<PlanCopy> = {
  id: "plan",
  title: "Plan your trip (/plan/)",
  group: "Destination pages",
  path: "/plan/",
  notes:
    "Copy of /plan/. The planning-guide cards are the site_plan_guides dataset items (one per /plan/<slug>/ page). " +
    "hero.h1 is split in three so the middle part gets the gradient; hero.intro takes **bold** and [links](/path/); " +
    "hero.facts[{icon: route|clock|calendar, label, sub}] are the chips under the intro; hero.card is the \"Journey at a " +
    "glance\" card. cards.* are the labels on the guide cards ({days} = number of itinerary days). related[{target, " +
    "anchor, type}] are the link cards under the CTA; type is one of pillar, money, sibling, tool, circuit (it sets the " +
    "small label and icon). Keep distances and drive times in line with the planning guides; do not state unverified " +
    "facts as verified.",
  defaults: PLAN_PAGE_DEFAULTS,
};

export const PLAN_GUIDE_TEMPLATE_DEFAULTS = {
  crumbLabel: "Plan",
  modes: { title: "Distance & modes", columns: ["Mode", "Distance", "Time", "Notes"], verifyLabel: "Distances & times" },
  months: { title: "Month by month", columns: ["Month", "Weather", "Crowds", "Worth knowing"] },
  itineraryTitle: "Sample itinerary",
  faqHeading: "FAQs",
  pillarAnchor: "all trip-planning guides",
};

export const PLAN_GUIDE_TEMPLATE_PAGE: PageDef<typeof PLAN_GUIDE_TEMPLATE_DEFAULTS> = {
  id: "plan-guide-template",
  title: "Planning guide pages (template copy)",
  group: "Destination pages",
  path: "/plan/[topic]",
  notes:
    "Section headings shared by every planning guide at /plan/<slug>/. Each guide's own title, h1, question, " +
    "direct_answer, modes table, month table, itinerary and FAQ are its item in the site_plan_guides dataset. " +
    "*.columns are the table column headings (keep their number: Mode/Distance/Time/Notes and Month/Weather/Crowds/" +
    "Worth knowing).",
  defaults: PLAN_GUIDE_TEMPLATE_DEFAULTS,
};
