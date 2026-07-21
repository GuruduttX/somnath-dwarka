import Link from "next/link";
import { Check, X, Star, ArrowRight, Phone } from "lucide-react";
import type { HotelPageCopy } from "@/src/config/hotels";
import { SPOKE_AUTHOR, OPERATOR } from "@/src/config/taxiSpokes";

/**
 * The SOP body sections shared by the hotels hub and both city pages: where to
 * stay, choose by budget, arrive and stay, the bundle pitch, what arranging your
 * stay includes, why book, honest fit, before you book, keep planning and the CTA.
 *
 * The named hotels are not rendered here — those are CMS data and each page
 * renders them in its own layout above this block.
 */
const card =
  "overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 sm:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)]";
const h2 = "text-2xl font-bold text-slate-950 mb-4 flex items-center gap-2";
const bar = <span className="h-6 w-1 rounded-full bg-orange-500 inline-block" />;
// Matches the hotel pages' own container so every band lines up on one edge.
const wrap = "mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-10";
// Cards in a row size to their own content instead of stretching to the tallest,
// which is what left a tall empty panel beside "Choose by budget".
const row = "grid gap-6 lg:grid-cols-2 items-start";

export default function HotelSopSections({ copy }: { copy: HotelPageCopy }) {
  return (
    <>
      {/* ── Where to stay + choose by budget ── */}
      <div className={wrap}>
        <div className={copy.whereToStay ? "grid gap-6 items-start lg:grid-cols-5" : "grid gap-6"}>
          {copy.whereToStay ? (
            <div className={`${card} lg:col-span-2`}>
              <h2 className={h2}>{bar}{copy.whereToStay.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{copy.whereToStay.body}</p>
            </div>
          ) : null}
          <div className={copy.whereToStay ? `${card} lg:col-span-3` : card}>
            <h2 className={h2}>{bar}{copy.chooseByBudget.heading}</h2>
            {copy.chooseByBudget.intro ? (
              <p className="mb-3 text-slate-600 leading-relaxed">{copy.chooseByBudget.intro}</p>
            ) : null}
            <ul className="space-y-3">
              {copy.chooseByBudget.items.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <Check size={13} className="mt-1 shrink-0 text-orange-500" strokeWidth={3} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Arrive and stay + bundle ── */}
      <div className={wrap}>
        <div className={copy.arriveAndStay ? row : "grid gap-6"}>
          {copy.arriveAndStay ? (
            <div className={card}>
              <h2 className={h2}>{bar}{copy.arriveAndStay.heading}</h2>
              <p className="text-slate-600 leading-relaxed">{copy.arriveAndStay.body}</p>
            </div>
          ) : null}
          <div className={card}>
            <h2 className={h2}>{bar}{copy.bundle.heading}</h2>
            <p className="text-slate-600 leading-relaxed">{copy.bundle.body}</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                href="/somnath-dwarka-taxi-service/"
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-800 transition hover:border-orange-300 hover:bg-orange-50"
              >
                Somnath Dwarka taxi service
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/somnath-dwarka-tour-package/"
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-800 transition hover:border-orange-300 hover:bg-orange-50"
              >
                Tour packages
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── What arranging your stay includes ── */}
      <div className={wrap}>
        <div className={card}>
          <h2 className={h2}>{bar}{copy.stayIncludes.heading}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-700">
                {copy.stayIncludes.handledTitle}
              </p>
              <ul className="space-y-2.5">
                {copy.stayIncludes.handled.map((x) => (
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
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-orange-700">
                {copy.stayIncludes.tellUsTitle}
              </p>
              <ul className="space-y-2.5">
                {copy.stayIncludes.tellUs.map((x) => (
                  <li key={x} className="flex gap-2.5 text-sm text-slate-700">
                    <ArrowRight size={12} className="mt-1 shrink-0 text-orange-500" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Why book ── */}
      <div className={wrap}>
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
            {copy.whyBook.author}{" "}
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
      </div>

      {/* ── Honest fit + before you book ── */}
      <div className={wrap}>
        <div className={row}>
          <div className={card}>
            <h2 className={h2}>{bar}{copy.notForYou.heading}</h2>
            <ul className="space-y-3">
              {copy.notForYou.items.map((x) => (
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
            <h2 className={h2}>{bar}{copy.beforeYouBook.heading}</h2>
            <ul className="space-y-3">
              {copy.beforeYouBook.items.map((x) => (
                <li key={x} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <Check size={13} className="mt-1 shrink-0 text-orange-500" strokeWidth={3} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Keep planning + book ── */}
      <div className={wrap}>
        <div className={row}>
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
        </div>
      </div>
    </>
  );
}
