import type { PageDef } from "@/src/lib/pages/types";
import { HOTELS_HUB } from "@/src/config/hotels";

/*
  Copy of /hotels/ (page id "hotels": the SOP copy HOTELS_HUB from
  src/config/hotels.ts plus the hub's hero and section copy) and the copy every
  /hotels/<slug>/ page shares (page id "hotel-city"). The hotel pages
  themselves are the site_hotels dataset and their SOP copy the
  site_hotel_city_copy dataset (src/lib/cms-groups/catalog.ts); the named
  hotels on a page are the CMS Hotel item's `properties`.
*/

export const HOTELS_PAGE_DEFAULTS = {
  ...HOTELS_HUB,
  hero: {
    h1Start: "Where to Stay near",
    h1Highlight: "Somnath & Dwarka",
    intro:
      "We help you choose and book the right hotel near the temples — across **budget, mid-range and premium** tiers. Honest area guidance, real inventory, and a firm quote for your dates.",
    chips: ["Walkable to temples", "Sea-facing options", "Budget → Luxury", "Honest, no fake listings"],
    primaryCta: "Get Hotel Help",
    whatsappCta: "WhatsApp Us",
    whatsappMessage: "Hi, I need help booking a hotel near Somnath / Dwarka",
    stats: [
      { value: "2", label: "Temple towns" },
      { value: "3", label: "Comfort tiers" },
      { value: "100%", label: "Real bookings" },
    ],
    imageAlt: "Sea-facing resort near Somnath and Dwarka",
    ratingPill: "Handpicked stays",
    locationTitle: "Near the Temple",
    locationText: "A short walk to darshan",
    infoTitle: "Sea-facing comfort, temple-close convenience",
    amenities: ["Free Wi-Fi", "Sea view", "Verified"],
    floatTitle: "Best-fit guarantee",
    floatText: "We match your budget & dates",
  },
  citySection: {
    badge: "Choose your city",
    headingStart: "Stays near",
    headingHighlight: "Somnath & Dwarka",
    intro:
      "Pick a temple town and we'll match you with the right hotel tier — from walkable budget lodges to sea-facing premium stays.",
  },
  cards: {
    handpicked: "Handpicked",
    nearPrefix: "Near",
    tiersLabel: "Choose your comfort tier",
    ctaTrust: "Explore trust stays in {city}",
    ctaDharamshala: "Explore dharamshalas in {city}",
    ctaDefault: "Explore hotels in {city}",
  },
  faqHeading: "Somnath and Dwarka hotel FAQs",
  ctaBand: {
    context: "Hotel assistance for Somnath Dwarka",
    title: "Get hotel help",
    subtitle: "Tell us your dates and budget and we'll recommend and book a stay.",
  },
  schema: {
    name: "Hotels near Somnath & Dwarka",
    description: "Curated stays near Somnath and Dwarka across budget, mid-range and premium tiers, booked to your dates.",
  },
};

export type HotelsPageCopy = typeof HOTELS_PAGE_DEFAULTS;

export const HOTELS_PAGE: PageDef<HotelsPageCopy> = {
  id: "hotels",
  title: "Hotels hub page",
  group: "Hotels",
  path: "/hotels/",
  notes:
    "The /hotels/ hub. titleTag + metaDescription are the SEO title and description; quickAnswer (under the hero), atAGlance[{label, value}], intro; " +
    "the SOP blocks chooseByBudget, bundle {heading, body, links[]}, stayIncludes, whyBook {heading, points[], author}, notForYou, beforeYouBook, " +
    "keepPlanning {heading, intro, links[]}, cta {heading, body}; faq[{question, answer}] (also FAQPage schema); propertiesNote is unused on the hub; " +
    "h1 is unused (the hero heading is hero.h1Start + hero.h1Highlight). hero: intro takes **bold**; chips[4], stats[3 {value, label}], amenities[3] " +
    "(icons fixed by position); whatsappMessage is the text WhatsApp opens with. citySection: the heading above the hotel page cards (the cards are " +
    "the site_hotels items); cards: the labels on each card ({city} is filled per card; ctaTrust is used for slugs containing 'trust', " +
    "ctaDharamshala for 'dharamshala'). ctaBand {context, title, subtitle}; schema {name, description}. The '4.5 on Tripadvisor' and " +
    "'2,400 completed trips' claims are the operator's own figures; do not change them without the owner's word. Plain text unless noted.",
  defaults: HOTELS_PAGE_DEFAULTS,
};

export const HOTEL_CITY_DEFAULTS = {
  crumb: "Hotels in {city}",
  hero: {
    eyebrow: "Curated stays · {city}",
    nearPrefix: "Near",
    ratingSuffix: "on Tripadvisor",
    countSuffix: "handpicked hotels",
    perNight: "/ night ·",
    primaryCta: "Get a Recommendation",
    whatsappCta: "WhatsApp Us",
    whatsappMessage: "Hi, I need a hotel in {city} near {nearTemple}",
    imageAlt: "Hotels in {city} near {nearTemple}",
  },
  listing: {
    badge: "Handpicked in {city}",
    headingStart: "Places to stay in",
    headingHighlight: "{city}",
    intro: "Filter by comfort tier and enquire on any stay — we confirm real availability and a firm price for your exact dates.",
    honestyNote: "Sample stays for guidance. Prices are indicative and confirmed when we quote a real hotel for your dates.",
  },
  tiers: {
    title: "Price guide by tier",
    columns: ["Tier", "Area", "Typical range / night"],
    note: "Ranges are indicative and confirmed when we quote a specific hotel for your dates. We do not publish ratings or inventory unless it is real.",
  },
  whyStrip: [
    { title: "Real, verified stays", text: "No fake inventory or ratings — only hotels we can actually book." },
    { title: "Best-fit for your budget", text: "We match the right tier and area to your dates and group size." },
    { title: "Local pilgrim know-how", text: "Advice tuned around darshan and aarti timings near the temple." },
  ],
  faqHeading: "Hotels in {city} FAQs",
  ctaBand: {
    context: "Hotels in {city}",
    title: "Get a hotel recommendation",
    subtitle: "Share your dates and budget for a real, bookable option.",
  },
  related: { pillarAnchor: "all hotel guidance", cityGuideAnchor: "{city} travel guide", cabAnchor: "book a cab" },
};

export type HotelCityCopy = typeof HOTEL_CITY_DEFAULTS;

export const HOTEL_CITY_PAGE: PageDef<HotelCityCopy> = {
  id: "hotel-city",
  title: "Hotel pages (shared copy)",
  group: "Hotels",
  path: "/hotels/[slug]",
  notes:
    "Copy shared by every /hotels/<slug>/ page; each page's own data is its site_hotels item, its SOP copy (where one exists) the " +
    "site_hotel_city_copy item with the same slug, and its named hotels the CMS Hotel item's `properties`. Placeholders filled per page: " +
    "{city}, {nearTemple}. crumb (breadcrumb name); hero labels (the rating shown before ratingSuffix is the operator's own Tripadvisor " +
    "score, 4.5, unless a listed hotel carries a real rating); listing: the block above the hotel cards, honestyNote under them; tiers: " +
    "the price-guide table title, its three column headers and the note under it; whyStrip[3 {title, text}] (icons fixed); faqHeading " +
    "(the FAQs are the SOP copy's faq, else the site_hotels item's faq); ctaBand; related: link texts. Plain text.",
  defaults: HOTEL_CITY_DEFAULTS,
};
