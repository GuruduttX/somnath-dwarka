"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight, MapPin, Sparkles, Navigation, CalendarDays } from "lucide-react";
import CountUp from "@/src/utils/CountUp";
import React from "react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

const CARD_SOMNATH = "/images/home/SomnathLongImage.webp";
const CARD_DWARKA = "/images/home/DwarikaLongImage.webp";
const SOMNATH_DWARKA = "/images/CTA.webp";

const STATS = [
  { value: 4800, suffix: "+", label: "Happy Pilgrims" },
  { value: 12, suffix: " Yrs", label: "Experience" },
  { value: 4.9, suffix: "★", label: "Rating" },
] as const;

const AVATARS = ["#F59E0B", "#EA580C", "#FB7185", "#A855F7"];

export default function HomeHero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} />

      <style>{`
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }

        @keyframes heroUp { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:translateY(0); } }
        .h-anim { opacity:0; animation: heroUp .8s cubic-bezier(.22,.7,0,1) forwards; }
        .hd0{animation-delay:.05s}.hd1{animation-delay:.15s}.hd2{animation-delay:.27s}
        .hd3{animation-delay:.39s}.hd4{animation-delay:.51s}.hd5{animation-delay:.63s}.hd6{animation-delay:.75s}

        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-14px) rotate(-4deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(5deg)}  50%{transform:translateY(-10px) rotate(5deg)} }
        @keyframes floatChip { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        .float-som  { animation: floatA 8s ease-in-out infinite; }
        .float-dwk  { animation: floatB 9s ease-in-out infinite; animation-delay:-2s; }
        .float-chip { animation: floatChip 6s ease-in-out infinite; }
        .float-chip2{ animation: floatChip 7s ease-in-out infinite; animation-delay:-3s; }
        .float-chip3{ animation: floatChip 5.5s ease-in-out infinite; animation-delay:-1.5s; }

        @keyframes spinSlow { to { transform: rotate(360deg); } }
        .sun-rays { animation: spinSlow 90s linear infinite; }
        .chakra-spin {
          animation: spinSlow 35s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        @keyframes marching { to { stroke-dashoffset: -32; } }
        .journey-dash { stroke-dasharray: 2 6; animation: marching 1.6s linear infinite; }

        @keyframes pulseDot { 0%,100%{ transform:scale(1); opacity:.9 } 50%{ transform:scale(1.5); opacity:.35 } }
        .pin-pulse { animation: pulseDot 2.4s ease-in-out infinite; transform-origin:center; }

        @keyframes shine { 0%{ background-position: -140% 0 } 60%,100%{ background-position: 240% 0 } }
        .headline-grad {
          background: linear-gradient(100deg,#EA580C 0%,#F97316 30%,#F59E0B 55%,#EA580C 80%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
        }
        .btn-shine::after{
          content:""; position:absolute; inset:0;
          background: linear-gradient(110deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%);
          background-size: 200% 100%; animation: shine 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .h-anim,.float-som,.float-dwk,.float-chip,.float-chip2,.float-chip3,
          .sun-rays,.chakra-spin,.journey-dash,.pin-pulse,.btn-shine::after {
            animation: none !important; opacity: 1 !important;
          }
        }
      `}</style>

      <section className="font-dm relative flex flex-col overflow-hidden">

        {/* ── LIGHT WARM BACKGROUND ── */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEFE0_45%,#FFF6EC_100%)]" />
          {/* soft saffron glow top-left */}
          <div className="absolute -left-[8%] -top-[12%] h-[70%] w-[55%] bg-[radial-gradient(ellipse_at_35%_40%,rgba(251,146,60,0.30)_0%,transparent_62%)]" />
          {/* amber glow bottom-right */}
          <div className="absolute -right-[6%] bottom-[2%] h-[62%] w-[48%] bg-[radial-gradient(ellipse_at_70%_75%,rgba(245,158,11,0.22)_0%,transparent_62%)]" />
          {/* pink whisper */}
          <div className="absolute right-[20%] top-[6%] h-[38%] w-[30%] bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.12)_0%,transparent_65%)]" />
          {/* dotted texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }}
          />
        </div>

        {/* Om watermark — left, shifted down so it clears the navbar */}
        <div className="font-playfair pointer-events-none absolute left-[2%] top-[34%] z-[1] hidden select-none text-[255px] leading-none text-[#EA580C]/[0.06] lg:block" aria-hidden="true">ॐ</div>

        {/* Sudarshan Chakra watermark — right side, shifted down, faint (SVG) */}
        <svg
          className="chakra-spin pointer-events-none absolute -right-[2%] top-[38%] z-[1] hidden h-[300px] w-[300px] text-[#EA580C]/[0.09] lg:block xl:h-[360px] xl:w-[360px]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* rim flames */}
          {Array.from({ length: 24 }).map((_, i) => (
            <polygon key={`f${i}`} points="100,2 96,14 104,14" fill="currentColor" stroke="none" transform={`rotate(${i * 15} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="86" strokeWidth="2" />
          <circle cx="100" cy="100" r="74" strokeWidth="1.2" />
          {/* spokes */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`s${i}`} x1="100" y1="26" x2="100" y2="74" strokeWidth="1.4" transform={`rotate(${i * 22.5} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="24" strokeWidth="1.6" />
          <circle cx="100" cy="100" r="9" fill="currentColor" stroke="none" />
        </svg>

        {/* ── HERO INNER ── */}
        <div className="relative z-[2] mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-5 pt-24 pb-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-14 lg:pt-28 lg:pb-6 xl:px-20">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Eyebrow */}
            <p className="h-anim hd1 text-[11px] mt-4 -mb-2 font-medium uppercase tracking-[0.2em] text-orange-600/70">
              Jyotirlinga Pilgrimage · Gujarat
            </p>

            {/* Mobile hero image */}
            <div className="h-anim hd2 relative mt-5 w-full max-w-[440px] overflow-hidden rounded-[26px] border-4 border-white shadow-[0_20px_50px_rgba(234,88,12,0.25)] sm:hidden [aspect-ratio:16/11]">
              <img src={SOMNATH_DWARKA} alt="Somnath and Dwarka temples" className="h-full w-full object-cover object-[center_35%]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
                <p className="text-sm font-semibold text-white">Somnath &amp; Dwarka Yatra</p>
                <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/70"><MapPin size={10} /> Gujarat, India</p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-playfair h-anim hd2 mt-5 text-5xl font-black leading-[1.02] tracking-[-0.03em] text-[#3a2416] sm:text-6xl lg:text-7xl xl:text-[86px]">
              Somnath &amp;{" "}
              <span className="headline-grad italic">Dwarka</span>
              <span className="mt-3 block font-dm text-lg font-bold not-italic tracking-normal text-[#7a5238] sm:text-xl lg:text-2xl">
                A Divine Tour You&apos;ll Remember
              </span>
            </h1>

            {/* Description */}
            <p className="h-anim hd3 mt-5 max-w-[560px] text-[15px] leading-[1.8] text-[#6b4c38] lg:text-base">
              Stand before the legendary{" "}
              <strong className="font-semibold text-orange-700">Jyotirlinga of Somnath</strong>, let the sea breeze carry the
              evening aarti, then feel the timeless calm of{" "}
              <strong className="font-semibold text-orange-700">Dwarkadhish Temple</strong>. A warm, family-friendly
              pilgrimage — planned end to end, guided with care.
            </p>

            {/* CTAs */}
            <div className="h-anim hd4 mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                onClick={() => setOpen(true)}
                className="btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(234,88,12,0.4)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Star size={15} className="relative z-[1]" />
                <span className="relative z-[1]">Explore Packages</span>
                <ArrowRight size={15} className="relative z-[1] transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/plan/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white"
              >
                <Navigation size={15} />
                Plan Your Trip
              </Link>
            </div>

            {/* Trust row */}
            <div className="h-anim hd5 mt-7 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATARS.map((c, i) => (
                  <span
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg,${c},#FDBA74)` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-[11.5px] font-medium text-[#7a5238]">Loved by thousands of happy pilgrims</p>
              </div>
            </div>

            {/* Stats */}
            <div className="h-anim hd6 mt-7 flex flex-wrap items-center justify-center gap-6 border-t border-orange-200/60 pt-6 lg:justify-start lg:gap-9">
              {STATS.map(({ value, suffix, label }, i) => (
                <React.Fragment key={label}>
                  <div className="shrink-0 text-center lg:text-left">
                    <div className="font-playfair text-3xl font-bold leading-none text-orange-600">
                      <CountUp end={value} duration={600} suffix={suffix} />
                    </div>
                    <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9a7358]">{label}</div>
                  </div>
                  {i < STATS.length - 1 && <div className="h-9 w-px shrink-0 bg-orange-200/70" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — travel memory composition (desktop) ══ */}
          <div className="relative hidden h-[500px] w-full items-center justify-center lg:flex">

            {/* rotating sun-ray glow */}
            <div
              className="sun-rays pointer-events-none absolute h-[520px] w-[520px] rounded-full opacity-[0.5]"
              style={{ background: "conic-gradient(from 0deg,transparent 0deg,rgba(251,146,60,0.16) 12deg,transparent 24deg,rgba(245,158,11,0.14) 36deg,transparent 48deg,rgba(251,146,60,0.16) 60deg,transparent 72deg,rgba(245,158,11,0.14) 84deg,transparent 96deg,rgba(251,146,60,0.16) 108deg,transparent 120deg,rgba(245,158,11,0.14) 132deg,transparent 144deg,rgba(251,146,60,0.16) 156deg,transparent 168deg,rgba(245,158,11,0.14) 180deg,transparent 192deg,rgba(251,146,60,0.16) 204deg,transparent 216deg,rgba(245,158,11,0.14) 228deg,transparent 240deg,rgba(251,146,60,0.16) 252deg,transparent 264deg,rgba(245,158,11,0.14) 276deg,transparent 288deg,rgba(251,146,60,0.16) 300deg,transparent 312deg,rgba(245,158,11,0.14) 324deg,transparent 336deg,rgba(251,146,60,0.16) 348deg,transparent 360deg)", maskImage: "radial-gradient(circle,transparent 34%,black 42%,black 70%,transparent 78%)", WebkitMaskImage: "radial-gradient(circle,transparent 34%,black 42%,black 70%,transparent 78%)" }}
              aria-hidden="true"
            />
            {/* soft blob behind cards */}
            <div className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28)_0%,transparent_68%)]" aria-hidden="true" />

            {/* journey path connecting the two temples */}
            <svg className="pointer-events-none absolute inset-0 z-[3] h-full w-full" viewBox="0 0 420 560" fill="none" aria-hidden="true">
              <path d="M120 150 C 60 260, 360 300, 300 420" stroke="#EA580C" strokeOpacity="0.5" strokeWidth="2.5" className="journey-dash" strokeLinecap="round" />
              {/* Somnath pin */}
              <circle cx="120" cy="150" r="12" fill="#EA580C" fillOpacity="0.18" className="pin-pulse" />
              <circle cx="120" cy="150" r="5" fill="#EA580C" />
              {/* Dwarka pin */}
              <circle cx="300" cy="420" r="12" fill="#F59E0B" fillOpacity="0.2" className="pin-pulse" />
              <circle cx="300" cy="420" r="5" fill="#F59E0B" />
            </svg>

            {/* Somnath polaroid */}
            <div className="float-som absolute left-[2%] top-[4%] z-[4] w-[224px] rounded-[22px] border-[6px] border-white bg-white shadow-[0_28px_60px_rgba(234,88,12,0.28)]">
              <div className="relative h-[268px] overflow-hidden rounded-[14px]">
                <img src={CARD_SOMNATH} alt="Somnath Temple, Veraval" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700 backdrop-blur-sm">Jyotirlinga</div>
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-2">
                <div>
                  <p className="text-[13px] font-bold text-[#3a2416]">Somnath Temple</p>
                  <p className="flex items-center gap-1 text-[10.5px] text-[#9a7358]"><MapPin size={9} className="text-orange-500" /> Veraval, Gujarat</p>
                </div>
                <Sparkles size={16} className="text-amber-400" />
              </div>
            </div>

            {/* Dwarka polaroid */}
            <div className="float-dwk absolute bottom-[3%] right-[1%] z-[5] w-[200px] rounded-[22px] border-[6px] border-white bg-white shadow-[0_28px_60px_rgba(245,158,11,0.3)]">
              <div className="relative h-[236px] overflow-hidden rounded-[14px]">
                <img src={CARD_DWARKA} alt="Dwarkadhish Temple, Dwarka" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700 backdrop-blur-sm">Char Dham</div>
              </div>
              <div className="flex items-center justify-between px-2 pb-1 pt-2">
                <div>
                  <p className="text-[13px] font-bold text-[#3a2416]">Dwarkadhish</p>
                  <p className="flex items-center gap-1 text-[10.5px] text-[#9a7358]"><MapPin size={9} className="text-orange-500" /> Dwarka, Gujarat</p>
                </div>
                <Star size={15} className="fill-amber-400 text-amber-400" />
              </div>
            </div>

            {/* Floating chip — route/distance */}
            <div className="float-chip absolute right-[0%] top-[6%] z-[6] flex items-center gap-2.5 rounded-2xl border border-orange-100 bg-white/95 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EA580C,#FB923C)]">
                <Navigation size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#9a7358]">Somnath → Dwarka</p>
                <p className="text-[13px] font-bold text-[#3a2416]">≈ 233 km scenic route</p>
              </div>
            </div>

            {/* Floating chip — duration */}
            <div className="float-chip2 absolute bottom-[8%] left-[0%] z-[6] flex items-center gap-2.5 rounded-2xl border border-orange-100 bg-white/95 px-3.5 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#F59E0B,#FBBF24)]">
                <CalendarDays size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#9a7358]">Ideal trip</p>
                <p className="text-[13px] font-bold text-[#3a2416]">4–5 Days Yatra</p>
              </div>
            </div>        
          </div>
        </div>

        {/* ── WAVE to white ── */}
        <div className="relative z-10 -mb-px w-full" aria-hidden="true">
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
