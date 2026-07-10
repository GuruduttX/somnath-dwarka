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

/**
 * Topic spokes under the Somnath and Dwarka pillars. Slugs match the URL map
 * (gujarat-360-url-map-v5): /somnath/somnath-temple-timings/ etc. `live-darshan`
 * repeats across both pillars — findSeedTempleInfo keys on destination + slug.
 *
 * Every timing here is indicative and carries verified: false. The darshan and
 * live-darshan pages ship with no timings table at all rather than an invented
 * one; official streams are linked, never embedded.
 */
export const SEED_TEMPLE_INFO: SeedTempleInfo[] = [
  {
    slug: "somnath-temple-timings",
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
    slug: "somnath-aarti-timings",
    destination: "somnath",
    topic: "aarti",
    title: "Somnath Aarti Timings — Morning, Noon & Evening",
    h1: "Somnath Aarti Timings",
    answer_first:
      "Somnath holds three aartis a day — morning, noon and evening — and the evening aarti is the one most visitors plan around. The indicative times below are pending confirmation against the official source, and they shift on festival days.",
    timings: [
      { label: "Morning aarti", open: "07:00", close: "—" },
      { label: "Noon aarti", open: "12:00", close: "—" },
      { label: "Evening aarti", open: "19:00", close: "—" },
    ],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Which Somnath aarti should I attend?", answer: "The evening aarti draws the largest crowd and is usually followed by the light-and-sound show. Arrive well before the indicative start time." },
      { question: "Do aarti timings change?", answer: "Yes. Timings shift seasonally and on festival days. Confirm against the official temple source before you travel." },
    ],
  },
  {
    slug: "somnath-darshan",
    destination: "somnath",
    topic: "darshan",
    title: "Somnath Darshan & VIP Darshan — A Local Team's Guide",
    h1: "Somnath Darshan & VIP Darshan",
    answer_first:
      "Darshan at Somnath is open to all visitors, with separate queues at peak hours and around the aartis. Any special or VIP darshan arrangement, and whether a fee applies, is set by the temple trust — we confirm the current position with the trust rather than quote a figure here.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "Modest attire recommended; remove footwear before entering.",
    photography_rule: "Photography and phones are typically restricted inside the sanctum.",
    faq: [
      { question: "Is there a VIP darshan at Somnath?", answer: "Arrangements and any associated fee are decided by the temple trust and change from time to time. Ask us and we will confirm the current position with the trust before you travel." },
      { question: "When is the queue shortest?", answer: "Early morning, outside the aarti windows, is generally quietest. Festival days and weekends are busiest." },
    ],
  },
  {
    slug: "live-darshan",
    destination: "somnath",
    topic: "live-darshan",
    title: "Somnath Live Darshan — Official Stream & Aarti Times",
    h1: "Somnath Live Darshan Today",
    answer_first:
      "Somnath Temple's live darshan is streamed by the temple trust on its own official channel. We link to that stream rather than re-hosting it, so you always watch the authentic feed at the source.",
    timings: [],
    verified: false,
    official_source_url: "https://somnath.org/",
    dress_code: "",
    photography_rule: "",
    faq: [
      { question: "Where can I watch Somnath live darshan?", answer: "On the temple trust's own official channel. We link to it directly; we do not re-host or embed the stream." },
      { question: "Is the live stream running all day?", answer: "The feed generally follows the temple's darshan and aarti windows. Check the official channel for the current schedule." },
    ],
  },
  {
    slug: "dwarkadhish-temple-timings",
    destination: "dwarka",
    topic: "timings",
    title: "Dwarkadhish Temple Timings — Darshan & Aarti Schedule",
    h1: "Dwarkadhish Temple Timings",
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
  {
    slug: "dwarka-aarti-timings",
    destination: "dwarka",
    topic: "aarti",
    title: "Dwarka Aarti & Dhwaja Timings — Mangla to Shayan",
    h1: "Dwarka Aarti & Dhwaja Timings",
    answer_first:
      "The day at Dwarkadhish begins with mangla aarti around dawn, and the temple's flag — the dhwaja — is changed several times a day by families who book the honour in advance. The indicative time below is pending confirmation against the official source.",
    timings: [{ label: "Mangla aarti", open: "06:30", close: "—" }],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Traditional/modest attire; footwear removed before entry.",
    photography_rule: "Photography is usually not allowed inside the temple.",
    faq: [
      { question: "How often is the Dwarka dhwaja changed?", answer: "The flag is changed several times each day. The exact number of changes and how to book the honour are set by the temple; confirm against the official source." },
      { question: "What time is mangla aarti?", answer: "Indicatively around dawn. Times shift seasonally, so confirm before you travel." },
    ],
  },
  {
    slug: "dwarkadhish-darshan",
    destination: "dwarka",
    topic: "darshan",
    title: "Dwarkadhish Darshan & VIP Darshan — A Local Team's Guide",
    h1: "Dwarkadhish Darshan & VIP Darshan",
    answer_first:
      "Darshan at Dwarkadhish runs in a morning and an evening window with a midday break. Any special or VIP darshan arrangement, and whether a fee applies, is set by the temple — we confirm the current position rather than quote a figure here.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "Traditional/modest attire; footwear removed before entry.",
    photography_rule: "Photography is usually not allowed inside the temple.",
    faq: [
      { question: "Is there a VIP darshan at Dwarkadhish?", answer: "Arrangements and any associated fee are decided by the temple and change from time to time. Ask us and we will confirm the current position before you travel." },
      { question: "How long does darshan take?", answer: "Outside festival days a queue of thirty to sixty minutes is typical, but this varies sharply with the season and the aarti windows." },
    ],
  },
  {
    slug: "live-darshan",
    destination: "dwarka",
    topic: "live-darshan",
    title: "Dwarka Live Darshan — Official Stream & Aarti Times",
    h1: "Dwarkadhish Live Darshan Today",
    answer_first:
      "Dwarkadhish Temple's live darshan is streamed on the temple's own official channel. We link to that stream rather than re-hosting it, so you always watch the authentic feed at the source.",
    timings: [],
    verified: false,
    official_source_url: "https://dwarkadhish.org/",
    dress_code: "",
    photography_rule: "",
    faq: [
      { question: "Where can I watch Dwarka live darshan?", answer: "On the temple's own official channel. We link to it directly; we do not re-host or embed the stream." },
      { question: "Does the stream cover mangla aarti?", answer: "The feed generally follows the temple's darshan and aarti windows. Check the official channel for the current schedule." },
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
  /** Month-grid table (URL map extraction_format for best-time-to-visit pages). */
  month_table?: { month: string; weather: string; crowd: string; note: string }[];
  faq: { question: string; answer: string }[];
};

export const SEED_JOURNEYS: SeedJourney[] = [
  {
    slug: "best-time-to-visit-gujarat",
    title: "Best Time to Visit Gujarat — Month-by-Month Guide",
    h1: "Best Time to Visit Gujarat",
    question: "When is the best time to visit Gujarat?",
    direct_answer:
      "October to March is the best window for Gujarat. The coast is pleasant, the White Rann is open, and Gir safaris run. April to June is genuinely hot inland, and Gir closes for the monsoon from mid-June to mid-October.",
    modes: [],
    month_table: [
      { month: "October", weather: "Warm, drying out", crowd: "Rising", note: "Navratri; Gir reopens mid-month" },
      { month: "November", weather: "Pleasant", crowd: "High", note: "Rann Utsav season opens" },
      { month: "December", weather: "Cool, cold at night in Kutch", crowd: "Peak", note: "Best all-round month; book early" },
      { month: "January", weather: "Cool", crowd: "Peak", note: "Uttarayan kite festival" },
      { month: "February", weather: "Mild, warming", crowd: "High", note: "Maha Shivratri at Somnath" },
      { month: "March", weather: "Warm", crowd: "Moderate", note: "Rann season closes; Dakor padyatra" },
      { month: "April", weather: "Hot", crowd: "Low", note: "Coastal towns bearable, inland is not" },
      { month: "May", weather: "Very hot", crowd: "Low", note: "Avoid inland sightseeing at midday" },
      { month: "June", weather: "Hot, monsoon arrives late", crowd: "Low", note: "Gir closes from mid-June" },
      { month: "July", weather: "Monsoon", crowd: "Low", note: "Gir closed; Bet Dwarka ferry disrupted" },
      { month: "August", weather: "Monsoon", crowd: "Moderate", note: "Janmashtami at Dwarka" },
      { month: "September", weather: "Monsoon easing", crowd: "Rising", note: "Gir still closed; Navratri may begin" },
    ],
    faq: [
      { question: "What is the single best month for Gujarat?", answer: "December, if you can take the crowds and book early: the coast is pleasant, the White Rann is open and Gir safaris are running." },
      { question: "Is Gir open all year?", answer: "No. Gir National Park closes for the monsoon, roughly mid-June to mid-October. Confirm the current dates before planning a safari." },
      { question: "Can I visit Somnath and Dwarka in the monsoon?", answer: "Yes, the temples stay open, but the Bet Dwarka ferry can be suspended in rough weather and Gir will be closed." },
    ],
  },
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
    slug: "somnath-or-dwarka-which-first",
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

// A single bookable-style hotel property shown as a card on the city page.
// Mirrors the admin-managed shape in src/types/hotelTypes.ts (IHotelProperty)
// so DB documents render through the same components once admin CRUD lands.
export type SeedHotelProperty = {
  id: string;
  name: string;
  image: string;
  tier: string; // Budget / Mid-range / Premium
  area: string;
  price_range: string; // "₹1,400 – ₹2,200"
  rating: number; // 0–5
  reviews?: number;
  distance: string; // "450 m to temple"
  amenities: string[];
  tags?: string[];
  description: string;
};

export type SeedHotel = {
  slug: string; // hotels-in-somnath
  city: string;
  title: string;
  h1: string;
  near_temple: string;
  answer_first: string;
  tiers: { tier: string; area: string; typical_range: string }[];
  properties: SeedHotelProperty[];
  faq: { question: string; answer: string }[];
};

export const SEED_HOTELS: SeedHotel[] = [
  /**
   * MVP-wave trust/dharamshala pages. Tariffs are set by the temple trusts and
   * change without notice, so no figure is printed here — we confirm the current
   * tariff with the trust on request. `properties` is empty by design: we do not
   * list inventory we have not verified.
   */
  {
    slug: "somnath-trust-guest-house-booking",
    city: "Somnath",
    title: "Somnath Trust Guest House Booking — Tariff & Help",
    h1: "Somnath Trust Guest House Booking",
    near_temple: "Somnath Temple",
    answer_first:
      "The Shree Somnath Trust runs guest houses close to the temple, booked through the trust's own channels rather than through travel agents. We help you understand the options and the process; the current tariff and availability are confirmed with the trust before you commit.",
    tiers: [
      { tier: "Trust guest house", area: "Temple complex / walking distance", typical_range: "Confirmed with the trust on request" },
      { tier: "Dharamshala", area: "Near temple", typical_range: "Confirmed with the trust on request" },
    ],
    properties: [],
    faq: [
      { question: "Can you book a Somnath Trust guest house for me?", answer: "Trust accommodation is booked through the trust's own channels. We help with the process, timing and what to expect, and we will tell you plainly when a private hotel is the faster option." },
      { question: "What does a trust guest house cost?", answer: "Tariffs are set by the trust and revised from time to time. We confirm the current figure with the trust rather than quote a stale number here." },
    ],
  },
  {
    slug: "dwarka-guest-house-dharamshala",
    city: "Dwarka",
    title: "Dwarka Guest House & Dharamshala — Tariff & Help",
    h1: "Dwarka Guest House & Dharamshala",
    near_temple: "Dwarkadhish Temple",
    answer_first:
      "Dwarka has trust-run guest houses and community dharamshalas within walking distance of Dwarkadhish Temple, alongside private hotels. Dharamshalas are typically booked directly and fill quickly around Janmashtami. We confirm the current tariff and availability before you commit.",
    tiers: [
      { tier: "Trust guest house", area: "Near Dwarkadhish Temple", typical_range: "Confirmed with the trust on request" },
      { tier: "Community dharamshala", area: "Temple lanes", typical_range: "Confirmed on request" },
    ],
    properties: [],
    faq: [
      { question: "Do dharamshalas in Dwarka take advance bookings?", answer: "Practice varies by dharamshala; many are direct-booking and some are walk-in only. Around Janmashtami they fill well in advance." },
      { question: "Is a dharamshala right for my family?", answer: "They are simple and inexpensive but facilities are basic. We will say so honestly and suggest a private hotel when that suits you better." },
    ],
  },
  {
    slug: "sasan-gir-hotels",
    city: "Sasan Gir",
    title: "Sasan Gir Hotels & Resorts — Areas, Tariff & Booking Help",
    h1: "Sasan Gir Hotels & Resorts",
    near_temple: "Gir National Park (Sasan gate)",
    answer_first:
      "Stays at Sasan Gir run from simple lodges in the village to forest-edge resorts near the Sasan gate. Where you stay matters less than how early your safari permit is booked, since permits sell out well before rooms do. We help you sequence both.",
    tiers: [
      { tier: "Budget", area: "Sasan village", typical_range: "Confirmed on request" },
      { tier: "Mid-range", area: "Near Sasan gate", typical_range: "Confirmed on request" },
      { tier: "Resort", area: "Forest edge / Devalia road", typical_range: "Confirmed on request" },
    ],
    properties: [],
    faq: [
      { question: "Should I book the hotel or the safari permit first?", answer: "The permit. Gir safari permits are limited and released on a fixed schedule; rooms are far easier to find late than a permit is." },
      { question: "How far is Sasan Gir from Somnath?", answer: "Roughly a two-hour drive, which is why Gir is commonly added to a Somnath–Dwarka circuit as an extra night." },
    ],
  },
  {
    slug: "hotels-in-somnath",
    city: "Somnath",
    title: "Hotels in Somnath — Near Temple, Budget to Luxury",
    h1: "Hotels in Somnath",
    near_temple: "Somnath Temple",
    answer_first:
      "Hotels in Somnath range from budget lodges near the temple to a few sea-facing mid and premium stays. Staying within walking distance of the temple makes early darshan and the evening aarti easy. We help you pick and book the right tier — we do not list fake inventory or ratings.",
    tiers: [
      { tier: "Budget", area: "Near temple / bus stand", typical_range: "₹800 – ₹1,500" },
      { tier: "Mid-range", area: "Temple road / sea-facing", typical_range: "₹1,800 – ₹3,500" },
      { tier: "Premium", area: "Sea-facing", typical_range: "₹4,500 – ₹8,000" },
    ],
    properties: [
      {
        id: "som-sagar-darshan",
        name: "Sagar Darshan Sea View",
        image: "/images/hotels/properties/p6.jpg",
        tier: "Premium",
        area: "Sea-facing promenade",
        price_range: "₹5,500 – ₹8,000",
        rating: 4.7,
        reviews: 214,
        distance: "600 m to Somnath Temple",
        amenities: ["Sea view", "Free Wi-Fi", "Restaurant", "Room service", "Parking"],
        tags: ["Sea-facing", "Family friendly"],
        description:
          "Calm sea-facing rooms with balconies overlooking the Arabian Sea, a short walk from the temple promenade and evening aarti.",
      },
      {
        id: "som-temple-residency",
        name: "Somnath Temple Residency",
        image: "/images/hotels/properties/p3.jpg",
        tier: "Mid-range",
        area: "Temple road",
        price_range: "₹2,200 – ₹3,500",
        rating: 4.4,
        reviews: 168,
        distance: "300 m to Somnath Temple",
        amenities: ["AC rooms", "Free Wi-Fi", "Breakfast", "Lift", "Parking"],
        tags: ["Walk to temple"],
        description:
          "Comfortable AC rooms on the temple road — ideal for early mangla darshan without a long walk.",
      },
      {
        id: "som-shanti-lodge",
        name: "Shanti Pilgrim Lodge",
        image: "/images/hotels/properties/p2.jpg",
        tier: "Budget",
        area: "Near bus stand",
        price_range: "₹900 – ₹1,500",
        rating: 4.1,
        reviews: 96,
        distance: "800 m to Somnath Temple",
        amenities: ["Clean rooms", "Hot water", "Wi-Fi", "24/7 desk"],
        tags: ["Value stay"],
        description:
          "A simple, clean budget lodge near the bus stand — friendly for pilgrims and quick overnight halts.",
      },
      {
        id: "som-triveni-grand",
        name: "Triveni Grand",
        image: "/images/hotels/properties/p5.jpg",
        tier: "Premium",
        area: "Sea-facing",
        price_range: "₹4,800 – ₹7,200",
        rating: 4.6,
        reviews: 141,
        distance: "1.1 km to Somnath Temple",
        amenities: ["Sea view", "Pool", "Restaurant", "Spa", "Free Wi-Fi"],
        tags: ["Pool", "Sea-facing"],
        description:
          "Spacious premium rooms with a pool and multi-cuisine restaurant, perfect for a relaxed family stay by the sea.",
      },
      {
        id: "som-annapurna-inn",
        name: "Annapurna Comfort Inn",
        image: "/images/hotels/properties/p1.jpg",
        tier: "Mid-range",
        area: "Temple road",
        price_range: "₹1,900 – ₹3,000",
        rating: 4.3,
        reviews: 122,
        distance: "450 m to Somnath Temple",
        amenities: ["AC rooms", "Pure-veg restaurant", "Wi-Fi", "Parking"],
        tags: ["Pure-veg", "Family friendly"],
        description:
          "Well-kept mid-range rooms with an in-house pure-veg restaurant, walking distance to the temple.",
      },
      {
        id: "som-yatri-niwas",
        name: "Yatri Niwas Budget Stay",
        image: "/images/hotels/properties/p4.jpg",
        tier: "Budget",
        area: "Near temple",
        price_range: "₹850 – ₹1,400",
        rating: 4.0,
        reviews: 78,
        distance: "500 m to Somnath Temple",
        amenities: ["Clean rooms", "Hot water", "Wi-Fi", "Luggage help"],
        tags: ["Value stay", "Walk to temple"],
        description:
          "Basic but tidy rooms close to the temple gate — an easy, affordable base for darshan.",
      },
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
      { tier: "Budget", area: "Near Dwarkadhish Temple", typical_range: "₹700 – ₹1,400" },
      { tier: "Mid-range", area: "Main road", typical_range: "₹1,600 – ₹3,200" },
      { tier: "Premium", area: "Outskirts / resort", typical_range: "₹4,000 – ₹7,500" },
    ],
    properties: [
      {
        id: "dwk-dwarkadhish-view",
        name: "Dwarkadhish View Hotel",
        image: "/images/hotels/properties/p3.jpg",
        tier: "Mid-range",
        area: "Temple lane",
        price_range: "₹2,000 – ₹3,200",
        rating: 4.5,
        reviews: 187,
        distance: "200 m to Dwarkadhish Temple",
        amenities: ["Temple view", "AC rooms", "Free Wi-Fi", "Breakfast", "Lift"],
        tags: ["Temple view", "Walk to temple"],
        description:
          "AC rooms overlooking the temple shikhara — wake up to the flag change and step out for mangla aarti.",
      },
      {
        id: "dwk-gomti-residency",
        name: "Gomti Residency",
        image: "/images/hotels/properties/p1.jpg",
        tier: "Mid-range",
        area: "Main road",
        price_range: "₹1,800 – ₹2,900",
        rating: 4.3,
        reviews: 143,
        distance: "500 m to Dwarkadhish Temple",
        amenities: ["AC rooms", "Restaurant", "Wi-Fi", "Parking"],
        tags: ["Family friendly"],
        description:
          "Comfortable rooms on the main road with an in-house restaurant, close to Gomti Ghat and the temple.",
      },
      {
        id: "dwk-krishna-lodge",
        name: "Krishna Kripa Lodge",
        image: "/images/hotels/properties/p2.jpg",
        tier: "Budget",
        area: "Near temple",
        price_range: "₹750 – ₹1,300",
        rating: 4.0,
        reviews: 89,
        distance: "350 m to Dwarkadhish Temple",
        amenities: ["Clean rooms", "Hot water", "Wi-Fi", "24/7 desk"],
        tags: ["Value stay", "Walk to temple"],
        description:
          "A friendly budget lodge steps from the temple lane — simple, clean and easy on the wallet.",
      },
      {
        id: "dwk-sea-pearl-resort",
        name: "Sea Pearl Resort",
        image: "/images/hotels/properties/p6.jpg",
        tier: "Premium",
        area: "Outskirts / coast",
        price_range: "₹4,500 – ₹7,500",
        rating: 4.6,
        reviews: 132,
        distance: "3.5 km to Dwarkadhish Temple",
        amenities: ["Sea view", "Pool", "Restaurant", "Spa", "Free Wi-Fi", "Parking"],
        tags: ["Pool", "Resort"],
        description:
          "A calm coastal resort with a pool and spa on Dwarka's outskirts — great for families wanting extra space.",
      },
      {
        id: "dwk-heritage-grand",
        name: "Dwarka Heritage Grand",
        image: "/images/hotels/properties/p5.jpg",
        tier: "Premium",
        area: "Main road",
        price_range: "₹4,000 – ₹6,500",
        rating: 4.5,
        reviews: 118,
        distance: "700 m to Dwarkadhish Temple",
        amenities: ["Restaurant", "Room service", "Free Wi-Fi", "Lift", "Parking"],
        tags: ["Central", "Family friendly"],
        description:
          "Elegant premium rooms with warm interiors and full service, centrally located for darshan and sightseeing.",
      },
      {
        id: "dwk-nageshwar-inn",
        name: "Nageshwar Comfort Inn",
        image: "/images/hotels/properties/p4.jpg",
        tier: "Budget",
        area: "Main road",
        price_range: "₹900 – ₹1,400",
        rating: 4.1,
        reviews: 74,
        distance: "1.2 km to Dwarkadhish Temple",
        amenities: ["AC rooms", "Wi-Fi", "Hot water", "Parking"],
        tags: ["Value stay"],
        description:
          "Tidy budget-friendly AC rooms on the main road, handy for trips to Nageshwar and Bet Dwarka.",
      },
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
  // Display fields (also admin-editable via the Festival model).
  image: string;
  deity: string;
  city: string;
  season: string; // e.g. "Aug – Sep"
  crowd: "Very high" | "High" | "Moderate";
  highlights: string[];
  faq: { question: string; answer: string }[];
};

export const SEED_FESTIVALS: SeedFestival[] = [
  {
    // date_this_year is left empty across all festivals until the calendar is
    // confirmed — an empty string suppresses the Event schema rather than
    // publishing a date nobody has checked.
    slug: "navratri-garba-gujarat",
    festival: "Navratri",
    title: "Navratri & Garba in Gujarat — Dates, Venues & Experience",
    h1: "Navratri & Garba in Gujarat",
    answer_first:
      "Navratri is Gujarat's largest festival: nine nights of garba danced in every town, with the biggest organised grounds in Ahmedabad, Vadodara and Rajkot. Dates shift each year with the Hindu calendar and are confirmed before the season.",
    rituals:
      "In tradition, the nine nights honour the goddess Durga in her forms; devotees fast, perform aarti before the garbo lamp, and dance garba and dandiya-raas through the night.",
    travel_advice:
      "Hotels in the main garba cities fill months ahead and tariffs rise sharply. Large commercial grounds require passes bought in advance; neighbourhood garbas are usually open and free.",
    event_venue: "Ahmedabad, Vadodara, Rajkot and towns across Gujarat",
    date_this_year: "",
    image: "/images/home/HomeHero.webp",
    deity: "Goddess Durga",
    city: "Statewide",
    season: "Sep – Oct",
    crowd: "Very high",
    highlights: ["Nine nights of garba", "Dandiya-raas", "Aarti before the garbo", "Traditional chaniya choli"],
    faq: [
      { question: "When is Navratri in Gujarat?", answer: "It falls in September or October and moves each year with the Hindu calendar. We publish confirmed dates before the season rather than estimate them." },
      { question: "Can visitors join the garba?", answer: "Yes. Neighbourhood garbas welcome visitors and are usually free; the large commercial grounds sell passes well in advance." },
    ],
  },
  {
    slug: "kutch-rann-utsav-festival",
    festival: "Rann Utsav",
    title: "Rann Utsav Festival — Dates, What to Expect & Plan",
    h1: "Rann Utsav Festival",
    answer_first:
      "Rann Utsav is a winter festival on the White Rann of Kutch, built around the salt desert under a full moon, a tent city at Dhordo, and craft villages nearby. The season runs across the cool months and the exact window is announced each year.",
    rituals:
      "Not a religious festival: it is a state-supported cultural season of Kutchi music, craft and food staged on the salt flats.",
    travel_advice:
      "Full-moon nights sell out first and cost the most. Nights on the Rann are genuinely cold, so pack layers. A permit is required to enter the border area and is arranged with your booking.",
    event_venue: "Dhordo tent city, White Rann of Kutch",
    date_this_year: "",
    image: "/images/CTA.webp",
    deity: "",
    city: "Kutch",
    season: "Nov – Mar",
    crowd: "High",
    highlights: ["White Rann at full moon", "Dhordo tent city", "Kutchi craft villages", "Folk music & food"],
    faq: [
      { question: "When is Rann Utsav held?", answer: "Across the cool months, broadly November to March. The exact opening and closing dates are announced each year; we confirm them before quoting." },
      { question: "Do I need a permit for the White Rann?", answer: "Yes. The Rann sits in a border area and entry needs a permit, which is arranged as part of your booking." },
    ],
  },
  {
    slug: "dakor-fagun-purnima-padyatra",
    festival: "Fagun Purnima Padyatra",
    title: "Dakor Fagun Purnima Padyatra — Dates & Travel Guide",
    h1: "Dakor Fagun Purnima Padyatra",
    answer_first:
      "On Fagun Purnima, hundreds of thousands of pilgrims walk to the Ranchhodrai Temple at Dakor, many on foot from Ahmedabad and the surrounding districts. Roads into Dakor are heavily managed for several days around the full moon.",
    rituals:
      "In tradition, devotees walk the padyatra chanting for Ranchhodrai — a form of Krishna — and take darshan on the full-moon night of Fagun.",
    travel_advice:
      "Expect road diversions and long queues around the full moon. If you are not walking, arrive a day early or visit outside the padyatra window; local stays are limited and fill early.",
    event_venue: "Ranchhodrai Temple, Dakor",
    date_this_year: "",
    image: "/images/home/SomnathLongImage.webp",
    deity: "Ranchhodrai (Krishna)",
    city: "Dakor",
    season: "Feb – Mar",
    crowd: "Very high",
    highlights: ["Padyatra on foot", "Full-moon darshan", "Ranchhodrai Temple", "Community bhojan"],
    faq: [
      { question: "When is the Dakor padyatra?", answer: "On Fagun Purnima, the full moon of the month of Fagun, falling in February or March. The date moves each year and is confirmed before the season." },
      { question: "Can I drive to Dakor during the padyatra?", answer: "Roads are heavily diverted around the full moon and parking is far from the temple. Arriving a day early, or outside the window, is easier." },
    ],
  },
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
    image: "/images/home/DwarikaLongImage.webp",
    deity: "Lord Krishna",
    city: "Dwarka",
    season: "Aug – Sep",
    crowd: "Very high",
    highlights: ["Midnight birth aarti", "Special darshan", "Temple decorations", "Fasting & bhajans"],
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
    image: "/images/home/SomnathLongImage.webp",
    deity: "Lord Shiva",
    city: "Somnath",
    season: "Feb – Mar",
    crowd: "Very high",
    highlights: ["Night-long vigil", "Bilva leaf offerings", "Continuous aartis", "Jyotirlinga darshan"],
    faq: [
      { question: "Is Maha Shivratri special at Somnath?", answer: "Yes — as a Shiva jyotirlinga site, Somnath sees night-long worship and special aartis on Maha Shivratri, with very large crowds." },
    ],
  },
  {
    slug: "kartik-purnima-somnath",
    festival: "Kartik Purnima",
    title: "Kartik Purnima at Somnath — Dev Diwali, Rituals & Travel",
    h1: "Kartik Purnima at Somnath",
    answer_first:
      "Kartik Purnima, also observed as Dev Diwali, brings a serene festival atmosphere to Somnath with a holy dip at Triveni Sangam, lamp-lighting and special aartis. It is quieter than Shivratri but a beautiful time to visit. Exact dates change each year and are confirmed before publishing.",
    rituals:
      "In tradition, devotees take a holy dip at Triveni Sangam at dawn, light rows of lamps (deep-daan) and offer special evening aartis by the sea.",
    travel_advice:
      "Crowds are moderate; book stays 3–5 weeks ahead. Mornings at Triveni Sangam are busiest, so plan darshan and the dip early.",
    event_venue: "Somnath Temple & Triveni Sangam",
    date_this_year: "",
    image: "/images/festivals/hero.jpg",
    deity: "Lord Shiva / Dev Diwali",
    city: "Somnath",
    season: "Nov",
    crowd: "Moderate",
    highlights: ["Triveni Sangam holy dip", "Deep-daan (lamps)", "Sea-side aarti", "Calmer atmosphere"],
    faq: [
      { question: "What is Kartik Purnima at Somnath?", answer: "Kartik Purnima (Dev Diwali) is marked by a dawn holy dip at Triveni Sangam, lamp-lighting and special aartis. It falls in November and exact dates change yearly." },
    ],
  },
];

export type SeedComparison = {
  slug: string;
  title: string;
  h1: string;
  optionA: string;
  optionB: string;
  /** Optional third option — the URL map has three-way comparisons
   *  (package vs self-drive vs cab, train vs cab vs flight). */
  optionC?: string;
  answer_first: string;
  verdict: string;
  rows: { criterion: string; a: string; b: string; c?: string }[];
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
  {
    slug: "best-somnath-dwarka-package",
    title: "Best Somnath Dwarka Package — An Honest Comparison",
    h1: "Best Somnath Dwarka Package — Honest Comparison",
    optionA: "3-day package",
    optionB: "4–5 day package",
    answer_first:
      "There is no single best Somnath Dwarka package — the honest answer depends on how many days you have and whether you want unhurried darshan or the shortest viable trip. A 3-day plan covers both temples; 4 to 5 days adds Nageshwar, Bet Dwarka and Porbandar without long single-day drives.",
    verdict:
      "Take the 3-day package if your leave is tight and you accept a brisk pace. Take 4–5 days if elders are travelling, or if you want to see the evening aarti without watching the clock.",
    rows: [
      { criterion: "Temples covered", a: "Somnath, Dwarkadhish", b: "Both + Nageshwar, Bet Dwarka" },
      { criterion: "Pace", a: "Brisk; long drive days", b: "Unhurried; shorter legs" },
      { criterion: "Suits", a: "Short leave, fit travellers", b: "Families, elders, first visit" },
      { criterion: "Porbandar detour", a: "Usually skipped", b: "Fits comfortably" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Which package do most travellers choose?", answer: "The 4-day plan is the most common: it covers both temples plus Nageshwar and Bet Dwarka without a punishing drive schedule." },
      { question: "Is a cheaper package worse?", answer: "Not necessarily. A lower price usually reflects hotel tier and vehicle, not the itinerary. Ask what is different rather than assuming quality." },
    ],
  },
  {
    slug: "package-vs-self-drive-vs-cab",
    title: "Package vs Self-Drive vs Cab — An Honest Comparison",
    h1: "Package vs Self Drive vs Cab — Honest Comparison",
    optionA: "Tour package",
    optionB: "Self-drive",
    optionC: "Private cab",
    answer_first:
      "A package bundles stay, vehicle and itinerary; a private cab gives you a driver but you book your own stay; self-drive gives you total freedom and total responsibility. On the Somnath–Dwarka circuit, most travellers who try self-drive underestimate the highway hours.",
    verdict:
      "Take a package on a first visit or with elders. Take a private cab if you already know where you want to stay. Self-drive only if you are comfortable with long unfamiliar highway stretches and parking near crowded temples.",
    rows: [
      { criterion: "Stay included", a: "Yes", b: "No", c: "No" },
      { criterion: "Who drives", a: "Driver", b: "You", c: "Driver" },
      { criterion: "Itinerary planning", a: "Done for you", b: "Yours", c: "Shared" },
      { criterion: "Flexibility", a: "Moderate", b: "Highest", c: "High" },
      { criterion: "Best for", a: "First visit, elders", b: "Confident drivers", c: "Repeat visitors" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Is self-drive cheaper?", answer: "Sometimes, once fuel, tolls and a one-way drop charge are counted, the gap narrows. Compare the full figure rather than the headline rental rate." },
      { question: "Do I need a package if I only want a cab?", answer: "No. If you are happy to book your own hotels, a private cab with a driver covers the hard part, which is the driving." },
    ],
  },
  {
    slug: "3-day-vs-5-day-itinerary",
    title: "3 Day vs 5 Day Somnath Dwarka — An Honest Comparison",
    h1: "3 Day vs 5 Day Somnath Dwarka — Honest Comparison",
    optionA: "3-day itinerary",
    optionB: "5-day itinerary",
    answer_first:
      "Three days is the minimum that covers both Somnath and Dwarka properly. Five days turns the same route into a relaxed circuit with Nageshwar, Bet Dwarka, Porbandar and time to sit through an aarti without rushing to the car.",
    verdict:
      "Three days works if you arrive rested and accept two long drive days. Five days is the better trip, and it is the one people say they wish they had booked.",
    rows: [
      { criterion: "Drive days", a: "2 long legs", b: "Spread across the trip" },
      { criterion: "Aarti attendance", a: "One, if timing holds", b: "Both temples, unhurried" },
      { criterion: "Bet Dwarka ferry", a: "Tight; weather-dependent", b: "Comfortable buffer" },
      { criterion: "Porbandar", a: "Skipped", b: "Included" },
      { criterion: "Suits elders", a: "Less comfortably", b: "Yes" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Can I do Somnath and Dwarka in 2 days?", answer: "Only as a rushed transit. You would spend most of it driving 233 km between the towns and risk missing the aarti at either end." },
      { question: "What does the 5th day add?", answer: "Usually Porbandar and a slower Bet Dwarka morning, plus a buffer if the ferry or weather does not cooperate." },
    ],
  },
  {
    slug: "budget-vs-luxury",
    title: "Budget vs Luxury Package — An Honest Comparison",
    h1: "Budget vs Luxury Package — Honest Comparison",
    optionA: "Budget package",
    optionB: "Luxury package",
    answer_first:
      "Budget and luxury packages on this circuit usually run the same itinerary and the same temples. What changes is the hotel tier, the vehicle and how much waiting you do. Nobody gets a different darshan for paying more.",
    verdict:
      "Choose budget if the temples are the point and the room is only for sleeping. Choose luxury if long drives and hotel comfort materially affect whether your family enjoys the trip.",
    rows: [
      { criterion: "Itinerary", a: "Same", b: "Same" },
      { criterion: "Hotel tier", a: "Clean, basic, near temple", b: "Sea-facing or premium" },
      { criterion: "Vehicle", a: "Sedan or shared", b: "Innova or larger, private" },
      { criterion: "Meals", a: "Breakfast typically", b: "Breakfast, often dinner" },
      { criterion: "Darshan access", a: "Same as everyone", b: "Same as everyone" },
    ],
    recommended_target: "/somnath-dwarka-tour-package/",
    faq: [
      { question: "Does a luxury package get faster darshan?", answer: "No. Any special or VIP darshan arrangement is set by the temple trust, not by your tour operator or the price you paid." },
      { question: "What is the honest difference?", answer: "Hotel, vehicle and meals. If someone claims more than that, ask them to name exactly what changes." },
    ],
  },
  {
    slug: "train-vs-cab-vs-flight",
    title: "Train vs Cab vs Flight — Gujarat Circuit Compared",
    h1: "Train Vs Cab Vs Flight Gujarat Circuit — Honest Comparison",
    optionA: "Train",
    optionB: "Private cab",
    optionC: "Flight",
    answer_first:
      "No single mode covers the Somnath–Dwarka circuit end to end. Flights reach Rajkot, Jamnagar or Diu but not the temple towns; trains reach Veraval and Dwarka but not each other conveniently; a cab connects everything and is what most itineraries use for the middle of the trip.",
    verdict:
      "Fly or take a train into Gujarat, then use a private cab for the circuit itself. Trying to do the 233 km between the temples by rail costs you a day.",
    rows: [
      { criterion: "Reaches Somnath", a: "Veraval railhead (~7 km)", b: "Door to door", c: "Diu (~85 km)" },
      { criterion: "Reaches Dwarka", a: "Dwarka station", b: "Door to door", c: "Jamnagar (~130 km)" },
      { criterion: "Somnath to Dwarka", a: "Awkward; slow", b: "≈ 233 km, 4.5–5 hr", c: "No direct link" },
      { criterion: "Luggage & elders", a: "Harder", b: "Easiest", c: "Transfers needed" },
      { criterion: "Typical role", a: "Getting into Gujarat", b: "The circuit itself", c: "Getting into Gujarat" },
    ],
    recommended_target: "/somnath-dwarka-taxi-service/",
    faq: [
      { question: "Is there a direct flight to Somnath or Dwarka?", answer: "No. The nearest airports are Diu for Somnath and Jamnagar for Dwarka, and both need a road transfer." },
      { question: "Can I do the whole trip by train?", answer: "In principle, but the leg between the two temple towns is slow and indirect. Almost every practical itinerary uses a cab for that stretch." },
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
    slug: "distance-fare-calculator",
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
