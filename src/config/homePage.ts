/**
 * Home page copy — "Somnath Dwarka Tour Package, Planned by a Local Guide" SOP.
 *
 * Every section of the home page body reads from here, in the SOP's scroll
 * order, so a price or a hotel changes in one place and the visible copy, the
 * FAQ and the JSON-LD (Product / TouristTrip / ItemList) all move together.
 *
 * Prices are "from, per person on twin-sharing" for the 2N/3D route. The SOP
 * asks that they be set to the real selling price before ad spend — edit
 * HOME_TIERS, and HOME_PRICE_FROM follows automatically.
 */
import { CONTACT, OPERATOR } from "@/src/config/site";

export const HOME_OPERATOR = OPERATOR.parent; // "Experience My India"

export type HomeTier = {
  key: "standard" | "deluxe" | "premium";
  name: string;
  hotels: string;
  price: number;
  /** A live package page with the same offer, when one exists. */
  href?: string;
};

export const HOME_TIERS: HomeTier[] = [
  {
    key: "standard",
    name: "Standard (3 star, budget-friendly)",
    hotels: "Clean, well-run hotels near each temple, named on request",
    price: 8999,
    href: "/somnath-dwarka-tour-package/budget/",
  },
  {
    key: "deluxe",
    name: "Deluxe (4 star)",
    hotels:
      "The Fern Sattva Resort or Lemon Tree Premier in Dwarka, The Fern Residency or Lords Inn in Somnath",
    price: 12999,
  },
  {
    key: "premium",
    name: "Premium (top 4 and 5 star)",
    hotels:
      "Hawthorn Suites by Wyndham or Goverdhan Greens Resort in Dwarka, Lemon Tree Resort or Sarovar Portico in Somnath",
    price: 17999,
  },
];

export const HOME_PRICE_FROM = Math.min(...HOME_TIERS.map((t) => t.price));
export const HOME_PRICE_TO = Math.max(...HOME_TIERS.map((t) => t.price));

/** "8,999" — Indian digit grouping, no currency symbol. */
export const inr = (n: number) => n.toLocaleString("en-IN");

export const HOME_WA_TEXT =
  "Hi, please send my day-wise plan and price for the Somnath Dwarka tour package.";

export const HOME_HERO = {
  h1: "Somnath Dwarka Tour Package",
  lead:
    "A private and unhurried journey through Dwarka and Somnath, planned by a local guide who actually lives in this region. Named 4 and 5 star hotels you can check in advance, a private air-conditioned car for your family alone, and real help with temple darshan and aarti timings.",
  priceLine: `From Rs ${inr(HOME_PRICE_FROM)} per person on twin-sharing`,
  priceTail:
    "for the 2 nights and 3 days Dwarka and Somnath route. Budget-friendly and premium options both available.",
  cta: `WhatsApp ${CONTACT.phoneDisplay}`,
  /** Phrases in `lead` the hero sets in bold orange, like the price. */
  highlights: ["Dwarka and Somnath", "Named 4 and 5 star hotels", "private air-conditioned car"],
};

export const HOME_AT_A_GLANCE: { label: string; detail: string }[] = [
  { label: "Duration", detail: "2 nights and 3 days core route. 3 nights 4 days and with-Gir options available." },
  { label: "Cities covered", detail: "Dwarka, Bet Dwarka, Nageshwar, Porbandar on route, Somnath" },
  { label: "Hotels", detail: "Named hotels in each city. Choose budget-friendly 3 star, or 4 and 5 star" },
  { label: "Vehicle", detail: "Private air-conditioned car for your group only, with a local driver" },
  { label: "Meals", detail: "Daily breakfast included. Full board on request" },
  { label: "Guide and darshan", detail: "Local coordination for Dwarkadhish and Somnath darshan and aarti timings" },
  {
    label: "Starting price",
    detail: `From Rs ${inr(HOME_PRICE_FROM)} per person on twin-sharing (full inclusions listed below)`,
  },
];

export const HOME_WHY_DIFFERENT: string[] = [
  `Most Somnath Dwarka tour packages you will compare online are sold by agencies sitting in another city, or by marketplaces that pass your booking to whichever supplier is cheapest that week. ${HOME_OPERATOR} works the other way. We are local to this stretch of Gujarat, so the driver knows which Somnath aarti fills up first, which Dwarka lane to use when the temple is crowded, and when the Bet Dwarka ferry queue is worth timing around.`,
  "That local knowledge is the difference between a rushed circuit and a calm pilgrimage. You are not booking a faceless voucher. You are booking a team that names your hotel in writing, keeps one person on call for your whole trip, and tells you honestly when a day has a long drive so nothing is promised that the road will not allow.",
];
export const HOME_WHY_DIRECT = {
  lead: `Booking direct with ${HOME_OPERATOR}`,
  rest: " also means no marketplace markup, a price you can question line by line, and a real person who answers on WhatsApp rather than a call centre reading a script.",
};

