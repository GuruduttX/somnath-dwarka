"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Star, MapPin, BedDouble, MessageSquare, ArrowRight, ChevronRight } from "lucide-react";
import HotelEnquiryPopup from "@/src/utils/HotelEnquiryPopUp";
import { waLink } from "@/src/config/site";

interface Tier {
  tier: string;
  area: string;
  typical_range: string;
}

interface Props {
  city: string;
  h1: string;
  nearTemple: string;
  image: string;
  tiers: Tier[];
  count: number;
  rating: number;
}

export default function HotelCityHero({ city, h1, nearTemple, image, tiers, count, rating }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HotelEnquiryPopup open={open} onClose={() => setOpen(false)} />

      <style>{`
        @keyframes hcUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .hc-up { opacity:0; animation: hcUp .7s cubic-bezier(.22,.7,0,1) forwards; }
        .hc0{animation-delay:.05s}.hc1{animation-delay:.14s}.hc2{animation-delay:.24s}.hc3{animation-delay:.34s}.hc4{animation-delay:.46s}
        @media (prefers-reduced-motion: reduce){ .hc-up{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section className="font-dm relative -mt-28 flex min-h-[600px] w-full flex-col justify-end overflow-hidden lg:min-h-[660px]">
        {/* ── Background image ── */}
        <div className="absolute inset-0 z-0">
          <Image src={image} alt={`Hotels in ${city} near ${nearTemple}`} fill priority className="object-cover" sizes="100vw" />
          {/* warm dark gradient for readability */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,12,4,0.55)_0%,rgba(30,12,4,0.30)_38%,rgba(20,8,2,0.78)_100%)]" />
          {/* saffron glow */}
          <div className="absolute -left-[6%] top-[8%] h-[60%] w-[45%] bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.35)_0%,transparent_62%)]" />
          <div className="absolute right-0 bottom-0 h-[55%] w-[45%] bg-[radial-gradient(ellipse_at_70%_80%,rgba(234,88,12,0.30)_0%,transparent_65%)]" />
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-40 pb-14 sm:px-8 lg:px-14 lg:pt-44 lg:pb-16 xl:px-20">
          {/* breadcrumb eyebrow */}
          <nav className="hc-up hc0 mb-5 flex items-center gap-1.5 text-[12px] font-medium text-white/70">
            <a href="/hotels/" className="transition hover:text-white">Hotels</a>
            <ChevronRight size={13} />
            <span className="text-orange-300">{city}</span>
          </nav>

          <div className="hc-up hc1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-100 backdrop-blur-md">
            <Sparkles size={12} className="text-orange-300" />
            Curated stays · {city}
          </div>

          <h1 className="hc-up hc1 mt-4 max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.02em] text-white drop-shadow-sm sm:text-5xl lg:text-[3.6rem]">
            {h1}
          </h1>

          {/* meta row */}
          <div className="hc-up hc2 mt-5 flex flex-wrap items-center gap-3 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 font-semibold shadow-lg backdrop-blur-xl">
              <MapPin size={14} className="text-orange-300" />
              Near {nearTemple}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 font-semibold shadow-lg backdrop-blur-xl">
              <Star size={14} className="fill-orange-300 text-orange-300" />
              {rating.toFixed(1)} avg rating
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 font-semibold shadow-lg backdrop-blur-xl">
              <BedDouble size={14} className="text-orange-300" />
              {count} handpicked hotels
            </span>
          </div>

          {/* tier price summary */}
          <div className="hc-up hc3 mt-6 grid max-w-2xl grid-cols-1 gap-2.5 sm:grid-cols-3">
            {tiers.map((t) => (
              <div key={t.tier} className="rounded-2xl border border-white/25 bg-black/35 p-3.5 shadow-lg backdrop-blur-xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-orange-200">{t.tier}</p>
                <p className="mt-1 text-lg font-black text-white">{t.typical_range}</p>
                <p className="mt-0.5 text-[11px] text-white/65">/ night · {t.area}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hc-up hc4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(234,88,12,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <BedDouble size={16} />
              Get a Recommendation
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={waLink(`Hi, I need a hotel in ${city} near ${nearTemple}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
            >
              <MessageSquare size={15} />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* ── Wave to white ── */}
        <div className="relative z-10 -mb-px w-full pointer-events-none select-none" aria-hidden="true">
          <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-[54px] w-full sm:h-[74px] lg:h-[92px]">
            <path d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1200,75 1340,30 1440,45 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.12)" />
            <path d="M0,45 C120,10 300,70 480,48 C660,26 840,72 1020,52 C1160,36 1320,65 1440,55 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.12)" />
            <path d="M0,65 C200,30 380,88 560,68 C740,48 920,85 1100,70 C1240,58 1360,75 1440,68 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
