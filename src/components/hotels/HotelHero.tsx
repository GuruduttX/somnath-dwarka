"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Star, MapPin, Waves, BedDouble, ShieldCheck, MessageSquare, ArrowRight, BadgeCheck, Wifi } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

const HERO_IMG = "/images/hotels/hero.jpg";

const CHIPS = [
  { icon: MapPin, label: "Walkable to temples" },
  { icon: Waves, label: "Sea-facing options" },
  { icon: BedDouble, label: "Budget → Luxury" },
  { icon: BadgeCheck, label: "Honest, no fake listings" },
];

const AMENITIES = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Waves, label: "Sea view" },
  { icon: ShieldCheck, label: "Verified" },
];

export default function HotelHero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Hotel Booking" />

      <style>{`
        @keyframes hotelUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        .h-up { opacity:0; animation: hotelUp .75s cubic-bezier(.22,.7,0,1) forwards; }
        .hd0{animation-delay:.05s}.hd1{animation-delay:.14s}.hd2{animation-delay:.24s}
        .hd3{animation-delay:.34s}.hd4{animation-delay:.46s}.hd5{animation-delay:.58s}
        @keyframes hotelFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .h-float-1 { animation: hotelFloat 5s ease-in-out infinite; }
        .h-float-2 { animation: hotelFloat 6.2s ease-in-out infinite; animation-delay:-2s; }
        @media (prefers-reduced-motion: reduce) {
          .h-up,.h-float-1,.h-float-2 { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <section id="hotel-hero" className="font-dm relative -mt-28 flex w-full flex-col overflow-hidden">

        {/* ── WARM BACKGROUND ── */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEFE0_45%,#FFF6EC_100%)]" />
          <div className="absolute left-1/2 top-[10%] h-[64%] w-[72%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.28)_0%,transparent_62%)]" />
          <div className="absolute -left-[6%] bottom-[2%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.20)_0%,transparent_64%)]" />
          <div className="absolute -right-[8%] top-[16%] h-[50%] w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.12)_0%,transparent_64%)]" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }}
          />
        </div>

        {/* ── INNER ── */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-5 pt-36 pb-9 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-14 lg:pt-[8.5rem] lg:pb-[3.25rem] xl:px-20">

          {/* ══ LEFT ══ */}
          <div className="flex flex-col">
        

            <h1 className="h-up hd1 mt-4 text-4xl font-black leading-[1.08] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.35rem]">
              Where to Stay near{" "}
              <span className="bg-[linear-gradient(100deg,#EA580C,#F97316,#F59E0B)] bg-clip-text text-transparent">
                Somnath &amp; Dwarka
              </span>
            </h1>

            <p className="h-up hd2 mt-4 max-w-xl text-[15px] leading-[1.75] text-[#6b4c38]">
              We help you choose and book the right hotel near the temples — across
              <strong className="font-semibold text-orange-700"> budget, mid-range and premium</strong> tiers.
              Honest area guidance, real inventory, and a firm quote for your dates.
            </p>

            {/* Chips */}
            <div className="h-up hd3 mt-6 flex flex-wrap gap-2.5">
              {CHIPS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-[#6b4c38] shadow-xs backdrop-blur-sm"
                >
                  <Icon size={13} className="text-orange-500" />
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="h-up hd4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <BedDouble size={16} />
                Get Hotel Help
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink("Hi, I need help booking a hotel near Somnath / Dwarka")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white active:translate-y-0 cursor-pointer"
              >
                <MessageSquare size={15} />
                WhatsApp Us
              </a>
            </div>

            {/* Stats */}
            <div className="h-up hd5 mt-8 flex flex-nowrap items-center gap-3 border-t border-orange-200/60 pt-5 sm:gap-x-8">
              {[
                { v: "2", l: "Temple towns" },
                { v: "3", l: "Comfort tiers" },
                { v: "100%", l: "Real bookings" },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-3 sm:gap-8">
                  <div>
                    <div className="text-xl font-black leading-none text-orange-600 sm:text-2xl">{s.v}</div>
                    <div className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#9a7358] sm:text-[10px] sm:tracking-[0.12em]">{s.l}</div>
                  </div>
                  {i < 2 && <div className="h-9 w-px bg-orange-200/70" />}
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — layered photo composition ══ */}
          <div className="h-up hd2 relative mx-auto w-full max-w-[520px] lg:mx-0">
            {/* accent frame */}
            <div className="absolute -inset-3 -rotate-2 rounded-[36px] bg-[linear-gradient(135deg,rgba(234,88,12,0.18),rgba(245,158,11,0.10))]" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-[30px] border-[6px] border-white shadow-[0_35px_80px_rgba(234,88,12,0.22)]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/5]">
                <Image
                  src={HERO_IMG}
                  alt="Sea-facing resort near Somnath and Dwarka"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                {/* top rating pill */}
                <div className="h-float-1 absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                  <div className="flex gap-[1px]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#3a2416]">Handpicked stays</span>
                </div>

                {/* location chip */}
                <div className="h-float-2 absolute right-4 top-16 flex items-center gap-1.5 rounded-xl border border-white/30 bg-black/45 px-3 py-2 shadow-lg backdrop-blur-md">
                  <MapPin size={13} className="text-orange-300" />
                  <div className="leading-tight">
                    <p className="text-[11px] font-bold text-white">Near the Temple</p>
                    <p className="text-[9px] text-white/70">A short walk to darshan</p>
                  </div>
                </div>

                {/* bottom info bar */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="rounded-2xl border border-white/25 bg-white/15 p-3 backdrop-blur-md">
                    <p className="text-[13px] font-bold text-white">Sea-facing comfort, temple-close convenience</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {AMENITIES.map(({ icon: Icon, label }) => (
                        <span key={label} className="inline-flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-[#6b4c38]">
                          <Icon size={11} className="text-orange-500" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* floating "best price" badge */}
            <div className="h-float-1 absolute -bottom-4 -left-4 hidden rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(234,88,12,0.18)] sm:block">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EA580C,#FB923C)] text-white">
                  <ShieldCheck size={17} />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-black text-[#3a2416]">Best-fit guarantee</p>
                  <p className="text-[10.5px] text-[#9a7358]">We match your budget &amp; dates</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── WAVE ── */}
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
