/**
 * Seed content for the Gujarat umbrella hub (SOP §5 #2, #3), the state-wide
 * sibling of lib/seed/packages.ts and lib/seed/girPackages.ts. Used when the
 * CMS hub-spoke doc for a variant carries no itinerary yet, so every authorised
 * URL renders on day one.
 *
 * Honesty gates hold:
 *  - every price is a PLACEHOLDER (price_verified: false) and the UI stamps it
 *    as awaiting confirmation;
 *  - no safari permit fee, ropeway fare, monument ticket or darshan timing is
 *    stated — those are verify-gated on the pages that own them;
 *  - the Gir monsoon closure is written as approximate, because the forest
 *    department moves it year to year;
 *  - the Palitana and Pavagadh climbs are described as climbs, not as strolls.
 */
import type { HubVariantSeed } from "./hubVariant";

export type GujaratSeedPackage = HubVariantSeed;

const BASE_EXCLUSIONS = [
  "Air/train fare",
  "Monument, ropeway and safari tickets (charged at actuals)",
  "Lunch & dinner",
  "Personal expenses",
  "Anything not listed in inclusions",
];

const BASE_INCLUSIONS = (nights: number) => [
  `${nights} nights hotel`,
  "Private AC vehicle with driver",
  "Daily breakfast",
  "Toll, parking, driver allowance",
];

const gujaratFaq = (name: string) => [
  {
    question: `When is the best time for the ${name}?`,
    answer:
      "October to March. Gujarat's summer runs hot enough to make midday sightseeing unpleasant, and the monsoon closes Gir and makes the Rann inaccessible. December and January are peak — hotels fill early around the Rann Utsav and the holiday weeks.",
  },
  {
    question: "Are monument and safari tickets included?",
    answer:
      "No. Entry tickets, ropeway fares and safari permits are charged at actuals and, where they are bookable in advance, we book them for you and share the confirmation. The package price covers your hotel, vehicle, breakfast and the planning.",
  },
  {
    question: "Is the price per person or per group?",
    answer:
      "Prices shown are indicative starting points per person, pending confirmation. Your exact quote depends on group size, hotel tier and vehicle — share your dates for a firm price.",
  },
  {
    question: "Can the itinerary be changed?",
    answer:
      "Yes. Every plan here is a starting point — days can be added or dropped, the starting city changed and the hotel tier tuned to your budget. Tell us what matters most and we will sequence the rest around it.",
  },
];

