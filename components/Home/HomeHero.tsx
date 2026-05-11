"use client";

import { useState, useEffect } from "react";
import {
  Star,
  ArrowRight,
  MessageCircle,
  MapPin,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const BG_IMAGE = "/home/HomeHero.webp";
const CARD_SOMNATH = "/images/home/SomnathLongImage.webp";
const CARD_DWARKA = "images/home/DwarikaLongImage.webp";

const STATS = [
  { value: "4,800+", label: "Happy Pilgrims" },
  { value: "12 Yrs", label: "Experience" },
  { value: "4.9★", label: "Rating" },
] as const;

export default function HomeHero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* Fonts */
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-dm       { font-family: 'DM Sans', sans-serif; }

        /* Bg pan */
        .bg-pan-init { transform: scale(1); transition: transform 24s ease-out; }
        .bg-pan-active { transform: scale(1.12); }

        /* Entrance animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
        .d0 { animation-delay: 0.05s; }
        .d1 { animation-delay: 0.15s; }
        .d2 { animation-delay: 0.28s; }
        .d3 { animation-delay: 0.40s; }
        .d4 { animation-delay: 0.52s; }
        .d5 { animation-delay: 0.64s; }

        /* Float animations for cards/chips */
        @keyframes floatA {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(-12px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-8px); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0);   }
          50%       { transform: translateY(-7px); }
        }
        .float-a        { animation: floatA 7s ease-in-out infinite; }
        .float-b        { animation: floatB 9s ease-in-out infinite; }
        .float-c        { animation: floatC 6s ease-in-out infinite; }
        .float-a-delay  { animation: floatA 8s ease-in-out infinite; animation-delay: -3s; }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .bg-pan-init, .anim, .float-a, .float-b, .float-c, .float-a-delay {
            transition: none !important;
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/*
        LAYOUT STRATEGY to kill the gap:
        - section is flex-col
        - hero-inner holds all the text, grows with flex-1, but has NO bottom padding
        - stats sit at the very bottom of hero-inner
        - wave SVG is the very next sibling — zero gap
      */}
      <section className="font-dm relative flex flex-col overflow-hidden" >

        {/* ── BACKGROUND ── */}
        <div className="absolute inset-0 z-0">
          <img
            src={BG_IMAGE}
            alt="Somnath temple at sunrise"
            className={`h-full w-full object-cover object-[center_30%] bg-pan-init${loaded ? " bg-pan-active" : ""}`}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          {/* Overlay 1 — deep crimson → dark blue */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(90,10,10,0.88)_0%,rgba(140,40,10,0.72)_35%,rgba(20,20,40,0.55)_70%,rgba(8,20,50,0.80)_100%)]" />
          {/* Overlay 2 — top/bottom vignette */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,transparent_30%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
          {/* Saffron radial streak — top-left */}
          <div className="pointer-events-none absolute -left-[5%] -top-[10%] h-[75%] w-[55%] bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,130,30,0.18)_0%,transparent_65%)]" />
          {/* Blue radial accent — bottom-right */}
          <div className="pointer-events-none absolute -right-[5%] bottom-0 h-[60%] w-[45%] bg-[radial-gradient(ellipse_at_70%_80%,rgba(30,60,180,0.15)_0%,transparent_65%)]" />
        </div>

        {/* Om watermark */}
        <div
          className="font-playfair pointer-events-none absolute right-[2%] top-1/2 z-[1] hidden -translate-y-1/2 select-none text-[180px] leading-none text-white/[0.04] md:block lg:text-[260px]"
          aria-hidden="true"
        >
          ॐ
        </div>

        {/* ── HERO INNER — flex-1 so it fills all space above the wave ── */}
        <div className="relative z-[2] flex flex-1 flex-col justify-center px-4 pt-24 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:pt-32">

          {/* LEFT COLUMN */}
          <div className="flex min-w-0 flex-1 flex-col items-center pb-4 text-center lg:items-start lg:pb-12 lg:text-left">

            {/* Badge */}
            <div className="anim d0 mb-5 w-fit">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,160,60,0.5)] bg-[rgba(255,120,20,0.15)] px-4 py-[7px] text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgba(255,200,120,0.95)] backdrop-blur-sm">
                <Sparkles size={11} />
                Sacred Gujarat Spiritual Journey
              </span>
            </div>

            {/* Eyebrow */}
            <p className="anim d1 mb-3 text-[11px] font-normal uppercase tracking-[0.14em] text-[rgba(255,200,130,0.7)] sm:text-xs">
              Jyotirlinga Pilgrimage · Gujarat
            </p>

            {/* Headline */}
            <h1 className="font-playfair anim d2 mb-5 text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px]">
              Somnath &amp;&nbsp;
              <span className="italic text-[#FF8C38]">Dwarka</span>
              <span className="mt-2 block text-base font-bold not-italic tracking-normal text-white/75 sm:text-lg md:text-xl lg:text-2xl">
                Divine Tour Package
              </span>
            </h1>

            {/* Description */}
            <p className="anim d3 mb-7 max-w-[620px] text-sm font-light leading-7 text-white/[0.68] sm:text-[15px] md:text-base lg:mb-10 lg:leading-8">
              Seek the divine at the legendary{" "}
              <strong className="font-medium text-[rgba(255,200,120,0.9)]">Jyotirlinga of Somnath</strong>, feel the ocean breeze during
              evening aarti, then experience the sacred serenity of{" "}
              <strong className="font-medium text-[rgba(255,200,120,0.9)]">Dwarkadhish Temple</strong> — a family-friendly pilgrimage
              guided with care, every step of the way.
            </p>

            {/* CTAs */}
            <div className="anim d4 mb-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button className="inline-flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-[linear-gradient(135deg,#FF6B1A_0%,#FF8C38_50%,#FFAB55_100%)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(255,100,20,0.4),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(255,100,20,0.5)] active:translate-y-0 sm:w-auto">
                <Star size={15} />
                Explore Packages
                <ArrowRight size={15} />
              </button>
              <button className="inline-flex w-full items-center justify-center gap-[9px] rounded-[14px] border border-white/30 bg-white/[0.08] px-6 py-3.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:border-white/50 hover:bg-white/[0.14] sm:w-auto">
                <MessageCircle size={15} />
                WhatsApp Us
              </button>
            </div>

            {/* Stats — last item in left col, NO bottom margin/padding after this */}
            <div className="anim d5 flex w-full flex-wrap items-center justify-center gap-6 border-t border-white/[0.12] pt-6 lg:justify-start lg:gap-10">
              {STATS.map(({ value, label }, i) => (
                <>
                  <div key={label} className="shrink-0">
                    <div className="font-playfair text-2xl font-bold leading-none text-[#FF9A45] sm:text-3xl">
                      {value}
                    </div>
                    <div className="mt-1 text-[10px] font-normal uppercase tracking-[0.1em] text-white/[0.38]">
                      {label}
                    </div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div key={`div-${i}`} className="h-9 w-px shrink-0 bg-white/[0.12]" />
                  )}
                </>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — floating cards, desktop only */}
          <div className="relative hidden h-[520px] w-[clamp(300px,30vw,420px)] shrink-0 items-center justify-center lg:flex">

            {/* Somnath card */}
            <div className="float-a absolute left-0 top-5 h-[360px] w-[220px] overflow-hidden rounded-3xl border border-white/[0.14] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <img
                src={CARD_SOMNATH}
                alt="Somnath Temple"
                className="block h-full w-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  (el.parentElement as HTMLElement).style.background = "linear-gradient(160deg,#6b1010,#2a0a0a)";
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-7">
                <p className="text-sm font-semibold text-white">Somnath Temple</p>
                <div className="mt-[3px] flex items-center gap-[3px] text-[10.5px] text-white/50">
                  <MapPin size={9} /> Veraval, Gujarat
                </div>
              </div>
            </div>

            {/* Dwarka card */}
            <div className="float-b absolute bottom-5 right-0 h-[300px] w-[200px] overflow-hidden rounded-3xl border border-white/[0.14] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <img
                src={CARD_DWARKA}
                alt="Dwarkadhish Temple"
                className="block h-full w-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  (el.parentElement as HTMLElement).style.background = "linear-gradient(160deg,#0c3060,#050f25)";
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-7">
                <p className="text-sm font-semibold text-white">Dwarkadhish</p>
                <div className="mt-[3px] flex items-center gap-[3px] text-[10.5px] text-white/50">
                  <MapPin size={9} /> Dwarka, Gujarat
                </div>
              </div>
            </div>

            {/* Jyotirlinga chip */}
            <div className="float-c absolute right-[10px] top-0 flex items-center gap-[10px] rounded-2xl border border-white/20 bg-white/10 px-[14px] py-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-lg">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#FF6B1A,#FF9A45)] shadow-[0_4px_12px_rgba(255,100,20,0.4)]">
                <Star size={16} className="text-white" />
              </div>
              <div>
                <div className="text-[12.5px] font-semibold text-white">Jyotirlinga Darshan</div>
                <div className="mt-[1px] text-[10px] text-white/50">1 of 12 sacred Shiva shrines</div>
              </div>
            </div>

            {/* Stars chip */}
            <div className="float-a-delay absolute bottom-[0] left-[10px] flex items-center gap-[6px] rounded-xl border border-white/20 bg-white/10 px-3 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-lg">
              <div className="flex gap-[2px]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-[#FFA928] text-[#FFA928]" />
                ))}
              </div>
              <span className="text-[11px] font-medium text-white/85">4.9 · 2,400+ reviews</span>
            </div>
          </div>
        </div>

        {/* ── WAVE — direct sibling of hero-inner, zero gap ── */}
        <div className="relative z-10 -mb-px w-full" aria-hidden="true">
          <svg
            viewBox="0 0 1440 110"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block h-[70px] w-full sm:h-[90px] lg:h-[110px]"
          >
            <path d="M0,20 C180,80 360,0 540,40 C720,80 900,10 1080,50 C1200,75 1340,30 1440,45 L1440,110 L0,110 Z" fill="rgba(234,88,12,0.13)" />
            <path d="M0,45 C120,10 300,70 480,48 C660,26 840,72 1020,52 C1160,36 1320,65 1440,55 L1440,110 L0,110 Z" fill="rgba(251,146,60,0.10)" />
            <path d="M0,65 C200,30 380,88 560,68 C740,48 920,85 1100,70 C1240,58 1360,75 1440,68 L1440,110 L0,110 Z" fill="white" />
          </svg>
        </div>

        {/* Scroll hint — floats above wave */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[108px] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 opacity-30 lg:flex"
        >
          <span className="text-[8px] uppercase tracking-[0.2em] text-white">Scroll</span>
          <ChevronDown size={12} className="text-white" />
        </div>
      </section>
    </>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   Shield,
//   Car,
//   Hotel,
//   UserCheck,
//   Star,
//   ArrowRight,
//   MessageCircle,
//   MapPin,
//   Sparkles,
//   Phone,
// } from "lucide-react";

// const FEATURES = [
//   { Icon: Shield,    label: "VIP Darshan",     desc: "Priority queue & guided darshan" },
//   { Icon: Car,       label: "Private Cab",      desc: "AC vehicle, door-to-door pickup" },
//   { Icon: Hotel,     label: "Premium Hotels",   desc: "Handpicked, clean & comfortable" },
//   { Icon: UserCheck, label: "Expert Guide",     desc: "Local guides for every temple" },
// ] as const;

// const STATS = [
//   { value: "4,800+", label: "Happy Pilgrims" },
//   { value: "12 Yrs", label: "Experience"     },
//   { value: "4.9★",   label: "Average Rating" },
// ] as const;

// export default function HomeHero() {
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setLoaded(true), 60);
//     return () => clearTimeout(t);
//   }, []);

//   const fadeUp = (delay: string) =>
//     `transition-all duration-700 ease-out ${delay} ${
//       loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
//     }`;

//   return (
//     <section className="relative overflow-hidden bg-orange-50">

//       {/* ── BACKGROUND BLOBS ─────────────────────────────────────────── */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full bg-orange-100 opacity-60 blur-3xl" />
//         <div className="absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full bg-amber-100 opacity-50 blur-3xl" />
//         {/* subtle dot pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.035]"
//           style={{
//             backgroundImage: "radial-gradient(circle, #c2410c 1px, transparent 1px)",
//             backgroundSize: "28px 28px",
//           }}
//         />
//       </div>

//       {/* ── MAIN GRID ────────────────────────────────────────────────── */}
//       <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:pb-24 lg:pt-16 xl:px-20">

//         {/* ════════════════════════════════════════════════════════════
//             LEFT — Text content
//         ═════════════════════════════════════════════════════════════*/}
//         <div className="flex flex-col">

//           {/* Badge */}
//           <div className={fadeUp("delay-[40ms]")}>
//             <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-orange-700 shadow-sm">
//               <Sparkles size={12} className="text-orange-500" />
//               Spiritual Journey of Dwarka &amp; Somnath
//             </span>
//           </div>

//           {/* Headline */}
//           <div className={`mt-6 ${fadeUp("delay-[120ms]")}`}>
//             <h1 className="text-[clamp(36px,6vw,72px)] font-bold leading-[1.06] tracking-tight text-gray-900">
//               Experience the
//               <span className="block text-orange-500">Divine Beauty</span>
//               <span className="block text-gray-900">of Gujarat</span>
//             </h1>
//           </div>

//           {/* Description */}
//           <div className={`mt-5 ${fadeUp("delay-[200ms]")}`}>
//             <p className="max-w-xl text-base leading-relaxed text-gray-500 sm:text-lg">
//               Walk through the sacred land of{" "}
//               <span className="font-semibold text-orange-600">Lord Krishna</span> and feel the
//               peaceful energy of{" "}
//               <span className="font-semibold text-orange-600">Somnath Jyotirlinga</span>.
//               Carefully designed pilgrimage tours with comfortable stays,
//               darshan assistance, local guides, and soulful experiences.
//             </p>
//           </div>

//           {/* Feature cards grid */}
//           <div className={`mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 ${fadeUp("delay-[280ms]")}`}>
//             {FEATURES.map(({ Icon, label, desc }) => (
//               <div
//                 key={label}
//                 className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
//               >
//                 <div className="flex items-center gap-2 text-orange-500">
//                   <Icon size={17} strokeWidth={2} />
//                   <span className="text-sm font-semibold text-gray-800">{label}</span>
//                 </div>
//                 <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{desc}</p>
//               </div>
//             ))}
//           </div>

//           {/* CTAs */}
//           <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${fadeUp("delay-[360ms]")}`}>
//             <button className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-300/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-400/40 active:translate-y-0 sm:w-auto">
//               Explore Packages
//               <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
//             </button>
//             <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-orange-200 bg-white px-7 py-3.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-50 active:translate-y-0 sm:w-auto">
//               <Phone size={15} className="text-orange-500" />
//               Talk to Expert
//             </button>
//           </div>

//           {/* Stats */}
//           <div className={`mt-10 flex flex-wrap items-center gap-8 border-t border-orange-100 pt-8 ${fadeUp("delay-[440ms]")}`}>
//             {STATS.map(({ value, label }, i) => (
//               <div key={label} className="flex items-center gap-8">
//                 <div>
//                   <p className="text-[clamp(22px,3vw,30px)] font-bold text-gray-900">{value}</p>
//                   <p className="mt-0.5 text-xs text-gray-400">{label}</p>
//                 </div>
//                 {i < STATS.length - 1 && <div className="h-8 w-px bg-orange-100" />}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ════════════════════════════════════════════════════════════
//             RIGHT — Image composition
//         ═════════════════════════════════════════════════════════════*/}
//         <div
//           className={`relative transition-all duration-1000 delay-200 ease-out ${
//             loaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//           }`}
//         >

//           {/* ── MAIN IMAGE ── */}
//           <div className="relative overflow-hidden rounded-[28px] border border-orange-100 shadow-2xl">
//             <Image
//               src="/images/home/HomeHero.webp"
//               alt="Somnath Temple"
//               width={800}
//               height={960}
//               priority
//               quality={90}
//               className="h-[520px] w-full object-cover object-center lg:h-[600px]"
//             />
//             {/* Subtle bottom gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

//             {/* Bottom floating card */}
//             <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
//               <div className="flex items-center justify-between gap-3">
//                 <div>
//                   <h3 className="text-base font-semibold text-gray-900 sm:text-lg">Somnath Temple</h3>
//                   <div className="mt-1.5 flex items-center gap-1.5 text-gray-400">
//                     <MapPin size={13} className="text-orange-500" />
//                     <span className="text-xs sm:text-sm">Veraval, Gujarat</span>
//                   </div>
//                 </div>
//                 <span className="shrink-0 rounded-xl bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700">
//                   Sacred Tour
//                 </span>
//               </div>

//               {/* Mini stars */}
//               <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={12} className="fill-amber-400 text-amber-400" strokeWidth={0} />
//                   ))}
//                 </div>
//                 <span className="text-xs text-gray-400">4.9 · 2,400+ reviews</span>
//               </div>
//             </div>
//           </div>

//           {/* ── SMALL FLOATING IMAGE — Dwarka ── */}
//           <div
//             className="absolute -left-5 bottom-28 hidden overflow-hidden rounded-[22px] border-4 border-white shadow-2xl md:block lg:-left-10"
//             style={{ animation: "floatA 6s ease-in-out infinite" }}
//           >
//             <div className="relative h-[200px] w-[170px] lg:h-[230px] lg:w-[195px]">
//               <Image
//                 src="/images/home/DwarikaLongImage.webp"
//                 alt="Dwarkadhish Temple"
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <div className="absolute inset-x-0 bottom-0 p-3">
//                 <p className="text-xs font-semibold text-white">Dwarkadhish</p>
//                 <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/60">
//                   <MapPin size={8} /> Dwarka, Gujarat
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ── PRICE BADGE — top right ── */}
//           <div
//             className="absolute -top-4 right-4 rounded-2xl border border-orange-100 bg-white px-4 py-3.5 shadow-xl sm:right-6"
//             style={{ animation: "floatB 7s ease-in-out infinite" }}
//           >
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100">
//                 <Sparkles size={18} className="text-orange-500" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-gray-400">Starting From</p>
//                 <p className="text-xl font-bold text-gray-900">₹4,999</p>
//               </div>
//             </div>
//           </div>