/** "What local means on your trip" card beside the why-different story. */
export const HOME_WHY_LOCAL_POINTS: string[] = [
  "A driver who knows which Somnath aarti fills up first",
  "The right Dwarka lane when the temple is crowded",
  "Bet Dwarka ferry timed around the queue",
  "Your hotel named in writing before you pay",
  "One person on call for your whole trip",
];

export const HOME_PRICE_COMPARE: { what: string; budget: string; ours: string }[] = [
  { what: "Hotel", budget: "Star claimed, property not named until arrival", ours: "Real property named per city before you pay" },
  { what: "Vehicle", budget: "Often shared, or a seat in a coach", ours: "Private air-conditioned car for your group only" },
  { what: "Route pace", budget: "Extra stops squeezed in to look full", ours: "Paced so Dwarka and Somnath get real time" },
  { what: "Darshan help", budget: "Left to you at the temple gate", ours: "Local coordination for darshan and aarti timing" },
  { what: "Support", budget: "Sales stops after payment", ours: "One coordinator on call through the whole trip" },
  { what: "Price honesty", budget: "GST and extras revealed later", ours: "Price and inclusions shown together, GST stated" },
];

export type HomeDay = {
  day: number;
  title: string;
  body: string;
  /** Quick-scan stops for the itinerary card; every one is named in `body`. */
  stops: string[];
  /** Where the night is spent, or the onward leg on the last day. */
  stay: string;
  /** The day's main drive, when there is one (figures from `body`). */
  drive?: string;
};

export const HOME_ITINERARY: HomeDay[] = [
  {
    day: 1,
    title: "Arrival and Dwarka",
    body:
      "Arrive in Dwarka and check into your named hotel. Visit the Dwarkadhish Temple for darshan, walk down to Gomti Ghat, and see Nageshwar Jyotirlinga and Rukmini Temple. In the evening attend the aarti at Dwarkadhish. Those arriving through Jamnagar airport, about 130 to 137 km away, are met on landing and driven in by private car. Overnight in Dwarka.",
    stops: ["Dwarkadhish Temple", "Gomti Ghat", "Nageshwar Jyotirlinga", "Rukmini Temple", "Evening aarti"],
    stay: "Overnight in Dwarka",
    drive: "Jamnagar airport ≈ 130–137 km",
  },
  {
    day: 2,
    title: "Bet Dwarka, then the coastal drive to Somnath",
    body:
      "Morning ferry to Bet Dwarka, the island linked with Lord Krishna, then begin the coastal drive to Somnath along National Highway 51. The full Dwarka to Somnath distance is about 233 km and takes close to 5 hours of driving, so we break it sensibly. Porbandar, the birthplace of Mahatma Gandhi, sits on the way for Kirti Mandir and Sudama Temple. Reach Somnath by evening, check in, and attend the Somnath aarti and the sound and light show. Overnight in Somnath.",
    stops: ["Bet Dwarka ferry", "Kirti Mandir", "Sudama Temple", "Somnath aarti", "Sound and light show"],
    stay: "Overnight in Somnath",
    drive: "Dwarka to Somnath ≈ 233 km, ~5 hrs",
  },
  {
    day: 3,
    title: "Somnath darshan and departure",
    body:
      "Early Somnath Temple darshan and, if you wish, the morning abhishek. Visit Bhalka Tirth and Triveni Sangam nearby. After this you are transferred onward: to Diu airport about 90 km away, to Rajkot, or back toward Ahmedabad. Guests going to Ahmedabad should note it is roughly a 7 to 8 hour drive, so we start early and plan the day around it rather than pretending it is short.",
    stops: ["Somnath darshan", "Morning abhishek", "Bhalka Tirth", "Triveni Sangam"],
    stay: "Onward to Diu, Rajkot or Ahmedabad",
    drive: "Diu airport ≈ 90 km",
  },
];

/** Stops on the route, in order — feeds TouristTrip.itinerary. */
export const HOME_ROUTE_STOPS = [
  "Dwarkadhish Temple",
  "Gomti Ghat",
  "Nageshwar Jyotirlinga",
  "Rukmini Temple",
  "Bet Dwarka",
  "Kirti Mandir, Porbandar",
  "Sudama Temple, Porbandar",
  "Somnath Temple",
  "Bhalka Tirth",
  "Triveni Sangam",
];

export const HOME_HOTEL_PROMISE =
  "Every package on the internet says hotels or similar. We define what similar means, so it is a promise and not a loophole. For each city we name real properties in your chosen category, and nothing below it. We confirm your exact hotel in writing before the balance is paid. If we cannot deliver a hotel from that named list, you may cancel and your deposit is refunded in full.";

