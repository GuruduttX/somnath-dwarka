"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { useState } from "react";

const stats = [
  { value: "5000+", label: "Happy Pilgrims" },
  { value: "50+", label: "Tour Packages" },
  { value: "12+", label: "Years Experience" },
];

const trustItems = [
  "Verified Local Guides",
  "24/7 Support",
  "Best Price Guarantee",
  "Spiritual & Comfortable",
];

export default function TravelCTA() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="py-8 sm:py-10 md:py-16 px-3 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 shadow-xl shadow-orange-500/25">
            {/* Dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* Decorative orbs */}
            <div className="absolute -top-16 -left-16 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-white/10 pointer-events-none blur-xl" />
            <div className="absolute -bottom-12 left-32 w-36 sm:w-48 h-36 sm:h-48 rounded-full bg-orange-300/10 pointer-events-none blur-lg" />
            <div className="absolute top-1/2 right-0 w-32 h-32 rounded-full bg-orange-400/15 pointer-events-none blur-2xl" />

            <div className="relative grid lg:grid-cols-2 items-stretch">
              {/* LEFT — Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="px-5 sm:px-8 md:px-12 py-8 sm:py-10 text-white flex flex-col justify-center items-center lg:items-start"
              >
               <div className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5 w-fit backdrop-blur-sm">
                <MapPin size={12} className="opacity-80" />
                {"Sacred Dwarka & Somnath Journey"}
              </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight mb-3 sm:mb-4 text-center lg:text-left">
                Experience the Sacred
                <br />
                Dwarka & Somnath Journey
              </h2>

              <p className="text-white/80 text-xs sm:text-sm text-center lg:text-left leading-relaxed max-w-sm mb-6 sm:mb-8">
                Temple tours, comfortable stays, private taxis & divine darshan —
                discover Gujarat’s most spiritual destinations with trusted local guidance.
              </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white text-orange-600 font-bold text-sm shadow-lg shadow-orange-900/20 cursor-pointer w-full sm:w-auto hover:bg-orange-50 transition-colors"
                  >
                    Book Tour Package <ArrowRight size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-sm hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
                  >
                    Enquire Now <ArrowRight size={16} />
                  </motion.button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 pt-5 sm:pt-6 border-t border-white/20 w-full">
                  {stats.map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-extrabold">
                        {value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-white/60 mt-0.5 tracking-wide whitespace-nowrap">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="hidden lg:flex relative min-h-[300px] xl:min-h-[350px] overflow-hidden py-6 px-6 items-center justify-center"
              >
                <div className="w-full h-full relative rounded-xl overflow-hidden border border-white/10 shadow-inner">
                  <Image
                    src="/images/home/HomeHero.webp"
                    alt="Sacred Dwarka and Somnath Temple"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>
            </div>

            {/* Trust bar - Mobile */}
            <div className="relative border-t border-white/15 px-4 py-4 flex lg:hidden flex-wrap justify-center items-center gap-x-4 gap-y-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1.5 text-white/70 text-[10px] sm:text-xs font-medium"
                >
                  <Star
                    size={10}
                    className="text-orange-200 fill-orange-200"
                  />
                  {item}
                </div>
              ))}
            </div>

            {/* Trust bar - Desktop */}
            <div className="relative border-t border-white/15 px-8 md:px-12 py-3.5 hidden lg:flex justify-around items-center gap-x-6 gap-y-1.5">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-white/70 text-xs font-medium"
                >
                  <Star
                    size={12}
                    className="text-orange-200 fill-orange-200"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
