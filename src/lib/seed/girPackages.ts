/**
 * Seed content for the Somnath–Dwarka–Gir triangle hub (SOP §5 #2, #3), the
 * Gir-side twin of lib/seed/packages.ts. Used when the CMS hub-spoke doc for a
 * variant carries no itinerary yet, so every authorised URL renders on day one.
 *
 * Honesty gates hold, same as the Gir cluster seed:
 *  - every price is a PLACEHOLDER (price_verified: false) and the UI stamps it
 *    as awaiting confirmation;
 *  - no safari permit fee, slot price or gate timing is stated anywhere — those
 *    live behind VERIFY on /gir/gir-safari-timings-price/;
 *  - the monsoon closure is written as approximate, because the forest
 *    department moves it year to year.
 */
import type { HubVariantSeed } from "./hubVariant";

/** The Gir hub's variants use the shared hub-variant shape. */
export type GirSeedPackage = HubVariantSeed;

/** Every Gir plan excludes the same two things travellers most often assume are in. */
const GIR_EXCLUSIONS = [
  "Gir safari permit & jeep charges (booked separately on the forest department portal)",
  "Air/train fare",
  "Lunch & dinner",
  "Personal expenses",
  "Anything not listed in inclusions",
];

const GIR_INCLUSIONS = (nights: number) => [
  `${nights} nights hotel`,
  "Private AC vehicle with driver",
  "Daily breakfast",
  "Safari booking assistance",
  "Toll, parking, driver allowance",
];

const girFaq = (name: string) => [
  {
    question: `When is the best time for the ${name}?`,
    answer:
      "December to March is the most comfortable window: mild days for the temples and good sighting conditions in Gir. The park stays shut through the monsoon — roughly mid-June to mid-October, though the forest department sets the exact dates each year, so we confirm them before you book.",
  },
  {
    question: "Is the Gir safari permit included in the package price?",
    answer:
      "No. Safari permits and the jeep are booked separately through the forest department's online system and are charged at actuals. We handle the booking for you and share the confirmation — the package price covers your hotel, vehicle, breakfast and the rest of the circuit.",
  },
  {
    question: "Can we get a safari slot on short notice?",
    answer:
      "Slots open on the forest department portal in advance and weekends, holidays and the December–January peak sell out first. Book the safari as early as your dates are fixed; if no slot is left, Devalia Interpretation Zone is the practical alternative and we can plan around it.",
  },
  {
    question: "Is the price per person or per group?",
    answer:
      "Prices shown are indicative starting points per person, pending confirmation. Your exact quote depends on group size, hotel tier and vehicle — share your dates for a firm price.",
  },
];

