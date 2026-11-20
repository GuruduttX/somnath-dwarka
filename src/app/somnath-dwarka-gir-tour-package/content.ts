import type { PageDef } from "@/src/lib/pages/types";
import {
  EXPLORER_GROUP_COPY,
  HUB_BLOCK_NOTES,
  TOUR_ARCHIVE_CTA_COPY,
  YATRA_BANNER_COPY,
} from "@/src/components/TourArchive/copy";

/*
  Copy of the Gir triangle listing /somnath-dwarka-gir-tour-package/, editable
  through the CMS (the Claude connector's "page" type, id
  "somnath-dwarka-gir-tour-package").

  The CMS hub item with slug "somnath-dwarka-gir-tour-package" wins where it
  is filled: its title, meta_description, h1, answer_first and faq replace
  meta / headline / heroText / faqs here, and it alone carries the long-form
  blocks, related links, noindex, canonical and schema overrides. The package
  cards come from the site_gir_packages dataset, topped by the hub-spoke items.
*/

export const GIR_HUB_DEFAULTS = {
  meta: {
    title: "Somnath Dwarka Gir Tour Package",
    description:
      "Somnath Dwarka Gir tour packages with day-wise itinerary, safari planning, inclusions and indicative prices. Choose by duration, starting city or traveller.",
  },
  headline: { lead: "Somnath Dwarka Gir", highlight: "Tour Package" },
  heroText:
    "These packages run the Saurashtra triangle — **Dwarkadhish Temple**, Nageshwar Jyotirlinga, **Somnath Temple** with the evening aarti, and a morning safari in **Gir National Park**. Every plan is sequenced around darshan timings and the safari's morning slot; prices shown are indicative until confirmed, and the safari permit is booked separately at actuals.",
  mobileImage: {
    src: "/images/gir/gir-hero.webp",
    alt: "Gir National Park, Somnath and Dwarka",
    title: "Somnath, Dwarka & Gir",
    region: "Saurashtra, Gujarat",
  },
  stats: {
    plansLabel: "Curated plans",
    priceLabel: "Starts from*",
    priceFallback: "Custom",
    daysValue: "4–6",
    daysLabel: "Days circuit",
  },
  browseLabel: "Browse Packages",
  whatsappLabel: "Chat on WhatsApp",
  whatsappMessage: "Hi, I'd like a Somnath Dwarka Gir tour package quote",
  intro: {
    headingHighlight: "Somnath, Dwarka & Gir",
    headingRest: "Tour Packages",
    text: "Two jyotirlinga-circuit temples, the Dwarkadhish darshan and a morning with Asia's only wild lions — planned as one trip, with the safari booked around your dates.",
  },
  groups: {
    duration: {
      title: EXPLORER_GROUP_COPY.duration.title,
      blurb: "From a compressed 3-day run to an unhurried 6-day loop with a spare safari morning.",
    },
    city: {
      title: EXPLORER_GROUP_COPY.city.title,
      blurb: "Private round trips with pickup and drop from your city, with Gir on the return leg.",
    },
    traveller: {
      title: "Choose by traveller",
      blurb: "Plans tuned for families, senior travellers or a group with several safari jeeps.",
    },
    route: {
      title: "Add a destination",
      blurb: "Extend the circuit with Diu's beaches or Junagadh and the Girnar climb.",
    },
  },
  cards: {
    fromCityLocationTail: "to Dwarka, Somnath & Gir",
    defaultLocation: "Dwarka, Somnath, Sasan Gir",
    groupTypeGroup: "Group Trip",
    groupTypeTraveller: "Family Trip",
    groupTypeDefault: "Private Trip",
    badgeFromCity: "Starts from your city",
    badgeAddon: "Extended circuit",
    badgeSeniors: "Easy pace",
    badgeTraveller: "Family Friendly",
    badgeFirst: "Popular",
    badgeDefault: "Curated",
  },
  yatraBanner: YATRA_BANNER_COPY,
  faqHeading: "Somnath, Dwarka & Gir — Your Questions Answered",
  faqSubheading: "Safari slots, park closures, darshan timings and what the package price actually covers.",
  faqs: [
    {
      question: "What does a Somnath Dwarka Gir tour package include?",
      answer:
        "Hotel stays, a private vehicle with driver, daily breakfast, a temple-sequenced itinerary and help booking your Gir safari. The safari permit and jeep are charged separately at actuals, and air/train fare and lunch/dinner are excluded. Exact inclusions are listed on each variant.",
    },
    {
      question: "How many days do I need for Somnath, Dwarka and Gir?",
      answer:
        "Four days is the working minimum, because the safari has to be a morning departure and the drive from Somnath to Sasan Gir takes most of a day. Five days is the comfortable version and leaves a fallback morning if a safari slot falls through.",
    },
    {
      question: "Is the Gir safari included in the package price?",
      answer:
        "No. Safari permits and jeeps are booked through the forest department's online system and charged at actuals — we handle the booking and share the confirmation, but the price is not ours to quote.",
    },
    {
      question: "When is Gir closed?",
      answer:
        "The park shuts for the monsoon — roughly mid-June to mid-October. The forest department sets the exact dates each year, so we confirm them against your travel window before you book. The Devalia Interpretation Zone often stays open when the main park does not.",
    },
    {
      question: "Can I customise the itinerary and starting city?",
      answer:
        "Yes — every package here is a starting point. We can change the number of days, add pickup from your city, swap in Diu or Junagadh, and tune the hotel tier to your budget. Share your dates for a tailored plan.",
    },
  ],
  archiveCta: TOUR_ARCHIVE_CTA_COPY,
  schema: {
    name: "Somnath Dwarka Gir Tour Package",
    description:
      "Pilgrimage and wildlife tour packages covering Somnath, Dwarka and Gir National Park with private transport and hotels.",
    listName: "Somnath Dwarka Gir Tour Packages",
  },
};

export type GirHubContent = typeof GIR_HUB_DEFAULTS;

export const GIR_HUB_PAGE: PageDef<GirHubContent> = {
  id: "somnath-dwarka-gir-tour-package",
  title: "Somnath Dwarka Gir tour packages listing",
  group: "Tour package pages",
  path: "/somnath-dwarka-gir-tour-package/",
  notes:
    "The Gir triangle package listing. meta, headline (lead + highlight; the highlight shows in the orange gradient), heroText and faqs are " +
    "fallbacks: the CMS hub item 'somnath-dwarka-gir-tour-package' wins for title, meta_description, h1, answer_first and faq whenever it has them, " +
    "so edit those there once it does. heroText takes **bold** (orange). Never state a Gir safari permit fee, slot price or gate timing here, " +
    "and keep the monsoon closure approximate (the forest department sets it each year). mobileImage is the phone hero photo (src: /images/... or https URL). " +
    "stats: the plan count and the lowest price are computed; daysValue/daysLabel is the third stat. intro is the heading and text above the package list. " +
    "groups are the list's section headings (duration, city, traveller, route). cards are the small labels on the package cards " +
    "(from-city cards read '<city> ' + fromCityLocationTail). " +
    HUB_BLOCK_NOTES +
    " The package cards themselves are the site_gir_packages dataset (and the CMS hub-spoke items).",
  defaults: GIR_HUB_DEFAULTS,
};