//           {/* ── SOMNATH chip — left, mid ── */}
//           <div
//             className="absolute -right-3 top-1/3 hidden -translate-y-1/2 overflow-hidden rounded-[18px] border-4 border-white shadow-2xl xl:block"
//             style={{ animation: "floatA 8s ease-in-out infinite", animationDelay: "-2s" }}
//           >
//             <div className="relative h-[160px] w-[140px]">
//               <Image
//                 src="/images/home/SomnathLongImage.webp"
//                 alt="Somnath Temple"
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <div className="absolute inset-x-0 bottom-0 p-2.5">
//                 <p className="text-[11px] font-semibold text-white">Somnath</p>
//                 <p className="mt-0.5 flex items-center gap-0.5 text-[9px] text-white/60">
//                   <MapPin size={7} /> Veraval
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* WhatsApp floating pill */}
//           <div
//             className="absolute -bottom-4 right-6 flex items-center gap-2.5 rounded-full border border-orange-100 bg-white px-4 py-2.5 shadow-lg sm:right-10"
//             style={{ animation: "floatB 9s ease-in-out infinite", animationDelay: "-4s" }}
//           >
//             <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500">
//               <MessageCircle size={13} className="text-white" />
//             </div>
//             <span className="text-xs font-medium text-gray-700">Chat on WhatsApp</span>
//           </div>
//         </div>
//       </div>

