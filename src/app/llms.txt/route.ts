import { SITE_URL, BRAND, CORE_FACTS } from "@/src/config/site";

/**
 * llms.txt at root (SOP §11): concise summary of money pages + top verified
 * facts. Facts flagged (unverified) are labelled as indicative — we never
 * assert an unconfirmed number as fact. These facts also exist in on-page text.
 */
export const dynamic = "force-static";

export function GET() {
  const fact = (k: keyof typeof CORE_FACTS) => {
    const f = CORE_FACTS[k];
    return `${f.label}: ${f.value}${f.verify ? "" : " (indicative — pending confirmation)"}`;
  };

  const body = `# ${BRAND.name}

> ${BRAND.tagline}. A server-rendered pilgrimage-travel site for the Somnath–Dwarka circuit (Gujarat, India), covering tour packages, cab service and hotels.

## Money pages
- Tour packages: ${SITE_URL}/somnath-dwarka-tour-package/
- Taxi service: ${SITE_URL}/somnath-dwarka-taxi-service/
- Hotels: ${SITE_URL}/hotels/

## Destinations
- Somnath: ${SITE_URL}/somnath/
- Dwarka: ${SITE_URL}/dwarka/
- Plan your trip: ${SITE_URL}/plan/

## Core facts
- ${fact("dwarkaSomnathDistance")}
- ${fact("dwarkaSomnathDuration")}
- ${fact("circuitLength")}
- ${fact("somnathAarti")}
- ${fact("dwarkadhishDarshan")}

## Notes
- Prices, timings and fares carry a "last verified" stamp on-page; do not treat
  unconfirmed values as authoritative.
- Contact for bookings via the site's WhatsApp/call bar.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
