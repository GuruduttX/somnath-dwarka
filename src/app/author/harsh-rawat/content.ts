import type { PageDef } from "@/src/lib/pages/types";
import { SEED_AUTHOR } from "@/src/lib/seed/destinations";

/*
  The author profile /author/harsh-rawat/, editable through the CMS ("page"
  type, id "author-harsh-rawat"). SEED_AUTHOR (lib/seed/destinations.ts) stays
  the source of the name, title, photo and verification flags; the bio, stats,
  expertise and guide list below were added as placeholder copy for layout.
*/

export const AUTHOR_PAGE_DEFAULTS = {
  name: SEED_AUTHOR.name,
  job_title: SEED_AUTHOR.job_title,
  photo: SEED_AUTHOR.photo,
  /** false keeps the page out of the index (noindex) — the bio and stats are not verified yet. */
  bio_verified: SEED_AUTHOR.bio_verified,
  sameAs: [...SEED_AUTHOR.sameAs],
  eyebrow: "Author",
  bioHeading: "Biography",
  bio: [
    "Harsh Rawat has spent the better part of a decade walking the pilgrim trail between Somnath and Dwarka — from the pre-dawn aarti at the Somnath Jyotirlinga to the flag-change ceremony atop the Dwarkadhish temple. What began as a personal pilgrimage turned into a full-time calling: mapping the routes, timing the ferries to Bet Dwarka, and learning which dharamshalas actually hold a booking when the festival crowds arrive.",
    "He writes the way a good local guide talks — practical first. Every itinerary on this site is one he has travelled himself, cross-checked against temple timings, seasonal road closures and the real cost of a shared cab in peak season. When something changes on the ground, the guide changes with it.",
    "Off the road, Harsh documents the folk traditions of coastal Gujarat and mentors first-time solo pilgrims planning the Char Dham of the west.",
  ],
  stats: [
    { label: "Years on the circuit", value: "9+" },
    { label: "Guides published", value: "40+" },
    { label: "Temples covered", value: "25" },
    { label: "Pilgrims helped", value: "12k+" },
  ],
  expertiseHeading: "Areas of expertise",
  expertise: [
    "Somnath–Dwarka pilgrimage routes",
    "Temple darshan timings & rituals",
    "Bet Dwarka ferry logistics",
    "Budget & senior-friendly travel",
    "Festival-season planning",
    "Coastal Gujarat folk heritage",
  ],
  guidesHeading: "Recent guides by {firstName}",
  guides: [
    { title: "Somnath to Dwarka: the complete 3-day itinerary", path: "/guides/dwarka-somnath-itinerary-3-days/" },
    { title: "Dwarkadhish Temple: darshan timings & aarti guide", path: "/dwarka/dwarkadhish-temple-timings/" },
    { title: "How to reach Bet Dwarka (ferry + road)", path: "/guides/dwarka-to-bet-dwarka-distance/" },
    { title: "Best time to visit Somnath", path: "/somnath/best-time-to-visit-somnath/" },
  ],
  meta: {
    title: "{name} — Author, Somnath Dwarka Guides",
    description:
      "About {name}, {job_title}. {firstStat} years travelling and documenting the Somnath–Dwarka pilgrim circuit.",
  },
};

export type AuthorCopy = typeof AUTHOR_PAGE_DEFAULTS;

export const AUTHOR_PAGE: PageDef<AuthorCopy> = {
  id: "author-harsh-rawat",
  title: "Author profile — Harsh Rawat",
  group: "Company pages",
  path: "/author/harsh-rawat/",
  notes:
    "The author profile at /author/harsh-rawat/ (linked from every guide's author card). IMPORTANT: the bio, stats and " +
    "expertise are placeholder copy written for layout, not verified facts, so the page is noindex while bio_verified is " +
    "false. Only replace them with facts the owner confirms; never invent years of experience, counts or credentials, " +
    "and set bio_verified to true only when the owner says the profile is accurate. Fields: name, job_title, photo (image " +
    "URL), bio[] (paragraphs), stats[{label,value}], expertise[] (tags), guides[{title,path}] (the \"Recent guides\" " +
    "list), sameAs[] (profile URLs for the Person schema). Placeholders: {firstName} in guidesHeading; {name}, " +
    "{job_title}, {firstStat} (the first stat's value) in meta.",
  defaults: AUTHOR_PAGE_DEFAULTS,
};
