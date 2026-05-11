"use client";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Compass, Clock, Shield, Sparkles } from "lucide-react";
import { useState } from "react";

const stats = [
  { value: "5000+", label: "Happy Pilgrims" },
  { value: "50+", label: "Tour Packages" },
  { value: "12+", label: "Years Experience" },
];

const highlights = [
  { icon: Compass, text: "Expert Guided Tours" },
  { icon: Clock, text: "Flexible Itineraries" },
  { icon: Shield, text: "Safe & Secure Travel" },
  { icon: Sparkles, text: "Premium Experiences" },
];

export default function HomeTrustBuildingSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="py-10 sm:py-14 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-white border border-orange-100 shadow-2xl shadow-orange-200/30"
          >
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

            {/* Content Grid */}
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Content */}
              <div className="lg:col-span-3 px-6 sm:px-10 md:px-14 py-10 sm:py-14">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-[10px] sm:text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6"
                >
                  <MapPin size={14} />
                  Gujarat Pilgrimage
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
                >
                  Discover Sacred{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    Dwarka & Somnath
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-lg mb-8"
                >
                  Experience the divine aura of Lord Krishna&apos;s kingdom at Dwarika and the majestic Somnath Jyotirlinga. Complete pilgrimage packages with hotels, travel, and guided darshan.
                </motion.p>

                {/* Highlights Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 mb-10"
                >
                  {highlights.map(({ icon: Icon, text }, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-orange-50/80 border border-orange-100/80 hover:border-orange-200 transition-colors"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-200">
                        <Icon size={18} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm font-medium">
                        {text}
                      </span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-300/40 cursor-pointer hover:shadow-xl hover:shadow-orange-300/50 transition-shadow"
                  >
                    View Tour Packages <ArrowRight size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white border-2 border-orange-200 text-orange-600 font-semibold text-sm hover:bg-orange-50 hover:border-orange-300 transition-colors cursor-pointer"
                  >
                    Get Free Quote <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Side - Stats Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-center relative overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="relative z-10">
                  {/* Temples info */}
                  <div className="mb-8 sm:mb-10">
                    <div className="flex items-center gap-2 text-orange-200 text-xs font-semibold tracking-wider uppercase mb-3">
                      <Star size={12} className="fill-orange-200" />
                      Featured Destinations
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <MapPin size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Dwarka Temple</p>
                          <p className="text-white/60 text-xs">Krishna&apos;s Kingdom</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <MapPin size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">Somnath Temple</p>
                          <p className="text-white/60 text-xs">First Jyotirlinga</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-white/20">
                    {stats.map(({ value, label }) => (
                      <div key={label} className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
                          {value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-white/60 mt-1 leading-tight">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
