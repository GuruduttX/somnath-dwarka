"use client";

import { Info } from "lucide-react";

interface ItemType {
  description: string;
}

interface PackageType {
  description: String;
}

export default function KnowBeforeYouGo({
  PackageData,
}: {
  PackageData: PackageType[];
}) {
  return (
    <section className="w-full py-8 md:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-4 md:mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Info className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Know Before You Go
          </h2>
        </div>

        {/* CONTENT PANEL */}
        <div className="rounded-3xl border border-orange-100/80 bg-gradient-to-br from-orange-50 to-white p-4 sm:p-6">
          {/* Mobile: vertical stack with step design */}
          <div className="flex sm:hidden flex-col max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {PackageData?.map((item, index) => (
              <div key={index} className="flex gap-3 relative">
                {/* Left timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-orange-500 to-yellow-400 text-white text-xs font-bold shadow-sm shadow-orange-200/60">
                    {index + 1}
                  </div>
                  {index !== PackageData.length - 1 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-orange-300 to-orange-100 my-1" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pb-5 ${index === PackageData.length - 1 ? "pb-0" : ""}`}
                >
                  <p className="text-gray-700 leading-relaxed text-sm pt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: vertical stack */}
          <div className="hidden sm:flex flex-col gap-2.5">
            {PackageData?.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white border border-orange-100/80 rounded-2xl px-5 py-4"
              >
                <div className="flex-shrink-0 mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-400 text-white text-xs font-medium shadow-sm shadow-orange-200/60">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}