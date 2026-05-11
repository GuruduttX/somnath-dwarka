"use client";

import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    <section
      className="relative w-full py-16 md:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fff7ed 0%, #ffedd5 40%, #fef3c7 100%)",
      }}
    >
      {/* Background Blur Orbs — matching Hero style */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 35, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,0.22) 0%, transparent 70%)",
          filter: "blur(45px)",
        }}
      />
      <motion.div
        animate={{ x: [0, -35, 20, 0], y: [0, 30, -20, 0] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(234,179,8,0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ x: [0, 20, -40, 0], y: [0, -40, 15, 0] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
        className="absolute top-1/2 right-1/3 w-60 h-60 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle diagonal lines — same as Hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(105deg, transparent, transparent 80px, rgba(251,146,60,0.2) 80px, rgba(251,146,60,0.2) 81px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center relative z-10">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-amber-600 font-semibold uppercase tracking-wider">
            Who We Are
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Your Trusted Companion in
            <span
              className="block italic"
              style={{
                background: "linear-gradient(90deg, #c2410c, #d97706, #b45309)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mathura &amp; Vrindavan
            </span>
          </h2>

          {/* Underline — slightly richer */}
          <div
            className="mt-4 h-1 w-24 rounded-full"
            style={{
              background: "linear-gradient(90deg, #ea580c, #d97706, #ca8a04)",
            }}
          />

          <p className="mt-6 sm:mt-8 text-gray-600 text-base sm:text-lg leading-relaxed">
            At{" "}
            <strong className="text-amber-800">MathuraVrindavanService</strong>,
            we specialize in providing complete travel and spiritual solutions
            in the sacred cities of Mathura and Vrindavan. From comfortable
            hotels and reliable taxi services to curated tour packages and
            divine pooja arrangements — we ensure your journey is peaceful,
            seamless, and spiritually fulfilling.
          </p>

          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            With strong local partnerships and deep understanding of the region,
            we are committed to offering personalized experiences that reflect
            devotion, comfort, and authenticity.
          </p>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 16px 48px rgba(251,146,60,0.2), 0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid rgba(251,146,60,0.25)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
            alt="Mathura Vrindavan Temple"
            className="object-cover w-full h-full"
          />
          {/* Subtle warm overlay on image */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(251,146,60,0.06) 0%, rgba(234,179,8,0.04) 100%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
