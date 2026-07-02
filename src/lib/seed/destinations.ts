/**
 * Seed content for destination pillars, temple-info, journeys, hotels,
 * festivals, comparisons, tools and author (SOP §5 #8–16). Placeholders carry
 * verify=false; faith/legend content is tagged, never asserted as verified fact.
 */

export type SeedDestination = {
  slug: string; // somnath | dwarka
  destination: string;
  title: string;
  h1: string;
  answer_first: string;
  significance: string; // faith-tagged
  best_time: string;
  how_to_reach: string;
  top_places: { name: string; slug: string; blurb: string }[];
  key_distances: { from: string; to: string; distance: string; duration: string }[];
  map_query: string;
  faq: { question: string; answer: string }[];
};

export const SEED_DESTINATIONS: SeedDestination[] = [
  {
    slug: "somnath",
    destination: "Somnath",
    title: "Somnath Travel Guide — Temple, Timings & Things to Do",
    h1: "Somnath Travel Guide",
    answer_first:
      "Somnath, on Gujarat's Saurashtra coast, is home to the Somnath Temple — revered in tradition as the first of the twelve jyotirlingas. Plan around the aarti and the evening light-and-sound show, and pair it with Triveni Sangam and Bhalka Tirth nearby.",
    significance:
      "In faith and legend, Somnath is counted as the first among the twelve jyotirlingas of Shiva and is associated with the moon god Soma.",
    best_time: "October to March for pleasant coastal weather.",
    how_to_reach:
      "Nearest airports are Diu (~85 km) and Rajkot (~190 km); Veraval is the closest railhead (~7 km). Most visitors arrive by road from Dwarka, Rajkot or Ahmedabad.",
    top_places: [
      { name: "Somnath Temple", slug: "somnath-temple", blurb: "The main jyotirlinga temple and evening aarti." },
      { name: "Triveni Sangam", slug: "triveni-sangam", blurb: "Confluence of three rivers meeting the sea." },
      { name: "Bhalka Tirth", slug: "bhalka-tirth", blurb: "Associated with the final days of Lord Krishna." },
    ],
    key_distances: [
      { from: "Somnath", to: "Dwarka", distance: "≈ 233 km", duration: "~ 4.5–5 hr" },
      { from: "Somnath", to: "Veraval station", distance: "≈ 7 km", duration: "~ 15 min" },
      { from: "Somnath", to: "Diu", distance: "≈ 85 km", duration: "~ 2 hr" },
    ],
    map_query: "Somnath Temple, Gujarat",
    faq: [
      { question: "What is Somnath famous for?", answer: "Somnath is best known for the Somnath Temple, traditionally regarded as the first jyotirlinga, and its seaside setting with a popular evening light-and-sound show." },
      { question: "How many days do you need for Somnath?", answer: "One full day covers the temple, aarti, Triveni Sangam and Bhalka Tirth. Most travellers combine it with Dwarka over 3–5 days." },
    ],
  },
  {
    slug: "dwarka",
    destination: "Dwarka",
    title: "Dwarka Travel Guide — Temple, Timings & Things to Do",
    h1: "Dwarka Travel Guide",
    answer_first:
      "Dwarka, on Gujarat's western tip, is one of the Char Dham and home to the Dwarkadhish Temple dedicated to Lord Krishna. A typical visit covers Dwarkadhish darshan, Nageshwar Jyotirlinga, Bet Dwarka by ferry, and Rukmini Devi Temple.",
    significance:
      "In faith and tradition, Dwarka is revered as Lord Krishna's ancient kingdom and is one of the four Char Dham pilgrimage sites.",
    best_time: "October to March; avoid peak monsoon for ferry crossings to Bet Dwarka.",
    how_to_reach:
      "Nearest airport is Jamnagar (~130 km); Dwarka has its own railway station on the Ahmedabad–Okha line. Road access is easy from Rajkot, Jamnagar and Somnath.",
    top_places: [
      { name: "Dwarkadhish Temple", slug: "dwarkadhish-temple", blurb: "The main Krishna temple and aarti." },
      { name: "Nageshwar Jyotirlinga", slug: "nageshwar-jyotirlinga", blurb: "One of the twelve jyotirlingas, near Dwarka." },
      { name: "Bet Dwarka", slug: "bet-dwarka", blurb: "Island reached by ferry, linked to Krishna's life." },
    ],
    key_distances: [
      { from: "Dwarka", to: "Somnath", distance: "≈ 233 km", duration: "~ 4.5–5 hr" },
      { from: "Dwarka", to: "Nageshwar", distance: "≈ 17 km", duration: "~ 30 min" },
      { from: "Dwarka", to: "Okha (Bet Dwarka jetty)", distance: "≈ 30 km", duration: "~ 45 min" },
    ],
    map_query: "Dwarkadhish Temple, Dwarka, Gujarat",
    faq: [
      { question: "What is Dwarka famous for?", answer: "Dwarka is famous as one of the Char Dham and the site of the Dwarkadhish Temple dedicated to Lord Krishna, along with nearby Nageshwar Jyotirlinga and Bet Dwarka." },
      { question: "How do you reach Bet Dwarka?", answer: "Bet Dwarka is an island reached by a short ferry from Okha jetty, about 30 km from Dwarka town." },
    ],
  },
];

