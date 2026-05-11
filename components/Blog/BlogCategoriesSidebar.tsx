"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const categories = [
  "Adventure",
  "Amazing Facts",
  "City Tour",
  "Culture",
  "Edu-Tourism",
  "Heritage",
  "Hill Stations",
  "Holidays",
  "Luxury",
  "Pilgrimage",
  "Travel Deals",
  "Travel Experience",
  "Wedding",
  "Wildlife",
];

export default function BlogCategoriesSidebar() {
  const searchParams = useSearchParams();
  const active = searchParams.get("category");

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-lg p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-6 w-1.5 rounded-full bg-orange-500"></div>
        <h4 className="text-lg font-semibold text-gray-900 tracking-wide">
          Blog Categories
        </h4>
      </div>

      {/* Chips Grid */}
      <div className="flex flex-wrap gap-3">

        {categories.map((cat) => {
          const isActive = active === cat;

          return (
            <Link
              key={cat}
              href={`/blogs?category=${cat}`}
              className={`
                px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-300
                ${
                  isActive
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600"
                }
              `}
            >
              {cat}
            </Link>
          );
        })}

      </div>
    </div>
  );
}