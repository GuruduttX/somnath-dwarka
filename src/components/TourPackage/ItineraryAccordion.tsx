"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Clock } from "lucide-react";

export default function ItineraryAccordion({ PackageData }: any) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="w-full px-6">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">
            Day by Day
          </p>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Trip Itinerary
          </h2>
        </div>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
          {PackageData.itinerary.length} Days
        </span>
      </div>

      {/* ── ACCORDION LIST ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5">
        {PackageData.itinerary.map((item: any, index: number) => {
          const isOpen = active === index;

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                isOpen
                  ? "border-orange-200 bg-white shadow-md shadow-orange-100/60"
                  : "border-orange-100 bg-white hover:border-orange-200 hover:shadow-sm"
              }`}
            >
              {/* ── ROW HEADER ─────────────────────────────────── */}
              <button
                onClick={() => setActive(isOpen ? null : index)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
                aria-expanded={isOpen}
              >
                {/* Day badge */}
                <div
                  className={`flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl transition-colors duration-200 sm:h-11 sm:w-11 ${
                    isOpen
                      ? "bg-orange-500 text-white shadow-md shadow-orange-300/40"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  <span className="text-[9px] font-semibold uppercase leading-none tracking-wider">
                    Day
                  </span>
                  <span className="text-base font-bold leading-tight">
                    {item.day}
                  </span>
                </div>

                {/* Title block */}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                    {item.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] text-orange-400">
                      <Clock size={10} />
                      Full Day
                    </span>
                    <span className="h-2.5 w-px bg-orange-200" />
                    <span className="flex items-center gap-1 text-[11px] text-orange-400">
                      <MapPin size={10} />
                      Temple Visits
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronDown
                  size={17}
                  className={`shrink-0 text-orange-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ── CONTENT ────────────────────────────────────── */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[800px]" : "max-h-0"
                }`}
              >
                <div className="mx-4 h-px bg-orange-100 sm:mx-5" />

                <div className="px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
                  <div
                    className="
                      ItineraryContent
                      prose prose-sm max-w-none
                      text-gray-600
                      prose-p:leading-7 prose-p:text-gray-600
                      prose-ul:list-disc prose-ul:pl-5 prose-ul:text-gray-600
                      prose-ol:list-decimal prose-ol:pl-5 prose-ol:text-gray-600
                      prose-li:my-1 prose-li:marker:text-orange-400
                      prose-strong:text-gray-800 prose-strong:font-semibold
                      max-h-[400px] overflow-y-auto pr-1
                    "
                    dangerouslySetInnerHTML={{ __html: item?.description ?? "" }}
                  />

                  {/* Accent dots */}
                  <div className="mt-5 flex items-center gap-2">
                    <div className="h-[3px] w-12 rounded-full bg-orange-500" />
                    <div className="h-[3px] w-5 rounded-full bg-orange-200" />
                    <div className="h-[3px] w-2 rounded-full bg-orange-100" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}