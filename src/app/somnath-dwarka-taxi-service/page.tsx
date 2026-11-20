import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, taxiServiceSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { cabPath } from "@/src/lib/seed/cabs";
import { getPublishedTaxis } from "@/src/lib/content";
import { cabRouteFromCms, vehicleFromCms } from "@/src/utils/cabFromCms";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { RouteCardGrid, VehicleCardGrid, AirportCardGrid } from "@/src/components/taxi/TaxiCardGrids";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { getDataset } from "@/src/lib/datasets/store";
import { AIRPORT_TAXIS_DATASET } from "@/src/lib/cms-groups/taxi";
import { plain } from "@/src/lib/pages/rich";
import { taxiRich } from "@/src/components/taxi/TaxiRich";
import { TAXI_HUB_PAGE } from "./content";
import { Sparkles, Compass, Shield, ArrowRight, ReceiptText, Check, X, Star } from "lucide-react";

const PATH = TAXI_HUB_PAGE.path;
/* Copy lives in ./content.ts (from src/config/taxiHub.ts) and is editable through the CMS; a save refreshes this page at once. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const c = await getPageContent(TAXI_HUB_PAGE);
  return buildMetadata({ title: plain(c.titleTag), description: plain(c.metaDescription), path: PATH });
}

const card =
  "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h2 = "text-2xl sm:text-3xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-7 w-1 rounded-full bg-orange-500 inline-block" />;

export default async function CabHubPage() {
  const [c, airports] = await Promise.all([getPageContent(TAXI_HUB_PAGE), getDataset(AIRPORT_TAXIS_DATASET)]);
  /**
   * Routes and vehicles come from the CMS (Content → Cab routes & vehicles).
   * Distances, drive times, en-route stops, seats and luggage are all editable
   * there; only the surrounding argument is fixed in src/config/taxiHub.ts.
   */
  const docs = (await getPublishedTaxis()) as Record<string, unknown>[];
  const routes = docs.filter((d) => d.kind !== "vehicle").map(cabRouteFromCms);
  const vehicles = docs.filter((d) => d.kind === "vehicle").map(vehicleFromCms);
  const vehicleDocs = docs.filter((d) => d.kind === "vehicle");

  const routeRows = routes.map((r) => [
    `${r.origin} to ${r.destination}`,
    r.distance,
    r.duration,
    r.stops?.join(", ") || "—",
  ]);

  // Luggage is a CMS field; fall back to a dash rather than inventing a capacity.
  const vehicleRows = vehicles.map((v, i) => [
    v.vehicle_name,
    `${v.seats} seats`,
    String(vehicleDocs[i]?.luggage || "—"),
    v.suitable_for,
  ]);

  const airportRows = airports.map((a) => [
    a.airportName,
    a.serves,
    `${a.distance}, ${a.duration}`,
  ]);

  const related = buildRelatedLinks({
    self: PATH,
    money: "packages",
    siblings: [
      ...routes.slice(0, 2).map((r) => ({
        target: cabPath(r.slug),
        anchor: `${r.origin} to ${r.destination} taxi`,
        type: "sibling" as const,
      })),
      { target: "/plan/dwarka-to-somnath-distance/", anchor: "Dwarka to Somnath distance", type: "sibling" },
    ],
  });

  const crumbs = [{ name: "Home", path: "/" }, { name: "Taxi service", path: PATH }];

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title={c.h1}
        description={c.quickAnswer}
        breadcrumbs={crumbs}
        ctaContext={c.h1}
        distance={c.hero.distance}
        duration={c.hero.duration}
      />

      {/* ── At a glance ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{c.atAGlanceHeading}</h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.atAGlance.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-orange-100/60 bg-gradient-to-r from-orange-50/30 via-white to-transparent p-4"
              >
                <dt className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{f.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-slate-800 leading-snug">{f.value}</dd>
                {"note" in f && f.note ? (
                  <dd className="mt-1 text-xs text-slate-500">{f.note}</dd>
                ) : null}
              </div>
            ))}
          </dl>
          <p className="mt-6 text-slate-600 leading-relaxed">{taxiRich(c.intro)}</p>
        </div>
      </Section>

      {/* ── Plan the whole yatra ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{c.wholeYatra.heading}</h2>
          {c.wholeYatra.body.map((p, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-3 last:mb-0">
              {taxiRich(p)}
            </p>
          ))}
        </div>
      </Section>

      {/* ── Routes ── */}
      <div className="w-full bg-gradient-to-br from-amber-50/25 via-white to-orange-50/20 border-y border-orange-100/30 relative overflow-hidden py-14 sm:py-16">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <svg className="absolute right-0 top-6 w-72 h-44 opacity-[0.14] text-orange-500 pointer-events-none hidden md:block" viewBox="0 0 200 100" fill="none">
          <path d="M 0,50 Q 50,20 100,50 T 200,50" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 8" />
          <circle cx="100" cy="50" r="4.5" fill="currentColor" />
        </svg>

        <Section id="routes" wide className="!py-0 relative z-10">
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-850">
                <Compass size={11} className="text-orange-500 animate-pulse" />
                {c.routesEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-black text-[#2d1b10] tracking-tight sm:text-4xl">
                {c.routes.heading}
              </h2>
              <p className="mt-2 text-sm text-gray-650 leading-relaxed">{taxiRich(c.routes.intro)}</p>
            </div>

            <Link
              href="/somnath-dwarka-taxi-service/fare-rate-card/"
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md"
            >
              <ReceiptText size={16} className="text-orange-500" />
              {c.rateCardLinkLabel}
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <RouteCardGrid routes={routes} />

          <div className="mt-8 bg-white/75 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
            <DataTable
              columns={["Route", "Distance", "Drive time", "En-route darshan"]}
              rows={routeRows}
            />
          </div>
        </Section>
      </div>

      {/* ── Vehicles ── */}
      <div className="w-full bg-gradient-to-br from-orange-50/20 via-white to-amber-50/25 border-b border-orange-100/30 relative overflow-hidden py-14 sm:py-16">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ea580c 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <svg className="absolute -left-12 top-12 w-48 h-48 opacity-[0.08] text-orange-500 pointer-events-none hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="40" />
          <line x1="50" y1="10" x2="50" y2="90" />
          <line x1="10" y1="50" x2="90" y2="50" />
        </svg>

        <Section id="vehicles" wide className="!py-0 relative z-10">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-850">
              <Shield size={11} className="text-orange-500" />
              {c.vehiclesEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#2d1b10] tracking-tight sm:text-4xl">
              {c.vehicles.heading}
            </h2>
            <p className="mt-2 text-sm text-gray-650 leading-relaxed">{taxiRich(c.vehicles.intro)}</p>
          </div>

          <VehicleCardGrid vehicles={vehicles} hubPath={PATH} cards={c.vehicleCards} cardDefault={c.vehicleCardDefault} />

          <div className="mt-8 bg-white/75 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
            <DataTable columns={["Vehicle", "Seats", "Luggage", "Best suited for"]} rows={vehicleRows} />
          </div>
        </Section>
      </div>

      {/* ── Airports ── */}
      <div className="w-full bg-gradient-to-br from-sky-50/20 via-white to-orange-50/20 border-b border-orange-100/30 relative overflow-hidden py-14 sm:py-16">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        <Section id="airport" wide className="!py-0 relative z-10">
          <div className="mb-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-900">
              <Sparkles size={11} className="text-blue-500 animate-pulse" />
              {c.airportsEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-black text-[#2d1b10] tracking-tight sm:text-4xl">
              {c.airports.heading}
            </h2>
            <p className="mt-2 text-sm text-gray-650 leading-relaxed">{taxiRich(c.airports.intro)}</p>
          </div>

          <AirportCardGrid airports={airports} basePath={`${PATH}airport-taxi/`} />

          <div className="mt-8 bg-white/75 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-orange-100/60 shadow-[0_12px_36px_rgba(234,88,12,0.03)]">
            <DataTable columns={["Airport", "Transfers to", "Distance and time"]} rows={airportRows} />
          </div>
        </Section>
      </div>

      {/* ── What the fare includes ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{c.fareScope.heading}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-700">
                {c.fareScope.includedTitle}
              </p>
              <ul className="space-y-2.5">
                {c.fareScope.included.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-rose-700">
                {c.fareScope.excludedTitle}
              </p>
              <ul className="space-y-2.5">
                {c.fareScope.excluded.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                      <X size={11} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600 leading-relaxed">{taxiRich(c.fareScope.note)}</p>
        </div>
      </Section>

      {/* ── Why book with us ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{c.whyBook.heading}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.whyBook.points.map((p) => (
              <li
                key={p}
                className="flex gap-3 rounded-xl border border-orange-100/40 bg-orange-50/20 p-3.5 text-sm text-slate-700"
              >
                <Star size={14} className="mt-0.5 shrink-0 fill-orange-300 text-orange-500" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            {c.whyBook.author}{" "}
            {c.whyBook.authorLinks.map((l, i) => (
              <span key={l.href}>
                <Link href={l.href} className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800">
                  {l.label}
                </Link>
                {i < c.whyBook.authorLinks.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </Section>

      {/* ── Honest fit + before you travel ── */}
      <Section wide>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className={card}>
            <h2 className={h2}>{bar}{c.notForYou.heading}</h2>
            <ul className="space-y-3">
              {c.notForYou.items.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                    <X size={11} strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className={card}>
            <h2 className={h2}>{bar}{c.beforeYouTravel.heading}</h2>
            <ul className="space-y-3">
              {c.beforeYouTravel.items.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <Check size={13} className="mt-1 shrink-0 text-orange-500" strokeWidth={3} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── How to book ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{c.howToBook.heading}</h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {c.howToBook.steps.map((s, i) => (
              <li key={s} className="rounded-xl border border-orange-100/60 bg-orange-50/20 p-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-black text-white">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Faq items={[...c.faq]} heading={c.faqHeading} />

      {/* ── Keep planning ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{c.keepPlanning.heading}</h2>
          <p className="text-slate-600 leading-relaxed">{taxiRich(c.keepPlanning.intro)}</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {c.keepPlanning.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-800 transition hover:border-orange-300 hover:bg-orange-50"
              >
                {l.label}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        context="Somnath Dwarka taxi booking"
        title={c.cta.heading}
        subtitle={c.cta.subtitle}
      />
      <RelatedLinks links={related} />

      <JsonLd
        data={taxiServiceSchema({
          name: c.h1,
          serviceType: "Pilgrimage cab and airport transfer service",
          path: PATH,
          areaServed: "Saurashtra, Gujarat, India",
          catalogName: "Saurashtra pilgrimage routes",
          // Offers track the CMS, so a route added in the admin appears here too.
          offers: routes.map((r) => ({
            name: `${r.origin} to ${r.destination} taxi`,
            path: cabPath(r.slug),
          })),
        })}
      />
      {/*
        No BreadcrumbList or FAQPage block here: PageShell already emits the
        breadcrumb from `crumbs`, and <Faq> emits FAQPage from its own items.
        Adding them again put two of each in the page, which is a duplicate-schema
        warning in Search Console rather than extra coverage.
      */}
    </PageShell>
  );
}