//       {/* ── KEYFRAMES ────────────────────────────────────────────────── */}
//       <style>{`
//         @keyframes floatA {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-10px); }
//         }
//         @keyframes floatB {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-7px); }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           * { animation: none !important; }
//         }
//       `}</style>
//     </section>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import {
//   Shield, Car, Hotel, UserCheck,
//   Star, ArrowRight, MessageCircle,
//   MapPin, Sparkles, Phone,
// } from "lucide-react";

// const FEATURES = [
//   { Icon: Shield,    label: "VIP Darshan",   desc: "Priority queue & guided darshan" },
//   { Icon: Car,       label: "Private Cab",   desc: "AC vehicle, door-to-door pickup" },
//   { Icon: Hotel,     label: "Premium Hotels",desc: "Handpicked, clean & comfortable" },
//   { Icon: UserCheck, label: "Expert Guide",  desc: "Local guides for every temple"   },
// ] as const;

// const STATS = [
//   { value: "4,800+", label: "Happy Pilgrims" },
//   { value: "12 Yrs", label: "Experience"     },
//   { value: "4.9★",   label: "Average Rating" },
// ] as const;

// export default function HomeHero() {
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setLoaded(true), 60);
//     return () => clearTimeout(t);
//   }, []);

//   const fadeUp = (delay: string) =>
//     `transition-all duration-700 ease-out ${delay} ${
//       loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//     }`;

