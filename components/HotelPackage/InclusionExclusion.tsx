"use client";

import { Wifi, Coffee, Car, CheckCircle2, XCircle } from "lucide-react";


interface QuickInclusions {
  freeWifi: boolean;
  breakfast: boolean;
  parking: boolean;
}

interface InclusionItem {
  id: string;
  description: string;
}

interface InclusionsExclusionsProps {
  quickInclusions: QuickInclusions;
  inclusions: InclusionItem[];
  exclusions: InclusionItem[];
}

// ─── Quick badge config ───────────────────────────────────────────────────────

const quickBadges = [
  { key: "freeWifi"   as keyof QuickInclusions, label: "Free WiFi",  Icon: Wifi   },
  { key: "breakfast"  as keyof QuickInclusions, label: "Breakfast",  Icon: Coffee },
  { key: "parking"    as keyof QuickInclusions, label: "Parking",    Icon: Car    },
];


const InclusionsExclusions = ({
  quickInclusions,
  inclusions,
  exclusions,
}: InclusionsExclusionsProps) => {
  const activeQuick = quickBadges.filter((b) => quickInclusions[b.key]);

  return (
    <>
      

      <section className="w-full max-w-4xl mx-auto px-5 py-10">

        {/* ── Section heading ── */}
        <div className="mb-7">
          <h2
            className="text-2xl font-bold text-stone-800 tracking-tight"
          >
            Package Details
          </h2>
          <div className="mt-1.5 h-[3px] w-14 rounded-full bg-orange-500" />
        </div>

        {/* ── Quick Inclusions badges ── */}
        {activeQuick.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-7">
            {activeQuick?.map(({ key, label, Icon }) => (
              <div
                key={key}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                           bg-orange-50 border border-orange-200
                           text-orange-700 text-sm font-semibold
                           hover:bg-orange-100 transition-colors duration-200 cursor-default"
              >
                <Icon size={15} strokeWidth={2.3} className="text-orange-500" />
                {label}
              </div>
            ))}
          </div>
        )}

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* ── Inclusions card ── */}
          <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-orange-500" />
            <div className="p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={16} className="text-orange-500" strokeWidth={2.4} />
                </div>
                <h3
                  className="text-base font-bold text-stone-800"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  What's Included
                </h3>
              </div>

              <ul className="space-y-1">
                {inclusions?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-xl
                               hover:bg-orange-50 transition-colors duration-150 group"
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={2}
                      className="text-orange-400 mt-0.5 flex-shrink-0 group-hover:text-orange-600 transition-colors"
                    />
                    <span
                      className="text-sm text-stone-600 leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Exclusions card ── */}
          <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1 w-full bg-rose-900" />
            <div className="p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <XCircle size={16} className="text-rose-900" strokeWidth={2.4} />
                </div>
                <h3
                  className="text-base font-bold text-stone-800"
                >
                  Not Included
                </h3>
              </div>

              <ul className="space-y-1">
                {exclusions?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-2.5 px-3 py-2 rounded-xl
                               hover:bg-rose-50 transition-colors duration-150 group"
                  >
                    <XCircle
                      size={15}
                      strokeWidth={2}
                      className="text-rose-400 mt-0.5 flex-shrink-0 group-hover:text-rose-600 transition-colors"
                    />
                    <span
                      className="text-sm text-stone-600 leading-relaxed"
                    >
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default InclusionsExclusions;