export type SeedTempleInfo = {
  slug: string;
  destination: string;
  topic: string;
  title: string;
  h1: string;
  answer_first: string;
  timings: { label: string; open: string; close: string }[];
  verified: boolean;
  official_source_url: string;
  dress_code: string;
  photography_rule: string;
  faq: { question: string; answer: string }[];
};

export const SEED_TEMPLE_INFO: SeedTempleInfo[] = [
  {
    slug: "timings",
    destination: "somnath",
    topic: "timings",
    title: "Somnath Temple Timings & Aarti — Darshan Schedule",
    h1: "Somnath Temple Timings & Aarti",
    answer_first:
      "Somnath Temple is generally open for darshan from early morning to night, with aartis through the day and a light-and-sound show in the evening. The indicative schedule below is pending confirmation against the official source before you travel.",
    timings: [
      { label: "Temple darshan", open: "06:00", close: "21:30" },
      { label: "Morning aarti", open: "07:00", close: "—" },
      { label: "Noon aarti", open: "12:00", close: "—" },
      { label: "Evening aarti", open: "19:00", close: "—" },
      { label: "Light & sound show", open: "20:00", close: "21:00" },
    ],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "What are Somnath Temple aarti timings?", answer: "Aartis are held morning, noon and evening (indicatively 07:00, 12:00 and 19:00). Confirm against the official site as festival days differ." },
      { question: "Is there a light and sound show at Somnath?", answer: "Yes, an evening light-and-sound show runs near the temple; timings vary seasonally." },
    ],
  },
  {
    slug: "darshan",
    destination: "dwarka",
    topic: "darshan",
    title: "Dwarkadhish Temple Darshan Timings — Aarti Schedule",
    h1: "Dwarkadhish Temple Darshan & Aarti Timings",
    answer_first:
      "Dwarkadhish Temple opens in the early morning and closes late at night, with a midday break, mangla aarti at dawn and multiple darshan windows. The indicative schedule below is pending confirmation against the official source before you travel.",
    timings: [
      { label: "Mangla aarti", open: "06:30", close: "—" },
      { label: "Morning darshan", open: "07:00", close: "13:00" },
      { label: "Evening darshan", open: "17:00", close: "21:30" },
    ],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Traditional/modest attire; footwear removed before entry.",
    photography_rule: "Photography is usually not allowed inside the temple.",
    faq: [
      { question: "What are Dwarkadhish darshan timings?", answer: "Darshan is typically in the morning and evening with a midday break; mangla aarti is around dawn. Confirm exact times against the official temple source." },
    ],
  },
];

