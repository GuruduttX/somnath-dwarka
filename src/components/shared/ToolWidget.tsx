"use client";

import { useState } from "react";
import { track } from "@/src/lib/events";

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

function FareCalculator() {
  const [route, setRoute] = useState("233");
  const [rate, setRate] = useState("14");
  const km = Number(route) || 0;
  const perKm = Number(rate) || 0;
  const est = km * perKm;
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5">
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <label className="block text-sm">
          <span className="text-gray-600">Distance (km)</span>
          <input value={route} onChange={(e) => setRoute(e.target.value)} className="ceq-input mt-1" inputMode="numeric" />
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">Indicative ₹/km</span>
          <input value={rate} onChange={(e) => setRate(e.target.value)} className="ceq-input mt-1" inputMode="numeric" />
        </label>
      </div>
      <p className="text-gray-700">
        Rough estimate:{" "}
        <strong className="text-[#B85C10]">₹{est ? est.toLocaleString("en-IN") : "—"}</strong>{" "}
        <span className="text-sm text-gray-500">(indicative only — confirmed at booking)</span>
      </p>
      <a
        href="/somnath-dwarka-taxi-service/"
        onClick={() => track("tool_use", { tool: "fare-calculator", km, perKm })}
        className="inline-block mt-4 px-5 py-3 rounded-full bg-[#E87722] text-white font-semibold"
      >
        Get a firm fare
      </a>
    </div>
  );
}
