import type { CmsGroup, PageMatch } from "./types";
import { asAnyDataset, type DatasetDef } from "@/src/lib/datasets/types";
import { datasetsCollection, mergeDataset, recordItems, type StoredDatasetDoc } from "@/src/lib/datasets/store";
import type { PageDef } from "@/src/lib/pages/types";
import {
  SEED_COMPARISONS,
  SEED_FESTIVALS,
  SEED_HOTELS,
  type SeedComparison,
  type SeedFestival,
  type SeedHotel,
} from "@/src/lib/seed/destinations";
import { HOTEL_CARD_IMAGES, HOTEL_CITY_COPY, HOTEL_CITY_IMAGES, type HotelPageCopy } from "@/src/config/hotels";
import { TESTIMONIALS } from "@/src/config/testimonials";
import { FESTIVALS_PAGE, FESTIVAL_DETAIL_PAGE } from "@/src/app/festivals/content";
import { CALENDAR_EVENTS, CALENDAR_PAGE, type CalendarEvent } from "@/src/app/festivals/festival-calendar/content";
import { COMPARE_PAGE, COMPARE_DETAIL_PAGE } from "@/src/app/compare/content";
import { HOTELS_PAGE, HOTEL_CITY_PAGE } from "@/src/app/hotels/content";
import { REVIEWS_PAGE, VERIFIED_REVIEWS, type GuestReview } from "@/src/app/reviews/content";
import { THANK_YOU_PAGE } from "@/src/app/thank-you/content";
import { HTML_SITEMAP_PAGE } from "@/src/app/sitemap/content";
import { NOT_FOUND_PAGE } from "@/src/app/not-found-content";

/*
  CMS coverage for the "catalog" part of the site (festivals, comparisons,
  hotels, reviews and testimonials, and the small pages: thank-you, the HTML
  sitemap, the 404 page): the code datasets, code-built page copy and URL
  resolvers this part registers with the /mcp/ connector.
  See src/lib/cms-groups/types.ts.
*/

const NEVER_INVENT =
  "Only enter real reviews from real guests that the site owner supplies, word for word; never write, invent, embellish, merge or " +
  "'improve' a review, and never change a name, rating or date to something the guest did not give.";

export const FESTIVALS_DATASET: DatasetDef<SeedFestival> = {
  id: "site_festivals",
  label: "Festival pages (/festivals/<slug>/)",
  group: "Festivals",
  description:
    "The festival guide pages at /festivals/<slug>/ and their cards on /festivals/. Fields: slug, festival (short name), title (SEO title), h1, " +
    "answer_first (40-60 word direct answer, also the meta description), rituals (tradition, shown tagged as faith), travel_advice, event_venue, " +
    "date_this_year (leave empty until the date is confirmed: an empty value keeps the Event schema off), image (https URL or /images/... path), " +
    "deity, city, season (e.g. 'Aug – Sep'), crowd ('Very high' | 'High' | 'Moderate'), highlights[], faq[{question, answer}]. " +
    "A published Festival item of the CMS (content type festival) with the same slug wins over the item here, and while any Festival CMS item " +
    "is published the /festivals/ cards list those instead of these.",
  defaults: SEED_FESTIVALS,
  key: (f) => f.slug,
  keyFields: ["slug"],
  path: (f) => `/festivals/${f.slug}/`,
  title: (f) => f.h1 || f.festival,
};

export const FESTIVAL_CALENDAR_DATASET: DatasetDef<CalendarEvent> = {
  id: "site_festival_calendar",
  label: "Festival calendar entries (/festivals/festival-calendar/)",
  group: "Festivals",
  description:
    "The entries of the month-wise calendar at /festivals/festival-calendar/, in display order. Fields: slug (stable key), name, deity, " +
    "location (venue), city (must match one of the page's city filter buttons, page festival-calendar field cities), date2026, date2027 " +
    "(as text, e.g. 'September 4, 2026'; enter only dates you have confirmed against a published panchang or the temple trust), tithi, " +
    "crowdLevel ('Very High' shows a red badge, 'High' orange, anything else amber), bookingWindow, rituals, travelAdvice, highlights[], " +
    "filterMonth (must match one of the page's month filter buttons, field months). A published Festival CMS item with the same slug " +
    "overrides location, deity, crowdLevel, rituals and travelAdvice, and date2026 when its date is marked verified.",
  defaults: CALENDAR_EVENTS,
  key: (e) => e.slug,
  keyFields: ["slug"],
  title: (e) => e.name,
};

export const COMPARISONS_DATASET: DatasetDef<SeedComparison> = {
  id: "site_comparisons",
  label: "Comparison pages (/compare/<slug>/)",
  group: "Comparisons",
  description:
    "The side-by-side comparison pages at /compare/<slug>/, listed on /compare/ and in the 'Compare & decide' block on /plan/. Fields: slug, " +
    "title (SEO title), h1, optionA, optionB, optionC (optional third option: leave empty for a two-way comparison; when set, every row " +
    "should have c), answer_first (direct answer, also the meta description; shown tagged as opinion), verdict (also the card text on /plan/), " +
    "rows[{criterion, a, b, c}] (the table), recommended_target (site path the 'See recommended packages' button opens; empty hides it), " +
    "faq[{question, answer}]. Keep distances, fares and timings to facts you can stand behind.",
  defaults: SEED_COMPARISONS,
  key: (c) => c.slug,
  keyFields: ["slug"],
  path: (c) => `/compare/${c.slug}/`,
  title: (c) => c.h1,
};

