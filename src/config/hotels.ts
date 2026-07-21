/**
 * Static page copy for the hotels hub and its two city pages, from their SOPs.
 *
 * Split, as briefed: prose here, data in the CMS. The named hotels — their tier,
 * area and what they are known for — live on the `hotels` documents as
 * `properties` and are edited under Content → Hotels. Everything below is the
 * argument around them.
 *
 * Note on slugs: the SOPs specify /hotels/somnath/ and /hotels/dwarka/, but the
 * live URLs are /hotels/hotels-in-somnath/ and /hotels/hotels-in-dwarka/, which
 * are the ones in url-map-v5.json. The copy is applied to the existing URLs
 * rather than minting new ones, to avoid two pages competing for one keyword.
 */
import { OPERATOR } from "@/src/config/taxiSpokes";

const stayIncludes = (city: string) => ({
  heading: "What arranging your stay includes",
  handledTitle: "What we handle",
  handled: [
    `A ${city} matched to your budget and group, close to the temple`,
    "A vetted room, confirmed with you ahead of payment",
    "Stay timed around aarti and your darshan plan",
    "The option to bundle the cab and the itinerary",
    `Support in ${OPERATOR.languagesProse}`,
  ],
  tellUsTitle: "What to tell us",
  tellUs: [
    "Your dates, the number of guests and rooms, and your budget",
    "Any senior-friendly needs, such as a lift or a ground-floor room",
    "Meal preference, for example pure vegetarian or prasad-style",
    "Whether you want the cab and the tour arranged too",
  ],
});

/** The why-book block, identical across all three pages bar the temple named. */
const whyBook = (heading: string, vettedLine: string) => ({
  heading,
  points: [
    `The local Gujarat unit of ${OPERATOR.parent}, ${OPERATOR.parentSlogan}, running Saurashtra yatras since ${OPERATOR.foundingDate}.`,
    vettedLine,
    "Stays bundle with a private cab and a package, so one team handles the room, the driving and the plan.",
    "A 4.5 star rating on Tripadvisor, across more than 2,400 completed trips.",
    `A multilingual team, ${OPERATOR.languagesProse}, so pilgrims from the south are looked after.`,
    `A GST registered business, GSTIN ${OPERATOR.gstin}, with clear booking and cancellation terms.`,
  ],
  author: "Stays are arranged by the team led by Harsh Sharma.",
});

const BUNDLE = {
  heading: "Stay, cab and tour on one booking",
  links: [
    { label: "Somnath Dwarka taxi service", href: "/somnath-dwarka-taxi-service/" },
    { label: "tour package", href: "/somnath-dwarka-tour-package/" },
  ],
};

const LANGUAGES_FAQ = {
  question: "Which languages does your team speak?",
  answer: OPERATOR.languagesProse + ".",
};

export type HotelPageCopy = {
  titleTag: string;
  metaDescription: string;
  h1: string;
  quickAnswer: string;
  intro: string;
  atAGlance: { label: string; value: string }[];
  /**
   * Optional. The hub omits it: its "Browse hotels by area" block only pointed
   * at the two city pages, which the city cards above already do, so it rendered
   * as a near-empty box beside the much longer budget list.
   */
  whereToStay?: { heading: string; body: string };
  chooseByBudget: { heading: string; intro?: string; items: string[] };
  arriveAndStay?: { heading: string; body: string };
  bundle: { heading: string; body: string };
  stayIncludes: ReturnType<typeof stayIncludes>;
  whyBook: ReturnType<typeof whyBook>;
  notForYou: { heading: string; items: string[] };
  beforeYouBook: { heading: string; items: string[] };
  faq: { question: string; answer: string }[];
  keepPlanning: { intro: string; links: { label: string; href: string }[] };
  cta: { heading: string; body: string };
  /** Shown under the hotel table. */
  propertiesNote: string;
};

