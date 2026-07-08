"use client";

import { useMemo, useState } from "react";
import {
  SlidersHorizontal,
  Search,
  X,
  Clock,
  MapPin,
  Users,
  Wallet,
  ArrowDownUp,
  Compass,
} from "lucide-react";
import TourCard from "@/src/utils/TourCard";
import type { TourPackage } from "@/src/utils/TourData";
import YatraBanner from "./YatraBanner";

type Group = "duration" | "city" | "traveller";
type Sort = "popular" | "price-asc" | "price-desc";

const GROUP_META: Record<Group, { id: string; title: string; blurb: string; icon: typeof Clock }> = {
  duration: {
    id: "by-duration",
    title: "Choose by duration",
    blurb: "From a quick 3-day darshan to a relaxed 5-day circuit.",
    icon: Clock,
  },
  city: {
    id: "by-city",
    title: "Choose by starting city",
    blurb: "Private round trips with pickup and drop from your city.",
    icon: MapPin,
  },
  traveller: {
    id: "by-traveller",
    title: "Choose by traveller & budget",
    blurb: "Plans tuned for families or a lean, budget-friendly circuit.",
    icon: Users,
  },
};

const LENGTH_BUCKETS = [
  { key: "short", label: "Up to 3 Days", test: (d: number) => d <= 3 },
  { key: "mid", label: "4 Days", test: (d: number) => d === 4 },
  { key: "long", label: "5+ Days", test: (d: number) => d >= 5 },
] as const;

type Tagged = TourPackage & { group: Group };

