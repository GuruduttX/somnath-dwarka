"use client";

import { Phone, ArrowRight, ShieldCheck, Sparkles, MapPin, Star } from "lucide-react";
import { useState } from "react";

export default function BookDarshanCTA() {
  const [formData, setFormData] = useState({ name: "", phone: "" });

  return (
    <section id="book-darshan" className="relative overflow-hidden bg-white py-8 md:py-12">

      {/* ── BACKGROUND ──────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl" />
        <div className="absolute -bottom-10 right-0 h-56 w-56 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 shadow-xl shadow-orange-300/30">

          {/* Decorative SVG mandala */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <svg viewBox="0 0 300 300" className="absolute -left-10 -top-10 h-52 w-52 opacity-[0.07]">
              {[30,60,90,120].map(r=>(
                <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="white" strokeWidth="1"/>
              ))}
              {[...Array(12)].map((_,i)=>(
                <line key={i} x1="150" y1="150"
                  x2={(150+130*Math.cos(i*30*Math.PI/180)).toFixed(3)}
                  y2={(150+130*Math.sin(i*30*Math.PI/180)).toFixed(3)}
                  stroke="white" strokeWidth="0.6"/>
              ))}
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_50%)]"/>
            <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:"repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 24px)"}}/>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2">

            {/* ══ LEFT — Text ══════════════════════════════════════ */}
            <div className="flex flex-col justify-center px-7 py-8 sm:px-10 md:py-10 lg:py-10">

              {/* Badge */}
              <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                <Sparkles size={9} />
                Divine Dwarka Experience
              </span>

              {/* Headline */}
              <h2 className="text-[clamp(24px,3.8vw,40px)] font-bold leading-[1.1] tracking-tight text-white">
                Book Your
                <span className="block italic text-amber-200">Sacred Darshan</span>
              </h2>

              {/* Description */}
              <p className="mt-3 max-w-xs text-[13.5px] leading-[1.75] text-white/75">
                Peaceful temple darshan, premium spiritual stays and divine Gujarat
                journeys crafted with comfort and devotion.
              </p>

              {/* Feature pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { Icon: ShieldCheck, text: "Trusted Partner"     },
                  { Icon: Phone,       text: "Instant Assistance"  },
                  { Icon: MapPin,      text: "Gujarat Specialist"   },
                ].map(({ Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11.5px] font-medium text-white"
                  >
                    <Icon size={11} />
                    {text}
                  </span>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {["bg-amber-300","bg-orange-300","bg-white/60"].map((c,i)=>(
                    <div key={i} className={`h-7 w-7 rounded-full border-2 border-orange-500 ${c}`}/>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_,i)=>(
                      <Star key={i} size={10} className="fill-amber-300 text-amber-300" strokeWidth={0}/>
                    ))}
                  </div>
                  <p className="text-[11px] text-white/60">4,800+ happy pilgrims</p>
                </div>
              </div>
            </div>

            {/* ══ RIGHT — Form ═════════════════════════════════════ */}
            <div className="flex items-center justify-center px-6 py-7 sm:px-10 lg:py-8">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl shadow-black/10">

                {/* Form header */}
                <div className="mb-5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-widest text-orange-400">
                    Quick Enquiry
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    Plan Your{" "}
                    <span className="text-orange-500">Divine</span> Journey
                  </h3>
                </div>

                {/* Fields */}
                <form className="flex flex-col gap-3">

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 w-full rounded-xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition-all focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 w-full rounded-xl border border-orange-100 bg-orange-50/50 px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition-all focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300/50 active:translate-y-0 cursor-pointer"
                  >
                    Book Darshan
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-400">
                  🔒 Your details are safe. We'll reach out to plan your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}