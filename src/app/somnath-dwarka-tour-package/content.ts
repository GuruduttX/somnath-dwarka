import type { PageDef } from "@/src/lib/pages/types";
import { HEAD_TERM_ANCHOR, HEAD_TERM_HUB } from "@/src/lib/links";
import {
  EXPLORER_GROUP_COPY,
  HUB_BLOCK_NOTES,
  TOUR_ARCHIVE_CTA_COPY,
  YATRA_BANNER_COPY,
} from "@/src/components/TourArchive/copy";

/*
  Copy of the package listing /somnath-dwarka-tour-package/, editable through
  the CMS (the Claude connector's "page" type, id "somnath-dwarka-tour-package").

  The CMS hub item with slug "somnath-dwarka-tour-package" still drives the
  long-form blocks under the package list, noindex, canonical and schema
  overrides, and its answer_first / faq win over heroText / faqs here when
  filled. The package cards come from the CMS package items and the
  site_packages dataset; the stats' plan count and lowest price are computed.
*/

export const SD_PACKAGES_HUB_DEFAULTS = {
  meta: {
    title: "Compare Somnath Dwarka Tour Packages by Days, City & Budget",
    description:
      "Compare Somnath Dwarka tour packages side by side: 1 to 6 days, from your city, by car, bus or train, budget to luxury, each with a day-wise itinerary.",
  },
  h1: "Compare Somnath Dwarka Tour Packages",
  hero: {
    eyebrow: "Jyotirlinga & Char Dham circuit",
    text:
      "Our Somnath Dwarka tour packages cover **Dwarkadhish Temple**, Nageshwar Jyotirlinga, Bet Dwarka and **Somnath Temple** with the evening aarti, using private transport and hand-picked hotels. Choose by duration, starting city or budget below — every plan is sequenced around darshan timings, and prices shown are indicative until confirmed.",
    mobileImage: { alt: "Somnath and Dwarka temples", title: "Somnath & Dwarka", region: "Gujarat, India" },
    tilesLeft: [
      { img: "/images/places/somnath/somnath-temple.webp", name: "Somnath Temple", place: "Prabhas Patan", tag: "Jyotirlinga" },
      { img: "/images/places/somnath/somnath-beach.webp", name: "Somnath Beach", place: "Veraval", tag: "Sunset" },
    ],
    tilesRight: [
      { img: "/images/places/dwarka/nageshwar-jyotirlinga.webp", name: "Nageshwar", place: "Bet Dwarka road", tag: "Darshan" },
      { img: "/images/places/dwarka/dwarkadhish-temple.webp", name: "Dwarkadhish", place: "Dwarka", tag: "Char Dham" },
    ],
    browseLabel: "Browse Packages",
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: "Hi, I'd like a Somnath Dwarka tour package quote",
    stats: {
      plansLabel: "Curated plans",
      priceLabel: "Starts from*",
      priceFallback: "Custom",
      daysValue: "4–5",
      daysLabel: "Days circuit",
    },
  },
  intro: {
    headingHighlight: "Somnath & Dwarka",
    headingRest: "Tour Packages",
    text: "Handcrafted spiritual journeys with VIP darshan, comfortable stays, and expert guides — made for families, pilgrims, and couples.",
    pickerText: `Not sure which to pick? Most travellers start with our [${HEAD_TERM_ANCHOR}](${HEAD_TERM_HUB}): 2 nights, 3 days, named hotels and three price tiers.`,
  },
  groups: EXPLORER_GROUP_COPY,
  cards: {
    fromCityLocationTail: "to Dwarka & Somnath",
    defaultLocation: "Dwarka, Bet Dwarka, Somnath",
    groupTypeBudget: "Budget Trip",
    groupTypeTraveller: "Family Trip",
    groupTypeDefault: "Private Trip",
    badgeFromCity: "Starts from your city",
    badgeBudget: "Budget Pick",
    badgeTraveller: "Family Friendly",
    badgeFirst: "Popular",
    badgeDefault: "Curated",
  },
  yatraBanner: YATRA_BANNER_COPY,
  faqHeading: "Everything About Your Divine Gujarat Journey",
  faqSubheading:
    "Find answers to the most common questions about Dwarka Somnath tours, spiritual journeys, temple darshan and Gujarat pilgrimage experiences.",
  faqs: [
    {
      question: "What does a Somnath Dwarka tour package include?",
      answer:
        "Most packages include hotel stays, a private vehicle with driver, daily breakfast and a temple-sequenced itinerary. Air/train fare and lunch/dinner are usually excluded. Exact inclusions are listed on each variant.",
    },
    {
      question: "How much does a Somnath Dwarka tour package cost?",
      answer:
        "Prices shown are indicative starting points pending confirmation and vary by duration, starting city, hotel tier and group size. Share your dates for a firm quote.",
    },
    {
      question: "How many days are ideal for Somnath and Dwarka?",
      answer:
        "Three days is the minimum to cover both temples; four to five days is more comfortable and adds Nageshwar, Bet Dwarka and Porbandar.",
    },
    {
      question: "Can I customise the itinerary and starting city?",
      answer:
        "Yes — every package is a starting point. We can adjust the number of days, add pickup from your city, include extra stops like Porbandar or Bhalka Tirth, and tune the hotel tier to your budget. Share your dates and preferences for a tailored plan.",
    },
  ],
  archiveCta: TOUR_ARCHIVE_CTA_COPY,
  schema: {
    description: "Pilgrimage tour packages covering Somnath and Dwarka temples with private transport and hotels.",
    listName: "Somnath Dwarka Tour Packages",
  },
};

export type SdPackagesHubContent = typeof SD_PACKAGES_HUB_DEFAULTS;

export const SD_PACKAGES_HUB_PAGE: PageDef<SdPackagesHubContent> = {
  id: "somnath-dwarka-tour-package",
  title: "Somnath Dwarka tour packages listing",
  group: "Tour package pages",
  path: "/somnath-dwarka-tour-package/",
  notes:
    "The package listing page. meta.title / h1 target the comparison intent on purpose: the home page owns the bare head term " +
    `"Somnath Dwarka tour package", so do not make the title or H1 just that phrase (the two pages would compete). ` +
    "h1: the words 'Tour Package' in it show in the orange gradient. hero.text is the line under the H1 (**bold** shows orange) and is used only " +
    "while the CMS hub item 'somnath-dwarka-tour-package' has no answer_first; likewise faqs show only while that hub item has no FAQ — " +
    "edit them there once it has. hero.tilesLeft/tilesRight are the four desktop photo tiles (img: /images/... path or https URL). " +
    "hero.stats: the plan count and the lowest price are computed; daysValue/daysLabel is the third stat. " +
    "intro is the heading and text above the package list (headingHighlight shows orange); intro.pickerText takes [anchor](/path/) and **bold** " +
    "and should keep its link to the home page. groups are the list's section headings and blurbs (duration, city, traveller, route, transport); " +
    "the filter labels are made from the titles minus 'Choose by '. cards are the small labels on the seed-only package cards " +
    "(from-city cards read '<city> ' + fromCityLocationTail). " +
    HUB_BLOCK_NOTES +
    " The package cards themselves are edited as CMS package items or in the site_packages dataset.",
  defaults: SD_PACKAGES_HUB_DEFAULTS,
};
