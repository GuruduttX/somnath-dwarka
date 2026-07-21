/**
 * Static page copy for the cab route spokes, from the per-route SOPs.
 *
 * Same split as the hub (see src/config/taxiHub.ts): prose lives here, data
 * lives in the CMS. Distance, drive time, en-route stops, fares, title, meta
 * description and the quick answer are all fields on the `taxis` document and
 * are edited under Content → Cab routes & vehicles. Everything below is the
 * argument around those numbers, which changes only when the offer changes.
 *
 * A route with no entry here still renders: the template falls back to the CMS
 * record alone, so importing a new route never produces a broken page.
 */

/** Identity and trust facts repeated across every spoke, per the SOPs. */
export const OPERATOR = {
  localUnit: "Somnath Dwarka Tour Package",
  parent: "Experience My India",
  parentSlogan: "India's Most Trusted Tour Operator",
  phone: "+917302265809",
  foundingDate: "2018",
  founder: "Harsh Sharma",
  gstin: "09BZFPM8067A1Z9",
  /** BCP-47 codes for schema; the prose spells them out. */
  languages: ["en", "gu", "te", "kn"],
  languagesProse: "English, Gujarati, Telugu and Kannada",
} as const;

/** The vehicle guide table is identical on all four spokes. */
export const SPOKE_VEHICLES = [
  { vehicle: "Sedan (Dzire or Etios)", seats: "4", suited: "Couples and small families travelling light" },
  { vehicle: "Ertiga", seats: "6", suited: "Small families balancing comfort and cost" },
  { vehicle: "Innova Crysta", seats: "7", suited: "Extra comfort and luggage space on the highway" },
  { vehicle: "Tempo Traveller", seats: "9 to 17", suited: "Group yatras and satsang mandals" },
] as const;

/** Shared fare scope. Per-route additions are appended by the template. */
export const SPOKE_FARE_SCOPE = {
  includedTitle: "Included in every quote",
  included: [
    "Air-conditioned vehicle and fuel",
    "Experienced driver and driver allowance",
    "GPS tracked journey with support on the road",
  ],
  excludedTitle: "Not included, unless added to your quote first",
  excluded: [
    "Tolls and parking where they apply",
    "Sightseeing detours added mid-trip, which are quoted before they are driven",
  ],
} as const;

/** The author/E-E-A-T line closing every why-book block. */
export const SPOKE_AUTHOR = {
  line: "Routes and timings are maintained by Harsh Sharma, who leads the Gujarat operations.",
  links: [
    { label: "Read more about us", href: "/about/" },
    { label: "check the booking policy", href: "/booking-policy/" },
    { label: "cancellation and refund terms", href: "/cancellation-refund/" },
    { label: "contact the team", href: "/contact/" },
  ],
} as const;

export type SpokeCopy = {
  titleTag: string;
  metaDescription: string;
  h1: string;
  crumbLabel: string;
  quickAnswer: string;
  intro: string;
  atAGlance: { label: string; value: string }[];
  driveSection: { heading: string; body: string };
  tripTypes: { heading: string; body: string };
  vehiclesIntro: string;
  /** Route-specific rows appended to the shared fare scope. */
  faresIncluded: string[];
  faresExcluded: string[];
  whyBook: { heading: string; points: string[] };
  notForYou: string[];
  beforeYouTravel: string[];
  faq: { question: string; answer: string }[];
  keepPlanning: { intro: string; links: { label: string; href: string }[] };
  cta: { heading: string; body: string };
};

const TAXI_HUB_PATH = "/somnath-dwarka-taxi-service/";
const p = (slug: string) => `${TAXI_HUB_PATH}${slug}/`;

/** Why-book points shared by every spoke, with the pickup line varying. */
const whyBookPoints = (pickupLine: string) => [
  `The local Gujarat unit of ${OPERATOR.parent}, ${OPERATOR.parentSlogan}, running Saurashtra yatras since ${OPERATOR.foundingDate}.`,
  `Drivers and guides who speak ${OPERATOR.languagesProse}, so pilgrims from the south travel with someone they can talk to.`,
  "A 4.5 star rating on Tripadvisor, across more than 2,400 completed trips.",
  "One driver for the whole leg, GPS tracked and air-conditioned, with fares confirmed in writing and no hidden tolls or parking.",
  pickupLine,
  `A GST registered business, GSTIN ${OPERATOR.gstin}, with clear booking and cancellation terms.`,
];

const LANGUAGES_FAQ = {
  question: "Which languages do your drivers speak?",
  answer: OPERATOR.languagesProse + ".",
};

