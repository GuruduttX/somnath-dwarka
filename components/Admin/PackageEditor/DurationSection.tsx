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
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const cardClass = `
  border border-pink-900/50 rounded-2xl w-full p-6
  bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]
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
    <div className={`${cardClass} space-y-5`}>

      {/* Package Duration */}
      <div className={cardClass}>
        <h3 className="text-base font-semibold text-pink-100 mb-4">
          Package Duration
        </h3>

        <div className={`${cardClass} grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4`}>
          <div>
            <label className="text-sm text-pink-300/70">Days</label>
            <input
              type="number"
              placeholder="Days"
              required
              value={days}
              onChange={(e) => onChange("day", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-pink-300/70">Nights</label>
            <input
              type="number"
              placeholder="Nights"
              required
              value={nights}
              onChange={(e) => onChange("night", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Preview */}
        {(days || nights) && (
          <p className="text-sm text-pink-400/60">
            Duration Preview:{" "}
            <span className="font-semibold text-pink-300">
              {days || 0} Days / {nights || 0} Nights
            </span>
          </p>
        )}
      </div>

      {/* Duration Breakdown */}
      <div className={cardClass}>
        <h3 className="text-base font-semibold text-pink-100 mb-4">
          Duration Breakdown
        </h3>

        <div className="space-y-4">
          {breakdown.map((item, index) => (
            <div key={item.id} className={cardClass}>
              <div className="flex gap-3">
                <input
                  required
                  type="number"
                  min={1}
                  value={item.days}
                  onChange={(e) => updateBreakdown(item.id, "days", e.target.value)}
                  className={inputClass}
                />
                <input
                  required
                  type="text"
                  placeholder="Place (e.g. Vrindavan)"
                  value={item.place}
                  onChange={(e) => updateBreakdown(item.id, "place", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-pink-400/50">Day {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeBreakdown(item.id)}
                  className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={addBreakdown}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
              bg-pink-600/20 text-pink-300 border border-pink-600/40
              hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
              transition cursor-pointer"
          >
            <Plus size={15} /> Add Breakdown
          </button>
        </div>
      </div>

    </div>
  );
}