export type SeedJourney = {
  slug: string;
  title: string;
  h1: string;
  question: string;
  direct_answer: string;
  modes: { mode: string; distance: string; duration: string; note: string }[];
  itinerary?: { day: number; title: string; description: string; stops?: string[] }[];
  faq: { question: string; answer: string }[];
};

export const SEED_JOURNEYS: SeedJourney[] = [
  {
    slug: "dwarka-to-somnath-distance",
    title: "Dwarka to Somnath Distance — Route & Itinerary",
    h1: "Dwarka to Somnath Distance",
    question: "How far is Dwarka from Somnath and how long does it take?",
    direct_answer:
      "Dwarka to Somnath is approximately 233 km by road and takes about 4.5–5 hours, typically via Porbandar. There is no direct short train; road is the practical option for pilgrims doing both temples.",
    modes: [
      { mode: "Road (car)", distance: "≈ 233 km", duration: "~ 4.5–5 hr", note: "Via Porbandar; most common." },
      { mode: "Train", distance: "Indirect", duration: "Varies", note: "No convenient direct service; road preferred." },
      { mode: "Air", distance: "—", duration: "—", note: "No direct commercial flights between the two." },
    ],
    faq: [
      { question: "Is there a direct train from Dwarka to Somnath?", answer: "There is no convenient direct train; most pilgrims travel the ~233 km by road in about 4.5–5 hours." },
    ],
  },
  {
    slug: "somnath-or-dwarka-first",
    title: "Somnath or Dwarka First? — How to Plan the Route",
    h1: "Should You Visit Somnath or Dwarka First?",
    question: "Should you visit Somnath or Dwarka first?",
    direct_answer:
      "Either order works; choose by your entry point. Arriving via Ahmedabad/Rajkot, many do Dwarka first then Somnath (or vice-versa) to avoid backtracking. If you fly into Diu, start with Somnath; via Jamnagar, start with Dwarka.",
    modes: [],
    faq: [
      { question: "Is it better to start with Somnath or Dwarka?", answer: "It depends on your arrival city. Pick the temple town closer to your entry point first to minimise driving." },
    ],
  },
  {
    slug: "how-many-days-for-somnath-dwarka",
    title: "How Many Days for Somnath & Dwarka? — Trip Length Guide",
    h1: "How Many Days Do You Need for Somnath and Dwarka?",
    question: "How many days do you need for Somnath and Dwarka?",
    direct_answer:
      "Plan 3–5 days for a comfortable Somnath–Dwarka pilgrimage. Three days is the minimum for both temples; four to five days adds Nageshwar, Bet Dwarka, Porbandar and unhurried darshan without long single-day drives.",
    modes: [],
    itinerary: [
      { day: 1, title: "Dwarka", description: "Dwarkadhish darshan, Nageshwar, Bet Dwarka." },
      { day: 2, title: "Dwarka to Somnath", description: "Drive via Porbandar; Somnath aarti & show." },
      { day: 3, title: "Somnath", description: "Morning darshan, Triveni Sangam, departure." },
    ],
    faq: [
      { question: "Is 3 days enough for Somnath and Dwarka?", answer: "Three days covers both temples at a brisk pace. Four to five days is more comfortable and adds nearby sights." },
    ],
  },
  {
    slug: "3-day-somnath-dwarka-itinerary",
    title: "3-Day Somnath Dwarka Itinerary — Day-wise Plan",
    h1: "3-Day Somnath Dwarka Itinerary",
    question: "What is a good 3-day Somnath Dwarka itinerary?",
    direct_answer:
      "A 3-day Somnath–Dwarka itinerary covers both temples at a brisk pace: Day 1 Dwarka (Dwarkadhish + Nageshwar), Day 2 drive to Somnath with the evening aarti, Day 3 Somnath darshan and departure. It works best from a nearby base like Rajkot or Jamnagar.",
    modes: [],
    itinerary: [
      { day: 1, title: "Dwarka", description: "Arrive Dwarka, Dwarkadhish darshan, Nageshwar Jyotirlinga.", stops: ["Dwarkadhish Temple", "Nageshwar"] },
      { day: 2, title: "Dwarka to Somnath", description: "Drive via Porbandar, evening Somnath aarti and light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 3, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam, departure.", stops: ["Triveni Sangam"] },
    ],
    faq: [
      { question: "Can I cover Somnath and Dwarka in 3 days?", answer: "Yes, at a brisk pace. Three days covers both temples; add a day for Bet Dwarka or a relaxed schedule." },
    ],
  },
  {
    slug: "4-day-somnath-dwarka-itinerary",
    title: "4-Day Somnath Dwarka Itinerary — Day-wise Plan",
    h1: "4-Day Somnath Dwarka Itinerary",
    question: "What is a good 4-day Somnath Dwarka itinerary?",
    direct_answer:
      "A 4-day Somnath–Dwarka itinerary adds Bet Dwarka and an unhurried pace: Day 1 arrive Dwarka, Day 2 Nageshwar and Bet Dwarka, Day 3 drive to Somnath with the evening aarti, Day 4 Somnath darshan and departure.",
    modes: [],
    itinerary: [
      { day: 1, title: "Arrive Dwarka", description: "Check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry, Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar, evening Somnath aarti and light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam, departure.", stops: ["Triveni Sangam"] },
    ],
    faq: [
      { question: "Is 4 days ideal for Somnath and Dwarka?", answer: "Four days is a comfortable length — it covers both temples plus Bet Dwarka and Nageshwar without long single-day drives." },
    ],
  },
];

