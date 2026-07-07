"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, CalendarDays, Flame, Users, MessageSquare, ArrowRight, PartyPopper, MapPin } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

const HERO_IMG = "/images/festivals/hero.jpg";

const CHIPS = [
  { icon: Flame, label: "Aartis & rituals" },
  { icon: Users, label: "Crowd planning" },
  { icon: CalendarDays, label: "Seasonal dates" },
];

export default function FestivalsHero({ count }: { count: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <style>{`
        @keyframes fvUp { from { opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
        .fv-up { opacity:0; animation: fvUp .72s cubic-bezier(.22,.7,0,1) forwards; }
        .fv0{animation-delay:.05s}.fv1{animation-delay:.14s}.fv2{animation-delay:.24s}.fv3{animation-delay:.34s}.fv4{animation-delay:.46s}
        @keyframes diyaRise { 0%{ transform:translateY(10px) scale(.8); opacity:0;} 20%{opacity:.95;} 80%{opacity:.95;} 100%{ transform:translateY(-42px) scale(1.05); opacity:0;} }
        .fv-diya { animation: diyaRise 4.5s ease-in-out infinite; }
        .fv-diya1{animation-delay:0s}.fv-diya2{animation-delay:1.3s}.fv-diya3{animation-delay:2.6s}.fv-diya4{animation-delay:.7s}
        @keyframes flick { 0%,100%{ transform:scaleY(1); opacity:.95;} 45%{ transform:scaleY(1.18) scaleX(.94); opacity:1;} }
        .fv-flame { animation: flick 1.1s ease-in-out infinite; transform-origin:bottom center; }
        @keyframes fvFloat { 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-8px);} }
        .fv-float { animation: fvFloat 5.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce){ .fv-up,.fv-diya,.fv-flame,.fv-float{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section id="festivals-hero" className="font-dm relative -mt-28 flex w-full flex-col overflow-hidden">
        {/* warm bg */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFEFE0_45%,#FFF6EC_100%)]" />
          <div className="absolute left-1/2 top-[12%] h-[62%] w-[72%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.28)_0%,transparent_62%)]" />
          <div className="absolute -left-[6%] bottom-[2%] h-[46%] w-[36%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.20)_0%,transparent_64%)]" />
          <div className="absolute -right-[6%] top-[16%] h-[48%] w-[38%] bg-[radial-gradient(ellipse_at_center,rgba(251,113,133,0.14)_0%,transparent_64%)]" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-5 pt-36 pb-9 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-14 lg:pt-[8.5rem] lg:pb-[3.25rem] xl:px-20">

          {/* LEFT */}
          <div className="flex flex-col">
            <div className="fv-up fv0 inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-200/80 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-800 shadow-sm backdrop-blur-sm">
              <PartyPopper size={12} className="text-orange-500" />
              Festivals &amp; Celebrations
            </div>

            <h1 className="fv-up fv1 mt-4 text-4xl font-black leading-[1.06] tracking-[-0.02em] text-[#3a2416] sm:text-5xl lg:text-[3.35rem]">
              Festivals at{" "}
              <span className="bg-[linear-gradient(100deg,#EA580C,#F97316,#F59E0B)] bg-clip-text text-transparent">
                Somnath &amp; Dwarka
              </span>
            </h1>

            <p className="fv-up fv2 mt-4 max-w-xl text-[15px] leading-[1.75] text-[#6b4c38]">
              From <strong className="font-semibold text-orange-700">Janmashtami at Dwarka</strong> to{" "}
              <strong className="font-semibold text-orange-700">Maha Shivratri at Somnath</strong> — what to
              expect, the rituals, and how to plan travel and darshan around the crowds.
            </p>

            <div className="fv-up fv3 mt-6 flex flex-wrap gap-2.5">
              {CHIPS.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white/80 px-3 py-1.5 text-[12px] font-semibold text-[#6b4c38] shadow-xs backdrop-blur-sm">
                  <Icon size={13} className="text-orange-500" />
                  {label}
                </span>
              ))}
            </div>

            <div className="fv-up fv4 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setOpen(true)}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Sparkles size={16} />
                Plan a Festival Trip
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={waLink("Hi, I want to plan a festival trip to Somnath / Dwarka")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white active:translate-y-0 cursor-pointer"
              >
                <MessageSquare size={15} />
                Ask on WhatsApp
              </a>
            </div>

            <p className="fv-up fv4 mt-6 text-[12.5px] font-medium text-[#9a7358]">
              {count} festival {count === 1 ? "guide" : "guides"} · dates confirmed before each season
            </p>
          </div>

          {/* RIGHT — image with rising diyas */}
          <div className="fv-up fv2 relative mx-auto w-full max-w-[500px] lg:mx-0">
            <div className="absolute -inset-3 rotate-2 rounded-[36px] bg-[linear-gradient(135deg,rgba(234,88,12,0.18),rgba(245,158,11,0.10))]" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white shadow-[0_30px_70px_rgba(234,88,12,0.22)]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[5/5]">
                <Image src={HERO_IMG} alt="Temple lit up during a festival" fill priority sizes="(max-width:1024px) 90vw, 500px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* rising diyas */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  {[
                    { l: "18%", b: "16%", c: "fv-diya1" },
                    { l: "40%", b: "10%", c: "fv-diya2" },
                    { l: "62%", b: "18%", c: "fv-diya3" },
                    { l: "80%", b: "12%", c: "fv-diya4" },
                  ].map((d, i) => (
                    <div key={i} className={`fv-diya ${d.c} absolute`} style={{ left: d.l, bottom: d.b }}>
                      <svg width="16" height="22" viewBox="0 0 14 20" fill="none">
                        <path className="fv-flame" d="M7 0C8.5 3 10 4.4 10 7a3 3 0 1 1-6 0c0-1.4.6-2.4 1.4-3.4C6 4.6 6.6 5.4 7 6c.5-.7.6-1.6 0-3-.3-.9-.4-2 0-3Z" fill="#FDBA74" />
                        <ellipse cx="7" cy="15.5" rx="6" ry="3" fill="#EA580C" />
                        <ellipse cx="7" cy="14.4" rx="6" ry="2.4" fill="#F59E0B" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* caption */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[14px] font-bold text-white">Temple towns come alive</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/80"><MapPin size={11} /> Gujarat · Somnath &amp; Dwarka</p>
                </div>
              </div>
            </div>

            {/* floating chip */}
            <div className="fv-float absolute -bottom-4 -left-4 hidden rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-[0_18px_40px_rgba(234,88,12,0.18)] sm:block">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#EA580C,#FB923C)] text-white">
                  <CalendarDays size={16} />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-black text-[#3a2416]">Plan 6–10 weeks ahead</p>
                  <p className="text-[10.5px] text-[#9a7358]">Stays &amp; cabs fill fast</p>
                </div>
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
