"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Navigation } from "lucide-react";

type Segment = {
  id: string;
  from: string;
  to: string;
};

type RouteType = {
  source: string;
  destination: string;
  segments: Segment[];
};

export default function DestinationRoute({
  routeData,
}: {
  routeData: RouteType;
}) {
  const [open, setOpen] = useState(false);

  // Build deduplicated stop list
  const stops: string[] = [routeData.source];
  for (const seg of routeData.segments) {
    if (stops[stops.length - 1] !== seg.from) stops.push(seg.from);
    stops.push(seg.to);
  }
  if (stops[stops.length - 1] !== routeData.destination) {
    stops.push(routeData.destination);
  }

  return (
    // w-full — matches the itinerary bar and trip highlights above/below
    <div className="w-full px-6">
      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">

        {/* ── HEADER / TOGGLE ─────────────────────────────────────── */}
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-orange-50 active:bg-orange-100"
          aria-expanded={open}
        >
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100">
              <Navigation size={16} className="text-orange-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-400">
                Travel Route
              </p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {routeData.source}
                <span className="mx-1.5 font-normal text-orange-400">→</span>
                {routeData.destination}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-semibold text-orange-600">
              {stops.length} stops
            </span>
            <ChevronDown
              size={16}
              className={`text-orange-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* ── TIMELINE ──────────────────────────────────────────────── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[600px]" : "max-h-0"
          }`}
        >
          <div className="border-t border-orange-50 px-5 py-5">
            <div className="relative">

              {/* Vertical gradient line */}
              <div className="absolute left-[14px] top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-orange-500 via-orange-300 to-orange-100" />

              <ol className="space-y-0">
                {stops.map((stop, idx) => {
                  const isFirst = idx === 0;
                  const isLast  = idx === stops.length - 1;
                  const isMid   = !isFirst && !isLast;

                  return (
                    <li
                      key={`${stop}-${idx}`}
                      className="relative flex items-start gap-4 pb-5 last:pb-0"
                    >
                      {/* Dot */}
                      <div className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center">
                        {!isMid ? (
                          <div
                            className={`h-[14px] w-[14px] rounded-full border-2 border-white shadow-sm ring-1 ${
                              isFirst
                                ? "bg-orange-500 ring-orange-300"
                                : "bg-orange-400 ring-orange-200"
                            }`}
                          />
                        ) : (
                          <div className="h-[10px] w-[10px] rounded-full border-2 border-orange-400 bg-white" />
                        )}
                      </div>

                      {/* Label */}
                      <div className="flex min-w-0 flex-1 flex-col pt-0.5">
                        {(isFirst || isLast) && (
                          <span className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-orange-500">
                            {isFirst ? "Departure" : "Arrival"}
                          </span>
                        )}
                        <p
                          className={`truncate text-sm font-medium ${
                            isFirst
                              ? "text-gray-900"
                              : isLast
                              ? "text-orange-600"
                              : "text-gray-500"
                          }`}
                        >
                          {isMid && (
                            <MapPin
                              size={11}
                              className="mr-1 inline-block -mt-0.5 text-orange-300"
                            />
                          )}
                          {stop}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-orange-50 bg-orange-50/50 px-5 py-3">
            <p className="text-[11px] text-orange-400">
              {routeData.segments.length} segment{routeData.segments.length !== 1 ? "s" : ""}
            </p>
            <p className="text-[11px] font-medium text-orange-600">
              {routeData.source} → {routeData.destination}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}