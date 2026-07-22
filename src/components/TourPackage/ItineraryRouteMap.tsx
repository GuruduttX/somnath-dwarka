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
 * Google's keyless embed endpoint.
 *
 * This must be the /maps/embed?pb= form, NOT the older
 * `maps.google.com/maps?q=…&output=embed`. That older URL 301s here, and the
 * redirect response carries `X-Frame-Options: SAMEORIGIN` — browsers enforce
 * framing rules on every hop of a redirect chain, so the iframe was being
 * blocked and the map rendered blank. Pointing straight at the final endpoint
 * skips the redirect; it sends no XFO header and still needs no API key.
 *
 * Two or more stops render as a driving route; a single stop renders as a pin.
 */
function embedSrc(places: string[]): string {
  if (places.length === 0) return "";
  const enc = (p: string) => encodeURIComponent(qualify(p));
  if (places.length === 1) {
    return `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${enc(places[0])}`;
  }
  const [first, ...rest] = places;
  // The directions pb chains every stop after the origin into one " to " string.
  const daddr = rest.map((p) => qualify(p)).join(" to ");
  return `https://www.google.com/maps/embed?origin=mfe&pb=!1m5!4m4!4m1!2s${enc(
    first,
  )}!4m1!2s${encodeURIComponent(daddr)}`;
}

/**
 * Places these itineraries actually visit, longest alias first so "Bet Dwarka"
 * and "Sasan Gir" win over the bare "Dwarka" / "Gir" they contain.
 *
 * Editors rarely fill the CMS `stops` field, so without this a day's map showed
 * a single inferred pin instead of the route the day actually drives. Reading
 * the places back out of the day's own text gives every day a real route.
 */
const GAZETTEER: { name: string; aliases: string[]; parent?: string }[] = [
  { name: "Bet Dwarka", aliases: ["bet dwarka", "beyt dwarka"] },
  { name: "Nageshwar Jyotirlinga", aliases: ["nageshwar"], parent: "Dwarka" },
  { name: "Rukmini Devi Temple, Dwarka", aliases: ["rukmini"], parent: "Dwarka" },
  { name: "Gopi Talav, Dwarka", aliases: ["gopi talav"], parent: "Dwarka" },
  { name: "Shivrajpur Beach", aliases: ["shivrajpur"], parent: "Dwarka" },
  { name: "Dwarkadhish Temple, Dwarka", aliases: ["dwarkadhish"], parent: "Dwarka" },
  { name: "Dwarka", aliases: ["dwarka"] },
  { name: "Bhalka Tirth", aliases: ["bhalka"], parent: "Somnath" },
  { name: "Triveni Sangam, Somnath", aliases: ["triveni"], parent: "Somnath" },
  { name: "Gita Mandir, Somnath", aliases: ["gita mandir"], parent: "Somnath" },
  { name: "Somnath", aliases: ["somnath"] },
  { name: "Sasan Gir", aliases: ["sasan gir", "gir national park", "gir forest", "sasan", "gir"] },
  { name: "Girnar", aliases: ["girnar"], parent: "Junagadh" },
  { name: "Junagadh", aliases: ["junagadh"] },
  { name: "Kirti Mandir, Porbandar", aliases: ["kirti mandir"], parent: "Porbandar" },
  { name: "Porbandar", aliases: ["porbandar"] },
  { name: "Madhavpur Beach", aliases: ["madhavpur"] },
  { name: "Veraval", aliases: ["veraval"] },
  { name: "Diu", aliases: ["diu"] },
  { name: "Jamnagar", aliases: ["jamnagar"] },
  { name: "Rajkot", aliases: ["rajkot"] },
  { name: "Statue of Unity, Kevadia", aliases: ["statue of unity", "kevadia"] },
  { name: "Bhuj", aliases: ["bhuj"] },
  { name: "Kutch", aliases: ["kutch", "rann of kutch"] },
  { name: "Ahmedabad", aliases: ["ahmedabad"] },
  { name: "Vadodara", aliases: ["vadodara", "baroda"] },
  { name: "Surat", aliases: ["surat"] },
  { name: "Mumbai", aliases: ["mumbai"] },
  { name: "Udaipur", aliases: ["udaipur"] },
  { name: "Mount Abu", aliases: ["mount abu"] },
];

