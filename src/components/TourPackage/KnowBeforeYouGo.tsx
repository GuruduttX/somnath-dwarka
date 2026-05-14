"use client";

import { Info } from "lucide-react";

interface ItemType {
  description: string;
}

export default function KnowBeforeYouGo({
  PackageData,
}: {
  PackageData: ItemType[];
}) {
  return (
    <section className="w-full py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 border border-orange-200 flex-shrink-0">
            <Info className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
              Know Before You Go
            </h2>
            <p className="text-xs text-orange-500 font-medium mt-0.5 uppercase tracking-wide">
              Important travel guidelines
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PackageData?.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-4 items-start bg-white border border-orange-100 rounded-2xl px-5 py-4 overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-orange-400 rounded-l-2xl" />

              {/* Number badge */}
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xs font-medium text-orange-700">
                {index + 1}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed pt-0.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}