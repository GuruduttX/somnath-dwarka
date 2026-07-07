"use client";

import { Briefcase } from "lucide-react";

interface PackageOverviewProps {
  overview: string | string[];
}

export default function PackageOverview({ overview }: PackageOverviewProps) {
  // Support both a single string (split on double newline) or pre-split array
  const paragraphs: string[] =
    Array.isArray(overview)
      ? overview
      : overview.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <section id="overview" className="w-full py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col pl-4 border-l-[3px] border-orange-500 mb-8">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-orange-500 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            What's included
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
            Package Overview
          </h2>
        </div>

        {/* ── Card ── */}
        <div className="relative rounded-2xl border border-orange-100 bg-white overflow-hidden">

          {/* Top orange accent line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300" />

          {/* Subtle dot-grid watermark */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #f97316 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Content */}
          <div className="relative px-6 sm:px-10 py-8 sm:py-10">
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-gray-600 text-[15px] sm:text-base leading-[1.85]"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* ── Footer note ── */}
          <div className="relative px-6 sm:px-10 pb-6 pt-2 border-t border-orange-50">
            <p className="flex items-center gap-2 text-[12px] text-orange-500">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
              Details are subject to availability &amp; seasonal adjustments
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}