"use client";

import { useState } from "react";
import { track } from "@/src/lib/events";
import type { RateCardRoute } from "@/src/config/taxiFares";
import type { ToolWidgetCopy } from "@/src/app/tools/content";

/**
 * Progressive-enhancement interactive layer for tools (SOP §1, §5 #15).
 * The page already renders a crawlable static shell; this only ENHANCES it,
 * so the URL ranks with JS disabled.
 *
 * A client component: its words (`copy`, the "tool-template" page copy) and
 * the calculator's routes (`routes`, the site_taxi_rate_card dataset) are
 * read by the server page and passed in, so CMS edits show without a mismatch
 * between the server render and hydration.
 */
export default function ToolWidget({ type, copy, routes }: { type: string; copy: ToolWidgetCopy; routes: RateCardRoute[] }) {
  if (type === "fare-calculator") return <FareCalculator copy={copy.calculator} routes={routes} />;
  return <ItineraryPlanner copy={copy.planner} />;
}

function ItineraryPlanner({ copy }: { copy: ToolWidgetCopy["planner"] }) {
  const [days, setDays] = useState(copy.defaultDays);
  const [start, setStart] = useState(copy.startCities[0] ?? "");
  const chosen = (
    copy.plans.find((p) => p.days === days) ??
    copy.plans.find((p) => p.days === copy.defaultDays) ??
    copy.plans[0]
  )?.steps ?? [];
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5">
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <label className="block text-sm">
          <span className="text-gray-600">{copy.daysLabel}</span>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="ceq-input mt-1">
            {copy.plans.map((p) => <option key={p.days} value={p.days}>{copy.daysOption.replace("{days}", String(p.days))}</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">{copy.startLabel}</span>
          <select value={start} onChange={(e) => setStart(e.target.value)} className="ceq-input mt-1">
            {copy.startCities.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>
      <ol className="space-y-2">
        {chosen.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#E87722] text-white text-sm flex items-center justify-center">{i + 1}</span>
            <span className="text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
      <a
        href={copy.ctaHref}
        onClick={() => track("tool_use", { tool: "itinerary-planner", days, start })}
        className="inline-block mt-4 px-5 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        {copy.ctaLabel}
      </a>
    </div>
  );
}

/**
 * Fare calculator.
 *
 * Route-led, not rate-led. It previously multiplied a distance by a hardcoded
 * ₹14/km default, which quoted ₹3,262 for the Somnath–Dwarka leg the rate card
 * prices from ₹4,500 — the site undercutting its own quote by nearly a third.
 *
 * The rate card SOP gives exactly one price and no per-kilometre rate for any
 * vehicle, so nothing here derives a ₹/km figure. Pick a route and you get the
 * published fare where one exists, and an honest "confirmed at booking" where it
 * does not. Both come from the site_taxi_rate_card dataset (default
 * src/config/taxiFares.ts), shared with the rate card.
 */
function FareCalculator({ copy, routes }: { copy: ToolWidgetCopy["calculator"]; routes: RateCardRoute[] }) {
  const [slug, setSlug] = useState(routes[0]?.slug ?? "");
  const route = routes.find((r) => r.slug === slug) ?? routes[0];
  if (!route) return null;
  // An item added through the CMS leaves an unknown fare as "".
  const fare = route.fare || null;

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5">
      <label className="block text-sm mb-4">
        <span className="text-gray-600">{copy.routeLabel}</span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="ceq-input mt-1 w-full"
        >
          {routes.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-orange-100/60 bg-orange-50/20 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{copy.distanceLabel}</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{route.distance}</p>
        </div>
        <div className="rounded-xl border border-orange-100/60 bg-orange-50/20 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">{copy.fareLabel}</p>
          <p className="mt-1 text-lg font-bold text-[#B85C10]">
            {fare ?? copy.noFareLabel}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {fare ? copy.pricedNote : copy.unpricedNote}
      </p>

      <a
        href={copy.ctaHref}
        onClick={() => track("tool_use", { tool: "fare-calculator", route: route.slug })}
        className="inline-block mt-4 px-5 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        {copy.ctaLabel}
      </a>
    </div>
  );
}
