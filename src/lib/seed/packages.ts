/**
 * Seed content for the package silo (SOP §5 #2, #3). Used as fallback when the
 * CMS has no entry yet, so pages render on day one. Every price/timing is a
 * PLACEHOLDER (verify=false) and shows an "awaiting confirmation" stamp.
 */
export type SeedPackage = {
  slug: string;
  title: string;
  h1: string;
  facet: "duration" | "from-city" | "addon" | "traveller";
  duration: string;
  price_from: number;
  price_verified: boolean;
  answer_first: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string; stops?: string[] }[];
  inclusions: string[];
  exclusions: string[];
  faq: { question: string; answer: string }[];
};

const commonFaq = (name: string) => [
  {
    question: `What is the best time for the ${name}?`,
    answer:
      "October to March offers the most comfortable weather for temple darshan and coastal sightseeing across the Somnath–Dwarka circuit.",
  },
  {
    question: "Are temple darshan timings included in the plan?",
    answer:
      "Yes — the itinerary is sequenced around aarti and darshan windows. Exact timings are confirmed before travel as temple schedules can change on festival days.",
  },
  {
    question: "Is the price per person or per group?",
    answer:
      "Package prices shown are indicative starting points pending final confirmation. Your exact quote depends on group size, hotel tier and vehicle — share your dates for a firm price.",
  },
];

