import { Sparkles } from "lucide-react";

interface HighlightItem {
  description: string;
}

interface PackageType {
  highlights: HighlightItem[];
}

export default function PackageHighlights({
  PackageData,
}: {
  PackageData: PackageType;
}) {
  const highlights = PackageData.highlights;

  return (
    <section className="w-full px-6">

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">
          What's Special
        </p>
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Trip Highlights
        </h2>
      </div>

      {/* ── HIGHLIGHTS LIST ────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="group flex items-start gap-3.5 rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3.5 transition-all duration-200 hover:border-orange-200 hover:bg-orange-50"
          >
            {/* Number + icon */}
            <div className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 shadow-sm shadow-orange-200">
                <Sparkles size={13} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-[10px] font-semibold tabular-nums text-orange-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Text */}
            <p className="flex-1 break-words text-[13.5px] leading-[1.75] text-gray-600 sm:text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM COUNT STRIP ─────────────────────────────────── */}
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-4 py-2.5">
        <div className="h-[3px] w-8 rounded-full bg-orange-500" />
        <p className="text-[11.5px] font-medium text-orange-500">
          {highlights.length} highlight{highlights.length !== 1 ? "s" : ""} included in this package
        </p>
      </div>
    </section>
  );
}