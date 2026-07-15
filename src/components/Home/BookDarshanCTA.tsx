"use client";

import { Phone, ArrowRight, ShieldCheck, Sparkles, MapPin, Star } from "lucide-react";
import { useState } from "react";

const AVATARS = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&auto=format&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&auto=format&fit=crop&crop=faces",
];

export default function BookDarshanCTA() {
  const [formData, setFormData] = useState({ name: "", phone: "" });

  return (
    <section id="book-darshan" className="py-2 sm:py-3 md:py-4 px-3 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500">

          {/* Decorative SVG mandala & background patterns */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <svg viewBox="0 0 300 300" className="absolute -left-10 -top-10 h-72 w-72 opacity-[0.08]">
              {[30, 60, 90, 120].map(r => (
                <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="white" strokeWidth="1" />
              ))}
              {[...Array(12)].map((_, i) => (
                <line key={i} x1="150" y1="150"
                  x2={(150 + 130 * Math.cos(i * 30 * Math.PI / 180)).toFixed(3)}
                  y2={(150 + 130 * Math.sin(i * 30 * Math.PI / 180)).toFixed(3)}
                  stroke="white" strokeWidth="0.6" />
              ))}
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 24px)" }} />
            
            {/* Soft background light glows */}
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-10 right-0 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
          </div>

          <div className="relative px-5 py-6 sm:px-10 md:py-10 lg:px-16">
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 items-center">

              {/* ══ LEFT — Text ══════════════════════════════════════ */}
              <div className="flex flex-col justify-center py-0 lg:py-4">

                {/* Badge */}
                <span className="mb-3 sm:mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  <Sparkles size={9} />
                  Divine Dwarka Experience
                </span>

                {/* Headline */}
                <h2 className="text-[clamp(28px,4vw,44px)] font-bold leading-[1.15] tracking-tight text-white">
                  Book Your
                  <span className="block italic text-amber-200">Sacred Darshan</span>
                </h2>

                {/* Description */}
                <p className="mt-3 sm:mt-4 max-w-md text-[13.5px] sm:text-[14.5px] leading-relaxed text-white/80">
                  Peaceful temple darshan, premium spiritual stays and divine Gujarat
                  journeys crafted with comfort and devotion.
                </p>

                {/* Feature pills */}
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                  {[
                    { Icon: ShieldCheck, text: "Trusted Partner" },
                    { Icon: Phone, text: "Instant Assistance" },
                    { Icon: MapPin, text: "Gujarat Specialist" },
                  ].map(({ Icon, text }) => (
                    <span
                      key={text}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-medium text-white"
                    >
                      <Icon size={11} />
                      {text}
                    </span>
                  ))}
                </div>

                {/* Social proof */}
                <div className="mt-5 sm:mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {AVATARS.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-amber-300 text-amber-300" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="text-[11px] text-white/70">4,800+ happy pilgrims</p>
                  </div>
                </div>
              </div>

              {/* ══ RIGHT — Form ═════════════════════════════════════ */}
              <div className="flex items-center justify-center lg:justify-end py-0 lg:py-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-7 shadow-2xl shadow-black/15">

                  {/* Form header */}
                  <div className="mb-4 sm:mb-5">
                    <p className="text-[10.5px] font-semibold uppercase tracking-widest text-orange-500">
                      Quick Enquiry
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      Plan Your <span className="text-orange-500">Divine</span> Journey
                    </h3>
                  </div>

                  {/* Fields */}
                  <form className="flex flex-col gap-3 sm:gap-3.5">

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="h-11.5 w-full rounded-xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition-all focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11.5 w-full rounded-xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition-all focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                      />
                    </div>

                    <button
                      type="submit"
                      className="group mt-1 flex h-11.5 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300/50 active:translate-y-0 cursor-pointer"
                    >
                      Book Darshan
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </form>

                  <p className="mt-3 sm:mt-4 text-center text-[11px] leading-relaxed text-gray-400">
                    🔒 Your details are safe. We'll reach out to plan your journey.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}