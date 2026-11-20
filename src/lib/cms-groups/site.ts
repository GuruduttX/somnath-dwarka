import type { CmsGroup } from "./types";
import type { PageDef } from "@/src/lib/pages/types";
import { DESTINATIONS_NAV, PRIMARY_NAV } from "@/src/config/routes";

/*
  CMS coverage for the site-wide chrome: the Navbar menu, the footer and the
  sticky WhatsApp bar (one "page" item, id "site-chrome", shown on every
  page). Phone, email, GSTIN and the brand name stay in src/config/site.ts
  (and its NEXT_PUBLIC_* env overrides) because schema, links and dozens of
  components read them.
*/

/** Emoji beside each Navbar entry (the default for an entry without one is 📍). */
const NAV_ICONS: Record<string, string> = {
  "Taxi service": "🚗",
  Hotels: "🏨",
  Temples: "🛕",
  Somnath: "🛕",
  Dwarka: "🛕",
  Gir: "🦁",
  "Junagadh Girnar": "⛰️",
  Plan: "🧭",
  Festivals: "🎉",
  Guides: "📖",
};
const withIcon = (n: { label: string; path: string }) => ({ label: n.label, path: n.path, icon: NAV_ICONS[n.label] ?? "📍" });

export const SITE_CHROME_DEFAULTS = {
  nav: {
    primary: PRIMARY_NAV.map(withIcon),
    destinationsLabel: "Destinations",
    destinationsIcon: "🛕",
    /** The destinations dropdown sits right after the primary entry with this label (or at the end). */
    destinationsAfter: "Hotels",
    destinations: DESTINATIONS_NAV.map(withIcon),
  },
  footer: {
    blessing: "ॐ नमः शिवाय · जय द्वारकाधीश",
    heading: "Dwarka Somnath Yatra",
    ctaLabel: "Plan Your Yatra",
    reachUsLabel: "Reach Us",
    addressFallback: "Dwarka, Saurashtra, Gujarat — 361335",
    whatsappLabel: "Chat on WhatsApp",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/experiencemyindia" },
      { label: "YouTube", href: "https://www.youtube.com/@experiencemyindia" },
    ],
    yatrasLabel: "Sacred Yatras",
    tourPackages: [
      { label: "4 Days 3 Nights", href: "/somnath-dwarka-tour-package/4-days-3-nights/" },
      { label: "3 Days 2 Nights", href: "/somnath-dwarka-tour-package/3-days-2-nights/" },
      { label: "5 Days 4 Nights", href: "/somnath-dwarka-tour-package/5-days-4-nights/" },
      { label: "From Ahmedabad", href: "/somnath-dwarka-tour-package/from-ahmedabad/" },
      { label: "From Rajkot", href: "/somnath-dwarka-tour-package/from-rajkot/" },
      { label: "From Mumbai", href: "/somnath-dwarka-tour-package/from-mumbai/" },
      { label: "Family Yatra", href: "/somnath-dwarka-tour-package/for-family/" },
    ],
    exploreLabel: "Explore",
    quickLinks: [
      { label: "All Packages", href: "/somnath-dwarka-tour-package/" },
      { label: "Somnath Dwarka Gir", href: "/somnath-dwarka-gir-tour-package/" },
      { label: "Gujarat Tour Packages", href: "/gujarat-tour-packages/" },
      { label: "Gir Tour Package", href: "/gir-tour-package/" },
      { label: "Kutch Tour Package", href: "/kutch-tour-package/" },
      { label: "Statue of Unity", href: "/statue-of-unity-tour-package/" },
      { label: "Ambaji Tour Package", href: "/ambaji-tour-package/" },
      { label: "Heritage Tours", href: "/heritage-tours-gujarat/" },
      { label: "Wildlife & Nature", href: "/wildlife-nature-tours/" },
      { label: "Temples of Gujarat", href: "/temples/" },
      { label: "Taxi Service", href: "/somnath-dwarka-taxi-service/" },
      { label: "Travel Guides", href: "/guides/" },
      { label: "Festival Calendar", href: "/festivals/" },
      { label: "About Us", href: "/about/" },
    ],
    bottomLinks: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms", href: "/terms/" },
      { label: "Cancellation & Refund", href: "/cancellation-refund/" },
      { label: "Booking Policy", href: "/booking-policy/" },
    ],
    creditLabel: "Invento Apps",
    creditHref: "https://inventoapps.com/",
  },
  stickyBar: {
    whatsappText: "Hi, I'd like to plan a Somnath–Dwarka trip.",
  },
};

export type SiteChrome = typeof SITE_CHROME_DEFAULTS;

export const SITE_CHROME: PageDef<SiteChrome> = {
  id: "site-chrome",
  title: "Navbar, footer and sticky WhatsApp bar (every page)",
  group: "Site-wide",
  path: "/",
  scope: "layout",
  notes:
    "nav.primary[{label, path, icon (emoji)}] is the header menu in order; nav.destinations[] the 'Destinations' dropdown, placed right after " +
    "the primary entry labelled nav.destinationsAfter. footer: blessing and heading (top band), ctaLabel (its button), reachUsLabel, " +
    "addressFallback (shown until a registered address is set in code), whatsappLabel, socials[{label ('Instagram' | 'YouTube' pick the icon), href}], " +
    "yatrasLabel + tourPackages[{label, href}], exploreLabel + quickLinks[{label, href}], bottomLinks[{label, href}], creditLabel/creditHref. " +
    "stickyBar.whatsappText is the message the floating WhatsApp button opens with. Links are site paths with a trailing slash. " +
    "Phone, email, GSTIN and brand name are code (src/config/site.ts).",
  defaults: SITE_CHROME_DEFAULTS,
};

export const GROUP: CmsGroup = {
  datasets: [],
  pages: [SITE_CHROME as unknown as PageDef],
  resolvers: [],
};
