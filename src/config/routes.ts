/**
 * URL registry (SOP §3). Static/strategic indexable routes live here; dynamic
 * spokes (packages, cab routes, places, etc.) are appended by the sitemap from
 * the CMS. One trailing-slash convention: we standardise on trailing slash.
 */

export type RouteType =
  | "home"
  | "packagePillar"
  | "package"
  | "cabHub"
  | "cabRoute"
  | "vehicle"
  | "hotelHub"
  | "hotel"
  | "destinationPillar"
  | "templeInfo"
  | "place"
  | "journey"
  | "festival"
  | "guide"
  | "comparison"
  | "tool"
  | "trust";

export type StaticRoute = {
  path: string;
  type: RouteType;
  label: string;
  changeFreq?: "daily" | "weekly" | "monthly";
  priority?: number;
};

/** Strategic, always-indexable routes (SOP §3). */
export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", type: "home", label: "Home", changeFreq: "weekly", priority: 1 },

  // Money silo 1 — packages
  { path: "/somnath-dwarka-tour-package/", type: "packagePillar", label: "Tour packages", priority: 0.9 },

  // Money silo 2 — taxi
  { path: "/somnath-dwarka-taxi-service/", type: "cabHub", label: "Taxi service", priority: 0.9 },

  // Money silo 3 — hotels
  { path: "/hotels/", type: "hotelHub", label: "Hotels", priority: 0.8 },

  // Info pillars
  { path: "/somnath/", type: "destinationPillar", label: "Somnath", priority: 0.8 },
  { path: "/dwarka/", type: "destinationPillar", label: "Dwarka", priority: 0.8 },

  // Supporting hubs
  { path: "/plan/", type: "journey", label: "Plan your trip", priority: 0.7 },
  { path: "/festivals/", type: "festival", label: "Festivals", priority: 0.6 },
  { path: "/guides/", type: "guide", label: "Guides", priority: 0.6 },
  { path: "/compare/", type: "comparison", label: "Compare", priority: 0.6 },
  { path: "/tools/", type: "tool", label: "Tools", priority: 0.6 },

  // Trust
  { path: "/about/", type: "trust", label: "About", priority: 0.4 },
  { path: "/author/harsh-sharma/", type: "trust", label: "Author", priority: 0.4 },
  { path: "/reviews/", type: "trust", label: "Reviews", priority: 0.3 },
  { path: "/contact/", type: "trust", label: "Contact", priority: 0.4 },
  { path: "/booking-policy/", type: "trust", label: "Booking policy", priority: 0.2 },
  { path: "/cancellation-refund/", type: "trust", label: "Cancellation & refund", priority: 0.2 },
  { path: "/terms/", type: "trust", label: "Terms", priority: 0.2 },
  { path: "/privacy/", type: "trust", label: "Privacy", priority: 0.2 },
];

/** Primary nav — money hubs reachable ≤2 clicks from home (SOP §8). */
export const PRIMARY_NAV = [
  { label: "Tour packages", path: "/somnath-dwarka-tour-package/" },
  { label: "Taxi service", path: "/somnath-dwarka-taxi-service/" },
  { label: "Hotels", path: "/hotels/" },
  { label: "Somnath", path: "/somnath/" },
  { label: "Dwarka", path: "/dwarka/" },
  { label: "Plan", path: "/plan/" },
  { label: "Guides", path: "/guides/" },
];

export const FOOTER_NAV = [
  {
    heading: "Packages",
    links: [
      { label: "All tour packages", path: "/somnath-dwarka-tour-package/" },
      { label: "4 days 3 nights", path: "/somnath-dwarka-tour-package/4-days-3-nights/" },
      { label: "From Ahmedabad", path: "/somnath-dwarka-tour-package/from-ahmedabad/" },
      { label: "For family", path: "/somnath-dwarka-tour-package/for-family/" },
    ],
  },
  {
    heading: "Cabs & hotels",
    links: [
      { label: "Taxi service", path: "/somnath-dwarka-taxi-service/" },
      { label: "Somnath to Dwarka taxi", path: "/somnath-to-dwarka-taxi/" },
      { label: "Hotels", path: "/hotels/" },
    ],
  },
  {
    heading: "Destinations",
    links: [
      { label: "Somnath", path: "/somnath/" },
      { label: "Dwarka", path: "/dwarka/" },
      { label: "Plan your trip", path: "/plan/" },
      { label: "Festivals", path: "/festivals/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", path: "/about/" },
      { label: "Author", path: "/author/harsh-sharma/" },
      { label: "Contact", path: "/contact/" },
      { label: "Booking policy", path: "/booking-policy/" },
      { label: "Cancellation & refund", path: "/cancellation-refund/" },
      { label: "Privacy", path: "/privacy/" },
    ],
  },
];
