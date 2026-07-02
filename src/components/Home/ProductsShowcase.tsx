"use client";

import { useState } from "react";
import { Compass, Filter, Sparkles } from "lucide-react";
import type { TourPackage } from "@/src/utils/TourData";
import TourCard from "@/src/utils/TourCard";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

const FILTERS = ["All Packages", "Somnath", "Dwarka", "Combo Tours", "Budget Picks"];
const PAGE_SIZE = 6;

export default function ProductsShowcase({ packages }: { packages: TourPackage[] }) {
  const [activeFilter, setActiveFilter] = useState("All Packages");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [open, setOpen] = useState(false)

  const filtered: TourPackage[] = packages.filter((pkg) => {
    if (activeFilter === "All Packages") return true;
    if (activeFilter === "Somnath") return pkg.location.toLowerCase().includes("somnath");
    if (activeFilter === "Dwarka") return pkg.location.toLowerCase().includes("dwarka");
    if (activeFilter === "Combo Tours") return pkg.days >= 4 || pkg.location.toLowerCase().includes("dwarka");
    if (activeFilter === "Budget Picks") return Boolean(pkg.price && pkg.price < 13000);
    return true;
  });

  // Reset visible count whenever filter changes
  const handleFilter = (f: string) => {
    setActiveFilter(f);
    setVisibleCount(PAGE_SIZE);
  };

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  return (
    <>
      <CommonEnquiryForm open={open} onClose={()=>setOpen(false)}/>
      <section className="w-full bg-[#fffaf5] py-16 px-4 sm:px-8 lg:px-16 xl:px-24">

      {/* ── SECTION HEADER ── */}
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.13em] text-orange-600 shadow-sm">
          <Sparkles size={12} strokeWidth={2.5} />
          Live packages from admin
        </span>

        <h2 className="max-w-[660px] text-[clamp(30px,4vw,48px)] font-bold leading-tight tracking-tight text-gray-950">
          <span className="text-orange-500">Curated Somnath &amp;</span> Dwarka journeys
        </h2>

        <p className="mt-4 max-w-[620px] text-[15px] font-normal leading-relaxed text-gray-600">
          Browse the latest published tour packages managed from the admin panel, with clear inclusions, routes, pricing and quick enquiry.
        </p>
      </div>

      {/* ── FILTER PILLS + COUNT ── */}
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-orange-100 bg-white/80 p-3 shadow-sm backdrop-blur">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`
                rounded-full px-5 py-2.5 text-[13.5px] cursor-pointer font-semibold transition-all duration-200
                ${activeFilter === f
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 text-[13px] font-medium text-gray-500">
          <Filter size={14} strokeWidth={2} />
          <span>
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} package{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── TOUR CARDS GRID ── */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((pkg) => (
            <TourCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-orange-200 bg-white py-20 text-center">
          <Compass className="text-orange-500" size={42} />
          <p className="mt-4 text-lg font-semibold text-gray-800">No packages found</p>
          <p className="mt-1 text-sm text-gray-500">Publish a matching package from admin or try another filter.</p>
        </div>
      )}

      {/* ── VIEW MORE ── */}
      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <button
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full bg-orange-500 px-10 py-3.5 text-[14.5px] font-bold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg active:translate-y-0"
          >
            View More Packages
          </button>
          <p className="text-[13px] text-gray-400">
            {remaining} more package{remaining !== 1 ? "s" : ""} available
          </p>
        </div>
      )}

      {/* ── BOTTOM CTA ── */}
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-[14px] text-gray-400">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <button onClick={() => setOpen(true)} className="cursor-pointer rounded-full border border-orange-500 px-8 py-3 text-[14.5px] font-bold text-orange-600 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-200 active:scale-95">
          Request Custom Package
        </button>
      </div>
    </section>
    </>
  );
}
