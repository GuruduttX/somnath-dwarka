"use client";

import Link from "next/link";

export default function BlogCTA() {
  return (
    <div className="relative my-16 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 md:p-12 overflow-hidden">

      {/* Soft Decorative Glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl"></div>

      <div className="relative text-center">

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Planning a trip to Mathura?
        </h3>

        {/* Subtext */}
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Let us arrange your complete spiritual journey — temple tours,
          trusted hotels, taxi services, and sacred pooja bookings —
          all handled with devotion and comfort.
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link href="/tour-packages">
            <button className="rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-8 py-3 text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105">
              Explore Tour Packages
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}