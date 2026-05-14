"use client";

import { useState } from "react";
import Link from "next/link";

/* ================= TYPES ================= */

type CategoryGroup = {
  label: string;
  categories: string[];
};

interface BlogCategoriesProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

/* =============== DATA ================= */

const BlogCategoryGroups: CategoryGroup[] = [
  {
    label: "Hotels",
    categories: ["Hotels in Vrindavan", "Luxury Hotels", "Budget Hotels"],
  },
  {
    label: "Taxi",
    categories: ["Taxi Services", "Airport Transfer"],
  },
  {
    label: "Spiritual",
    categories: ["Temple Guide", "Puja Services"],
  },
];

/* =============== COMPONENT ================= */

export default function BlogCategories({
  activeCategory,
  onCategoryChange,
}: BlogCategoriesProps) {

  // 👇 strict typing
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggle = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <div className="rounded-2xl bg-white/60 backdrop-blur-xl shadow-lg border border-white/40 p-5">

      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-orange-400 to-amber-500" />
        <h4 className="text-sm font-semibold text-gray-800">
          Blog Categories
        </h4>
      </div>

      {/* Active Category */}
      {activeCategory && (
        <div className="mb-4 flex items-center justify-between rounded-xl bg-orange-50 px-3 py-2 text-xs text-orange-700">
          <span>{activeCategory}</span>
          <button
            onClick={() => onCategoryChange?.("")}
            className="text-orange-500 hover:text-orange-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Groups */}
      <div className="space-y-2">
        {BlogCategoryGroups.map((group) => {
          const isOpen = openGroup === group.label;

          return (
            <div key={group.label}>

              {/* Group Button */}
              <button
                onClick={() => toggle(group.label)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/70 hover:bg-white shadow-sm transition"
              >
                <span className="text-sm font-medium text-gray-700">
                  {group.label}
                </span>

                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-orange-500" : "text-gray-400"
                    }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M4 6l4 4 4-4" strokeWidth="1.5" />
                </svg>
              </button>

              {/* Categories */}
              {isOpen && (
                <div className="mt-2 flex flex-wrap gap-2 px-1">
                  {group.categories.map((cat) => {
                    const isActive = activeCategory === cat;

                    return onCategoryChange ? (
                      <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${isActive
                            ? "bg-orange-500 text-white shadow"
                            : "bg-white/80 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                          }`}
                      >
                        {cat}
                      </button>
                    ) : (
                      <Link
                        key={cat}
                        href={`/blogs?category=${encodeURIComponent(cat)}`}
                        className={`px-3 py-1 text-xs rounded-full transition-all ${isActive
                            ? "bg-orange-500 text-white shadow"
                            : "bg-white/80 text-gray-600 hover:bg-orange-100 hover:text-orange-600"
                          }`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}