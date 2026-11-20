import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, serviceSchema, localUnitProvider } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { CAB_HUB, cabPath } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import { OPERATOR } from "@/src/config/taxiSpokes";
import { getDataset } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { plain } from "@/src/lib/pages/rich";
import { RATE_CARD_DATASET } from "@/src/lib/cms-groups/taxi";
import { taxiRich } from "@/src/components/taxi/TaxiRich";
import { FARE_RATE_CARD_PAGE } from "./content";
import { Check, X, Star, ArrowRight, Phone } from "lucide-react";

/**
 * /somnath-dwarka-taxi-service/fare-rate-card/ — the "taxi rates per km" head.
 * A static folder, so it takes precedence over the sibling [slug] segment.
 *
 * The copy is ./content.ts (from src/config/taxiFares.ts), editable through the
 * CMS. The route rows are the site_taxi_rate_card dataset, which is also what the
 * fare calculator reads, so the tool and this page can never disagree.
 */
const PATH = `${CAB_HUB}fare-rate-card/`;

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const C = await getPageContent(FARE_RATE_CARD_PAGE);
  return buildMetadata({ title: plain(C.titleTag), description: plain(C.metaDescription), path: PATH });
}

const card =
  "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h2 = "text-2xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />;

export default async function FareRateCardPage() {
  const [C, rateRoutes] = await Promise.all([getPageContent(FARE_RATE_CARD_PAGE), getDataset(RATE_CARD_DATASET)]);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: CAB_HUB },
    { name: C.crumbLabel, path: PATH },
  ];

  const related = buildRelatedLinks({
    self: PATH,
    pillar: { target: CAB_HUB, anchor: "all taxi routes & fares" },
    money: "packages",
    siblings: rateRoutes.slice(0, 3).map((r) => ({
      target: cabPath(r.slug),
      anchor: `${r.label} taxi`,
      type: "sibling" as const,
    })),
  });

  return (
    <PageShell crumbs={crumbs}>
      <Section wide>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#2d1b10]">{C.h1}</h1>
        <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">{C.quickAnswer}</p>
      </Section>

      {/* ── At a glance ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.atAGlanceHeading}</h2>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {C.atAGlance.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-orange-100/60 bg-gradient-to-r from-orange-50/30 via-white to-transparent p-4"
              >
                <dt className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{f.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-slate-800 leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-slate-600 leading-relaxed">{taxiRich(C.intro)}</p>
        </div>
      </Section>

      {/* ── How fares work ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.howFaresWork.heading}</h2>
          <ul className="space-y-3">
            {C.howFaresWork.points.map((x) => (
              <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                <Check size={13} className="mt-1 shrink-0 text-orange-500" strokeWidth={3} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── Fares by route ── */}
      <Section id="by-route" wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.routes.heading}</h2>
          <p className="mb-5 text-slate-600 leading-relaxed">{taxiRich(C.routes.intro)}</p>
          <DataTable
            columns={["Route", "Distance", "Fare"]}
            rows={rateRoutes.map((r) => [
              r.label,
              r.distance,
              // Only one leg carries a quoted price; the rest say so plainly
              // rather than showing a number that was never agreed.
              r.fare || C.noFareLabel,
            ])}
          />
          <p className="mt-4 text-sm text-slate-500 leading-relaxed">{taxiRich(C.disclaimer)}</p>
        </div>
      </Section>

      {/* ── Fares by vehicle ── */}
      <Section id="by-vehicle" wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.vehicles.heading}</h2>
          <p className="mb-5 text-slate-600 leading-relaxed">{taxiRich(C.vehicles.intro)}</p>
          <DataTable
            columns={["Vehicle", "Seats", "Priced"]}
            rows={C.vehicleRows.map((v) => [v.vehicle, v.seats, v.priced])}
          />
          <div className="mt-4 flex flex-wrap gap-2.5">
            {C.vehicleRows.map((v) => (
              <Link
                key={v.slug}
                href={cabPath(v.slug)}
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-800 transition hover:border-orange-300 hover:bg-orange-50"
              >
                {v.vehicle}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Fare scope ── */}
      <Section id="extras" wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.scope.heading}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-700">
                {C.scope.includedTitle}
              </p>
              <ul className="space-y-2.5">
                {C.scope.included.map((x) => (
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
                {C.scope.excludedTitle}
              </p>
              <ul className="space-y-2.5">
                {C.scope.excluded.map((x) => (
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

      {/* ── Why book ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.whyBook.heading}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {C.whyBook.points.map((pt) => (
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
            {C.whyBook.author}{" "}
            {C.authorLinks.map((l, i) => (
              <span key={l.href}>
                <Link
                  href={l.href}
                  className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
                >
                  {l.label}
                </Link>
                {i < C.authorLinks.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>
      </Section>

      <Faq items={[...C.faq]} heading={C.faqHeading} />

      {/* ── Keep planning ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.keepPlanningHeading}</h2>
          <p className="text-slate-600 leading-relaxed">{taxiRich(C.keepPlanning.intro)}</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {C.keepPlanning.links.map((l) => (
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

      {/* ── Get your fare ── */}
      <Section wide>
        <div className={card}>
          <h2 className={h2}>{bar}{C.cta.heading}</h2>
          <p className="text-slate-600 leading-relaxed">{taxiRich(C.cta.body)}</p>
          <a
            href={`tel:${OPERATOR.phone}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <Phone size={15} />
            {C.callLabel} {OPERATOR.phone}
          </a>
        </div>
      </Section>

      <CtaBand context="Somnath Dwarka taxi fare" title={C.ctaBand.title} subtitle={C.ctaBand.subtitle} />
      <RelatedLinks links={related} />

      {/* BreadcrumbList comes from PageShell, FAQPage from <Faq>. */}
      <JsonLd
        data={serviceSchema({
          name: C.h1,
          description: C.quickAnswer,
          path: PATH,
          id: `${PATH}#service`,
          serviceType: "Taxi fare and rate card",
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
