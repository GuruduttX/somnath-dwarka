"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogStickyCTAWithForm() {
  return (
    <div className="my-6">

      

      {/* RIGHT — enquiry form */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-orange-100 flex flex-col">
        {/* Form header — same height as image */}
        <div className="relative h-44 w-full flex-shrink-0 bg-gradient-to-br from-amber-600 to-orange-500 flex flex-col justify-end px-4 pb-3">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-white/10 -translate-y-1/3 translate-x-1/3" />
          <div className="absolute top-6 right-10 h-14 w-14 rounded-full bg-white/10" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70 mb-1">
            Free Consultation
          </p>
          <h4 className="text-white font-semibold text-base leading-snug">
            Get a Customised Tour Quote
          </h4>
        </div>

        {/* Form fields */}
        <div className="p-4 flex flex-col flex-1 gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-700 placeholder:text-gray-300 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Phone
            </label>
            <input
              type="tel"
              placeholder="+91 00000 00000"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-700 placeholder:text-gray-300 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[13px] text-gray-700 placeholder:text-gray-300 outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-200 transition"
            />
          </div>

          <button className="mt-auto w-full rounded-full bg-gradient-to-r from-amber-600 to-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-md hover:shadow-amber-300/40 hover:opacity-90">
            Get Free Quote →
          </button>
        </div>
      </div>

    </div>
  );
}