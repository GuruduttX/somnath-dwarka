"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import StatsStrip from "./StatsStrip";
import QuickQuery from "@/utils/QuickQuery";

import { Flame, Users, Star, HandHeart, ArrowRight } from "lucide-react";

const STATS = [
  { icon: Flame, value: "50+", label: "Pooja Types" },
  { icon: Users, value: "10k+", label: "Devotees Served" },
  { icon: Star, value: "4.9", label: "Rating" },
];

export default function PoojaHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({name:"", phone:""});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    ref.current
      ?.querySelectorAll(".ph-anim")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={ref}
        className="relative w-full min-h-[85vh] flex items-center overflow-hidden py-14 md:py-10 sm:py-3"
        style={{
          background:
            "linear-gradient(135deg, #c94a00 0%, #e86d00 30%, #f9a825 70%, #ffd54f 100%)",
        }}
      >
        {/* Blob accents */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="absolute bottom-[-60px] left-[35%] w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "rgba(180,60,0,0.15)" }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Bottom curvy wave */}
        <div className="absolute bottom-[-2px] left-0 w-full pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            className="w-full h-16 md:h-20"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Inner layout */}
        <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-6 md:py-14 pb-10 md:pb-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* ── LEFT: All content ── */}
          <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left py-10 md:py-12">
            {/* Badge */}
            <div
              className="ph-anim ph-d2 inline-flex items-center px-5 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white mb-5"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.42)",
              }}
            >
              Authentic Vedic Pooja Packages
            </div>

            {/* Title */}
            <h1
              className="ph-anim ph-d3 text-white font-black leading-[1.08] tracking-tight drop-shadow-sm mb-2"
              style={{ fontSize: "clamp(2rem, 6vw, 3.3rem)" }}
            >
              Book Sacred{" "}
              <em className="italic" style={{ opacity: 0.9 }}>
                Poojas
              </em>
            </h1>
            <p
              className="ph-anim ph-d3 font-normal tracking-widest mb-4"
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
                color: "rgba(255,255,255,0.82)",
              }}
            >
              in Mathura &amp; Vrindavan
            </p>

            {/* Divider */}
            <div className="flex items-center gap-2 mb-4 md:mb-5">
              <div className="h-px w-6 bg-white/40" />
              <div
                className="h-1 w-20 rounded-full bg-white"
                style={{ boxShadow: "0 0 10px rgba(255,255,255,0.45)" }}
              />
              <div className="h-px w-6 bg-white/40" />
            </div>

            {/* Description */}
            <p
              className="ph-anim ph-d4 text-xs sm:text-sm md:text-base leading-relaxed mb-6 md:mb-7 max-w-md"
              style={{ color: "rgba(255,255,255,0.84)" }}
            >
              Performed by learned pandits — Rukmini Vivah, Govardhan Pooja,
              Janmashtami Abhishek &amp; many more sacred rituals.
            </p>

            {/* Stats — single row, evenly spaced, mobile-friendly */}
            <div className="ph-anim ph-d5 w-full max-w-xs sm:max-w-none flex justify-center md:justify-start gap-0 mb-6 md:mb-7">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center md:items-start flex-1 ${
                      i !== 0
                        ? "border-l border-white/25 pl-4 md:pl-6 ml-4 md:ml-6"
                        : ""
                    }`}
                  >
                    <span className="flex items-center gap-1.5 text-lg md:text-xl font-black text-white leading-none">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-white/90" />
                      {s.value}
                    </span>
                    <span
                      className="text-[10px] sm:text-[11px] mt-1 text-center md:text-left"
                      style={{ color: "rgba(255,255,255,0.62)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTAs — always single row */}
            <div className="ph-anim ph-d5 flex flex-row items-center justify-center md:justify-start gap-3 mb-6 md:mb-7 w-full">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 md:py-3.5 rounded-full font-extrabold text-xs sm:text-sm cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-95 whitespace-nowrap flex-1 sm:flex-none"
                style={{
                  background: "#fff",
                  color: "#c94a00",
                  boxShadow: "0 6px 22px rgba(0,0,0,0.15)",
                }}
              >
                <HandHeart size={15} />
                Book a Pooja
              </button>

              <Link href="/pooja-packages" className="flex-1 sm:flex-none">
                <button
                  className="w-full inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 md:py-3.5 rounded-full font-bold text-xs sm:text-sm text-white cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.12)",
                  }}
                >
                  View All
                  <ArrowRight size={14} />
                </button>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 md:gap-x-5 gap-y-2">
              {[
                "100% Vedic Rituals",
                "Certified Pandits",
                "Doorstep Service",
                "Secure Booking",
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  <span style={{ color: "rgba(255,228,70,0.85)" }}>✦</span>
                  {t}
                </span>
              ))}
            </div>

            <div className="md:hidden w-full z-35 mt-6 flex justify-center ">
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div className="hidden md:block flex-shrink-0 w-full md:w-[300px] lg:w-[380px] self-stretch flex items-center justify-end">
            <div className="relative w-full max-w-[380px] h-[100px] md:h-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 460 380"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="cardClip">
                    <rect x="0" y="0" width="460" height="380" rx="16" />
                  </clipPath>
                </defs>

                <image
                  href="/images/pooja/mainheropooja.webp"
                  x="0"
                  y="0"
                  width="460"
                  height="380"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#cardClip)"
                />

                <rect
                  x="0"
                  y="0"
                  width="460"
                  height="380"
                  rx="16"
                  fill="#c2410c"
                  fillOpacity="0.15"
                  clipPath="url(#cardClip)"
                />

                <rect
                  x="0"
                  y="0"
                  width="460"
                  height="380"
                  rx="16"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeOpacity="0.6"
                />
                <rect
                  x="0"
                  y="0"
                  width="460"
                  height="380"
                  rx="16"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                />

                <rect
                  x="296"
                  y="300"
                  width="152"
                  height="68"
                  rx="14"
                  fill="white"
                />
                <text
                  x="312"
                  y="333"
                  fontFamily="Georgia, serif"
                  fontSize="24"
                  fontWeight="700"
                  fill="#c2410c"
                >
                  10K+
                </text>
                <text
                  x="312"
                  y="354"
                  fontFamily="sans-serif"
                  fontSize="9"
                  fontWeight="600"
                  fill="#9ca3af"
                  letterSpacing="1"
                >
                  DEVOTEES SERVED
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <StatsStrip />

      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Pooja"
        name={form.name}
        phone={form.phone}
      />
    </>
  );
}
