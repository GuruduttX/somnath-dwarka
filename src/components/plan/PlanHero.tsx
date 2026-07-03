"use client";

import { useState } from "react";
import { Sparkles, MapPin, Clock, CalendarDays, Route, MessageSquare, ArrowRight, Compass } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

const FACTS = [
  { icon: Route, label: "≈ 233 km", sub: "Dwarka ↔ Somnath" },
  { icon: Clock, label: "4.5–5 hr", sub: "Drive time" },
  { icon: CalendarDays, label: "3–5 days", sub: "Ideal circuit" },
];

const STOPS = [
  { name: "Dwarka", d: "Day 1" },
  { name: "Porbandar", d: "En route" },
  { name: "Somnath", d: "Day 2–3" },
];

export default function PlanHero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <style>{`
        @keyframes planUp { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        .pl-up { opacity:0; animation: planUp .72s cubic-bezier(.22,.7,0,1) forwards; }
        .pl0{animation-delay:.05s}.pl1{animation-delay:.14s}.pl2{animation-delay:.24s}.pl3{animation-delay:.34s}.pl4{animation-delay:.46s}
        @keyframes planDash { to { stroke-dashoffset: -60; } }
        .pl-dash { animation: planDash 3s linear infinite; }
        @media (prefers-reduced-motion: reduce){ .pl-up,.pl-dash{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section className="font-dm relative -mt-28 flex w-full flex-col overflow-hidden">
        {/* warm bg */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEFE0_45%,#FFF6EC_100%)]" />
          <div className="absolute left-1/2 top-[12%] h-[62%] w-[72%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.26)_0%,transparent_62%)]" />
          <div className="absolute -left-[6%] bottom-[2%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.20)_0%,transparent_64%)]" />
          <div className="absolute -right-[6%] top-[16%] h-[48%] w-[38%] bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.12)_0%,transparent_64%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-5 pt-28 pb-9 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14 lg:pt-[8.5rem] lg:pb-[3.25rem] xl:px-20">

          {/* LEFT */}
          <div className="flex flex-col">
            <div className="pl-up pl0 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-800 shadow-sm backdrop-blur-sm">
              <Compass size={12} className="text-orange-500" />
              Trip Planning
            </div>

            <h1 className="pl-up pl1 mt-4 text-4xl font-black leading-[1.08] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.35rem]">
              Plan your{" "}
              <span className="bg-[linear-gradient(100deg,#EA580C,#F97316,#F59E0B)] bg-clip-text text-transparent">
                Somnath Dwarka
              </span>{" "}
              trip
            </h1>

            <p className="pl-up pl2 mt-4 max-w-xl text-[15px] leading-[1.75] text-[#6b4c38]">
              Everything you need before you book — distance and drive time, how many days you
              need, which temple to visit first, and ready-made <strong className="font-semibold text-orange-700">day-wise itineraries</strong>.
            </p>

            {/* fact chips */}
            <div className="pl-up pl3 mt-6 flex flex-wrap gap-3">
              {FACTS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-2xl border border-orange-100 bg-white/80 px-3.5 py-2.5 shadow-xs backdrop-blur-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                    <Icon size={16} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[15px] font-black text-[#3a2416]">{label}</p>
                    <p className="text-[10.5px] font-semibold uppercase tracking-wide text-[#9a7358]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pl-up pl4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles size={16} />
                Plan My Trip
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink("Hi, help me plan a Somnath Dwarka trip")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white active:translate-y-0 cursor-pointer"
              >
                <MessageSquare size={15} />
                Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT — "Journey at a glance" card */}
          <div className="pl-up pl2 relative mx-auto w-full max-w-[480px] lg:mx-0">
            <div className="absolute -inset-3 rotate-1 rounded-[36px] bg-[linear-gradient(135deg,rgba(234,88,12,0.16),rgba(245,158,11,0.08))]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_70px_rgba(234,88,12,0.16)] backdrop-blur-md">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.35)_0%,transparent_70%)]" aria-hidden="true" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#EA580C,#FB923C)] text-white shadow-sm">
                    <Route size={16} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-black text-[#3a2416]">Journey at a glance</p>
                    <p className="text-[10.5px] text-[#9a7358]">Classic 3-day circuit</p>
                  </div>
                </div>
                <span className="rounded-full border border-orange-200 bg-white px-2.5 py-1 text-[10px] font-bold text-orange-700 shadow-xs">≈ 233 km</span>
              </div>

              {/* route line */}
              <div className="relative mt-6 pl-2">
                {STOPS.map((s, i) => (
                  <div key={s.name} className="relative flex items-start gap-4 pb-6 last:pb-0">
                    {i < STOPS.length - 1 && (
                      <svg className="absolute left-[9px] top-5 h-full w-2" viewBox="0 0 4 60" preserveAspectRatio="none" aria-hidden="true">
                        <line className="pl-dash" x1="2" y1="0" x2="2" y2="60" stroke="#F97316" strokeWidth="2.5" strokeDasharray="3 5" strokeLinecap="round" />
                      </svg>
                    )}
                    <span className="relative z-[1] mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500 ring-4 ring-orange-100">
                      <MapPin size={11} className="text-white" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[15px] font-black text-[#3a2416]">{s.name}</p>
                        <span className="rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700">{s.d}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* footer day chips */}
              <div className="mt-2 grid grid-cols-3 gap-2 border-t border-orange-100 pt-4">
                {[
                  { d: "Day 1", t: "Dwarka darshan" },
                  { d: "Day 2", t: "Drive + aarti" },
                  { d: "Day 3", t: "Somnath" },
                ].map((c) => (
                  <div key={c.d} className="rounded-xl bg-orange-50/60 p-2.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-orange-600">{c.d}</p>
                    <p className="mt-0.5 text-[10.5px] font-semibold text-[#6b4c38]">{c.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* wave */}
        <div className="relative z-10 -mb-px w-full pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[60px] w-full sm:h-[80px] lg:h-[100px]">
            <path d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1200,75 1340,30 1440,45 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.10)" />
            <path d="M0,45 C120,10 300,70 480,48 C660,26 840,72 1020,52 C1160,36 1320,65 1440,55 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.10)" />
            <path d="M0,65 C200,30 380,88 560,68 C740,48 920,85 1100,70 C1240,58 1360,75 1440,68 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