const PARENT_OF = new Map(GAZETTEER.filter((g) => g.parent).map((g) => [g.name, g.parent!]));

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Pull the day's stops out of its own copy, in the order they are mentioned.
 * Overlapping matches are resolved in favour of the longer alias, so
 * "…drive to Bet Dwarka" yields Bet Dwarka once rather than Dwarka + Bet Dwarka.
 */
function placesFromText(text: string, limit = 6): string[] {
  const haystack = text.toLowerCase();
  const hits: { name: string; at: number; len: number }[] = [];

  for (const entry of GAZETTEER) {
    for (const alias of entry.aliases) {
      const re = new RegExp(`\\b${escapeRe(alias)}\\b`, "g");
      let m: RegExpExecArray | null;
      while ((m = re.exec(haystack)) !== null) {
        hits.push({ name: entry.name, at: m.index, len: alias.length });
      }
    }
  }

  // Earliest mention first; where two aliases start together the longer wins.
  hits.sort((a, b) => a.at - b.at || b.len - a.len);

  const taken: { start: number; end: number }[] = [];
  const ordered: string[] = [];
  for (const hit of hits) {
    const end = hit.at + hit.len;
    if (taken.some((t) => hit.at < t.end && end > t.start)) continue;
    taken.push({ start: hit.at, end });
    if (!ordered.includes(hit.name)) ordered.push(hit.name);
  }

  // A city and a landmark inside it are the same point on the map, so drop the
  // city when one of its landmarks is already on the list ("Porbandar" goes
  // when "Kirti Mandir, Porbandar" is there).
  const covered = new Set(ordered.map((n) => PARENT_OF.get(n)).filter(Boolean) as string[]);
  const pruned = ordered.filter((n) => !covered.has(n));

  // Google's keyless directions embed degrades past a handful of waypoints.
  return pruned.slice(0, limit);
}

/**
 * Day titles here follow "A to B" (sometimes "A to B via C"), which states the
 * real travel order — whereas mention order in the prose does not ("Dwarka to
 * Somnath via Porbandar" would otherwise route Dwarka → Somnath → Porbandar).
 * So when the title names both ends, pin them to first and last.
 */
function orderByTitle(places: string[], title: string): string[] {
  const m = title.match(/^(.+?)\s+to\s+(.+)$/i);
  if (!m) return places;

  // The title names a city ("Somnath"), but the list may hold only landmarks
  // inside it ("Bhalka Tirth") because the city itself was pruned as their
  // parent — so match on the landmark standing in for the city.
  const resolve = (fragment: string) => {
    const named = placesFromText(fragment, 1)[0];
    if (!named) return undefined;
    return places.find((p) => p === named || PARENT_OF.get(p) === named);
  };

  const start = resolve(m[1]);
  const end = resolve(m[2].split(/\bvia\b/i)[0]);
  if (start === end) return places;

  // Only one end named ("The coastal run to Somnath") still fixes that end,
  // which is enough to stop the route running backwards.
  if (start && !end) return [start, ...places.filter((p) => p !== start)];
  if (end && !start) return [...places.filter((p) => p !== end), end];
  if (!start || !end) return places;

  const middle = places.filter((p) => p !== start && p !== end);
  return [start, ...middle, end];
}

