/*
  Default copy and copy types for the package-hub blocks (the explorer's group
  headings, the YatraBanner inside the explorer and the TourArchiveCTA band).

  A plain module, not "use client": the hub pages' PageDefs (content.ts next to
  each hub route) import these defaults on the server and pass the live copy
  down as props, and the client components fall back to the same constants
  when a caller passes nothing (e.g. the destination hubs), so the server and
  client render always agree.
*/

/** The explorer's groups. Mirrors PackageBucket in src/config/packageSpokes.ts. */
export type ExplorerGroup = "duration" | "city" | "traveller" | "route" | "transport";

export type ExplorerGroupCopy = { title: string; blurb: string };

/** The explorer's default group headings (they describe the Somnath–Dwarka hub). */
export const EXPLORER_GROUP_COPY: Record<ExplorerGroup, ExplorerGroupCopy> = {
  duration: {
    title: "Choose by duration",
    blurb: "From a single-day darshan to a relaxed 6-day circuit.",
  },
  city: {
    title: "Choose by starting city",
    blurb: "Private round trips with pickup and drop from your city.",
  },
  traveller: {
    title: "Choose by traveller & budget",
    blurb: "Plans tuned for families or a lean, budget-friendly circuit.",
  },
  route: {
    title: "Add a destination",
    blurb: "Extend the circuit with Gir, Diu, Porbandar or the Statue of Unity.",
  },
  transport: {
    title: "Choose by transport",
    blurb: "Travel by car, tempo traveller, train or bus.",
  },
};

/** The "Begin Your Sacred Yatra" card shown inside the package explorer. */
export type YatraBannerCopy = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  headingTail: string;
  text: string;
  bookLabel: string;
  callLabel: string;
  stats: { value: string; label: string }[];
  /** Trust chips; the icons (shield, refresh, headset, badge) follow the order. */
  trust: string[];
  callUsLabel: string;
  emailLabel: string;
  brandTagline: string;
};

export const YATRA_BANNER_COPY: YatraBannerCopy = {
  badge: "Limited Seats This Season",
  headingLead: "Begin Your Sacred",
  headingHighlight: "Dwarka & Somnath",
  headingTail: "Yatra",
  text: "Everything arranged, every darshan planned. All you need to carry is your devotion — we handle the rest.",
  bookLabel: "Book Your Yatra",
  callLabel: "Talk to an Expert",
  stats: [
    { value: "4,800+", label: "Happy Yatris" },
    { value: "4.9★", label: "Avg Rating" },
    { value: "12+", label: "Years of Service" },
    { value: "98%", label: "Recommend Us" },
  ],
  trust: ["Secure Booking", "Free Cancellation", "24/7 Support", "Expert Guides"],
  callUsLabel: "Call Us",
  emailLabel: "Email",
  brandTagline: "Sacred Gujarat Tours",
};

/** The orange "Your Perfect Pilgrimage" band near the foot of each package hub. */
export type TourArchiveCtaCopy = {
  badge: string;
  headingLead: string;
  headingHighlight: string;
  /** Takes **bold**. */
  text: string;
  /** Highlight pills; the icons (star, pin, sparkles, phone) follow the order. */
  highlights: string[];
  expertLabel: string;
  whatsappLabel: string;
  imageAlt: string;
  chipTitle: string;
  chipRegion: string;
  chipPrice: string;
  ratingBadge: string;
};

export const TOUR_ARCHIVE_CTA_COPY: TourArchiveCtaCopy = {
  badge: "Plan Your Sacred Journey",
  headingLead: "Your Perfect Pilgrimage to",
  headingHighlight: "Somnath & Dwarka",
  text: "Our Gujarat specialists craft custom itineraries covering the sacred **Jyotirlinga of Somnath** and the divine **Dwarkadhish Temple** — with comfortable stays, private transfers & guided experiences.",
  highlights: ["VIP Jyotirlinga Darshan", "Somnath & Dwarka Covered", "Custom Pilgrimage Plans", "24/7 Expert Support"],
  expertLabel: "Speak With Our Expert",
  whatsappLabel: "WhatsApp Us",
  imageAlt: "Somnath Dwarka Tour Package",
  chipTitle: "Somnath + Dwarka",
  chipRegion: "Gujarat, India",
  chipPrice: "From ₹4,999",
  ratingBadge: "4.9 · 2,400+ reviews",
};

/** Notes shared by the three hub PageDefs for the two blocks above. */
export const HUB_BLOCK_NOTES =
  "yatraBanner is the 'Begin Your Sacred Yatra' card inside the package list (headingLead + headingHighlight (orange) + headingTail make its H2; " +
  "stats[{value, label}] and trust[] chips; the phone, email and brand name come from site settings and are not here). " +
  "archiveCta is the orange band near the foot (text takes **bold**; highlights[] pills; chipPrice and ratingBadge sit on its photo). " +
  "The stats, ratingBadge and chipPrice are claims: change them only to figures the business has confirmed, never invent ratings, review counts or customer numbers.";
