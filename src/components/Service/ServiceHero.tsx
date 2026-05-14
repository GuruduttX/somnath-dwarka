"use client";

import Link from "next/link";
import {
  Sparkles,
  Search,
  Map,
  Car,
  Camera,
  Flame,
  BedDouble,
  Church,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  value: string;
  label: string;
}

interface ServiceHeroProps {
  eyebrow?: string;
  titleStart?: string;
  titleHighlight?: string;
  description?: string;
  browsePath?: string;
  planPath?: string;
  pills?: { label: string; icon: React.ReactNode }[];
  stats?: Stat[];
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_PILLS = [
  { label: "Transport",       icon: <Car      className="w-4 h-4 text-orange-500" /> },
  { label: "Darshan Booking", icon: <Church   className="w-4 h-4 text-orange-500" /> },
  { label: "Photography",     icon: <Camera   className="w-4 h-4 text-orange-500" /> },
  { label: "Pooja & Aarti",   icon: <Flame    className="w-4 h-4 text-orange-500" /> },
  { label: "Hotel Stay",      icon: <BedDouble className="w-4 h-4 text-orange-500" /> },
];

const DEFAULT_STATS: Stat[] = [
  { value: "4,800+", label: "Happy Pilgrims" },
  { value: "4.9★",   label: "Rating"         },
  { value: "12 Yrs", label: "Experience"     },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServiceHero({
  eyebrow       = "Sacred Gujarat Experiences",
  titleStart    = "Discover Every Way to Experience",
  titleHighlight = "Somnath & Dwarka",
  description   = "From the eternal flame of the Jyotirlinga to the sacred shores of Lord Krishna's Dwarka — explore our handpicked pilgrimage services designed to make your Gujarat yatra truly unforgettable.",
  browsePath    = "/services",
  planPath      = "/plan-my-trip",
  pills         = DEFAULT_PILLS,
  stats         = DEFAULT_STATS,
}: ServiceHeroProps) {
  return (
    <section className="w-full py-22 : md:py-26 px-4 sm:px-6 ">
      <div className="max-w-4xl mx-auto text-center">

        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 border border-orange-200 rounded-full px-4 py-2 text-[13px] text-orange-700 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          {eyebrow}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-[3.25rem] font-semibold text-gray-900 leading-[1.1] tracking-tight mb-5">
          {titleStart}{" "}
          <span className="text-orange-500">{titleHighlight}</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-8">
          {description}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link href={browsePath}>
            <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white rounded-full px-7 py-3.5 text-[15px] font-medium cursor-pointer">
              <Search className="w-4 h-4" />
              Browse All Services
            </button>
          </Link>
          <Link href={planPath}>
            <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700 rounded-full px-6 py-3.5 text-[15px] cursor-pointer">
              <Map className="w-4 h-4" />
              Plan My Yatra
            </button>
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {pills.map((pill) => (
            <div
              key={pill.label}
              className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-[13px] text-gray-600 bg-white hover:border-orange-200 hover:text-orange-700 transition-colors cursor-pointer"
            >
              {pill.icon}
              {pill.label}
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid border-t border-gray-100 pt-8"
          style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < stats.length - 1 ? "border-r border-gray-100" : ""}`}
            >
              <p className="text-2xl sm:text-3xl font-semibold text-orange-500">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}