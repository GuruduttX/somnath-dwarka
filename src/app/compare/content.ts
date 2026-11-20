import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of /compare/ (page id "compare", which also holds the "Compare &
  decide" block on /plan/) and the copy every /compare/<slug>/ page shares
  (page id "compare-detail"). The comparisons themselves are the
  site_comparisons dataset (src/lib/cms-groups/catalog.ts).
*/

export const COMPARE_PAGE_DEFAULTS = {
  meta: {
    title: "Compare Somnath & Dwarka Tour Packages — Route, Cost & Itinerary Comparison",
    description:
      "Compare Somnath and Dwarka tour packages, routes, durations, cab options, and hotel categories. Side-by-side comparison tables with expert planning advice.",
  },
  h1: "Compare Somnath & Dwarka Tour Packages & Routes",
  answerFirst:
    "Planning a Gujarat pilgrimage involves critical choices: selecting the optimal trip duration, deciding between Dwarka-first vs Somnath-first routes, and comparing private cabs against public transit. Use our side-by-side comparison tables, itinerary breakdowns, and cost comparisons below to make an informed decision tailored to your family's comfort and budget.",
  summaryCards: [
    {
      title: "Trip Duration",
      lines: ["**3 Days:** Express temple run.", "**4 Days:** Balanced + Porbandar.", "**5-6 Days:** Complete + Gir Safari & Diu."],
    },
    {
      title: "Transport Mode",
      lines: ["**Private Sedan/SUV:** Direct door-to-door transit, flexible aarti timing.", "**Train/Bus:** Budget option, rigid timings."],
    },
    {
      title: "Stay Categories",
      lines: ["**Standard:** Clean, near temple gate.", "**Deluxe:** Modern amenities & dining.", "**Premium:** Sea view & priority comfort."],
    },
  ],
  durationTable: {
    title: "Itinerary Comparison: 3-Day vs 4-Day vs 5-Day Plans",
    intro: "Compare what each pilgrimage duration covers. Choose based on who is travelling in your group:",
    columns: ["Comparison Factor", "3 Days / 2 Nights", "4 Days / 3 Nights", "5 Days / 4 Nights"],
    rows: [
      { factor: "Key Destinations", cells: ["Dwarka & Somnath only", "Dwarka, Porbandar & Somnath", "Dwarka, Porbandar, Somnath, Gir & Junagadh"] },
      {
        factor: "Temples Covered",
        cells: [
          "Dwarkadhish, Nageshwar, Bet Dwarka, Somnath Temple, Bhalka Tirth",
          "All 3-Day temples + Kirti Mandir, Sudama Temple, Triveni Sangam, Gita Mandir",
          "All 4-Day temples + Sasan Gir Safari, Girnar foothills & Uparkot Fort",
        ],
      },
      {
        factor: "Daily Travel Pace",
        cells: ["Fast / Packed (5–6 hrs road travel per day)", "Moderate & Comfortable (3–4 hrs drive)", "Relaxed & Leisurely (2–3 hrs drive)"],
      },
      {
        factor: "Ideal For",
        cells: ["Working professionals & quick weekend yatris", "Families with children & senior citizens", "Multi-generational families & nature lovers"],
      },
      {
        factor: "Aarti Attendance",
        cells: ["Evening aarti at Somnath or Dwarka", "Both Mangla aarti & Sandhya aarti possible", "Multiple aartis plus Somnath Sound & Light Show"],
      },
    ],
  },
  transport: {
    title: "Transport Comparison: Private Cab vs Train vs Bus",
    cards: [
      {
        name: "Dedicated AC Cab",
        badge: "Recommended",
        points: [
          { text: "Door-to-door pickup from airport/station.", plus: true },
          { text: "Direct transit to Bet Dwarka jetty & Nageshwar.", plus: true },
          { text: "Stop at Madhavpur Beach & Porbandar at your own pace.", plus: true },
        ],
      },
      {
        name: "Railways (IRCTC)",
        badge: "Budget Friendly",
        points: [
          { text: "Lowest per-person long-distance fare.", plus: true },
          { text: "Infrequent direct trains between Dwarka & Veraval.", plus: false },
          { text: "Requires local auto/taxi hires at every stop.", plus: false },
        ],
      },
      {
        name: "GSRTC State Buses",
        badge: "Frequent Connectivity",
        points: [
          { text: "Frequent connections between major talukas.", plus: true },
          { text: "Crowded during festivals and peak seasons.", plus: false },
          { text: "No luggage handling or door-to-door temple drops.", plus: false },
        ],
      },
    ],
  },
  guidesTitle: "Detailed Side-by-Side Planning Guides",
  faqHeading: "Frequently Asked Questions on Comparing Tours",
  faqs: [
    {
      question: "How do I choose between a 3-day and 5-day Somnath Dwarka tour package?",
      answer:
        "A 3-day package covers the essential darshans at Dwarkadhish, Nageshwar Jyotirlinga, Bet Dwarka, and Somnath Temple with direct highway transit. A 5-day package adds Porbandar (Kirti Mandir, Sudama Temple), Junagadh (Girnar), and Sasan Gir Lion Safari, allowing an unhurried, comfortable pace suitable for senior citizens and families.",
    },
    {
      question: "Is it more cost-effective to hire a private cab or take trains between Somnath and Dwarka?",
      answer:
        "For solo travellers, state transport or passenger trains are cheaper, but train frequencies between Dwarka and Veraval/Somnath are limited and require matching strict schedules. For families of 2 to 6 people, a private cab is often more cost-effective per person because it eliminates local auto-rickshaw fares to remote shrines like Bet Dwarka and Nageshwar while providing door-to-door flexibility.",
    },
    {
      question: "Should we book standard 3-star or premium 4-star hotels in Somnath and Dwarka?",
      answer:
        "Standard 3-star hotels provide clean air-conditioned rooms, hot water, and pure vegetarian dining within 1 to 2 km of the temple gates. Premium 4-star hotels offer sea-facing views, dedicated pilgrimage travel desks, private elevators, and early breakfast options. If travelling with elders, choose hotels within walking distance or with dedicated cab drop-off zones.",
    },
    {
      question: "What is the best order of travel: Somnath first or Dwarka first?",
      answer:
        "Choose based on your arrival airport or railway junction. If arriving at Jamnagar or Rajkot in the morning, starting at Dwarka minimizes day-one driving. If arriving via Diu or Keshod, starting at Somnath is the most efficient route. Both orders avoid backtracking when using a linear circuit ending at Ahmedabad or Rajkot.",
    },
  ],
  ctaContext: "Somnath Dwarka Tour Comparison",
  schema: {
    name: "Compare Somnath & Dwarka Tour Packages — Route, Cost & Itinerary Comparison",
    description:
      "Side-by-side comparisons to plan your Somnath–Dwarka trip, with clear verdicts, route advice and package recommendations.",
  },
  /** The "Compare & decide" block on /plan/ (components/plan/CompareSection.tsx). */
  planSection: {
    badge: "Compare & decide",
    headingStart: "Weighing your",
    headingHighlight: "options?",
    intro:
      "Honest, side-by-side comparisons — which package, how many days, and how to get around — so you can decide before you book.",
    cardCta: "Read the comparison",
    allLink: "See all comparisons",
  },
};

export const COMPARE_PAGE: PageDef<typeof COMPARE_PAGE_DEFAULTS> = {
  id: "compare",
  title: "Compare listing page",
  group: "Comparisons",
  path: "/compare/",
  alsoRevalidate: ["/plan/"],
  notes:
    "The /compare/ hub. meta {title, description}; h1; answerFirst; summaryCards[3 {title, lines[]}] (each line takes **bold**; icons fixed by position); " +
    "durationTable {title, intro, columns[4], rows[{factor, cells[3]}]}; transport {title, cards[3 {name, badge, points[{text, plus}]}]} " +
    "(plus=true shows a tick, false a bullet; card colours fixed by position); guidesTitle (the list of comparison pages, which are the " +
    "site_comparisons items); faqs[{question, answer}] (also FAQPage schema); ctaContext; schema {name, description}. planSection is the " +
    "'Compare & decide' block on /plan/ (badge, headingStart + headingHighlight, intro, cardCta, allLink); it keeps showing there even if " +
    "this page is hidden. Plain text unless noted.",
  defaults: COMPARE_PAGE_DEFAULTS,
};

export const COMPARE_DETAIL_DEFAULTS = {
  tableTitle: "Side by side",
  criterionLabel: "Criterion",
  verdictTitle: "Verdict",
  recommendedCta: "See recommended packages",
  faqHeading: "FAQs",
  relatedPillarAnchor: "all comparisons",
};

export const COMPARE_DETAIL_PAGE: PageDef<typeof COMPARE_DETAIL_DEFAULTS> = {
  id: "compare-detail",
  title: "Comparison pages (shared copy)",
  group: "Comparisons",
  path: "/compare/[slug]",
  notes:
    "Copy shared by every /compare/<slug>/ page (each page's own text is its site_comparisons item): tableTitle and criterionLabel " +
    "(the first column header), verdictTitle, recommendedCta (the button to the item's recommended_target), faqHeading, " +
    "relatedPillarAnchor (link text back to /compare/). Plain text.",
  defaults: COMPARE_DETAIL_DEFAULTS,
};
