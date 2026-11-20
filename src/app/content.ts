import { cache } from "react";
import type { PageDef } from "@/src/lib/pages/types";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { fillTokens } from "@/src/lib/pages/content";
import { HOME_FAQS } from "@/src/config/homeFaqs";
import {
  HOME_AT_A_GLANCE,
  HOME_BEST_TIME,
  HOME_BEST_TIME_LINKS,
  HOME_CONCERNS,
  HOME_EXCLUDED,
  HOME_EXCLUDED_NOTE,
  HOME_HERO,
  HOME_HOTELS,
  HOME_HOTELS_BUDGET_NOTE,
  HOME_HOTEL_PROMISE,
  HOME_INCLUDED,
  HOME_ITINERARY,
  HOME_MONTH_SEASONS,
  HOME_PRICE_COMPARE,
  HOME_PRICE_FROM,
  HOME_REACH,
  HOME_ROUTE_STOPS,
  HOME_SEASONS,
  HOME_TIERS,
  HOME_WA_TEXT,
  HOME_WHY_DIFFERENT,
  HOME_WHY_DIRECT,
  HOME_WHY_LOCAL_POINTS,
  inr,
  type HomeDay,
  type HomeTier,
} from "@/src/config/homePage";

/*
  Copy of the home page, editable through the CMS (the Claude connector's
  "page" type, id "home"). The defaults are the SOP copy in
  src/config/homePage.ts and src/config/homeFaqs.ts; the home page and its
  sections (components/Home/sop/SopSections.tsx, HomeHero, HomeFaqSection)
  render from `await getHomeCopy()`, which lays the stored edits over them.

  Prices are written as tokens so a tier price edit moves every sentence that
  quotes it: {{priceFrom}} (cheapest tier), {{standardPrice}},
  {{deluxePrice}}, {{premiumPrice}} (by tier key), all in Indian digit grouping.
*/

/** Swaps the price in a default sentence for its token. */
const tokenise = (text: string, price: number, token: string) => text.split(inr(price)).join(`{{${token}}}`);

const tierPrice = (key: HomeTier["key"]) => HOME_TIERS.find((t) => t.key === key)?.price ?? HOME_PRICE_FROM;

const priceTokens = (text: string) =>
  [
    ["standardPrice", tierPrice("standard")],
    ["deluxePrice", tierPrice("deluxe")],
    ["premiumPrice", tierPrice("premium")],
  ].reduce((t, [token, price]) => tokenise(t, price as number, token as string), text);

export const HOME_PAGE_DEFAULTS = {
  meta: {
    title: "Somnath Dwarka Tour Package from ₹{{priceFrom}} — Local Guide",
    description:
      "Somnath Dwarka tour package by a Dwarka local: named 4 and 5 star hotels, private AC car, darshan help and honest pricing from ₹{{priceFrom}}. Get a day-wise plan.",
  },
  hero: {
    ...HOME_HERO,
    priceLine: tokenise(HOME_HERO.priceLine, HOME_PRICE_FROM, "priceFrom"),
    highlights: [...HOME_HERO.highlights],
  },
  waText: HOME_WA_TEXT,
  tiers: HOME_TIERS.map((t) => ({ ...t, href: t.href ?? "" })),
  atAGlance: HOME_AT_A_GLANCE.map((r) => ({ ...r, detail: tokenise(r.detail, HOME_PRICE_FROM, "priceFrom") })),
  whyDifferent: [...HOME_WHY_DIFFERENT],
  whyDirect: { ...HOME_WHY_DIRECT },
  whyLocalPoints: [...HOME_WHY_LOCAL_POINTS],
  priceCompare: HOME_PRICE_COMPARE.map((r) => ({ ...r })),
  itinerary: HOME_ITINERARY.map((d) => ({ ...d, stops: [...d.stops], drive: d.drive ?? "" })),
  routeStops: [...HOME_ROUTE_STOPS],
  hotelPromise: HOME_HOTEL_PROMISE,
  hotels: HOME_HOTELS.map((c) => ({ city: c.city as string, hotels: [...c.hotels] })),
  hotelsBudgetNote: HOME_HOTELS_BUDGET_NOTE,
  included: [...HOME_INCLUDED],
  excluded: [...HOME_EXCLUDED],
  excludedNote: HOME_EXCLUDED_NOTE,
  reach: HOME_REACH.map((r) => ({ ...r })),
  bestTime: HOME_BEST_TIME,
  seasons: HOME_SEASONS.map((s) => ({ ...s, key: s.key as string })),
  monthSeasons: [...HOME_MONTH_SEASONS] as string[],
  bestTimeLinks: HOME_BEST_TIME_LINKS.map((l) => ({ ...l })),
  concerns: HOME_CONCERNS.map((c) => ({ ...c })),
  faqs: HOME_FAQS.map((f) => ({ question: f.question, answer: priceTokens(f.answer) })),
};

