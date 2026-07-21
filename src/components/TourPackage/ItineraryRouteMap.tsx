"use client";

import { useMemo, useState } from "react";
import { Navigation, MapPin, Route } from "lucide-react";

export type RouteDay = {
  day: number;
  title: string;
  description: string;
  /** Named stops for the day, in travel order. */
  stops: string[];
  /** Hour-by-hour steps, where the CMS carries them. */
  steps?: { time: string; activity: string }[];
};

/**
 * Places are written as bare names ("Bet Dwarka", "Sasan Gir"), which are
 * ambiguous worldwide, so every query is qualified before it reaches Maps.
 * ", India" is safe for every stop these itineraries use — including Diu and
 * Mumbai, which are outside Gujarat — where ", Gujarat" would not be.
 */
const qualify = (place: string) => `${place.trim()}, India`;

/**
 * Google's keyless embed endpoint, the same one shared/MapEmbed.tsx uses.
 * Two or more stops render as a route; a single stop renders as a pin.
 */
function embedSrc(places: string[]): string {
  if (places.length === 0) return "";
  if (places.length === 1) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(qualify(places[0]))}&output=embed`;
  }
  const [first, ...rest] = places;
  // Classic Maps chains waypoints on the destination with " to ".
  const daddr = rest.map(qualify).join(" to ");
  return `https://maps.google.com/maps?saddr=${encodeURIComponent(
    qualify(first),
  )}&daddr=${encodeURIComponent(daddr)}&output=embed`;
}

/** The official Maps URL scheme, for opening the day's route in a real map. */
function directionsUrl(places: string[]): string {
  if (places.length === 0) return "https://www.google.com/maps";
  if (places.length === 1) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      qualify(places[0]),
    )}`;
  }
  const origin = encodeURIComponent(qualify(places[0]));
  const destination = encodeURIComponent(qualify(places[places.length - 1]));
  const waypoints = places
    .slice(1, -1)
    .map((p) => encodeURIComponent(qualify(p)))
    .join("%7C");
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${
    waypoints ? `&waypoints=${waypoints}` : ""
  }&travelmode=driving`;
}

/**
 * A day-wise route map for a package: tabs for each day, the day's stops drawn
 * as a driving route, and a panel listing what happens where.
 *
 * The map is an iframe on Google's keyless embed endpoint — the convention
 * already used by shared/MapEmbed — so no API key is needed. "Open route"
 * leaves for the real Maps app via the documented URL scheme, where the route
 * can be navigated properly.
 *
 * Days whose stops the CMS has not filled in fall back to the place inferred
 * for the duration strip, so the map still centres somewhere sensible instead
 * of rendering blank.
 */
export default function ItineraryRouteMap({
  days,
  fallbackPlaces,
  places,
  title,
}: {
  days: RouteDay[];
  /** One place per day, inferred by the caller; used when `stops` is empty. */
  fallbackPlaces: string[];
  /**
   * Where the trip goes, for packages with no day-wise itinerary yet. Renders a
   * single map with no day tabs rather than hiding the section entirely.
   */
  places?: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  const resolved = useMemo(
    () =>
      days.map((d, i) => {
        const stops = d.stops.filter(Boolean);
        return stops.length ? stops : [fallbackPlaces[i]].filter(Boolean);
      }),
    [days, fallbackPlaces],
  );

  // No day-wise plan in the CMS yet: show where the trip goes, without
  // inventing days that nobody has written.
  if (!days.length) {
    const known = (places ?? []).filter(Boolean);
    if (!known.length) return null;
    return (
      <section
        aria-labelledby="route-map-h"
        className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-center gap-2">
          <span className="h-6 w-1 rounded-full bg-orange-500" />
          <h2 id="route-map-h" className="text-xl font-bold text-slate-950">
            Where this trip goes
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
            <div className="relative min-h-[320px] bg-orange-50/40 lg:min-h-[420px]">
              <iframe
                title={`${title} — route`}
                src={embedSrc(known)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                style={{ border: 0, display: "block", minHeight: "inherit" }}
              />
            </div>
            <div className="flex flex-col gap-4 p-5 sm:p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">
                  The route
                </p>
                <h3 className="font-playfair mt-1 text-2xl font-black leading-tight text-slate-900">
                  {known.join(" → ")}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  A day-wise plan is built around your dates — share them and we will sequence the
                  stops around darshan and drive times.
                </p>
              </div>
              <a
                href={directionsUrl(known)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <Navigation size={15} />
                Open route
              </a>
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <Route size={12} /> Stops
                </p>
                <ol className="space-y-2">
                  {known.map((p, i) => (
                    <li key={`${p}-${i}`} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-700">
                        {i + 1}
                      </span>
                      <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-800">
                        <MapPin size={13} className="text-orange-500" />
                        {p}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const day = days[active];
  const dayPlaces = resolved[active] ?? [];
  const src = embedSrc(dayPlaces);

  return (
    <section
      aria-labelledby="route-map-h"
      className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8"
    >
      <div className="mb-6 flex items-center gap-2">
        <span className="h-6 w-1 rounded-full bg-orange-500" />
        <h2 id="route-map-h" className="text-xl font-bold text-slate-950">
          Your route, day by day
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
        {/* ── Day tabs ── */}
        <div
          role="tablist"
          aria-label="Itinerary days"
          className="flex gap-2 overflow-x-auto border-b border-orange-100 bg-orange-50/40 px-3 py-3 sm:px-4"
        >
          {days.map((d, i) => (
            <button
              key={d.day}
              role="tab"
              aria-selected={i === active}
              aria-controls="route-map-panel"
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
                i === active
                  ? "bg-slate-900 text-white shadow-sm"
                  : "border border-orange-100 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700"
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        <div id="route-map-panel" className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr]">
          {/* ── Map ── */}
          <div className="relative min-h-[320px] bg-orange-50/40 lg:min-h-[460px]">
            {src ? (
              <iframe
                key={src}
                title={`${title} — Day ${day.day} route`}
                src={src}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                style={{ border: 0, display: "block", minHeight: "inherit" }}
              />
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center p-6 text-center text-sm text-slate-500">
                Stops for this day are being confirmed.
              </div>
            )}
          </div>

          {/* ── Day panel ── */}
          <div className="flex flex-col gap-4 p-5 sm:p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600">
                Day {day.day}
              </p>
              <h3 className="font-playfair mt-1 text-2xl font-black leading-tight text-slate-900">
                {day.title}
              </h3>
              {day.description ? (
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {day.description}
                </p>
              ) : null}
            </div>

            {dayPlaces.length ? (
              <a
                href={directionsUrl(dayPlaces)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                <Navigation size={15} />
                Open route
              </a>
            ) : null}

            {/* Hour-by-hour where the CMS has it, otherwise the stop list. */}
            {day.steps?.length ? (
              <ol className="space-y-3">
                {day.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-16 shrink-0 pt-0.5 text-[12px] font-bold text-orange-600">
                      {step.time}
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-slate-700">
                      {step.activity}
                    </span>
                  </li>
                ))}
              </ol>
            ) : dayPlaces.length ? (
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <Route size={12} /> Stops today
                </p>
                <ol className="space-y-2">
                  {dayPlaces.map((p, i) => (
                    <li key={`${p}-${i}`} className="flex items-center gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-orange-100 text-[11px] font-bold text-orange-700">
                        {i + 1}
                      </span>
                      <span className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-800">
                        <MapPin size={13} className="text-orange-500" />
                        {p}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-3 text-[12px] text-slate-400">
        Driving routes are indicative — the actual road taken depends on traffic and darshan timings
        on the day.
      </p>
    </section>
  );
}
