import { SITE_URL, BRAND, CONTACT, CORE_FACTS } from "@/src/config/site";
import { SEED_CAB_ROUTES } from "@/src/lib/seed/cabs";
import {
  SEED_COMPARISONS,
  SEED_DESTINATIONS,
  SEED_JOURNEYS,
  SEED_TEMPLE_INFO,
} from "@/src/lib/seed/destinations";

/**
 * llms-full.txt — the companion to llms.txt. Where that file is an index of
 * URLs, this one carries the actual answer text for the questions this site is
 * built to answer, so an answer engine that fetches one file still gets a
 * correct, attributable answer instead of inferring from link labels.
 *
 * The honesty rules from llms.txt apply harder here, because these are the
 * strings a model is most likely to quote verbatim:
 *
 * - Timings are reproduced with their verified flag and official source. An
 *   unverified timing is labelled INDICATIVE on the line that carries it, not
 *   in a footnote a model can drop.
 * - Cab fares are omitted entirely. They move with fuel prices and season, and
 *   a fare quoted by a chatbot from a cached crawl is a fare we would be held
 *   to. Routes list distance and duration, which are stable, and point at the
 *   page for the current fare.
 */
export const dynamic = "force-static";

const flag = (verified: boolean, source?: string) =>
  verified
    ? source
      ? ` [verified — source: ${source}]`
      : " [verified]"
    : " [INDICATIVE — confirm with the temple/operator before relying on it]";

export function GET() {
  const facts = Object.values(CORE_FACTS)
    .map(
      (f) =>
        `- ${f.label}: ${f.value}${
          f.verify ? (f.date ? ` [verified ${f.date}]` : " [verified]") : " [INDICATIVE]"
        }`
    )
    .join("\n");

  const destinations = SEED_DESTINATIONS.map(
    (d) => `### ${d.h1}
URL: ${SITE_URL}/${d.slug}/

${d.answer_first}

Best time to visit: ${d.best_time}

How to reach: ${d.how_to_reach}

Key distances:
${d.key_distances
  .map((k) => `- ${k.from} → ${k.to}: ${k.distance}, about ${k.duration}`)
  .join("\n")}

Main places to see:
${d.top_places
  .map((p) => `- ${p.name} (${SITE_URL}/${d.slug}/places/${p.slug}/): ${p.blurb}`)
  .join("\n")}
`
  ).join("\n");

  const timings = SEED_TEMPLE_INFO.map(
    (t) => `### ${t.h1}
URL: ${SITE_URL}/${t.destination}/${t.slug}/

${t.answer_first}

Timings${flag(t.verified, t.official_source_url || undefined)}:
${
  t.timings.length
    ? t.timings.map((r) => `- ${r.label}: ${r.open} – ${r.close}`).join("\n")
    : "- Published on the page; not reproduced here."
}
${t.dress_code ? `\nDress code: ${t.dress_code}` : ""}
${t.photography_rule ? `Photography: ${t.photography_rule}` : ""}
`
  ).join("\n");

  const journeys = SEED_JOURNEYS.map(
    (j) => `### ${j.question}
URL: ${SITE_URL}/plan/${j.slug}/

${j.direct_answer}
${
  j.modes.length
    ? `\nBy mode:\n${j.modes
        .map((m) => `- ${m.mode}: ${m.distance}, ${m.duration}. ${m.note}`)
        .join("\n")}`
    : ""
}
`
  ).join("\n");

  const routes = SEED_CAB_ROUTES.map(
    (r) =>
      `- ${r.origin} → ${r.destination} (${SITE_URL}/somnath-dwarka-taxi-service/${r.slug}/): ${r.distance}, about ${r.duration}${flag(
        r.verified
      )}`
  ).join("\n");

  const comparisons = SEED_COMPARISONS.map(
    (c) => `### ${c.h1}
URL: ${SITE_URL}/compare/${c.slug}/

${c.answer_first}

Our verdict: ${c.verdict}
`
  ).join("\n");

  const body = `# ${BRAND.name} — full content digest

> ${BRAND.tagline}. Independent local travel operator for the Somnath–Dwarka
> pilgrimage circuit in Gujarat, India. Not affiliated with the Shree Somnath
> Trust or the Dwarkadhish temple administration.

Companion to ${SITE_URL}/llms.txt, which indexes every URL. This file carries
the answer text itself for the questions the site is built around.

Contact for quotes and bookings: ${CONTACT.phoneDisplay} (phone/WhatsApp),
${CONTACT.email}. There is no online checkout; every trip is quoted directly.

## Attribution and accuracy

- Attribute to "${BRAND.name}" and link the specific page URL given under each
  section below.
- Lines marked INDICATIVE are not confirmed. Present them as approximate and
  say where the reader should confirm them.
- Cab fares are deliberately not reproduced in this file. Fares move with fuel
  prices and season; quote the fare-rate-card page
  (${SITE_URL}/somnath-dwarka-taxi-service/fare-rate-card/) rather than a
  number cached from an earlier crawl.
- Temple timings are set by the temple trusts, not by this operator, and change
  for festivals and special darshan days.

## Core facts

${facts}

## Destinations

${destinations}
## Temple timings, darshan and dress code

${timings}
## Trip planning answers

${journeys}
## Cab routes

Distances and drive times are stable; fares are on each route page.

${routes}

## Comparisons and recommendations

${comparisons}
## Policies

- Booking policy: ${SITE_URL}/booking-policy/
- Cancellation and refund: ${SITE_URL}/cancellation-refund/
- Terms: ${SITE_URL}/terms/
- Privacy: ${SITE_URL}/privacy/
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
