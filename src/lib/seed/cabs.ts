/**
 * Seed content for the taxi silo (SOP §5 #4, #5, #6). All distances/fares are
 * PLACEHOLDERS (verify=false) shown with an "awaiting confirmation" stamp.
 */
export type SeedCabRoute = {
  slug: string; // e.g. "somnath-to-dwarka-taxi"
  kind: "route";
  title: string;
  h1: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  verified: boolean;
  answer_first: string;
  fares: { vehicle: string; seats: number; oneWay: string; roundTrip: string }[];
  stops: string[];
  faq: { question: string; answer: string }[];
};

export type SeedVehicle = {
  slug: string; // e.g. "innova-crysta"
  kind: "vehicle";
  title: string;
  h1: string;
  vehicle_name: string;
  seats: number;
  suitable_for: string;
  answer_first: string;
  fares: { route: string; rate: string }[];
  faq: { question: string; answer: string }[];
};

export const SEED_CAB_ROUTES: SeedCabRoute[] = [
  {
    slug: "somnath-to-dwarka-taxi",
    kind: "route",
    title: "Somnath to Dwarka Taxi — Fare, Distance & Cab Booking",
    h1: "Somnath to Dwarka Taxi",
    origin: "Somnath",
    destination: "Dwarka",
    distance: "≈ 233 km",
    duration: "~ 4.5–5 hours",
    verified: false,
    answer_first:
      "A Somnath to Dwarka taxi covers roughly 233 km in about 4.5–5 hours by road, usually via Porbandar. A private cab lets you stop at Porbandar (Kirti Mandir) and reach Dwarka in time for evening aarti. Fares depend on vehicle type and one-way vs round-trip.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, oneWay: "₹—", roundTrip: "₹—" },
    ],
    stops: ["Porbandar (Kirti Mandir)", "Madhavpur beach"],
    faq: [
      { question: "How far is Somnath from Dwarka by road?", answer: "The road distance is approximately 233 km and takes about 4.5–5 hours, typically via Porbandar. Exact figures are confirmed at booking." },
      { question: "Can the driver stop at Porbandar on the way?", answer: "Yes. Porbandar sits roughly midway and a private cab can halt at Kirti Mandir and Sudama Temple on request." },
    ],
  },
  {
    slug: "ahmedabad-to-somnath-taxi",
    kind: "route",
    title: "Ahmedabad to Somnath Taxi — Fare, Distance & Cab Booking",
    h1: "Ahmedabad to Somnath Taxi",
    origin: "Ahmedabad",
    destination: "Somnath",
    distance: "≈ 400 km",
    duration: "~ 7–8 hours",
    verified: false,
    answer_first:
      "An Ahmedabad to Somnath taxi covers around 400 km in roughly 7–8 hours. Most travellers start early to reach Somnath for the evening aarti and light-and-sound show. A private cab can include a lunch halt and short sightseeing en route.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, oneWay: "₹—", roundTrip: "₹—" },
    ],
    stops: ["Rajkot", "Junagadh"],
    faq: [
      { question: "How long does Ahmedabad to Somnath take by cab?", answer: "Roughly 7–8 hours for about 400 km, depending on halts and traffic. Confirmed at booking." },
    ],
  },
  {
    slug: "ahmedabad-to-dwarka-taxi",
    kind: "route",
    title: "Ahmedabad to Dwarka Taxi — Fare, Distance & Cab Booking",
    h1: "Ahmedabad to Dwarka Taxi",
    origin: "Ahmedabad",
    destination: "Dwarka",
    distance: "≈ 440 km",
    duration: "~ 8 hours",
    verified: false,
    answer_first:
      "An Ahmedabad to Dwarka taxi covers about 440 km in roughly 8 hours, usually via Rajkot and Jamnagar. A private cab is the most comfortable option for elders and families making the pilgrimage in one leg.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, oneWay: "₹—", roundTrip: "₹—" },
    ],
    stops: ["Rajkot", "Jamnagar"],
    faq: [
      { question: "Which route does the cab take to Dwarka?", answer: "Typically via Rajkot and Jamnagar. The driver adjusts for road conditions on the day." },
    ],
  },
  {
    slug: "rajkot-to-dwarka-taxi",
    kind: "route",
    title: "Rajkot to Dwarka Taxi — Fare, Distance & Cab Booking",
    h1: "Rajkot to Dwarka Taxi",
    origin: "Rajkot",
    destination: "Dwarka",
    distance: "≈ 225 km",
    duration: "~ 4–4.5 hours",
    verified: false,
    answer_first:
      "A Rajkot to Dwarka taxi covers roughly 225 km in about 4 to 4.5 hours on the Jamnagar highway. Many travellers leave Rajkot in the morning to reach Dwarka in time for an afternoon darshan, adding Nageshwar on the way in.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, oneWay: "₹—", roundTrip: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, oneWay: "₹—", roundTrip: "₹—" },
    ],
    stops: ["Jamnagar", "Khambhalia"],
    faq: [
      { question: "How long does Rajkot to Dwarka take by cab?", answer: "About 4 to 4.5 hours for roughly 225 km, depending on halts and traffic. Confirmed at booking." },
      { question: "Can I add Nageshwar Jyotirlinga on the way?", answer: "Yes. Nageshwar sits close to the Dwarka approach and is a common halt on this route; tell us and the driver plans for it." },
    ],
  },
];