export type HotelItem = SeedHotel & {
  /** Photo on the hotel's card on /hotels/. */
  card_image: string;
  /** Banner behind the hotel page's hero. */
  hero_image: string;
};

const DEFAULT_HOTEL_IMAGE = "/images/hotels/hero.webp";

export const HOTELS_DATASET: DatasetDef<HotelItem> = {
  id: "site_hotels",
  label: "Hotel pages (/hotels/<slug>/)",
  group: "Hotels",
  description:
    "The hotel guidance pages at /hotels/<slug>/ and their cards on /hotels/. Fields: slug, city, title (SEO title, unless the page has SOP " +
    "copy in site_hotel_city_copy), h1, near_temple, answer_first (intro, unless SOP copy exists), tiers[{tier, area, typical_range}] (the price " +
    "guide; typical_range is indicative — write 'Confirmed on request' rather than guess a tariff), properties[] (fallback hotel cards, used " +
    "only while the CMS Hotel item with this slug has no properties; list only real hotels the business can book, never invented ones, and " +
    "leave rating 0 unless it is a real, current rating), faq[{question, answer}] (used unless SOP copy exists), card_image (photo on the " +
    "/hotels/ card), hero_image (banner on the page). The named hotels are normally edited on the CMS Hotel item (content type hotel), field properties.",
  defaults: SEED_HOTELS.map((h) => ({
    ...h,
    card_image: HOTEL_CARD_IMAGES[h.slug] ?? DEFAULT_HOTEL_IMAGE,
    hero_image: HOTEL_CITY_IMAGES[h.city] ?? DEFAULT_HOTEL_IMAGE,
  })),
  key: (h) => h.slug,
  keyFields: ["slug"],
  path: (h) => `/hotels/${h.slug}/`,
  title: (h) => h.h1,
};

export type HotelCityCopyItem = HotelPageCopy & { slug: string };

export const HOTEL_CITY_COPY_DATASET: DatasetDef<HotelCityCopyItem> = {
  id: "site_hotel_city_copy",
  label: "Hotel page SOP copy (/hotels/<slug>/)",
  group: "Hotels",
  description:
    "The long-form SOP copy of a hotel page, keyed by the page's slug (an item here applies to the site_hotels page with the same slug; " +
    "create one with a new slug to give another hotel page the full SOP layout). Fields: titleTag + metaDescription (SEO), h1 (unused: the " +
    "hero shows the site_hotels h1), quickAnswer (under the hero), intro and atAGlance[{label, value}] (unused on city pages), whereToStay " +
    "{heading, body}, chooseByBudget {heading, intro, items[]}, arriveAndStay {heading, body}, bundle {heading, body, links[{label, href}]}, " +
    "stayIncludes {heading, handledTitle, handled[], tellUsTitle, tellUs[]}, whyBook {heading, points[], author}, notForYou {heading, items[]}, " +
    "beforeYouBook {heading, items[]}, faq[{question, answer}] (also FAQPage schema), keepPlanning {heading, intro, links[]}, cta {heading, body}, " +
    "propertiesNote (under the hotel cards). The '4.5 star rating on Tripadvisor' and trip counts are the operator's own figures: change them " +
    "only on the owner's word. Plain text.",
  defaults: recordItems(HOTEL_CITY_COPY, "slug"),
  key: (c) => c.slug,
  keyFields: ["slug"],
  path: (c) => `/hotels/${c.slug}/`,
  title: (c) => c.h1,
};

/** A guest testimonial as stored; the avatar initials and colours are computed (src/lib/testimonials.ts). */
export type TestimonialItem = {
  slug: string;
  name: string;
  location: string;
  destination: string;
  rating: number;
  review: string;
};

const slugOf = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const TESTIMONIALS_DATASET: DatasetDef<TestimonialItem> = {
  id: "site_testimonials",
  label: "Guest testimonials (home page reviews, guide pages)",
  group: "Reviews",
  description:
    "Real guest testimonials shown in the home page's reviews section (the first nine, which also become Review and AggregateRating " +
    "JSON-LD there) and in the testimonials band of guide pages that have none of their own. " +
    NEVER_INVENT +
    " Fields: slug (stable key, e.g. the guest's name in lowercase with hyphens), name (as the guest gave it), location, destination " +
    "(the place the trip was about, e.g. 'Dwarka'), rating (1-5 as the guest gave it; the current entries are 4.9 per the owner), review " +
    "(the guest's words). Avatar initials and colours are worked out by the site.",
  defaults: TESTIMONIALS.map((t) => ({
    slug: slugOf(t.name),
    name: t.name,
    location: t.location,
    destination: t.destination,
    rating: t.rating,
    review: t.review,
  })),
  key: (t) => t.slug,
  keyFields: ["slug"],
  title: (t) => t.name,
};

