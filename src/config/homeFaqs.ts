/**
 * Home FAQ (home SOP §16). Single source for the visible FAQ block and the
 * FAQPage JSON-LD, so the two can never drift apart. Prices are read from the
 * tier table so an edit there updates the answer too.
 */
import { CONTACT } from "@/src/config/site";
import { HOME_OPERATOR, HOME_TIERS, inr } from "@/src/config/homePage";

const [standard, deluxe, premium] = HOME_TIERS;

export const HOME_FAQS = [
  {
    question: "What is the price of a Somnath Dwarka tour package and what does it cover?",
    answer: `Our Somnath Dwarka tour package starts from Rs ${inr(standard.price)} per person on twin-sharing for the 2 nights and 3 days route with budget-friendly 3 star hotels. Deluxe 4 star packages start around Rs ${inr(deluxe.price)} and premium 4 and 5 star packages around Rs ${inr(premium.price)}. Every price covers named hotels, daily breakfast, a private air-conditioned car with driver, fuel, tolls and parking, sightseeing per the itinerary, and darshan coordination. Train or air fare, most meals, temple special entry and GST are extra and are always shown to you up front.`,
  },
  {
    question: "How many days do you need for Dwarka and Somnath?",
    answer:
      "Two nights and three days is the sensible minimum, giving one night in Dwarka and one in Somnath with unhurried darshan at both. If you want to add Bet Dwarka at a relaxed pace, Porbandar, or a Gir safari, three nights and four days or more suits better. We would rather you take the right number of days than rush two great temple towns into one.",
  },
  {
    question: "What is the distance between Dwarka and Somnath and how long is the drive?",
    answer:
      "The road distance between Dwarka and Somnath is about 233 km along National Highway 51, and the drive takes close to 5 hours in normal traffic, a little more with stops. The route hugs the coast through Porbandar and Veraval, so the journey itself is pleasant. There is no quick direct train, which is why a private car is the practical way to link the two.",
  },
  {
    question: "Which is the best time to visit Dwarka and Somnath?",
    answer:
      "October to March is the most comfortable season, with daytime temperatures around 15 to 30 degrees Celsius. The monsoon from June to September can affect road travel, and April to June is hot. Festival periods are special but crowded, so if you plan to travel then, book your hotels and darshan slots well in advance.",
  },
  {
    question: "How do we reach Dwarka and Somnath by air or train?",
    answer:
      "For Dwarka, the nearest airports are Jamnagar and Porbandar, both roughly 130 km away, and Dwarka has its own railway station. For Somnath, Diu airport is about 90 km away and Rajkot serves wider flight connections, while Veraval, about 6 to 7 km from the temple, is the nearest railway station. We arrange pick up from whichever point you arrive at.",
  },
  {
    question: "Can we start the tour from Ahmedabad, Rajkot or Jamnagar?",
    answer:
      "Yes. The package can begin from Ahmedabad, Rajkot, Jamnagar or directly from Dwarka, and it can be reversed to start at Somnath. From Ahmedabad it is about a 440 km drive to Dwarka, so that version usually adds a day. From Rajkot it is around 225 km. Tell us your starting city and we build the plan around it.",
  },
  {
    question: "Which hotels are included, and can we choose the category?",
    answer:
      "You choose the comfort level. Our 4 and 5 star options include Hawthorn Suites by Wyndham, The Fern Sattva Resort and Lemon Tree Premier in Dwarka, and The Fern Residency, Lords Inn and Lemon Tree Resort in Somnath. We also arrange clean, budget-friendly 3 star hotels on request. We name the actual hotel in each city before you pay, never just a star claim, and confirm it in writing before the balance.",
  },
  {
    question: "Is the vehicle private to our family or shared?",
    answer:
      "The car is private to your group alone, with a local driver, for the whole tour. It is not a shared seat or a coach with strangers. The vehicle size is matched to your group, and fuel, tolls, parking and driver allowance are already included in the price.",
  },
  {
    question: "Do you help with temple darshan and aarti timings?",
    answer:
      "Yes, and this is where a local operator earns its place. We guide you on the best darshan windows at Dwarkadhish and Somnath, when the aarti and the Somnath sound and light show run, and how to time Bet Dwarka around the ferry. Special or VIP darshan, where it exists, can be arranged at the applicable fee.",
  },
  {
    question: "Is this tour comfortable for senior citizens and children?",
    answer:
      "It is planned to be. We keep walking distances manageable, pick hotels with easy access near the temples, and avoid placing two long driving days one after another. For families with young children we build in meal and rest breaks so the darshan days stay calm rather than rushed.",
  },
  {
    question: "Can we add Bet Dwarka, Nageshwar, Porbandar or Gir to the package?",
    answer:
      "Yes. Bet Dwarka and Nageshwar Jyotirlinga are already part of the Dwarka day, and Porbandar sits naturally on the drive to Somnath. A Gir safari, Diu, or the Statue of Unity can be added as an extension, which usually means one or two extra days. We will tell you honestly what each addition does to the pace.",
  },
  {
    question: "How do we book and how much deposit is required?",
    answer: `Booking is simple: message us your dates and group on WhatsApp at ${CONTACT.phoneDisplay}, we send a day-wise plan with the price, and once you approve it a deposit of 25 percent confirms your booking, with the balance due before you travel. Your hotel names are confirmed in writing before the balance is paid.`,
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Our cancellation terms are shared in writing before you pay, in plain language. Cancellations made well before your travel date are refunded, less any hotel or transport booking already made non-refundable on your behalf. If we ever fail to deliver a hotel from your named list, your deposit is refunded in full. We would rather be clear about this up front than surprise you later.",
  },
  {
    question: "Can the itinerary be customized for our group?",
    answer: `Completely. The route, the pace, the hotel category, the starting city and the add ons are all yours to shape. Whether you want a slow pilgrimage focused on darshan or a fuller Saurashtra circuit with ${HOME_OPERATOR}, tell us your priorities and we tailor the plan to your group rather than fitting you into a fixed slot.`,
  },
];
