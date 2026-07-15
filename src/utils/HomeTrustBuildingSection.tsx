"use client";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Compass, Clock, Shield, Sparkles } from "lucide-react";
import { useState } from "react";
import CommonEnquiryForm from "./CommanEnquiryForm";

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
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />
      <section id="home-trust" className="py-6 sm:py-8 px-4 sm:px-8 lg:px-16 xl:px-24 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-white border border-orange-100 shadow-xl shadow-orange-200/30"
          >
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

            {/* Content Grid */}
            <div className="grid lg:grid-cols-5 gap-0">

              {/* Left Content */}
              <div className="lg:col-span-3 px-6 sm:px-8 py-6 sm:py-8">

                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4"
                >
                  <MapPin size={12} />
                  Gujarat Pilgrimage
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-2"
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
                  className="text-gray-500 text-sm leading-relaxed max-w-lg mb-5"
                >
                  Experience the divine aura of Lord Krishna&apos;s kingdom at Dwarka and the majestic Somnath Jyotirlinga — complete packages with hotels, travel, and guided darshan.
                </motion.p>

                {/* Highlights Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-2 mb-5"
                >
                  {highlights.map(({ icon: Icon, text }, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-orange-50/80 border border-orange-100/80 hover:border-orange-200 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-200">
                        <Icon size={15} className="text-white" />
                      </div>
                      <span className="text-gray-700 text-xs font-medium">{text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm shadow-md shadow-orange-300/40 cursor-pointer hover:shadow-lg hover:shadow-orange-300/50 transition-shadow"
                  >
                    View Tour Packages <ArrowRight size={15} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white border-2 border-orange-200 text-orange-600 font-semibold text-sm hover:bg-orange-50 hover:border-orange-300 transition-colors cursor-pointer"
                  >
                    Get Free Quote <ArrowRight size={15} />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Side - Stats Panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-2 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                />

                <div className="relative z-10">
                  {/* Destinations */}
                  <div className="mb-5">
                    <div className="flex items-center gap-1.5 text-orange-200 text-[10px] font-semibold tracking-wider uppercase mb-2.5">
                      <Star size={11} className="fill-orange-200" />
                      Featured Destinations
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Dwarka Temple", sub: "Krishna's Kingdom" },
                        { name: "Somnath Temple", sub: "First Jyotirlinga" },
                      ].map((d) => (
                        <div key={d.name} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-white/20">
                          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                            <MapPin size={14} className="text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold text-[13px]">{d.name}</p>
                            <p className="text-white/60 text-[11px]">{d.sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/20">
                    {stats.map(({ value, label }) => (
                      <div key={label} className="text-center">
                        <div className="text-xl sm:text-2xl font-extrabold text-white">{value}</div>
                        <div className="text-[10px] text-white/60 mt-0.5 leading-tight">{label}</div>
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