export type HomeContent = typeof HOME_PAGE_DEFAULTS;

export const HOME_PAGE: PageDef<HomeContent> = {
  id: "home",
  title: "Home page",
  group: "Home",
  path: "/",
  notes:
    "Every section of the home page body, in scroll order. meta {title, description} is the search snippet. hero {h1, lead, priceLine, " +
    "priceTail, cta, highlights[] (phrases of lead shown in bold orange)}. waText is the message every home WhatsApp button opens with. " +
    "tiers[{key ('standard' | 'deluxe' | 'premium'), name, hotels, price (number), href}] are the price cards and also set the price tokens: " +
    "{{priceFrom}} (cheapest tier), {{standardPrice}}, {{deluxePrice}}, {{premiumPrice}} can be used in any text. " +
    "atAGlance[{label, detail}] (the 'Starting price' row is shown as its own card), whyDifferent[], whyDirect {lead, rest}, whyLocalPoints[], " +
    "priceCompare[{what, budget, ours}], itinerary[{day, title, body, stops[], stay, drive}], routeStops[] (TouristTrip schema), " +
    "hotelPromise, hotels[{city, hotels[]}], hotelsBudgetNote, included[], excluded[], excludedNote, " +
    "reach[{from ('Air, ...' | 'Train, ...' | 'Road, ...' — the word before the comma picks the tab), access, distance}], bestTime, " +
    "seasons[{key ('best' | 'hot' | 'monsoon'), label, months, note}], monthSeasons[12 keys, January first], bestTimeLinks[{label, href}], " +
    "concerns[{q, a}], faqs[{question, answer}] (also the FAQPage schema). Plain text throughout. Never invent reviews or ratings; " +
    "the guest reviews on the page are not part of this copy.",
  defaults: HOME_PAGE_DEFAULTS,
};

export type HomeCopy = HomeContent & { priceFrom: number; priceTo: number };

/**
 * The home copy as it renders: CMS edits over the defaults, site tokens and
 * price tokens filled in. Read once per request; every home section awaits it.
 */
export const getHomeCopy = cache(async (): Promise<HomeCopy> => {
  const c = await getPageContent(HOME_PAGE);
  const prices = c.tiers.map((t) => Number(t.price)).filter((p) => Number.isFinite(p) && p > 0);
  const priceFrom = prices.length ? Math.min(...prices) : HOME_PRICE_FROM;
  const priceTo = prices.length ? Math.max(...prices) : HOME_PRICE_FROM;
  const byKey = (key: string) => c.tiers.find((t) => t.key === key)?.price;
  const tokens: Record<string, string> = {
    priceFrom: inr(priceFrom),
    standardPrice: inr(byKey("standard") ?? priceFrom),
    deluxePrice: inr(byKey("deluxe") ?? priceFrom),
    premiumPrice: inr(byKey("premium") ?? priceTo),
  };
  return { ...fillTokens(c, tokens), priceFrom, priceTo };
});

export type { HomeDay };
