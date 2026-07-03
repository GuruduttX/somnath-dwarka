"use client";

import Image from "next/image";
import { BookOpen, Sparkles, MapPin, Compass, Star, Camera } from "lucide-react";

const HERO_IMG = "/images/home/SomnathLongImage.webp";

const CHIPS = [
  { icon: Compass, label: "Itineraries" },
  { icon: MapPin, label: "Temple tips" },
  { icon: Camera, label: "What to expect" },
];

export default function GuidesHero({ count }: { count: number }) {
  return (
    <>
      <style>{`
        @keyframes gdUp { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        .gd-up { opacity:0; animation: gdUp .72s cubic-bezier(.22,.7,0,1) forwards; }
        .gd0{animation-delay:.05s}.gd1{animation-delay:.14s}.gd2{animation-delay:.24s}.gd3{animation-delay:.34s}.gd4{animation-delay:.46s}
        @keyframes gdFloat { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-8px);} }
        .gd-float { animation: gdFloat 5.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .gd-up,.gd-float{ animation:none!important; opacity:1!important; } }
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
            <div className="gd-up gd0 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-800 shadow-sm backdrop-blur-sm">
              <BookOpen size={12} className="text-orange-500" />
              Travel Guides
            </div>

            <h1 className="gd-up gd1 mt-4 text-4xl font-black leading-[1.08] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.35rem]">
              Somnath Dwarka{" "}
              <span className="bg-[linear-gradient(100deg,#EA580C,#F97316,#F59E0B)] bg-clip-text text-transparent">
                travel guides
              </span>
            </h1>

            <p className="gd-up gd2 mt-4 max-w-xl text-[15px] leading-[1.75] text-[#6b4c38]">
              First-hand guides to help you plan the circuit — from{" "}
              <strong className="font-semibold text-orange-700">itineraries and temple timings</strong> to
              travel tips and what to expect on the ground.
            </p>

            <div className="gd-up gd3 mt-6 flex flex-wrap gap-2.5">
              {CHIPS.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-[#6b4c38] shadow-xs backdrop-blur-sm">
                  <Icon size={13} className="text-orange-500" />
                  {label}
                </span>
              ))}
            </div>

            <div className="gd-up gd4 mt-7 flex items-center gap-3">
              <a
                href="#all-guides"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <BookOpen size={16} />
                Browse {count > 0 ? `${count} guides` : "guides"}
              </a>
            </div>
          </div>

          {/* RIGHT — layered temple image */}
          <div className="gd-up gd2 relative mx-auto w-full max-w-[480px] lg:mx-0">
            <div className="absolute -inset-3 -rotate-2 rounded-[36px] bg-[linear-gradient(135deg,rgba(234,88,12,0.16),rgba(245,158,11,0.08))]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white shadow-[0_30px_70px_rgba(234,88,12,0.20)]">
              <div className="relative aspect-[4/3] w-full">
                <Image src={HERO_IMG} alt="Somnath temple travel guide" fill priority sizes="(max-width:1024px) 90vw, 480px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/5" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[14px] font-bold text-white">Somnath &amp; Dwarka, Gujarat</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/80"><MapPin size={11} /> Pilgrimage circuit</p>
                </div>
              </div>
            </div>

            {/* floating badge */}
            <div className="gd-float absolute -bottom-4 -left-4 hidden rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(234,88,12,0.18)] sm:block">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EA580C,#FB923C)] text-white">
                  <Star size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-black text-[#3a2416]">Local know-how</p>
                  <p className="text-[10.5px] text-[#9a7358]">Written by our team</p>
                </div>
              </div>
            </div>

            <div className="gd-float absolute -right-3 top-6 hidden rounded-xl border border-orange-100 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm md:flex md:items-center md:gap-1.5" style={{ animationDelay: "-2s" }}>
              <Sparkles size={13} className="text-orange-500" />
              <span className="text-[11px] font-bold text-[#3a2416]">Updated regularly</span>
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