export const SPOKE_COPY: Record<string, SpokeCopy> = {
  "somnath-to-dwarka-taxi": {
    titleTag: "Somnath to Dwarka Taxi | One Way and Round Trip",
    metaDescription:
      "Book a Somnath to Dwarka taxi online. One way and round trip options with a choice of Sedan, Ertiga, Innova Crysta or Tempo Traveller.",
    h1: "Somnath to Dwarka Taxi",
    crumbLabel: "Somnath to Dwarka",
    quickAnswer:
      "A Somnath to Dwarka taxi covers about 233 km in 4.5 to 5 hours by road via Porbandar. Experience My India runs this leg as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with indicative sedan fares from around ₹4,500 confirmed in writing before you book. Pickup is door to door from your Somnath hotel, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs on the Somnath to Dwarka route, the core leg of the Saurashtra pilgrimage circuit that links the Somnath Jyotirlinga with the Dwarkadhish temple. Whether you want a one-way drop or a same-day round trip, you travel in an air-conditioned car with a driver who knows the coastal highway, and your fare is confirmed in writing before you book.",
    atAGlance: [
      { label: "Route", value: "Somnath to Dwarka, about 233 km" },
      { label: "Drive time", value: "4.5 to 5 hours via Porbandar on the NH51" },
      { label: "Fares from", value: "around ₹4,500 for a sedan, indicative and confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Somnath hotel, home or Veraval station" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Somnath to Dwarka",
      body: "The road runs about 233 km along the Saurashtra coast, largely on the NH51, and takes 4.5 to 5 hours depending on your stops. Most pilgrims break the drive at Porbandar to see Kirti Mandir, the birthplace of Mahatma Gandhi, and many add a short pause at Madhavpur beach. Tell us if you want these built in and the driver plans the timing around them.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Somnath to Dwarka taxi if you are continuing your yatra from Dwarka, or heading on to Jamnagar or an airport afterwards. Choose a round trip if you are returning to Somnath the same day or the next, which keeps the same driver and car with you throughout. Either way the fare is all-in and agreed before you travel.",
    },
    vehiclesIntro:
      "Pick your car by group size. Indicative fares start around ₹4,500 for a sedan on this leg, confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Somnath hotel, home or Veraval station",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: [
      "Temple entry, the Bet Dwarka boat and any guide charges",
      "Driver night halt charges if you keep the car overnight",
    ],
    whyBook: {
      heading: "Why book your Somnath to Dwarka taxi with Experience My India",
      points: whyBookPoints(
        "Door to door pickup from your Somnath hotel, and airport meet and greet if you are connecting through Diu or Rajkot.",
      ),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need the short hop between Veraval and Somnath, which is covered on its own page.",
    ],
    beforeYouTravel: [
      "The drive is comfortable year round, though October to March is the easiest window. Book earlier around Maha Shivratri at Somnath and Janmashtami at Dwarka.",
      "Dwarka darshan, the Nageshwar Jyotirlinga and Bet Dwarka add time, so share your plan and the driver sequences the day.",
      "Carry photo ID for every traveller if you plan to cross to Bet Dwarka by boat.",
    ],
    faq: [
      {
        question: "What is the Somnath to Dwarka taxi fare?",
        answer:
          "Indicative sedan fares start around ₹4,500 for this leg. The final fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book.",
      },
      { question: "What is the distance from Somnath to Dwarka by taxi?", answer: "About 233 km by road, mostly along the NH51 via Porbandar." },
      { question: "How long does the Somnath to Dwarka drive take?", answer: "Around 4.5 to 5 hours, a little more if you stop at Porbandar or Madhavpur." },
      { question: "Is a one way Somnath to Dwarka taxi available?", answer: "Yes. You can book a one-way drop or a round trip, whichever suits your yatra." },
      { question: "Can the driver add Porbandar and Madhavpur on the way?", answer: "Yes. Tell us at booking and the stops are built into the timing." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes and vehicles on the taxi service hub. Compare cars, see every price on the fare rate card, or read the temple guides.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Dwarka to Somnath cab", href: p("dwarka-to-somnath-cab") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Innova Crysta", href: p("innova-crysta") },
      ],
    },
    cta: {
      heading: "Book your Somnath to Dwarka taxi",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  "dwarka-to-somnath-cab": {
    titleTag: "Dwarka to Somnath Cab | Book Your Return Leg",
    metaDescription:
      "Book a Dwarka to Somnath cab online. One way and round trip options with Sedan, Ertiga, Innova Crysta or Tempo Traveller for the return leg.",
    h1: "Dwarka to Somnath Cab",
    crumbLabel: "Dwarka to Somnath",
    quickAnswer:
      "A Dwarka to Somnath cab covers about 233 km in 4.5 to 5 hours by road via Porbandar. Experience My India runs the return leg of the circuit as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with indicative sedan fares from around ₹4,500 confirmed in writing before you book. Pickup is door to door in Dwarka, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs from Dwarka to Somnath, the return coastal leg that carries pilgrims from the Dwarkadhish temple back to the Somnath Jyotirlinga. It follows the same scenic Saurashtra shoreline in reverse, through Porbandar, and your fare is confirmed in writing before you set off.",
    atAGlance: [
      { label: "Route", value: "Dwarka to Somnath, about 233 km" },
      { label: "Drive time", value: "4.5 to 5 hours via Porbandar" },
      { label: "Fares from", value: "around ₹4,500 for a sedan, indicative and confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Dwarka hotel, Okha or the Bet Dwarka jetty" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Dwarka to Somnath",
      body: "The road runs about 233 km down the coast, largely on the NH51, and takes 4.5 to 5 hours. Porbandar makes a natural halfway stop, with Kirti Mandir and Sudama's town worth a short pause, and Madhavpur beach sits a little further along. If you started your yatra at Somnath, this leg closes the loop; if you began at Dwarka, it opens it.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Dwarka to Somnath cab if you are finishing your yatra at Somnath or heading on to Diu afterwards. Choose a round trip to keep the same driver and car for the return to Dwarka.",
    },
    vehiclesIntro:
      "Pick your car by group size. Indicative fares start around ₹4,500 for a sedan on this leg, confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Dwarka hotel, Okha or the jetty",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: [
      "Temple entry, the Bet Dwarka boat and any guide charges",
      "Driver night halt charges if you keep the car overnight",
    ],
    whyBook: {
      heading: "Why book your Dwarka to Somnath cab with Experience My India",
      points: whyBookPoints(
        "Door to door pickup in Dwarka, with airport meet and greet if you are connecting through Jamnagar or Porbandar.",
      ),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need the short Veraval to Somnath hop, which is covered on its own page.",
    ],
    beforeYouTravel: [
      "Porbandar and Madhavpur add little time and break the drive nicely; tell us if you want them built in.",
      "If you are ending at Somnath, an afternoon start still lands you in time for evening darshan.",
      "October to March is the easiest window for the coastal drive.",
    ],
    faq: [
      {
        question: "What is the Dwarka to Somnath cab fare?",
        answer:
          "Indicative sedan fares start around ₹4,500 for this leg. The final fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book.",
      },
      { question: "What is the distance from Dwarka to Somnath by road?", answer: "About 233 km, mostly along the NH51 via Porbandar." },
      { question: "How long does the Dwarka to Somnath drive take?", answer: "Around 4.5 to 5 hours, a little more with stops." },
      { question: "Is a one way Dwarka to Somnath cab available?", answer: "Yes. You can book a one-way drop or a round trip." },
      { question: "Can the driver stop at Porbandar and Madhavpur?", answer: "Yes. Tell us at booking and the stops are built into the timing." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes on the taxi service hub. Travelling out first? Book the Somnath to Dwarka taxi, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Somnath to Dwarka taxi", href: p("somnath-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Tempo Traveller", href: p("tempo-traveller") },
      ],
    },
    cta: {
      heading: "Book your Dwarka to Somnath cab",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  "ahmedabad-to-somnath-taxi": {
    titleTag: "Ahmedabad to Somnath Taxi | Book Online",
    metaDescription:
      "Book an Ahmedabad to Somnath taxi for the intercity drive. One way and round trip cabs with Sedan, Ertiga, Innova Crysta and Tempo Traveller.",
    h1: "Ahmedabad to Somnath Taxi",
    crumbLabel: "Ahmedabad to Somnath",
    quickAnswer:
      "An Ahmedabad to Somnath taxi covers about 400 km in 7 to 8 hours by road via Rajkot and Junagadh. Experience My India runs this intercity leg as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with the fare confirmed in writing before you book. Pickup is door to door in Ahmedabad, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs from Ahmedabad to Somnath, the long approach from Gujarat's largest city to the Somnath Jyotirlinga on the Saurashtra coast. It is a full-day drive, so most travellers start early, and you can break the journey at Rajkot or add Junagadh and Girnar on the way. Your fare is agreed in writing before you set off.",
    atAGlance: [
      { label: "Route", value: "Ahmedabad to Somnath, about 400 km" },
      { label: "Drive time", value: "7 to 8 hours via Rajkot and Junagadh" },
      { label: "Fares from", value: "Indicative, confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Ahmedabad hotel, home or the airport" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Ahmedabad to Somnath",
      body: "The route covers about 400 km and takes 7 to 8 hours, running west through Rajkot before turning south towards the coast. Rajkot is the natural halfway break for tea and a stretch. Many pilgrims add Junagadh, at the foot of Girnar, since it sits close to the road. Share your plan and the driver sets the pace so you reach Somnath in good time for darshan.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Ahmedabad to Somnath taxi if you are staying on in Saurashtra afterwards, or continuing to Dwarka. Choose a round trip if you are returning to Ahmedabad, which keeps the same driver and car with you throughout.",
    },
    vehiclesIntro:
      "Pick your car by group size. Fares for this route are confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Ahmedabad hotel, home or the airport",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: ["Temple entry and any guide charges", "Driver night halt charges on an overnight trip"],
    whyBook: {
      heading: "Why book your Ahmedabad to Somnath taxi with Experience My India",
      points: whyBookPoints("Door to door pickup in Ahmedabad, with airport meet and greet if you are flying in."),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need an airport transfer in Ahmedabad, which is covered on the Ahmedabad airport taxi page.",
    ],
    beforeYouTravel: [
      "It is a full-day drive, so an early start gets you to Somnath in time for evening darshan and the aarti.",
      "Junagadh and Girnar sit close to the route if you want to add them; tell us and the driver plans the timing.",
      "October to March is the easiest window for the long Saurashtra drive.",
    ],
    faq: [
      {
        question: "What is the Ahmedabad to Somnath taxi fare?",
        answer:
          "The fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book. Share your date for a firm all-in quote.",
      },
      { question: "What is the distance from Ahmedabad to Somnath by road?", answer: "About 400 km, usually via Rajkot and Junagadh." },
      { question: "How many hours is Ahmedabad to Somnath by car?", answer: "Around 7 to 8 hours, a little more with stops at Rajkot or Junagadh." },
      { question: "Is a one way Ahmedabad to Somnath taxi available?", answer: "Yes. You can book a one-way drop or a round trip." },
      { question: "Can I add Junagadh or Girnar on the way?", answer: "Yes. Tell us at booking and the stop is built into the timing." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes on the taxi service hub. Continuing to Dwarka? Book the onward leg, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Somnath to Dwarka taxi", href: p("somnath-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Ertiga", href: p("ertiga") },
      ],
    },
    cta: {
      heading: "Book your Ahmedabad to Somnath taxi",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  "ahmedabad-to-dwarka-taxi": {
    titleTag: "Ahmedabad to Dwarka Taxi | Book Online",
    metaDescription:
      "Book an Ahmedabad to Dwarka taxi for the 440 km drive via Rajkot and Jamnagar. One way and round trip cabs, sedan to tempo traveller.",
    h1: "Ahmedabad to Dwarka Taxi",
    crumbLabel: "Ahmedabad to Dwarka",
    quickAnswer:
      "An Ahmedabad to Dwarka taxi covers about 440 km in roughly 8 hours by road via Rajkot and Jamnagar. Experience My India runs this leg as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with the fare confirmed in writing before you book. Pickup is door to door in Ahmedabad, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs from Ahmedabad to Dwarka, the long western drive from Gujarat's largest city to the Dwarkadhish temple on the Arabian Sea. It is a full-day journey through Rajkot and Jamnagar, so an early start helps, and your fare is agreed in writing before you leave.",
    atAGlance: [
      { label: "Route", value: "Ahmedabad to Dwarka, about 440 km" },
      { label: "Drive time", value: "about 8 hours via Rajkot and Jamnagar" },
      { label: "Fares from", value: "Indicative, confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Ahmedabad hotel, home or the airport" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Ahmedabad to Dwarka",
      body: "The route covers about 440 km and takes close to 8 hours, running west through Rajkot and Jamnagar before the final stretch to Dwarka via Khambhalia. Rajkot or Jamnagar make a comfortable halfway break. Many travellers pair the arrival with Nageshwar Jyotirlinga and the boat to Bet Dwarka. Tell us your plan and the driver paces the day around it.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Ahmedabad to Dwarka taxi if you are continuing along the coast to Somnath or Porbandar afterwards. Choose a round trip if you are returning to Ahmedabad, which keeps the same driver and car throughout.",
    },
    vehiclesIntro:
      "Pick your car by group size. Fares for this route are confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Ahmedabad hotel, home or the airport",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: [
      "Temple entry, the Bet Dwarka boat and any guide charges",
      "Driver night halt charges on an overnight trip",
    ],
    whyBook: {
      heading: "Why book your Ahmedabad to Dwarka taxi with Experience My India",
      points: whyBookPoints("Door to door pickup in Ahmedabad, with airport meet and greet if you are flying in."),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need an airport transfer in Ahmedabad, which is covered on the Ahmedabad airport taxi page.",
    ],
    beforeYouTravel: [
      "It is a full-day drive, so an early start leaves time for Dwarka darshan the same evening.",
      "Nageshwar Jyotirlinga and Bet Dwarka pair well with arrival; carry photo ID for the Bet Dwarka boat.",
      "October to March is the easiest window for the long drive.",
    ],
    faq: [
      {
        question: "What is the Ahmedabad to Dwarka taxi fare?",
        answer:
          "The fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book. Share your date for a firm all-in quote.",
      },
      { question: "What is the distance from Ahmedabad to Dwarka by road?", answer: "About 440 km, usually via Rajkot and Jamnagar." },
      { question: "How many hours is Ahmedabad to Dwarka by car?", answer: "Close to 8 hours, a little more with stops." },
      { question: "Is a one way Ahmedabad to Dwarka taxi available?", answer: "Yes. You can book a one-way drop or a round trip." },
      { question: "Can I add Nageshwar and Bet Dwarka after arriving?", answer: "Yes. Tell us at booking and the driver sequences them." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes on the taxi service hub. Heading to Somnath instead? Book that leg, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Ahmedabad to Somnath taxi", href: p("ahmedabad-to-somnath-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Innova Crysta", href: p("innova-crysta") },
      ],
    },
    cta: {
      heading: "Book your Ahmedabad to Dwarka taxi",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },
  "rajkot-to-dwarka-taxi": {
    titleTag: "Rajkot to Dwarka Taxi | One Way Cab Booking",
    metaDescription:
      "Book a Rajkot to Dwarka taxi online. One way and round trip cabs and a choice of Sedan, Ertiga, Innova Crysta or Tempo Traveller.",
    h1: "Rajkot to Dwarka Taxi",
    crumbLabel: "Rajkot to Dwarka",
    quickAnswer:
      "A Rajkot to Dwarka taxi covers about 225 km in 4 to 4.5 hours by road via Jamnagar and Khambhalia. Experience My India runs this leg as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with the fare confirmed in writing before you book. Pickup is door to door in Rajkot, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs from Rajkot to Dwarka, a comfortable half-day drive from central Saurashtra to the Dwarkadhish temple on the coast. Whether you want a one-way drop or a same-day round trip, you travel in an air-conditioned car with a driver who knows the road, and your fare is confirmed in writing before you book.",
    atAGlance: [
      { label: "Route", value: "Rajkot to Dwarka, about 225 km" },
      { label: "Drive time", value: "4 to 4.5 hours via Jamnagar and Khambhalia" },
      { label: "Fares from", value: "Indicative, confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Rajkot hotel, home or the airport" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Rajkot to Dwarka",
      body: "The route covers about 225 km and takes 4 to 4.5 hours, running west through Jamnagar and Khambhalia to Dwarka. Jamnagar makes an easy break for tea. Once you arrive, many travellers add the Nageshwar Jyotirlinga and the boat crossing to Bet Dwarka. Tell us your plan and the driver paces the day so you reach in good time for darshan.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Rajkot to Dwarka taxi if you are continuing along the coast afterwards, or a round trip if you are returning to Rajkot the same day, which keeps the same driver and car throughout.",
    },
    vehiclesIntro:
      "Pick your car by group size. Fares for this route are confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Rajkot hotel, home or the airport",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: [
      "Temple entry, the Bet Dwarka boat and any guide charges",
      "Driver night halt charges if you keep the car overnight",
    ],
    whyBook: {
      heading: "Why book your Rajkot to Dwarka taxi with Experience My India",
      points: whyBookPoints("Door to door pickup in Rajkot, with airport meet and greet if you are flying into Rajkot."),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need a Rajkot airport transfer, which is covered on the Rajkot airport taxi page.",
    ],
    beforeYouTravel: [
      "It is a half-day drive, so a morning start leaves the afternoon and evening for Dwarka darshan.",
      "Nageshwar Jyotirlinga and Bet Dwarka pair well with arrival; carry photo ID for the Bet Dwarka boat.",
      "October to March is the easiest window for the coastal drive.",
    ],
    faq: [
      {
        question: "What is the Rajkot to Dwarka taxi fare?",
        answer:
          "The fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book. Share your date for a firm all-in quote.",
      },
      { question: "What is the distance from Rajkot to Dwarka by road?", answer: "About 225 km, usually via Jamnagar and Khambhalia." },
      { question: "How long does the Rajkot to Dwarka drive take?", answer: "Around 4 to 4.5 hours, a little more with a stop at Jamnagar." },
      { question: "Is a one way Rajkot to Dwarka taxi available?", answer: "Yes. You can book a one-way drop or a round trip." },
      { question: "Can I add Nageshwar and Bet Dwarka after arriving?", answer: "Yes. Tell us at booking and the driver sequences them." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes on the taxi service hub. Starting from Jamnagar instead? Book that leg, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Jamnagar to Dwarka taxi", href: p("jamnagar-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Innova Crysta", href: p("innova-crysta") },
      ],
    },
    cta: {
      heading: "Book your Rajkot to Dwarka taxi",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  "jamnagar-to-dwarka-taxi": {
    titleTag: "Jamnagar to Dwarka Taxi | Book Online",
    metaDescription:
      "Book a Jamnagar to Dwarka taxi online. One way and round trip cabs with Sedan, Ertiga, Innova Crysta and Tempo Traveller.",
    h1: "Jamnagar to Dwarka Taxi",
    crumbLabel: "Jamnagar to Dwarka",
    quickAnswer:
      "A Jamnagar to Dwarka taxi covers about 130 km in roughly 2.5 hours by road via Khambhalia. Experience My India runs this short leg as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with the fare confirmed in writing before you book. Pickup is door to door in Jamnagar, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs from Jamnagar to Dwarka, the shortest of the main approaches to the Dwarkadhish temple. It is an easy half-day return, which makes it popular for a same-day darshan trip. Your fare is confirmed in writing before you set off.",
    atAGlance: [
      { label: "Route", value: "Jamnagar to Dwarka, about 130 km" },
      { label: "Drive time", value: "about 2.5 hours via Khambhalia" },
      { label: "Fares from", value: "Indicative, confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Jamnagar hotel, home or the airport" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Jamnagar to Dwarka",
      body: "The route covers about 130 km and takes roughly 2.5 hours via Khambhalia, running straight for the coast. Because it is short, many pilgrims do darshan at Dwarkadhish, add the Nageshwar Jyotirlinga and the boat to Bet Dwarka, and return to Jamnagar the same day. Tell us your plan and the driver builds in the stops.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Jamnagar to Dwarka taxi for a simple drop, or a round trip for a same-day darshan and return, which keeps the same driver and car with you.",
    },
    vehiclesIntro:
      "Pick your car by group size. Fares for this route are confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Jamnagar hotel, home or the airport",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: [
      "Temple entry, the Bet Dwarka boat and any guide charges",
      "Driver waiting charges if you keep the car for a same-day return",
    ],
    whyBook: {
      heading: "Why book your Jamnagar to Dwarka taxi with Experience My India",
      points: whyBookPoints(
        "Door to door pickup in Jamnagar, with airport meet and greet if you are flying into Jamnagar.",
      ),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need a Jamnagar airport transfer, which is covered on the Jamnagar airport taxi page.",
    ],
    beforeYouTravel: [
      "It is a short drive, so a morning start easily allows darshan and a same-day return.",
      "Add the Nageshwar Jyotirlinga and Bet Dwarka to make a full day; carry photo ID for the boat.",
      "October to March is the easiest window for the coastal drive.",
    ],
    faq: [
      {
        question: "What is the Jamnagar to Dwarka taxi fare?",
        answer:
          "The fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book. Share your date for a firm all-in quote.",
      },
      { question: "What is the distance from Jamnagar to Dwarka by road?", answer: "About 130 km, usually via Khambhalia." },
      { question: "How long does the Jamnagar to Dwarka drive take?", answer: "Around 2.5 hours." },
      {
        question: "Can I do Dwarka darshan and return to Jamnagar the same day?",
        answer: "Yes. The short drive makes a same-day round trip comfortable.",
      },
      { question: "Is a one way Jamnagar to Dwarka taxi available?", answer: "Yes. You can book a one-way drop or a round trip." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes on the taxi service hub. Starting from Rajkot instead? Book that leg, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Rajkot to Dwarka taxi", href: p("rajkot-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Ertiga", href: p("ertiga") },
      ],
    },
    cta: {
      heading: "Book your Jamnagar to Dwarka taxi",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  "veraval-to-dwarka-taxi": {
    titleTag: "Veraval to Dwarka Taxi | Book Cab Online",
    metaDescription:
      "Book a Veraval to Dwarka taxi online. One way and round trip cabs with Sedan, Ertiga, Innova Crysta and Tempo Traveller along the coast.",
    h1: "Veraval to Dwarka Taxi",
    crumbLabel: "Veraval to Dwarka",
    quickAnswer:
      "A Veraval to Dwarka taxi covers about 240 km in 4.5 to 5 hours by road via Somnath and Porbandar. Experience My India runs this coastal leg as a private one-way or round-trip cab, from a sedan up to a tempo traveller, with the fare confirmed in writing before you book. Pickup is door to door in Veraval, including from the railway station, and the drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private cabs from Veraval to Dwarka, a scenic coastal drive that passes Somnath and Porbandar on the way to the Dwarkadhish temple. Many pilgrims arrive at Veraval by train and pick up the cab there. Your fare is confirmed in writing before you set off.",
    atAGlance: [
      { label: "Route", value: "Veraval to Dwarka, about 240 km" },
      { label: "Drive time", value: "4.5 to 5 hours via Somnath and Porbandar" },
      { label: "Fares from", value: "Indicative, confirmed at booking" },
      { label: "Vehicles", value: "Sedan, Ertiga (6 seats), Innova Crysta (7 seats), Tempo Traveller for 9 to 17" },
      { label: "Trip types", value: "One-way drop or round trip" },
      { label: "Pickup", value: "Door to door from your Veraval hotel, home or the railway station" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    driveSection: {
      heading: "The drive from Veraval to Dwarka",
      body: "The route covers about 240 km and takes 4.5 to 5 hours, hugging the Saurashtra coast through Somnath and Porbandar. It is easy to add a quick Somnath darshan at the start and a pause at Porbandar's Kirti Mandir on the way. Tell us your plan and the driver builds the stops into the timing.",
    },
    tripTypes: {
      heading: "One-way or round trip",
      body: "Book a one-way Veraval to Dwarka taxi for a straight drop, or a round trip to keep the same driver and car with you.",
    },
    vehiclesIntro:
      "Pick your car by group size. Fares for this route are confirmed at booking. For the full price list across vehicles, open the fare rate card.",
    faresIncluded: [
      "Door to door pickup from your Veraval hotel, home or the railway station",
      "A written fare, confirmed before you travel",
    ],
    faresExcluded: [
      "Temple entry, the Bet Dwarka boat and any guide charges",
      "Driver night halt charges if you keep the car overnight",
    ],
    whyBook: {
      heading: "Why book your Veraval to Dwarka taxi with Experience My India",
      points: whyBookPoints(
        "Door to door pickup in Veraval, including from the railway station, with airport transfers from Diu or Porbandar if you are flying in.",
      ),
    },
    notForYou: [
      "You want the single cheapest shared seat. This is a private cab for your group alone.",
      "You want a self-drive rental. Every booking includes a driver.",
      "You only need the short Veraval to Somnath hop, which is covered on its own page.",
    ],
    beforeYouTravel: [
      "A morning start leaves time for Somnath darshan before the drive and Dwarka darshan on arrival.",
      "Porbandar's Kirti Mandir sits right on the route if you want a short stop.",
      "October to March is the easiest window for the coastal drive.",
    ],
    faq: [
      {
        question: "What is the Veraval to Dwarka taxi fare?",
        answer:
          "The fare depends on the vehicle and whether you travel one-way or round-trip, and it is confirmed in writing before you book. Share your date for a firm all-in quote.",
      },
      { question: "What is the distance from Veraval to Dwarka by road?", answer: "About 240 km, along the coast via Somnath and Porbandar." },
      { question: "How long does the Veraval to Dwarka drive take?", answer: "Around 4.5 to 5 hours." },
      { question: "Can you pick me up from Veraval railway station?", answer: "Yes. Pickup is door to door, including from the station." },
      { question: "Is a one way Veraval to Dwarka taxi available?", answer: "Yes. You can book a one-way drop or a round trip." },
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "Planning the whole circuit? See all routes on the taxi service hub. Only need the short hop? Book the Veraval to Somnath taxi, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Veraval to Somnath taxi", href: p("veraval-to-somnath-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        { label: "Tempo Traveller", href: p("tempo-traveller") },
      ],
    },
    cta: {
      heading: "Book your Veraval to Dwarka taxi",
      body: `Send your date, pickup point and number of pilgrims, and we confirm the car and the all-in fare before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },
};

export const spokeCopyFor = (slug: string): SpokeCopy | null => SPOKE_COPY[slug] ?? null;

/* ------------------------------- Vehicle pages ------------------------------- */

/** Booking scope shared by all three vehicle pages. */
export const VEHICLE_SCOPE = {
  includedTitle: "Included in every booking",
  included: [
    "Air-conditioning and fuel",
    "Driver allowance and GPS tracked travel",
    "Door to door pickup from your hotel, home, station or airport",
    "A rate confirmed before you travel",
  ],
  excludedTitle: "Not included, unless added to your quote first",
  excluded: [
    "Tolls and parking where they apply",
    "Temple entry, boat tickets and any guide charges",
    "Sightseeing detours added mid-trip, which are quoted before they are driven",
  ],
} as const;

export const VEHICLE_AUTHOR = {
  line: "The fleet and routes are maintained by Harsh Sharma, who leads the Gujarat operations.",
  links: SPOKE_AUTHOR.links,
} as const;

export type VehicleCopy = {
  titleTag: string;
  metaDescription: string;
  h1: string;
  crumbLabel: string;
  quickAnswer: string;
  intro: string;
  atAGlance: { label: string; value: string }[];
  features: { heading: string; items: string[] };
  whoItSuits: { heading: string; body: string };
  ratesBooking: { heading: string; body: string };
  popularRoutes: { heading: string; body: string };
  /** Prepended to the shared included list — names the vehicle itself. */
  includedFirst: string;
  /** Appended to the shared excluded list — the night-halt wording varies. */
  excludedExtra: string;
  whyBook: { heading: string; points: string[] };
  notForYou: string[];
  faq: { question: string; answer: string }[];
  keepPlanning: { intro: string; links: { label: string; href: string }[] };
  cta: { heading: string; body: string };
};

/** Why-book points for a vehicle page: fleet-first rather than route-first. */
const vehicleWhyBook = (airportLine: string) => [
  `The local Gujarat unit of ${OPERATOR.parent}, ${OPERATOR.parentSlogan}, running Saurashtra yatras since ${OPERATOR.foundingDate}.`,
  `Drivers and guides who speak ${OPERATOR.languagesProse}, so pilgrims from the south travel with someone they can talk to.`,
  "A 4.5 star rating on Tripadvisor, across more than 2,400 completed trips.",
  "Well-serviced, air-conditioned vehicles, GPS tracked, with fares confirmed in writing and no hidden tolls or parking.",
  airportLine,
  `A GST registered business, GSTIN ${OPERATOR.gstin}, with clear booking and cancellation terms.`,
];

const DRIVER_FAQ = (vehicle: string, driver = "an experienced driver") => ({
  question: `Does the ${vehicle} come with a driver?`,
  answer: `Yes. Every booking includes ${driver}.`,
});

export const VEHICLE_COPY: Record<string, VehicleCopy> = {
  "innova-crysta": {
    titleTag: "Innova Crysta Taxi on Rent | Gujarat Cabs",
    metaDescription:
      "Hire an Innova Crysta taxi in Gujarat. Spacious 7 seater comfort for Somnath, Dwarka and Saurashtra routes, with online booking.",
    h1: "Innova Crysta Taxi on Rent",
    crumbLabel: "Innova Crysta",
    quickAnswer:
      "The Innova Crysta is a 7 seat premium SUV with room for about 4 large bags, the most comfortable car in the fleet for the Somnath and Dwarka circuit. Experience My India rents it with an experienced driver, at per kilometre rates confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India rents the Innova Crysta with a driver across Gujarat, the car most families choose for the Saurashtra pilgrimage circuit when they want space and a smooth ride. It seats seven, holds about four large suitcases, and settles the long coastal legs comfortably.",
    atAGlance: [
      { label: "Seats", value: "7 passenger seats" },
      { label: "Luggage", value: "About 4 large suitcases" },
      { label: "Best suited for", value: "Families and small groups wanting extra comfort and luggage space" },
      { label: "Popular routes", value: "Somnath to Dwarka, Ahmedabad to Somnath and Rajkot to Dwarka" },
      { label: "Rates", value: "Per kilometre with a driver, confirmed at booking" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    features: {
      heading: "The Innova Crysta",
      items: [
        "Dual AC vents with blower control",
        "Adjustable captain seats with armrests",
        "Generous cargo room for about four large suitcases",
        "Premium highway suspension for the long drives",
      ],
    },
    whoItSuits: {
      heading: "Who it suits",
      body: "Choose the Innova Crysta if you are a family or small group of up to seven who want captain-seat comfort, generous luggage room and a settled ride on the long drives to Somnath and Dwarka. Watching the budget? The Ertiga is the lighter pick. Larger group? The Tempo Traveller seats 9 to 17.",
    },
    ratesBooking: {
      heading: "Rates and booking",
      body: "The Innova Crysta is rented with a driver at per kilometre rates, confirmed before you book. See the fare rate card for the full price list, or share your route and dates for a firm all-in quote.",
    },
    popularRoutes: {
      heading: "Popular routes in the Innova Crysta",
      body: "Travellers most often take the Innova Crysta on the Somnath to Dwarka leg, the long Ahmedabad to Somnath drive, and the Rajkot to Dwarka run. It suits any of the circuit routes where comfort and luggage space matter.",
    },
    includedFirst: "The Innova Crysta with an experienced driver",
    excludedExtra: "Driver night halt charges on multi-day trips",
    whyBook: {
      heading: "Why book your Innova Crysta taxi with Experience My India",
      points: vehicleWhyBook("Available for airport pickups from Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar."),
    },
    notForYou: [
      "You are travelling on the tightest budget; the Ertiga is the more economical six seater.",
      "You are a group of more than seven; the tempo traveller seats 9 to 17.",
      "You want a self-drive rental. The Innova Crysta comes with a driver.",
    ],
    faq: [
      {
        question: "What is the Innova Crysta taxi price per km?",
        answer:
          "It is rented at a per kilometre rate confirmed before you book. Share your route and dates for a firm all-in quote, or see the fare rate card.",
      },
      { question: "How many seats does the Innova Crysta have?", answer: "Seven passenger seats, with room for about four large suitcases." },
      {
        question: "Is the Innova Crysta good for the Somnath Dwarka trip?",
        answer: "Yes. Its comfort and luggage space suit the long coastal drives, which is why families favour it.",
      },
      DRIVER_FAQ("Innova Crysta"),
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "See the whole fleet and every route on the taxi service hub. Comparing cars? Look at the Ertiga and the Tempo Traveller, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Ertiga", href: p("ertiga") },
        { label: "Tempo Traveller", href: p("tempo-traveller") },
        { label: "Somnath to Dwarka taxi", href: p("somnath-to-dwarka-taxi") },
      ],
    },
    cta: {
      heading: "Book your Innova Crysta taxi",
      body: `Send your route, dates and number of travellers, and we confirm the Innova Crysta and the all-in rate before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  ertiga: {
    titleTag: "Ertiga Taxi on Rent | 6 Seater Cab Booking",
    metaDescription:
      "Hire an Ertiga taxi in Gujarat. A comfortable 6 seat cab for Somnath, Dwarka and Saurashtra trips, with easy online booking and clear rates.",
    h1: "Ertiga Taxi on Rent",
    crumbLabel: "Ertiga",
    quickAnswer:
      "The Ertiga is a comfortable 6 seat cab with room for about 3 bags, the value pick for the Somnath and Dwarka circuit. Experience My India rents it with an experienced driver, at per kilometre rates confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India rents the Ertiga with a driver across Gujarat, the car small families choose when they want a comfortable ride without the premium of a full SUV. It seats six, carries about three bags, and handles the Saurashtra routes with ease.",
    atAGlance: [
      { label: "Seats", value: "6 passenger seats" },
      { label: "Luggage", value: "About 3 bags" },
      { label: "Best suited for", value: "Small families balancing comfort and cost" },
      { label: "Popular routes", value: "Somnath to Dwarka, Rajkot to Dwarka and Jamnagar to Dwarka" },
      { label: "Rates", value: "Per kilometre with a driver, confirmed at booking" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    features: {
      heading: "The Ertiga",
      items: [
        "Roof-mounted rear AC vents",
        "Comfortable seating for up to six passengers",
        "Flexible third-row and boot layout",
        "The best balance of cost and utility in the fleet",
      ],
    },
    whoItSuits: {
      heading: "Who it suits",
      body: "Choose the Ertiga if you are a small family or group of up to six who want air-conditioned comfort at the best value. For extra space and luggage, step up to the Innova Crysta. For a larger group, the Tempo Traveller seats 9 to 17.",
    },
    ratesBooking: {
      heading: "Rates and booking",
      body: "The Ertiga is rented with a driver at per kilometre rates, confirmed before you book. See the fare rate card for the full price list, or share your route and dates for a firm all-in quote.",
    },
    popularRoutes: {
      heading: "Popular routes in the Ertiga",
      body: "Travellers most often take the Ertiga on the Somnath to Dwarka leg, the Rajkot to Dwarka run, and the short Jamnagar to Dwarka hop. It suits the circuit routes where value matters most.",
    },
    includedFirst: "The Ertiga with an experienced driver",
    excludedExtra: "Driver night halt charges on multi-day trips",
    whyBook: {
      heading: "Why book your Ertiga taxi with Experience My India",
      points: vehicleWhyBook("Available for airport pickups from Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar."),
    },
    notForYou: [
      "You are a group of more than six; the Innova Crysta seats seven and the tempo traveller seats 9 to 17.",
      "You want the most premium ride; the Innova Crysta has captain seats and more luggage room.",
      "You want a self-drive rental. The Ertiga comes with a driver.",
    ],
    faq: [
      {
        question: "What is the Ertiga taxi price per km?",
        answer:
          "It is rented at a per kilometre rate confirmed before you book. Share your route and dates for a firm all-in quote, or see the fare rate card.",
      },
      { question: "How many seats does the Ertiga have?", answer: "Six passenger seats, with room for about three bags." },
      {
        question: "Is the Ertiga a good budget cab for Gujarat?",
        answer: "Yes. It gives air-conditioned comfort at the best value in the fleet, which suits small families.",
      },
      DRIVER_FAQ("Ertiga"),
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "See the whole fleet and every route on the taxi service hub. Comparing cars? Look at the Innova Crysta and the Tempo Traveller, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Innova Crysta", href: p("innova-crysta") },
        { label: "Tempo Traveller", href: p("tempo-traveller") },
        { label: "Somnath to Dwarka taxi", href: p("somnath-to-dwarka-taxi") },
      ],
    },
    cta: {
      heading: "Book your Ertiga taxi",
      body: `Send your route, dates and number of travellers, and we confirm the Ertiga and the all-in rate before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },

  "tempo-traveller": {
    titleTag: "Tempo Traveller on Rent | Group Tour Cab",
    metaDescription:
      "Hire a Tempo Traveller in Gujarat for group and family tours. Roomy seating for Somnath, Dwarka and Saurashtra trips, booked online.",
    h1: "Tempo Traveller on Rent",
    crumbLabel: "Tempo Traveller",
    quickAnswer:
      "The Tempo Traveller seats group yatras of 9 to 17 with an experienced highway driver, the fleet's choice for extended families and satsang mandals across Saurashtra. Experience My India rents it with a driver, at rates confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India rents the Tempo Traveller with a driver for group travel across Gujarat, the vehicle that keeps a satsang mandal or an extended family together on one booking. It seats 9 to 17 in an air-conditioned cabin, with a driver who knows the Saurashtra roads.",
    atAGlance: [
      { label: "Seats", value: "9 to 17 passengers" },
      { label: "Luggage", value: "Group luggage in the rear" },
      { label: "Best suited for", value: "Extended families, satsang mandals and group yatras" },
      { label: "Popular routes", value: "Ahmedabad to Somnath, Somnath to Dwarka and Bhuj to White Rann" },
      { label: "Rates", value: "Per kilometre with a driver, confirmed at booking" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    features: {
      heading: "The Tempo Traveller",
      items: [
        "Air-conditioned climate control cabin",
        "Experienced highway driver",
        "Sanitised cabin, dashboard and seats",
        "24/7 roadside assistance on the road",
      ],
    },
    whoItSuits: {
      heading: "Who it suits",
      body: "Choose the Tempo Traveller for group yatras of 9 to 17, when a single vehicle beats splitting into several cars. For smaller families, the Ertiga and the Innova Crysta are the right size.",
    },
    ratesBooking: {
      heading: "Rates and booking",
      body: "The Tempo Traveller is rented with a driver at rates confirmed before you book. See the fare rate card for the full price list, or share your route, dates and group size for a firm all-in quote.",
    },
    popularRoutes: {
      heading: "Popular routes in the Tempo Traveller",
      body: "Groups most often take the Tempo Traveller on the long Ahmedabad to Somnath drive, the Somnath to Dwarka leg, and the Bhuj to White Rann trip for Rann Utsav. It suits any route where the whole group travels together.",
    },
    includedFirst: "The Tempo Traveller with an experienced driver",
    excludedExtra: "Driver night halt charges on multi-day group tours",
    whyBook: {
      heading: "Why book your Tempo Traveller with Experience My India",
      points: vehicleWhyBook("Available for group airport pickups from Diu, Rajkot, Jamnagar, Ahmedabad and Porbandar."),
    },
    notForYou: [
      "Your group is small; the Ertiga seats six and the Innova Crysta seats seven at lower cost.",
      "You want a compact car for short city runs; the tempo traveller is built for group highway travel.",
      "You want a self-drive rental. The tempo traveller comes with a driver.",
    ],
    faq: [
      {
        question: "What is the Tempo Traveller rent per km?",
        answer:
          "It is rented with a driver at a rate confirmed before you book. Share your route, dates and group size for a firm all-in quote, or see the fare rate card.",
      },
      { question: "How many seats does the Tempo Traveller have?", answer: "It seats group yatras of 9 to 17 passengers." },
      {
        question: "Can I book a Tempo Traveller for a group yatra?",
        answer: "Yes. It is the fleet's choice for satsang mandals and extended families travelling together.",
      },
      DRIVER_FAQ("Tempo Traveller", "an experienced highway driver"),
      LANGUAGES_FAQ,
    ],
    keepPlanning: {
      intro:
        "See the whole fleet and every route on the taxi service hub. Smaller group? Compare the Innova Crysta and the Ertiga, or see prices on the fare rate card. Planning Rann Utsav? See the Bhuj to White Rann taxi.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Innova Crysta", href: p("innova-crysta") },
        { label: "Ertiga", href: p("ertiga") },
        { label: "Bhuj to White Rann taxi", href: p("bhuj-to-white-rann-taxi") },
      ],
    },
    cta: {
      heading: "Book your Tempo Traveller",
      body: `Send your route, dates and number of travellers, and we confirm the Tempo Traveller and the all-in rate before you commit. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
    },
  },
};

export const vehicleCopyFor = (slug: string): VehicleCopy | null => VEHICLE_COPY[slug] ?? null;

/* ------------------------------- Airport pages ------------------------------- */

/** Transfer scope shared by all five airport pages. */
export const AIRPORT_SCOPE = {
  includedTitle: "Included in every transfer",
  included: [
    "Meet and greet at arrivals with flight tracking",
    "Air-conditioned vehicle, fuel and an experienced driver",
    "GPS tracked transfer, door to door",
    "Reasonable waiting time for flight delays",
    "A fare confirmed before you travel",
  ],
  excludedTitle: "Not included, unless added to your quote first",
  excluded: [
    "Tolls, parking and airport entry charges where they apply",
    "Extended waiting beyond the included time, quoted in advance",
    "Temple entry, boat tickets and any guide charges",
    "Onward sightseeing, which is quoted before it is driven",
  ],
} as const;

export const AIRPORT_AUTHOR = {
  line: "Transfers and routes are maintained by Harsh Sharma, who leads the Gujarat operations.",
  links: SPOKE_AUTHOR.links,
} as const;

/** The meet-and-greet paragraph is identical on every airport page. */
export const MEET_AND_GREET_BODY =
  "Your driver waits at the arrivals gate with a name board and tracks your flight, so a delay does not cost you the car. Share your flight number and terminal at booking and we time the pickup to your landing. Pickup is door to door to your hotel or temple town, in an air-conditioned car.";

export const AIRPORT_VEHICLES_INTRO =
  "Pick your car by group size, from a sedan to a Tempo Traveller for a group. Compare the Innova Crysta and the Ertiga too. Airport transfer fares are confirmed at booking; see the fare rate card for the full list.";

export type AirportCopy = {
  titleTag: string;
  metaDescription: string;
  h1: string;
  crumbLabel: string;
  quickAnswer: string;
  intro: string;
  atAGlance: { label: string; value: string }[];
  transfers: { heading: string; body: string };
  whyBook: { heading: string; points: string[] };
  notForYou: string[];
  beforeYouFly: string[];
  faq: { question: string; answer: string }[];
  keepPlanning: { intro: string; links: { label: string; href: string }[] };
  cta: { heading: string; body: string };
};

const airportWhyBook = (city: string) => [
  `The local Gujarat unit of ${OPERATOR.parent}, ${OPERATOR.parentSlogan}, running Saurashtra yatras since ${OPERATOR.foundingDate}.`,
  `Drivers and guides who speak ${OPERATOR.languagesProse}, so pilgrims from the south travel with someone they can talk to.`,
  "A 4.5 star rating on Tripadvisor, across more than 2,400 completed trips.",
  `Meet and greet pickup at ${city} airport, with your driver tracking the flight.`,
  "GPS tracked, air-conditioned cars, with fares confirmed in writing and no hidden tolls or parking.",
  `A GST registered business, GSTIN ${OPERATOR.gstin}, with clear booking and cancellation terms.`,
];

/** The three questions every airport page answers the same way. */
const airportCommonFaq = (city: string) => [
  {
    question: `Do you offer meet and greet at ${city} airport?`,
    answer: "Yes. Your driver waits at arrivals with a name board and tracks your flight.",
  },
  {
    question: "Do you wait if my flight is delayed?",
    answer: "Yes. Reasonable waiting time for flight delays is included; longer waits are quoted in advance.",
  },
  LANGUAGES_FAQ,
];

const airportFareFaq = (city: string) => ({
  question: `What is the ${city} airport taxi fare?`,
  answer:
    "The fare depends on the vehicle and your destination, and it is confirmed before you book. Share your flight and drop point for a firm all-in quote.",
});

const airportBeforeYouFly = (last: string) => [
  "Share your flight number and terminal so the driver can track your landing.",
  "Have your booking details handy at arrivals; the driver waits with a name board.",
  last,
];

const airportCta = (city: string) => ({
  heading: `Book your ${city} airport taxi`,
  body: `Send your flight details, arrival date and number of travellers, and we confirm the car and the all-in fare before you land. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
});

const FLEET_LINKS = [
  { label: "Innova Crysta", href: p("innova-crysta") },
  { label: "Ertiga", href: p("ertiga") },
  { label: "Tempo Traveller", href: p("tempo-traveller") },
];

export const AIRPORT_COPY: Record<string, AirportCopy> = {
  diu: {
    titleTag: "Diu Airport Taxi | Arrival and Transfer Cabs",
    metaDescription:
      "Book a Diu airport taxi for arrivals and Somnath transfers. Comfortable cabs and easy online booking, with a choice of vehicles.",
    h1: "Diu Airport Taxi",
    crumbLabel: "Diu",
    quickAnswer:
      "A Diu airport taxi transfers you about 85 km to Somnath in roughly 2 hours. Experience My India runs meet-and-greet pickups from Diu airport, with your driver tracking the flight, in a choice of vehicles and a fare confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private meet-and-greet transfers from Diu airport, the closest airport to the Somnath Jyotirlinga. Your driver waits at arrivals and takes you straight to Somnath or your hotel, and the fare is confirmed before you travel.",
    atAGlance: [
      { label: "Airport", value: "Diu Airport (DIU)" },
      { label: "Transfers to", value: "Somnath" },
      { label: "Distance and time", value: "About 85 km to Somnath, 2 hours" },
      { label: "Vehicles", value: "Sedan, Ertiga, Innova Crysta and Tempo Traveller" },
      { label: "Meet and greet", value: "Yes, your driver waits at arrivals and tracks the flight" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    transfers: {
      heading: "Transfers to Somnath",
      body: "Diu airport is the nearest airport to Somnath, about 85 km and 2 hours away by road. Most arrivals head straight to the Somnath temple. From there you can continue the circuit; the Somnath to Dwarka taxi picks up the onward leg to Dwarka.",
    },
    whyBook: { heading: "Why book your Diu airport taxi with Experience My India", points: airportWhyBook("Diu") },
    notForYou: [
      "You only need a short local ride within Diu; this is an airport transfer to the temple towns.",
      "You want a self-drive rental. Every transfer includes a driver.",
      "You want the full multi-day circuit, which is planned on the taxi hub.",
    ],
    beforeYouFly: airportBeforeYouFly(
      "Tell us your onward temple plan and we can extend the transfer into a full route to Dwarka.",
    ),
    faq: [
      airportFareFaq("Diu"),
      { question: "How far is Diu airport from Somnath?", answer: "About 85 km, a 2 hour drive." },
      ...airportCommonFaq("Diu"),
    ],
    keepPlanning: {
      intro:
        "See all transfers and routes on the taxi service hub. Continuing to Dwarka? Book the Somnath to Dwarka taxi, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Somnath to Dwarka taxi", href: p("somnath-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        ...FLEET_LINKS,
      ],
    },
    cta: airportCta("Diu"),
  },

  rajkot: {
    titleTag: "Rajkot Airport Taxi | City Transfer Cabs",
    metaDescription:
      "Book a Rajkot airport taxi for Somnath and Dwarka transfers. Comfortable cabs, a choice of vehicles, and quick online booking.",
    h1: "Rajkot Airport Taxi",
    crumbLabel: "Rajkot",
    quickAnswer:
      "A Rajkot airport taxi transfers you to Somnath or Dwarka, about 190 km to Somnath in roughly 4 hours. Experience My India runs meet-and-greet pickups from Rajkot airport, with your driver tracking the flight, in a choice of vehicles and a fare confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private meet-and-greet transfers from Rajkot airport in central Saurashtra, a common arrival point for the temple circuit. Your driver waits at arrivals and takes you on to Somnath, Dwarka or your hotel, and the fare is confirmed before you travel.",
    atAGlance: [
      { label: "Airport", value: "Rajkot Airport (RAJ / HSR)" },
      { label: "Transfers to", value: "Somnath and Dwarka" },
      { label: "Distance and time", value: "About 190 km to Somnath, 4 hours" },
      { label: "Vehicles", value: "Sedan, Ertiga, Innova Crysta and Tempo Traveller" },
      { label: "Meet and greet", value: "Yes, your driver waits at arrivals and tracks the flight" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    transfers: {
      heading: "Transfers to Somnath and Dwarka",
      body: "Rajkot airport sits in central Saurashtra, roughly 190 km and 4 hours from Somnath, with Dwarka a similar onward drive. If you want the intercity leg booked as a route, the Rajkot to Dwarka taxi covers it.",
    },
    whyBook: { heading: "Why book your Rajkot airport taxi with Experience My India", points: airportWhyBook("Rajkot") },
    notForYou: [
      "You only need a local Rajkot city ride; this is a transfer to the temple towns.",
      "You want a self-drive rental. Every transfer includes a driver.",
      "You want the intercity Rajkot to Dwarka drive booked as a route, which is covered on its own page.",
    ],
    beforeYouFly: airportBeforeYouFly(
      "Tell us whether you are heading to Somnath or Dwarka and we plan the transfer, or extend it into a full route.",
    ),
    faq: [
      airportFareFaq("Rajkot"),
      { question: "How far is Rajkot airport from Somnath?", answer: "About 190 km, a 4 hour drive. Dwarka is a similar distance." },
      ...airportCommonFaq("Rajkot"),
    ],
    keepPlanning: {
      intro:
        "See all transfers and routes on the taxi service hub. Heading to Dwarka? Book the Rajkot to Dwarka taxi, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Rajkot to Dwarka taxi", href: p("rajkot-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        ...FLEET_LINKS,
      ],
    },
    cta: airportCta("Rajkot"),
  },

  jamnagar: {
    titleTag: "Jamnagar Airport Taxi | Transfer Cabs",
    metaDescription:
      "Book a Jamnagar airport taxi for Dwarka transfers. Comfortable cabs, a choice of vehicles, and simple online booking.",
    h1: "Jamnagar Airport Taxi",
    crumbLabel: "Jamnagar",
    quickAnswer:
      "A Jamnagar airport taxi transfers you about 130 km to Dwarka in roughly 2.5 hours. Experience My India runs meet-and-greet pickups from Jamnagar airport, with your driver tracking the flight, in a choice of vehicles and a fare confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private meet-and-greet transfers from Jamnagar airport, the closest airport to Dwarka. Your driver waits at arrivals and takes you straight to the Dwarkadhish temple or your hotel, and the fare is confirmed before you travel.",
    atAGlance: [
      { label: "Airport", value: "Jamnagar Airport (JGA)" },
      { label: "Transfers to", value: "Dwarka" },
      { label: "Distance and time", value: "About 130 km to Dwarka, 2.5 hours" },
      { label: "Vehicles", value: "Sedan, Ertiga, Innova Crysta and Tempo Traveller" },
      { label: "Meet and greet", value: "Yes, your driver waits at arrivals and tracks the flight" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    transfers: {
      heading: "Transfers to Dwarka",
      body: "Jamnagar airport is the nearest airport to Dwarka, about 130 km and 2.5 hours away. Arrivals usually transfer straight to the temple. If you want it booked as a route, the Jamnagar to Dwarka taxi covers the drive.",
    },
    whyBook: {
      heading: "Why book your Jamnagar airport taxi with Experience My India",
      points: airportWhyBook("Jamnagar"),
    },
    notForYou: [
      "You only need a local Jamnagar city ride; this is a transfer to Dwarka.",
      "You want a self-drive rental. Every transfer includes a driver.",
      "You want the intercity Jamnagar to Dwarka drive booked as a route, which is covered on its own page.",
    ],
    beforeYouFly: airportBeforeYouFly("Tell us your onward plan and we can extend the transfer into a full circuit."),
    faq: [
      airportFareFaq("Jamnagar"),
      { question: "How far is Jamnagar airport from Dwarka?", answer: "About 130 km, a 2.5 hour drive." },
      ...airportCommonFaq("Jamnagar"),
    ],
    keepPlanning: {
      intro:
        "See all transfers and routes on the taxi service hub. Prefer it as a route? Book the Jamnagar to Dwarka taxi, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Jamnagar to Dwarka taxi", href: p("jamnagar-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        ...FLEET_LINKS,
      ],
    },
    cta: airportCta("Jamnagar"),
  },

  ahmedabad: {
    titleTag: "Ahmedabad Airport Taxi | City Transfer Cabs",
    metaDescription:
      "Book an Ahmedabad airport taxi for Somnath and Dwarka transfers. Comfortable cabs, a choice of vehicles, and easy online booking.",
    h1: "Ahmedabad Airport Taxi",
    crumbLabel: "Ahmedabad",
    quickAnswer:
      "An Ahmedabad airport taxi transfers you to Somnath or Dwarka, about 400 km to Somnath in 7 to 8 hours. Experience My India runs meet-and-greet pickups from Ahmedabad airport, with your driver tracking the flight, in a choice of vehicles and a fare confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private meet-and-greet transfers from Ahmedabad airport, the main gateway to Gujarat. Your driver waits at arrivals and takes you on to the temples or your hotel. Because Somnath and Dwarka are a long drive from Ahmedabad, these transfers are usually booked as a full route.",
    atAGlance: [
      { label: "Airport", value: "Ahmedabad Airport (AMD)" },
      { label: "Transfers to", value: "Somnath and Dwarka" },
      { label: "Distance and time", value: "About 400 km to Somnath, 7 to 8 hours" },
      { label: "Vehicles", value: "Sedan, Ertiga, Innova Crysta and Tempo Traveller" },
      { label: "Meet and greet", value: "Yes, your driver waits at arrivals and tracks the flight" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    transfers: {
      heading: "Transfers to Somnath and Dwarka",
      body: "Ahmedabad airport is the main gateway to Gujarat. Somnath is about 400 km and 7 to 8 hours away, and Dwarka a little further. Long transfers like these are usually booked as a full route: see the Ahmedabad to Somnath taxi or the Ahmedabad to Dwarka taxi.",
    },
    whyBook: {
      heading: "Why book your Ahmedabad airport taxi with Experience My India",
      points: airportWhyBook("Ahmedabad"),
    },
    notForYou: [
      "You only need a local Ahmedabad city ride; this is a transfer to the temple towns.",
      "You want a self-drive rental. Every transfer includes a driver.",
      "You want the long drive booked as a route, which is covered on the Ahmedabad to Somnath and Ahmedabad to Dwarka pages.",
    ],
    beforeYouFly: airportBeforeYouFly(
      "Tell us whether you are heading to Somnath or Dwarka; the long legs are usually booked as a full route.",
    ),
    faq: [
      airportFareFaq("Ahmedabad"),
      {
        question: "Can I book an airport taxi from Ahmedabad to Somnath?",
        answer: "Yes. For the long drive it is usually booked as a route; see the Ahmedabad to Somnath taxi page.",
      },
      ...airportCommonFaq("Ahmedabad"),
    ],
    keepPlanning: {
      intro:
        "See all transfers and routes on the taxi service hub. Book the long leg as a route, compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Ahmedabad to Somnath taxi", href: p("ahmedabad-to-somnath-taxi") },
        { label: "Ahmedabad to Dwarka taxi", href: p("ahmedabad-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        ...FLEET_LINKS,
      ],
    },
    cta: airportCta("Ahmedabad"),
  },

  porbandar: {
    titleTag: "Porbandar Airport Taxi | Transfer Cabs",
    metaDescription:
      "Book a Porbandar airport taxi for Dwarka and Somnath transfers. Comfortable cabs, a choice of vehicles, and simple booking.",
    h1: "Porbandar Airport Taxi",
    crumbLabel: "Porbandar",
    quickAnswer:
      "A Porbandar airport taxi transfers you about 100 km to Dwarka in roughly 2 hours, with Somnath a similar drive the other way. Experience My India runs meet-and-greet pickups from Porbandar airport, with your driver tracking the flight, in a choice of vehicles and a fare confirmed before you book. The drivers speak English, Gujarati, Telugu and Kannada.",
    intro:
      "Experience My India runs private meet-and-greet transfers from Porbandar airport, set on the coast between the two temple towns. Your driver waits at arrivals and takes you on to Dwarka or Somnath, and the fare is confirmed before you travel.",
    atAGlance: [
      { label: "Airport", value: "Porbandar Airport (PBD)" },
      { label: "Transfers to", value: "Dwarka and Somnath" },
      { label: "Distance and time", value: "About 100 km to Dwarka, 2 hours" },
      { label: "Vehicles", value: "Sedan, Ertiga, Innova Crysta and Tempo Traveller" },
      { label: "Meet and greet", value: "Yes, your driver waits at arrivals and tracks the flight" },
      { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
    ],
    transfers: {
      heading: "Transfers to Dwarka and Somnath",
      body: "Porbandar airport sits on the coast between the temple towns, about 100 km and 2 hours to Dwarka, with Somnath a similar drive the other way. It is a handy arrival point for either side of the circuit.",
    },
    whyBook: {
      heading: "Why book your Porbandar airport taxi with Experience My India",
      points: airportWhyBook("Porbandar"),
    },
    notForYou: [
      "You only need a local Porbandar city ride; this is a transfer to the temple towns.",
      "You want a self-drive rental. Every transfer includes a driver.",
      "You want the full multi-day circuit, which is planned on the taxi hub.",
    ],
    beforeYouFly: airportBeforeYouFly(
      "Tell us which side of the circuit you are starting on and we plan the transfer around it.",
    ),
    faq: [
      airportFareFaq("Porbandar"),
      {
        question: "How far is Porbandar airport from Dwarka?",
        answer: "About 100 km, a 2 hour drive. Somnath is a similar drive the other way.",
      },
      ...airportCommonFaq("Porbandar"),
    ],
    keepPlanning: {
      intro:
        "See all transfers and routes on the taxi service hub. Compare cars, or see prices on the fare rate card.",
      links: [
        { label: "Somnath Dwarka taxi service hub", href: TAXI_HUB_PATH },
        { label: "Somnath to Dwarka taxi", href: p("somnath-to-dwarka-taxi") },
        { label: "Fare rate card", href: p("fare-rate-card") },
        ...FLEET_LINKS,
      ],
    },
    cta: airportCta("Porbandar"),
  },
};

export const airportCopyFor = (slug: string): AirportCopy | null => AIRPORT_COPY[slug] ?? null;
