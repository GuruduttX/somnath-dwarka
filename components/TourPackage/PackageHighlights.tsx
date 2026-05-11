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
  return (
    <section className="py-5 mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="border-t border-amber-100/80 mb-8" />

        <h2 className="text-2xl font-semibold text-amber-700 mb-6">
          Trip Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PackageData.highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-2xl border border-amber-100/80 bg-amber-50/50 hover:bg-amber-50 transition-colors duration-200 min-w-0 overflow-hidden"
            >
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center mt-0.5">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-amber-800 leading-relaxed text-sm pt-1 break-words min-w-0 flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="border-b border-amber-100/80 mt-8" />
      </div>
    </section>
  );
}