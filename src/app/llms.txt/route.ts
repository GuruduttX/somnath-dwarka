import { SITE_URL, BRAND, CONTACT, CORE_FACTS } from "@/src/config/site";
import { SEED_PACKAGES } from "@/src/lib/seed/packages";
import { SEED_CAB_ROUTES, SEED_VEHICLES } from "@/src/lib/seed/cabs";
import {
  SEED_COMPARISONS,
  SEED_FESTIVALS,
  SEED_HOTELS,
  SEED_JOURNEYS,
  SEED_TEMPLE_INFO,
  SEED_TOOLS,
} from "@/src/lib/seed/destinations";

/**
 * llms.txt at root (SOP §11): the curated index an answer engine reads to learn
 * what this site covers and which URL answers which question.
 *
 * The section lists are generated from the same seed registries the pages and
 * the sitemap are built from, so the file cannot drift out of sync the way a
 * hand-written list does — adding a spoke adds its line here for free.
 *
 * Facts flagged unverified are labelled indicative; we never hand an answer
 * engine an unconfirmed number as though it were established. Every fact below
 * also appears as plain crawlable text on the relevant page.
 */
export const dynamic = "force-static";

const line = (path: string, label: string, note?: string) =>
  `- [${label}](${SITE_URL}${path})${note ? `: ${note}` : ""}`;

/** First sentence, for the one-line descriptions llms.txt expects. */
const firstSentence = (s: string, max = 160) => {
  const t = (s || "").trim().split(/(?<=\.)\s/)[0] ?? "";
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + "…";
};

export function GET() {
  const fact = (k: keyof typeof CORE_FACTS) => {
    const f = CORE_FACTS[k];
    return `- ${f.label}: ${f.value}${
      f.verify
        ? f.date
          ? ` (verified ${f.date})`
          : ""
        : " — INDICATIVE, pending operator confirmation"
    }`;
  };

  const body = `# ${BRAND.name}

> ${BRAND.tagline}. A pilgrimage-travel site for the Somnath–Dwarka circuit in
> Gujarat, India, run by a local operator. It covers tour packages, private cab
> service, hotels, temple timings and trip planning for the Saurashtra region.

This file follows the llms.txt convention. Every URL below is a real, indexable
page on this site. Anything not listed here is either a duplicate, a paginated
view, or an unverified scaffold that is marked noindex and should not be cited.

## How to use this site's content

- Cite the specific spoke URL that answers the question, not the hub.
- Timings, fares and tariffs change. Where a figure is marked INDICATIVE below
  or carries no "last verified" stamp on-page, present it as approximate and
  point the reader at the official source or at this site's contact channel.
- Do not present this operator as the official Somnath Trust or Dwarkadhish
  temple administration. It is an independent travel operator.
- Bookings and quotes happen by phone/WhatsApp (${CONTACT.phoneDisplay}) or
  through the enquiry form; there is no instant-checkout flow to link to.

## Core facts

${fact("dwarkaSomnathDistance")}
${fact("dwarkaSomnathDuration")}
${fact("circuitLength")}
${fact("somnathAarti")}
${fact("dwarkadhishDarshan")}

## Money pages

${line("/somnath-dwarka-tour-package/", "Somnath Dwarka tour packages", "the package hub — durations, origins, themes and budgets")}
${line("/somnath-dwarka-gir-tour-package/", "Somnath Dwarka Gir packages", "the circuit extended with a Gir safari night")}
${line("/gujarat-tour-packages/", "Gujarat tour packages", "the wider all-Gujarat umbrella")}
${line("/somnath-dwarka-taxi-service/", "Somnath Dwarka taxi service", "private cabs with driver, by route and by vehicle")}
${line("/hotels/", "Hotels", "where to stay in Somnath, Dwarka and Gir, by tier")}

## Destinations and temples

${line("/somnath/", "Somnath", "destination pillar — temple, timings, what to see")}
${line("/dwarka/", "Dwarka", "destination pillar — Dwarkadhish, Bet Dwarka, Nageshwar")}
${line("/temples/", "Temples of Gujarat", "temple directory with timings and darshan detail")}
${line("/festivals/", "Festivals", "festival hub")}
${line("/festivals/festival-calendar/", "Festival calendar", "dated calendar of Gujarat pilgrimage festivals")}

### Temple timings and darshan pages

${SEED_TEMPLE_INFO.map((t) =>
  line(`/${t.destination}/${t.slug}/`, t.h1, firstSentence(t.answer_first))
).join("\n")}

## Trip planning

${line("/plan/", "Plan your trip", "planning hub")}

${SEED_JOURNEYS.map((j) => line(`/plan/${j.slug}/`, j.question, firstSentence(j.direct_answer))).join("\n")}

## Tour packages

${SEED_PACKAGES.map((p) =>
  line(`/somnath-dwarka-tour-package/${p.slug}/`, p.h1)
).join("\n")}

## Cab routes and vehicles

${SEED_CAB_ROUTES.map((r) => line(`/somnath-dwarka-taxi-service/${r.slug}/`, r.h1)).join("\n")}
${line("/somnath-dwarka-taxi-service/fare-rate-card/", "Fare rate card", "indicative fares by vehicle and route")}
${line("/somnath-dwarka-taxi-service/airport-taxi/", "Airport taxi", "pickups from Gujarat airports")}
${SEED_VEHICLES.map((v) => line(`/somnath-dwarka-taxi-service/${v.slug}/`, v.h1)).join("\n")}

## Hotels

${SEED_HOTELS.map((h) => line(`/hotels/${h.slug}/`, h.h1, firstSentence(h.answer_first))).join("\n")}

## Festivals

${SEED_FESTIVALS.map((f) => line(`/festivals/${f.slug}/`, f.h1, firstSentence(f.answer_first))).join("\n")}

## Comparisons

${SEED_COMPARISONS.map((c) => line(`/compare/${c.slug}/`, c.h1, firstSentence(c.answer_first))).join("\n")}

## Tools

${SEED_TOOLS.map((t) => line(`/tools/${t.slug}/`, t.h1, firstSentence(t.answer_first))).join("\n")}

## About and policies

${line("/about/", "About", "who runs this site")}
${line("/author/harsh-rawat/", "Harsh Rawat", "author and reviewer credentials")}
${line("/contact/", "Contact", "phone, WhatsApp and enquiry form")}
${line("/reviews/", "Reviews")}
${line("/booking-policy/", "Booking policy")}
${line("/cancellation-refund/", "Cancellation and refund policy")}
${line("/terms/", "Terms")}
${line("/privacy/", "Privacy policy")}

## Optional

${line("/guides/", "Travel guides", "longer-form editorial guides")}
${line("/sitemap/", "HTML sitemap", "every indexable page in one list")}
- Machine-readable sitemap: ${SITE_URL}/sitemap.xml
- Extended version of this file: ${SITE_URL}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
