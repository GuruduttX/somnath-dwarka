"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import { BookOpen, MapPin, Users } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "100+", label: "Blog Stories" },
  { icon: MapPin,   value: "50+",  label: "Sacred Places" },
  { icon: Users,    value: "10K+", label: "Monthly Readers" },
];

const badges = [
  "Temple Guides",
  "Pilgrimage & Yatra",
  "Travel Guides",
  "Festivals & Events",
  "Krishna Leela",
];

export default function BlogHero() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <section className="relative w-full overflow-hidden pt-32 pb-16 md:pt-36 md:pb-20 lg:pt-32 lg:pb-16">

        {/* ── 1. Rich saffron base gradient ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #C94B00 0%, #E8670A 30%, #F5891F 60%, #FCA83A 85%, #FBBF24 100%)",
          }}
        />

        {/* ── 2. Sunburst / conic-ray overlay — centred top ── */}
        <div
          className="absolute inset-0 opacity-[0.09] pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg at 50% -10%, transparent 0deg, rgba(255,255,255,0.9) 3deg, transparent 6deg, transparent 18deg, rgba(255,255,255,0.9) 21deg, transparent 24deg, transparent 36deg, rgba(255,255,255,0.9) 39deg, transparent 42deg, transparent 54deg, rgba(255,255,255,0.9) 57deg, transparent 60deg, transparent 72deg, rgba(255,255,255,0.9) 75deg, transparent 78deg, transparent 90deg, rgba(255,255,255,0.9) 93deg, transparent 96deg, transparent 108deg, rgba(255,255,255,0.9) 111deg, transparent 114deg, transparent 126deg, rgba(255,255,255,0.9) 129deg, transparent 132deg, transparent 144deg, rgba(255,255,255,0.9) 147deg, transparent 150deg, transparent 162deg, rgba(255,255,255,0.9) 165deg, transparent 168deg, transparent 180deg, rgba(255,255,255,0.9) 183deg, transparent 186deg, transparent 360deg)",
          }}
        />

        {/* ── 3. Fine cross-grid texture ── */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* ── 4. Small dot accent grid ── */}
        <div
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1.2px, transparent 0)",
            backgroundSize: "40px 40px",
            backgroundPosition: "20px 20px",
          }}
        />

        {/* ── 5. Dashed mandala ring — top-right ── */}
        <svg
          className="absolute -top-20 -right-20 w-96 h-96 opacity-[0.12] pointer-events-none"
          viewBox="0 0 380 380" fill="none"
        >
          <circle cx="190" cy="190" r="170" stroke="white" strokeWidth="2" strokeDasharray="8 10" />
          <circle cx="190" cy="190" r="130" stroke="white" strokeWidth="1.5" strokeDasharray="5 8" />
          <circle cx="190" cy="190" r="90"  stroke="white" strokeWidth="1"   strokeDasharray="3 6" />
        </svg>

        {/* ── 6. Dashed mandala ring — bottom-left ── */}
        <svg
          className="absolute -bottom-28 -left-28 w-120 h-120 opacity-[0.10] pointer-events-none"
          viewBox="0 0 480 480" fill="none"
        >
          <circle cx="240" cy="240" r="220" stroke="white" strokeWidth="2.5" strokeDasharray="10 12" />
          <circle cx="240" cy="240" r="170" stroke="white" strokeWidth="1.5" strokeDasharray="6 10" />
        </svg>

        {/* ── 7. Warm golden glow — top-left ── */}
        <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full bg-yellow-300/30 blur-3xl pointer-events-none" />

        {/* ── 8. Deep amber glow — bottom-right ── */}
        <div className="absolute bottom-0 right-0 w-96 h-72 rounded-full bg-amber-600/25 blur-3xl pointer-events-none" />

        {/* ── 9. Soft bright spot — centre ── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 rounded-full bg-orange-200/15 blur-3xl pointer-events-none" />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14 sm:h-20">
            <path d="M0,40 C180,90 360,0 540,45 C720,90 900,0 1080,45 C1260,90 1380,20 1440,45 L1440,90 L0,90 Z" fill="white" />
          </svg>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* LEFT */}
            <div className="text-white space-y-4 lg:space-y-5 text-center lg:text-left">

              {/* Pill badge */}
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full"
              >
                ✨ Spiritual India — Travel & Temple Blog
              </motion.span>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight"
              >
                Discover Sacred{" "}
                <span className="italic font-extrabold text-yellow-200">
                  Journeys
                </span>{" "}
                &amp; Divine Stories
              </motion.h1>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28 }}
                className="text-white/85 text-sm leading-relaxed max-w-md mx-auto lg:mx-0"
              >
                Explore temples, pilgrimages, and spiritual stories from Mathura,
                Vrindavan, Ayodhya and across India. Plan your divine journey with
                our expert guides.
              </motion.p>

              {/* Scrolling category badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-2 justify-center lg:justify-start"
              >
                {badges.map((b) => (
                  <span
                    key={b}
                    className="text-xs bg-white/15 border border-white/25 text-white px-3 py-1 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link href="#blogs" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-orange-600 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">
                    Explore Blogs
                  </button>
                </Link>
                <button
                  onClick={() => setFormOpen(true)}
                  className="w-full sm:w-auto px-7 py-3 rounded-full border-2 border-white/70 text-white font-bold text-sm hover:bg-white/15 hover:scale-105 transition duration-300 cursor-pointer"
                >
                  Plan Your Trip ✈
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
                className="flex gap-6 sm:gap-10 justify-center lg:justify-start"
              >
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col items-center lg:items-start gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <Icon size={14} className="text-yellow-200" />
                      <span className="text-xl font-extrabold">{value}</span>
                    </div>
                    <span className="text-xs text-white/70">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — image card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-full max-w-md">

                {/* Main image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/3">
                  <img
                    src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
                    alt="Mathura Vrindavan Temple"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent rounded-3xl" />
                </div>

                {/* Floating enquiry card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 min-w-50"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
                    🙏
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Plan Your Visit</p>
                    <button
                      onClick={() => setFormOpen(true)}
                      className="text-xs text-orange-500 font-semibold hover:underline cursor-pointer"
                    >
                      Send Enquiry →
                    </button>
                  </div>
                </motion.div>

                {/* Floating topic badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute -top-4 -right-4 bg-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                >
                  🕌 365 Days Open
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Enquiry modal */}
      <CommonEnquiryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        defaultService="General Enquiry"
      />
    </>
  );
}
