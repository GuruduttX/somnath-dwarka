"use client";

import { motion } from "framer-motion";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import { useState } from "react";
import {
  MapPin,
  Star,
  Users,
  Clock,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Pilgrims" },
  { icon: Star, value: "4.9★", label: "Avg Rating" },
  { icon: MapPin, value: "50+", label: "Sacred Spots" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const highlights = [
  "Handpicked hotels & stays",
  "Expert local guides",
  "Custom pooja arrangements",
  "Reliable taxi service",
  "Flexible tour packages",
  "Hassle-free booking",
];

export default function CTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 py-12 sm:py-16 px-6 lg:px-20 -my-5">
        {/* Background orbs */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-orange-400/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-500/30 blur-3xl pointer-events-none" />

        {/* Diagonal shimmer */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(105deg, transparent, transparent 80px, rgba(255,255,255,0.3) 80px, rgba(255,255,255,0.3) 81px)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* HEADING ROW */}
          <div className="flex flex-col items-center text-center lg:text-left lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 mx-auto lg:mx-0">
                ✦ Trusted Spiritual Travel Partner
              </span>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white leading-tight text-center lg:text-left">
                Plan Your Divine Journey
                <span className="block text-orange-100">
                  to Mathura &amp; Vrindavan
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="flex flex-row justify-center lg:justify-start gap-3 lg:shrink-0"
            >
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center justify-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-orange-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                Book Your Journey
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <Link
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-white/25 transition-all duration-300"
              >
                <Phone size={15} />
                Call Us Now
              </Link>
            </motion.div>
          </div>

          {/* BOTTOM ROW — stats + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-1.5 bg-white/15 border border-white/20 rounded-2xl py-4 px-2 text-center"
                >
                  <Icon size={16} className="text-orange-100" />
                  <span className="text-lg font-bold text-white leading-none">
                    {value}
                  </span>
                  <span className="text-xs text-white/70 leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="bg-white/15 border border-white/20 rounded-2xl px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-center sm:text-left">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center sm:justify-start gap-2 text-white/90 text-sm"
                >
                  <CheckCircle size={13} className="text-orange-200 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />
    </>
  );
}
