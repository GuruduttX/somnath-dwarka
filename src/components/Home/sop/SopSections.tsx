/**
 * Home page body sections, in the home SOP's scroll order (§2–§13, §15).
 *
 * All server components: the copy is static, lives in config/homePage.ts, and
 * must be in the raw HTML for crawlers and answer engines. The only client
 * pieces are the tracked WhatsApp/call links.
 */
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarRange,
  Car,
  Check,
  Clock,
  Coffee,
  Hotel,
  IndianRupee,
  Landmark,
  MapPin,
  Phone,
  Plane,
  RefreshCw,
  ShieldCheck,
  Star,
  Train,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import TrackedLink from "@/src/components/Home/sop/TrackedLink";
import TwoStepEnquiry from "@/src/components/Home/sop/TwoStepEnquiry";
import { CONTACT, OPERATOR, telLink, waLink } from "@/src/config/site";
import { TESTIMONIALS } from "@/src/config/testimonials";
import {
  HOME_AT_A_GLANCE,
  HOME_BEST_TIME,
  HOME_BEST_TIME_LINKS,
  HOME_CONCERNS,
  HOME_EXCLUDED,
  HOME_EXCLUDED_NOTE,
  HOME_HOTELS,
  HOME_HOTELS_BUDGET_NOTE,
  HOME_HOTEL_PROMISE,
  HOME_INCLUDED,
  HOME_MONTH_SEASONS,
  HOME_ITINERARY,
  HOME_OPERATOR,
  HOME_PRICE_FROM,
  HOME_PRICE_COMPARE,
  HOME_REACH,
  HOME_SEASONS,
  HOME_TIERS,
  HOME_WA_TEXT,
  HOME_WHY_DIFFERENT,
  HOME_WHY_DIRECT,
  HOME_WHY_LOCAL_POINTS,
  inr,
} from "@/src/config/homePage";

/* --------------------------------- chrome --------------------------------- */

/** Same full-width gutters as the home discovery sections and package showcase. */
const FULL_WIDTH = "w-full px-4 sm:px-8 lg:px-16 xl:px-24";

/* ------------------------------- §2 trust strip ------------------------------ */

