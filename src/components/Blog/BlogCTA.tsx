"use client";

import Link from "next/link";

export default function BlogCTA() {
  return (
    <div className="relative mt-16 rounded-[20px] border border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-8 md:p-12 overflow-hidden text-center">

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fb923c 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Faint decorative symbols */}
      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-7xl opacity-[0.06] pointer-events-none select-none">🐚</span>
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl opacity-[0.06] pointer-events-none select-none">🔱</span>

      <div className="relative">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-white border border-orange-200 rounded-full px-4 py-1.5 text-xs font-medium text-orange-700 tracking-wide uppercase mb-4">
          <span className="text-base">🏛</span> Sacred Pilgrimage Packages
        </div>

        {/* Title */}
        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 leading-snug mb-3">
          Journey to <em className="italic text-orange-600">Dwarka</em> &amp; <em className="italic text-orange-600">Somnath</em>
        </h3>

        {/* Subtext */}
        <p className="mt-2 text-slate-500 max-w-xl mx-auto text-[15px] leading-relaxed mb-6">
          Experience the divine shores of Lord Krishna's kingdom and the eternal
          Jyotirlinga of Somnath — curated tours with temple visits, trusted
          stays, and seamless travel.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {["🛕 Temple Darshan", "🏨 Handpicked Hotels", "🚗 Taxi Services", "✨ Pooja Bookings"].map((item) => (
            <span
              key={item}
              className="bg-white/70 border border-orange-200 rounded-full px-4 py-1.5 text-xs text-orange-800"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link href="/tour-packages">
          <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-3.5 text-white text-[15px] font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-300 hover:-translate-y-0.5">
            🧭 Explore Tour Packages →
          </button>
        </Link>

        {/* Trust line */}
        <div className="flex items-center justify-center gap-3 mt-5 text-orange-400 text-xs">
          <span className="block h-px w-12 bg-orange-200" />
          Trusted by thousands of pilgrims
          <span className="block h-px w-12 bg-orange-200" />
        </div>

      </div>
    </div>
  );
}