export const GIR_SEED_PACKAGES: GirSeedPackage[] = [
  /* ── By duration ─────────────────────────────────────────────── */
  {
    slug: "4-days",
    title: "Somnath Dwarka Gir Tour Package 4 Days",
    h1: "Somnath Dwarka Gir Tour Package — 4 Days",
    facet: "duration",
    duration: "4 Days / 3 Nights",
    price_from: 16999,
    price_verified: false,
    answer_first:
      "The 4-day Somnath Dwarka Gir package covers Dwarkadhish Temple, Nageshwar Jyotirlinga, Somnath Temple with the evening aarti, and one morning safari in Gir. It is the shortest plan that still fits a real safari slot, because the safari has to be a morning departure and the drive from Somnath to Sasan Gir takes the rest of that day.",
    highlights: [
      "Dwarkadhish Temple darshan",
      "Nageshwar Jyotirlinga",
      "Somnath Temple & evening aarti",
      "Morning safari in Gir",
      "Somnath light & sound show",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka to Somnath", description: "Nageshwar and Rukmini Temple in the morning, drive to Somnath, evening aarti and the light-and-sound show.", stops: ["Nageshwar", "Somnath Temple"] },
      { day: 3, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir; evening free at the resort.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 4, title: "Gir safari & departure", description: "Morning safari in Gir, breakfast, then departure via Junagadh or Rajkot.", stops: ["Gir National Park"] },
    ],
    inclusions: GIR_INCLUSIONS(3),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("4-day Somnath Dwarka Gir tour"),
  },
  {
    slug: "5-days",
    title: "Somnath Dwarka Gir Tour Package 5 Days",
    h1: "Somnath Dwarka Gir Tour Package — 5 Days",
    facet: "duration",
    duration: "5 Days / 4 Nights",
    price_from: 20999,
    price_verified: false,
    answer_first:
      "The 5-day Somnath Dwarka Gir package adds Bet Dwarka and Porbandar to the core circuit and keeps a full night at Sasan Gir, so a missed or cancelled safari slot still has a second morning to fall back on. It is the version most families book.",
    highlights: [
      "Dwarkadhish Temple darshan",
      "Nageshwar Jyotirlinga & Bet Dwarka ferry",
      "Porbandar — Kirti Mandir",
      "Somnath Temple, aarti & light show",
      "Morning safari in Gir",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath via Porbandar", description: "Drive via Porbandar and Kirti Mandir; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan, Triveni Sangam and Bhalka Tirth, then the drive to Sasan Gir.", stops: ["Bhalka Tirth", "Sasan Gir"] },
      { day: 5, title: "Gir safari & departure", description: "Morning safari in Gir, breakfast, then departure via Junagadh or Rajkot.", stops: ["Gir National Park"] },
    ],
    inclusions: GIR_INCLUSIONS(4),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("5-day Somnath Dwarka Gir tour"),
  },
  {
    slug: "3-days",
    title: "Somnath Dwarka Gir 3 Days Package",
    h1: "Somnath Dwarka Gir Tour Package — 3 Days",
    facet: "duration",
    duration: "3 Days / 2 Nights",
    price_from: 13999,
    price_verified: false,
    answer_first:
      "The 3-day plan is the compressed version: Dwarkadhish and Nageshwar on day one, Somnath on day two, safari and departure on day three. Bet Dwarka and Porbandar do not fit, and there is no spare morning if the safari slot falls through — pick the 4-day plan if the safari is the reason you are coming.",
    highlights: ["Dwarkadhish darshan", "Nageshwar Jyotirlinga", "Somnath Temple & aarti", "Morning safari in Gir"],
    itinerary: [
      { day: 1, title: "Arrival, Dwarka & Nageshwar", description: "Arrive Dwarka, Dwarkadhish darshan and Nageshwar Jyotirlinga.", stops: ["Dwarkadhish Temple", "Nageshwar"] },
      { day: 2, title: "Dwarka to Somnath to Gir", description: "Drive to Somnath for darshan and the evening aarti, then continue to Sasan Gir for the night.", stops: ["Somnath Temple", "Sasan Gir"] },
      { day: 3, title: "Gir safari & departure", description: "Morning safari in Gir, breakfast, departure.", stops: ["Gir National Park"] },
    ],
    inclusions: GIR_INCLUSIONS(2),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("3-day Somnath Dwarka Gir tour"),
  },
  {
    slug: "6-days",
    title: "Somnath Dwarka Gir 6 Days Package",
    h1: "Somnath Dwarka Gir Tour Package — 6 Days",
    facet: "duration",
    duration: "6 Days / 5 Nights",
    price_from: 24999,
    price_verified: false,
    answer_first:
      "The 6-day plan runs the full Saurashtra loop at an unhurried pace: two nights in Dwarka, Porbandar on the road, two nights around Somnath and Gir with room for both a safari and Devalia, and a Junagadh stop on the way out.",
    highlights: [
      "Two nights in Dwarka",
      "Bet Dwarka ferry & Rukmini Temple",
      "Porbandar — Kirti Mandir",
      "Somnath aarti & light show",
      "Gir safari plus Devalia zone",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry, Rukmini Temple and the Gomti ghat.", stops: ["Nageshwar", "Bet Dwarka", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath via Porbandar", description: "Drive via Porbandar and Kirti Mandir; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath at leisure", description: "Morning darshan, Triveni Sangam, Bhalka Tirth and the beach; evening free.", stops: ["Triveni Sangam", "Bhalka Tirth"] },
      { day: 5, title: "Somnath to Sasan Gir", description: "Drive to Sasan Gir; afternoon at the Devalia Interpretation Zone.", stops: ["Sasan Gir", "Devalia"] },
      { day: 6, title: "Gir safari & departure", description: "Morning safari in Gir, then departure via Junagadh or Rajkot.", stops: ["Gir National Park", "Junagadh"] },
    ],
    inclusions: GIR_INCLUSIONS(5),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("6-day Somnath Dwarka Gir tour"),
  },

  /* ── By starting city ────────────────────────────────────────── */
  {
    slug: "from-ahmedabad",
    title: "Somnath Dwarka Gir Tour Package from Ahmedabad",
    h1: "Somnath Dwarka Gir Tour Package from Ahmedabad",
    facet: "from-city",
    duration: "5 Days / 4 Nights",
    price_from: 21999,
    price_verified: false,
    answer_first:
      "A round trip from Ahmedabad with pickup and drop at your address, airport or station. Ahmedabad to Dwarka is the longest single drive of the circuit, so day one is a travel day — the temples start the evening you arrive or the next morning, and Gir sits on the return leg where it costs no extra distance.",
    highlights: [
      "Ahmedabad pickup & drop",
      "Dwarkadhish and Nageshwar darshan",
      "Somnath aarti & light show",
      "Morning safari in Gir",
      "Gir on the return leg — no backtracking",
    ],
    itinerary: [
      { day: 1, title: "Ahmedabad to Dwarka", description: "Depart Ahmedabad early, drive to Dwarka via Rajkot and Jamnagar; evening Dwarkadhish aarti.", stops: ["Rajkot", "Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & Ahmedabad drop", description: "Morning safari in Gir, then the drive back to Ahmedabad via Junagadh and Rajkot.", stops: ["Gir National Park", "Ahmedabad Drop"] },
    ],
    inclusions: GIR_INCLUSIONS(4),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir tour from Ahmedabad"),
  },
  {
    slug: "from-rajkot",
    title: "Somnath Dwarka Gir Tour Package from Rajkot",
    h1: "Somnath Dwarka Gir Tour Package from Rajkot",
    facet: "from-city",
    duration: "4 Days / 3 Nights",
    price_from: 18999,
    price_verified: false,
    answer_first:
      "Rajkot is the shortest start for this circuit — you reach Dwarka the same morning you leave, so the temple time that Ahmedabad travellers lose to the road stays in the plan. Pickup and drop are at your Rajkot address, airport or station.",
    highlights: [
      "Rajkot pickup & drop",
      "Shortest road approach to Dwarka",
      "Somnath aarti & light show",
      "Morning safari in Gir",
    ],
    itinerary: [
      { day: 1, title: "Rajkot to Dwarka", description: "Depart Rajkot, drive to Dwarka via Jamnagar; afternoon check-in and evening Dwarkadhish aarti.", stops: ["Jamnagar", "Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing to Somnath", description: "Nageshwar and Bet Dwarka in the morning, then the drive to Somnath for the evening aarti.", stops: ["Nageshwar", "Bet Dwarka", "Somnath Temple"] },
      { day: 3, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 4, title: "Gir safari & Rajkot drop", description: "Morning safari in Gir, then the drive back to Rajkot via Junagadh.", stops: ["Gir National Park", "Rajkot"] },
    ],
    inclusions: GIR_INCLUSIONS(3),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir tour from Rajkot"),
  },
  {
    slug: "from-mumbai",
    title: "Somnath Dwarka Gir Tour Package from Mumbai",
    h1: "Somnath Dwarka Gir Tour Package from Mumbai",
    facet: "from-city",
    duration: "5 Days / 4 Nights",
    price_from: 22999,
    price_verified: false,
    answer_first:
      "For Mumbai travellers the sensible plan is to fly or take the train into Gujarat and start the road circuit there — driving the whole way costs two days each side. This package covers everything from your arrival at Rajkot, Jamnagar or Ahmedabad; the flight or train fare is arranged separately or added on request.",
    highlights: [
      "Arrival transfer from your Gujarat railhead or airport",
      "Dwarkadhish and Nageshwar darshan",
      "Somnath aarti & light show",
      "Morning safari in Gir",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Gujarat & Dwarka", description: "Met on arrival at Rajkot, Jamnagar or Ahmedabad and driven to Dwarka; evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & departure transfer", description: "Morning safari in Gir, then the drop to your departure airport or station.", stops: ["Gir National Park"] },
    ],
    inclusions: GIR_INCLUSIONS(4),
    exclusions: [
      "Flight/train fare from Mumbai (add on request)",
      "Gir safari permit & jeep charges (booked separately on the forest department portal)",
      "Lunch & dinner",
      "Personal expenses",
      "Anything not listed in inclusions",
    ],
    faq: girFaq("Somnath Dwarka Gir tour from Mumbai"),
  },
  {
    slug: "from-surat",
    title: "Somnath Dwarka Gir Tour Package from Surat",
    h1: "Somnath Dwarka Gir Tour Package from Surat",
    facet: "from-city",
    duration: "5 Days / 4 Nights",
    price_from: 22499,
    price_verified: false,
    answer_first:
      "A round trip from Surat with pickup and drop at your address. Surat to Dwarka is a long first day on the road, so the plan puts the temples from the second morning and keeps Gir on the return leg, which is on the way home rather than a detour.",
    highlights: [
      "Surat pickup & drop",
      "Dwarkadhish and Nageshwar darshan",
      "Somnath aarti & light show",
      "Morning safari in Gir",
    ],
    itinerary: [
      { day: 1, title: "Surat to Dwarka", description: "Early departure from Surat, drive to Dwarka via Rajkot; late check-in.", stops: ["Rajkot"] },
      { day: 2, title: "Dwarka sightseeing", description: "Dwarkadhish darshan, Nageshwar Jyotirlinga, Bet Dwarka ferry.", stops: ["Dwarkadhish Temple", "Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & Surat drop", description: "Morning safari in Gir, then the drive back to Surat.", stops: ["Gir National Park", "Surat"] },
    ],
    inclusions: GIR_INCLUSIONS(4),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir tour from Surat"),
  },

  /* ── Add a destination ───────────────────────────────────────── */
  {
    slug: "with-diu",
    title: "Somnath Dwarka Gir Tour Package with Diu",
    h1: "Somnath Dwarka Gir Tour Package with Diu",
    facet: "addon",
    duration: "6 Days / 5 Nights",
    price_from: 25999,
    price_verified: false,
    answer_first:
      "Diu adds a beach and a Portuguese fort to the temple-and-safari circuit, and it sits close enough to Somnath that the detour costs one night rather than a whole day. This is the plan for travellers who want the pilgrimage to end on something slower.",
    highlights: [
      "Dwarkadhish and Nageshwar darshan",
      "Somnath aarti & light show",
      "Morning safari in Gir",
      "Diu fort, St Paul's Church & Nagoa beach",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & on to Diu", description: "Morning safari in Gir, then the drive to Diu; evening at Nagoa beach.", stops: ["Gir National Park", "Diu"] },
      { day: 6, title: "Diu & departure", description: "Diu Fort, St Paul's Church and the sea front, then departure.", stops: ["Diu Fort"] },
    ],
    inclusions: GIR_INCLUSIONS(5),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir tour with Diu"),
  },
  {
    slug: "with-junagadh-girnar",
    title: "Somnath Dwarka Gir Tour Package with Junagadh & Girnar",
    h1: "Somnath Dwarka Gir Tour Package with Junagadh & Girnar",
    facet: "addon",
    duration: "6 Days / 5 Nights",
    price_from: 25499,
    price_verified: false,
    answer_first:
      "Junagadh is already on the road between Gir and Rajkot, so adding it costs a night rather than a detour. The plan keeps a full morning free for the Girnar ropeway or the steps — the climb is a serious one and does not fit a half-day stop.",
    highlights: [
      "Dwarkadhish and Nageshwar darshan",
      "Somnath aarti & light show",
      "Morning safari in Gir",
      "Girnar ropeway or the steps climb",
      "Uparkot Fort & Mahabat Maqbara",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & on to Junagadh", description: "Morning safari in Gir, then the drive to Junagadh; evening at Uparkot Fort or Mahabat Maqbara.", stops: ["Gir National Park", "Junagadh"] },
      { day: 6, title: "Girnar & departure", description: "Early start for the Girnar ropeway or the steps, then departure via Rajkot.", stops: ["Girnar", "Rajkot"] },
    ],
    inclusions: GIR_INCLUSIONS(5),
    exclusions: ["Girnar ropeway ticket", ...GIR_EXCLUSIONS],
    faq: girFaq("Somnath Dwarka Gir tour with Junagadh and Girnar"),
  },

  /* ── By traveller ────────────────────────────────────────────── */
  {
    slug: "for-family",
    title: "Somnath Dwarka Gir Family Tour Package",
    h1: "Somnath Dwarka Gir Tour Package for Families",
    facet: "traveller",
    duration: "5 Days / 4 Nights",
    price_from: 20999,
    price_verified: false,
    answer_first:
      "The family version keeps the same circuit but shortens the driving days and puts the safari where children are freshest — a morning departure after a full night's sleep at Sasan Gir. Hotels are picked for family rooms and an early kitchen rather than for a view.",
    highlights: [
      "Shorter driving days",
      "Family rooms & early breakfast",
      "Bet Dwarka ferry",
      "Morning safari in Gir",
      "Somnath light & sound show",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple, with an afternoon break at the hotel.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar with a lunch halt; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the short drive to Sasan Gir; early dinner before the safari morning.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & departure", description: "Morning safari in Gir, breakfast, then departure via Junagadh or Rajkot.", stops: ["Gir National Park"] },
    ],
    inclusions: GIR_INCLUSIONS(4),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir family tour"),
  },
  {
    slug: "for-senior-citizens",
    title: "Somnath Dwarka Gir Tour Package for Senior Citizens",
    h1: "Somnath Dwarka Gir Tour Package for Senior Citizens",
    facet: "traveller",
    duration: "6 Days / 5 Nights",
    price_from: 24499,
    price_verified: false,
    answer_first:
      "Six days for the same circuit, so no day carries both a long drive and a temple queue. Hotels are chosen for lift access and proximity to the temple gate, and wheelchair or assisted darshan is arranged in advance where the temple allows it. The Gir safari is on a forest-department jeep, which is a rough ride — we will tell you honestly whether it suits the traveller before you book it.",
    highlights: [
      "Unhurried pace — no double-load days",
      "Hotels near the temple gates",
      "Assisted darshan arranged in advance",
      "Morning safari in Gir, or Devalia as the gentler alternative",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in and rest; evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka at an easy pace", description: "Nageshwar Jyotirlinga and Rukmini Temple in the morning; afternoon free. Bet Dwarka only if the ferry suits.", stops: ["Nageshwar", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar with regular halts; evening Somnath aarti.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath at leisure", description: "Morning darshan, Triveni Sangam and Bhalka Tirth; the light-and-sound show in the evening.", stops: ["Triveni Sangam", "Bhalka Tirth"] },
      { day: 5, title: "Somnath to Sasan Gir", description: "Short drive to Sasan Gir; afternoon at the Devalia Interpretation Zone, which is a bus route rather than a jeep track.", stops: ["Sasan Gir", "Devalia"] },
      { day: 6, title: "Gir safari & departure", description: "Optional morning safari in Gir, then departure via Junagadh or Rajkot.", stops: ["Gir National Park"] },
    ],
    inclusions: GIR_INCLUSIONS(5),
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir tour for senior citizens"),
  },
  {
    slug: "group",
    title: "Somnath Dwarka Gir Group Tour Package",
    h1: "Somnath Dwarka Gir Group Tour Package",
    facet: "traveller",
    duration: "5 Days / 4 Nights",
    price_from: 18999,
    price_verified: false,
    answer_first:
      "For groups of ten and above the vehicle changes to a tempo traveller or a coach and the per-person cost drops. The one thing that does not scale is the Gir safari: jeeps seat six, so a large group needs several jeeps and those slots must be booked well ahead — tell us the head count early.",
    highlights: [
      "Tempo traveller or coach by group size",
      "Lower per-person cost",
      "Group darshan coordination",
      "Multiple safari jeeps booked together",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Group arrival in Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 5, title: "Gir safari & departure", description: "Morning safari in Gir across the booked jeeps, then departure via Junagadh or Rajkot.", stops: ["Gir National Park"] },
    ],
    inclusions: ["4 nights hotel", "Tempo traveller or coach with driver", "Daily breakfast", "Safari booking assistance", "Toll, parking, driver allowance"],
    exclusions: GIR_EXCLUSIONS,
    faq: girFaq("Somnath Dwarka Gir group tour"),
  },
];

export const findGirSeedPackage = (slug: string) =>
  GIR_SEED_PACKAGES.find((p) => p.slug === slug) ?? null;