export default function PackageExplorer({
  duration,
  city,
  traveller,
}: {
  duration: TourPackage[];
  city: TourPackage[];
  traveller: TourPackage[];
}) {
  const all = useMemo<Tagged[]>(
    () => [
      ...duration.map((p) => ({ ...p, group: "duration" as const })),
      ...city.map((p) => ({ ...p, group: "city" as const })),
      ...traveller.map((p) => ({ ...p, group: "traveller" as const })),
    ],
    [duration, city, traveller],
  );

  const priceBounds = useMemo(() => {
    const prices = all.map((p) => p.price).filter((p) => p > 0);
    return {
      min: prices.length ? Math.min(...prices) : 0,
      max: prices.length ? Math.max(...prices) : 0,
    };
  }, [all]);

  const availableGroups = useMemo(
    () => (["duration", "city", "traveller"] as Group[]).filter((g) => all.some((p) => p.group === g)),
    [all],
  );
  const availableLengths = useMemo(
    () => LENGTH_BUCKETS.filter((b) => all.some((p) => b.test(p.days))),
    [all],
  );

  // ── filter state ──
  const [query, setQuery] = useState("");
  const [groups, setGroups] = useState<Set<Group>>(new Set());
  const [lengths, setLengths] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [sort, setSort] = useState<Sort>("popular");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = <T,>(set: Set<T>, value: T) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  const priceActive = maxPrice > 0 && maxPrice < priceBounds.max;
  const activeCount =
    (query ? 1 : 0) + groups.size + lengths.size + (priceActive ? 1 : 0) + (sort !== "popular" ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setGroups(new Set());
    setLengths(new Set());
    setMaxPrice(priceBounds.max);
    setSort("popular");
  };

  // ── apply filters ──
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = all.filter((p) => {
      if (groups.size && !groups.has(p.group)) return false;
      if (q && !(`${p.title} ${p.location} ${p.groupType}`.toLowerCase().includes(q))) return false;
      if (lengths.size) {
        const hit = LENGTH_BUCKETS.some((b) => lengths.has(b.key) && b.test(p.days));
        if (!hit) return false;
      }
      if (priceActive && p.price > maxPrice) return false;
      return true;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular));

    return list;
  }, [all, groups, query, lengths, priceActive, maxPrice, sort]);

  const byGroup = (g: Group) => filtered.filter((p) => p.group === g);
  const orderedGroups = availableGroups.filter((g) => !groups.size || groups.has(g));

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  // ── sidebar UI ──
  const Sidebar = (
    <div className="space-y-7">
      {/* search */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-gray-500">
          <Search size={15} className="text-orange-500" /> Search
        </label>
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="City, package, family…"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* category */}
      {availableGroups.length > 1 && (
        <fieldset>
          <legend className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-gray-500">
            <Compass size={15} className="text-orange-500" /> Category
          </legend>
          <div className="space-y-1.5">
            {availableGroups.map((g) => {
              const active = groups.has(g);
              return (
                <button
                  key={g}
                  onClick={() => setGroups((s) => toggle(s, g))}
                  className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                    active
                      ? "border-orange-300 bg-orange-50 text-orange-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-200 hover:bg-orange-50/40"
                  }`}
                >
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-[5px] border ${
                      active ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white"
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />}
                  </span>
                  {GROUP_META[g].title.replace("Choose by ", "")}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* trip length */}
      {availableLengths.length > 1 && (
        <fieldset>
          <legend className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-gray-500">
            <Clock size={15} className="text-orange-500" /> Trip length
          </legend>
          <div className="flex flex-wrap gap-2">
            {availableLengths.map((b) => {
              const active = lengths.has(b.key);
              return (
                <button
                  key={b.key}
                  onClick={() => setLengths((s) => toggle(s, b.key))}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    active
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-orange-300"
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* price */}
      {priceBounds.max > priceBounds.min && (
        <div>
          <label className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-gray-500">
            <Wallet size={15} className="text-orange-500" /> Max budget
          </label>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            step={500}
            value={maxPrice || priceBounds.max}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="mt-1.5 flex justify-between text-[12px] font-semibold text-gray-500">
            <span>{inr(priceBounds.min)}</span>
            <span className="text-orange-600">Up to {inr(maxPrice || priceBounds.max)}</span>
          </div>
        </div>
      )}

      {/* sort */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-gray-500">
          <ArrowDownUp size={15} className="text-orange-500" /> Sort by
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
        >
          <option value="popular">Most popular</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-bold text-gray-600 transition hover:border-orange-300 hover:text-orange-600"
        >
          <X size={15} /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10">
      {/* mobile filter trigger */}
      <div className="mb-5 flex items-center justify-between lg:hidden">
        <p className="text-sm font-semibold text-gray-500">
          <span className="text-gray-900">{filtered.length}</span> package{filtered.length === 1 ? "" : "s"}
        </p>
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-600"
        >
          <SlidersHorizontal size={16} /> Filters
          {activeCount > 0 && (
            <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500 text-[11px] text-white">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* ── LEFT: filter rail (desktop) ── */}
        <aside className="hidden w-[300px] shrink-0 lg:block">
          <div className="sticky top-28 rounded-[24px] border border-orange-100/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-500 text-white">
                <SlidersHorizontal size={17} />
              </span>
              <div>
                <h2 className="text-[15px] font-bold text-gray-900">Filters</h2>
                <p className="text-[12px] text-gray-400">Refine your yatra</p>
              </div>
            </div>
            {Sidebar}
          </div>
        </aside>

        {/* ── RIGHT: results ── */}
        <div className="min-w-0 flex-1">
          {/* result summary */}
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <p className="text-sm font-semibold text-gray-500">
              Showing <span className="text-gray-900">{filtered.length}</span> of {all.length} packages
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-[24px] border border-dashed border-orange-200 bg-orange-50/40 px-6 py-20 text-center">
              <Search size={30} className="text-orange-300" />
              <p className="mt-4 text-lg font-bold text-gray-800">No packages match your filters</p>
              <p className="mt-1 text-sm text-gray-500">Try widening your budget or clearing a filter.</p>
              <button
                onClick={clearAll}
                className="mt-5 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {orderedGroups.map((g) => {
                const items = byGroup(g);
                const meta = GROUP_META[g];
                const Icon = meta.icon;
                const banner = g === "traveller"; // banner sits above the traveller section

                if (!items.length && !banner) return null;

                return (
                  <div key={g}>
                    {banner && (
                      <div className="mb-12">
                        <YatraBanner />
                      </div>
                    )}
                    {items.length > 0 && (
                      <section id={meta.id} className="scroll-mt-28">
                        <div className="mb-5 flex items-start gap-3">
                          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-500">
                            <Icon size={19} />
                          </span>
                          <div>
                            <h2
                              id={`${meta.id}-h`}
                              className="text-2xl font-black tracking-[-0.01em] text-gray-900"
                            >
                              {meta.title}
                            </h2>
                            <p className="mt-1 max-w-2xl text-[15px] text-gray-500">{meta.blurb}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {items.map((pkg) => (
                            <TourCard key={pkg.id} pkg={pkg} />
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE filter drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
                <SlidersHorizontal size={18} className="text-orange-500" /> Filters
              </h2>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters" className="text-gray-500">
                <X size={22} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{Sidebar}</div>
            <div className="border-t border-gray-100 p-4">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-full bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600"
              >
                Show {filtered.length} package{filtered.length === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