export type SeedHotel = {
  slug: string; // hotels-in-somnath
  city: string;
  title: string;
  h1: string;
  near_temple: string;
  answer_first: string;
  tiers: { tier: string; area: string; typical_range: string }[];
  faq: { question: string; answer: string }[];
};

export const SEED_HOTELS: SeedHotel[] = [
  {
    slug: "hotels-in-somnath",
    city: "Somnath",
    title: "Hotels in Somnath — Near Temple, Budget to Luxury",
    h1: "Hotels in Somnath",
    near_temple: "Somnath Temple",
    answer_first:
      "Hotels in Somnath range from budget lodges near the temple to a few sea-facing mid and premium stays. Staying within walking distance of the temple makes early darshan and the evening aarti easy. We help you pick and book the right tier — we do not list fake inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Near temple / bus stand", typical_range: "₹—" },
      { tier: "Mid-range", area: "Temple road / sea-facing", typical_range: "₹—" },
      { tier: "Premium", area: "Sea-facing", typical_range: "₹—" },
    ],
    faq: [
      { question: "Where should I stay in Somnath?", answer: "Staying near the temple keeps darshan and the evening aarti within walking distance. Sea-facing options sit slightly further out." },
    ],
  },
  {
    slug: "hotels-in-dwarka",
    city: "Dwarka",
    title: "Hotels in Dwarka — Near Dwarkadhish, Budget to Luxury",
    h1: "Hotels in Dwarka",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Hotels in Dwarka cluster around the Dwarkadhish Temple and along the main road, from simple pilgrim lodges to comfortable mid-range stays. A central location helps with mangla aarti and evening darshan. We assist with selection and booking — no fabricated inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Near Dwarkadhish Temple", typical_range: "₹—" },
      { tier: "Mid-range", area: "Main road", typical_range: "₹—" },
      { tier: "Premium", area: "Outskirts / resort", typical_range: "₹—" },
    ],
    faq: [
      { question: "Are there hotels near Dwarkadhish Temple?", answer: "Yes — several budget and mid-range hotels are within walking distance of the temple, convenient for early darshan." },
    ],
  },
];

