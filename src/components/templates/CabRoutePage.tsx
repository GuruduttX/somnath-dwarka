import Link from "next/link";
import { taxiServiceSchema, localUnitProvider } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_CAB_ROUTES, CAB_HUB, cabPath, type SeedCabRoute } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import {
  spokeCopyFor,
  SPOKE_VEHICLES,
  SPOKE_FARE_SCOPE,
  SPOKE_AUTHOR,
  OPERATOR,
} from "@/src/config/taxiSpokes";
import { Check, X, Star, ArrowRight, Phone } from "lucide-react";

/**
 * Cab route page body.
 *
 * Data — distance, drive time, en-route stops, fares — comes from the CMS record
 * passed in as `route`. Prose comes from src/config/taxiSpokes.ts, keyed by slug.
 * A route with no config entry still renders the data-driven sections, so an
 * unbriefed route added in the admin produces a valid page rather than a blank.
 */
export type CabRoute = SeedCabRoute;

const card =
  "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h2 = "text-2xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />;

export default function CabRoutePage({ slug, route: r }: { slug: string; route: CabRoute }) {
  const copy = spokeCopyFor(slug);

  const related = buildRelatedLinks({
    self: cabPath(slug),
    pillar: { target: CAB_HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: SEED_CAB_ROUTES.filter((x) => x.slug !== slug).map((x) => ({
      target: cabPath(x.slug),
      anchor: `${x.origin} to ${x.destination} taxi`,
      type: "sibling" as const,
    })),
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: CAB_HUB },
    { name: copy?.crumbLabel ?? `${r.origin} to ${r.destination}`, path: cabPath(slug) },
  ];

  // Fares are CMS data. Every seeded fare is a "₹—" placeholder, so the table is
  // suppressed until a real figure is entered rather than showing a row of dashes.
  const hasRealFares = r.fares?.some(
    (f) => /\d/.test(f.oneWay || "") || /\d/.test(f.roundTrip || ""),
  );

  const faqItems = copy?.faq ? [...copy.faq] : r.faq;

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title={copy?.h1 ?? r.h1}
        description={copy?.quickAnswer ?? r.answer_first}
        breadcrumbs={crumbs}
        badge="Route Taxi"
        ctaContext={`${r.origin} to ${r.destination} taxi`}
        distance={r.distance}
        duration={r.duration}
        verified={r.verified}
      />

      {/* ── At a glance ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}At a glance</h2>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {copy.atAGlance.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-orange-100/60 bg-gradient-to-r from-orange-50/30 via-white to-transparent p-4"
                >
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{f.label}</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-slate-800 leading-snug">{f.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-slate-600 leading-relaxed">{copy.intro}</p>
          </div>
        </Section>
      ) : null}

      {/* ── The drive + trip types ── */}
      {copy ? (
        <Section wide>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h2 className={h2}>{bar}{copy.driveSection.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{copy.driveSection.body}</p>
            </div>
            <div className={card}>
              <h2 className={h2}>{bar}{copy.tripTypes.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{copy.tripTypes.body}</p>
            </div>
          </div>
        </Section>
      ) : null}

      {/* ── Vehicles, and fares where the CMS carries real ones ── */}
      <Section id="fares" wide>
        <div className={card}>
          <h2 className={h2}>{bar}Vehicles and fares</h2>
          {copy ? <p className="mb-5 text-slate-600 leading-relaxed">{copy.vehiclesIntro}</p> : null}

          <DataTable
            columns={["Vehicle", "Seats", "Best suited for"]}
            rows={SPOKE_VEHICLES.map((v) => [v.vehicle, v.seats, v.suited])}
          />

          {hasRealFares ? (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-700">Indicative fares for this leg</p>
              <DataTable
                columns={["Vehicle", "Seats", "One way", "Round trip"]}
                rows={r.fares.map((f) => [f.vehicle, String(f.seats), f.oneWay, f.roundTrip])}
                verify={{ key: "fare", label: "Fares", value: "", verify: r.verified }}
              />
            </div>
          ) : null}

          <p className="mt-4 text-sm">
            <Link
              href={`${CAB_HUB}fare-rate-card/`}
              className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
            >
              See every price on the fare rate card
            </Link>
          </p>
        </div>
      </Section>

      {/* ── En-route stops (CMS) ── */}
      {r.stops?.length ? (
        <Section id="stops" wide>
          <div className={card}>
            <h2 className={h2}>{bar}Stops en route</h2>
            <p className="mb-4 text-slate-600 leading-relaxed">
              With a private cab you can build these in. Tell us at booking and the driver plans the timing around them.
            </p>
            <ul className="flex flex-wrap gap-2">
              {r.stops.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-orange-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}

      {/* ── Fare scope ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}What your fare includes, and what it does not</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-700">
                  {SPOKE_FARE_SCOPE.includedTitle}
                </p>
                <ul className="space-y-2.5">
                  {[...SPOKE_FARE_SCOPE.included, ...copy.faresIncluded].map((x) => (
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
                  {SPOKE_FARE_SCOPE.excludedTitle}
                </p>
                <ul className="space-y-2.5">
                  {[...SPOKE_FARE_SCOPE.excluded, ...copy.faresExcluded].map((x) => (
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
          </div>
        </Section>
      ) : null}

      {/* ── Why book ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}{copy.whyBook.heading}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {copy.whyBook.points.map((pt) => (
                <li
                  key={pt}
                  className="flex gap-3 rounded-xl border border-orange-100/40 bg-orange-50/20 p-3.5 text-sm text-slate-700"
                >
                  <Star size={14} className="mt-0.5 shrink-0 fill-orange-300 text-orange-500" />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-slate-600 leading-relaxed">
              {SPOKE_AUTHOR.line}{" "}
              {SPOKE_AUTHOR.links.map((l, i) => (
                <span key={l.href}>
                  <Link
                    href={l.href}
                    className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
                  >
                    {l.label}
                  </Link>
                  {i < SPOKE_AUTHOR.links.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </Section>
      ) : null}

      {/* ── Honest fit + before you travel ── */}
      {copy ? (
        <Section wide>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h2 className={h2}>{bar}This trip may not be the right fit if</h2>
              <ul className="space-y-3">
                {copy.notForYou.map((x) => (
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
              <h2 className={h2}>{bar}Before you travel</h2>
              <ul className="space-y-3">
                {copy.beforeYouTravel.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <Check size={13} className="mt-1 shrink-0 text-orange-500" strokeWidth={3} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ) : null}

      <Faq items={faqItems} heading={`${r.origin} to ${r.destination} taxi FAQs`} />

      {/* ── Keep planning ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}Keep planning</h2>
            <p className="text-slate-600 leading-relaxed">{copy.keepPlanning.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {copy.keepPlanning.links.map((l) => (
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
      ) : null}

      {/* ── Book ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}{copy.cta.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{copy.cta.body}</p>
            <a
              href={`tel:${OPERATOR.phone}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <Phone size={15} />
              Call {OPERATOR.phone}
            </a>
          </div>
        </Section>
      ) : null}

      <CtaBand
        context={`${r.origin} to ${r.destination} taxi`}
        title="Book this route"
        subtitle="Get a firm one-way or round-trip fare."
      />
      <RelatedLinks links={related} />

      {/*
        BreadcrumbList comes from PageShell and FAQPage from <Faq>, so neither is
        repeated here — two of either is a duplicate-schema warning, not coverage.
      */}
      <JsonLd
        data={taxiServiceSchema({
          name: copy?.h1 ?? r.h1,
          serviceType: "Private one-way and round-trip cab",
          path: cabPath(slug),
          areaServed: "Saurashtra, Gujarat, India",
          provider: localUnitProvider({
            name: OPERATOR.localUnit,
            parent: OPERATOR.parent,
            parentSlogan: OPERATOR.parentSlogan,
            telephone: OPERATOR.phone,
            foundingDate: OPERATOR.foundingDate,
            founder: OPERATOR.founder,
            languages: OPERATOR.languages,
            gstin: OPERATOR.gstin,
          }),
        })}
      />
    </PageShell>
  );
}
