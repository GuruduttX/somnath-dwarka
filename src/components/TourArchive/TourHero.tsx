"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, MessageCircle, MapPin, ChevronRight, Sparkles } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

const CARD_SOMNATH = "/images/home/SomnathLongImage.webp";
const CARD_DWARKA  = "/images/home/DwarikaLongImage.webp";
const BG_IMAGE     = "/images/home/HomeHero.webp";

const STATS = [
  { value: "4,800+", label: "Happy Pilgrims" },
  { value: "12 Yrs", label: "Experience"     },
  { value: "4.9★",   label: "Rating"         },
];

const TAGS = ["Temple Darshan", "Handpicked Hotels", "AC Transport", "VIP Entry"];

export default function TourPackagesHero() {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <CommonEnquiryForm 
        open={open} 
        onClose={() => setOpen(false)} 
        defaultService="Tour Package" 
      />
      <style>{`
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .a0 { animation: fadeUp 0.6s ease-out 0.05s both; }
        .a1 { animation: fadeUp 0.6s ease-out 0.15s both; }
        .a2 { animation: fadeUp 0.6s ease-out 0.25s both; }
        .a3 { animation: fadeUp 0.6s ease-out 0.38s both; }
        .a4 { animation: fadeUp 0.6s ease-out 0.50s both; }
        @media (prefers-reduced-motion: reduce) {
          .a0,.a1,.a2,.a3,.a4 { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      <section
        className="relative flex flex-col overflow-hidden py-20"
        
      >
          {/* ── BACKGROUND ── */}
        <div className="absolute inset-0 z-0">
          
          {/* Overlay 1 — deep crimson → dark blue */}
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(90,10,10,0.88)_0%,rgba(140,40,10,0.72)_35%,rgba(20,20,40,0.55)_70%,rgba(8,20,50,0.80)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(120,40,10,0.88)_0%,rgba(160,60,20,0.72)_35%,rgba(40,20,0,0.55)_70%,rgba(20,10,0,0.80)_100%)]" />
          {/* Overlay 2 — top/bottom vignette */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,transparent_30%,transparent_55%,rgba(0,0,0,0.65)_100%)]" />
          {/* Saffron radial streak — top-left */}
          <div className="pointer-events-none absolute -left-[5%] -top-[10%] h-[75%] w-[55%] bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,130,30,0.18)_0%,transparent_65%)]" />
          {/* Blue radial accent — bottom-right */}
          <div className="pointer-events-none absolute -right-[5%] bottom-0 h-[60%] w-[45%] bg-[radial-gradient(ellipse_at_70%_80%,rgba(30,60,180,0.15)_0%,transparent_65%)]" />
        </div>

        {/* ── Dot grid bg ── */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #FF8C38 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* ── Saffron radial glow ── */}
        <div className="pointer-events-none absolute -left-[5%] -top-[10%] z-[1] h-[80%] w-[50%] bg-[radial-gradient(ellipse,rgba(255,120,20,0.13)_0%,transparent_70%)]" />

        {/* ── Om watermark ── */}
        <div
          className="font-playfair pointer-events-none absolute right-[3%] top-1/2 z-[1] hidden -translate-y-1/2 select-none text-[180px] leading-none text-white/[0.03] md:block lg:text-[220px]"
          aria-hidden="true"
        >
          ॐ
        </div>

        {/* ── BG image (very subtle) ── */}
        

        {/* ── Breadcrumb ── */}
        <nav
          className="a0 relative z-10 flex flex-wrap items-center gap-1.5 px-5 pt-5 text-[11px] font-medium tracking-wide text-white/35 sm:px-8 lg:px-14"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#FF9A45] transition-colors">Home</Link>
          <ChevronRight size={11} className="text-white/20" />
          <span className="font-semibold text-[#FF9A45]">Tour Packages</span>
        </nav>

        {/* ── Main grid ── */}
        <div className="relative z-[2] grid grid-cols-1 gap-6 px-5 pb-0 pt-4 sm:px-8 md:grid-cols-2 md:items-stretch md:gap-8 lg:px-14 lg:pt-5">

          {/* ════ LEFT — text ════ */}
          <div className="flex flex-col justify-center pb-6 md:pb-8 md:pr-6">

                    {/* Badge */}
          <div className="a0 mb-4 w-fit">
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,160,60,0.4)] bg-[rgba(255,100,20,0.10)] px-4 py-[7px] text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,200,120,0.9)] backdrop-blur-sm">
              <Sparkles size={11} />
              Explore Sacred Journeys
            </span>
          </div>

          {/* Eyebrow */}
          <p className="a1 mb-1 text-[10px] uppercase tracking-[0.14em] text-[rgba(255,190,100,0.55)]">
            Premium Pilgrimage Tours · Gujarat
          </p>

          {/* Title */}
          <div className="a1">
            <h1 className="font-playfair text-[clamp(2rem,5vw,3.2rem)] font-black leading-[1.08] tracking-[-0.02em] text-orange-100">
              Tour
              <span className="ml-2 italic text-[#FF8C38]">
                Packages
              </span>
            </h1>

            <p className="mt-1 text-[clamp(0.85rem,1.5vw,1rem)] font-medium text-white/50">
              Handpicked Spiritual Experiences
            </p>
          </div>

          {/* Rule */}
          <div className="a2 my-4 h-[2px] w-8 rounded-full bg-[#FF8C38]" />

          {/* Description */}
          <p className="a2 mb-5 max-w-[420px] text-[13px] font-light leading-[1.8] text-white/55">
            Discover thoughtfully curated pilgrimage packages across{" "}
            <strong className="font-medium text-[rgba(255,200,120,0.85)]">
              Somnath, Dwarka, Jyotirlinga circuits
            </strong>
            , and sacred destinations of Gujarat — designed for peaceful darshan,
            comfortable stays, and a spiritually fulfilling journey.
          </p>

            {/* Tags */}
            <div className="a3 mb-5 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.05] px-3 py-[5px] text-[11px] text-white/55"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-[#FF8C38] flex-shrink-0" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="a3 mb-5 flex flex-wrap gap-2.5">
              <button 
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-[12px] bg-[linear-gradient(135deg,#FF6B1A,#FF9A45)] px-6 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_20px_rgba(255,100,20,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,100,20,0.45)] active:translate-y-0 cursor-pointer"
              >
                <Star size={13} />
                Explore Packages
                <ArrowRight size={13} />
              </button>
              <a 
                href="https://wa.me/917302265809"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[12px] border border-white/[0.22] bg-transparent px-5 py-2.5 text-[13px] font-medium text-white/75 backdrop-blur-sm transition-all duration-200 hover:border-white/40 hover:text-white cursor-pointer"
              >
                <MessageCircle size={13} />
                WhatsApp Us
              </a>
            </div>

            {/* Stats */}
            <div className="a4 flex flex-wrap items-center gap-5 border-t border-white/[0.08] pt-4">
              {STATS.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-5">
                  <div>
                    <p className="font-playfair text-[1.3rem] font-bold leading-none text-[#FF9A45]">
                      {value}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/30">
                      {label}
                    </p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="h-8 w-px flex-shrink-0 bg-white/[0.10]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT — fresh image layout ════ */}
          <div className="a2 flex flex-col gap-2 pb-0">

            {/* Big main image */}
            <div className="relative flex-1 overflow-hidden rounded-t-2xl" style={{ minHeight: "220px" }}>
              <Image
                src={CARD_SOMNATH}
                alt="Somnath Temple"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />

              {/* Info bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
                <div>
                  <p className="text-[13px] font-semibold text-white">Somnath Temple</p>
                  <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-white/50">
                    <MapPin size={9} /> Veraval, Gujarat
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] text-white/70 backdrop-blur-sm">
                  <span className="h-[6px] w-[6px] rounded-full bg-green-400" />
                  Darshan Open
                </div>
              </div>
            </div>

            {/* Bottom 2-image strip */}
            <div className="grid grid-cols-2 gap-2">

              {/* Dwarka image */}
              <div className="relative overflow-hidden rounded-bl-2xl" style={{ height: "110px" }}>
                <Image
                  src={CARD_DWARKA}
                  alt="Dwarkadhish Temple"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
                  <p className="text-[11.5px] font-semibold text-white">Dwarkadhish</p>
                  <p className="text-[9.5px] text-white/50">Dwarka, Gujarat</p>
                </div>
              </div>

              {/* Packages count card */}
              <div
                className="flex flex-col items-center justify-center rounded-br-2xl"
                style={{
                  height: "110px",
                  background: "linear-gradient(135deg, #3d1505, #1a0800)",
                }}
              >
                <p className="font-playfair text-[1.8rem] font-bold leading-none text-[#FF8C38]">
                  50+
                </p>
                <p className="mt-1.5 text-[9.5px] uppercase tracking-[0.1em] text-white/40">
                  Packages Available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Floating review pill ── */}
        <div className="a4 relative z-10 mb-3 mr-5 mt-2 flex items-center justify-end sm:mr-8 lg:mr-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-[rgba(10,4,0,0.6)] px-4 py-2 backdrop-blur-[12px]">
            <div className="flex gap-[2px]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-[#FFA928] text-[#FFA928]" />
              ))}
            </div>
            <span className="text-[11px] font-medium text-white/75">4.9 · 2,400+ reviews</span>
          </div>
        </div>

        {/* ── Wave ── */}
        <div className="relative z-[3] -mb-px w-full leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 90"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block h-[58px] w-full sm:h-[72px] lg:h-[88px]"
          >
            <path d="M0,18 C180,70 360,0 540,36 C720,72 900,8 1080,44 C1200,68 1340,24 1440,40 L1440,90 L0,90 Z" fill="rgba(234,88,12,0.12)" />
            <path d="M0,40 C120,8 300,64 480,44 C660,24 840,66 1020,48 C1160,34 1320,60 1440,50 L1440,90 L0,90 Z" fill="rgba(251,146,60,0.09)" />
            <path d="M0,58 C200,28 380,80 560,62 C740,44 920,78 1100,64 C1240,54 1360,70 1440,62 L1440,90 L0,90 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}