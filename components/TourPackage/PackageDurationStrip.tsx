"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

interface DurationItem {
  id: string;
  days: number;
  place: string;
}

interface PackageDurationStripProps {
  duration: string;
  breakdown: DurationItem[];
}

function ordinal(n: number): { num: string; suffix: string } {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return {
    num: String(n),
    suffix: s[(v - 20) % 10] ?? s[v] ?? s[0],
  };
}

export default function PackageDurationStrip({
  duration,
  breakdown,
}: PackageDurationStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-4 md:px-6 py-0 sm:py-4">
      <div className="max-w-7xl mx-auto ">
        {/* ── DESKTOP ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-stretch gap-0 overflow-x-auto  no-scrollbar
            rounded-xl border border-orange-100 bg-white shadow-sm max-w-4xl"
        >
          {/* Duration badge cell */}
          <div className="flex items-center shrink-0 px-5 py-4 border-r border-orange-100 bg-orange-50">
            <span
              className="inline-flex items-center rounded-full text-white px-4 py-1.5
                text-sm font-bold tracking-wide whitespace-nowrap
                bg-[linear-gradient(145deg,#7A2E00_0%,#A84010_40%,#E8821A_100%)]
                shadow-md shadow-orange-200"
            >
              {duration}
            </span>
          </div>

          {/* Stop cells */}
          {breakdown.map((item, index) => {
            const { num, suffix } = ordinal(index + 1);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.35) }}
                className="flex items-center shrink-0 gap-3 px-5 py-4
        border-r border-orange-100 last:border-r-0
        hover:bg-orange-50/60 transition-colors duration-150 group cursor-pointer"
              >
                <span
                  className="text-3xl font-extrabold text-orange-500
          group-hover:text-orange-600 transition-colors leading-none tabular-nums"
                >
                  {num}
                  <sup className="text-sm font-bold">{suffix}</sup>
                </span>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-medium">
                    Day in
                  </span>
                  <span className="text-sm font-semibold text-orange-900 whitespace-nowrap">
                    {item.place}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── MOBILE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden rounded-2xl border border-orange-100/80 bg-white shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-orange-50 border-b border-orange-100/80">
            <span
              className="inline-flex items-center rounded-full text-white
              px-3.5 py-1 text-xs font-bold tracking-wide
              bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-400
              shadow-sm shadow-orange-200/60"
            >
              {duration}
            </span>
            <span className="text-[11px] text-orange-600 font-medium">
              {breakdown.length} stops &nbsp;→ swipe
            </span>
          </div>

          {/* Swipeable chips */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {breakdown.map((item, index) => {
                const { num, suffix } = ordinal(index + 1);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.88 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: Math.min(index * 0.05, 0.3),
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="flex flex-col items-center justify-center gap-0.5
                      flex-shrink-0 snap-start px-5 py-3
                      border-r border-orange-100/80 last:border-r-0
                      w-max min-w-[88px] cursor-pointer
                      active:bg-orange-50 transition-colors"
                  >
                    <div className="flex items-baseline gap-px">
                      <span className="text-[22px] font-extrabold text-orange-500 leading-none tabular-nums">
                        {num}
                      </span>
                      <span className="text-[9px] font-bold text-orange-700 leading-none mb-0.5">
                        {suffix}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight whitespace-nowrap">
                      {item.place}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Right fade scroll hint */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-8
              bg-gradient-to-l from-white to-transparent"
            />
          </div>

          {/* Swipe footer */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 border-t border-amber-100/80 bg-amber-50/40">
            <svg
              className="w-3 h-3 text-amber-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            <span className="text-[10px] text-amber-700 font-medium">
              Swipe to see all stops
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}