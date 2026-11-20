import type { PageDef } from "@/src/lib/pages/types";
import { OPERATOR } from "@/src/config/taxiSpokes";

/*
  Copy of the guides index /guides/ (GUIDES_PAGE) and of the author card and
  sidebar enquiry form on every guide page /guides/<slug>/ (GUIDE_BLOCKS_PAGE),
  editable through the CMS ("page" type). The guides themselves are the CMS
  "blog" items.
*/

export const GUIDES_PAGE_DEFAULTS = {
  meta: {
    title: "Somnath Dwarka Travel Guides & Tips",
    description:
      "In-depth guides for planning a Somnath–Dwarka pilgrimage: itineraries, temple tips, travel advice and local know-how from our team.",
  },
  hero: {
    eyebrow: "Verified Travel Guides",
    h1: { before: "Somnath Dwarka", highlight: "travel guides" },
    intro:
      "First-hand guides to help you plan the circuit — from **itineraries and temple timings** to travel tips and what to expect on the ground.",
    chips: [
      { icon: "compass", label: "Itineraries" },
      { icon: "pin", label: "Temple tips" },
      { icon: "camera", label: "What to expect" },
    ],
    browseCta: "Browse {count} guides",
    browseCtaEmpty: "Browse guides",
    image: "/images/home/SomnathLongImage.webp",
    imageAlt: "Somnath temple travel guide",
    imageCaption: "Somnath & Dwarka, Gujarat",
    imageSubcaption: "Pilgrimage circuit",
    badgeTitle: "Local know-how",
    badgeText: "Written by our team",
    updatedBadge: "Updated regularly",
  },
  list: {
    eyebrow: "All guides",
    heading: { before: "Read up before you", highlight: "go" },
    intro: "Practical, first-hand advice on temples, timings, routes and local tips for the Somnath–Dwarka circuit.",
  },
  grid: {
    untitled: "Untitled guide",
    badge: "Guide",
    readMore: "Read guide",
    fallbackImage: "/images/home/DwarikaLongImage.webp",
    emptyTitle: "Fresh guides on the way",
    emptyText:
      "We're writing new Somnath–Dwarka travel guides. In the meantime, our [planning guides](/plan/) cover distances, trip length and day-wise itineraries.",
    emptyCta: { label: "Explore trip planning", href: "/plan/" },
  },
  faqHeading: "Travel guide FAQs",
  faqSubheading: "How our Somnath–Dwarka guides work.",
  faqs: [
    {
      question: "What do your travel guides cover?",
      answer:
        "Day-wise itineraries, temple timings and darshan tips, routes and distances, the best time to visit, and practical local know-how for the Somnath–Dwarka pilgrimage circuit.",
    },
    {
      question: "Are the guides free to read?",
      answer:
        "Yes, every guide is free to read. When you're ready, you can request a matching tour package, cab or hotel quote from the same page.",
    },
    {
      question: "How current is the information?",
      answer:
        "We review and refresh the guides regularly and clearly flag any detail that is still pending confirmation, so faith or legend is never presented as verified fact.",
    },
    {
      question: "Can you turn a guide into a booked trip?",
      answer:
        "Yes. Tell us which itinerary suits you and we arrange stays, private transport and darshan planning across Somnath and Dwarka.",
    },
  ],
  ctaContext: "Somnath Dwarka trip planning",
  relatedHeading: "Related guides & services",
  related: [
    { target: "/somnath/", anchor: "Somnath Travel Guide", type: "pillar" },
    { target: "/dwarka/", anchor: "Dwarka Travel Guide", type: "pillar" },
    { target: "/somnath-dwarka-taxi-service/", anchor: "Book Taxi Service", type: "sibling" },
    { target: "/somnath-dwarka-tour-package/", anchor: "Tour Packages", type: "money" },
  ],
  schema: {
    name: "Somnath Dwarka Travel Guides",
    description: "Practical travel guides for planning a Somnath–Dwarka pilgrimage — itineraries, distances, timings and tips.",
  },
};

export type GuidesCopy = typeof GUIDES_PAGE_DEFAULTS;
export type GuidesHeroCopy = GuidesCopy["hero"];
export type GuidesGridCopy = GuidesCopy["grid"];

export const GUIDES_PAGE: PageDef<GuidesCopy> = {
  id: "guides",
  title: "Travel guides index (/guides/)",
  group: "Destination pages",
  path: "/guides/",
  notes:
    "Copy of the guides index /guides/. The guide cards are the published CMS \"blog\" items (edit those as the blog " +
    "type). hero.h1 is split so `highlight` gets the gradient; hero.intro and grid.emptyText take **bold** and " +
    "[links](/path/); hero.chips[{icon: compass|pin|camera|star|book|sparkles, label}]; {count} = number of guides. " +
    "grid.* are the card labels and the empty state shown when no guide is published. related[{target, anchor, type: " +
    "pillar|money|sibling}] are the link cards under the CTA.",
  defaults: GUIDES_PAGE_DEFAULTS,
};

export const GUIDE_BLOCKS_DEFAULTS = {
  author: {
    heading: "About the author",
    name: OPERATOR.founder,
    role: "Somnath–Dwarka circuit planning",
    photo: "/images/Harsh-Rawat.webp",
    path: "/author/harsh-rawat/",
    bio: `${OPERATOR.founder} runs ${OPERATOR.localUnit} on the ground in Gujarat, part of ${OPERATOR.parent}. Since ${OPERATOR.foundingDate} he has been planning and driving the Somnath–Dwarka circuit — the darshan timings, the road hours between temples and the stops worth adding — and the routes, fares and timings published across this site are the ones he maintains.`,
    regionChip: "Somnath · Dwarka · Gujarat",
    sinceChip: `Travelling since ${OPERATOR.foundingDate}`,
    moreLink: "More about {firstName}",
  },
  enquiry: {
    namePlaceholder: "Your name",
    phonePlaceholder: "Phone / WhatsApp",
    emailPlaceholder: "Email (optional)",
    datesPlaceholder: "Travel dates",
    errorText: "Something went wrong. Please WhatsApp us instead.",
    sendingLabel: "Sending…",
    submitLabel: "Get a callback",
  },
};

export type GuideAuthorCopy = (typeof GUIDE_BLOCKS_DEFAULTS)["author"];
export type GuideEnquiryCopy = (typeof GUIDE_BLOCKS_DEFAULTS)["enquiry"];

export const GUIDE_BLOCKS_PAGE: PageDef<typeof GUIDE_BLOCKS_DEFAULTS> = {
  id: "guide-page-blocks",
  title: "Guide pages: author card & sidebar form",
  group: "Destination pages",
  path: "/guides/[slug]",
  notes:
    "Shared blocks on every guide page /guides/<slug>/: author = the \"About the author\" card at the end of the guide " +
    "(name, role, photo, bio, chips, link to the author page; {firstName} in moreLink is the first word of name); " +
    "enquiry = the placeholders and button texts of the sidebar enquiry form. The guide's own content is its CMS blog " +
    "item. E-E-A-T rule: the author card states only what the site already states as fact — no years of experience or " +
    "credentials until the owner verifies them.",
  defaults: GUIDE_BLOCKS_DEFAULTS,
};