export const REVIEWS_DATASET: DatasetDef<GuestReview> = {
  id: "site_reviews",
  label: "Review cards on /reviews/",
  group: "Reviews",
  description:
    "The guest review cards on /reviews/, in display order. " +
    NEVER_INVENT +
    " Fields: slug (stable key), name, location (city), trip (the package or service the guest booked), date (month and year of the trip, " +
    "e.g. 'November 2025'), text (the guest's words).",
  defaults: VERIFIED_REVIEWS,
  key: (r) => r.slug,
  keyFields: ["slug"],
  title: (r) => r.name,
};

const m = (type: string, id: string, what: string): PageMatch => ({ type, id, what });

/** One match per live item of a dataset (the code items when the database is unreachable). */
async function each<T extends Record<string, unknown>>(def: DatasetDef<T>, what: string): Promise<PageMatch[]> {
  let docs: StoredDatasetDoc[] = [];
  try {
    docs = (await (await datasetsCollection()).find({ dataset: def.id }, { projection: { _id: 0 } }).toArray()) as StoredDatasetDoc[];
  } catch {
    // Database unreachable: list the code items.
  }
  return mergeDataset(def, docs).map((e) => m(def.id, e.key, `${what}: ${def.title ? def.title(e.item) : e.key}`));
}

async function catalogResolver(path: string): Promise<PageMatch[]> {
  if (path === "/festivals/festival-calendar/") return each(FESTIVAL_CALENDAR_DATASET, "A calendar entry");
  if (path === "/festivals/") {
    return each(FESTIVALS_DATASET, "A festival card (while any Festival CMS item is published, the cards are those CMS items instead)");
  }
  const festival = path.match(/^\/festivals\/([a-z0-9-]+)\/$/);
  if (festival) {
    return [
      m(
        FESTIVALS_DATASET.id,
        festival[1],
        "The festival page's content (its site_festivals item; a published Festival CMS item with this slug wins over it)"
      ),
    ];
  }

  if (path === "/compare/") return each(COMPARISONS_DATASET, "A comparison in the guide list");
  const compare = path.match(/^\/compare\/([a-z0-9-]+)\/$/);
  if (compare) return [m(COMPARISONS_DATASET.id, compare[1], "The comparison page's content (its site_comparisons item)")];
  if (path === "/plan/") {
    return [
      m("page", COMPARE_PAGE.id, "The 'Compare & decide' block's heading and labels (field planSection of the /compare/ page copy)"),
      ...(await each(COMPARISONS_DATASET, "A card in the 'Compare & decide' block")),
    ];
  }

  if (path === "/hotels/") return each(HOTELS_DATASET, "A hotel page card");
  const hotel = path.match(/^\/hotels\/([a-z0-9-]+)\/$/);
  if (hotel) {
    const slug = hotel[1];
    return [
      m(HOTELS_DATASET.id, slug, "The hotel page's own data (city, h1, tiers, fallback hotel cards and FAQ, images)"),
      m(
        HOTEL_CITY_COPY_DATASET.id,
        slug,
        slug in HOTEL_CITY_COPY
          ? "The page's SOP copy (title, quick answer, where to stay, budget, why book, FAQ, ...)"
          : "The page's SOP copy, only if an item with this slug was added (list_items site_hotel_city_copy to check; create one to add it)"
      ),
    ];
  }

  if (path === "/reviews/") return each(REVIEWS_DATASET, "A review card");
  if (path === "/") return each(TESTIMONIALS_DATASET, "A guest testimonial in the reviews section");
  if (/^\/guides\/[a-z0-9-]+\/$/.test(path)) {
    return [
      m("page", REVIEWS_PAGE.id, "The heading of the testimonials band at the foot of the guide (field guideSection of the /reviews/ page copy)"),
      ...(await each(TESTIMONIALS_DATASET, "A testimonial in the band at the foot of the guide (used when the guide has none of its own)")),
    ];
  }
  return [];
}

export const GROUP: CmsGroup = {
  datasets: [
    asAnyDataset(FESTIVALS_DATASET),
    asAnyDataset(FESTIVAL_CALENDAR_DATASET),
    asAnyDataset(COMPARISONS_DATASET),
    asAnyDataset(HOTELS_DATASET),
    asAnyDataset(HOTEL_CITY_COPY_DATASET),
    asAnyDataset(TESTIMONIALS_DATASET),
    asAnyDataset(REVIEWS_DATASET),
  ],
  pages: [
    FESTIVALS_PAGE,
    FESTIVAL_DETAIL_PAGE,
    CALENDAR_PAGE,
    COMPARE_PAGE,
    COMPARE_DETAIL_PAGE,
    HOTELS_PAGE,
    HOTEL_CITY_PAGE,
    REVIEWS_PAGE,
    THANK_YOU_PAGE,
    HTML_SITEMAP_PAGE,
    NOT_FOUND_PAGE,
  ] as PageDef[],
  resolvers: [catalogResolver],
};
