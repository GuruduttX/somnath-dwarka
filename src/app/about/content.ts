import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of /about/, editable through the CMS (the Claude connector's "page"
  type, id "about"). The hero (AboutHero) is an animated client component
  and stays in code; the "Who we are" and "What sets us apart" sections and
  the page's meta read from here.
*/

export const ABOUT_PAGE_DEFAULTS = {
  meta: {
    title: "About Us: Local Dwarka Team Behind Your Yatra",
    description:
      "Who we are and how we help pilgrims plan the Somnath–Dwarka circuit with tailored itineraries, private cabs and hotel assistance.",
  },
  schema: {
    name: "About Somnath Dwarka Tour Package",
    description: "Who we are and how we help pilgrims plan the Somnath–Dwarka circuit.",
  },
  whoWeAre: {
    eyebrow: "Our Identity",
    headingLead: "Who We",
    headingHighlight: "Are",
    paragraphs: [
      "**Somnath Dwarka Guide** is a dedicated pilgrimage travel platform created and operated by [Experience My India](https://experiencemyindia.com/) — a travel organization with deep roots in India's most sacred destinations.",
      "While Experience My India serves travellers across the country, Somnath Dwarka Guide was built for one specific purpose: to be the most trusted, most accurate, and most human resource for anyone travelling to the **Gujarat Spiritual Circuit** — Dwarka, Somnath, Nageshwar, Bet Dwarka, and the larger Saurashtra pilgrimage circuit.",
      "We are not a content aggregator. We are not a booking portal that outsources your yatra to third parties. We are a team of people who were born here, live here, and have spent years understanding what a pilgrim truly needs — not just which temples to visit, but how to visit them with peace, preparation, and spiritual clarity.",
    ],
    quote:
      "When you plan your Somnath Dwarka yatra with us, you are in the hands of people who know the sound of Dwarkadhish's aarti at dawn, the feeling of walking the Somnath shore at dusk, and the exact time the light & sound show begins to glow. That is not information we researched. **That is our daily life.**",
    pillars: [
      { emoji: "", title: "Gujarat-Born Team", desc: "Our team grew up in Dwarka and Somnath. These are not destinations — they are home." },
      { emoji: "🤝", title: "No Third-Party Handoffs", desc: "We handle every aspect in-house. No outsourcing, no middlemen, no surprises." },
      { emoji: "🛕", title: "Temple-First Planning", desc: "Every itinerary is designed around the spiritual rhythm of the Gujarat circuit." },
      { emoji: "🌿", title: "Seva Bhav Approach", desc: "This is not a business transaction. It is an act of service — the way Gurudutt built it." },
    ],
  },
  different: {
    eyebrow: "Our Difference",
    headingLead: "Why Somnath Dwarka Guide Is",
    headingHighlight: "Different",
    intro:
      "Most travel websites covering Dwarka and Somnath are built at a desk, sourcing information from other websites that source from other websites. Timings are copied without verification. Itineraries are built without any understanding of crowd patterns or temple rhythms. Accommodation is recommended without being visited.",
    statement: "We are different for one simple reason:",
    statementHighlight: "we are here.",
    paragraphs: [
      "Our team maintains an active physical presence on the **Dwarka–Somnath Highway, Gujarat**. That is not research. That is **residence.**",
      "This is also why we do not work with third-party operators. **No handoffs, no outsourcing, no surprises.**",
    ],
    factsTitle: "What “We Are Here” Actually Means",
    facts: [
      "We visit the temples ourselves — every season, not once",
      "We verify the darshan timings before publishing",
      "We know when Dwarkadhish's aarti gets crowded during festivals",
      "We know the best coastal routes to avoid seasonal traffic",
      "We know which hotels have accessible rooms for elderly pilgrims",
      "We know exactly how long the ferry takes from Okha to Bet Dwarka on a busy Sunday",
      "Every vehicle we send is our vehicle — not a third-party contractor",
      "Every guide we assign knows the Gujarat spiritual circuit the way we know it",
    ],
  },
};

export type AboutPageContent = typeof ABOUT_PAGE_DEFAULTS;

export const ABOUT_PAGE: PageDef<AboutPageContent> = {
  id: "about",
  title: "About page",
  group: "Company pages",
  path: "/about/",
  notes:
    "whoWeAre and different are the two sections under the hero. headingLead + headingHighlight make the H2 (the highlight shows in orange). " +
    "paragraphs, quote and different.paragraphs take **bold** and [anchor](/path/ or https://...) links; other fields are plain text. " +
    "pillars[{emoji, title, desc}] are the four cards; facts[] the tick list. The hero above them is code.",
  defaults: ABOUT_PAGE_DEFAULTS,
};