export const GUJARAT_SEED_PACKAGES: GujaratSeedPackage[] = [
  /* ── Circuits ────────────────────────────────────────────────── */
  {
    slug: "dwarka-somnath-nageshwar-jyotirlinga-tour",
    title: "Gujarat Jyotirlinga Tour Package",
    h1: "Dwarka, Somnath & Nageshwar Jyotirlinga Tour",
    facet: "addon",
    duration: "4 Days / 3 Nights",
    price_from: 14999,
    price_verified: false,
    location: "Dwarka, Bet Dwarka, Somnath",
    answer_first:
      "Gujarat holds two of the twelve jyotirlingas — Somnath and Nageshwar — and this plan covers both along with the Dwarkadhish Temple and the Bet Dwarka ferry. Four days is what the coast road between Dwarka and Somnath actually needs if the evening aarti at each temple is to stay in the plan.",
    highlights: [
      "Somnath Jyotirlinga & evening aarti",
      "Nageshwar Jyotirlinga",
      "Dwarkadhish Temple darshan",
      "Bet Dwarka ferry",
      "Somnath light & sound show",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Dwarka", description: "Arrive Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 2, title: "Nageshwar & Bet Dwarka", description: "Nageshwar Jyotirlinga, the Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka", "Rukmini Temple"] },
      { day: 3, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 4, title: "Somnath & departure", description: "Morning darshan, Triveni Sangam and Bhalka Tirth, then departure.", stops: ["Triveni Sangam", "Bhalka Tirth"] },
    ],
    inclusions: BASE_INCLUSIONS(3),
    exclusions: BASE_EXCLUSIONS,
    faq: gujaratFaq("Gujarat jyotirlinga tour"),
  },
  {
    slug: "saurashtra-darshan",
    title: "Saurashtra Darshan Package",
    h1: "Saurashtra Darshan Tour Package",
    facet: "addon",
    duration: "7 Days / 6 Nights",
    price_from: 28999,
    price_verified: false,
    location: "Rajkot, Jamnagar, Dwarka, Somnath, Gir, Palitana",
    answer_first:
      "The full Saurashtra loop: Jamnagar, Dwarka, Porbandar, Somnath, Gir and Palitana in one clockwise run, so no leg is driven twice. Seven days is the honest minimum — the Palitana climb needs its own morning, and the Gir safari needs another.",
    highlights: [
      "Dwarkadhish & Nageshwar darshan",
      "Somnath aarti & light show",
      "Morning safari in Gir",
      "Palitana — Shatrunjaya temples",
      "Porbandar — Kirti Mandir",
    ],
    itinerary: [
      { day: 1, title: "Rajkot to Jamnagar", description: "Pickup at Rajkot, drive to Jamnagar; Lakhota lake and the Bala Hanuman temple.", stops: ["Rajkot", "Jamnagar"] },
      { day: 2, title: "Jamnagar to Dwarka", description: "Drive to Dwarka, check in, evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 3, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 4, title: "Dwarka to Somnath", description: "Drive via Porbandar and Kirti Mandir; evening Somnath aarti.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 5, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 6, title: "Gir safari to Palitana", description: "Morning safari in Gir, then the drive to Palitana.", stops: ["Gir National Park", "Palitana"] },
      { day: 7, title: "Shatrunjaya & departure", description: "Early start for the Shatrunjaya climb — around 3,800 steps, or a doli with porters — then departure via Bhavnagar.", stops: ["Palitana", "Bhavnagar"] },
    ],
    inclusions: BASE_INCLUSIONS(6),
    exclusions: ["Doli/porter charges at Palitana", ...BASE_EXCLUSIONS],
    faq: gujaratFaq("Saurashtra darshan tour"),
  },
  {
    slug: "complete-gujarat-yatra",
    title: "Complete Gujarat Yatra Grand Circuit",
    h1: "Complete Gujarat Yatra — Grand Circuit",
    facet: "addon",
    duration: "10 Days / 9 Nights",
    price_from: 42999,
    price_verified: false,
    location: "Ahmedabad, Kutch, Dwarka, Somnath, Gir, Statue of Unity",
    answer_first:
      "The state end to end: Ahmedabad and the Sun Temple at Modhera, the white Rann at Kutch, the temple coast at Dwarka and Somnath, a safari in Gir and the Statue of Unity on the way back. Ten days is what it takes without a day that is nothing but driving.",
    highlights: [
      "Modhera Sun Temple & Rani ki Vav",
      "White Rann of Kutch",
      "Dwarkadhish & Somnath darshan",
      "Morning safari in Gir",
      "Statue of Unity",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Ahmedabad", description: "Arrive Ahmedabad, check in; evening at the Sabarmati riverfront or the Adalaj stepwell.", stops: ["Ahmedabad", "Adalaj"] },
      { day: 2, title: "Modhera, Patan & on to Kutch", description: "Modhera Sun Temple and Rani ki Vav at Patan, then the drive to Bhuj.", stops: ["Modhera", "Patan", "Bhuj"] },
      { day: 3, title: "Kutch & the white Rann", description: "Bhuj craft villages by day, the white Rann at sunset.", stops: ["Bhuj", "Dhordo"] },
      { day: 4, title: "Bhuj to Dwarka", description: "Long drive south along the coast to Dwarka; evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 5, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 6, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 7, title: "Somnath to Sasan Gir", description: "Morning darshan and Triveni Sangam, then the drive to Sasan Gir.", stops: ["Triveni Sangam", "Sasan Gir"] },
      { day: 8, title: "Gir safari to Vadodara", description: "Morning safari in Gir, then the long drive east to Vadodara.", stops: ["Gir National Park", "Vadodara"] },
      { day: 9, title: "Statue of Unity", description: "Kevadia — the Statue of Unity, the viewing gallery and the valley of flowers.", stops: ["Statue of Unity"] },
      { day: 10, title: "Ahmedabad & departure", description: "Drive back to Ahmedabad for departure; old-city walk if the flight allows.", stops: ["Ahmedabad"] },
    ],
    inclusions: BASE_INCLUSIONS(9),
    exclusions: BASE_EXCLUSIONS,
    faq: gujaratFaq("complete Gujarat yatra"),
  },
  {
    slug: "heritage-unesco-circuit",
    title: "Gujarat UNESCO Heritage Circuit",
    h1: "Gujarat UNESCO Heritage Circuit — Four World Heritage Sites",
    facet: "addon",
    duration: "6 Days / 5 Nights",
    price_from: 26999,
    price_verified: false,
    location: "Ahmedabad, Patan, Champaner, Dholavira",
    answer_first:
      "Gujarat carries four UNESCO World Heritage inscriptions — the historic city of Ahmedabad, Rani ki Vav at Patan, the Champaner-Pavagadh park and the Harappan city at Dholavira. This plan visits all four; Dholavira is the long leg, deep in the Rann, and it is the reason the circuit needs six days.",
    highlights: [
      "Historic city of Ahmedabad — pol walk",
      "Rani ki Vav, Patan",
      "Champaner-Pavagadh archaeological park",
      "Dholavira — Harappan city",
      "Modhera Sun Temple",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Ahmedabad", description: "Arrive Ahmedabad; Sidi Saiyyed mosque, Jama Masjid and the riverfront.", stops: ["Ahmedabad"] },
      { day: 2, title: "Ahmedabad heritage walk", description: "Morning pol walk through the walled city, then Adalaj stepwell and the Calico Museum area.", stops: ["Ahmedabad", "Adalaj"] },
      { day: 3, title: "Champaner-Pavagadh", description: "Drive to Champaner; the Jami Masjid and the archaeological park. Pavagadh hill is a ropeway plus a stepped climb.", stops: ["Champaner", "Pavagadh"] },
      { day: 4, title: "Modhera & Patan", description: "Modhera Sun Temple and its stepped tank, then Rani ki Vav at Patan; night at Patan or Bhuj-bound.", stops: ["Modhera", "Patan"] },
      { day: 5, title: "Dholavira", description: "The long drive across the Rann causeway to Dholavira; the excavated Harappan city and the fossil park.", stops: ["Dholavira"] },
      { day: 6, title: "Return & departure", description: "Drive back via Bhuj or Ahmedabad for departure.", stops: ["Ahmedabad"] },
    ],
    inclusions: BASE_INCLUSIONS(5),
    exclusions: BASE_EXCLUSIONS,
    faq: gujaratFaq("Gujarat UNESCO heritage circuit"),
  },
  {
    slug: "wildlife-safari-circuit",
    title: "Gujarat Wildlife Safari Circuit",
    h1: "Gujarat Wildlife Safari Circuit — Gir, Velavadar & the Wild Ass Sanctuary",
    facet: "addon",
    duration: "6 Days / 5 Nights",
    price_from: 27999,
    price_verified: false,
    location: "Gir, Velavadar, Little Rann of Kutch",
    answer_first:
      "Three sanctuaries that hold animals found nowhere else: the Asiatic lion at Gir, the blackbuck and its harrier roost at Velavadar, and the wild ass in the Little Rann. All three run on morning and evening slots, so the plan is built around drive times between them rather than around sightseeing.",
    highlights: [
      "Asiatic lion safari at Gir",
      "Blackbuck National Park, Velavadar",
      "Wild ass sanctuary, Little Rann",
      "Devalia Interpretation Zone",
      "Nal Sarovar birding stop",
    ],
    itinerary: [
      { day: 1, title: "Arrival & on to Sasan Gir", description: "Arrive Rajkot or Ahmedabad and drive to Sasan Gir; evening at the resort.", stops: ["Sasan Gir"] },
      { day: 2, title: "Gir safari", description: "Morning safari in Gir; afternoon at the Devalia Interpretation Zone.", stops: ["Gir National Park", "Devalia"] },
      { day: 3, title: "Gir to Velavadar", description: "Drive to Velavadar via Bhavnagar; evening drive in the Blackbuck National Park.", stops: ["Velavadar"] },
      { day: 4, title: "Velavadar to the Little Rann", description: "Morning in the grassland, then the drive to Dasada on the edge of the Little Rann.", stops: ["Velavadar", "Dasada"] },
      { day: 5, title: "Wild ass safari", description: "Morning safari in the Little Rann for the wild ass; afternoon at Nal Sarovar in season.", stops: ["Little Rann of Kutch", "Nal Sarovar"] },
      { day: 6, title: "Ahmedabad & departure", description: "Drive to Ahmedabad for departure.", stops: ["Ahmedabad"] },
    ],
    inclusions: BASE_INCLUSIONS(5),
    exclusions: [
      "Safari permits and jeep charges at all three sanctuaries (booked separately, at actuals)",
      "Air/train fare",
      "Lunch & dinner",
      "Personal expenses",
      "Anything not listed in inclusions",
    ],
    faq: [
      {
        question: "When is the Gujarat wildlife circuit open?",
        answer:
          "Roughly October to mid-June. Gir closes for the monsoon — approximately mid-June to mid-October, with the forest department setting the exact dates each year — and the Little Rann is not drivable when it floods. We confirm the current dates against your travel window before you book.",
      },
      {
        question: "Are the safari permits included?",
        answer:
          "No. Permits and jeeps at Gir, Velavadar and the Little Rann are booked through their own systems and charged at actuals. We handle the booking and share each confirmation.",
      },
      {
        question: "Will we definitely see a lion?",
        answer:
          "No one can promise a sighting — it is a wild forest, not an enclosure. Gir's lion population is healthy and sightings on a morning permit are common, but the honest answer is that it depends on the day and the route your jeep draws.",
      },
      {
        question: "Is the price per person or per group?",
        answer:
          "Prices shown are indicative starting points per person, pending confirmation. Your exact quote depends on group size, hotel tier and vehicle — share your dates for a firm price.",
      },
    ],
  },

  /* ── Short pilgrimage trips ──────────────────────────────────── */
  {
    slug: "pavagadh-mahakali-tour",
    title: "Pavagadh Mahakali Tour Package",
    h1: "Pavagadh Mahakali Tour Package",
    facet: "duration",
    duration: "2 Days / 1 Night",
    price_from: 5999,
    price_verified: false,
    location: "Pavagadh, Champaner",
    answer_first:
      "The Mahakali temple sits at the top of Pavagadh hill, reached by road, then the ropeway, then a final flight of steps — the last stretch is a climb on foot whichever way you go. The plan pairs it with the Champaner archaeological park at the base, which most day-trippers skip.",
    highlights: [
      "Mahakali Mata temple, Pavagadh",
      "Pavagadh ropeway",
      "Champaner — Jami Masjid",
      "Vadodara or Ahmedabad pickup",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Champaner", description: "Pickup from Vadodara or Ahmedabad, drive to Champaner; the Jami Masjid and the archaeological park, then check in.", stops: ["Champaner"] },
      { day: 2, title: "Pavagadh darshan & return", description: "Early ropeway up Pavagadh for Mahakali darshan, then the return drive.", stops: ["Pavagadh"] },
    ],
    inclusions: BASE_INCLUSIONS(1),
    exclusions: ["Pavagadh ropeway ticket", ...BASE_EXCLUSIONS],
    faq: gujaratFaq("Pavagadh Mahakali tour"),
  },
  {
    slug: "dakor-ranchhodrai-tour",
    title: "Dakor Ranchhodrai Tour Package",
    h1: "Dakor Ranchhodrai Tour Package",
    facet: "duration",
    duration: "1 Day",
    price_from: 3499,
    price_verified: false,
    location: "Dakor, Nadiad",
    answer_first:
      "Dakor is close enough to Ahmedabad and Vadodara to be a comfortable day trip: leave early, take darshan at the Ranchhodrai temple, and be back by evening. The temple is busiest on Purnima, when the walking pilgrimage arrives — worth planning around either way you feel about crowds.",
    highlights: [
      "Ranchhodrai temple darshan",
      "Gomti lake",
      "Santram Mandir at Nadiad",
      "Same-day return",
    ],
    itinerary: [
      {
        day: 1,
        title: "Dakor day trip",
        description:
          "Early pickup from Ahmedabad or Vadodara, drive to Dakor for Ranchhodrai darshan and the Gomti lake, a stop at the Santram Mandir in Nadiad on the way back, and an evening drop.",
        stops: ["Dakor", "Nadiad"],
      },
    ],
    inclusions: ["Private AC vehicle with driver", "Toll, parking, driver allowance"],
    exclusions: ["Hotel stay (day trip)", "Meals", "Personal expenses", "Anything not listed in inclusions"],
    faq: gujaratFaq("Dakor Ranchhodrai tour"),
  },
  {
    slug: "modhera-becharaji-circuit",
    title: "Modhera Becharaji Tour",
    h1: "Modhera, Becharaji & Patan Circuit",
    facet: "duration",
    duration: "2 Days / 1 Night",
    price_from: 6999,
    price_verified: false,
    location: "Modhera, Becharaji, Patan",
    answer_first:
      "North Gujarat in two days: the Sun Temple at Modhera with its stepped tank, the Bahuchara Mata temple at Becharaji, and Rani ki Vav at Patan — a UNESCO-listed stepwell that is the finest of its kind in India. All three are within an easy loop of Ahmedabad.",
    highlights: [
      "Modhera Sun Temple & Surya Kund",
      "Bahuchara Mata temple, Becharaji",
      "Rani ki Vav, Patan",
      "Patan patola weaving workshop",
    ],
    itinerary: [
      { day: 1, title: "Ahmedabad to Modhera & Becharaji", description: "Drive to Modhera for the Sun Temple and the Surya Kund, then Becharaji for darshan; night at Mehsana or Patan.", stops: ["Modhera", "Becharaji"] },
      { day: 2, title: "Patan & return", description: "Rani ki Vav at Patan and a patola weaving workshop, then the return drive to Ahmedabad.", stops: ["Patan"] },
    ],
    inclusions: BASE_INCLUSIONS(1),
    exclusions: BASE_EXCLUSIONS,
    faq: gujaratFaq("Modhera Becharaji circuit"),
  },

  /* ── By starting city ────────────────────────────────────────── */
  {
    slug: "from-mumbai",
    title: "Gujarat Tour Package from Mumbai",
    h1: "Gujarat Tour Package from Mumbai",
    facet: "from-city",
    duration: "6 Days / 5 Nights",
    price_from: 27999,
    price_verified: false,
    location: "Mumbai to Ahmedabad, Dwarka & Somnath",
    answer_first:
      "From Mumbai the sensible plan is to fly or take the train into Ahmedabad and start the road circuit there — driving the whole way spends two days on the highway. This package covers everything from your arrival in Gujarat; the flight or train fare is arranged separately or added on request.",
    highlights: [
      "Arrival transfer from Ahmedabad airport or station",
      "Dwarkadhish & Somnath darshan",
      "Modhera Sun Temple",
      "Statue of Unity option on the return",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Ahmedabad", description: "Met on arrival and driven to your hotel; evening at the Sabarmati riverfront.", stops: ["Ahmedabad"] },
      { day: 2, title: "Ahmedabad to Dwarka", description: "Drive west via Rajkot to Dwarka; evening Dwarkadhish aarti.", stops: ["Rajkot", "Dwarkadhish Temple"] },
      { day: 3, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 4, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 5, title: "Somnath to Ahmedabad", description: "Morning darshan and Triveni Sangam, then the drive back to Ahmedabad.", stops: ["Triveni Sangam", "Ahmedabad"] },
      { day: 6, title: "Departure transfer", description: "Old-city walk if the schedule allows, then the drop to your airport or station.", stops: ["Ahmedabad"] },
    ],
    inclusions: BASE_INCLUSIONS(5),
    exclusions: ["Flight/train fare from Mumbai (add on request)", ...BASE_EXCLUSIONS.slice(1)],
    faq: gujaratFaq("Gujarat tour from Mumbai"),
  },
  {
    slug: "from-delhi",
    title: "Gujarat Tour Package from Delhi",
    h1: "Gujarat Tour Package from Delhi",
    facet: "from-city",
    duration: "7 Days / 6 Nights",
    price_from: 31999,
    price_verified: false,
    location: "Delhi to Ahmedabad, Kutch & the temple coast",
    answer_first:
      "Delhi travellers fly or take the train into Ahmedabad and pick the circuit up there. Seven days is the length that fits both Kutch and the temple coast without a day spent entirely in the car; if you have five, drop Kutch rather than compressing everything.",
    highlights: [
      "Arrival transfer from Ahmedabad airport or station",
      "White Rann of Kutch",
      "Dwarkadhish & Somnath darshan",
      "Modhera Sun Temple & Rani ki Vav",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Ahmedabad", description: "Met on arrival and driven to your hotel; evening at the Sabarmati riverfront.", stops: ["Ahmedabad"] },
      { day: 2, title: "Modhera, Patan & on to Bhuj", description: "Modhera Sun Temple and Rani ki Vav at Patan, then the drive to Bhuj.", stops: ["Modhera", "Patan", "Bhuj"] },
      { day: 3, title: "Kutch & the white Rann", description: "Bhuj craft villages by day, the white Rann at sunset.", stops: ["Bhuj", "Dhordo"] },
      { day: 4, title: "Bhuj to Dwarka", description: "Long coastal drive south to Dwarka; evening Dwarkadhish aarti.", stops: ["Dwarkadhish Temple"] },
      { day: 5, title: "Dwarka sightseeing", description: "Nageshwar Jyotirlinga, Bet Dwarka ferry and Rukmini Temple.", stops: ["Nageshwar", "Bet Dwarka"] },
      { day: 6, title: "Dwarka to Somnath", description: "Drive via Porbandar; evening Somnath aarti and the light-and-sound show.", stops: ["Porbandar", "Somnath Temple"] },
      { day: 7, title: "Somnath & departure transfer", description: "Morning darshan and Triveni Sangam, then the drive to Ahmedabad or the Diu/Rajkot airport for departure.", stops: ["Triveni Sangam"] },
    ],
    inclusions: BASE_INCLUSIONS(6),
    exclusions: ["Flight/train fare from Delhi (add on request)", ...BASE_EXCLUSIONS.slice(1)],
    faq: gujaratFaq("Gujarat tour from Delhi"),
  },

  /* ── By traveller ────────────────────────────────────────────── */
  {
    slug: "corporate-offsite",
    title: "Corporate Offsite in Gujarat",
    h1: "Corporate Offsite Tour Packages in Gujarat",
    facet: "traveller",
    duration: "3 Days / 2 Nights",
    price_from: 9999,
    price_verified: false,
    location: "Kutch, Statue of Unity or Gir",
    answer_first:
      "Offsites run on different constraints than pilgrimages: one hotel with a working conference room, coaches rather than cars, and a schedule that leaves the afternoons free. Kevadia, the Rann and Gir all work — which one fits depends on your head count and how far your team is travelling.",
    highlights: [
      "Single hotel with conference facilities",
      "Coach transport for the group",
      "Kevadia, Kutch or Gir as the base",
      "Team activity and evening arrangements",
    ],
    itinerary: [
      { day: 1, title: "Arrival & sessions", description: "Group arrival and check-in, conference room set up for the day's sessions; evening activity.", stops: ["Kevadia"] },
      { day: 2, title: "Sessions & offsite activity", description: "Morning sessions, afternoon out — the Statue of Unity, a Rann sunset or a Gir safari depending on the base.", stops: ["Statue of Unity"] },
      { day: 3, title: "Wrap-up & departure", description: "Closing session, then the group departure transfer.", stops: ["Ahmedabad"] },
    ],
    inclusions: [
      "2 nights hotel on twin sharing",
      "Conference room with basic AV",
      "Coach or tempo traveller transport",
      "Daily breakfast",
      "Toll, parking, driver allowance",
    ],
    exclusions: [
      "Air/train fare",
      "Monument, ropeway and safari tickets (charged at actuals)",
      "Lunch, dinner and banqueting",
      "Anything not listed in inclusions",
    ],
    faq: [
      {
        question: "What group sizes can you handle?",
        answer:
          "From about 15 people up to a few hundred, though the base changes with the number — Kevadia and Ahmedabad have the hotel inventory for large groups, while Gir and the Rann resorts are smaller and fill early. Tell us the head count first; it decides everything else.",
      },
      {
        question: "Is the conference room included?",
        answer:
          "Yes, a room with basic AV is included for the days shown. Banqueting, specialised AV and any team-building vendor are quoted separately once the format is fixed.",
      },
      {
        question: "Can you invoice the company with GST?",
        answer:
          "Yes. Share your company details and GSTIN with the booking and the invoice is raised against them.",
      },
      {
        question: "Is the price per person or per group?",
        answer:
          "The figure shown is an indicative per-person starting point on twin sharing, pending confirmation. Offsite quotes are built per group — share dates, head count and format for a firm price.",
      },
    ],
  },
];

export const findGujaratSeedPackage = (slug: string) =>
  GUJARAT_SEED_PACKAGES.find((p) => p.slug === slug) ?? null;