//   return (
//     <section className="relative overflow-hidden bg-orange-50 pt-22">

//       {/* ── SVG BACKGROUND DECORATION ──────────────────────────────── */}
//       <div className="pointer-events-none absolute inset-0" aria-hidden="true">

//         {/* Large mandala / sunburst — top right */}
//         <svg
//           viewBox="0 0 600 600"
//           className="absolute -right-32 -top-32 w-[480px] opacity-[0.07] lg:w-[560px]"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           {[...Array(12)].map((_, i) => (
//             <ellipse
//               key={i}
//               cx="300" cy="300"
//               rx="260" ry="60"
//               fill="none"
//               stroke="#ea580c"
//               strokeWidth="1.2"
//               transform={`rotate(${i * 15} 300 300)`}
//             />
//           ))}
//           <circle cx="300" cy="300" r="40" fill="#ea580c" opacity="0.15" />
//           <circle cx="300" cy="300" r="80" fill="none" stroke="#ea580c" strokeWidth="1" />
//           <circle cx="300" cy="300" r="160" fill="none" stroke="#ea580c" strokeWidth="0.8" />
//           <circle cx="300" cy="300" r="240" fill="none" stroke="#ea580c" strokeWidth="0.6" />
//         </svg>

//         {/* Soft orange blob — left */}
//         <svg
//           viewBox="0 0 400 400"
//           className="absolute -left-20 top-1/4 w-[300px] opacity-30 lg:w-[380px]"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
//               <stop offset="0%" stopColor="#fdba74" />
//               <stop offset="100%" stopColor="#fed7aa" stopOpacity="0" />
//             </radialGradient>
//           </defs>
//           <ellipse cx="200" cy="200" rx="200" ry="180" fill="url(#blobGrad)" />
//         </svg>

