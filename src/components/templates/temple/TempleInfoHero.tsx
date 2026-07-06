"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Sparkles, ArrowRight, MessageSquare, ChevronRight, BadgeCheck, AlertCircle } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

export default function TempleInfoHero({
  h1,
  answerFirst,
  destination,
  destinationPath,
  kicker,
  verified,
  sessionCount,
}: {
  h1: string;
  answerFirst: string;
  destination: string;
  destinationPath: string;
  kicker: string;
  verified: boolean;
  sessionCount: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <style>{`
        @keyframes tiUp { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        .ti-up { opacity:0; animation: tiUp .8s cubic-bezier(.22,.7,0,1) forwards; }
        .ti0{animation-delay:.05s}.ti1{animation-delay:.15s}.ti2{animation-delay:.26s}.ti3{animation-delay:.38s}.ti4{animation-delay:.5s}
        @keyframes tiHour { to { transform: rotate(360deg); } }
        @keyframes tiMin { to { transform: rotate(360deg); } }
        .ti-hour { animation: tiHour 24s linear infinite; transform-origin:center; }
        .ti-min  { animation: tiMin 4s linear infinite; transform-origin:center; }
        .ti-spin { animation: tiHour 70s linear infinite; transform-origin:center; }
        @keyframes tiFloat { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-8px);} }
        .ti-float { animation: tiFloat 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .ti-up,.ti-hour,.ti-min,.ti-spin,.ti-float{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section className="relative -mt-28 w-full overflow-hidden">
        {/* ambient bg */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEEDD_46%,#FFFFFF_100%)]" />
          <div className="absolute left-[6%] top-[16%] h-[56%] w-[46%] bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.26)_0%,transparent_62%)]" />
          <div className="absolute -right-[6%] top-[10%] h-[52%] w-[42%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.18)_0%,transparent_64%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-5 pt-36 pb-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10 lg:pb-16">
          {/* LEFT */}
          <div className="flex flex-col">
            <div className="ti-up ti0 mb-4 flex items-center gap-1.5 text-[12px] font-medium text-[#9a7358]">
              <Link href={destinationPath} className="transition hover:text-orange-600">{destination}</Link>
              <ChevronRight size={13} />
              <span className="text-orange-600">Timings</span>
            </div>

            <div className="ti-up ti1 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-800 shadow-sm backdrop-blur-sm">
              <Clock size={12} className="text-orange-500" />
              {kicker}
            </div>

            <h1 className="ti-up ti2 mt-4 text-4xl font-black leading-[1.06] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.2rem]">
              {h1}
            </h1>

            <p className="ti-up ti3 mt-5 max-w-xl text-[15px] leading-[1.8] text-[#6b4c38]">{answerFirst}</p>

            {/* status chips */}
            <div className="ti-up ti3 mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-[#6b4c38] shadow-xs backdrop-blur-sm">
                <Clock size={13} className="text-orange-500" />
                {sessionCount} darshan windows
              </span>
              {verified ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-700">
                  <BadgeCheck size={13} />
                  Verified against official source
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-[12px] font-semibold text-amber-700">
                  <AlertCircle size={13} />
                  Indicative · confirm before travel
                </span>
              )}
            </div>

            <div className="ti-up ti4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles size={16} />
                Plan Darshan With Us
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink(`Hi, I want help planning darshan at ${destination}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white active:translate-y-0"
              >
                <MessageSquare size={15} />
                Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT — animated clock motif */}
          <div className="ti-up ti2 relative mx-auto flex w-full max-w-[380px] justify-center lg:mx-0 lg:justify-end">
            <div className="ti-float relative aspect-square w-[280px] sm:w-[340px]">
              {/* soft glow */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.25),transparent_70%)]" />
              <svg viewBox="0 0 240 240" className="relative h-full w-full drop-shadow-[0_20px_40px_rgba(234,88,12,0.22)]">
                <defs>
                  <linearGradient id="tiFace" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFFFFF" />
                    <stop offset="1" stopColor="#FFF3E4" />
                  </linearGradient>
                  <linearGradient id="tiRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#EA580C" />
                    <stop offset="1" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                {/* outer decorative dashed ring */}
                <circle className="ti-spin" cx="120" cy="120" r="114" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 8" opacity="0.5" />
                {/* face */}
                <circle cx="120" cy="120" r="98" fill="url(#tiFace)" stroke="url(#tiRing)" strokeWidth="6" />
                {/* hour ticks */}
                {[...Array(12)].map((_, i) => {
                  const a = (i * 30 * Math.PI) / 180;
                  const r1 = i % 3 === 0 ? 78 : 84;
                  const r2 = 90;
                  return (
                    <line
                      key={i}
                      x1={(120 + r1 * Math.sin(a)).toFixed(2)}
                      y1={(120 - r1 * Math.cos(a)).toFixed(2)}
                      x2={(120 + r2 * Math.sin(a)).toFixed(2)}
                      y2={(120 - r2 * Math.cos(a)).toFixed(2)}
                      stroke="#EA580C"
                      strokeWidth={i % 3 === 0 ? 3 : 1.5}
                      strokeLinecap="round"
                      opacity={i % 3 === 0 ? 0.9 : 0.4}
                    />
                  );
                })}
                {/* om at center-top */}
                <text x="120" y="66" textAnchor="middle" fontSize="22" fill="#EA580C" opacity="0.7" fontFamily="serif">ॐ</text>
                {/* hands */}
                <g className="ti-hour">
                  <line x1="120" y1="120" x2="120" y2="72" stroke="#3a2416" strokeWidth="6" strokeLinecap="round" />
                </g>
                <g className="ti-min">
                  <line x1="120" y1="120" x2="120" y2="50" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
                </g>
                <circle cx="120" cy="120" r="7" fill="#EA580C" />
                <circle cx="120" cy="120" r="3" fill="#fff" />
              </svg>
            </div>
          </div>
        </div>

        {/* bottom wave */}
        <div className="relative z-10 -mb-px w-full select-none pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-[52px] w-full sm:h-[72px]">
            <path d="M0,40 C240,90 480,10 720,45 C960,80 1200,20 1440,50 L1440,100 L0,100 Z" fill="rgba(234,88,12,0.08)" />
            <path d="M0,60 C240,100 480,30 720,60 C960,90 1200,40 1440,65 L1440,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