export function TrustStrip() {
  const items = [
    {
      Icon: MapPin,
      title: "Local team",
      detail: (
        <>
          Run by <strong className="font-semibold text-[#2D1B10]">{HOME_OPERATOR}</strong>, based in Dwarka
        </>
      ),
    },
    {
      Icon: Phone,
      title: "Call or WhatsApp",
      detail: (
        <a href={telLink()} className="font-semibold text-orange-700 underline-offset-2 hover:underline">
          {CONTACT.phoneDisplay}
        </a>
      ),
    },
    {
      Icon: BadgeCheck,
      title: "GST registered",
      detail: <span className="font-semibold text-[#2D1B10]">{OPERATOR.gstin}</span>,
    },
    {
      Icon: ShieldCheck,
      title: "No hidden charges",
      detail: <>One coordinator for your whole trip</>,
    },
  ];

  return (
    <section id="trust-strip" aria-label="Who runs this tour" className="px-4 pt-2 pb-2">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-orange-100 bg-orange-100 lg:grid-cols-4">
        {items.map(({ Icon, title, detail }) => (
          <li
            key={title}
            className="flex flex-col items-center gap-2 bg-white px-3 py-3.5 text-center sm:flex-row sm:gap-2.5 sm:px-4 sm:py-3 sm:text-left"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 ring-1 ring-orange-100 sm:h-8 sm:w-8 sm:ring-0">
              <Icon size={15} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-bold leading-tight text-[#2D1B10]">{title}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-slate-600 sm:text-[12.5px]">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------ §3 at a glance ------------------------------- */

const GLANCE_ICONS: Record<string, typeof Clock> = {
  Duration: Clock,
  "Cities covered": MapPin,
  Hotels: Hotel,
  Vehicle: Car,
  Meals: Coffee,
  "Guide and darshan": Landmark,
};

export function AtAGlance() {
  // The price row gets its own card; everything else sits in one divided panel.
  const facts = HOME_AT_A_GLANCE.filter((r) => r.label !== "Starting price");

  return (
    <section
      id="at-a-glance"
      aria-labelledby="at-a-glance-h"
      className={`scroll-mt-24 py-8 md:py-10 ${FULL_WIDTH}`}
    >
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">The package at a glance</p>
      <h2 id="at-a-glance-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
        Somnath Dwarka tour package at a glance
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
        The whole offer in a few seconds, so nobody has to hunt for the basics.
      </p>

      <div className="mt-6 grid gap-3 lg:grid-cols-4 lg:gap-4">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D1B10] to-[#4a2a17] p-5 text-white">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-orange-500/25 blur-2xl" aria-hidden="true" />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300">Starting price</p>
            <p className="mt-2 text-3xl font-bold leading-none">Rs {inr(HOME_PRICE_FROM)}</p>
            <p className="mt-2 text-[13px] leading-snug text-orange-100/80">
              Per person on twin-sharing, for the 2 nights and 3 days route
            </p>
          </div>
          <a
            href="#inclusions"
            className="relative mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-orange-300 hover:text-orange-200"
          >
            See what is included <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-orange-100 bg-orange-100 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
          {facts.map((r) => {
            const Icon = GLANCE_ICONS[r.label] ?? Check;
            return (
              <div key={r.label} className="flex gap-3 bg-white px-4 py-3.5 sm:py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[13.5px] font-bold text-[#2D1B10]">{r.label}</dt>
                  <dd className="mt-0.5 text-[13px] leading-snug text-slate-600">{r.detail}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}

/* --------------------------- §4 why it is different -------------------------- */

export function WhyDifferent() {
  return (
    <section
      id="why-different"
      aria-labelledby="why-different-h"
      className={`scroll-mt-24 bg-gradient-to-b from-orange-50/70 to-white py-10 md:py-14 ${FULL_WIDTH}`}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">Why book local</p>
          <h2 id="why-different-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            Why this package is different
          </h2>
          <span className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" aria-hidden="true" />
          <div className="mt-5 space-y-4 text-[15.5px] leading-[1.8] text-slate-700">
            {HOME_WHY_DIFFERENT.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-orange-100 bg-white p-5 sm:p-6">
            <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#2D1B10]">What local means on your trip</p>
            <ul className="mt-4 space-y-3">
              {HOME_WHY_LOCAL_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[14.5px] leading-snug text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D1B10] to-[#4a2a17] p-5 text-[14.5px] leading-relaxed text-orange-50/85 sm:p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/25 blur-2xl" aria-hidden="true" />
            <p className="relative">
              <strong className="font-semibold text-white">{HOME_WHY_DIRECT.lead}</strong>
              {HOME_WHY_DIRECT.rest}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------- §5 why the price is what it is ------------------- */

export function PriceJustification() {
  const cell = "border-b border-orange-100 px-5 py-3.5 align-top text-[14px] leading-snug";
  return (
    <section id="why-the-price" aria-labelledby="why-the-price-h" className={`scroll-mt-24 py-10 md:py-14 ${FULL_WIDTH}`}>
      <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">Value, not just the headline</p>
          <h2 id="why-the-price-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            Why the price is what it is
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-600">
          A cheaper number on another page is usually a different product. Here is what actually sits behind the price,
          compared with a typical budget quote for the same route, so you can judge value rather than only the headline
          figure.
        </p>
      </div>

      {/* Desktop: comparison table with the package column lifted out as a highlighted card. */}
      <table className="mt-7 hidden w-full border-separate border-spacing-0 md:table">
        <caption className="sr-only">This package compared with a typical budget quote</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[18%] px-5 pb-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              What matters
            </th>
            <th scope="col" className="px-5 pb-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Typical budget quote
            </th>
            <th
              scope="col"
              className="rounded-t-2xl bg-gradient-to-r from-orange-600 to-orange-500 px-5 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-white"
            >
              This package
            </th>
          </tr>
        </thead>
        <tbody>
          {HOME_PRICE_COMPARE.map((r, i) => {
            const last = i === HOME_PRICE_COMPARE.length - 1;
            return (
              <tr key={r.what}>
                <th scope="row" className={`${cell} text-left font-semibold text-[#2D1B10] ${last ? "border-b-0" : ""}`}>
                  {r.what}
                </th>
                <td className={`${cell} text-slate-500 ${last ? "border-b-0" : ""}`}>
                  <span className="flex items-start gap-2">
                    <X size={15} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                    {r.budget}
                  </span>
                </td>
                <td
                  className={`${cell} border-x border-orange-200 bg-orange-50 font-medium text-[#2D1B10] ${
                    last ? "rounded-b-2xl border-b border-b-orange-200" : ""
                  }`}
                >
                  <span className="flex items-start gap-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
                    {r.ours}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Phones: one compact card per row. */}
      <dl className="mt-6 divide-y divide-orange-100 overflow-hidden rounded-2xl border border-orange-100 bg-white md:hidden">
        {HOME_PRICE_COMPARE.map((r) => (
          <div key={r.what} className="px-4 py-3.5">
            <dt className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600">{r.what}</dt>
            <dd className="mt-1.5 flex items-start gap-2 text-[13px] leading-snug text-slate-500">
              <X size={14} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
              <span><span className="sr-only">Typical budget quote: </span>{r.budget}</span>
            </dd>
            <dd className="mt-1 flex items-start gap-2 text-[13.5px] font-medium leading-snug text-[#2D1B10]">
              <Check size={14} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
              <span><span className="sr-only">This package: </span>{r.ours}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------ §6 what it costs ----------------------------- */

/** "Standard (3 star, budget-friendly)" → ["Standard", "3 star, budget-friendly"]. */
function splitTierName(name: string): [string, string | undefined] {
  const m = name.match(/^(.+?)\s*\((.+)\)$/);
  return m ? [m[1], m[2].charAt(0).toUpperCase() + m[2].slice(1)] : [name, undefined];
}

/** Short labels for the inclusions every tier shares (same facts as HOME_INCLUDED). */
const TIER_SHARED = ["Private AC car with driver", "Daily breakfast", "Fuel, tolls and parking", "Darshan and aarti help"];

export function PricingTiers() {
  return (
    <section
      id="price"
      aria-labelledby="price-h"
      className={`scroll-mt-24 bg-gradient-to-b from-orange-50/70 to-white py-10 md:py-14 ${FULL_WIDTH}`}
    >
      <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">What it costs</p>
          <h2 id="price-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            Somnath Dwarka tour package price: choose your comfort level
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-600">
          One route, three comfort levels. Every price is per person on twin-sharing for the 2 nights and 3 days route,
          and every hotel is named so you know exactly where you sleep.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-5">
        {HOME_TIERS.map((t, i) => {
          const featured = i === 1;
          const [label, sub] = splitTierName(t.name);
          // "A or B in Dwarka, C or D in Somnath" → one line per city.
          const hotelLines = t.hotels.split(/,\s+(?=[^,]+ in \w+$)/);
          return (
            <article
              key={t.key}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-7 ${
                featured
                  ? "bg-gradient-to-br from-[#2D1B10] to-[#4a2a17] text-white shadow-[0_20px_50px_rgba(45,27,16,0.25)]"
                  : "border border-orange-100 bg-white"
              }`}
            >
              {featured ? (
                <>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/25 blur-3xl" />
                  </div>
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                    Our pick
                  </span>
                </>
              ) : null}

              <div className="relative">
                <h3 className={`text-xl font-bold ${featured ? "text-white" : "text-[#2D1B10]"}`}>{label}</h3>
                {sub ? (
                  <p className={`mt-0.5 text-[13px] font-medium ${featured ? "text-orange-200" : "text-orange-700"}`}>{sub}</p>
                ) : null}

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className={`text-[34px] font-extrabold leading-none ${featured ? "text-white" : "text-[#2D1B10]"}`}>
                    Rs {inr(t.price)}
                  </span>
                </p>
                <p className={`mt-1.5 text-[12.5px] ${featured ? "text-orange-100/75" : "text-slate-500"}`}>
                  From, per person on twin-sharing
                </p>

                <div className={`my-5 h-px ${featured ? "bg-white/15" : "bg-orange-100"}`} />

                <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${featured ? "text-orange-300" : "text-slate-500"}`}>
                  Where you stay
                </p>
                <ul className="mt-2.5 space-y-2">
                  {hotelLines.map((h) => (
                    <li
                      key={h}
                      className={`flex items-start gap-2.5 text-[14px] leading-snug ${featured ? "text-orange-50/90" : "text-slate-700"}`}
                    >
                      <Hotel size={15} className={`mt-0.5 shrink-0 ${featured ? "text-orange-300" : "text-orange-500"}`} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-auto pt-6">
                <TrackedLink
                  href={waLink(`Hi, please send the day-wise plan and price for the ${t.name} Somnath Dwarka package.`)}
                  external
                  event="whatsapp_click"
                  label={`home_tier_${t.key}`}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-[13.5px] font-semibold transition ${
                    featured
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:brightness-110"
                      : "border border-orange-300 bg-white text-orange-700 hover:border-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <FaWhatsapp size={16} aria-hidden="true" /> Get this plan on WhatsApp
                </TrackedLink>
                {t.href ? (
                  <Link
                    href={t.href}
                    className={`mt-2.5 inline-flex w-full items-center justify-center gap-1 text-[13px] font-semibold hover:underline ${
                      featured ? "text-orange-200" : "text-orange-700"
                    }`}
                  >
                    See the full package <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-orange-100 bg-white px-5 py-4">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#2D1B10]">Every tier includes</span>
        {TIER_SHARED.map((x) => (
          <span key={x} className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-700">
            <Check size={14} strokeWidth={3} className="text-green-600" aria-hidden="true" />
            {x}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12.5px] text-slate-500">
        Prices exclude GST, which is stated on your quote. Compare durations, starting cities and add-ons on{" "}
        <Link href="/somnath-dwarka-tour-package/" className="font-semibold text-orange-700 hover:underline">
          all Somnath Dwarka tour packages
        </Link>
        .
      </p>
    </section>
  );
}

/* ---------------------------- §7 day-wise itinerary -------------------------- */

export function DayWiseItinerary() {
  return (
    <section id="itinerary" aria-labelledby="itinerary-h" className={`scroll-mt-24 py-10 md:py-14 ${FULL_WIDTH}`}>
      <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">Day-wise itinerary</p>
          <h2 id="itinerary-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            Somnath Dwarka 2 nights 3 days itinerary
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-600">
          This is the core 2 nights and 3 days plan. It can start from Ahmedabad, Rajkot, Jamnagar or from Dwarka itself,
          and it can be reversed to begin at Somnath. Distances below are real, so you can see where the driving actually
          falls.
        </p>
      </div>

      <ol className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
        {/* Timeline rail joining the day markers (desktop). */}
        <span
          className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-5 hidden h-0.5 bg-gradient-to-r from-orange-300 via-amber-300 to-orange-300 lg:block"
          aria-hidden="true"
        />
        {HOME_ITINERARY.map((d) => (
          <li key={d.day} className="relative flex flex-col">
            <div className="relative z-[1] mb-3 flex items-center gap-3 lg:justify-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-600 to-amber-500 text-[15px] font-bold text-white ring-4 ring-white">
                {d.day}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-orange-600 lg:hidden">Day {d.day}</span>
            </div>

            <article className="flex flex-1 flex-col rounded-2xl border border-orange-100 bg-white p-5 transition-colors hover:border-orange-200">
              <p className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600 lg:block">Day {d.day}</p>
              <h3 className="text-[17px] font-bold leading-snug text-[#2D1B10] lg:mt-1">{d.title}</h3>

              <ul className="mt-3 flex flex-wrap gap-1.5">
                {d.stops.map((stop) => (
                  <li key={stop} className="rounded-full bg-orange-50 px-2.5 py-1 text-[12px] font-medium text-orange-800 ring-1 ring-orange-100">
                    {stop}
                  </li>
                ))}
              </ul>

              <p className="mb-4 mt-3 text-[13.5px] leading-relaxed text-slate-600">{d.body}</p>

              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 border-t border-orange-100 pt-3.5 text-[12.5px] font-medium text-[#2D1B10]">
                <span className="inline-flex items-center gap-1.5">
                  <Hotel size={14} className="text-orange-600" aria-hidden="true" />
                  {d.stay}
                </span>
                {d.drive ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Car size={14} className="text-orange-600" aria-hidden="true" />
                    {d.drive}
                  </span>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ol>

      <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-[13.5px] leading-relaxed text-[#6b4c38]">
        <Clock size={16} className="mt-0.5 shrink-0 text-orange-600" aria-hidden="true" />
        <span>
          Want more time? The{" "}
          <Link href="/somnath-dwarka-tour-package/4-days-3-nights/" className="font-semibold text-orange-700 hover:underline">
            4 days 3 nights
          </Link>{" "}
          and{" "}
          <Link href="/somnath-dwarka-tour-package/with-gir/" className="font-semibold text-orange-700 hover:underline">
            with-Gir
          </Link>{" "}
          versions slow the same route down.
        </span>
      </p>
    </section>
  );
}

/* -------------------------- §8 named hotels + promise ------------------------ */

export function NamedHotels() {
  return (
    <section
      id="hotels"
      aria-labelledby="hotels-h"
      className={`scroll-mt-24 bg-gradient-to-b from-orange-50/70 to-white py-10 md:py-14 ${FULL_WIDTH}`}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-10">
        <div className="flex flex-col">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">Where you stay</p>
          <h2 id="hotels-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            Named hotels and the “or similar” promise
          </h2>

          <div className="relative mt-5 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D1B10] to-[#4a2a17] p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-orange-500/25 blur-2xl" aria-hidden="true" />
            <p className="relative flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-300">
              <ShieldCheck size={15} aria-hidden="true" /> Our promise
            </p>
            <p className="relative mt-3 text-[14px] leading-relaxed text-orange-50/85">{HOME_HOTEL_PROMISE}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {HOME_HOTELS.map((c) => (
              <div key={c.city} className="rounded-2xl border border-orange-100 bg-white p-5">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-[17px] font-bold text-[#2D1B10]">
                    <MapPin size={16} className="text-orange-600" aria-hidden="true" />
                    {c.city}
                  </h3>
                  <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 ring-1 ring-orange-100">
                    4 and 5 star
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-orange-100/70">
                  {c.hotels.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 py-2.5 text-[14px] text-slate-700">
                      <Hotel size={15} className="shrink-0 text-orange-500" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-orange-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-[14px] font-medium leading-snug text-[#2D1B10]">{HOME_HOTELS_BUDGET_NOTE}</p>
            <Link
              href="/hotels/"
              className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-orange-700 hover:underline"
            >
              Hotels in Dwarka and Somnath <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- §9 included / not included ---------------------- */

export function Inclusions() {
  return (
    <section id="inclusions" aria-labelledby="inclusions-h" className={`scroll-mt-24 py-10 md:py-14 ${FULL_WIDTH}`}>
      <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">No surprises</p>
          <h2 id="inclusions-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
            What is included and what is not
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-slate-600">
          The same list for every comfort level. {HOME_EXCLUDED_NOTE}
        </p>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="overflow-hidden rounded-2xl border border-green-200 bg-white">
          <h3 className="flex items-center gap-2.5 border-b border-green-100 bg-green-50/70 px-5 py-3.5 text-[16px] font-bold text-green-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
              <Check size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            Included
          </h3>
          <ul className="grid gap-x-6 gap-y-3 p-5 sm:grid-cols-2">
            {HOME_INCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-[14px] leading-snug text-slate-700">
                <Check size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <h3 className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50 px-5 py-3.5 text-[16px] font-bold text-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-500 text-white">
              <X size={14} strokeWidth={3} aria-hidden="true" />
            </span>
            Not included
          </h3>
          <ul className="grid gap-x-6 gap-y-3 p-5 sm:grid-cols-2">
            {HOME_EXCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-[14px] leading-snug text-slate-600">
                <X size={15} strokeWidth={2.5} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- §10 how to reach ------------------------------- */

/** Shared header: eyebrow + h2 on the left, intro (or an action) on the right. */
function SplitHeader({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">{eyebrow}</p>
        <h2 id={`${id}-h`} className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
          {title}
        </h2>
      </div>
      <div className="text-[15px] leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

const REACH_MODES = [
  { mode: "Air", title: "By air", Icon: Plane },
  { mode: "Train", title: "By train", Icon: Train },
  { mode: "Road", title: "By road", Icon: Car },
] as const;

export function HowToReach() {
  return (
    <section
      id="how-to-reach"
      aria-labelledby="how-to-reach-h"
      className={`scroll-mt-24 bg-gradient-to-b from-orange-50/70 to-white ${FULL_WIDTH}`}
    >
      <SplitHeader id="how-to-reach" eyebrow="Getting there" title="How to reach Dwarka and Somnath">
        Useful whether you book with us or not. These are the real access points, verified against current route data.
      </SplitHeader>

      <div className="mt-7 grid gap-4 md:grid-cols-3 lg:gap-5">
        {REACH_MODES.map(({ mode, title, Icon }) => {
          // "Air, Dwarka side" → mode "Air", route "Dwarka side".
          const rows = HOME_REACH.filter((r) => r.from.startsWith(`${mode},`));
          return (
            <div key={mode} className="rounded-2xl border border-orange-100 bg-white p-5">
              <h3 className="flex items-center gap-2.5 text-[16px] font-bold text-[#2D1B10]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                  <Icon size={17} aria-hidden="true" />
                </span>
                {title}
              </h3>
              <dl className="mt-4 divide-y divide-orange-100">
                {rows.map((r) => {
                  const route = r.from.slice(mode.length + 1).trim();
                  return (
                    <div key={r.from} className="py-3 first:pt-0 last:pb-0">
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                        {route.charAt(0).toUpperCase() + route.slice(1)}
                      </dt>
                      <dd className="mt-1 text-[14px] font-semibold leading-snug text-[#2D1B10]">{r.access}</dd>
                      <dd className="mt-0.5 text-[13px] leading-snug text-slate-500">{r.distance}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          );
        })}
      </div>

      <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-orange-100 bg-white px-4 py-3 text-[13.5px] text-slate-600">
        <Car size={16} className="mt-0.5 shrink-0 text-orange-600" aria-hidden="true" />
        <span>
          Need only a car? See our{" "}
          <Link href="/somnath-dwarka-taxi-service/" className="font-semibold text-orange-700 hover:underline">
            Somnath Dwarka taxi service
          </Link>{" "}
          and{" "}
          <Link href="/somnath-dwarka-taxi-service/airport-taxi/" className="font-semibold text-orange-700 hover:underline">
            airport transfers
          </Link>
          .
        </span>
      </p>
    </section>
  );
}

/* ---------------------------- §11 best time to visit ------------------------- */

const SEASON_STYLE = {
  best: { bar: "bg-green-500", chip: "bg-green-50 text-green-800 ring-green-200", dot: "bg-green-500" },
  hot: { bar: "bg-amber-400", chip: "bg-amber-50 text-amber-800 ring-amber-200", dot: "bg-amber-400" },
  monsoon: { bar: "bg-sky-400", chip: "bg-sky-50 text-sky-800 ring-sky-200", dot: "bg-sky-400" },
} as const;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function BestTime() {
  const [a, b] = HOME_BEST_TIME_LINKS;
  return (
    <section id="best-time" aria-labelledby="best-time-h" className={`scroll-mt-24 ${FULL_WIDTH}`}>
      <SplitHeader id="best-time" eyebrow="When to go" title="Best time to visit Dwarka and Somnath">
        {HOME_BEST_TIME}
      </SplitHeader>

      <div className="mt-7 rounded-2xl border border-orange-100 bg-white p-4 sm:p-5">
        {/* Month strip: one cell per month, coloured by season. */}
        <ol className="grid grid-cols-6 gap-1.5 sm:grid-cols-12" aria-label="Season by month">
          {MONTHS.map((m, i) => {
            const season = HOME_MONTH_SEASONS[i];
            return (
              <li key={m} className="text-center">
                <span className={`block h-2 rounded-full ${SEASON_STYLE[season].bar}`} aria-hidden="true" />
                <span className="mt-1.5 block text-[12px] font-semibold text-slate-600">
                  {m}
                  <span className="sr-only">: {HOME_SEASONS.find((x) => x.key === season)?.label}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {HOME_SEASONS.map((x) => (
            <div key={x.key} className="flex items-start gap-3 rounded-xl bg-slate-50/70 p-3.5">
              <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${SEASON_STYLE[x.key].dot}`} aria-hidden="true" />
              <div>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="text-[14.5px] font-bold text-[#2D1B10]">{x.months}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${SEASON_STYLE[x.key].chip}`}>
                    {x.label}
                  </span>
                </p>
                <p className="mt-1 text-[13px] leading-snug text-slate-600">{x.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-[13.5px] text-slate-600">
        <CalendarRange size={16} className="text-orange-600" aria-hidden="true" />
        <span>Month-by-month guides:</span>
        {[a, b].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-white px-3 py-1 font-semibold text-orange-700 transition hover:border-orange-400 hover:bg-orange-50"
          >
            {l.label.charAt(0).toUpperCase() + l.label.slice(1)} <ArrowRight size={13} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* --------------------------- §12 common concerns ----------------------------- */

const CONCERN_ICONS = [Users, IndianRupee, RefreshCw, UserRound];

export function CommonConcerns() {
  return (
    <section
      id="concerns"
      aria-labelledby="concerns-h"
      className={`scroll-mt-24 bg-gradient-to-b from-orange-50/70 to-white ${FULL_WIDTH}`}
    >
      <SplitHeader id="concerns" eyebrow="Before you ask" title="Common concerns, answered">
        <span className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-4">
          <span>Something else on your mind?</span>
          <TrackedLink
            href={waLink(HOME_WA_TEXT)}
            external
            event="whatsapp_click"
            label="home_concerns"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-[13.5px] font-semibold text-green-800 transition hover:bg-green-50"
          >
            <FaWhatsapp size={16} className="text-green-600" aria-hidden="true" /> Ask us on WhatsApp
          </TrackedLink>
        </span>
      </SplitHeader>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {HOME_CONCERNS.map((c, i) => {
          const Icon = CONCERN_ICONS[i] ?? UserRound;
          return (
            <div key={c.q} className="flex flex-col rounded-2xl border border-orange-100 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                <Icon size={17} aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 text-[15.5px] font-bold leading-snug text-[#2D1B10]">{c.q}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{c.a}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------ §14 enquiry form ----------------------------- */

const ENQUIRE_POINTS = [
  "An exact price with named hotels, not a range",
  "Your day-wise plan, most often the same day",
  "No spam and no obligation",
];

/** Anchored in the page, never a popup (home SOP §14). */
export function EnquireSection({ months }: { months: string[] }) {
  return (
    <section id="enquire" aria-labelledby="enquire-h" className={`scroll-mt-24 ${FULL_WIDTH}`}>
      <div className="grid overflow-hidden rounded-3xl border border-orange-100 bg-white lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2D1B10] to-[#4a2a17] p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-500/25 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-300">Enquire</p>
            <h2 id="enquire-h" className="text-2xl font-bold leading-tight md:text-3xl">
              Get your day-wise plan and price
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-orange-50/80">
              Three details are enough to start. Add your group and hotel choice on the next step and we can send an
              exact price with named hotels, not a range.
            </p>
            <ul className="mt-5 space-y-2.5">
              {ENQUIRE_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[14px] text-orange-50/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/25 text-orange-300">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <TrackedLink
              href={waLink(HOME_WA_TEXT)}
              external
              event="whatsapp_click"
              label="home_enquire_panel"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[13.5px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <FaWhatsapp size={16} className="text-green-400" aria-hidden="true" />
              Prefer WhatsApp? {CONTACT.phoneDisplay}
            </TrackedLink>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <TwoStepEnquiry months={months} tiers={HOME_TIERS.map((t) => t.name)} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ guest reviews ------------------------------ */

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          aria-hidden="true"
          className={n <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
        />
      ))}
    </span>
  );
}

/**
 * Guest reviews, below the enquiry form. The same list is marked up as
 * Review / AggregateRating on the home TouristTrip node, so each card's score
 * comes from the review data — never typed into the markup separately.
 */
export function HomeReviews() {
  const reviews = TESTIMONIALS.slice(0, 9);
  if (!reviews.length) return null;

  return (
    <section id="reviews" aria-labelledby="reviews-h" className={`scroll-mt-24 ${FULL_WIDTH}`}>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-orange-600">Guest reviews</p>
      <h2 id="reviews-h" className="text-2xl font-bold leading-tight text-[#2D1B10] md:text-3xl">
        What pilgrims say after the trip
      </h2>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {reviews.map((r) => (
          <li key={r.id} className="flex flex-col rounded-2xl border border-orange-100 bg-white p-5">
            <span className="flex items-center gap-2">
              <Stars rating={r.rating} />
              <span className="text-[13.5px] font-bold text-[#2D1B10]">{r.rating.toFixed(1)}</span>
            </span>
            <blockquote className="mt-3 flex-1 text-[14px] leading-relaxed text-slate-700">
              <p>&ldquo;{r.review}&rdquo;</p>
            </blockquote>
            <div className="mt-4 flex items-center gap-3 border-t border-orange-50 pt-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
                style={{ backgroundColor: r.bg, color: r.color }}
                aria-hidden="true"
              >
                {r.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#2D1B10]">{r.name}</p>
                <p className="truncate text-[12.5px] text-slate-500">
                  {[r.location, r.destination && `${r.destination} trip`].filter(Boolean).join(" · ")}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------ hero-adjacent CTA ---------------------------- */

/** A slim repeat of the primary CTA, used after the price and itinerary blocks. */
export function InlineWhatsAppCta({ label }: { label: string }) {
  return (
    <div className="bg-white px-4 pb-4">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 rounded-3xl bg-[#2D1B10] px-6 py-5 text-center sm:flex-row sm:text-left">
        <p className="text-[15px] font-semibold text-orange-50">
          Want this plan with your dates and hotel names? We reply the same day.
        </p>
        <TrackedLink
          href={waLink(HOME_WA_TEXT)}
          external
          event="whatsapp_click"
          label={label}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1FA855] px-5 py-3 text-[13.5px] font-semibold text-white transition hover:bg-[#1a9249]"
        >
          <FaWhatsapp size={17} aria-hidden="true" /> WhatsApp {CONTACT.phoneDisplay}
        </TrackedLink>
      </div>
    </div>
  );
}