//         {/* Dot grid — subtle */}
//         <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
//               <circle cx="2" cy="2" r="1.5" fill="#c2410c" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dots)" />
//         </svg>
//       </div>

//       {/* ── MAIN GRID ─────────────────────────────────────────────── */}
//       <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-6 pt-8 sm:px-10 lg:grid-cols-2 lg:gap-12 lg:px-14 lg:pb-10 lg:pt-12 xl:px-20">

//         {/* ══ LEFT ════════════════════════════════════════════════════ */}
//         <div className="flex flex-col">

//           {/* Badge */}
//           <div className={fadeUp("delay-[40ms]")}>
//             <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-orange-700 shadow-sm">
//               <Sparkles size={11} className="text-orange-500" />
//               Spiritual Journey of Dwarka &amp; Somnath
//             </span>
//           </div>

//           {/* Headline */}
//           <div className={`mt-4 ${fadeUp("delay-[110ms]")}`}>
//             <h1 className="text-[clamp(32px,5.5vw,64px)] font-bold leading-[1.07] tracking-tight text-gray-900">
//               Experience the
//               <span className="block text-orange-500">Divine Beauty</span>
//               <span className="block">of Gujarat</span>
//             </h1>
//           </div>

//           {/* Description */}
//           <div className={`mt-3 ${fadeUp("delay-[190ms]")}`}>
//             <p className="max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base">
//               Walk through the sacred land of{" "}
//               <span className="font-semibold text-orange-600">Lord Krishna</span> and feel the
//               peaceful energy of{" "}
//               <span className="font-semibold text-orange-600">Somnath Jyotirlinga</span>.
//               Pilgrimage tours with comfortable stays, darshan assistance &amp; local guides.
//             </p>
//           </div>

