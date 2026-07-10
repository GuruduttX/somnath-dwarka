"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, Star, Sparkles, MessageSquare } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { waLink } from "@/src/config/site";

const HIGHLIGHTS = [
  { icon: Star,     text: "VIP Jyotirlinga Darshan"  },
  { icon: MapPin,   text: "Somnath & Dwarka Covered" },
  { icon: Sparkles, text: "Custom Pilgrimage Plans"   },
  { icon: Phone,    text: "24/7 Expert Support"       },
] as const;

export default function CtaBand({
  context,
  title,
  subtitle,
  priceFrom,
}: {
  context: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  /**
   * "From ₹X" badge — opt-in, and OPS-CONFIRM gated. This was a hardcoded
   * "From ₹4,999" that rendered on every page using CtaBand, including pages
   * where no such package exists. Pass a confirmed figure to show it.
   */
  priceFrom?: string;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section id="cta-band" className="relative w-full mt-4 mb-4 overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400">

        {/* ── TOP WAVE ── */}
        <svg
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          className="block w-full h-[28px] sm:h-[32px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 L0,16 C360,38 1080,-6 1440,16 L1440,0 Z"
            fill="white"
          />
        </svg>

        {/* ── BACKGROUND DECORATION ── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <svg viewBox="0 0 400 400" className="absolute -right-16 -top-16 w-[220px] opacity-[0.08] lg:w-[280px]">
            {[40, 80, 120, 160, 200].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth="1" />
            ))}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="200" y1="200"
                x2={(200 + 200 * Math.cos((i * 30 * Math.PI) / 180)).toFixed(3)}
                y2={(200 + 200 * Math.sin((i * 30 * Math.PI) / 180)).toFixed(3)}
                stroke="white" strokeWidth="0.5"
              />
            ))}
          </svg>

          <svg className="absolute bottom-0 left-0 h-36 w-36 opacity-[0.07]">
            <defs>
              <pattern id="ctaDots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaDots)" />
          </svg>

          <span className="absolute bottom-2 right-6 select-none font-serif text-[80px] leading-none text-white/[0.06] lg:text-[110px]">
            ॐ
          </span>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="relative mx-auto max-w-6xl px-5 py-7 sm:px-10 sm:py-8 lg:px-16 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-2 lg:gap-14">

            {/* ══ LEFT COLUMN ══ */}
            <div className="flex flex-col gap-4 text-center lg:text-left">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                viewport={{ once: true }}
                className="flex justify-center lg:justify-start"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  <Sparkles size={9} />
                  Plan Your Sacred Journey
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                viewport={{ once: true }}
                className="font-serif text-[clamp(22px,3.8vw,40px)] font-bold leading-[1.12] tracking-tight text-white animate-fade-in"
              >
                {title ? title : (
                  <>
                    Your Perfect Pilgrimage to{" "}
                    <span className="italic text-orange-200">Somnath &amp; Dwarka</span>
                  </>
                )}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                viewport={{ once: true }}
                className="text-[13px] leading-relaxed text-white/72 sm:text-sm lg:max-w-none"
              >
                {subtitle ? subtitle : (
                  <>
                    Our Gujarat specialists craft custom itineraries covering the sacred{" "}
                    <strong className="font-semibold text-white">Jyotirlinga of Somnath</strong> and the divine{" "}
                    <strong className="font-semibold text-white">Dwarkadhish Temple</strong> — with comfortable
                    stays, private transfers &amp; guided experiences.
                  </>
                )}
              </motion.p>

              {/* Highlight pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-1.5 lg:justify-start"
              >
                {HIGHLIGHTS.map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white"
                  >
                    <Icon size={10} className="text-orange-200" />
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28 }}
                viewport={{ once: true }}
                className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start"
              >
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-orange-600 shadow-md shadow-black/12 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 sm:w-auto cursor-pointer"
                >
                  Speak With Our Expert
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <a
                  href={waLink(`Hi, I would like to enquire about: ${context}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/18 active:translate-y-0 sm:w-auto cursor-pointer"
                >
                  <MessageSquare size={14} className="text-orange-200 shrink-0" />
                  WhatsApp Us
                </a>
              </motion.div>
            </div>

            {/* ══ RIGHT COLUMN ══ */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Dashed vertical line — desktop only */}
              <svg
                className="absolute -left-5 top-6 hidden h-44 w-4 lg:block"
                viewBox="0 0 16 176" fill="none"
              >
                <line x1="8" y1="0" x2="8" y2="176" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="4 5" />
                {[40, 88, 136].map((cy) => (
                  <circle key={cy} cx="8" cy={cy} r="3" fill="rgba(255,255,255,0.45)" />
                ))}
              </svg>

              {/* Image container */}
              <div className="relative h-[180px] w-full max-w-sm overflow-hidden rounded-[20px] border-4 border-white/20 shadow-2xl shadow-black/20 sm:h-[210px] lg:h-[240px] lg:w-[400px]">
                <Image
                  src="/images/CTA.webp"
                  alt="Somnath Dwarka Tour Package"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 384px, 400px"
                  loading="lazy"
                  className="object-cover"
                />
                {/* Bottom chip */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-white/92 px-3.5 py-2 backdrop-blur-md">
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Somnath + Dwarka</p>
                    <p className="flex items-center gap-1 text-[10px] text-gray-400">
                      <MapPin size={8} className="text-orange-500" /> Gujarat, India
                    </p>
                  </div>
                  {priceFrom ? (
                    <span className="rounded-lg bg-orange-100 px-2.5 py-1 text-[10px] font-semibold text-orange-700">
                      From {priceFrom}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Stars badge */}
              <div className="absolute -top-3 right-3 flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 shadow-lg backdrop-blur-md lg:right-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={9} className="fill-orange-300 text-orange-300" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-[10.5px] font-semibold text-white">4.9 · 2,400+ reviews</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM WAVE ── */}
        <svg
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          className="block w-full h-[28px] sm:h-[32px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,16 C360,38 1080,-6 1440,16 L1440,32 L0,32 Z"
            fill="white"
          />
        </svg>
      </section>

      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService={context}
      />
    </>
  );
}