export type SeedFestival = {
  slug: string;
  festival: string;
  title: string;
  h1: string;
  answer_first: string;
  rituals: string; // faith-tagged
  travel_advice: string;
  event_venue: string;
  date_this_year: string; // empty until confirmed -> no Event schema
  faq: { question: string; answer: string }[];
};

export const SEED_FESTIVALS: SeedFestival[] = [
  {
    slug: "janmashtami-dwarka",
    festival: "Janmashtami",
    title: "Janmashtami in Dwarka — Dates, Rituals & Travel Guide",
    h1: "Janmashtami in Dwarka",
    answer_first:
      "Janmashtami, marking the birth of Lord Krishna, is the biggest celebration at Dwarka, drawing large crowds for special darshan and midnight festivities. Book stays and cabs well in advance. Exact dates change each year and are confirmed before publishing.",
    rituals:
      "In tradition, devotees observe fasting, midnight aarti marking Krishna's birth, and special decorations at the Dwarkadhish Temple.",
    travel_advice:
      "Expect heavy crowds and higher tariffs; reserve hotels and transport 6–10 weeks ahead and plan darshan timing around the rush.",
    event_venue: "Dwarkadhish Temple, Dwarka",
    date_this_year: "",
    faq: [
      { question: "When is Janmashtami celebrated in Dwarka?", answer: "Janmashtami falls in August–September and the exact date changes yearly with the Hindu calendar. Confirmed dates are published before the season." },
    ],
  },
  {
    slug: "maha-shivratri-somnath",
    festival: "Maha Shivratri",
    title: "Maha Shivratri at Somnath — Dates, Rituals & Travel Guide",
    h1: "Maha Shivratri at Somnath",
    answer_first:
      "Maha Shivratri is a major festival at Somnath, with night-long worship of Shiva and special aartis at the jyotirlinga. The town fills up; advance booking of stays and cabs is essential. Exact dates change each year and are confirmed before publishing.",
    rituals:
      "In tradition, devotees keep a night vigil, offer bilva leaves and participate in continuous aartis at the Somnath jyotirlinga.",
    travel_advice:
      "Crowds peak overnight; arrange accommodation and transport 6–10 weeks in advance and allow extra time for darshan queues.",
    event_venue: "Somnath Temple, Somnath",
    date_this_year: "",
    faq: [
      { question: "Is Maha Shivratri special at Somnath?", answer: "Yes — as a Shiva jyotirlinga site, Somnath sees night-long worship and special aartis on Maha Shivratri, with very large crowds." },
    ],
  },
];

export type SeedComparison = {
  slug: string;
  title: string;
  h1: string;
  optionA: string;
  optionB: string;
  answer_first: string;
  verdict: string;
  rows: { criterion: string; a: string; b: string }[];
  recommended_target: string;
  faq: { question: string; answer: string }[];
};

