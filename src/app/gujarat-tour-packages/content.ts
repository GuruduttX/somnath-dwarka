import type { PageDef } from "@/src/lib/pages/types";
import { HUB_BLOCK_NOTES, TOUR_ARCHIVE_CTA_COPY, YATRA_BANNER_COPY } from "@/src/components/TourArchive/copy";

/*
  Copy of the state umbrella listing /gujarat-tour-packages/, editable through
  the CMS (the Claude connector's "page" type, id "gujarat-tour-packages").

  The CMS hub item with slug "gujarat-tour-packages" wins where it is filled:
  its title, meta_description, h1, answer_first and faq replace meta /
  headline / heroText / faqs here, and it alone carries the long-form blocks,
  related links, noindex, canonical and schema overrides. The package cards
  come from the site_gujarat_packages dataset, topped by the hub-spoke items.
*/

export const GUJARAT_HUB_DEFAULTS = {
  meta: {
    title: "Gujarat Tour Packages",
    description:
      "Gujarat tour packages with day-wise itineraries, inclusions and indicative prices — jyotirlinga circuits, Saurashtra darshan, UNESCO heritage, wildlife safaris and short temple trips.",
  },
  headline: { lead: "Gujarat", highlight: "Tour Packages" },
  heroText:
    "One state, four very different trips: the jyotirlinga coast at **Somnath and Dwarka**, the Saurashtra loop through **Gir and Palitana**, four UNESCO World Heritage sites, and short temple runs to Dakor, Pavagadh and Modhera. Pick a circuit below — prices shown are indicative until confirmed, and tickets are charged at actuals.",
  mobileImage: {
    src: "/images/home/StatueOfUnity.webp",
    alt: "The Statue of Unity in Gujarat",
    title: "Gujarat",
    region: "Western India",
  },
  stats: {
    plansLabel: "Curated plans",
    priceLabel: "Starts from*",
    priceFallback: "Custom",
    daysValue: "1–10",
    daysLabel: "Days on offer",
  },
  browseLabel: "Browse Packages",
  whatsappLabel: "Chat on WhatsApp",
  whatsappMessage: "Hi, I'd like a Gujarat tour package quote",
  intro: {
    headingHighlight: "Gujarat",
    headingRest: "Tour Packages",
    text: "Temple circuits, heritage routes and wildlife trails across the state — each one sequenced around darshan timings, safari slots and the drives that actually connect them.",
  },
  groups: {
    route: {
      title: "Choose your circuit",
      blurb: "Multi-day routes across the state — jyotirlingas, Saurashtra, heritage, wildlife.",
    },
    duration: {
      title: "Short pilgrimage trips",
      blurb: "One- and two-day temple runs that work from Ahmedabad or Vadodara.",
    },
    city: {
      title: "Choose by starting city",
      blurb: "Plans that begin at your arrival airport or station in Gujarat.",
    },
    traveller: {
      title: "For teams",
      blurb: "Corporate offsites with a conference room, coach transport and free afternoons.",
    },
  },
  cards: {
    defaultLocation: "Gujarat",
    groupTypeTraveller: "Corporate Group",
    groupTypeDuration: "Short Trip",
    groupTypeDefault: "Private Trip",
    badgeFromCity: "Starts from your city",
    badgeTraveller: "For teams",
    badgeDuration: "Short trip",
    badgeFirst: "Popular",
    badgeDefault: "Curated",
  },
  yatraBanner: YATRA_BANNER_COPY,
  faqHeading: "Planning a Gujarat Trip — Your Questions Answered",
  faqSubheading: "How long to take, what the price covers, when to come and what can be customised.",
  faqs: [
    {
      question: "How many days do I need for a Gujarat tour?",
      answer:
        "It depends what you are after. Four days covers the two jyotirlingas at Somnath and Nageshwar; a week does the Saurashtra loop with Gir and Palitana; ten days is the full state including Kutch and the Statue of Unity. Short temple trips like Dakor or Modhera run in one or two days from Ahmedabad.",
    },
    {
      question: "What does a Gujarat tour package include?",
      answer:
        "Hotel stays, a private vehicle with driver, daily breakfast and a planned day-wise itinerary. Monument tickets, ropeway fares and safari permits are charged at actuals, and air/train fare and lunch/dinner are excluded. Exact inclusions are listed on each package.",
    },
    {
      question: "When is the best time to visit Gujarat?",
      answer:
        "October to March. Summer gets hot enough to make midday sightseeing unpleasant, and the monsoon closes Gir and floods the Rann. December and January are peak — book early if your dates fall near the Rann Utsav or the holiday weeks.",
    },
    {
      question: "Can you build a custom Gujarat itinerary?",
      answer:
        "Yes — every package here is a starting point. We can change the length, start from your arrival city, combine circuits, and tune the hotel tier to your budget. Share your dates and what you most want to see.",
    },
  ],
  archiveCta: TOUR_ARCHIVE_CTA_COPY,
  schema: {
    name: "Gujarat Tour Packages",
    description:
      "Tour packages across Gujarat — jyotirlinga and temple circuits, Saurashtra darshan, UNESCO heritage sites and wildlife safaris, with private transport and hotels.",
    listName: "Gujarat Tour Packages",
  },
};

export type GujaratHubContent = typeof GUJARAT_HUB_DEFAULTS;

export const GUJARAT_HUB_PAGE: PageDef<GujaratHubContent> = {
  id: "gujarat-tour-packages",
  title: "Gujarat tour packages listing",
  group: "Tour package pages",
  path: "/gujarat-tour-packages/",
  notes:
    "The Gujarat umbrella package listing. meta, headline (lead + highlight; the highlight shows in the orange gradient), heroText and faqs are " +
    "fallbacks: the CMS hub item 'gujarat-tour-packages' wins for title, meta_description, h1, answer_first and faq whenever it has them, " +
    "so edit those there once it does. heroText takes **bold** (orange). mobileImage is the phone hero photo (src: /images/... or https URL). " +
    "stats: the plan count and the lowest price are computed; daysValue/daysLabel is the third stat. intro is the heading and text above the package list. " +
    "groups are the list's section headings: route = the multi-day circuits, duration = short temple trips, city = trips from outside Gujarat, " +
    "traveller = the corporate plan. cards are the small labels on the package cards (a card's location is its package item's location, " +
    "else cards.defaultLocation). " +
    HUB_BLOCK_NOTES +
    " The package cards themselves are the site_gujarat_packages dataset (and the CMS hub-spoke items).",
  defaults: GUJARAT_HUB_DEFAULTS,
};