//           {/* Feature cards — 2×2 compact */}
//           <div className={`mt-5 grid grid-cols-2 gap-2.5 ${fadeUp("delay-[260ms]")}`}>
//             {FEATURES.map(({ Icon, label, desc }) => (
//               <div
//                 key={label}
//                 className="rounded-xl border border-orange-100 bg-white p-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100">
//                     <Icon size={14} className="text-orange-500" strokeWidth={2} />
//                   </div>
//                   <span className="text-[13px] font-semibold text-gray-800">{label}</span>
//                 </div>
//                 <p className="mt-1.5 text-[11px] leading-relaxed text-gray-400">{desc}</p>
//               </div>
//             ))}
//           </div>

//           {/* CTAs */}
//           <div className={`mt-5 flex flex-col gap-2.5 sm:flex-row ${fadeUp("delay-[330ms]")}`}>
//             <button className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300/50 active:translate-y-0 sm:w-auto">
//               Explore Packages
//               <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
//             </button>
//             <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-50 active:translate-y-0 sm:w-auto">
//               <Phone size={14} className="text-orange-500" />
//               Talk to Expert
//             </button>
//           </div>

//           {/* Stats */}
//           <div className={`mt-5 flex flex-wrap items-center gap-6 border-t border-orange-100 pt-5 ${fadeUp("delay-[400ms]")}`}>
//             {STATS.map(({ value, label }, i) => (
//               <div key={label} className="flex items-center gap-6">
//                 <div>
//                   <p className="text-[clamp(18px,2.5vw,26px)] font-bold text-gray-900">{value}</p>
//                   <p className="mt-0.5 text-[11px] text-gray-400">{label}</p>
//                 </div>
//                 {i < STATS.length - 1 && <div className="h-7 w-px shrink-0 bg-orange-100" />}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══ RIGHT — Image composition ════════════════════════════════ */}
//         <div
//           className={`relative transition-all duration-1000 delay-200 ease-out ${
//             loaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
//           }`}
//         >
//           {/* Main image */}
//           <div className="relative overflow-hidden rounded-[24px] border border-orange-100 shadow-2xl">
//             <Image
//               src="/images/home/HomeHero.webp"
//               alt="Somnath Temple"
//               width={800}
//               height={900}
//               priority
//               quality={90}
//               className="h-[400px] w-full object-cover object-center sm:h-[460px] lg:h-[500px]"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/8 to-transparent" />

