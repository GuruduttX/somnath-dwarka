import type { PageDef } from "@/src/lib/pages/types";

/*
  /reviews/: the review cards (the site_reviews dataset, src/lib/cms-groups/
  catalog.ts, defaults VERIFIED_REVIEWS below) and the page copy (page id
  "reviews", which also holds the heading of the testimonials band on guide
  pages). Only real reviews from real guests, supplied by the site owner, may
  ever be added: never invent, embellish or "improve" a review.
*/

export type GuestReview = {
  slug: string;
  name: string;
  location: string;
  trip: string;
  date: string;
  text: string;
};

export const VERIFIED_REVIEWS: GuestReview[] = [
  {
    slug: "rajesh-sunita-sharma",
    name: "Rajesh & Sunita Sharma",
    location: "New Delhi",
    trip: "4 Days / 3 Nights Somnath Dwarka Tour from Ahmedabad",
    date: "November 2025",
    text: "We booked the 4-day private package for our parents' 50th wedding anniversary. Our driver, Ramesh Bhai, was punctual, courteous, and extremely helpful with our elderly parents at the Dwarkadhish temple gates. The hotel in Somnath had a direct view of the sea, and we attended both the evening aarti and light & sound show effortlessly. Highly recommend for family yatras!",
  },
  {
    slug: "dr-k-v-ramanathan",
    name: "Dr. K. V. Ramanathan",
    location: "Chennai",
    trip: "5 Days Gujarat Jyotirlinga Circuit (Dwarka, Nageshwar, Somnath & Gir)",
    date: "January 2026",
    text: "Flawless coordination from airport pickup at Rajkot to drop-off at Diu. The Innova Crysta was spotless, and the driver possessed thorough knowledge of temple darshan timings, avoiding long wait queues at Nageshwar and Bet Dwarka. The pure vegetarian Kathiyawadi food recommendations on the highway were extraordinary.",
  },
  {
    slug: "mehul-neha-patel",
    name: "Mehul & Neha Patel",
    location: "Mumbai",
    trip: "3 Days / 2 Nights Express Weekend Package from Rajkot",
    date: "December 2025",
    text: "Given our tight 3-day work leave, we needed a well-optimized itinerary. The team scheduled our morning arrival at Rajkot, smooth drive to Dwarka, and early morning Darshan before heading to Somnath via Porbandar. No hidden costs, toll taxes and driver allowances were completely included as promised.",
  },
  {
    slug: "pooja-amit-kulkarni",
    name: "Pooja & Amit Kulkarni",
    location: "Pune",
    trip: "6 Days Saurashtra Complete Circuit with Sasan Gir & Diu",
    date: "February 2026",
    text: "Taking a trip with a toddler and grandparents can be stressful, but the team made it seamless. The vehicle was spacious, hotels were within walking distance of Dwarkadhish and Somnath temples, and the Gir safari slot was booked well in advance. Excellent ground support on WhatsApp throughout.",
  },
  {
    slug: "anand-swaminathan",
    name: "Anand Swaminathan",
    location: "Bengaluru",
    trip: "Dwarka–Somnath Cab Service from Jamnagar",
    date: "October 2025",
    text: "We opted for only the cab service package. The driver was calm, never rushed us at any temple stop, and guided us safely through the new Sudarshan Setu bridge to Bet Dwarka. Transparent billing and very professional team.",
  },
];

export const REVIEWS_PAGE_DEFAULTS = {
  meta: {
    title: "Traveller Reviews & Pilgrimage Experiences — Somnath Dwarka Tour Package",
    description:
      "Read genuine reviews and testimonials from families, senior citizens, and pilgrims who travelled on our Somnath, Dwarka, Gir, and Gujarat tour packages.",
  },
  h1: "Pilgrim Reviews & Testimonials",
  answerFirst:
    "Authentic feedback from real yatris is the cornerstone of our service. We host hundreds of families, senior citizens, and devotee groups every year across the Somnath–Dwarka circuit. Read genuine, unfiltered experiences shared by travellers who experienced our cab services, hotel arrangements, and pilgrimage coordination.",
  badges: [
    { title: "100% Verified Yatris", text: "Feedback matched to confirmed bookings" },
    { title: "Senior Citizen Friendly", text: "Special attention for elderly pilgrims" },
    { title: "Zero Hidden Costs", text: "All-inclusive transparent pricing" },
  ],
  reviewsTitle: "Experiences from Recent Pilgrimages",
  faqHeading: "Reviews & Feedback FAQs",
  faqs: [
    {
      question: "How do you verify the authenticity of published reviews?",
      answer:
        "Every testimonial published on our website is collected directly from verified guests who booked and completed a tour package or cab service with us. We cross-verify each feedback entry against our internal booking reference numbers before publishing.",
    },
    {
      question: "Can I speak to previous travellers before booking my tour?",
      answer:
        "Due to privacy compliance under the DPDP Act, we do not share private contact numbers of past guests. However, you can review our verified testimonials, Google business reviews, and detailed itinerary breakdowns to assess our service quality.",
    },
    {
      question: "How can I submit my own feedback after completing my trip?",
      answer:
        "Upon completion of your pilgrimage, your assigned Trip Coordinator will share a direct feedback link via WhatsApp or email. You can also email your experience directly to feedback@somnathdwarkatourpackage.com.",
    },
  ],
  ctaContext: "Somnath Dwarka pilgrimage enquiry",
  schema: {
    name: "Reviews & Testimonials — Somnath Dwarka Tour Package",
    description: "Genuine traveller reviews and feedback for our Somnath, Dwarka, and Gujarat pilgrimage tour packages.",
  },
  /** Heading of the testimonials band at the foot of every guide page (components/guides/GuideTestimonials.tsx). */
  guideSection: {
    badge: "Testimonials",
    heading: "What travellers say",
    subheading: "Real journeys planned by our team across the Somnath–Dwarka circuit.",
    readMore: "Read more traveller reviews",
  },
};

export const REVIEWS_PAGE: PageDef<typeof REVIEWS_PAGE_DEFAULTS> = {
  id: "reviews",
  title: "Reviews page",
  group: "Reviews",
  path: "/reviews/",
  alsoRevalidate: ["/guides/[slug]"],
  notes:
    "The /reviews/ page copy; the review cards are the site_reviews items. meta {title, description}; h1; answerFirst; badges[3 {title, text}] " +
    "(icons fixed by position); reviewsTitle (heading over the cards); faqHeading; faqs[{question, answer}] (also FAQPage schema); ctaContext; " +
    "schema {name, description}. guideSection {badge, heading, subheading, readMore (the link to /reviews/)} is the heading block of the testimonials band on every guide page (it keeps " +
    "showing there even if this page is hidden). Claims such as '100% Verified Yatris' must stay true: change them only on the owner's word. Plain text.",
  defaults: REVIEWS_PAGE_DEFAULTS,
};