export const SEED_PACKAGES: SeedPackage[] = [
  {
    slug: "4-days-3-nights",
    title: "Somnath Dwarka Tour Package 4 Days 3 Nights — Itinerary & Price",
    h1: "Somnath Dwarka Tour Package — 4 Days 3 Nights",
    facet: "duration",
    duration: "4 Days / 3 Nights",
    price_from: 13999,
    price_verified: false,
    answer_first:
      "The 4 days / 3 nights Somnath Dwarka tour package covers Dwarkadhish Temple, Nageshwar, Bet Dwarka, Somnath Temple and the light-and-sound show, with comfortable stays and private transport. It suits families and first-time pilgrims wanting the core circuit without rushing.",
    highlights: [
      "Dwarkadhish Temple darshan",
      "Nageshwar Jyotirlinga",
      "Bet Dwarka ferry",
      "Somnath Temple & aarti",
      "Somnath light & sound show",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar, Bet Dwarka, Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive to Somnath via Porbandar; evening Somnath aarti & light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam, departure.", stops: ["Triveni Sangam"] },
    ],
    inclusions: ["3 nights hotel", "Private AC vehicle", "Daily breakfast", "Toll, parking, driver allowance"],
    exclusions: ["Air/train fare", "Lunch & dinner", "Personal expenses", "Anything not listed in inclusions"],
    faq: commonFaq("4 days 3 nights Somnath Dwarka tour"),
  },
  {
    slug: "3-days-2-nights",
    title: "Somnath Dwarka Tour Package 3 Days 2 Nights — Itinerary & Price",
    h1: "Somnath Dwarka Tour Package — 3 Days 2 Nights",
    facet: "duration",
    duration: "3 Days / 2 Nights",
    price_from: 10999,
    price_verified: false,
    answer_first:
      "The 3 days / 2 nights Somnath Dwarka package is a fast-paced pilgrimage covering Dwarkadhish, Nageshwar and Somnath temples with private transport. It works best for travellers short on time who still want darshan at both jyotirlinga-associated sites.",
    highlights: ["Dwarkadhish darshan", "Nageshwar Jyotirlinga", "Somnath Temple & aarti"],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, Dwarkadhish darshan, Nageshwar.", stops: ["Dwarkadhish Temple", "Nageshwar"] },
      { day: 2, title: "Dwarka to Somnath", description: "Drive to Somnath, evening aarti & light-and-sound show.", stops: ["Somnath Temple"] },
      { day: 3, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam, departure." },
    ],
    inclusions: ["2 nights hotel", "Private AC vehicle", "Daily breakfast", "Toll, parking, driver allowance"],
    exclusions: ["Air/train fare", "Lunch & dinner", "Personal expenses"],
    faq: commonFaq("3 days 2 nights Somnath Dwarka tour"),
  },
  {
    slug: "from-ahmedabad",
    title: "Somnath Dwarka Tour Package from Ahmedabad — Itinerary & Price",
    h1: "Somnath Dwarka Tour Package from Ahmedabad",
    facet: "from-city",
    duration: "4–5 Days",
    price_from: 14999,
    price_verified: false,
    answer_first:
      "The Somnath Dwarka tour package from Ahmedabad starts with pickup in Ahmedabad and covers Dwarka, Nageshwar, Bet Dwarka and Somnath by private road, returning to Ahmedabad. It is the most popular starting point given Ahmedabad's rail and air connectivity.",
    highlights: ["Ahmedabad pickup & drop", "Dwarka & Somnath temples", "Private road journey", "Flexible 4–5 day plan"],
    itinerary: [
      { day: 1, title: "Ahmedabad to Dwarka", description: "Depart Ahmedabad, drive to Dwarka, evening aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar, Bet Dwarka, Rukmini Temple." },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; Somnath aarti & show." },
      { day: 4, title: "Somnath to Ahmedabad", description: "Morning darshan, return drive to Ahmedabad." },
    ],
    inclusions: ["Ahmedabad pickup & drop", "3–4 nights hotel", "Private AC vehicle", "Daily breakfast"],
    exclusions: ["Air/train fare to Ahmedabad", "Lunch & dinner", "Personal expenses"],
    faq: commonFaq("Somnath Dwarka tour from Ahmedabad"),
  },
  {
    slug: "from-rajkot",
    title: "Somnath Dwarka Tour Package from Rajkot — Itinerary & Price",
    h1: "Somnath Dwarka Tour Package from Rajkot",
    facet: "from-city",
    duration: "3–4 Days",
    price_from: 12999,
    price_verified: false,
    answer_first:
      "The Somnath Dwarka tour package from Rajkot uses Rajkot as the base, cutting driving time to both temple towns. Expect pickup in Rajkot, darshan at Dwarka and Somnath, and a return to Rajkot over 3–4 days.",
    highlights: ["Rajkot pickup & drop", "Shorter drive times", "Dwarka & Somnath temples"],
    itinerary: [
      { day: 1, title: "Rajkot to Dwarka", description: "Depart Rajkot, drive to Dwarka, evening aarti." },
      { day: 2, title: "Dwarka to Somnath", description: "Nageshwar en route, Somnath aarti & show." },
      { day: 3, title: "Somnath to Rajkot", description: "Morning darshan, return to Rajkot." },
    ],
    inclusions: ["Rajkot pickup & drop", "2–3 nights hotel", "Private AC vehicle", "Daily breakfast"],
    exclusions: ["Fare to Rajkot", "Lunch & dinner", "Personal expenses"],
    faq: commonFaq("Somnath Dwarka tour from Rajkot"),
  },
  {
    slug: "from-mumbai",
    title: "Somnath Dwarka Tour Package from Mumbai — Itinerary & Price",
    h1: "Somnath Dwarka Tour Package from Mumbai",
    facet: "from-city",
    duration: "5–6 Days",
    price_from: 18999,
    price_verified: false,
    answer_first:
      "The Somnath Dwarka tour package from Mumbai typically combines a flight or train to Gujarat with a private road circuit of Dwarka and Somnath. Plan 5–6 days to allow travel time plus unhurried darshan at both temples.",
    highlights: ["Flight/train guidance", "Full Dwarka–Somnath circuit", "5–6 day relaxed plan"],
    itinerary: [
      { day: 1, title: "Mumbai to Gujarat", description: "Travel to Ahmedabad/Rajkot by air or train; transfer." },
      { day: 2, title: "Dwarka", description: "Dwarkadhish darshan, Nageshwar, Bet Dwarka." },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; Somnath aarti & show." },
      { day: 4, title: "Somnath", description: "Morning darshan, Triveni Sangam." },
      { day: 5, title: "Return to Mumbai", description: "Transfer to airport/station for return." },
    ],
    inclusions: ["Airport/station transfers in Gujarat", "4–5 nights hotel", "Private AC vehicle", "Daily breakfast"],
    exclusions: ["Mumbai–Gujarat air/train fare", "Lunch & dinner", "Personal expenses"],
    faq: commonFaq("Somnath Dwarka tour from Mumbai"),
  },
  {
    slug: "for-family",
    title: "Somnath Dwarka Family Tour Package — Itinerary & Price",
    h1: "Somnath Dwarka Tour Package for Family",
    facet: "traveller",
    duration: "4–5 Days",
    price_from: 15999,
    price_verified: false,
    answer_first:
      "The family Somnath Dwarka tour package is paced for children and elders, with comfortable hotels, private transport, minimal walking between darshans and flexible meal stops. It covers the full Dwarka–Somnath circuit without long single-day drives.",
    highlights: ["Elder & child friendly", "Comfortable hotels", "Minimal walking", "Private transport"],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Relaxed check-in, evening Dwarkadhish aarti." },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar, Bet Dwarka at an easy pace." },
      { day: 3, title: "Dwarka to Somnath", description: "Comfortable drive, Somnath aarti & show." },
      { day: 4, title: "Somnath & departure", description: "Morning darshan, departure." },
    ],
    inclusions: ["Family rooms", "Private AC vehicle", "Daily breakfast", "Assistance for elders"],
    exclusions: ["Air/train fare", "Lunch & dinner", "Personal expenses"],
    faq: commonFaq("family Somnath Dwarka tour"),
  },
  {
    slug: "budget",
    title: "Budget Somnath Dwarka Tour Package — Itinerary & Price",
    h1: "Budget Somnath Dwarka Tour Package",
    facet: "traveller",
    duration: "3–4 Days",
    price_from: 8999,
    price_verified: false,
    answer_first:
      "The budget Somnath Dwarka tour package covers the essential darshans at Dwarka and Somnath using clean value hotels and shared or compact private transport. It keeps costs low while still sequencing the trip around aarti and darshan windows.",
    highlights: ["Value hotels", "Essential darshans", "Cost-efficient transport"],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Check-in, Dwarkadhish darshan." },
      { day: 2, title: "Dwarka to Somnath", description: "Nageshwar en route, Somnath aarti." },
      { day: 3, title: "Somnath & departure", description: "Morning darshan, departure." },
    ],
    inclusions: ["Value hotel stays", "Transport", "Daily breakfast"],
    exclusions: ["Air/train fare", "Lunch & dinner", "Personal expenses"],
    faq: commonFaq("budget Somnath Dwarka tour"),
  },
];

export const findSeedPackage = (slug: string) =>
  SEED_PACKAGES.find((p) => p.slug === slug) ?? null;