//             {/* Bottom info card */}
//             <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/92 p-3.5 shadow-xl backdrop-blur-md sm:inset-x-4 sm:bottom-4">
//               <div className="flex items-center justify-between gap-3">
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-900 sm:text-base">Somnath Temple</h3>
//                   <div className="mt-1 flex items-center gap-1 text-gray-400">
//                     <MapPin size={11} className="text-orange-500" />
//                     <span className="text-[11px] sm:text-xs">Veraval, Gujarat</span>
//                   </div>
//                 </div>
//                 <span className="shrink-0 rounded-lg bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-orange-700">
//                   Sacred Tour
//                 </span>
//               </div>
//               <div className="mt-2.5 flex items-center gap-2 border-t border-gray-100 pt-2.5">
//                 <div className="flex gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} size={10} className="fill-amber-400 text-amber-400" strokeWidth={0} />
//                   ))}
//                 </div>
//                 <span className="text-[10px] text-gray-400">4.9 · 2,400+ reviews</span>
//               </div>
//             </div>
//           </div>

//           {/* Floating Dwarka card — left */}
//           <div
//             className="absolute -left-4 bottom-24 hidden overflow-hidden rounded-[18px] border-4 border-white shadow-2xl md:block lg:-left-8"
//             style={{ animation: "floatA 6s ease-in-out infinite" }}
//           >
//             <div className="relative h-[180px] w-[155px] lg:h-[210px] lg:w-[175px]">
//               <Image
//                 src="/images/home/DwarikaLongImage.webp"
//                 alt="Dwarkadhish Temple"
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
//               <div className="absolute inset-x-0 bottom-0 p-2.5">
//                 <p className="text-[11px] font-semibold text-white">Dwarkadhish</p>
//                 <p className="mt-0.5 flex items-center gap-0.5 text-[9px] text-white/60">
//                   <MapPin size={7} /> Dwarka, Gujarat
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Price badge — top right */}
//           <div
//             className="absolute -top-3 right-4 rounded-xl border border-orange-100 bg-white px-3.5 py-3 shadow-xl sm:right-5"
//             style={{ animation: "floatB 7s ease-in-out infinite" }}
//           >
//             <div className="flex items-center gap-2.5">
//               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100">
//                 <Sparkles size={16} className="text-orange-500" />
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400">Starting From</p>
//                 <p className="text-lg font-bold text-gray-900">₹4,999</p>
//               </div>
//             </div>
//           </div>