export const SEED_COMPARISONS: SeedComparison[] = [
  {
    slug: "somnath-vs-dwarka",
    title: "Somnath vs Dwarka — Which to Visit for Your Trip?",
    h1: "Somnath vs Dwarka — Which Is Better for Your Trip?",
    optionA: "Somnath",
    optionB: "Dwarka",
    answer_first:
      "Somnath and Dwarka serve different devotions — Somnath is a Shiva jyotirlinga site, Dwarka a Krishna Char Dham. For a full pilgrimage you visit both; if you must choose one, pick by the deity you follow and your entry point into Gujarat.",
    verdict: "Do both if you can — they are ~233 km apart and pair naturally into one 3–5 day circuit.",
    rows: [
      { criterion: "Primary deity", a: "Shiva (jyotirlinga)", b: "Krishna (Char Dham)" },
      { criterion: "Signature experience", a: "Evening aarti + light & sound", b: "Dwarkadhish darshan + Bet Dwarka" },
      { criterion: "Nearest airport", a: "Diu (~85 km)", b: "Jamnagar (~130 km)" },
      { criterion: "Ideal stay", a: "1 full day", b: "1–2 days" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Should I visit Somnath or Dwarka?", answer: "If possible, visit both — they combine into one circuit. If choosing one, decide by whether you follow Shiva (Somnath) or Krishna (Dwarka) and your arrival city." },
    ],
  },
];

export type SeedTool = {
  slug: string;
  tool_type: string;
  title: string;
  h1: string;
  answer_first: string;
  static_shell_copy: string;
  result_cta_target: string;
  faq: { question: string; answer: string }[];
};

export const SEED_TOOLS: SeedTool[] = [
  {
    slug: "trip-planner",
    tool_type: "itinerary-planner",
    title: "Somnath Dwarka Trip Planner — Build Your Itinerary",
    h1: "Somnath Dwarka Trip Planner",
    answer_first:
      "Use the Somnath Dwarka trip planner to choose your days, starting city and pace, and get a suggested day-wise itinerary covering Dwarka and Somnath. The static plan below works without JavaScript; the interactive planner enhances it.",
    static_shell_copy:
      "A typical 4-day plan: Day 1 Dwarka darshan, Day 2 Nageshwar & Bet Dwarka, Day 3 drive to Somnath with evening aarti, Day 4 Somnath darshan and departure. Adjust for your start city and available days.",
    result_cta_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "How does the trip planner work?", answer: "Pick your days and starting city and it suggests a sequenced Dwarka–Somnath itinerary. You can then request a matching package quote." },
    ],
  },
  {
    slug: "fare-calculator",
    tool_type: "fare-calculator",
    title: "Somnath Dwarka Cab Fare Calculator — Estimate Costs",
    h1: "Somnath Dwarka Cab Fare Calculator",
    answer_first:
      "Estimate cab costs for the Somnath–Dwarka circuit by route and vehicle. The static fare table below is crawlable and works without JavaScript; the interactive calculator refines the estimate for your exact itinerary.",
    static_shell_copy:
      "Fares depend on route (e.g. Somnath ↔ Dwarka ~233 km), vehicle (sedan/SUV/Innova) and one-way vs round-trip. Exact rates are confirmed at booking.",
    result_cta_target: "/somnath-dwarka-taxi-service/",
    faq: [
      { question: "How is the cab fare calculated?", answer: "By route distance and vehicle type, with one-way and round-trip options. Final rates are confirmed at booking." },
    ],
  },
];

export const SEED_AUTHOR = {
  slug: "harsh-sharma",
  name: "Harsh Sharma",
  job_title: "Travel author, Somnath–Dwarka circuit",
  bio: "",
  bio_verified: false,
  experience_years: 0,
  experience_verified: false,
  photo: "",
  sameAs: [] as string[],
  answer_first:
    "This page introduces the author behind our Somnath–Dwarka guides. A verified biography, experience and profile links are pending — until confirmed we do not present author credentials as established fact (SOP E-E-A-T blocker).",
};

export const findSeedDestination = (slug: string) =>
  SEED_DESTINATIONS.find((d) => d.slug === slug) ?? null;
export const findSeedTempleInfo = (destination: string, topic: string) =>
  SEED_TEMPLE_INFO.find((t) => t.destination === destination && t.slug === topic) ?? null;
export const findSeedJourney = (slug: string) =>
  SEED_JOURNEYS.find((j) => j.slug === slug) ?? null;
export const findSeedHotel = (slug: string) =>
  SEED_HOTELS.find((h) => h.slug === slug) ?? null;
export const findSeedFestival = (slug: string) =>
  SEED_FESTIVALS.find((f) => f.slug === slug) ?? null;
export const findSeedComparison = (slug: string) =>
  SEED_COMPARISONS.find((c) => c.slug === slug) ?? null;
export const findSeedTool = (slug: string) =>
  SEED_TOOLS.find((t) => t.slug === slug) ?? null;
