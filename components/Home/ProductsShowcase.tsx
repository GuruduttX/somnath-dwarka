"use client";

import { useState } from "react";
import { Sparkles, SlidersHorizontal } from "lucide-react";
import { TOUR_PACKAGES } from "@/utils/TourData";
import type { TourPackage } from "@/utils/TourData";
import TourCard from "@/utils/TourCard";
const FILTERS = ["All Packages", "Somnath", "Dwarka", "Combo Tours", "Budget Picks"];

export default function ProductsShowcase() {
  const [activeFilter, setActiveFilter] = useState("All Packages");

  const filtered: TourPackage[] = TOUR_PACKAGES.filter((pkg) => {
    if (activeFilter === "All Packages") return true;
    if (activeFilter === "Somnath") return pkg.location.toLowerCase().includes("somnath");
    if (activeFilter === "Dwazrka") return pkg.location.toLowerCase().includes("dwarka");
    if (activeFilter === "Combo Tours") return pkg.days >= 4;
    if (activeFilter === "Budget Picks") return pkg.price < 13000;
    return true;
  });

  return (
    <section className="w-full bg-orange-50/40 py-16 px-4 sm:px-8 lg:px-16 xl:px-24">

      {/* ── SECTION HEADER ── */}
      <div className="mb-10 flex flex-col items-center text-center">

        {/* Eyebrow badge */}
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.13em] text-orange-600">
          <Sparkles size={12} strokeWidth={2.5} />
          Divine Gujarat Packages
        </span>

        {/* Main heading */}
        <h2 className="max-w-[560px] text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-tight text-gray-900">
         
          <span className="text-orange-500">Somnath &amp; Dwarka</span>
          <br />
          Tour Packages
        </h2>

        <p className="mt-4 max-w-[520px] text-[15px] font-normal leading-relaxed text-gray-500">
          Handcrafted spiritual journeys with VIP darshan, comfortable stays, and expert guides — made for families, pilgrims, and couples.
        </p>
      </div>

      {/* ── FILTER PILLS + COUNT ── */}
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`
                rounded-full px-5 py-2 text-[13.5px] font-medium transition-all duration-200
                ${activeFilter === f
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[13px] text-gray-400">
          <SlidersHorizontal size={14} strokeWidth={2} />
          <span>{filtered.length} package{filtered.length !== 1 ? "s" : ""} found</span>
        </div>
      </div>

      {/* ── TOUR CARDS GRID ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((pkg : any) => (
            <TourCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-5xl">🙏</p>
          <p className="mt-4 text-lg font-semibold text-gray-700">No packages found</p>
          <p className="mt-1 text-sm text-gray-400">Try a different filter</p>
        </div>
      )}

      {/* ── BOTTOM CTA ── */}
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-[14px] text-gray-400">
          Can't find what you're looking for?
        </p>
        <button className="rounded-2xl border-2 border-orange-500 px-8 py-3 text-[14.5px] font-bold text-orange-500 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-200 active:scale-95">
          Request Custom Package
        </button>
      </div>
    </section>
  );
}