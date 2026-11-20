import {
  DEFAULT_INTEREST_THEME,
  INTEREST_SPOKE_IMAGES,
  INTEREST_THEMES,
  type InterestTheme,
} from "@/src/config/interestHubs";

/*
  Dataset items for the interest hubs (/wildlife-nature-tours/,
  /heritage-tours-gujarat/, /circuits/): the theme from config/interestHubs.ts
  plus the labels of the hub template, so each hub's words can be edited on
  its own. Registered in src/lib/cms-groups/destinations.ts.
*/

export const INTEREST_LABEL_DEFAULTS = {
  exploreCta: "Explore {count} place{s}",
  whatsappCta: "Plan this with us",
  whatsappMessage: "Hi, I'd like to plan a {name} trip in Gujarat",
  countLabel: "{count} to explore",
  emptyText: "Guides for this section are being written — tell us what you want to see and we will plan around it.",
  guideBadge: "Guide",
  visitBadge: "Visit",
  guideCta: "Read the guide",
  visitCta: "See timings & access",
  faqHeading: "Planning around these — your questions answered",
  faqSubheading: "Combining sites into one trip, what tickets cost and when to come.",
  ctaTitle: "Plan this trip",
  defaultFaq: [
    {
      question: "Can these be combined into one trip?",
      answer:
        "Yes — most sit within a few hours of each other and slot into a wider Gujarat route. Tell us which ones matter to you and we will sequence them around the drives and opening times rather than the map.",
    },
    {
      question: "Are entry tickets and permits included?",
      answer:
        "Entry tickets, safari permits and guide fees are charged at actuals and, where they can be booked ahead, we book them and share the confirmation. What a package covers is the vehicle, the stays and the planning.",
    },
    {
      question: "When is the best time for {name} in Gujarat?",
      answer:
        "October to March suits almost everything here: the parks are open, the light is good and the days are walkable. The exceptions run the other way — the Dangs waterfalls need the monsoon, and the national parks close through it.",
    },
    {
      question: "Do you arrange guides at the sites?",
      answer:
        "Where a site has an official guide service or a booked walk, we arrange it with your ticket. Elsewhere your driver knows the ground and we brief you on what is worth the time before you go.",
    },
  ],
};

export type InterestLabels = typeof INTEREST_LABEL_DEFAULTS;

export type InterestHubItem = InterestTheme & { slug: string; headlineBreakBefore: string; labels: InterestLabels };

export const INTEREST_HUB_ITEMS: InterestHubItem[] = Object.entries(INTEREST_THEMES).map(([slug, theme]) => ({
  slug,
  ...theme,
  headlineBreakBefore: theme.headlineBreakBefore ?? "",
  labels: INTEREST_LABEL_DEFAULTS,
}));

/** A hub with no item of its own (added to the CMS before it was themed). */
export const DEFAULT_INTEREST_HUB: InterestHubItem = {
  slug: "",
  ...DEFAULT_INTEREST_THEME,
  headlineBreakBefore: "",
  labels: INTEREST_LABEL_DEFAULTS,
};

export type InterestSpokeImage = { slug: string; image: string };

export const INTEREST_SPOKE_IMAGE_ITEMS: InterestSpokeImage[] = Object.entries(INTEREST_SPOKE_IMAGES).map(
  ([slug, image]) => ({ slug, image })
);