export const HOME_HOTELS: { city: "Dwarka" | "Somnath"; hotels: string[] }[] = [
  {
    city: "Dwarka",
    hotels: [
      "Hawthorn Suites by Wyndham Dwarka",
      "The Fern Sattva Resort Dwarka",
      "Lemon Tree Premier Dwarka",
      "Regenta Dwarka",
      "Goverdhan Greens Resort",
    ],
  },
  {
    city: "Somnath",
    hotels: [
      "The Fern Residency Somnath",
      "Lords Inn Somnath",
      "Lemon Tree Resort Somnath",
      "Sarovar Portico Somnath",
      "Regenta Central Somnath",
    ],
  },
];

export const HOME_HOTELS_BUDGET_NOTE =
  "Prefer to keep costs down? We also arrange clean, budget-friendly 3 star hotels near both temples on request, at the Standard price above.";

export const HOME_INCLUDED = [
  "Accommodation on twin-sharing in named hotels",
  "Daily breakfast",
  "A private air-conditioned car for your group with driver",
  "All fuel, tolls, parking and driver allowance",
  "Sightseeing as per the itinerary",
  "Local coordination for darshan and aarti timings",
];

export const HOME_EXCLUDED = [
  "Train and air fare",
  "Lunch and dinner unless chosen",
  "Temple special entry or VIP darshan fees",
  "Ferry and ropeway tickets",
  "Any Gir safari",
  "Personal expenses such as tips and laundry",
  "GST at the applicable rate",
];

export const HOME_EXCLUDED_NOTE = "GST is stated up front, never added quietly at the end.";

export const HOME_REACH: { from: string; access: string; distance: string }[] = [
  { from: "Air, Dwarka side", access: "Jamnagar or Porbandar airport", distance: "About 130 to 137 km, roughly 2.5 to 3 hours by road" },
  { from: "Air, Somnath side", access: "Diu airport, or Rajkot for wider flights", distance: "Diu about 90 km, Rajkot about 190 to 200 km" },
  { from: "Train, Dwarka", access: "Dwarka station (DWK) in the town", distance: "Direct trains from Okha, Jamnagar and Ahmedabad" },
  { from: "Train, Somnath", access: "Veraval station", distance: "About 6 to 7 km from Somnath Temple" },
  { from: "Road, from Ahmedabad", access: "Private car or coach", distance: "About 440 km to Dwarka, 7 to 8 hours" },
  { from: "Road, from Rajkot", access: "Private car", distance: "About 225 km to Dwarka, 4 to 5 hours" },
];

export const HOME_BEST_TIME =
  "October to March is the comfortable window, with daytime temperatures roughly 15 to 30 degrees Celsius, ideal for temple visits and the coastal drive. The monsoon months of June to September can disrupt road travel, and April to June turns hot. Festival dates and weekends fill hotels quickly, so book early for those.";

/** Season bands for the "When to go" month strip — the same facts as HOME_BEST_TIME. */
export const HOME_SEASONS: { key: "best" | "hot" | "monsoon"; label: string; months: string; note: string }[] = [
  { key: "best", label: "Best time", months: "October to March", note: "Roughly 15 to 30°C by day, ideal for temple visits and the coastal drive" },
  { key: "hot", label: "Hot", months: "April to June", note: "The weather turns hot, so the days are less comfortable" },
  { key: "monsoon", label: "Monsoon", months: "June to September", note: "Monsoon rain can disrupt road travel" },
];
/** Season of each month, January first (June counted with the monsoon). */
export const HOME_MONTH_SEASONS: ("best" | "hot" | "monsoon")[] = [
  "best", "best", "best", "hot", "hot", "monsoon", "monsoon", "monsoon", "monsoon", "best", "best", "best",
];

export const HOME_BEST_TIME_LINKS = [
  { label: "best time to visit Dwarka", href: "/guides/best-time-to-visit-dwarka/" },
  { label: "best time to visit Somnath", href: "/guides/best-time-to-visit-somnath/" },
];

export const HOME_CONCERNS: { q: string; a: string }[] = [
  {
    q: "Is it comfortable for elders?",
    a: "Yes. We keep walking manageable, choose hotels with easy access, and never stack two long driving days back to back before Somnath.",
  },
  {
    q: "Is the price final?",
    a: "The quote states occupancy, inclusions and GST together. What you are told is what you pay, subject only to changes you request.",
  },
  {
    q: "What if plans change?",
    a: "Deposit and cancellation terms are given in writing before you pay, in plain language, not buried in a policy link.",
  },
  {
    q: "Who are you?",
    a: `${HOME_OPERATOR} is a local operator, reachable on one number, ${CONTACT.phoneDisplay}, with your coordinator named from the first message.`,
  },
];

