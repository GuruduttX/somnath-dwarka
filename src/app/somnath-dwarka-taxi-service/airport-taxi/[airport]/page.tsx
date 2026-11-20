import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, serviceSchema, localUnitProvider } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_AIRPORT_TAXIS } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { OPERATOR } from "@/src/config/taxiSpokes";
import { getDataset, getDatasetItem } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { plain } from "@/src/lib/pages/rich";
import { AIRPORT_COPY_DATASET, AIRPORT_TAXIS_DATASET } from "@/src/lib/cms-groups/taxi";
import { fillSlots, taxiRich } from "@/src/components/taxi/TaxiRich";
import { AIRPORT_TEMPLATE_PAGE } from "../content";
import { Check, X, Star, ArrowRight, Phone } from "lucide-react";

const HUB = "/somnath-dwarka-taxi-service/";
const BASE = `${HUB}airport-taxi/`;
export const revalidate = 3600;

type Params = { params: Promise<{ airport: string }> };

const card =
  "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h2 = "text-2xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />;

/* Prerenders the code airports; ones added through the CMS (site_airport_taxis) render on first visit. */
export function generateStaticParams() {
  return SEED_AIRPORT_TAXIS.map((a) => ({ airport: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { airport } = await params;
  const a = await getDatasetItem(AIRPORT_TAXIS_DATASET, airport);
  if (!a) return {};
  const copy = await getDatasetItem(AIRPORT_COPY_DATASET, airport);
  return buildMetadata({
    title: plain(copy?.titleTag ?? a.title),
    description: plain(copy?.metaDescription ?? a.answer_first),
    path: `${BASE}${airport}/`,
  });
}

/**
 * Airport transfer page.
 *
 * Prose is the airport's site_taxi_airport_copy item (defaulting to AIRPORT_COPY
 * in src/config/taxiSpokes.ts); the airport's own facts (name, what it serves,
 * distance, duration, fares) are its site_airport_taxis item (defaulting to
 * src/lib/seed/cabs.ts) — the taxi model's `kind` enum allows only route and
 * vehicle. Blocks shared by every airport page are the "taxi-airport-template"
 * page copy. An airport with no copy item still renders the data-driven sections.
 */
export default async function AirportTaxiPage({ params }: Params) {
  const { airport } = await params;
  const [a, copy, t, airports] = await Promise.all([
    getDatasetItem(AIRPORT_TAXIS_DATASET, airport),
    getDatasetItem(AIRPORT_COPY_DATASET, airport),
    getPageContent(AIRPORT_TEMPLATE_PAGE),
    getDataset(AIRPORT_TAXIS_DATASET),
  ]);
  if (!a) notFound();

  const related = buildRelatedLinks({
    self: `${BASE}${airport}/`,
    pillar: { target: HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: airports.filter((x) => x.slug !== airport).map((x) => ({
      target: `${BASE}${x.slug}/`,
      anchor: `${x.airport} airport taxi`,
      type: "sibling" as const,
    })),
  });

  // The SOP breadcrumb runs four deep: Home > Taxi service > Airport taxi > City.
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: HUB },
    { name: "Airport taxi", path: BASE },
    { name: copy?.crumbLabel ?? a.airport, path: `${BASE}${airport}/` },
  ];

  // Transfer fares ship as "₹—" placeholders; show the table only once a real
  // figure exists rather than a column of dashes.
  const hasRealFares = a.fares?.some((f) => /\d/.test(f.rate || ""));

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title={copy?.h1 ?? a.h1}
        description={copy?.quickAnswer ?? a.answer_first}
        breadcrumbs={crumbs}
        badge="Airport Transfer"
        ctaContext={`${a.airport} airport taxi`}
        airportName={a.airportName}
        serves={a.serves}
        distance={a.distance}
        duration={a.duration}
        verified={a.verified}
      />

      {/* ── At a glance ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}{t.atAGlanceHeading}</h2>
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
            <p className="mt-6 text-slate-600 leading-relaxed">{taxiRich(copy.intro)}</p>
          </div>
        </Section>
      ) : null}

      {/* ── Meet and greet + transfers ── */}
      {copy ? (
        <Section wide>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h2 className={h2}>{bar}{fillSlots(t.meetAndGreetHeading, { airport: a.airport })}</h2>
              <p className="text-slate-600 leading-relaxed">{taxiRich(t.meetAndGreetBody)}</p>
            </div>
            <div className={card}>
              <h2 className={h2}>{bar}{copy.transfers.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{taxiRich(copy.transfers.body)}</p>
            </div>
          </div>
        </Section>
      ) : null}

      {/* ── Vehicles and fares ── */}
      <Section id="fares" wide>
        <div className={card}>
          <h2 className={h2}>{bar}{t.vehiclesHeading}</h2>
          <p className="text-slate-600 leading-relaxed">
            {copy ? taxiRich(t.vehiclesIntro) : t.vehiclesIntroFallback}
          </p>

          {hasRealFares ? (
            <div className="mt-6">
              <DataTable
                columns={["Vehicle", "Seats", "Indicative fare"]}
                rows={a.fares.map((f) => [f.vehicle, String(f.seats), f.rate])}
                verify={{ key: "fare", label: "Fares", value: "", verify: a.verified }}
              />
            </div>
          ) : null}

          <p className="mt-4 text-sm">
            <Link
              href={`${HUB}fare-rate-card/`}
              className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
            >
              {t.rateCardLinkLabel}
            </Link>
          </p>
        </div>
      </Section>

      {/* ── Transfer scope ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}{t.scopeHeading}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-700">
                  {t.scope.includedTitle}
                </p>
                <ul className="space-y-2.5">
                  {t.scope.included.map((x) => (
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
                  {t.scope.excludedTitle}
                </p>
                <ul className="space-y-2.5">
                  {t.scope.excluded.map((x) => (
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
              {t.author.line}{" "}
              {t.author.links.map((l, i) => (
                <span key={l.href}>
                  <Link
                    href={l.href}
                    className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
                  >
                    {l.label}
                  </Link>
                  {i < t.author.links.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          </div>
        </Section>
      ) : null}

      {/* ── Honest fit + before you fly ── */}
      {copy ? (
        <Section wide>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h2 className={h2}>{bar}{t.notForYouHeading}</h2>
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
              <h2 className={h2}>{bar}{t.beforeYouFlyHeading}</h2>
              <ul className="space-y-3">
                {copy.beforeYouFly.map((x) => (
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

      <Faq items={copy?.faq?.length ? [...copy.faq] : a.faq} heading={fillSlots(t.faqHeading, { airport: a.airport })} />

      {/* ── Keep planning ── */}
      {copy ? (
        <Section wide>
          <div className={card}>
            <h2 className={h2}>{bar}{t.keepPlanningHeading}</h2>
            <p className="text-slate-600 leading-relaxed">{taxiRich(copy.keepPlanning.intro)}</p>
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
            <p className="text-slate-600 leading-relaxed">{taxiRich(copy.cta.body)}</p>
            <a
              href={`tel:${OPERATOR.phone}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              <Phone size={15} />
              {t.callLabel} {OPERATOR.phone}
            </a>
          </div>
        </Section>
      ) : null}

      <CtaBand
        context={`${a.airport} airport taxi`}
        title={t.ctaBand.title}
        subtitle={t.ctaBand.subtitle}
      />
      <RelatedLinks links={related} />

      {/* BreadcrumbList comes from PageShell, FAQPage from <Faq>. */}
      <JsonLd
        data={serviceSchema({
          name: copy?.h1 ?? a.h1,
          description: copy?.quickAnswer ?? a.answer_first,
          path: `${BASE}${airport}/`,
          id: `${BASE}${airport}/#service`,
          serviceType: "Airport transfer with meet and greet",
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