/**
 * Canonical cab-route path. The URL map places every cab route *under* the taxi
 * hub (/somnath-dwarka-taxi-service/{slug}/) and contains no root-level -taxi
 * URL at all. The old root URLs 301 here via next.config.ts.
 */
export const CAB_HUB = "/somnath-dwarka-taxi-service/";
export const cabPath = (slug: string) => `${CAB_HUB}${slug}/`;

export const SEED_VEHICLES: SeedVehicle[] = [
  {
    slug: "innova-crysta",
    kind: "vehicle",
    title: "Innova Crysta for Somnath Dwarka — Fare & Booking",
    h1: "Innova Crysta for Somnath Dwarka Tour",
    vehicle_name: "Innova Crysta",
    seats: 7,
    suitable_for: "Families and small groups wanting extra comfort and luggage space",
    answer_first:
      "An Innova Crysta seats up to 7 and is the most comfortable choice for the Somnath–Dwarka circuit, with room for luggage and a smooth ride for elders. Per-km and per-day rates depend on the itinerary; share your dates for a firm quote.",
    fares: [
      { route: "Somnath ↔ Dwarka", rate: "₹—" },
      { route: "Full circuit (per day)", rate: "₹—" },
    ],
    faq: [
      { question: "How many people fit in an Innova Crysta?", answer: "Up to 7 passengers plus a driver, with space for luggage — ideal for a family pilgrimage." },
    ],
  },
  {
    slug: "ertiga",
    kind: "vehicle",
    title: "Ertiga for Somnath Dwarka — Fare & Booking",
    h1: "Ertiga for Somnath Dwarka Tour",
    vehicle_name: "Ertiga",
    seats: 6,
    suitable_for: "Small families balancing comfort and cost",
    answer_first:
      "An Ertiga seats up to 6 and offers a good balance of comfort and value for the Somnath–Dwarka circuit. It handles the highways between the temple towns well and suits smaller families.",
    fares: [
      { route: "Somnath ↔ Dwarka", rate: "₹—" },
      { route: "Full circuit (per day)", rate: "₹—" },
    ],
    faq: [
      { question: "Is an Ertiga good for the Somnath Dwarka trip?", answer: "Yes — it seats up to 6 comfortably and is a cost-effective private option for the circuit." },
    ],
  },
  {
    slug: "swift-dzire",
    kind: "vehicle",
    title: "Swift Dzire for Somnath Dwarka — Fare & Booking",
    h1: "Swift Dzire for Somnath Dwarka Tour",
    vehicle_name: "Swift Dzire",
    seats: 4,
    suitable_for: "Couples, solo travellers and small families of up to 4 passengers",
    answer_first:
      "A Swift Dzire seats up to 4 and is a highly cost-effective and nimble choice for the Somnath–Dwarka route. It offers a comfortable air-conditioned ride for small families. Share your dates for a custom quote.",
    fares: [
      { route: "Somnath ↔ Dwarka", rate: "₹—" },
      { route: "Full circuit (per day)", rate: "₹—" },
    ],
    faq: [
      { question: "Is Swift Dzire good for a small family pilgrimage?", answer: "Yes, it is highly budget-friendly and comfortable for up to 4 passengers with standard luggage." },
    ],
  },
];

export type SeedAirportTaxi = {
  slug: string; // e.g. "diu"
  airport: string;
  airportName: string;
  title: string;
  h1: string;
  serves: string;
  distance: string;
  duration: string;
  verified: boolean;
  answer_first: string;
  fares: { vehicle: string; seats: number; rate: string }[];
  faq: { question: string; answer: string }[];
};

