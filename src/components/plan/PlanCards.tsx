"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Route, CalendarDays, Compass, MapPin, Clock, ArrowRight, HelpCircle } from "lucide-react";

interface Mode {
  mode: string;
  distance: string;
  duration: string;
  note: string;
}
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  stops?: string[];
}
interface Journey {
  slug: string;
  question: string;
  direct_answer: string;
  modes?: Mode[];
  itinerary?: ItineraryDay[];
}

// Classify a journey into a visual category.
function meta(j: Journey) {
  if (j.itinerary && j.itinerary.length > 0) {
    return { Icon: CalendarDays, label: "Day-wise itinerary", accent: "text-orange-600 bg-orange-50 ring-orange-100" };
  }
  if (j.modes && j.modes.length > 0) {
    return { Icon: Route, label: "Distance & route", accent: "text-amber-600 bg-amber-50 ring-amber-100" };
  }
  return { Icon: Compass, label: "Planning tip", accent: "text-emerald-600 bg-emerald-50 ring-emerald-100" };
}

export function PlanCards({ journeys }: { journeys: Journey[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {journeys.map((j, idx) => {
        const { Icon, label, accent } = meta(j);
        const road = j.modes?.find((m) => m.mode.toLowerCase().includes("road"));
        const days = j.itinerary?.length;
        return (
          <motion.div
            key={j.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: (idx % 3) * 0.06 }}
            viewport={{ once: true }}
          >
            <Link
              href={`/plan/${j.slug}/`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_10px_30px_rgba(234,88,12,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_50px_rgba(234,88,12,0.14)]"
            >
              {/* corner glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.16)_0%,transparent_70%)] transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />

              {/* category */}
              <div className="relative flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide ring-1 ${accent}`}>
                  <Icon size={12} />
                  {label}
                </span>
                <HelpCircle size={16} className="text-orange-200" />
              </div>

              {/* question */}
              <h3 className="relative mt-4 text-[17px] font-black leading-snug text-[#3a2416] transition-colors group-hover:text-[#E87722]">
                {j.question}
              </h3>

              {/* answer */}
              <p className="relative mt-2.5 line-clamp-3 flex-1 text-[13px] leading-relaxed text-[#6b4c38]">
                {j.direct_answer}
              </p>

              {/* quick facts */}
              {(road || days) && (
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {road && (
                    <>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700">
                        <MapPin size={11} /> {road.distance}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700">
                        <Clock size={11} /> {road.duration}
                      </span>
                    </>
                  )}
                  {days && (
                    <span className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700">
                      <CalendarDays size={11} /> {days}-day plan
                    </span>
                  )}
                </div>
              )}

              {/* read link */}
              <div className="relative mt-5 flex items-center gap-1.5 border-t border-orange-50 pt-4 text-[13px] font-bold text-orange-700">
                Read the guide
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
