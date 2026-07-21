"use client";

import { useState } from "react";
import { track } from "@/src/lib/events";
import { RATE_CARD_ROUTES } from "@/src/config/taxiFares";

/**
 * Progressive-enhancement interactive layer for tools (SOP §1, §5 #15).
 * The page already renders a crawlable static shell; this only ENHANCES it,
 * so the URL ranks with JS disabled.
 */
export default function ToolWidget({ type }: { type: string }) {
  if (type === "fare-calculator") return <FareCalculator />;
  return <ItineraryPlanner />;
}

function ItineraryPlanner() {
  const [days, setDays] = useState(4);
  const [start, setStart] = useState("Ahmedabad");
  const plan: Record<number, string[]> = {
    3: ["Dwarka darshan + Nageshwar", "Drive to Somnath, evening aarti", "Somnath darshan, depart"],
    4: ["Arrive Dwarka, aarti", "Nageshwar + Bet Dwarka", "Drive to Somnath, aarti + show", "Somnath darshan, depart"],
    5: ["Arrive Dwarka", "Dwarka sightseeing", "Drive to Somnath via Porbandar", "Somnath + Triveni Sangam", "Buffer / depart"],
  };
  const chosen = plan[days] ?? plan[4];
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5">
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <label className="block text-sm">
          <span className="text-gray-600">Days</span>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="ceq-input mt-1">
            {[3, 4, 5].map((d) => <option key={d} value={d}>{d} days</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">Starting city</span>
          <select value={start} onChange={(e) => setStart(e.target.value)} className="ceq-input mt-1">
            {["Ahmedabad", "Rajkot", "Mumbai"].map((c) => <option key={c}>{c}</option>)}
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
        href="/somnath-dwarka-tour-package/"
        onClick={() => track("tool_use", { tool: "itinerary-planner", days, start })}
        className="inline-block mt-4 px-5 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        Get a quote for this plan
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
 * does not. Both come from src/config/taxiFares.ts, shared with the rate card.
 */
function FareCalculator() {
  const [slug, setSlug] = useState(RATE_CARD_ROUTES[0].slug);
  const route = RATE_CARD_ROUTES.find((r) => r.slug === slug) ?? RATE_CARD_ROUTES[0];

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5">
      <label className="block text-sm mb-4">
        <span className="text-gray-600">Route</span>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="ceq-input mt-1 w-full"
        >
          {RATE_CARD_ROUTES.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-orange-100/60 bg-orange-50/20 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Distance</p>
          <p className="mt-1 text-lg font-bold text-slate-800">{route.distance}</p>
        </div>
        <div className="rounded-xl border border-orange-100/60 bg-orange-50/20 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Indicative fare</p>
          <p className="mt-1 text-lg font-bold text-[#B85C10]">
            {route.fare ?? "Confirmed at booking"}
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        {route.fare
          ? "Sedan base fare, indicative. Other vehicles and round trips are priced on request."
          : "This route is quoted per trip. Send your dates for a firm all-in fare."}
      </p>

      <a
        href="/somnath-dwarka-taxi-service/fare-rate-card/"
        onClick={() => track("tool_use", { tool: "fare-calculator", route: route.slug })}
        className="inline-block mt-4 px-5 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        Get a firm fare
      </a>
    </div>
  );
}
