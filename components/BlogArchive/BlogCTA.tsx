"use client";

import Link from "next/link";

export default function GlobalCTA() {
  return (
    <section className="relative overflow-hidden bg-amber-50 py-28 px-6 lg:px-20">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.15),transparent_40%)] animate-pulse-slow"></div>

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Your Divine Journey Starts Here
        </h2>

        {/* Underline Accent */}
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-linear-to-r from-amber-500 to-orange-400"></div>

        {/* Subtext */}
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover peaceful temple tours, trusted hotels, reliable taxi
          services, and sacred pooja arrangements — all curated for your
          spiritual comfort in Mathura & Vrindavan.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          {/* Shimmer Button */}
          <Link href="/tour-packages">
            <button className="relative overflow-hidden rounded-full px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-xl">

              <span className="relative z-10">Plan My Trip</span>

              {/* Shimmer Effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 hover:translate-x-full"></span>

            </button>
          </Link>

          {/* Outline Button */}
          <Link href="/contact">
            <button className="rounded-full border border-amber-500 px-8 py-4 text-lg font-semibold text-amber-600 transition-all duration-300 hover:bg-amber-600 hover:text-white hover:shadow-lg">
              Talk to Our Expert
            </button>
          </Link>

        </div>
      </div>
    </section>
  );
}