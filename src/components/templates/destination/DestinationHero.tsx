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
  answerFirst,
}: {
  meta: DestinationMeta;
  destination: string;
  h1: string;
  answerFirst: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService={`Tour Package for ${destination}`} />

      <style>{`
        @keyframes dhUp { from { opacity:0; transform:translateY(24px);} to {opacity:1; transform:translateY(0);} }
        .dh-up { opacity:0; animation: dhUp .85s cubic-bezier(.16,1,0.3,1) forwards; }
        .dh0{animation-delay:.02s}.dh1{animation-delay:.08s}.dh2{animation-delay:.16s}.dh3{animation-delay:.24s}.dh4{animation-delay:.32s}.dh5{animation-delay:.40s}
        
        @keyframes dhSpin { to { transform: rotate(360deg); } }
        .dh-spin { animation: dhSpin 90s linear infinite; transform-origin: center; }
        .dh-spin-r { animation: dhSpin 70s linear infinite reverse; transform-origin: center; }
        
        @keyframes dhRise { 
          0%{ transform:translateY(0) scale(.5); opacity:0;} 
          15%{opacity:0.9;} 
          85%{opacity:0.9;} 
          100%{ transform:translateY(-180px) scale(1.3); opacity:0;} 
        }
        .dh-particle { animation: dhRise 9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .dh-up,.dh-spin,.dh-spin-r,.dh-particle{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section id="destination-hero" className="relative -mt-28 w-full bg-[#140902]">
        
        {/* Panoramic image stage */}
        <div className="relative flex h-[85vh] min-h-[620px] w-full items-center justify-center overflow-hidden pb-28 sm:pb-24">
          {meta.heroImage ? (
            <Image
              src={meta.heroImage}
              alt={`${destination}, Gujarat`}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-[12s] ease-out hover:scale-103"
            />
          ) : (
            /* No photograph for this destination yet — paint the accent instead
               of shipping a stock image of somewhere else. */
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 20%, ${meta.accent}66 0%, transparent 55%), linear-gradient(to bottom, #0d2419 0%, #14301f 45%, #140902 100%)`,
              }}
            />
          )}

          {/* Color overlays & washes */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#140902]/30 to-[#140902]/95" />
          <div
            className="absolute inset-0 mix-blend-screen opacity-60"
            style={{ background: `radial-gradient(ellipse at 50% 30%, ${meta.accent}55 0%, transparent 60%)` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(249,115,22,0.22)_0%,transparent_65%) ] mix-blend-screen" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle,#fff 1.5px,transparent 1.5px)", backgroundSize: "32px 32px" }} aria-hidden="true" />

          {/* Dual concentric rotating mandala rings (sacred geometry) */}
          <svg className="pointer-events-none absolute -left-28 top-1/2 h-[450px] w-[450px] -translate-y-1/2 opacity-[0.14]" viewBox="0 0 400 400" aria-hidden="true">
            <g className="dh-spin">
              <circle cx="200" cy="200" r="190" fill="none" stroke="#fff" strokeWidth="0.8" strokeDasharray="3 10" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#fff" strokeWidth="0.4" />
              {[...Array(18)].map((_, i) => {
                const angle = (i * 20 * Math.PI) / 180;
                return (
                  <line 
                    key={i} 
                    x1="200" 
                    y1="200" 
                    x2={(200 + 190 * Math.cos(angle)).toFixed(2)} 
                    y2={(200 + 190 * Math.sin(angle)).toFixed(2)} 
                    stroke="#fff" 
                    strokeWidth="0.3" 
                    opacity="0.5" 
                  />
                );
              })}
            </g>
            <g className="dh-spin-r">
              <circle cx="200" cy="200" r="140" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="6 8" />
              <circle cx="200" cy="200" r="110" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="1 5" />
            </g>
          </svg>

          <svg className="dh-spin-r pointer-events-none absolute -right-20 top-[15%] h-72 w-72 opacity-[0.12]" viewBox="0 0 200 200" aria-hidden="true">
            <g className="dh-spin">
              <circle cx="100" cy="100" r="92" fill="none" stroke="#fff" strokeWidth="0.8" strokeDasharray="4 8" />
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180;
                return (
                  <line 
                    key={i} 
                    x1="100" 
                    y1="100" 
                    x2={(100 + 92 * Math.cos(angle)).toFixed(1)} 
                    y2={(100 + 92 * Math.sin(angle)).toFixed(1)} 
                    stroke="#fff" 
                    strokeWidth="0.4" 
                  />
                );
              })}
            </g>
            <circle cx="100" cy="100" r="70" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" className="dh-spin-r" />
          </svg>

          {/* Floating glowing aura particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {[
              { l: "12%", d: "0s", w: "6px", h: "6px" }, 
              { l: "28%", d: "2.4s", w: "8px", h: "8px" }, 
              { l: "45%", d: "4.8s", w: "5px", h: "5px" },
              { l: "62%", d: "1.2s", w: "9px", h: "9px" }, 
              { l: "78%", d: "3.6s", w: "6px", h: "6px" }, 
              { l: "90%", d: "6.0s", w: "7px", h: "7px" },
            ].map((p, i) => (
              <span 
                key={i} 
                className="dh-particle absolute bottom-36 rounded-full bg-amber-100/90 shadow-[0_0_12px_4px_rgba(251,191,36,0.55)]" 
                style={{ 
                  left: p.l, 
                  animationDelay: p.d,
                  width: p.w,
                  height: p.h
                }} 
              />
            ))}
          </div>

          {/* Watermark Glyph (ॐ/卐) */}
          <span 
            className="pointer-events-none absolute right-[6%] top-[12%] select-none font-serif text-[160px] leading-none text-white/[0.06] sm:text-[220px] transition-transform duration-1000 hover:rotate-6" 
            aria-hidden="true"
          >
            {meta.glyph}
          </span>

          {/* Centered content */}
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-12 text-center sm:px-6">
            
            {/* Title Section */}
            <h1 className="dh-up dh2 mt-6 sm:mt-0 text-[26px] xs:text-[32px] sm:text-5xl lg:text-[4.85rem] font-black leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.65)] font-dm">
              <span className="inline-block mr-2">{h1.replace(/ Travel Guide$/, "")}</span>
              <span className="inline-block bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent font-black whitespace-nowrap">
                Travel Guide
              </span>
            </h1>

            {/* Deity Badge with Glow */}
            <div
              className="dh-up dh3 mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md transition-all duration-300"
              style={{ boxShadow: `0 0 16px ${meta.accent}33` }}
            >
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: meta.accent, boxShadow: `0 0 10px 2px ${meta.accent}` }} />
              {meta.deity}
            </div>

            {/* Tagline */}
            <p className="dh-up dh4 mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base font-medium">
              {meta.tagline}
            </p>

            {/* Chips Grid */}
            <div className="dh-up dh4 mt-6 flex flex-wrap justify-center gap-2.5">
              {meta.chips.map(({ icon, label }) => {
                const Icon = ICONS[icon];
                return (
                  <span 
                    key={label} 
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/15 transition-colors"
                  >
                    <Icon size={12} className="text-amber-400" />
                    {label}
                  </span>
                );
              })}
            </div>

            {/* CTA buttons */}
            <div className="dh-up dh5 mt-8 flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_16px_36px_rgba(234,88,12,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 font-dm"
              >
                <Sparkles size={14} className="animate-spin-slow" style={{ animationDuration: '6s' }} />
                Plan a {destination} Trip
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink(`Hi, I want to plan a trip to ${destination}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 active:translate-y-0 font-dm"
              >
                <MessageSquare size={14} className="text-orange-300" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── Overlapping floating stat bar ── */}
        <div className="relative z-20 mx-auto -mt-32 sm:-mt-24 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="dh-up dh5 grid grid-cols-2 gap-[1px] overflow-hidden rounded-2xl border border-orange-100/60 bg-orange-100/40 shadow-md sm:grid-cols-4">
            {meta.stats.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <div 
                  key={s.label} 
                  className="flex items-center gap-2.5 bg-white px-4 py-2.5 transition-all duration-200 justify-center sm:justify-start"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-orange-600 to-amber-500 text-white shadow-xs">
                    <Icon size={14} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-extrabold text-[#2D1B10] sm:text-base tracking-tight">{s.value}</p>
                    <p className="text-[8.5px] font-bold text-[#8c674e] uppercase tracking-wider">{s.label}</p>
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
