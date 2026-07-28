"use client";

import { useState, SetStateAction } from "react";
import { Plus, Trash2 } from "lucide-react";
import React from "react";

type BreakdownItem = {
  id: string;
  days: string;
  place: string;
};

const inputClass = `
  w-full px-4 py-2.5 rounded-lg text-sm
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const cardClass = `
  border border-blue-900/50 rounded-2xl w-full p-6
  bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]
`;

export default function DurationSection({
  days, nights, onChange, breakdown, setBreakdown,
}: {
  days: string;
  nights: string;
  onChange: any;
  breakdown: BreakdownItem[];
  setBreakdown: React.Dispatch<SetStateAction<BreakdownItem[]>>;
}) {

  const addBreakdown = () => {
    setBreakdown((prev) => [
      ...prev,
      { id: crypto.randomUUID(), days: "1", place: "" },
    ]);
  };

  const removeBreakdown = (id: string) => {
    setBreakdown((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBreakdown = (id: string, field: "days" | "place", value: string) => {
    setBreakdown((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, [field]: field === "days" ? Number(value) : value } : b
      )
    );
  };

  return (
    <div className={cardClass}>

      <h3 className="text-base font-semibold text-blue-100 mb-5">
        Package Duration
      </h3>

      {/* Days / Nights */}
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div>
          <label className="text-sm text-blue-300/70">Days</label>
          <input
            type="number"
            placeholder="Days"
            required
            value={days}
            onChange={(e) => onChange("day", e.target.value)}
            className={`${inputClass} mt-2`}
          />
        </div>

        <div>
          <label className="text-sm text-blue-300/70">Nights</label>
          <input
            type="number"
            placeholder="Nights"
            required
            value={nights}
            onChange={(e) => onChange("night", e.target.value)}
            className={`${inputClass} mt-2`}
          />
        </div>
      </div>

      {(days || nights) && (
        <p className="mt-3 text-sm text-blue-400/60">
          Preview:{" "}
          <span className="font-semibold text-blue-300">
            {days || 0} Days / {nights || 0} Nights
          </span>
        </p>
      )}

      {/* Divider */}
      <div className="my-6 border-t border-blue-900/40" />

      {/* Duration Breakdown */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-blue-200">Duration Breakdown</h4>
        <button
          type="button"
          onClick={addBreakdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
            bg-blue-600/20 text-blue-300 border border-blue-600/40
            hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
            transition cursor-pointer"
        >
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="space-y-2.5">
        {breakdown.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <span className="text-xs text-blue-400/50 w-12 shrink-0">Day {index + 1}</span>
            <input
              required
              type="text"
              placeholder="Place name (e.g. Dwarka)"
              value={item.place}
              onChange={(e) => updateBreakdown(item.id, "place", e.target.value)}
              className={`${inputClass} flex-1`}
            />
            <button
              type="button"
              onClick={() => removeBreakdown(item.id)}
              className="shrink-0 p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
              aria-label="Remove breakdown"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}

        {breakdown.length === 0 && (
          <p className="text-xs text-blue-400/40">No breakdown added yet.</p>
        )}
      </div>

    </div>
  );
}