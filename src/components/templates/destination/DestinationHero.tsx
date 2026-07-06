"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Sparkles, ArrowRight, MessageSquare, ChevronDown } from "lucide-react";
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
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <style>{`
        @keyframes dhUp { from { opacity:0; transform:translateY(22px);} to {opacity:1; transform:translateY(0);} }
        .dh-up { opacity:0; animation: dhUp .8s cubic-bezier(.22,.7,0,1) forwards; }
        .dh0{animation-delay:.05s}.dh1{animation-delay:.14s}.dh2{animation-delay:.24s}.dh3{animation-delay:.34s}.dh4{animation-delay:.46s}.dh5{animation-delay:.58s}
        @keyframes dhFloat { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-9px);} }
        .dh-float { animation: dhFloat 6s ease-in-out infinite; }
        @keyframes dhSpin { to { transform: rotate(360deg); } }
        .dh-spin { animation: dhSpin 60s linear infinite; transform-origin:center; }
        @keyframes dhRise { 0%{ transform:translateY(0) scale(.7); opacity:0;} 15%{opacity:.7;} 85%{opacity:.7;} 100%{ transform:translateY(-70px) scale(1); opacity:0;} }
        .dh-particle { animation: dhRise 6s ease-in-out infinite; }
        @keyframes dhBounce { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(6px);} }
        .dh-bounce { animation: dhBounce 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .dh-up,.dh-float,.dh-spin,.dh-particle,.dh-bounce{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section className="relative -mt-28 w-full overflow-hidden">
        {/* ── Ambient background ── */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEEDD_44%,#FFF6EC_100%)]" />
          <div className="absolute left-1/2 top-[10%] h-[64%] w-[74%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.30)_0%,transparent_62%)]" />
          <div
            className="absolute -right-[8%] top-[14%] h-[52%] w-[42%]"
            style={{ background: `radial-gradient(ellipse at center, ${meta.accentSoft} 0%, transparent 64%)` }}
          />
          <div className="absolute -left-[6%] bottom-[4%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.20)_0%,transparent_64%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }}
          />
          {/* watermark glyph */}
          <span className="dh-float absolute right-[4%] top-[22%] select-none font-serif text-[150px] leading-none text-orange-500/[0.06] sm:text-[220px]">
            {meta.glyph}
          </span>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-32 pb-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14 lg:pt-36 lg:pb-14 xl:px-20">
          {/* ── LEFT ── */}
          <div className="flex flex-col">
            <div className="dh-up dh0 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-800 shadow-sm backdrop-blur-sm">
              <MapPin size={12} className="text-orange-500" />
              Gujarat · {destination}
            </div>

            <h1 className="dh-up dh1 mt-4 text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.4rem]">
              {h1.replace(/ Travel Guide$/, "")}
              <span className="mt-1 block bg-[linear-gradient(100deg,#EA580C,#F97316,#F59E0B)] bg-clip-text text-transparent">
                Travel Guide
              </span>
            </h1>

            {/* deity line */}
            <div
              className="dh-up dh2 mt-4 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold shadow-sm"
              style={{ borderColor: `${meta.accent}33`, background: `${meta.accent}0d`, color: meta.accent }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: meta.accent }} />
              {meta.deity}
            </div>

            <p className="dh-up dh3 mt-5 max-w-xl text-[15px] leading-[1.75] text-[#6b4c38]">{meta.tagline}</p>

            <div className="dh-up dh4 mt-6 flex flex-wrap gap-2.5">
              {meta.chips.map(({ icon, label }) => {
                const Icon = ICONS[icon];
                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-[#6b4c38] shadow-xs backdrop-blur-sm"
                  >
                    <Icon size={13} className="text-orange-500" />
                    {label}
                  </span>
                );
              })}
            </div>

            <div className="dh-up dh5 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles size={16} />
                Plan a {destination} Trip
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink(`Hi, I want to plan a trip to ${destination}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white active:translate-y-0"
              >
                <MessageSquare size={15} />
                Ask on WhatsApp
              </a>
            </div>

            {/* stats */}
            <div className="dh-up dh5 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {meta.stats.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-orange-100 bg-white/70 px-3 py-3 text-center shadow-sm backdrop-blur-sm"
                  >
                    <Icon size={16} className="mx-auto text-orange-500" />
                    <p className="mt-1.5 text-lg font-black leading-none text-[#3a2416]">{s.value}</p>
                    <p className="mt-1 text-[10.5px] font-medium leading-tight text-[#9a7358]">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT — image ── */}
          <div className="dh-up dh2 relative mx-auto w-full max-w-[520px] lg:mx-0">
            {/* rotating mandala ring behind */}
            <svg
              className="dh-spin pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-30"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <circle cx="100" cy="100" r="94" fill="none" stroke={meta.accent} strokeWidth="1" strokeDasharray="3 7" />
              {[...Array(24)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={(100 + 94 * Math.cos((i * 15 * Math.PI) / 180)).toFixed(2)}
                  y2={(100 + 94 * Math.sin((i * 15 * Math.PI) / 180)).toFixed(2)}
                  stroke="#F59E0B"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              ))}
            </svg>

            <div
              className="absolute -inset-3 rotate-2 rounded-[36px]"
              style={{ background: `linear-gradient(135deg, rgba(234,88,12,0.18), ${meta.accentSoft})` }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white shadow-[0_30px_70px_rgba(234,88,12,0.22)]">
              <div className="relative aspect-[5/4] w-full">
                <Image
                  src={meta.heroImage}
                  alt={`${destination} temple town`}
                  fill
                  priority
                  sizes="(max-width:1024px) 92vw, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                {/* rising particles */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  {[
                    { l: "20%", d: "0s" },
                    { l: "44%", d: "1.6s" },
                    { l: "66%", d: "3.1s" },
                    { l: "84%", d: "2.2s" },
                  ].map((p, i) => (
                    <span
                      key={i}
                      className="dh-particle absolute bottom-8 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]"
                      style={{ left: p.l, animationDelay: p.d }}
                    />
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[15px] font-bold text-white">{destination}, Gujarat</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/85">
                    <MapPin size={11} /> Saurashtra coast · India
                  </p>
                </div>
              </div>
            </div>

            {/* floating deity chip */}
            <div className="dh-float absolute -bottom-4 -left-4 hidden rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(234,88,12,0.18)] sm:block">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${meta.accent}, #FB923C)` }}
                >
                  <Sparkles size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-black text-[#3a2416]">{meta.deityShort}</p>
                  <p className="text-[10.5px] text-[#9a7358]">Sacred pilgrimage site</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div className="dh-up dh5 relative z-10 -mt-2 mb-1 flex justify-center" aria-hidden="true">
          <ChevronDown className="dh-bounce text-orange-400/70" size={22} />
        </div>

        {/* ── bottom wave ── */}
        <div className="relative z-10 -mb-px w-full select-none pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 110" preserveAspectRatio="none" className="block h-[60px] w-full sm:h-[80px] lg:h-[100px]">
            <path d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1200,75 1340,30 1440,45 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.10)" />
            <path d="M0,45 C120,10 300,70 480,48 C660,26 840,72 1020,52 C1160,36 1320,65 1440,55 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.10)" />
            <path d="M0,65 C200,30 380,88 560,68 C740,48 920,85 1100,70 C1240,58 1360,75 1440,68 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
