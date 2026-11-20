import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of /festivals/ (page id "festivals") and the copy every festival page
  shares (page id "festival-detail", route /festivals/[festival]). The
  festivals themselves are items: the site_festivals dataset
  (src/lib/cms-groups/catalog.ts), or a published Festival item of the CMS,
  which wins over a dataset item with the same slug.
*/

export const FESTIVALS_PAGE_DEFAULTS = {
  meta: {
    title: "Somnath Dwarka Festivals — Dates, Rituals & Travel Guide",
    description:
      "Major festivals at Somnath and Dwarka including Janmashtami and Maha Shivratri: what to expect, travel advice and how to plan darshan around the crowds.",
  },
  hero: {
    badge: "Festivals & Celebrations",
    h1Start: "Festivals at",
    h1Highlight: "Somnath & Dwarka",
    intro:
      "From **Janmashtami at Dwarka** to **Maha Shivratri at Somnath** — what to expect, the rituals, and how to plan travel and darshan around the crowds.",
    chips: ["Aartis & rituals", "Crowd planning", "Seasonal dates"],
    primaryCta: "Plan a Festival Trip",
    whatsappCta: "Ask on WhatsApp",
    whatsappMessage: "Hi, I want to plan a festival trip to Somnath / Dwarka",
    countNote: "dates confirmed before each season",
    imageAlt: "Temple lit up during a festival",
    floatTitle: "Plan 6–10 weeks ahead",
    floatText: "Stays & cabs fill fast",
  },
  guides: {
    badge: "Festival guides",
    headingStart: "Celebrate at",
    headingHighlight: "Somnath & Dwarka",
    intro:
      "Each guide covers the rituals, what to expect and how to plan travel and darshan around the crowds. Exact dates change yearly and are confirmed before publishing.",
  },
  calendarBanner: {
    title: "Explore the Complete Festival Calendar",
    text: "View upcoming dates (2026 – 2027), auspicious timing details, locations, and special darshan crowd tips.",
    button: "Open Calendar",
  },
  cardCta: "Festival guide & travel tips",
  planAhead: [
    { title: "Book early", text: "Reserve stays and cabs 6–10 weeks ahead for peak festivals." },
    { title: "Time your darshan", text: "Plan queues around aarti timings to avoid the biggest rush." },
    { title: "We handle logistics", text: "Hotels, transport and a festival-ready itinerary in one place." },
  ],
  faqHeading: "Festival FAQs",
  faqSubheading: "Planning a trip around Somnath and Dwarka's festivals.",
  faqs: [
    {
      question: "What are the biggest festivals at Somnath and Dwarka?",
      answer:
        "Janmashtami at Dwarka (Krishna's birth) and Maha Shivratri at Somnath are the largest celebrations. Kartik Purnima (Dev Diwali) at Somnath is a quieter, scenic alternative with a holy dip at Triveni Sangam.",
    },
    {
      question: "When is Janmashtami celebrated in Dwarka?",
      answer:
        "Janmashtami falls in August–September and the exact date changes each year with the Hindu calendar. We confirm the dates before each season rather than publishing an unverified one.",
    },
    {
      question: "How early should I book for a festival trip?",
      answer:
        "Reserve stays and cabs 6–10 weeks ahead for peak festivals. Tariffs rise and rooms near the temples fill quickly during Janmashtami and Maha Shivratri.",
    },
    {
      question: "Are the temples very crowded during festivals?",
      answer:
        "Yes — expect heavy crowds and long darshan queues, especially overnight on Maha Shivratri and around midnight on Janmashtami. Plan your darshan around the aarti timings to avoid the biggest rush.",
    },
    {
      question: "Can you plan a festival itinerary for me?",
      answer:
        "Yes. We arrange hotels, transport and a festival-ready day-wise itinerary covering both temple towns, timed around the crowds.",
    },
  ],
  ctaContext: "Festival trip to Somnath Dwarka",
  relatedLabel: "Related guides & services",
  related: [
    { target: "/somnath/", anchor: "Somnath Travel Guide", type: "pillar" },
    { target: "/dwarka/", anchor: "Dwarka Travel Guide", type: "pillar" },
    { target: "/somnath-dwarka-taxi-service/", anchor: "Book Taxi Service", type: "sibling" },
    { target: "/somnath-dwarka-tour-package/", anchor: "Tour Packages", type: "money" },
  ],
  schema: {
    name: "Somnath & Dwarka Festivals",
    description: "Guides to major festivals at Somnath and Dwarka — dates, rituals and how to plan darshan around the crowds.",
  },
};

