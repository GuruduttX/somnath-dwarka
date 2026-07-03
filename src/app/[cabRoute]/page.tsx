import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata, serviceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, findSeedCab } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";

/**
 * Root-level CabRoute page (SOP §3 — /{origin}-to-{dest}-taxi/). Static routes
 * take precedence at this level; only known `-taxi` slugs render, everything
 * else 404s. Data comes from the CMS/seed by slug.
 */
export const revalidate = 3600;

type Params = { params: Promise<{ cabRoute: string }> };

export async function generateStaticParams() {
  return SEED_CAB_ROUTES.map((r) => ({ cabRoute: r.slug }));
}

function getRoute(slug: string) {
  if (!slug.endsWith("-taxi")) return null;
  const r = findSeedCab(slug);
  return r && r.kind === "route" ? r : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { cabRoute } = await params;
  const r = getRoute(cabRoute);
  if (!r) return {};
  return buildMetadata({ title: r.title, description: r.answer_first, path: `/${cabRoute}/` });
}

export default async function CabRoutePage({ params }: Params) {
  const { cabRoute } = await params;
  const r = getRoute(cabRoute);
  if (!r) notFound();

  const related = buildRelatedLinks({
    self: `/${cabRoute}/`,
    pillar: { target: "/somnath-dwarka-taxi-service/", anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: SEED_CAB_ROUTES.filter((x) => x.slug !== cabRoute).map((x) => ({
      target: `/${x.slug}/`,
      anchor: `${x.origin} to ${x.destination} taxi`,
      type: "sibling" as const,
    })),
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: "/somnath-dwarka-taxi-service/" },
    { name: `${r.origin} to ${r.destination}`, path: `/${cabRoute}/` },
  ];

  return (
    <PageShell crumbs={crumbs}>
      <TaxiHero
        title={r.h1}
        description={r.answer_first}
        breadcrumbs={crumbs}
        badge="Route Taxi"
        ctaContext={`${r.origin} to ${r.destination} taxi`}
        distance={r.distance}
        duration={r.duration}
        verified={r.verified}
      />

      {/* Fares Section - Full Width Gradient */}
      <div className="w-full bg-gradient-to-br from-amber-50/45 via-white to-orange-50/50 border-b border-orange-100/30 relative overflow-hidden py-10">
        {/* Winding road SVG decoration */}
        <svg className="absolute right-0 top-4 w-60 h-40 opacity-[0.12] text-orange-500 pointer-events-none" viewBox="0 0 200 100" fill="none">
          <path d="M 0,50 Q 50,20 100,50 T 200,50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
          <circle cx="100" cy="50" r="4" fill="currentColor" />
        </svg>

        <Section id="fares" title="Fare by vehicle type" wide={true} className="!py-0">
          <p className="text-sm text-gray-600 mb-4 max-w-2xl">
            Indicative rates for one-way transfers and round-trips. Final pricing depends on halts and seasonal demand.
          </p>
          <div className="bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-orange-100/40">
            <DataTable
              columns={["Vehicle Fleet", "Passenger Seating", "One-way Rate", "Round-trip Rate"]}
              rows={r.fares.map((f) => [f.vehicle, String(f.seats), f.oneWay, f.roundTrip])}
              verify={{ key: "fare", label: "Fares", value: "", verify: false }}
            />
          </div>
        </Section>
      </div>

      {/* Sightseeing Stops Section - Full Width Gradient */}
      {r.stops?.length ? (
        <div className="w-full bg-gradient-to-br from-orange-50/60 via-white to-amber-50/70 border-b border-orange-100/30 relative overflow-hidden py-10">
          {/* Rotating Compass SVG decoration */}
          <svg className="absolute -left-10 top-6 w-36 h-36 opacity-[0.08] text-orange-500 pointer-events-none animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animationDuration: '40s' }}>
            <circle cx="50" cy="50" r="40" />
            <line x1="50" y1="10" x2="50" y2="90" />
            <line x1="10" y1="50" x2="90" y2="50" />
            <path d="M 50,10 L 55,45 L 90,50 L 55,55 L 50,90 L 45,55 L 10,50 L 45,45 Z" fill="currentColor" fillOpacity="0.1" />
          </svg>

          <Section id="stops" title="Key sightseeing stops en route" wide={true} className="!py-0">
            <p className="text-sm text-gray-600 mb-3 max-w-2xl">
              With a private cab, you can request custom sightseeing stops along the road at these popular destinations:
            </p>
            <ul className="flex flex-wrap gap-2">
              {r.stops.map((s) => (
                <li key={s} className="px-3 py-1.5 rounded-full bg-white hover:bg-orange-50 border border-orange-100 text-xs font-semibold text-gray-700 shadow-2xs transition">
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      ) : null}

      <Faq items={r.faq} heading={`${r.origin} to ${r.destination} taxi FAQs`} />
      <CtaBand context={`${r.origin} to ${r.destination} taxi`} title="Book this route" subtitle="Get a firm one-way or round-trip fare." />
      <RelatedLinks links={related} />

      <JsonLd
        data={serviceSchema({
          name: r.h1,
          description: r.answer_first,
          path: `/${cabRoute}/`,
          areaServed: `${r.origin}, ${r.destination}`,
        })}
      />
    </PageShell>
  );
}
