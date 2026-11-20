import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of /contact/, editable through the CMS (the Claude connector's "page"
  type, id "contact"). The phone number, WhatsApp link and email on the
  cards come from CONTACT in src/config/site.ts, so they always match the
  Navbar and footer; only the words around them live here.
*/

export const CONTACT_PAGE_DEFAULTS = {
  meta: {
    title: "Contact Us — Somnath & Dwarka Tour Planning & Cab Desk",
    description:
      "Connect with our Saurashtra pilgrimage specialists. Instant WhatsApp consultation, phone support, and 24/7 on-trip yatra assistance across Gujarat.",
  },
  h1: "Contact Our Pilgrimage Planning Desk",
  answerFirst:
    "Planning a sacred journey to Somnath Jyotirlinga and Dwarkadhish Temple requires local precision. Connect with our Saurashtra travel coordinators via WhatsApp, phone, email, or the enquiry form below. We provide transparent pricing, vetted hotels near temple gates, and dedicated AC cabs with seasoned local chauffeurs.",
  callCard: { label: "Call Directly", note: "Available 8 AM – 10 PM IST" },
  whatsappCard: {
    label: "Instant WhatsApp",
    note: "Fastest response time (~15 mins)",
    message: "Hi, I would like to plan a Somnath–Dwarka tour package.",
  },
  emailCard: { label: "Official Email", note: "Detailed proposals & vouchers" },
  enquiry: {
    heading: "Request a Tailored Yatra Itinerary & Quotation",
    formTitle: "Share Your Travel Details",
    formText:
      "Tell us your preferred arrival date, number of travellers, starting location, and special requests. Our destination specialists will craft a customized itinerary suited to your family.",
  },
  timingsTitle: "Operating Timings",
  timings: [
    { label: "Planning & Sales Desk:", value: "Monday to Sunday: 8:00 AM – 10:00 PM (IST)" },
    { label: "24/7 On-Trip Support:", value: "Round-the-clock emergency assistance for travelling guests." },
  ],
  networkTitle: "Regional Support Network",
  networkIntro:
    "Our local chauffeurs, airport pickup coordinators, and ground managers operate across key Saurashtra hub points:",
  network: [
    { place: "Ahmedabad:", detail: "Airport & Kalupur Station desk" },
    { place: "Rajkot:", detail: "Hirasar Airport & Junction pickups" },
    { place: "Dwarka:", detail: "Temple promenade coordination" },
    { place: "Somnath:", detail: "Veraval station & bypass desk" },
  ],
  faqHeading: "Frequently Asked Questions",
  faqs: [
    {
      question: "How quickly will I receive a customized itinerary and quotation after submitting an enquiry?",
      answer:
        "During our standard operating hours (8:00 AM to 10:00 PM IST), our pilgrimage consultants typically respond within 15 to 30 minutes via WhatsApp or phone with a detailed day-wise itinerary and clear price quotation.",
    },
    {
      question: "Can you provide airport/railway station pickup from cities outside Dwarka and Somnath?",
      answer:
        "Yes. We arrange dedicated private cab pickups and drop-offs across all major arrival hubs in Gujarat, including Ahmedabad Airport (AMD), Rajkot Airport (Hirasar), Jamnagar Airport/Station, Porbandar, Diu Airport, and Bhavnagar.",
    },
    {
      question: "What support is available if we encounter any issue during our tour?",
      answer:
        "All confirmed guests are assigned a Dedicated Trip Manager and 24/7 on-trip emergency helpline number. Whether you need an aarti queue update, vehicle assistance, or hotel coordination, our local ground team is on standby throughout your pilgrimage.",
    },
    {
      question: "Can we make changes to our itinerary after contacting you?",
      answer:
        "Yes, all our pilgrimage tour packages are fully customizable. You can add extra days for Sasan Gir Lion Safari, Diu beaches, Junagadh Girnar ropeway, or ancient temples like Madhavpur and Harshad Mata.",
    },
  ],
  schema: {
    name: "Contact Us — Somnath Dwarka Tour Package",
    description: "Get in touch to plan your Somnath–Dwarka pilgrimage trip by phone, WhatsApp, or online enquiry form.",
  },
};

export const CONTACT_PAGE: PageDef<typeof CONTACT_PAGE_DEFAULTS> = {
  id: "contact",
  title: "Contact page",
  group: "Company pages",
  path: "/contact/",
  notes:
    "h1 and answerFirst open the page; callCard, whatsappCard (message = the text WhatsApp opens with) and emailCard are the three " +
    "contact cards (the number and email themselves come from the site config); enquiry is the form block; timings and network " +
    "are the two side boxes; faqs[{question, answer}] also feed the FAQPage schema; schema {name, description} is the ContactPage JSON-LD. Plain text.",
  defaults: CONTACT_PAGE_DEFAULTS,
};
