import Image from "@/src/components/shared/Img";
import Link from "next/link";
import { serviceSchema, localUnitProvider } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { CAB_HUB, cabPath, type SeedVehicle } from "@/src/lib/seed/cabs";
import { buildRelatedLinks } from "@/src/lib/links";
import TaxiHero from "@/src/components/taxi/TaxiHero";
import { OPERATOR } from "@/src/config/taxiSpokes";
import type { VehicleCopyItem } from "@/src/lib/cms-groups/taxi";
import type { VEHICLE_TEMPLATE_DEFAULTS } from "@/src/app/somnath-dwarka-taxi-service/[slug]/content";
import { fillSlots, taxiRich } from "@/src/components/taxi/TaxiRich";
import { Check, X, Star, ArrowRight, Phone } from "lucide-react";

/**
 * Vehicle page body (/somnath-dwarka-taxi-service/{vehicle}/).
 *
 * Same split as the route spokes: seats, luggage, "best suited for", rates and
 * the photo come from the CMS record; the prose is `copy` (its
 * site_taxi_vehicle_copy item, defaulting to VEHICLE_COPY in
 * src/config/taxiSpokes.ts) and the blocks shared by every vehicle page are `t`
 * (the "taxi-vehicle-template" page copy). A vehicle with no copy item still
 * renders the data-driven sections.
 */

const card =
  "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h2 = "text-2xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />;

export default function VehiclePage({
  slug,
  vehicle: v,
  copy,
  t,
  siblings,
}: {
  slug: string;
  vehicle: SeedVehicle;
  copy: VehicleCopyItem | null;
  t: typeof VEHICLE_TEMPLATE_DEFAULTS;
  /** The live vehicle list, for the related links. */
  siblings: SeedVehicle[];
}) {
  const related = buildRelatedLinks({
    self: cabPath(slug),
    pillar: { target: CAB_HUB, anchor: "all cabs & fares" },
    money: "packages",
    siblings: siblings.filter((x) => x.slug !== slug).map((x) => ({
      target: cabPath(x.slug),
      anchor: `${x.vehicle_name} fare`,
      type: "sibling" as const,
    })),
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Taxi service", path: CAB_HUB },
    { name: copy?.crumbLabel ?? v.vehicle_name, path: cabPath(slug) },
  ];

  // Rates are CMS data and ship as "₹—" placeholders; show the table only once a
  // real figure exists rather than a column of dashes.
  const hasRealRates = v.fares?.some((f) => /\d/.test(f.rate || ""));

  return (
    <PageShell crumbs={crumbs} flushHero>
      <TaxiHero
        title={copy?.h1 ?? v.h1}
        description={copy?.quickAnswer ?? v.answer_first}
        breadcrumbs={crumbs}
        badge="Vehicle Fleet"
        ctaContext={`${v.vehicle_name} for Somnath Dwarka`}
        vehicleName={v.vehicle_name}
        seats={v.seats}
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

      {/* ── Features + photo ── */}
      {copy ? (
        <Section wide>
          <div className={`grid gap-6 ${v.image ? "lg:grid-cols-[1fr_1fr]" : ""}`}>
            <div className={card}>
              <h2 className={h2}>{bar}{copy.features.heading}</h2>
              <ul className="space-y-3">
                {copy.features.items.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                    <Check size={13} className="mt-1 shrink-0 text-orange-500" strokeWidth={3} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            {v.image ? (
              <figure className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
                <Image
                  src={v.image.src}
                  alt={v.image.alt}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-2.5 text-xs font-semibold text-white">
                  {fillSlots(t.imageCaption, { vehicle: v.vehicle_name, seats: v.seats })}
                </figcaption>
              </figure>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* ── Who it suits + rates ── */}
      {copy ? (
        <Section wide>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={card}>
              <h2 className={h2}>{bar}{copy.whoItSuits.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{taxiRich(copy.whoItSuits.body)}</p>
            </div>
            <div className={card}>
              <h2 className={h2}>{bar}{copy.ratesBooking.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{taxiRich(copy.ratesBooking.body)}</p>
              <p className="mt-4 text-sm">
                <Link
                  href={`${CAB_HUB}fare-rate-card/`}
                  className="font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-800"
                >
                  {t.rateCardLinkLabel}
                </Link>
              </p>
            </div>
          </div>
        </Section>
      ) : null}

      {/* ── Popular routes, and CMS rates where real ── */}
      <Section id="fares" wide>
        <div className={card}>
          <h2 className={h2}>{bar}{copy?.popularRoutes.heading ?? t.faresHeadingFallback}</h2>
          {copy ? <p className="text-slate-600 leading-relaxed">{taxiRich(copy.popularRoutes.body)}</p> : null}

          {hasRealRates ? (
            <div className="mt-6">
              <DataTable
                columns={["Route / Basis", "Indicative rate"]}
                rows={v.fares.map((f) => [f.route, f.rate])}
              />
            </div>
          ) : null}
        </div>
      </Section>

      {/* ── Booking scope ── */}
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
                  {[copy.includedFirst, ...t.scope.included].filter(Boolean).map((x) => (
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
                  {[...t.scope.excluded, copy.excludedExtra].filter(Boolean).map((x) => (
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

      {/* ── Honest fit ── */}
      {copy ? (
        <Section wide>
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
        </Section>
      ) : null}

      <Faq items={copy?.faq?.length ? [...copy.faq] : v.faq} heading={fillSlots(t.faqHeading, { vehicle: v.vehicle_name, seats: v.seats })} />

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
        context={`${v.vehicle_name} for Somnath Dwarka`}
        title={t.ctaBand.title}
        subtitle={t.ctaBand.subtitle}
      />
      <RelatedLinks links={related} />

      {/* BreadcrumbList comes from PageShell, FAQPage from <Faq>. */}
      <JsonLd
        data={serviceSchema({
          name: copy?.h1 ?? v.h1,
          description: copy?.quickAnswer ?? v.answer_first,
          path: cabPath(slug),
          id: `${cabPath(slug)}#service`,
          serviceType: "Car rental with driver",
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
