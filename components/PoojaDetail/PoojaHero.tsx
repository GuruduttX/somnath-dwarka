"use client";

import Link from "next/link";
import Image from "next/image";
import {useState} from "react"
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
interface PoojaHeroProps {
  pooja: {
    title: string;
    shortDesc: string;
    duration: string;
    location: string;
    price: number;
    heroImage: string;
    discountPrice : string;
  };
}

export default function PoojaHero({ pooja }: PoojaHeroProps) {
  const[isFrormOpen, setIsFromOpen] = useState(false);
  return (
    <>
     <CommonEnquiryForm
        open={isFrormOpen}
        onClose={() => setIsFromOpen(false)}
        defaultService="Pooja Booking"
      />

      <section className="relative w-full min-h-[80vh] md:min-h-[92vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={"/images/pooja/mainHero.webp"}
          alt={pooja.title}
          fill
          className=" object-cover object-center brightness-[0.35]"
          priority
        />
      </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/80 via-amber-800/70 to-amber-500/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Decorative blurred circles — static, no JS */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] rounded-full bg-orange-600/20 blur-3xl pointer-events-none" />

        {/* Decorative mandala ring — static SVG */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none opacity-[0.12]">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
            <circle
              cx="200"
              cy="200"
              r="190"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="8 6"
            />
            <circle
              cx="200"
              cy="200"
              r="150"
              stroke="white"
              strokeWidth="0.6"
              strokeDasharray="4 8"
            />
            <circle cx="200" cy="200" r="110" stroke="white" strokeWidth="1" />
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x1 = 200 + 110 * Math.cos(rad);
              const y1 = 200 + 110 * Math.sin(rad);
              const x2 = 200 + 190 * Math.cos(rad);
              const y2 = 200 + 190 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth="0.5"
                />
              );
            })}
            <circle
              cx="200"
              cy="200"
              r="16"
              stroke="white"
              strokeWidth="1.2"
              fill="none"
            />
            <text
              x="200"
              y="206"
              textAnchor="middle"
              fill="white"
              fontSize="16"
              fontFamily="serif"
            >
              ॐ
            </text>
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 sm:py-14 md:py-20">
          <div className="max-w-2xl xl:max-w-3xl">
            {/* Location Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6
            bg-white/10 backdrop-blur-sm border border-white/20 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-amber-300 inline-block" />
              <span className="text-white/90 text-xs tracking-widest uppercase font-medium">
                Sacred Ritual · {pooja.location}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              {pooja.title}
            </h1>

            {/* amber accent divider */}
            <div className="mt-5 flex items-center gap-3">
              <div className="h-px w-10 bg-amber-300/50" />
              <div className="h-1 w-36 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-orange-600 shadow-[0_0_12px_2px_rgba(236,72,153,0.5)]" />
              <div className="h-px w-10 bg-amber-300/50" />
            </div>

            {/* Description */}
            <p className="mt-16 sm:mt-14 md:mt-9 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
              {pooja.shortDesc}
            </p>

            {/* Stats Row */}
            <div className="mt-16 sm:mt-14 md:mt-9 flex flex-wrap gap-3">
              {[
                {
                  icon: "⏱",
                  label: "Duration",
                  value: pooja.duration,
                  originalPrice: null,
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: pooja.location,
                  originalPrice: null,
                },
                {
                  icon: "₹",
                  label: "Starting From",
                  value: pooja.price ?? pooja.price,
                  originalPrice: pooja.discountPrice
                    ? pooja.discountPrice
                    : pooja.price,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl cursor-default
                  bg-white/10 backdrop-blur-sm border border-white/15
                  hover:bg-white/20 hover:border-amber-300/40
                  transition-colors duration-200"
                >
                  <span className="text-lg leading-none">{item.icon}</span>
                  <div>
                    <p className="text-white/55 text-[10px] uppercase tracking-wider leading-none mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-white font-semibold text-sm leading-tight flex items-center gap-1.5">
                      {typeof item.value === "number"
                        ? `₹${item.value.toLocaleString("en-IN")}`
                        : item.value}
                      {item.originalPrice && (
                        <span className="text-white/45 text-xs font-normal line-through">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* CTA Buttons */}
           <div className="mt-16 sm:mt-14 md:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
  
              <Link href="#enquiry" className="w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 
                  px-5 py-3 sm:px-9 sm:py-4 rounded-full
                  bg-white text-amber-700 font-bold text-sm sm:text-base tracking-wide
                  shadow-[0_4px_24px_#ffb600]
                  hover:shadow-[0_6px_32px_#F86400]
                  hover:bg-amber-50 hover:scale-[1.03]
                  active:scale-95 transition-all duration-200"
                  onClick={() => setIsFromOpen(true)}
                >
                  Book This Pooja
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">
                    →
                  </span>
                </button>
              </Link>

              <button
                onClick={() => setIsFromOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 
                px-5 py-3 sm:px-9 sm:py-4 rounded-full
                text-white font-semibold text-sm sm:text-base tracking-wide
                border border-white/40 bg-white/10 backdrop-blur-sm
                hover:bg-white hover:text-amber-700 hover:border-white
                hover:scale-[1.03] active:scale-95
                transition-all duration-200"
              >
                Talk to Priest
                <span className="text-base">🙏</span>
              </button>

            </div>
          

            {/* Trust strip */}
            <div className="mt-16 sm:mt-14 md:mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-white/45 text-xs">
              {[
                "100% Vedic Rituals",
                "Certified Pandits",
                "Doorstep Service",
                "Secure Booking",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="text-amber-300/70">✦</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Scroll indicator — Tailwind animate-bounce only */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
        text-white/35 text-[10px] tracking-widest cursor-default select-none"
        >
          <path
            d="M6 1v10M1 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        
      </div>
    </section>
    </>
   
  );
}