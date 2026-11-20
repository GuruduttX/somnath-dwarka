import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of /temples/ (the temple directory), editable through the CMS:
    - TEMPLES_PAGE ("page" type, id "temples"): the fallback headline and intro,
      the labels, the category photos and the trip-planning callout.
    - TEMPLE_CARD_ITEMS (dataset site_temple_cards, src/lib/cms-groups/destinations.ts):
      the card details shown for each CMS temple (deity, town, category, fallback
      timings, ...). The temples themselves are CMS "temple" items.
  The page's h1 and answer come from the CMS "temples" hub item when it has them.
*/

/** Card details for one temple slug (used when the CMS temple item leaves a field empty). */
export type TempleCardDetails = {
  deity: string;
  town: string;
  district: string;
  significance: string;
  distance: string;
  dressCode: string;
  category: string;
  timingsFallback: { label: string; open: string; close: string }[];
};

export type TempleCardItem = TempleCardDetails & { slug: string };

const TEMPLE_DETAILS_MAPPING: Record<string, TempleCardDetails> = {
  "dakor-ranchhodrai-temple": {
    deity: "Lord Krishna (Ranchhodrai)",
    town: "Dakor",
    district: "Kheda",
    significance: "The center of Central Gujarat's Krishna devotion. Legend says the deity of Ranchhodrai walked from Dwarka with a devotee, Bodana, in the 12th century.",
    distance: "94 km",
    dressCode: "Modest traditional attire. Avoid shorts and tank tops.",
    category: "Krishna & Vishnu",
    timingsFallback: [
      { label: "Mangla Darshan", open: "06:45", close: "07:30" },
      { label: "Shangar Darshan", open: "08:30", close: "12:00" },
      { label: "Evening Darshan", open: "16:00", close: "19:00" }
    ]
  },
  "virpur-jalaram-temple": {
    deity: "Saint Jalaram Bapa",
    town: "Virpur",
    district: "Rajkot",
    significance: "Dedicated to the revered 19th-century saint Jalaram Bapa. It is globally unique for accepting no monetary or material donations since the year 2000, while serving free food to all.",
    distance: "235 km",
    dressCode: "Simple, conservative clothing. Head covering recommended.",
    category: "Saint Yatras",
    timingsFallback: [
      { label: "Morning Darshan", open: "07:00", close: "13:00" },
      { label: "Sadavrat (Prasad)", open: "11:30", close: "15:00" },
      { label: "Evening Darshan", open: "15:00", close: "20:00" }
    ]
  },
  "salangpur-hanuman-temple": {
    deity: "Lord Hanuman (Kashtbhanjan Dev)",
    town: "Salangpur",
    district: "Botad",
    significance: "Under the Swaminarayan Sampraday, this powerful temple is dedicated to Hanumanji as Kashtbhanjan (remover of difficulties). Features a massive, historic black stone deity.",
    distance: "150 km",
    dressCode: "Traditional and modest attire.",
    category: "Saint Yatras",
    timingsFallback: [
      { label: "Mangla Aarti", open: "05:30", close: "06:00" },
      { label: "Shangar Darshan", open: "07:00", close: "12:00" },
      { label: "Evening Darshan", open: "15:15", close: "21:00" }
    ]
  },
  "chotila-chamunda-mata-temple": {
    deity: "Chamunda Mata",
    town: "Chotila",
    district: "Surendranagar",
    significance: "A sacred hilltop shrine located on the Chotila Hill. Devotees climb approximately 600 stone steps to reach the top. It is a highly revered seat of Shakti worship.",
    distance: "170 km",
    dressCode: "Modest and flexible clothing suitable for climbing steps.",
    category: "Shakti/Mata",
    timingsFallback: [
      { label: "Morning Aarti", open: "05:30", close: "06:00" },
      { label: "Temple Open", open: "05:00", close: "19:30" },
      { label: "Evening Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "live-darshan-online-aarti": {
    deity: "Virtual Darshan Streams",
    town: "Digital Portal",
    district: "Gujarat",
    significance: "A specialized online portal linking pilgrims to verified live video darshan feeds and daily aarti webcasts from major temple trusts in Gujarat.",
    distance: "0 km (Online)",
    dressCode: "None (Digital Access)",
    category: "Virtual Portal",
    timingsFallback: [
      { label: "Somnath Stream", open: "06:00", close: "21:30" },
      { label: "Dwarka Stream", open: "06:30", close: "21:45" },
      { label: "Dakor Stream", open: "06:45", close: "19:00" }
    ]
  },
  "mata-no-madh-ashapura-temple": {
    deity: "Ashapura Mata",
    town: "Mata no Madh",
    district: "Kutch",
    significance: "The ancestral seat of Ashapura Mata, the patron goddess of Kutch rulers. Revered for fulfilling wishes, it sees millions of foot-pilgrims (padyatris) during Navratri.",
    distance: "435 km",
    dressCode: "Traditional Indian clothing. Avoid modern western wear.",
    category: "Kutch & Border",
    timingsFallback: [
      { label: "Morning Aarti", open: "05:00", close: "05:30" },
      { label: "General Darshan", open: "05:30", close: "20:30" },
      { label: "Sandhya Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "narayan-sarovar": {
    deity: "Lord Vishnu (Trivikramraiji)",
    town: "Narayan Sarovar",
    district: "Kutch",
    significance: "One of India's five sacred lakes (Panch Sarovar) mentioned in the Shrimad Bhagavata. Houses a beautiful complex of temples built by the Queen of Kutch.",
    distance: "450 km",
    dressCode: "Modest clothes. Swimwear restricted to designated ghats.",
    category: "Kutch & Border",
    timingsFallback: [
      { label: "Morning Darshan", open: "06:00", close: "12:00" },
      { label: "Afternoon Darshan", open: "14:00", close: "19:00" }
    ]
  },
  "koteshwar": {
    deity: "Lord Shiva (Koteshwar Mahadev)",
    town: "Koteshwar",
    district: "Kutch",
    significance: "Marking India's westernmost boundary, this historic seaside stone temple overlooks the Arabian Sea. It is linked to the mythology of Ravana and the Koti Lingas.",
    distance: "452 km",
    dressCode: "Traditional wear. Shoulders and knees must be covered.",
    category: "Shiva & Jyotirlinga",
    timingsFallback: [
      { label: "Morning Darshan", open: "06:00", close: "13:00" },
      { label: "Afternoon Darshan", open: "15:00", close: "20:00" },
      { label: "Evening Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "bagdana-temple-bajrangdas-bapa": {
    deity: "Saint Bajrangdas Bapa",
    town: "Bagdana",
    district: "Bhavnagar",
    significance: "A peaceful spiritual ashram dedicated to Bapa Sitaram. Renowned for its massive volunteer base and community kitchens serving breakfast, lunch, and dinner daily.",
    distance: "230 km",
    dressCode: "Modest attire. Covering head during darshan is customary.",
    category: "Saint Yatras",
    timingsFallback: [
      { label: "Morning Aarti", open: "05:00", close: "05:30" },
      { label: "Darshan Hours", open: "06:00", close: "21:00" },
      { label: "Evening Aarti", open: "19:00", close: "19:30" }
    ]
  },
  "akshardham-gandhinagar": {
    deity: "Lord Swaminarayan",
    town: "Gandhinagar",
    district: "Gandhinagar",
    significance: "A monumental 23-acre cultural complex constructed from 6,000 tons of pink sandstone. Showcases traditional architecture, spiritual exhibition halls, and musical water shows.",
    distance: "25 km",
    dressCode: "Strict modest dress code. Short clothing and cellphones not permitted inside.",
    category: "Monuments & Heritage",
    timingsFallback: [
      { label: "Complex Timings", open: "10:00", close: "20:00" },
      { label: "Exhibition Shows", open: "11:00", close: "18:00" },
      { label: "Sat-Chit-Anand Water Show", open: "19:00", close: "19:45" }
    ]
  }
};

export const TEMPLE_CARD_ITEMS: TempleCardItem[] = Object.entries(TEMPLE_DETAILS_MAPPING).map(([slug, d]) => ({
  slug,
  ...d,
}));

export const TEMPLES_PAGE_DEFAULTS = {
  meta: {
    title: "Temples of Gujarat — Timings, Darshan Guide & Tour Packages",
    description:
      "Pilgrimage guide to famous temples of Gujarat, including Dakor Ranchhodrai, Virpur Jalaram, Salangpur Hanuman, Chotila, Koteshwar, Akshardham. Verified timings & details.",
  },
  h1: "Famous Temples In Gujarat",
  answerFirst:
    "Gujarat is home to some of India's most ancient and powerful holy shrines. Beyond Somnath and Dwarka, explore these highly revered temples, complete with verified darshan schedules, dress guidelines, and pilgrim travel logistics.",
  schemaDescription: "Pilgrimage guide to the famous temples of Gujarat — timings, darshan and travel details.",
  eyebrow: "Gujarat Devotion Silo",
  searchPlaceholder: "Search temples by name, deity, town or significance...",
  clearLabel: "Clear",
  allCategoriesLabel: "All",
  trust: {
    sites: "{count}+ sacred sites",
    timings: "Verified darshan timings",
    travel: "Cab & travel help",
  },
  resultsLabel: "Showing {shown} of {total} Sacred Sites",
  filterActive: "Filter active",
  noResults: { title: "No Temples Found", text: "Try adjusting your search criteria or category filter." },
  card: {
    deityLabel: "Deity: {deity}",
    locationLabel: "Location:",
    districtSuffix: "Dist.",
    distanceLabel: "Distance (from Ahmedabad):",
    dressCodeLabel: "Dress Code:",
    timingsVerified: "Timings Verified",
    timingsLabel: "Darshan & Aarti Timings",
    contactTrust: "Contact Trust",
    timingsPending: "Timings pending trust verification.",
    liveDarshanCta: "Access Live Darshan",
    detailsCta: "Details",
    planCta: "Plan Trip",
  },
  /** Fallbacks for a CMS temple with no card details of its own. */
  fallback: {
    deity: "Deity",
    town: "Gujarat",
    significance: "Revered temple yatra in Gujarat.",
    distance: "Contact us",
    dressCode: "Modest attire",
    category: "Monuments & Heritage",
  },
  categoryImages: [
    { category: "Shiva & Jyotirlinga", image: "/images/home/SomnathLongImage.webp" },
    { category: "Krishna & Vishnu", image: "/images/home/DwarikaLongImage.webp" },
    { category: "Shakti/Mata", image: "/images/junagadh-girnar/junagadh-girnar-hero.webp" },
    { category: "Saint Yatras", image: "/images/CTA.webp" },
    { category: "Kutch & Border", image: "/images/festivals/festival-hero.webp" },
    { category: "Virtual Portal", image: "/images/CTA.webp" },
  ],
  categoryImageFallback: "/images/CTA.webp",
  callout: {
    title: "Need Help Arranging a Temple Circuit?",
    text:
      "Planning a pilgrimage to multiple cities in Gujarat like Somnath, Dwarka, Dakor, or Kutch? Our expert local travel team designs custom, temple-sequenced itineraries with verified timings, private cabs, and hand-selected hotels near temple areas.",
    packagesCta: { label: "Explore Tour Packages", href: "/somnath-dwarka-tour-package/" },
    cabCta: { label: "Book Private Cab & Driver", href: "/somnath-dwarka-taxi-service/" },
  },
};

export type TemplesCopy = typeof TEMPLES_PAGE_DEFAULTS;

export const TEMPLES_PAGE: PageDef<TemplesCopy> = {
  id: "temples",
  title: "Temples of Gujarat directory",
  group: "Destination pages",
  path: "/temples/",
  notes:
    "Copy of /temples/. The temples listed are the CMS \"temple\" items; the page's h1, answer and SEO title/description " +
    "come from the CMS \"temples\" hub item when it has them, and fall back to meta/h1/answerFirst here. Each card's " +
    "deity, town, district, significance, distance, dress code, category and fallback timings come from the CMS temple, " +
    "then from its item in the site_temple_cards dataset, then from `fallback`. The category filter buttons and icons are " +
    "fixed in code (Shiva & Jyotirlinga, Krishna & Vishnu, Shakti/Mata, Saint Yatras, Kutch & Border, Monuments & " +
    "Heritage); categoryImages[{category, image}] sets the card photo per category. Placeholders: {count}, {shown}, " +
    "{total} (numbers of temples), {deity}. Never mark timings verified that the temple trust has not confirmed.",
  defaults: TEMPLES_PAGE_DEFAULTS,
};