export const HOTELS_HUB: HotelPageCopy = {
  titleTag: "Hotels in Somnath and Dwarka | Near the Temples",
  metaDescription:
    "Book vetted hotels in Somnath and Dwarka, close to the temples, budget to luxury, arranged with your cab and yatra by Experience My India.",
  h1: "Hotels in Somnath and Dwarka",
  quickAnswer:
    "Experience My India arranges vetted hotels in Somnath and Dwarka, close to the temples and chosen around aarti timings, from dharamshalas and budget guesthouses to sea-facing and premium stays. We personally vet every hotel we book, and most travellers bundle the stay with a private cab and a package. Rooms are confirmed before you pay, and the team speaks English, Gujarati, Telugu and Kannada.",
  intro:
    "Experience My India books your stay for the Somnath and Dwarka yatra, so you arrive to a room that is clean, close to the temple and ready. As the local Gujarat unit operating since 2018, the team personally vets every hotel it books and shapes the stay around aarti timings, then ties it to your cab and itinerary.",
  atAGlance: [
    { label: "Where", value: "Near the Somnath Jyotirlinga and the Dwarkadhish temple" },
    { label: "Range", value: "Dharamshalas and budget guesthouses to sea-facing and premium hotels" },
    { label: "Vetted", value: "Every hotel personally vetted, not just listed" },
    { label: "Meals", value: "Pure vegetarian options, some prasad-style" },
    { label: "Bundled", value: "Book with your cab and tour package on one booking" },
    { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
  ],
  chooseByBudget: {
    heading: "Choose by budget",
    intro:
      "Both towns cover every budget. We match the stay to what you want, from a simple room near the temple to a premium hotel by the sea.",
    items: [
      "Dharamshalas and guesthouses — simple, clean rooms within walking distance of the temple, often pure vegetarian. Best for pilgrims wanting a basic, temple-close stay.",
      "Mid-range hotels — air-conditioned rooms, a restaurant, family rooms and lifts. Best for families and groups wanting comfort near the temple.",
      "Sea-facing and premium hotels — larger rooms, sea views, gardens or a pool, fuller dining. Best for travellers wanting a relaxed, comfortable base.",
    ],
  },
  bundle: {
    heading: BUNDLE.heading,
    body: "Most travellers let one team handle the whole yatra. We book the hotel near the temple, arrange the drive, and can wrap both into a tour package built around aarti timings. It means one point of contact for the room, the driver and the plan, in a language you speak.",
  },
  stayIncludes: stayIncludes("hotel"),
  whyBook: whyBook(
    "Why book your Somnath Dwarka stay with Experience My India",
    "Every hotel is personally vetted, close to the temples and chosen around aarti timings.",
  ),
  notForYou: {
    heading: "This may not be the right fit if",
    items: [
      "You want the single lowest online room rate with no arranging or support; an online travel agent may suit you better.",
      "You want a beach resort far from the temples; we prioritise stays near the Jyotirlinga and the Dwarkadhish temple.",
      "You want only a room with no darshan plan; our hotels are chosen around the yatra.",
    ],
  },
  beforeYouBook: {
    heading: "Before you book",
    items: [
      "Rooms near the temples fill fast in peak season and around Maha Shivratri at Somnath and Janmashtami at Dwarka, so book early.",
      "Tell us your budget, group size and any senior-friendly needs, and we match the hotel.",
      "Say if you want pure vegetarian or prasad-style meals, which are common near the temples.",
    ],
  },
  faq: [
    {
      question: "Which hotels do you book in Somnath and Dwarka?",
      answer:
        "Vetted hotels close to the temples, from simple guesthouses to sea-facing and premium stays. In Somnath these include options like The Fern Residency and Lords Inn; in Dwarka, hotels near the Dwarkadhish temple such as Hawthorn Suites and Dwarkadhish Lords Eco Inn. We match the stay to your budget.",
    },
    {
      question: "Are the hotels close to the temples?",
      answer:
        "Yes. We prioritise stays within easy reach of the Somnath Jyotirlinga and the Dwarkadhish temple, chosen around aarti timings.",
    },
    {
      question: "Do you have budget stays and dharamshalas?",
      answer:
        "Yes. Both towns have dharamshalas, guesthouses and budget hotels near the temples, alongside mid-range and premium options.",
    },
    {
      question: "Can I book a hotel with the cab and the tour together?",
      answer:
        "Yes. Most travellers bundle the stay with a private cab and a package, so one team handles the hotel, the driving and the itinerary.",
    },
    {
      question: "Do the hotels serve vegetarian food?",
      answer: "Many are pure vegetarian and some serve prasad-style meals. Tell us your preference and we match it.",
    },
    LANGUAGES_FAQ,
  ],
  keepPlanning: {
    intro:
      "Plan the trip around your stay. Arrange the drive, bundle a tour package, or read the temple guides for timings.",
    links: [
      { label: "Somnath Dwarka taxi service", href: "/somnath-dwarka-taxi-service/" },
      { label: "Somnath Dwarka tour packages", href: "/somnath-dwarka-tour-package/" },
      { label: "Somnath to Dwarka taxi", href: "/somnath-dwarka-taxi-service/somnath-to-dwarka-taxi/" },
    ],
  },
  cta: {
    heading: "Book your stay",
    body: `Tell us your dates, budget and group size, and we confirm a vetted hotel near the temple before you pay. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
  },
  propertiesNote:
    "These are examples of the vetted stays we book. Share your budget and we match one. No room rates are fixed here, since they change with the season and the hotel.",
};

export const HOTELS_SOMNATH: HotelPageCopy = {
  titleTag: "Hotels in Somnath | Stays Near the Temple",
  metaDescription:
    "Book vetted hotels in Somnath near the Jyotirlinga, budget to sea-facing, arranged with your cab and yatra by Experience My India.",
  h1: "Hotels in Somnath",
  quickAnswer:
    "Experience My India books vetted hotels in Somnath, close to the Jyotirlinga in Prabhas Patan, with sea-facing options along the coast. Stays run from dharamshalas and budget guesthouses to mid-range and premium hotels, chosen around aarti timings and confirmed before you pay. Most travellers bundle the room with a private cab, and the team speaks English, Gujarati, Telugu and Kannada.",
  intro:
    "Experience My India arranges your Somnath stay near the Jyotirlinga, so you can walk to darshan and the evening aarti. As the local Gujarat unit since 2018, the team personally vets each hotel and matches it to your budget, then ties the room to your cab and itinerary.",
  atAGlance: [
    { label: "Where", value: "Prabhas Patan near the temple, the sea-facing coast, and Veraval" },
    { label: "Nearest temple", value: "Somnath Jyotirlinga, walking distance from Prabhas Patan" },
    { label: "Range", value: "Dharamshalas and guesthouses to mid-range and premium hotels" },
    { label: "Meals", value: "Pure vegetarian options, some prasad-style" },
    { label: "Bundled", value: "Book with your cab and tour package on one booking" },
    { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
  ],
  whereToStay: {
    heading: "Where to stay in Somnath",
    body: "Most pilgrims stay in Prabhas Patan, within walking distance of the Somnath temple, with sea-facing hotels along the coast and more budget choice a little further out at Veraval. Many stays are pure vegetarian and some serve prasad-style meals.",
  },
  chooseByBudget: {
    heading: "Choose by budget",
    items: [
      "Dharamshalas, trust hotels and guesthouses sit closest to the Jyotirlinga, simple and often pure vegetarian, ideal for a temple-first stay.",
      "Mid-range hotels near the temple add air-conditioned rooms, a restaurant, family rooms and lifts for senior citizens.",
      "Sea-facing and premium hotels along the Prabhas Patan coast offer larger rooms and fuller dining, a short drive from the temple.",
    ],
  },
  arriveAndStay: {
    heading: "Arrive and stay",
    body: "Flying in? The nearest airports to Somnath are Diu and Rajkot, and we run transfers straight to your hotel. Driving the circuit? Price the Somnath to Dwarka taxi or the short Veraval to Somnath taxi.",
  },
  bundle: {
    heading: BUNDLE.heading,
    body: "Let one team handle the yatra. We book your Somnath hotel near the temple, arrange the drive, and can wrap both into a tour package built around aarti timings, in a language you speak.",
  },
  stayIncludes: stayIncludes("Somnath hotel"),
  whyBook: whyBook(
    "Why book your Somnath stay with Experience My India",
    "Every hotel is personally vetted, close to the Somnath Jyotirlinga and chosen around aarti timings.",
  ),
  notForYou: {
    heading: "This may not be the right fit if",
    items: [
      "You want the single lowest online room rate with no arranging or support; an online travel agent may suit you better.",
      "You want a resort far from the temple; here we prioritise stays near the Jyotirlinga.",
      "You are staying in Dwarka, not Somnath, which is covered on the Dwarka hotels page.",
    ],
  },
  beforeYouBook: {
    heading: "Before you book",
    items: [
      "Rooms near the temple fill fast in peak season and around Maha Shivratri, so book early.",
      "Tell us your budget, group size and any senior-friendly needs, and we match the hotel.",
      "Say if you want pure vegetarian or prasad-style meals, common in Prabhas Patan.",
    ],
  },
  faq: [
    {
      question: "Which hotels are near the Somnath temple?",
      answer:
        "Vetted 4-star hotels within easy reach of the Jyotirlinga include The Fern Residency, Lords Inn Somnath, Sarovar Portico, Regenta Central and Lemon Tree Resort, alongside mid-range hotels, trust stays and dharamshalas. We match one to your budget.",
    },
    {
      question: "Is there a 5-star hotel in Somnath?",
      answer:
        "No international 5-star operates in Somnath, since it is a pilgrimage town. The top tier is 4-star, such as The Fern Residency and Sarovar Portico, which we book for a premium stay.",
    },
    {
      question: "Are there budget stays and dharamshalas in Somnath?",
      answer: "Yes. Trust hotels, dharamshalas and guesthouses sit close to the temple, alongside mid-range and premium options.",
    },
    {
      question: "Do Somnath hotels serve vegetarian food?",
      answer: "Many are pure vegetarian and some serve prasad-style meals. Tell us your preference and we match it.",
    },
    {
      question: "Can I book a Somnath hotel with an airport cab?",
      answer: "Yes. We arrange the transfer from Diu or Rajkot airport and the stay together, on one booking.",
    },
    {
      question: "When should I book a Somnath hotel?",
      answer: "Book early for peak season and especially around Maha Shivratri, when rooms near the temple fill fast.",
    },
    LANGUAGES_FAQ,
  ],
  keepPlanning: {
    intro:
      "Back to all stays on the hotels hub, or see Dwarka hotels for the other side of the circuit. Arrange the drive, bundle a tour package, or read the Somnath guide.",
    links: [
      { label: "All hotels", href: "/hotels/" },
      { label: "Dwarka hotels", href: "/hotels/hotels-in-dwarka/" },
      { label: "Somnath Dwarka taxi service", href: "/somnath-dwarka-taxi-service/" },
      { label: "Diu airport taxi", href: "/somnath-dwarka-taxi-service/airport-taxi/diu/" },
    ],
  },
  cta: {
    heading: "Book your Somnath stay",
    body: `Tell us your dates, budget and group size, and we confirm a vetted hotel near the temple before you pay. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
  },
  propertiesNote:
    "Somnath is a pilgrimage town, so its top tier is 4-star, with no international 5-star here. We also book mid-range hotels, trust stays and dharamshalas near the Jyotirlinga. Share your budget and dates and we confirm a room before you pay.",
};

export const HOTELS_DWARKA: HotelPageCopy = {
  titleTag: "Hotels in Dwarka | Stays Near the Temple",
  metaDescription:
    "Book vetted hotels in Dwarka near the Dwarkadhish temple, budget to premium, arranged with your cab and yatra by Experience My India.",
  h1: "Hotels in Dwarka",
  quickAnswer:
    "Experience My India books vetted hotels in Dwarka, close to the Dwarkadhish temple and Gomti ghat, so the morning aarti is a short walk away. Stays run from dharamshalas and budget guesthouses to mid-range and premium hotels, chosen around aarti timings and confirmed before you pay. Most travellers bundle the room with a private cab, and the team speaks English, Gujarati, Telugu and Kannada.",
  intro:
    "Experience My India arranges your Dwarka stay near the Dwarkadhish temple, one of the char dham, so you can reach the aarti on foot. As the local Gujarat unit since 2018, the team personally vets each hotel and matches it to your budget, then ties the room to your cab and itinerary.",
  atAGlance: [
    { label: "Where", value: "Near the Dwarkadhish temple and Gomti ghat" },
    { label: "Nearest temple", value: "Dwarkadhish temple, near Gomti ghat" },
    { label: "Range", value: "Dharamshalas and guesthouses to mid-range and premium hotels" },
    { label: "Meals", value: "Pure vegetarian options, some prasad-style" },
    { label: "Bundled", value: "Book with your cab and tour package on one booking" },
    { label: "Book", value: `Call or WhatsApp ${OPERATOR.phone}` },
  ],
  whereToStay: {
    heading: "Where to stay in Dwarka",
    body: "In Dwarka, staying near the Dwarkadhish temple and Gomti ghat keeps the morning aarti and the ghats within walking distance, with quieter guesthouses a little back from the centre. Many stays are pure vegetarian.",
  },
  chooseByBudget: {
    heading: "Choose by budget",
    items: [
      "Guesthouses, dharamshalas and lodges near Gomti ghat sit closest to the temple, simple and handy for the morning aarti.",
      "Mid-range hotels near the temple add air-conditioned rooms, a restaurant and family rooms.",
      "Premium hotels offer larger rooms and fuller dining, a short ride from the temple and the ghats.",
    ],
  },
  arriveAndStay: {
    heading: "Arrive and stay",
    body: "Flying in? The nearest airports to Dwarka are Jamnagar and Porbandar, and we run transfers to your hotel. Driving the circuit? Price the Rajkot to Dwarka taxi, the Jamnagar to Dwarka taxi or the Somnath to Dwarka taxi.",
  },
  bundle: {
    heading: BUNDLE.heading,
    body: "Let one team handle the yatra. We book your Dwarka hotel near the temple, arrange the drive, and can wrap both into a tour package built around aarti timings, in a language you speak.",
  },
  stayIncludes: stayIncludes("Dwarka hotel"),
  whyBook: whyBook(
    "Why book your Dwarka stay with Experience My India",
    "Every hotel is personally vetted, close to the Dwarkadhish temple and chosen around aarti timings.",
  ),
  notForYou: {
    heading: "This may not be the right fit if",
    items: [
      "You want the single lowest online room rate with no arranging or support; an online travel agent may suit you better.",
      "You want a resort far from the temple; here we prioritise stays near the Dwarkadhish temple and Gomti ghat.",
      "You are staying in Somnath, not Dwarka, which is covered on the Somnath hotels page.",
    ],
  },
  beforeYouBook: {
    heading: "Before you book",
    items: [
      "Rooms near the temple fill fast in peak season and around Janmashtami, so book early.",
      "Tell us your budget, group size and any senior-friendly needs, and we match the hotel.",
      "If you plan Bet Dwarka, keep photo ID handy for the boat and allow time for the crossing.",
    ],
  },
  faq: [
    {
      question: "Which hotels are near the Dwarkadhish temple?",
      answer:
        "The premier option is the Wyndham-branded Hawthorn Suites, with 4-star hotels such as Lemon Tree Premier, VITS Devbhumi, Enrise by Sayaji, Pride Elite and Grand Continent near the temple, plus guesthouses and dharamshalas by Gomti ghat. We match one to your budget.",
    },
    {
      question: "Is there a 5-star hotel in Dwarka?",
      answer:
        "Dwarka has no classified international 5-star, since it is a pilgrimage town. The premier option is the Wyndham-branded Hawthorn Suites, and other quality stays near the temple are 4-star, all of which we book.",
    },
    {
      question: "Are there budget stays and dharamshalas in Dwarka?",
      answer:
        "Yes. Dharamshalas, lodges and guesthouses near Gomti ghat sit close to the temple, alongside mid-range and premium options.",
    },
    { question: "Do Dwarka hotels serve vegetarian food?", answer: "Many are pure vegetarian. Tell us your preference and we match it." },
    {
      question: "Can I book a Dwarka hotel with an airport cab?",
      answer: "Yes. We arrange the transfer from Jamnagar or Porbandar airport and the stay together, on one booking.",
    },
    {
      question: "When should I book a Dwarka hotel?",
      answer: "Book early for peak season and especially around Janmashtami, when rooms near the temple fill fast.",
    },
    LANGUAGES_FAQ,
  ],
  keepPlanning: {
    intro:
      "Back to all stays on the hotels hub, or see Somnath hotels for the other side of the circuit. Arrange the drive, bundle a tour package, or read the Dwarka guide.",
    links: [
      { label: "All hotels", href: "/hotels/" },
      { label: "Somnath hotels", href: "/hotels/hotels-in-somnath/" },
      { label: "Somnath Dwarka taxi service", href: "/somnath-dwarka-taxi-service/" },
      { label: "Jamnagar airport taxi", href: "/somnath-dwarka-taxi-service/airport-taxi/jamnagar/" },
    ],
  },
  cta: {
    heading: "Book your Dwarka stay",
    body: `Tell us your dates, budget and group size, and we confirm a vetted hotel near the temple before you pay. Call or message ${OPERATOR.phone} on WhatsApp for the fastest reply.`,
  },
  propertiesNote:
    "Dwarka's premier option is the Wyndham-branded Hawthorn Suites, with several 4-star hotels near the Dwarkadhish temple. We also book mid-range hotels, guesthouses and dharamshalas near Gomti ghat. Share your budget and dates and we confirm a room before you pay.",
};

/** City-page copy by the live slug (not the SOP slug — see the note above). */
export const HOTEL_CITY_COPY: Record<string, HotelPageCopy> = {
  "hotels-in-somnath": HOTELS_SOMNATH,
  "hotels-in-dwarka": HOTELS_DWARKA,
};

export const hotelCopyFor = (slug: string): HotelPageCopy | null => HOTEL_CITY_COPY[slug] ?? null;
