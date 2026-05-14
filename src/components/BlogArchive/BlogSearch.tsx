"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function BlogSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full flex justify-center px-6 lg:px-0 mt-10 mb-10">
      <div className="relative w-full max-w-2xl">

        {/* Search Icon */}
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400"
          size={20}
        />

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blogs about Mathura & Vrindavan..."
          className="
            w-full
            rounded-full
            border
            border-amber-200
            bg-white
            py-4
            pl-12
            pr-6
            text-base
            shadow-sm
            outline-none
            transition-all
            duration-300
            focus:border-amber-600
            focus:ring-4
            focus:ring-amber-200
          "
        />

      </div>
    </div>
  );
}