import type { PageDef } from "@/src/lib/pages/types";

/*
  Template copy of the temple topic pages (/somnath/<topic>/, /dwarka/<topic>/),
  editable through the CMS ("page" type, id "temple-topic-template"). Each
  page's own content is its item in the site_temple_topics dataset.
*/

export const TEMPLE_TOPIC_TEMPLATE_DEFAULTS = {
  kickers: {
    darshan: "Darshan & Aarti Schedule",
    other: "Timings & Aarti Schedule",
  },
  hero: {
    sessionsChip: "{count} darshan windows",
    verifiedChip: "Verified against official source",
    unverifiedChip: "Indicative · confirm before travel",
    ctaLabel: "Plan Darshan With Us",
    whatsappLabel: "Ask on WhatsApp",
    whatsappMessage: "Hi, I want help planning darshan at {destination}",
  },
  timings: {
    eyebrow: "Daily schedule",
    title: "Darshan & aarti timings",
    verifiedNote: "Verified against the official source.",
    unverifiedNote: "Indicative schedule — confirm on the official site before you travel.",
    sourceLabel: "Official source",
  },
  rules: {
    eyebrow: "Before you enter",
    title: "Dress code & photography",
    dressCodeTitle: "Dress code",
    photographyTitle: "Photography",
  },
  faqHeading: "Timings FAQs",
  ctaTitle: "Plan darshan with us",
  ctaSubtitle: "We time the itinerary around aarti and darshan windows.",
  pillarAnchor: "{destination} travel guide",
  related: [
    { target: "/somnath-dwarka-taxi-service/", anchor: "book a cab for darshan", type: "money" },
    { target: "/plan/how-many-days-for-somnath-dwarka/", anchor: "plan your days", type: "sibling" },
  ],
};

export const TEMPLE_TOPIC_TEMPLATE_PAGE: PageDef<typeof TEMPLE_TOPIC_TEMPLATE_DEFAULTS> = {
  id: "temple-topic-template",
  title: "Temple topic pages of Somnath & Dwarka (template copy)",
  group: "Destination pages",
  path: "/somnath/[topic]",
  alsoRevalidate: ["/dwarka/[topic]"],
  notes:
    "Copy shared by every temple topic page at /somnath/<topic>/ and /dwarka/<topic>/ (timings, aarti, darshan, history, " +
    "dress code, ...). Each page's own h1, answer, timings, dress code, photography rule, official source and FAQ are its " +
    "item in the site_temple_topics dataset (key \"<destination>/<slug>\"). Placeholders: {destination} (Somnath or " +
    "Dwarka), {count} (number of timing rows). kickers.darshan is the hero label on the darshan topic, kickers.other on " +
    "every other topic. The verified/unverified texts follow the item's `verified` flag: never mark timings verified " +
    "without the official source confirming them. related[{target, anchor, type}] = extra related links.",
  defaults: TEMPLE_TOPIC_TEMPLATE_DEFAULTS,
};
