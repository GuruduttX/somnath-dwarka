"use client";

import { useTourFilter } from "@/context/TourFilterContext";
const CATEGORIES = [
  "Explore All",
  "1 Day Tour Package",
  "2 Day Tour Package",
  "3 Day Tour Package",
  "4 Day Tour Package",
  "5 Day Tour Package",
  "6 Day Tour Package",
  "7 Day Tour Package",
  "8 Day Tour Package",
  "9 Day Tour Package",
  "10 Day Tour Package",
];

export default function TourFilters() {
  const { activeCategory, setActiveCategory } = useTourFilter();

  return (
    <div className="w-full">
      {/* Scrollable Container */}
      <div className="flex items-center gap-4 overflow-x-auto justify-around no-scrollbar pb-6 pt-2 px-2">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;

          const isAll = cat === "Explore All";
          const number = isAll ? "All" : cat.split(" ")[0];
          const dayText = isAll ? "DAYS" : number === "1" ? "DAY" : "DAYS";

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                flex-shrink-0 flex flex-col items-center justify-between 
                w-[90px] h-[105px] rounded-[24px] py-3 transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 via-orange-500 to-yellow-400 border-transparent shadow-md shadow-orange-200/60 -translate-y-1"
                    : "bg-white border-[1.5px] border-orange-100/80 hover:border-orange-300 hover:bg-orange-50/50 hover:-translate-y-0.5"
                }
              `}
            >
              <div className="flex flex-col items-center gap-0.5">
                {/* Large Number */}
                <span
                  className={`
                  text-2xl font-bold leading-none mb-1
                  ${isActive ? "text-white" : "text-orange-700"}
                `}
                >
                  {number}
                </span>

                {/* DAYS / PACKAGE Text */}
                <span
                  className={`
                  text-[9px] font-bold tracking-widest uppercase leading-tight
                  ${isActive ? "text-white" : "text-orange-500"}
                `}
                >
                  {dayText}
                </span>
                <span
                  className={`
                  text-[9px] font-bold tracking-widest uppercase leading-tight
                  ${isActive ? "text-white" : "text-orange-500"}
                `}
                >
                  PACKAGE
                </span>
              </div>

              {/* Indicator Dot */}
              <div
                className={`
                w-1.5 h-1.5 rounded-full mt-2
                ${isActive ? "bg-white/80" : "bg-orange-200"}
              `}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
