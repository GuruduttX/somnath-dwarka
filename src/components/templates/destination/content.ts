import type { PageDef } from "@/src/lib/pages/types";
import { DESTINATION_THEMES } from "@/src/config/destinations";

/*
  Template copy of the destination pages, editable through the CMS (the
  Claude connector's "page" type). The page's facts — h1, answer, places,
  distances, FAQ — live in the datasets registered in
  src/lib/cms-groups/destinations.ts; these defs hold the words around them.
  Placeholders such as {destination} are filled in when the page renders.
*/

/** Labels of the destination hero (shared by /somnath/, /dwarka/, /gir/, /junagadh-girnar/). */
export type HeroLabels = {
  /** The word(s) at the end of the h1 that get the gradient, e.g. "Travel Guide". */
  titleSuffix: string;
  ctaLabel: string;
  imageAlt: string;
  enquiryService: string;
};

export const HERO_LABEL_DEFAULTS: HeroLabels = {
  titleSuffix: "Travel Guide",
  ctaLabel: "Plan a {destination} Trip",
  imageAlt: "{destination}, Gujarat",
  enquiryService: "Tour Package for {destination}",
};

const pillarDefaults = (otherName: string, otherPath: string) => ({
  hero: HERO_LABEL_DEFAULTS,
  tocHeading: "On this page",
  toc: [
    { id: "significance", label: "Significance" },
    { id: "reach", label: "How to reach" },
    { id: "temple", label: "Temple timings" },
    { id: "places", label: "Places to visit" },
    { id: "distances", label: "Key distances" },
    { id: "map", label: "Map" },
  ],
  significance: {
    eyebrow: "Why it matters",
    title: "Spiritual significance",
    bestTimeLabel: "Best time to visit",
    deityLabel: "Devotion Target",
  },
  reach: { eyebrow: "Getting there", title: "How to reach" },
  temple: {
    eyebrow: "Darshan & aarti",
    title: "Temple timings & darshan",
    mainKicker: "Primary Daily Schedule",
    dressCodeLabel: "Dress Code",
    photographyLabel: "Photography",
    mainCta: "Detailed Darshan & Aarti Schedule",
    defaultCta: "Read Full Guide",
    topicCtas: [
      { topic: "aarti", label: "View Aarti Timings" },
      { topic: "live-darshan", label: "Watch Live Stream" },
      { topic: "darshan", label: "Read Darshan Guide" },
      { topic: "vip-darshan", label: "Read Darshan Guide" },
      { topic: "history", label: "Read History" },
      { topic: "jyotirlinga", label: "Read Guide" },
      { topic: "char-dham", label: "Read Guide" },
      { topic: "dress-code", label: "View Dress Code" },
      { topic: "best-time", label: "See Best Time" },
      { topic: "how-to-reach", label: "See Route Guide" },
      { topic: "pooja-booking", label: "Booking Details" },
      { topic: "light-and-sound-show", label: "Show Details" },
      { topic: "dhwaja-ceremony", label: "Read More" },
    ],
  },
  places: { eyebrow: "Things to do", title: "Places to visit", cardCta: "Explore Route Guide" },
  distances: {
    eyebrow: "Plan the drive",
    title: "Key distances",
    // Today's wording, kept as is: on the Dwarka page it reads "Somnath–Somnath".
    banner: `{destination} sits on the Somnath–${otherName} pilgrimage circuit — most travellers pair both temples over 3–5 days.`,
    columns: ["From", "To", "Distance", "Time"],
    verifyLabel: "Distances",
  },
  map: { eyebrow: "Find it", title: "{destination} on the map", embedTitle: "Map of {destination}" },
  faqHeading: "{destination} FAQs",
  ctaContext: "{destination} trip",
  related: [
    { target: otherPath, anchor: `${otherName} travel guide`, type: "pillar" },
    { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "how many days you need", type: "sibling" },
    { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab", type: "money" },
  ],
});

export type PillarCopy = ReturnType<typeof pillarDefaults>;

const PILLAR_NOTES =
  "The words around the pillar's facts. The facts themselves (h1, answer_first, significance, best_time, how_to_reach, " +
  "places, distances, map_query, FAQ) are the item in the site_destination_pillars dataset; the hero image, deity line, " +
  "tagline, chips, stats and how-to-reach cards are the item in site_destination_heroes; the temple-timing cards are the " +
  "site_temple_topics items of this destination. {destination} is replaced by the destination's name. Fields: hero " +
  "(titleSuffix = the h1 ending that gets the gradient; ctaLabel; imageAlt; enquiryService = the service named in the " +
  "enquiry form), tocHeading + toc[{id,label}] (keep the ids: they are the section anchors), section eyebrows/titles, " +
  "temple.topicCtas[{topic,label}] = the link text on each topic card by its topic (defaultCta for any other topic), " +
  "distances.banner/columns, map, faqHeading, ctaContext (named in the CTA band's WhatsApp message), related[{target, " +
  "anchor, type: pillar|sibling|money|spoke|hub}] = extra related links (the tour-package link is added automatically).";

export const SOMNATH_PILLAR_PAGE: PageDef<PillarCopy> = {
  id: "somnath-pillar",
  title: "Somnath travel guide (pillar copy)",
  group: "Destination pages",
  path: "/somnath/",
  notes: PILLAR_NOTES,
  defaults: pillarDefaults("Dwarka", "/dwarka/"),
};

export const DWARKA_PILLAR_PAGE: PageDef<PillarCopy> = {
  id: "dwarka-pillar",
  title: "Dwarka travel guide (pillar copy)",
  group: "Destination pages",
  path: "/dwarka/",
  notes: PILLAR_NOTES,
  defaults: pillarDefaults("Somnath", "/somnath/"),
};

export const PLACE_TEMPLATE_DEFAULTS = {
  metaTitle: "{place} — Timings, How to Reach & Guide",
  metaDescription: "{place} in {destination}: {blurb} How to reach, timings and visitor tips.",
  answerFirst:
    "{place} is one of the key places to visit in {destination}. {blurb} Below is how to reach it, what to expect and how it fits into a Somnath–Dwarka itinerary.",
  reachTitle: "How to reach & timings",
  verifyLabel: "Timings & access",
  significanceTitle: "Significance",
  faq: [
    {
      question: "How do you reach {place}?",
      answer:
        "{place} is in {destination}. {how_to_reach} A private cab is the easiest way to combine it with nearby darshans.",
    },
  ],
  faqHeading: "{place} FAQs",
  ctaContext: "{place}, {destination}",
  pillarAnchor: "{destination} travel guide",
};

export const PLACE_TEMPLATE_PAGE: PageDef<typeof PLACE_TEMPLATE_DEFAULTS> = {
  id: "place-template",
  title: "Place pages of Somnath & Dwarka (template copy)",
  group: "Destination pages",
  path: "/somnath/places/[place]",
  alsoRevalidate: ["/dwarka/places/[place]"],
  notes:
    "Copy shared by every place page at /somnath/places/<place>/ and /dwarka/places/<place>/. The place itself (name, " +
    "slug, blurb, card photo) is an entry of top_places in the destination's site_destination_pillars item; the reach and " +
    "significance text come from that item too. Placeholders: {place} (place name), {destination} (destination name), " +
    "{blurb} (the place's blurb), {how_to_reach} (the destination's how_to_reach). metaTitle/metaDescription are the SEO " +
    "title and description; answerFirst is the intro under the h1; faq[] is the FAQ shown on every place page.",
  defaults: PLACE_TEMPLATE_DEFAULTS,
};

/** Copy of the destination package hubs — /gir-tour-package/, /kutch-tour-package/, ... */
export const DESTINATION_HUB_TEMPLATE_DEFAULTS = {
  eyebrow: "Destination · Gujarat",
  packagesCta: "See {count} package{s}",
  whatsappCta: "Chat on WhatsApp",
  whatsappMessage: "Hi, I'd like a {name} tour package quote",
  guideLink: "Read the {name} travel guide first",
  photoCaption: "Gujarat, India",
  packagesHeading: "Tour Packages",
  packagesIntro:
    "Every plan below opens in full — day by day, what is included and what is not, with an enquiry form for a firm quote on your dates.",
  emptyText: "Packages for {name} are being finalised — tell us your dates and we will plan one around them.",
  mostAskedBadge: "Most asked for",
  flexibleDuration: "Flexible",
  groups: {
    duration: { title: "Choose by duration", blurb: "Plans sized to how long you have." },
    city: { title: "Choose by starting city", blurb: "Round trips with pickup and drop from your city." },
    route: { title: "Add a destination", blurb: "Extend the trip with a nearby stop." },
    traveller: { title: "Choose by experience", blurb: "The different ways people plan this trip." },
  },
  allPackages: { title: "All packages", blurb: "Every {name} plan we run — open one for the full itinerary." },
  defaultFaq: [
    {
      question: "What does a {name} tour package include?",
      answer:
        "A private vehicle with driver, hotel stays where the plan runs overnight, and a day-wise itinerary sequenced around opening and darshan times. Entry tickets, ropeway fares and safari permits are charged at actuals. Exact inclusions are listed on each package once your dates are confirmed.",
    },
    {
      question: "How do I get a price for a {name} trip?",
      answer:
        "Share your dates, how many people are travelling and the hotel tier you want. Cost moves with all three, so a firm quote comes back against your specific trip rather than a headline number that changes later.",
    },
    {
      question: "Can the itinerary be customised?",
      answer:
        "Yes. Every package here is a starting point — days can be added or dropped, the starting city changed and stops swapped in or out. Tell us what matters most and we sequence the rest around it.",
    },
    {
      question: "How far ahead should I book?",
      answer:
        "As early as your dates are fixed, especially for festival weeks and the December–January peak, when hotels and any permit-based activity fill first.",
    },
  ],
  faqHeading: "Planning a {name} trip — your questions answered",
  faqSubheading: "What the package covers, how pricing works and how far ahead to book.",
  ctaTitle: "Plan your {name} trip",
  packagePage: {
    overviewHeading: "What the {name} plan covers",
    assurance: "Hotels, vehicle & permits arranged",
    imageAlt: "{name}, Gujarat",
    location: "{name}, Gujarat",
  },
};

export const DESTINATION_HUB_TEMPLATE_PAGE: PageDef<typeof DESTINATION_HUB_TEMPLATE_DEFAULTS> = {
  id: "destination-hub-template",
  title: "Destination package hubs — template copy (hubs with hub_kind \"destination\" only, not circuit hubs)",
  group: "Destination pages",
  // A route-shaped path: the copy is shared by every destination hub (hub_kind "destination").
  path: "/[destination]-tour-package",
  alsoRevalidate: Object.keys(DESTINATION_THEMES).map((slug) => `/${slug}/`),
  notes:
    "Copy shared by every destination package hub (CMS hubs with hub_kind \"destination\": /gir-tour-package/, " +
    "/kutch-tour-package/, /ambaji-tour-package/, /palitana-tour-package/, /diu-tour-package/, /saputara-tour-package/, " +
    "/ahmedabad-tour-package/, /porbandar-tour-package/, /statue-of-unity-tour-package/) and, under packagePage, by the " +
    "package pages of those hubs (/<hub>/<variant>/). Does not apply to the circuit hubs such as " +
    "/somnath-dwarka-tour-package/. The hub's own h1, answer, variants and FAQ are the CMS hub item; its display name, " +
    "photo, standfirst and highlight chips are its item in site_destination_hubs. Placeholders: {name} (the hub's display " +
    "name), {count} (number of packages), {s} (\"s\" when count is not 1). groups.* = the package-explorer group headings; " +
    "allPackages = the single heading used when a hub has three or fewer packages; defaultFaq = the FAQ shown when the hub " +
    "item has none of its own.",
  defaults: DESTINATION_HUB_TEMPLATE_DEFAULTS,
};
