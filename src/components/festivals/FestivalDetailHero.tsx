"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Sparkles, ArrowRight, MessageSquare, CalendarDays, Users, Flame, ChevronRight } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

const FALLBACK = "/images/festivals/hero.jpg";

function crowdCls(crowd: string) {
  const c = crowd.toLowerCase();
  if (c.includes("very")) return "bg-rose-500/90 border-rose-300/40";
  if (c.includes("high")) return "bg-orange-500/90 border-orange-300/40";
  return "bg-emerald-500/90 border-emerald-300/40";
}

export default function FestivalDetailHero({
  image,
  festival,
  h1,
  answerFirst,
  deity,
  city,
  season,
  crowd,
  eventVenue,
  dateThisYear,
}: {
  image: string;
  festival: string;
  h1: string;
  answerFirst: string;
  deity: string;
  city: string;
  season: string;
  crowd: string;
  eventVenue: string;
  dateThisYear: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={() => setOpen(false)} defaultService="Tour Package" />

      <style>{`
        @keyframes fdUp { from { opacity:0; transform:translateY(24px);} to {opacity:1; transform:translateY(0);} }
        .fd-up { opacity:0; animation: fdUp .8s cubic-bezier(.22,.7,0,1) forwards; }
        .fd0{animation-delay:.05s}.fd1{animation-delay:.16s}.fd2{animation-delay:.28s}.fd3{animation-delay:.4s}.fd4{animation-delay:.52s}.fd5{animation-delay:.64s}
        @keyframes fdRise { 0%{ transform:translateY(0) scale(.6); opacity:0;} 12%{opacity:.9;} 82%{opacity:.9;} 100%{ transform:translateY(-120px) scale(1.05); opacity:0;} }
        .fd-spark { animation: fdRise 7s ease-in-out infinite; }
        @keyframes fdFlick { 0%,100%{ transform:scaleY(1); opacity:.95;} 45%{ transform:scaleY(1.2) scaleX(.92); opacity:1;} }
        .fd-flame { animation: fdFlick 1.1s ease-in-out infinite; transform-origin:bottom center; }
        @media (prefers-reduced-motion: reduce){ .fd-up,.fd-spark,.fd-flame{ animation:none!important; opacity:1!important; } }
      `}</style>

      <section id="festival-hero" className="relative -mt-28 flex min-h-[86vh] w-full items-end overflow-hidden">
        {/* background image */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src={image || FALLBACK} alt={`${festival} at ${city}`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,12,2,0.35)_0%,rgba(30,12,2,0.55)_45%,rgba(20,8,2,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(234,88,12,0.35)_0%,transparent_55%)] mix-blend-screen" />
          {/* dot texture */}
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle,#fff 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        </div>

        {/* rising sparks */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          {[
            { l: "12%", d: "0s" }, { l: "28%", d: "1.8s" }, { l: "52%", d: "3.4s" },
            { l: "71%", d: "2.3s" }, { l: "88%", d: "4.1s" },
          ].map((p, i) => (
            <span key={i} className="fd-spark absolute bottom-24 h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_3px_rgba(251,191,36,0.7)]" style={{ left: p.l, animationDelay: p.d }} />
          ))}
        </div>

        {/* content */}
        <div className="relative z-20 mx-auto w-full max-w-5xl px-5 pb-16 pt-40 sm:px-8 lg:px-10">
          {/* breadcrumb pill */}
          <div className="fd-up fd0 mb-5 flex items-center gap-1.5 text-[12px] font-medium text-white/70">
            <Link href="/festivals/" className="transition hover:text-orange-300">Festivals</Link>
            <ChevronRight size={13} />
            <span className="text-orange-200">{festival}</span>
          </div>

          <div className="fd-up fd1 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-orange-100 backdrop-blur-md">
            <Flame size={12} className="text-orange-300" />
            {city} · {deity}
          </div>

          <h1 className="fd-up fd2 mt-4 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.02em] text-white drop-shadow-sm sm:text-5xl lg:text-[3.6rem]">
            {h1}
          </h1>

          <p className="fd-up fd3 mt-5 max-w-2xl text-[15px] leading-[1.8] text-white/85 sm:text-base">{answerFirst}</p>

          {/* meta chips */}
          <div className="fd-up fd4 mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur-md">
              <CalendarDays size={13} className="text-orange-300" />
              {season}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur-md ${crowdCls(crowd)}`}>
              <Users size={13} />
              {crowd} crowd
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur-md">
              <MapPin size={13} className="text-orange-300" />
              {eventVenue}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur-md">
              <Sparkles size={13} className="text-orange-300" />
              {dateThisYear ? dateThisYear : "Dates confirmed each season"}
            </span>
          </div>

          {/* CTAs */}
          <div className="fd-up fd5 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={() => setOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_34px_rgba(234,88,12,0.45)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles size={16} />
              Plan a {festival} Trip
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={waLink(`Hi, I want to plan a trip for ${festival} at ${city}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:translate-y-0"
            >
              <MessageSquare size={15} className="text-orange-200" />
              Ask on WhatsApp
            </a>
          </div>
        </div>

        {/* bottom wave into white */}
        <div className="absolute inset-x-0 bottom-0 z-20 -mb-px w-full select-none pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-[46px] w-full sm:h-[64px]">
            <path d="M0,50 C240,10 480,80 720,55 C960,30 1200,78 1440,48 L1440,90 L0,90 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