/**
 * Arrival days ("To Dwarka", "Arrive Dwarka") end where the title says, and
 * their prose lists how to get there — "fly into Jamnagar and drive", "From
 * Ahmedabad this is an 8 to 9 hour day". Those are travel options, not stops,
 * so restrict the day to its named place and the landmarks inside it.
 *
 * Deliberately narrow: it fires only on arrival phrasing. Days that move
 * ("Bet Dwarka and Nageshwar", "Safari, then Junagadh", any "A to B") are left
 * alone, because they really do visit what their text mentions.
 */
function anchorSingleSiteDay(places: string[], title: string): string[] {
  if (!/^\s*(to|arrive|arrival(\s+in)?|reach)\b/i.test(title)) return places;

  const named = placesFromText(title, 3);
  if (named.length !== 1) return places;

  const anchor = named[0];
  const kept = places.filter((p) => p === anchor || PARENT_OF.get(p) === anchor);
  return kept.length ? kept : places;
}

/**
 * Keep only places the package actually visits.
 *
 * Day prose names cities the trip never stops in — "fly into Jamnagar and
 * drive", "From Ahmedabad this is an 8 to 9 hour day" are arrival *options*,
 * not stops, and mining them drew routes through cities nobody goes to. The
 * duration breakdown is the authority on where the trip goes, so anything
 * outside it (or outside a landmark belonging to one of its places) is noise.
 */
function keepVisited(places: string[], visited: string[]): string[] {
  // "Ahmedabad Drop" and "Ahmedabad" are the same city for this purpose.
  const norm = (s: string) => s.toLowerCase().replace(/\s+drop$/, "").trim();
  const allow = new Set(visited.filter(Boolean).map(norm));
  if (!allow.size) return places;

  const kept = places.filter((p) => {
    const parent = PARENT_OF.get(p);
    return allow.has(norm(p)) || (parent ? allow.has(norm(parent)) : false);
  });
  return kept.length ? kept : places;
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
 * The map iframe with a spinner over it until Google's tiles arrive.
 *
 * `key={src}` on the instance is what makes switching day tabs re-show the
 * spinner: it remounts with `loaded` false, rather than leaving the previous
 * day's map on screen looking like the new one.
 */
function MapFrame({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ border: 0, display: "block" }}
      />

      {!loaded ? (
        <div
          aria-hidden
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-orange-50/40"
        >
          <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-orange-200 border-t-orange-500" />
          <span className="text-[12px] font-semibold text-slate-400">Loading map…</span>
        </div>
      ) : null}
    </>
  );
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

  /**
   * Stops for each day, best source first: the CMS `stops` field when an editor
   * filled it, otherwise the places named in the day's own title, description
   * and hour-by-hour steps, and only then the single place the duration strip
   * inferred. The middle step is what turns a lone pin into an actual route.
   */
  const resolved = useMemo(
    () =>
      days.map((d, i) => {
        const cmsStops = (d.stops ?? []).map((s) => s.trim()).filter(Boolean);
        if (cmsStops.length) return cmsStops;

        const text = [
          d.title,
          d.description,
          ...(d.steps ?? []).map((s) => s.activity),
        ]
          .filter(Boolean)
          .join(" . ");
        const title = d.title ?? "";
        const mined = orderByTitle(
          anchorSingleSiteDay(keepVisited(placesFromText(text), fallbackPlaces), title),
          title,
        );
        if (mined.length) return mined;

        return [fallbackPlaces[i]].filter(Boolean);
      }),
    [days, fallbackPlaces],
  );

  // No day-wise plan in the CMS yet: show where the trip goes, without
  // inventing days that nobody has written.
  if (!days.length) {
    // Short packages ("1 Day Dwarka", "Budget Somnath Dwarka") carry neither an
    // itinerary nor a duration breakdown. Their own title still names where the
    // trip goes, which beats hiding the map entirely.
    const given = (places ?? []).filter(Boolean);
    const known = given.length ? given : placesFromText(title);
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
              <MapFrame title={`${title} — route`} src={embedSrc(known)} />
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
              <MapFrame key={src} title={`${title} — Day ${day.day} route`} src={src} />
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
