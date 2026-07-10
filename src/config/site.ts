/**
 * Single source of truth for brand, NAP, contact and the SOP's core
 * "verified" facts (SOP §11 llms.txt + §2 verify fields).
 *
 * Anything tagged `verify: false` below is a PLACEHOLDER awaiting client
 * confirmation (SOP §16). Never present a placeholder as a verified fact —
 * the UI renders a "last verified" stamp + source only when verify === true.
 */

export const SITE_ENV = process.env.NEXT_PUBLIC_SITE_ENV ?? "production";
export const IS_STAGING = SITE_ENV === "staging";

/** Canonical origin, no trailing slash. Override via env in each environment. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://somnathdwarkatourpackage.com"
).replace(/\/$/, "");

export const BRAND = {
  name: "Somnath Dwarka Tour Package",
  shortName: "Somnath Dwarka Tours",
  legalName: "Somnath Dwarka Tour Package",
  tagline: "Itinerary, Cab & Hotel for your Somnath–Dwarka pilgrimage",
  // Client dependency (SOP §16 — brand assets)
  logo: `${SITE_URL}/images/logo.png`,
  ogImage: `${SITE_URL}/images/home/HomeHero.webp`,
} as const;

/** Contact / NAP — client to confirm (SOP §16). */
export const CONTACT = {
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+919999999999",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 99999 99999",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "919999999999",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@somnathdwarkatourpackage.com",
  // LocalBusiness schema renders ONLY when napConfirmed is true (SOP §12 gate).
  napConfirmed: false,
  address: {
    street: "",
    locality: "Dwarka",
    region: "Gujarat",
    postalCode: "",
    country: "IN",
  },
} as const;

export const waLink = (text?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
export const telLink = () => `tel:${CONTACT.phone}`;

/**
 * Core verified facts (SOP §11). These must also appear as plain crawlable
 * on-page text where relevant. Flip `verify` to true + add `source` + `date`
 * once the client confirms.
 */
export type VerifiedFact = {
  key: string;
  label: string;
  value: string;
  verify: boolean;
  source?: string;
  date?: string; // ISO — "last verified"
};

/**
 * Home §2 — credentials trust bar (home-page map v6).
 *
 * Binding honesty gate: publish ONLY genuinely-held registrations, memberships
 * and numbers. A credential renders when `verify === true` and `value` is set;
 * the bar renders nothing at all when none qualify. Do not invent an IATO/TAAI
 * membership or a travellers-served figure to fill the strip.
 */
export type Credential = VerifiedFact;

export const CREDENTIALS: Credential[] = [
  { key: "gujaratTourismReg", label: "Gujarat Tourism registration", value: "", verify: false },
  { key: "gstRegistered", label: "GST registered", value: "", verify: false },
  { key: "association", label: "Industry association", value: "", verify: false },
  { key: "securePayments", label: "Secure payments", value: "UPI & Razorpay", verify: false },
  { key: "onTripSupport", label: "On-trip support", value: "24×7 local team", verify: false },
  { key: "travellersServed", label: "Travellers served", value: "", verify: false },
];

/**
 * Home §7 — live offers hook. OPS-CONFIRM: real, current, honoured offers only.
 * An empty array renders no ribbon. Never add a fake deadline to manufacture
 * urgency.
 */
export type Offer = {
  id: string;
  label: string;
  detail: string;
  /** Paths this offer applies to, e.g. ["/somnath-dwarka-tour-package/"]. */
  appliesTo: string[];
  confirmed: boolean;
  expiresAt?: string; // ISO
};

export const OFFERS: Offer[] = [];

/**
 * Offers live for a given path at a given instant. `now` is injected rather
 * than read from the clock so this stays pure and callers control the boundary
 * (a component must not read the clock during render).
 */
export const liveOffers = (path: string, now: number): Offer[] =>
  OFFERS.filter(
    (o) =>
      o.confirmed &&
      o.appliesTo.includes(path) &&
      (!o.expiresAt || new Date(o.expiresAt).getTime() > now)
  );

/**
 * Home §9 — experience video. Original or permissioned footage only; official
 * darshan streams are linked, never embedded as ours. null renders no embed.
 */
export const EXPERIENCE_VIDEO: {
  youtubeId: string;
  title: string;
  transcript: string;
} | null = null;

/** Home §14 — response SLA is an operational claim, so it is verify-gated too. */
export const RESPONSE_SLA: VerifiedFact = {
  key: "responseSla",
  label: "Typical response time",
  value: "",
  verify: false,
};

export const CORE_FACTS: Record<string, VerifiedFact> = {
  dwarkaSomnathDistance: {
    key: "dwarkaSomnathDistance",
    label: "Dwarka ↔ Somnath road distance",
    value: "≈ 233 km",
    verify: false,
  },
  dwarkaSomnathDuration: {
    key: "dwarkaSomnathDuration",
    label: "Dwarka ↔ Somnath drive time",
    value: "~ 4.5–5 hours",
    verify: false,
  },
  circuitLength: {
    key: "circuitLength",
    label: "Typical circuit",
    value: "4–5 days",
    verify: false,
  },
  somnathAarti: {
    key: "somnathAarti",
    label: "Somnath aarti timings",
    value: "07:00, 12:00, 19:00 (approx)",
    verify: false,
  },
  dwarkadhishDarshan: {
    key: "dwarkadhishDarshan",
    label: "Dwarkadhish darshan timings",
    value: "06:30–13:00, 17:00–21:30 (approx)",
    verify: false,
  },
};
