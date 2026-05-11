"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Star, MoveRight } from "lucide-react";

/* ─────────────────────────────────────────────
   CINEMATIC IMAGES — rotate softly in BG
───────────────────────────────────────────── */
const scenes = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90",
    credit: "Dwarkadhish Temple, Dwarka",
  },
  {
    src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1800&q=90",
    credit: "Somnath Jyotirlinga, Saurashtra",
  },
  {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1800&q=90",
    credit: "Gomti Ghat, Gujarat Coast",
  },
];

export default function HeroSection() {
  const [scene, setScene] = useState(0);
  const [fading, setFading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setScene((v) => (v + 1) % scenes.length);
        setFading(false);
      }, 900);
    }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0e0b08] flex flex-col pt-22">

      {/* ══════════════════════════════════════
          CINEMATIC BACKGROUND
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {scenes.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: i === scene && !fading ? 1 : 0 }}
          >
            <Image
              src={s.src}
              alt={s.credit}
              fill
              priority={i === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Rich layered overlays for cinematic depth */}
        {/* Bottom-heavy dark for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b08]/95 via-[#0e0b08]/40 to-[#0e0b08]/25" />
        {/* Left vignette — anchors the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0b08]/80 via-[#0e0b08]/20 to-transparent" />
        {/* Warm saffron blush at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-orange-950/30 to-transparent" />
        {/* Very subtle top shadow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0e0b08]/50 to-transparent" />
      </div>

      {/* ══════════════════════════════════════
          NAVBAR STRIP
      ══════════════════════════════════════ */}
      <nav className="relative z-30 flex items-center justify-between px-6 pt-7 sm:px-10 md:px-14 lg:px-20">
        {/* Logo / brand */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-orange-200/90 text-[10px] tracking-[0.3em] uppercase font-medium">Sacred Gujarat</span>
          <span className="text-white text-lg font-bold tracking-tight mt-0.5">Dwarka · Somnath</span>
        </Link>

        {/* Nav links — desktop
        <div className="hidden md:flex items-center gap-8">
          {["Packages", "Temples", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white/50 hover:text-white/90 text-sm font-medium tracking-wide transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div> */}

        {/* Call to action nav */}
        <a
          href="tel:+919999999999"
          className="hidden sm:flex items-center gap-2 border border-white/15 hover:border-orange-400/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white/70 hover:text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
          +91 99999 99999
        </a>
      </nav>

      {/* ══════════════════════════════════════
          HERO CONTENT — left-anchored
      ══════════════════════════════════════ */}
      <div className="relative z-20 flex-1 flex items-end pb-28 sm:pb-32 md:pb-36 px-6 sm:px-10 md:px-14 lg:px-20">
        <div
          className="max-w-2xl xl:max-w-3xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          {/* Eyebrow — minimal, elegant */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-8 bg-orange-500/60" />
            <span className="text-orange-400/80 text-[10.5px] tracking-[0.35em] uppercase font-medium">
              Sacred Gujarat · Divine Pilgrimage
            </span>
          </div>

          {/* Main heading — large, emotional, editorial */}
          <h1 className="text-white font-bold leading-[1.08] tracking-tight mb-6">
            <span
              className="block text-[3rem] sm:text-[3.75rem] md:text-[4rem] lg:text-[4.5rem] "
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}
            >
              Where Devotion
            </span>
            <span
              className="block text-[3rem] sm:text-[3.75rem] md:text-[4rem] lg:text-[4.5rem] text-orange-200"
              style={{ textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}
            >
              Meets the Sea
            </span>
          </h1>

          {/* Description — soft, spacious */}
          <p className="text-white/55 text-base sm:text-lg leading-[1.8] mb-10 max-w-lg font-light">
            Journey to Dwarka — Lord Krishna's eternal city — and Somnath, where 
            the first Jyotirlinga stands at the edge of the Arabian Sea. A sacred 
            pilgrimage, curated with care.
          </p>

          {/* Location indicator */}
          <div className="flex items-center gap-2 mb-10">
            <MapPin size={13} className="text-orange-500/70" strokeWidth={1.8} />
            <span className="text-white/40 text-sm tracking-wide">Dwarka · Nageshwar · Somnath · Bet Dwarka</span>
          </div>

          {/* CTA Buttons — two only, clean */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary */}
            <button className="group inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-stone-900 font-semibold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_32px_rgba(249,115,22,0.25)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 cursor-pointer">
              Book Divine Journey
              <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Secondary */}
            <button className="group inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 bg-transparent hover:bg-white/5 text-white/75 hover:text-white font-medium text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 cursor-pointer backdrop-blur-sm">
              Explore Packages
              <MoveRight size={15} strokeWidth={1.8} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM META ROW
      ══════════════════════════════════════ */}
      <div className="relative z-20 flex items-center justify-between px-6 pb-8 sm:px-10 md:px-14 lg:px-20">

        {/* Scene credit */}
        <div
          key={scene}
          className="flex items-center gap-2"
          style={{ animation: "fadeUp 0.8s ease forwards" }}
        >
          <div className="h-px w-5 bg-white/25" />
          <span className="text-white/30 text-[10.5px] tracking-widest uppercase">{scenes[scene].credit}</span>
        </div>

        {/* Scene dots */}
        <div className="flex items-center gap-2">
          {scenes.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setScene(i); setFading(false); }, 900); }}
              className={`rounded-full border-none outline-none cursor-pointer transition-all duration-500 ${
                i === scene ? "w-8 h-[2px] bg-orange-400" : "w-[6px] h-[6px] bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Trust signal — one only */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={10} fill="#fb923c" className="text-orange-400" />
            ))}
          </div>
          <span className="text-white/35 text-[10.5px] tracking-wide">4.9 · 12,400+ pilgrims</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT-SIDE FLOATING TEMPLE CARD
          — one elegant preview, not a grid
      ══════════════════════════════════════ */}
      <div
        className="hidden lg:block absolute right-24 xl:right-42 top-[66%] -translate-y-1/2 z-20 w-[260px] xl:w-[290px]"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(-50%)" : "translateY(-42%)",
          transition: "opacity 1.4s ease 0.4s, transform 1.4s ease 0.4s",
        }}
      >
        {/* Card */}
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {/* Image portion */}
          <div className="relative h-52 xl:h-60 w-full">
            <Image
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=85"
              alt="Somnath Temple at dawn"
              fill
              className="object-cover"
              sizes="290px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/10 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="text-[9px] text-orange-400/80 tracking-[0.2em] uppercase font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-orange-500/20">
                Featured
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="bg-stone-950/90 backdrop-blur-md px-5 py-4">
            <p className="text-orange-400/60 text-[9.5px] tracking-[0.25em] uppercase mb-1">Complete Pilgrimage</p>
            <h3 className="text-white font-semibold text-base leading-snug mb-1">Dwarka &amp; Somnath</h3>
            <p className="text-white/40 text-xs leading-relaxed mb-4">6 nights · 7 days · Gujarat</p>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/30 text-[9.5px] mb-0.5">Starting from</p>
                <p className="text-orange-200 font-bold text-lg tracking-tight">₹13,699</p>
              </div>
              <button className="flex items-center gap-1.5 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/20 hover:border-orange-500/40 text-orange-400 text-[11px] font-medium px-3.5 py-2 rounded-full transition-all duration-300 cursor-pointer">
                View
                <ArrowRight size={11} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Floating stat pill below card */}
        <div className="mt-3 flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <span className="text-white/45 text-[10.5px] tracking-wide">50+ packages available</span>
        </div>
      </div>

      {/* Keyframe for fadeUp */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>

    </section>
  );
}