import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of the 404 page (src/app/not-found.tsx; page id "not-found"), shown
  for every URL that does not exist. It cannot be hidden.
*/

export const NOT_FOUND_DEFAULTS = {
  badge: "Error 404",
  badgeText: "Page Not Found",
  heading: "Looks Like You Took a Detour on the Pilgrimage Trail",
  text: "The page or sacred destination you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you find the right path for your yatra.",
  homeButton: "Return to Home",
  whatsappButton: "Chat on WhatsApp",
  whatsappMessage: "Hi, I was browsing your website and need help finding a package or guide.",
  contactButton: "Contact Support",
  popularHeading: "Popular Pilgrimage Guides & Tour Packages",
  exploreLabel: "Explore",
  popular: [
    {
      title: "Somnath Dwarka Tour Packages",
      desc: "3, 4 & 5-day all-inclusive pilgrimage packages with hotel & cab.",
      href: "/somnath-dwarka-tour-package/",
    },
    {
      title: "Dedicated Cab & Taxi Service",
      desc: "Door-to-door AC taxi for Dwarka, Somnath, Diu, and Rajkot.",
      href: "/somnath-dwarka-taxi-service/",
    },
    {
      title: "Dwarkadhish Temple & Sightseeing",
      desc: "Darshan timings, aarti schedules, and Bet Dwarka guides.",
      href: "/dwarka/",
    },
    {
      title: "Somnath Jyotirlinga & Aarti Guide",
      desc: "Daily temple timings, light & sound show, and nearby spots.",
      href: "/somnath/",
    },
    {
      title: "Trip Planner & Fare Calculator",
      desc: "Free tools to estimate cab fares and craft day-wise itineraries.",
      href: "/tools/",
    },
    {
      title: "Compare Packages & Routes",
      desc: "Side-by-side comparison tables to find the best route.",
      href: "/compare/",
    },
  ],
};

export const NOT_FOUND_PAGE: PageDef<typeof NOT_FOUND_DEFAULTS> = {
  id: "not-found",
  title: "404 page (page not found)",
  group: "Small pages",
  path: "/404/",
  notes:
    "The page shown for any URL that does not exist (noindex). badge + badgeText (the pill above '404'), heading, text, the three buttons " +
    "(homeButton, whatsappButton with whatsappMessage = the text WhatsApp opens with, contactButton), popularHeading and popular[{title, desc, " +
    "href}] (the shortcut cards; icons fixed by position), exploreLabel. Hiding this page has no effect: the 404 page always shows. Plain text.",
  defaults: NOT_FOUND_DEFAULTS,
};
