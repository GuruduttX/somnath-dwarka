import type { PageDef } from "@/src/lib/pages/types";
import { SPOKE_AUTHOR, SPOKE_FARE_SCOPE, SPOKE_VEHICLES, VEHICLE_AUTHOR, VEHICLE_SCOPE } from "@/src/config/taxiSpokes";

/*
  Copy shared by every cab route page and every vehicle page under
  /somnath-dwarka-taxi-service/<slug>/ (the connector's "page" type, ids
  "taxi-route-template" and "taxi-vehicle-template"). Each page's own copy is
  its item in site_taxi_route_copy / site_taxi_vehicle_copy, and its facts
  (distance, fares, seats, ...) are the published `taxi` CMS item, else its
  item in site_cab_routes / site_taxi_vehicles. The shared blocks stay defined
  in src/config/taxiSpokes.ts (other pages import them) and are copied in here
  as the defaults.

  {name} slots are filled per page: {origin}, {destination} on route pages,
  {vehicle} and {seats} on vehicle pages.
*/

export const CAB_ROUTE_TEMPLATE_DEFAULTS = {
  atAGlanceHeading: "At a glance",
  vehiclesHeading: "Vehicles and fares",
  /** The vehicle guide table shown on every route page. */
  vehicleGuide: SPOKE_VEHICLES.map((v) => ({ vehicle: v.vehicle, seats: v.seats, suited: v.suited })),
  faresTableTitle: "Indicative fares for this leg",
  rateCardLinkLabel: "See every price on the fare rate card",
  stopsHeading: "Stops en route",
  stopsIntro: "With a private cab you can build these in. Tell us at booking and the driver plans the timing around them.",
  fareScopeHeading: "What your fare includes, and what it does not",
  /** Shared included/excluded rows; each route's own rows (faresIncluded/faresExcluded) are appended. */
  fareScope: {
    includedTitle: SPOKE_FARE_SCOPE.includedTitle,
    included: [...SPOKE_FARE_SCOPE.included],
    excludedTitle: SPOKE_FARE_SCOPE.excludedTitle,
    excluded: [...SPOKE_FARE_SCOPE.excluded],
  },
  author: { line: SPOKE_AUTHOR.line, links: SPOKE_AUTHOR.links.map((l) => ({ label: l.label, href: l.href })) },
  notForYouHeading: "This trip may not be the right fit if",
  beforeYouTravelHeading: "Before you travel",
  faqHeading: "{origin} to {destination} taxi FAQs",
  keepPlanningHeading: "Keep planning",
  callLabel: "Call",
  ctaBand: { title: "Book this route", subtitle: "Get a firm one-way or round-trip fare." },
};

export const CAB_ROUTE_TEMPLATE_PAGE: PageDef<typeof CAB_ROUTE_TEMPLATE_DEFAULTS> = {
  id: "taxi-route-template",
  title: "Cab route pages (shared copy)",
  group: "Taxi pages",
  path: "/somnath-dwarka-taxi-service/[slug]",
  notes:
    "Headings and blocks shared by every cab route page (/somnath-dwarka-taxi-service/<route>-taxi/). One route's own copy is its item in site_taxi_route_copy; " +
    "its distance, stops and fares are its `taxi` CMS item (or site_cab_routes). vehicleGuide[{vehicle, seats, suited}] is the vehicle table on every route page; " +
    "fareScope is the shared included/excluded list (each route appends its own rows); author {line, links[{label, href}]} closes the why-book block; " +
    "faqHeading may use {origin} and {destination}; ctaBand is the closing booking band. stopsIntro takes [link](/path/) and **bold**. Changing a value here changes every route page.",
  defaults: CAB_ROUTE_TEMPLATE_DEFAULTS,
};

export const VEHICLE_TEMPLATE_DEFAULTS = {
  atAGlanceHeading: "At a glance",
  /** Caption on the vehicle photo. */
  imageCaption: "{vehicle} — up to {seats} seats",
  /** Fares heading for a vehicle without its own copy item. */
  faresHeadingFallback: "Indicative fares",
  rateCardLinkLabel: "See every price on the fare rate card",
  scopeHeading: "What your booking includes, and what it does not",
  /** Shared included/excluded rows; each vehicle's includedFirst is put first and excludedExtra last. */
  scope: {
    includedTitle: VEHICLE_SCOPE.includedTitle,
    included: [...VEHICLE_SCOPE.included],
    excludedTitle: VEHICLE_SCOPE.excludedTitle,
    excluded: [...VEHICLE_SCOPE.excluded],
  },
  author: { line: VEHICLE_AUTHOR.line, links: VEHICLE_AUTHOR.links.map((l) => ({ label: l.label, href: l.href })) },
  notForYouHeading: "This vehicle may not be the right fit if",
  faqHeading: "{vehicle} FAQs",
  keepPlanningHeading: "Keep planning",
  callLabel: "Call",
  ctaBand: { title: "Book this vehicle", subtitle: "Share your route and dates for a firm fare." },
};

export const VEHICLE_TEMPLATE_PAGE: PageDef<typeof VEHICLE_TEMPLATE_DEFAULTS> = {
  id: "taxi-vehicle-template",
  title: "Vehicle pages (shared copy)",
  group: "Taxi pages",
  path: "/somnath-dwarka-taxi-service/[slug]",
  notes:
    "Headings and blocks shared by the vehicle pages (/somnath-dwarka-taxi-service/innova-crysta/, /ertiga/, /tempo-traveller/). One vehicle's own copy is its item in " +
    "site_taxi_vehicle_copy; its seats, rates and photo are its `taxi` CMS item (or site_taxi_vehicles). imageCaption and faqHeading may use {vehicle} and {seats}; " +
    "scope is the shared included/excluded list; author {line, links[{label, href}]} closes the why-book block; ctaBand is the closing booking band. Plain text. " +
    "Changing a value here changes every vehicle page.",
  defaults: VEHICLE_TEMPLATE_DEFAULTS,
};
