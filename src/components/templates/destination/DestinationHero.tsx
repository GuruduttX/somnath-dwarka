"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";
import type { DestinationMeta } from "@/src/lib/seed/destinationMeta";
import { ICONS } from "./icons";

export default function DestinationHero({
  meta,
  destination,
  h1,
}: {
  meta: DestinationMeta;
  destination: string;
  h1: string;
  answerFirst: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <style>{`
        @keyframes dhUp { from { opacity:0; transform:translateY(24px);} to {opacity:1; transform:translateY(0);} }
        .dh-up { opacity:0; animation: dhUp .85s cubic-bezier(.22,.7,0,1) forwards; }
        .dh0{animation-delay:.05s}.dh1{animation-delay:.16s}.dh2{animation-delay:.28s}.dh3{animation-delay:.4s}.dh4{animation-delay:.52s}.dh5{animation-delay:.66s}
        @keyframes dhSpin { to { transform: rotate(360deg); } }
        .dh-spin { animation: dhSpin 80s linear infinite; transform-origin:center; }
        .dh-spin-r { animation: dhSpin 60s linear infinite reverse; transform-origin:center; }
        @keyframes dhRise { 0%{ transform:translateY(0) scale(.5); opacity:0;} 12%{opacity:.85;} 82%{opacity:.85;} 100%{ transform:translateY(-140px) scale(1); opacity:0;} }
        .dh-particle { animation: dhRise 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .dh-up,.dh-spin,.dh-spin-r,.dh-particle{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section id="destination-hero" className="relative -mt-28 w-full">
        {/* ── Panoramic image stage ── */}
        <div className="relative flex h-[82vh] min-h-[600px] w-full items-center justify-center overflow-hidden pb-28 sm:pb-24">
          <Image src={meta.heroImage} alt={`${destination}, Gujarat`} fill priority sizes="100vw" className="object-cover" />

          {/* overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,12,2,0.28)_0%,rgba(26,12,2,0.18)_40%,rgba(20,9,2,0.80)_100%)]" />
          <div
            className="absolute inset-0 mix-blend-screen"
            style={{ background: `radial-gradient(ellipse at 50% 34%, ${meta.accent}44 0%, transparent 58%)` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(251,146,60,0.30)_0%,transparent_60%)] mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "30px 30px" }} aria-hidden="true" />

          {/* rotating mandala rings */}
          <svg className="dh-spin pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 opacity-[0.13]" viewBox="0 0 400 400" aria-hidden="true">
            <circle cx="200" cy="200" r="190" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="2 10" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#fff" strokeWidth="1" />
            {[...Array(36)].map((_, i) => (
              <line key={i} x1="200" y1="200" x2={(200 + 190 * Math.cos((i * 10 * Math.PI) / 180)).toFixed(2)} y2={(200 + 190 * Math.sin((i * 10 * Math.PI) / 180)).toFixed(2)} stroke="#fff" strokeWidth="0.4" />
            ))}
          </svg>
          <svg className="dh-spin-r pointer-events-none absolute -right-20 top-[18%] h-64 w-64 opacity-[0.12]" viewBox="0 0 200 200" aria-hidden="true" style={{ color: "#fff" }}>
            <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            {[...Array(8)].map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              return <path key={i} d={`M100,100 L${(100 + 94 * Math.cos(a)).toFixed(1)},${(100 + 94 * Math.sin(a)).toFixed(1)}`} stroke="currentColor" strokeWidth="0.6" />;
            })}
          </svg>

          {/* rising particles */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {[
              { l: "16%", d: "0s" }, { l: "33%", d: "2.1s" }, { l: "50%", d: "4s" },
              { l: "68%", d: "1.3s" }, { l: "84%", d: "3.2s" }, { l: "92%", d: "5.1s" },
            ].map((p, i) => (
              <span key={i} className="dh-particle absolute bottom-40 h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_3px_rgba(251,191,36,0.6)]" style={{ left: p.l, animationDelay: p.d }} />
            ))}
          </div>

          {/* watermark glyph */}
          <span className="pointer-events-none absolute right-[6%] top-[12%] select-none font-serif text-[160px] leading-none text-white/[0.07] sm:text-[220px]" aria-hidden="true">
            {meta.glyph}
          </span>

          {/* ── Centered content ── */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pt-10 text-center sm:px-8">
         

            <h1 className="dh-up dh2 mt-5 text-5xl font-black leading-[0.98] tracking-[-0.03em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-[5rem]">
              {h1.replace(/ Travel Guide$/, "")}
              <span className="mt-2 block bg-[linear-gradient(100deg,#FDBA74,#F97316,#FBBF24)] bg-clip-text text-transparent">
                Travel Guide
              </span>
            </h1>

            <div
              className="dh-up dh3 mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: meta.accent, boxShadow: `0 0 10px ${meta.accent}` }} />
              {meta.deity}
            </div>

            <p className="dh-up dh4 mt-5 max-w-2xl text-[15.5px] leading-[1.8] text-white/85 sm:text-[17px]">{meta.tagline}</p>

            {/* chips */}
            <div className="dh-up dh4 mt-6 flex flex-wrap justify-center gap-2.5">
              {meta.chips.map(({ icon, label }) => {
                const Icon = ICONS[icon];
                return (
                  <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur-md">
                    <Icon size={13} className="text-orange-300" />
                    {label}
                  </span>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="dh-up dh5 mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-8 py-3.5 text-sm font-bold text-white shadow-[0_16px_38px_rgba(234,88,12,0.5)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles size={16} />
                Plan a {destination} Trip
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink(`Hi, I want to plan a trip to ${destination}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
              >
                <MessageSquare size={15} className="text-orange-200" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Overlapping floating stat bar ── */}
        <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="dh-up dh5 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-orange-100 bg-orange-100/60 shadow-[0_30px_70px_rgba(26,12,2,0.28)] sm:grid-cols-4">
            {meta.stats.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={s.label} className="flex items-center gap-3 bg-white/95 px-5 py-5 backdrop-blur-sm sm:flex-col sm:items-center sm:text-center">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md">
                    <Icon size={20} />
                  </span>
                  <div className="sm:mt-2">
                    <p className="text-xl font-black leading-none text-[#2a1a10] sm:text-2xl">{s.value}</p>
                    <p className="mt-1 text-[11px] font-semibold leading-tight text-[#9a7358]">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