//           {/* Somnath mini card — right mid (xl only) */}
//           <div
//             className="absolute -right-3 top-1/3 hidden -translate-y-1/2 overflow-hidden rounded-[16px] border-4 border-white shadow-2xl xl:block"
//             style={{ animation: "floatA 8s ease-in-out infinite", animationDelay: "-2s" }}
//           >
//             <div className="relative h-[148px] w-[130px]">
//               <Image
//                 src="/images/home/SomnathLongImage.webp"
//                 alt="Somnath Temple"
//                 fill
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
//               <div className="absolute inset-x-0 bottom-0 p-2">
//                 <p className="text-[10px] font-semibold text-white">Somnath</p>
//                 <p className="flex items-center gap-0.5 text-[9px] text-white/55">
//                   <MapPin size={7} /> Veraval
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* WhatsApp pill — bottom right */}
//           <div
//             className="absolute -bottom-3 right-5 flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3.5 py-2 shadow-lg sm:right-8"
//             style={{ animation: "floatB 9s ease-in-out infinite", animationDelay: "-4s" }}
//           >
//             <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
//               <MessageCircle size={12} className="text-white" />
//             </div>
//             <span className="text-[11px] font-medium text-gray-700">Chat on WhatsApp</span>
//           </div>
//         </div>
//       </div>

//       {/* ── SVG WAVE BOTTOM ────────────────────────────────────────── */}
//       <div className="relative -mb-px" aria-hidden="true">
//         <svg
//           viewBox="0 0 1440 64"
//           xmlns="http://www.w3.org/2000/svg"
//           preserveAspectRatio="none"
//           className="block h-12 w-full sm:h-16"
//         >
//           <defs>
//             <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%"   stopColor="#ea580c" stopOpacity="0.18" />
//               <stop offset="50%"  stopColor="#f97316" stopOpacity="0.10" />
//               <stop offset="100%" stopColor="#ea580c" stopOpacity="0.18" />
//             </linearGradient>
//           </defs>
//           {/* Back wave — lighter */}
//           <path
//             d="M0,32 C240,60 480,8 720,32 C960,56 1200,12 1440,32 L1440,64 L0,64 Z"
//             fill="url(#waveGrad)"
//           />
//           {/* Front wave — white (page bg bleed) */}
//           <path
//             d="M0,44 C200,20 400,60 600,44 C800,28 1000,56 1200,44 C1300,38 1380,46 1440,44 L1440,64 L0,64 Z"
//             fill="white"
//           />
//         </svg>
//       </div>

//       {/* ── KEYFRAMES ──────────────────────────────────────────────── */}
//       <style>{`
//         @keyframes floatA {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-10px); }
//         }
//         @keyframes floatB {
//           0%, 100% { transform: translateY(0px); }
//           50%       { transform: translateY(-7px); }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           * { animation: none !important; }
//         }
//       `}</style>
//     </section>
//   );
// }