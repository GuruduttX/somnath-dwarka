"use client";

import { useState } from "react";
import Image from "next/image";
import { Users, Fuel, ChevronDown, Search, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type Inclusion = {
  _id: string;
  id: string;
  description: string;
};

type Taxi = {
  _id: string;
  title: string;
  image: string;
  alt: string;
  cabType: string;
  fuelType: string;
  seats: number;
  basePrice: number;
  inclusions: Inclusion[];
  exclusions: Inclusion[];
  status: string;
};

const CAB_TYPES = [
  "all",
  "Sedan",
  "SUV",
  "Hatchback",
  "MiniBus",
  "Tempo Traveller",
];

const FUEL_TYPES = [
  { value: "all", label: "All" },
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Electric", label: "Electric" },
  { value: "CNG", label: "CNG" },
];

const CAB_BADGE: Record<string, string> = {
  SUV: "bg-emerald-100 text-emerald-700",
  Sedan: "bg-sky-100 text-sky-700",
  Hatchback: "bg-violet-100 text-violet-700",
  MiniBus: "bg-pink-100 text-pink-700",
  "Tempo Traveller": "bg-orange-100 text-orange-700",
};

// How many cards to show initially / per load-more step
const MOBILE_INITIAL = 4;
const MOBILE_STEP = 4;
const DESKTOP_INITIAL = 6; // 2 rows × 3 cols (or 2 rows × 2 cols on tablet)
const DESKTOP_STEP = 6;

export default function TaxiArchive({ taxis }: { taxis: Taxi[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileVisible, setMobileVisible] = useState(MOBILE_INITIAL);
  const [desktopVisible, setDesktopVisible] = useState(DESKTOP_INITIAL);

  const filtered = taxis.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchCab = filter === "all" || t.cabType === filter;
    const matchFuel = fuelFilter === "all" || t.fuelType === fuelFilter;
    return matchSearch && matchCab && matchFuel;
  });

  // Reset visible counts whenever filters / search change
  const resetAndFilter = (cb: () => void) => {
    cb();
    setMobileVisible(MOBILE_INITIAL);
    setDesktopVisible(DESKTOP_INITIAL);
  };

  return (
    <section className="min-h-screen bg-white py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <div className="mb-10 pl-1">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 bg-clip-text text-transparent tracking-tight leading-tight">
            Premium Taxi Services
          </h2>
          <svg
            viewBox="0 0 340 10"
            className="w-56 sm:w-80 mt-1"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ul" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>
            <path
              d="M0,5 Q85,0 170,5 T340,5"
              fill="none"
              stroke="url(#ul)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-60 shrink-0 bg-white border border-orange-100 rounded-2xl p-5 h-fit shadow-sm">
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <div className="flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 block" />
                <span className="text-base font-bold text-stone-800">
                  Filters
                </span>
              </div>
              <ChevronDown
                size={18}
                className={`text-amber-500 lg:hidden transition-transform duration-300 ${sidebarOpen ? "rotate-180" : ""}`}
              />
            </button>

            <div
              className={`mt-5 space-y-6 ${sidebarOpen ? "block" : "hidden"} lg:block`}
            >
              {/* Search */}
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  value={search}
                  onChange={(e) =>
                    resetAndFilter(() => setSearch(e.target.value))
                  }
                  placeholder="Search cab..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-stone-200 bg-stone-50 text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
                />
              </div>

              {/* Cab Type */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-3">
                  Cab Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {CAB_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        resetAndFilter(() => setFilter(type));
                        setSidebarOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        filter === type
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-transparent shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-600"
                      }`}
                    >
                      {type === "all" ? "All" : type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100" />

              {/* Fuel Type */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-3">
                  Fuel Type
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {FUEL_TYPES.map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => {
                        resetAndFilter(() => setFuelFilter(value));
                        setSidebarOpen(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                        fuelFilter === value
                          ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white border-transparent shadow-sm"
                          : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:text-amber-600"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {(filter !== "all" || fuelFilter !== "all") && (
                <button
                  onClick={() => {
                    resetAndFilter(() => {
                      setFilter("all");
                      setFuelFilter("all");
                    });
                  }}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-orange-500 border border-dashed border-orange-300 hover:bg-orange-50 transition-all"
                >
                  ✕ Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* ── LISTINGS ── */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            {/* Trust banner */}
            <div className="flex items-center justify-between md:justify-around text-white text-[11px] sm:text-sm font-semibold px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-md">
              <span className="whitespace-nowrap">✓ Trusted Drivers</span>
              <span className="opacity-40">•</span>
              <span className="whitespace-nowrap">✓ Clean Cabs</span>
              <span className="opacity-40">•</span>
              <span className="whitespace-nowrap">✓ On-Time Pickup</span>
            </div>

            {/* Results count */}
            <p className="text-xs text-stone-400 font-medium px-1">
              {filtered.length} cab{filtered.length !== 1 ? "s" : ""} found
            </p>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-stone-100 p-16 text-center text-stone-400 text-sm">
                No cabs match your filters.
              </div>
            ) : (
              <>
                {/* ═══════════════════════════════════════
                    MOBILE ONLY — compact horizontal rows
                ════════════════════════════════════════ */}
                <div className="flex flex-col gap-3 sm:hidden">
                  {filtered.slice(0, mobileVisible).map((taxi, i) => {
                    const badgeCls =
                      CAB_BADGE[taxi.cabType] ?? "bg-stone-100 text-stone-600";
                    return (
                      <motion.div
                        key={taxi._id + "-mob"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-row"
                      >
                        {/* Accent */}
                        <div className="w-[3px] shrink-0 bg-gradient-to-b from-amber-400 to-orange-500" />

                        {/* Image */}
                        <div className="relative w-[96px] shrink-0 self-stretch">
                          <Image
                            src={taxi.image}
                            alt={taxi.alt}
                            fill
                            loading="lazy"
                            className="object-cover"
                            sizes="96px"
                          />
                          <span
                            className={`absolute bottom-1.5 left-1.5 text-[8px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${badgeCls}`}
                          >
                            {taxi.cabType}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 px-3 py-2.5 flex flex-col justify-between gap-2">
                          <h3 className="font-bold text-[13px] text-stone-800 leading-tight line-clamp-2">
                            {taxi.title}
                          </h3>

                          <div className="flex items-center gap-1.5">
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-2 py-0.5">
                              <Users size={9} className="text-amber-500" />
                              {taxi.seats} Seats
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-2 py-0.5">
                              <Fuel size={9} className="text-amber-500" />
                              {taxi.fuelType}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                            <div>
                              <p className="text-[15px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent leading-none">
                                ₹{taxi.basePrice.toLocaleString("en-IN")}
                              </p>
                              <p className="text-[9px] text-stone-400 mt-0.5">
                                per trip
                              </p>
                            </div>
                            <Link href={`taxi/review/${taxi._id}`}>
                              <button className="px-3 py-1.5 rounded-full text-white text-[10px] font-bold bg-gradient-to-r from-amber-400 to-orange-600 shadow hover:scale-105 active:scale-95 transition-all cursor-pointer">
                                Book →
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Load More */}
                  {mobileVisible < filtered.length && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => setMobileVisible((v) => v + MOBILE_STEP)}
                      className="mt-1 w-full py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-amber-400 to-orange-600 shadow-md hover:brightness-105 hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                    >
                      Load More
                      <span className="ml-2 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {filtered.length - mobileVisible} left
                      </span>
                    </motion.button>
                  )}
                </div>

                {/* ═════════════════════════════════════════
                    TABLET + DESKTOP — vertical grid cards
                ══════════════════════════════════════════ */}
                <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.slice(0, desktopVisible).map((taxi, i) => {
                    const badgeCls =
                      CAB_BADGE[taxi.cabType] ?? "bg-stone-100 text-stone-600";
                    return (
                      <motion.div
                        key={taxi._id + "-grid"}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 16px 40px rgba(245,158,11,0.15)",
                        }}
                        className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col group"
                      >
                        {/* Image */}
                        <div className="relative w-full h-44 overflow-hidden">
                          <Image
                            src={taxi.image}
                            alt={taxi.alt}
                            fill
                            loading="lazy"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 1280px) 50vw, 33vw"
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          {/* Badge */}
                          <span
                            className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeCls}`}
                          >
                            {taxi.cabType}
                          </span>
                          {/* Price overlay */}
                          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                            <p className="text-sm font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent leading-none">
                              ₹{taxi.basePrice.toLocaleString("en-IN")}
                            </p>
                            <p className="text-[9px] text-stone-400 font-medium text-right">
                              / trip
                            </p>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="flex flex-col flex-1 p-4 gap-3">
                          <h3 className="font-bold text-[15px] text-stone-800 leading-snug tracking-tight line-clamp-2">
                            {taxi.title}
                          </h3>

                          {/* Meta pills */}
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">
                              <Users size={11} className="text-amber-500" />
                              {taxi.seats} Seats
                            </span>
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">
                              <Fuel size={11} className="text-amber-500" />
                              {taxi.fuelType}
                            </span>
                          </div>

                          {/* Top 3 inclusions */}
                          <div className="flex flex-col gap-1.5">
                            {taxi.inclusions.slice(0, 3).map((inc) => (
                              <div
                                key={inc._id}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2
                                  size={12}
                                  className="text-green-500 mt-0.5 shrink-0"
                                />
                                <span className="text-[11px] text-stone-500 leading-snug line-clamp-1">
                                  {inc.description}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="mt-auto pt-3 border-t border-stone-100">
                            <Link
                              href={`taxi/review/${taxi._id}`}
                              className="block"
                            >
                              <button className="w-full py-2.5 rounded-xl text-white text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-600 shadow-md hover:brightness-105 hover:shadow-lg active:scale-95 transition-all cursor-pointer">
                                Select Cab →
                              </button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Desktop Load More */}
                {desktopVisible < filtered.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden sm:flex justify-center mt-2"
                  >
                    <button
                      onClick={() => setDesktopVisible((v) => v + DESKTOP_STEP)}
                      className="group flex items-center gap-3 px-8 py-3 rounded-full font-bold text-sm text-amber-600 border-2 border-dashed border-amber-300 hover:bg-amber-50 hover:border-amber-400 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Load More</span>
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {filtered.length - desktopVisible} more
                      </span>
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