export const FESTIVALS_PAGE: PageDef<typeof FESTIVALS_PAGE_DEFAULTS> = {
  id: "festivals",
  title: "Festivals listing page",
  group: "Festivals",
  path: "/festivals/",
  notes:
    "The /festivals/ listing. meta {title, description}; hero: badge, h1Start + h1Highlight (the coloured part), intro (takes **bold**), " +
    "chips[3] (labels, icons are fixed), primaryCta / whatsappCta (button labels), whatsappMessage (the text WhatsApp opens with), " +
    "countNote (after 'N festival guides ·'), imageAlt, floatTitle/floatText (the floating badge); guides: the heading block above the cards; " +
    "calendarBanner: the link box to /festivals/festival-calendar/; cardCta: the link label on every festival card; planAhead[3 {title, text}]; " +
    "faqs[{question, answer}] (also the FAQPage schema); related[{target, anchor, type: pillar|money|sibling}] (the link cards under the CTA); " +
    "schema {name, description} (CollectionPage JSON-LD). The festival cards themselves are the festivals (site_festivals items, or published " +
    "Festival CMS items, which replace the whole list when any exist). Plain text unless noted.",
  defaults: FESTIVALS_PAGE_DEFAULTS,
};

export const FESTIVAL_DETAIL_DEFAULTS = {
  hero: {
    datesPending: "Dates confirmed each season",
    crowdSuffix: "crowd",
    primaryCta: "Plan a {festival} Trip",
    whatsappCta: "Ask on WhatsApp",
    whatsappMessage: "Hi, I want to plan a trip for {festival} at {city}",
  },
  glanceLabels: { deity: "Deity", season: "Season", crowd: "Crowd", venue: "Venue" },
  rituals: { eyebrow: "Traditions", title: "Rituals & observances" },
  highlights: { eyebrow: "What to expect", title: "Festival highlights" },
  travel: { eyebrow: "Plan smart", title: "Travel & booking advice" },
  tips: [
    { title: "Book 6–10 weeks ahead", text: "Stays and cabs fill fast and tariffs climb during peak festival days." },
    { title: "Time your darshan", text: "Plan queues around the aarti timings to avoid the heaviest crush." },
    { title: "We handle logistics", text: "Hotels, transport and a festival-ready itinerary arranged in one place." },
  ],
  dateNote:
    "Exact festival dates change each year with the Hindu calendar. We confirm **{festival}** dates before the season rather than publishing an unverified one.",
  faqHeading: "{festival} FAQs",
  ctaContext: "{festival} at {venue}",
  relatedLabel: "Related guides & packages",
};

export const FESTIVAL_DETAIL_PAGE: PageDef<typeof FESTIVAL_DETAIL_DEFAULTS> = {
  id: "festival-detail",
  title: "Festival pages (shared copy)",
  group: "Festivals",
  path: "/festivals/[festival]",
  notes:
    "Copy shared by every /festivals/<slug>/ page; each festival's own text is its site_festivals item (or its Festival CMS item). " +
    "Placeholders filled per page: {festival} (short name), {city}, {venue}. hero: datesPending (shown when the festival has no confirmed date), " +
    "crowdSuffix (after the crowd level), primaryCta, whatsappCta, whatsappMessage; glanceLabels: the four 'at a glance' card labels; " +
    "rituals / highlights / travel: section eyebrow + title; tips[3 {title, text}]: the travel tip cards (icons fixed); dateNote: the note on " +
    "changing dates (takes **bold**); faqHeading; ctaContext (tells the enquiry form which page sent it); relatedLabel. Plain text unless noted.",
  defaults: FESTIVAL_DETAIL_DEFAULTS,
};