export const SEED_AIRPORT_TAXIS: SeedAirportTaxi[] = [
  {
    slug: "diu",
    airport: "Diu",
    airportName: "Diu Airport (DIU)",
    title: "Diu Airport Taxi to Somnath — Fare & Cab Booking",
    h1: "Diu Airport Taxi",
    serves: "Somnath",
    distance: "≈ 85 km",
    duration: "~ 2 hours",
    verified: false,
    answer_first:
      "Diu Airport is the closest airport to Somnath, about 85 km (~2 hours) away by road. A pre-booked airport taxi meets your flight and drives you straight to Somnath in time for the evening aarti. Fares depend on vehicle type.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, rate: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, rate: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, rate: "₹—" },
    ],
    faq: [
      { question: "How far is Diu Airport from Somnath?", answer: "About 85 km, roughly 2 hours by road. A private taxi is the easiest transfer." },
    ],
  },
  {
    slug: "rajkot",
    airport: "Rajkot",
    airportName: "Rajkot Airport (RAJ / HSR)",
    title: "Rajkot Airport Taxi to Somnath & Dwarka — Fare & Booking",
    h1: "Rajkot Airport Taxi",
    serves: "Somnath & Dwarka",
    distance: "≈ 190 km to Somnath",
    duration: "~ 4 hours",
    verified: false,
    answer_first:
      "Rajkot Airport is a common arrival point for the Somnath–Dwarka circuit, about 190 km (~4 hours) from Somnath and a similar distance from Dwarka. A pre-booked taxi meets your flight and can begin the temple tour directly from the airport.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, rate: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, rate: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, rate: "₹—" },
    ],
    faq: [
      { question: "Can I start the Somnath Dwarka tour from Rajkot Airport?", answer: "Yes — a private taxi can collect you at Rajkot Airport and begin the circuit to either Dwarka or Somnath first." },
    ],
  },
  {
    slug: "jamnagar",
    airport: "Jamnagar",
    airportName: "Jamnagar Airport (JGA)",
    title: "Jamnagar Airport Taxi to Dwarka — Fare & Cab Booking",
    h1: "Jamnagar Airport Taxi",
    serves: "Dwarka",
    distance: "≈ 130 km to Dwarka",
    duration: "~ 2.5 hours",
    verified: false,
    answer_first:
      "Jamnagar Airport is the nearest airport to Dwarka, about 130 km (~2.5 hours) by road. A pre-booked airport taxi meets your flight and transfers you to Dwarka for Dwarkadhish darshan. Fares depend on vehicle type.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, rate: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, rate: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, rate: "₹—" },
    ],
    faq: [
      { question: "How far is Jamnagar Airport from Dwarka?", answer: "About 130 km, roughly 2.5 hours by road. A private taxi is the most convenient transfer." },
    ],
  },
  {
    slug: "ahmedabad",
    airport: "Ahmedabad",
    airportName: "Ahmedabad Airport (AMD)",
    title: "Ahmedabad Airport Taxi to Somnath & Dwarka — Fare & Booking",
    h1: "Ahmedabad Airport Taxi",
    serves: "Somnath & Dwarka",
    distance: "≈ 400 km to Somnath",
    duration: "~ 7–8 hours",
    verified: false,
    answer_first:
      "Ahmedabad Airport is the main gateway for the Somnath–Dwarka circuit, well connected by flights. It is about 400 km (~7–8 hours) to Somnath and 440 km to Dwarka. Most travellers take an airport taxi and begin the multi-day tour from Ahmedabad.",
    fares: [
      { vehicle: "Sedan (Dzire/Etios)", seats: 4, rate: "₹—" },
      { vehicle: "SUV (Ertiga)", seats: 6, rate: "₹—" },
      { vehicle: "Innova Crysta", seats: 7, rate: "₹—" },
    ],
    faq: [
      { question: "Is Ahmedabad Airport good for a Somnath Dwarka trip?", answer: "Yes — it has the best flight connectivity. A private taxi can start the full circuit from the airport over 4–6 days." },
    ],
  },
];

export const findSeedAirportTaxi = (slug: string) =>
  SEED_AIRPORT_TAXIS.find((a) => a.slug === slug) ?? null;

export const findSeedCab = (slug: string) =>
  [...SEED_CAB_ROUTES, ...SEED_VEHICLES].find((c) => c.slug === slug) ?? null;
