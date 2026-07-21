/**
 * Static page copy for /somnath-dwarka-taxi-service/, from the hub SOP.
 *
 * The split, as briefed: prose lives here in code, data lives in the CMS.
 * Anything that is a *fact about a route or a vehicle* — distance, drive time,
 * en-route darshan stops, seats, luggage, who it suits — comes from the `taxis`
 * collection and is edited under Content → Cab routes & vehicles. Everything
 * below is argument and framing that changes only when the offer changes.
 *
 * The one exception is the airport table: those records still live in
 * src/lib/seed/cabs.ts because they also drive /airport-taxi/{slug}/ pages and
 * the taxi model has no "airport" kind yet.
 */

export const TAXI_HUB = {
  h1: "Somnath Dwarka Taxi Service",
  titleTag: "Somnath Dwarka Taxi Service | All Routes and Fares",
  metaDescription:
    "Book private Somnath Dwarka cabs for the full pilgrimage circuit. Verified routes and distances, sedan to tempo traveller, one-way or round-trip.",

  quickAnswer:
    "Experience My India runs the Somnath Dwarka taxi service across every route on the Saurashtra pilgrimage circuit, with fares confirmed in writing before you book. The Somnath to Dwarka drive is about 233 km and 4.5 to 5 hours by road via Porbandar, and indicative fares start around ₹4,500 for a sedan on that leg. Choose a sedan, Ertiga, Innova Crysta or tempo traveller, and travel one-way, round-trip, or as a multi-day yatra with the same driver throughout.",

  intro:
    "Experience My India arranges private cabs across the whole Somnath and Dwarka pilgrimage circuit, from a single one-way drop to a full car rental with a driver for a multi-day yatra. You pick the vehicle by group size, and every fare is confirmed in writing before you book, with driver charges included and no hidden tolls or parking surprises.",

  /**
   * The at-a-glance strip. `note` renders as a muted second line.
   *
   * The "Rated" row states a 4.5 Tripadvisor score and 2,400+ completed trips.
   * That is a first-party business claim supplied in the SOP, not a figure this
   * site computes — if it changes, change it here.
   */
  atAGlance: [
    { label: "Core route", value: "Somnath to Dwarka, about 233 km, 4.5 to 5 hours via Porbandar" },
    {
      label: "Fares from",
      value: "around ₹4,500 for a sedan on the Somnath to Dwarka leg",
      note: "Indicative, and confirmed at booking.",
    },
    { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
    { label: "Trip types", value: "One-way, round-trip, or a multi-day circuit with one driver" },
    { label: "Airports served", value: "Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar" },
    { label: "Rated", value: "4.5 stars on Tripadvisor. More than 2,400 completed trips" },
  ],

  wholeYatra: {
    heading: "Plan the whole yatra, not just one drop",
    body: [
      "Most cab pages quote you a single point to point drop. This service is built around the whole darshan circuit as one temple tour by cab. One booking can cover Somnath Jyotirlinga, the Dwarkadhish temple, Nageshwar Jyotirlinga and the boat crossing to Bet Dwarka, with the same driver holding your route together across several days. You travel on temple timings rather than a call centre's convenience, and your luggage stays in the car between stops.",
      "Tell us your start point, your dates and how many pilgrims are travelling, and we map the cleanest route, realistic drive times and the darshan stops worth adding along the way.",
    ],
  },

  routes: {
    heading: "Popular taxi routes across Saurashtra",
    intro:
      "These are the connections we drive most often. Distances and drive times are road estimates for a private cab. Open any route for its own fares, pickup points and en-route stops.",
  },

  vehicles: {
    heading: "Choose your vehicle by group size",
    intro:
      "Every car is air-conditioned, serviced and driven by a highway driver who knows the Saurashtra roads. Match the vehicle to your group and your luggage, then open it for the seat layout and indicative per kilometre rates.",
  },

  airports: {
    heading: "Airport transfers and pickups",
    intro:
      "Flying in? We run meet-and-greet transfers from the five airports that serve this circuit, straight to your temple town.",
  },

  fareScope: {
    heading: "What your fare includes, and what it does not",
    includedTitle: "Included in every quote",
    included: [
      "Air-conditioned vehicle and fuel",
      "Experienced driver and driver allowance",
      "GPS tracked journey with 24/7 support on the road",
      "Door to door pickup from your hotel, home, railway station or airport",
      "A written fare, confirmed before you travel",
    ],
    excludedTitle: "Not included, unless added to your quote first",
    excluded: [
      "Tolls, parking and state permits where they apply",
      "Temple entry, boat tickets to Bet Dwarka and guide charges",
      "Driver night halt charges on multi-day trips",
      "Anything added mid-trip, which is quoted before it is driven",
    ],
    note: "Your firm quote spells out exactly what is covered, so there are no surprises at the end of the ride.",
  },

  whyBook: {
    heading: "Why book with Experience My India",
    points: [
      "One driver for the whole circuit, so you are not renegotiating a new cab at every town.",
      "Verified route knowledge across Saurashtra, from the NH51 run via Porbandar to the Bhirandiyara permit point before the White Rann.",
      "Meet-and-greet airport pickups from Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar.",
      "Transparent fares confirmed in writing, with driver charges included and no hidden fees.",
      "GPS tracked cars, air-conditioned throughout, with 24/7 support while you travel.",
      "More than 2,400 completed trips, with a 4.5 star rating on Tripadvisor.",
    ],
    /** E-E-A-T attribution line. Links are rendered from `authorLinks`. */
    author:
      "The circuit routes, timings and stops on this site are maintained by Harsh Sharma, who plans these yatras across Somnath and Dwarka.",
    authorLinks: [
      { label: "Read more about us", href: "/about/" },
      { label: "check the booking policy", href: "/booking-policy/" },
      { label: "cancellation and refund terms", href: "/cancellation-refund/" },
      { label: "contact the team directly", href: "/contact/" },
    ],
  },

  notForYou: {
    heading: "This service may not be the right fit if",
    items: [
      "You want the single cheapest shared seat. These are private cabs for your group alone, priced accordingly.",
      "You want a self-drive rental. Every booking here comes with a driver.",
      "You are moving a group larger than a tempo traveller can seat. For a full coach we can advise, but the fleet on this page tops out at group tempo travellers.",
      "You need a metered ride of a kilometre or two inside one city. This service is built for the pilgrimage routes and airport transfers listed above.",
    ],
  },

  beforeYouTravel: {
    heading: "Before you travel",
    items: [
      "Temple darshan timings shift with the season and with festival days, so share your dates and we plan the route around them.",
      "The White Rann drive from Bhuj passes a permit check at Bhirandiyara. Carry photo ID for every traveller.",
      "Bet Dwarka is reached by a short boat crossing, so keep ID handy and allow time for the ferry.",
      "October to March is the comfortable window for long Saurashtra drives. Book earlier for Janmashtami at Dwarka and Maha Shivratri at Somnath, when cars go quickly.",
    ],
  },

  howToBook: {
    heading: "How to book in three steps",
    steps: [
      "Send your route, dates and number of pilgrims on WhatsApp, or request a callback.",
      "Get a written all-in fare with the vehicle confirmed and driver charges included.",
      "Pay and travel, with GPS tracked, door to door pickup at the time you choose.",
    ],
  },

  cta: {
    heading: "Book your cab",
    subtitle: "Tell us your route and dates for a firm fare.",
    body:
      "Send your pickup town, your travel dates and the number of pilgrims, and we confirm the vehicle and the all-in price before you commit.",
  },

  faq: [
    {
      question: "How much does a Somnath Dwarka taxi cost?",
      answer:
        "Fares depend on the route, the vehicle and whether you travel one-way or round-trip. Rates are indicative on the site and confirmed in writing before you book. Share your itinerary and we send a firm all-in quote with driver charges included.",
    },
    {
      question: "What is the distance between Somnath and Dwarka by taxi?",
      answer:
        "The road distance is about 233 km and the drive takes 4.5 to 5 hours, usually via Porbandar on the NH51.",
    },
    {
      question: "Which vehicles can I choose?",
      answer:
        "Air-conditioned sedans, an Ertiga for up to six, an Innova Crysta for up to seven, and a tempo traveller for group yatras of 9 to 17. Pick by seating and luggage.",
    },
    {
      question: "Do you provide airport pickups?",
      answer:
        "Yes. We run meet-and-greet transfers from Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar airports, straight to your temple town.",
    },
    {
      question: "Can I book one cab for the whole circuit?",
      answer:
        "Yes. One booking covers one-way transfers, round trips and multi-day tours with the same driver across Somnath and Dwarka, plus stops like Nageshwar and Bet Dwarka.",
    },
    {
      question: "Are tolls, parking and driver charges included?",
      answer:
        "Driver charges are included in every quote. Tolls, parking and permits are listed clearly in your firm quote, so you see the all-in fare before you travel.",
    },
    {
      question: "Can I be picked up from my hotel or the railway station?",
      answer:
        "Yes. Pickup is door to door from your hotel, home, railway station or airport, at the time you choose.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "For ordinary dates a day or two is enough. For festival periods at Somnath and Dwarka, book as early as you can, since cars fill fast.",
    },
  ],

  keepPlanning: {
    heading: "Keep planning",
    intro: "Compare the full Somnath Dwarka tour packages, price a single leg, or read the distance guide. For temple context, see the destination guides.",
    links: [
      { label: "Somnath Dwarka tour packages", href: "/somnath-dwarka-tour-package/" },
      { label: "Somnath to Dwarka taxi", href: "/somnath-dwarka-taxi-service/somnath-to-dwarka-taxi/" },
      { label: "Ahmedabad to Somnath taxi", href: "/somnath-dwarka-taxi-service/ahmedabad-to-somnath-taxi/" },
      { label: "Dwarka to Somnath distance guide", href: "/plan/dwarka-to-somnath-distance/" },
    ],
  },
} as const;
