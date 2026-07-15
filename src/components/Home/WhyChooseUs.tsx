"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, MapPin, Star, Clock, HeartHandshake } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";
import { useState } from "react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "100% Safe & Verified",
    description: "All accommodations, transport & temple services are fully verified for your peace of mind.",
    stats: "10+ Years",
    statsLabel: "Experience",
  },
  {
    icon: Users,
    title: "10,000+ Pilgrims Served",
    description: "Trusted by thousands of devotees for sacred Dwarka & Somnath yatra experiences.",
    stats: "4.9★",
    statsLabel: "Rating",
  },
  {
    icon: MapPin,
    title: "Expert Local Guides",
    description: "Knowledgeable guides who know every temple, ritual & hidden gem of Gujarat pilgrimage.",
    stats: "50+",
    statsLabel: "Destinations",
  },
  {
    icon: Clock,
    title: "Hassle-Free Planning",
    description: "Complete itinerary with darshan slots, hotel bookings & AC transport arranged seamlessly.",
    stats: "24/7",
    statsLabel: "Support",
  },
  {
    icon: Star,
    title: "VIP Darshan Access",
    description: "Skip the queues with our special darshan arrangements at Dwarkadhish & Somnath temples.",
    stats: "Fast",
    statsLabel: "Entry",
  },
  {
    icon: HeartHandshake,
    title: "Customized Packages",
    description: "Flexible tour options from budget-friendly to premium luxury spiritual journeys.",
    stats: "100%",
    statsLabel: "Flexible",
  },
];

export default function DwarkaSomnathTrustSection() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <CommonEnquiryForm
        open={open}
        onClose={() => setOpen(false)}
        defaultService="Tour Package"
      />
       
       <section id="why-choose-us" className="relative py-12 md:py-24 -mt-3 sm:-mt-14 overflow-hidden ">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 blur-3xl rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Fade top & bottom edges into white so the section merges with its neighbors */}
      <div className="absolute inset-x-0 top-0 h-24 z-[1] pointer-events-none bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 z-[1] pointer-events-none bg-gradient-to-t from-white to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-orange-100 rounded-full opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-orange-200/50 rounded-full opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-6 border border-orange-200/50"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Why Choose Us
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="text-gray-900">Your Trusted Partner for</span>
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Dwarka Somnath Yatra
            </span>
          </h2>
          
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4">
            Experience the divine journey to Lord Krishna&apos;s Dwarka & Lord Shiva&apos;s Somnath with Gujarat&apos;s most trusted pilgrimage experts
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-orange-300 rounded-full" />
            <div className="w-3 h-3 border-2 border-orange-400 rounded-full" />
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <div className="w-3 h-3 border-2 border-orange-400 rounded-full" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-orange-300 rounded-full" />
          </div>
        </motion.div>

        {/* Trust Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div
                  onClick={() => setOpen(true)}
                  className="relative h-full bg-white rounded-2xl p-4 sm:p-6 shadow-lg shadow-orange-100/50 border border-orange-100/50 hover:shadow-xl hover:shadow-orange-200/50 hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Top gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Background pattern on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-100/0 group-hover:from-orange-50/50 group-hover:to-amber-50/30 transition-all duration-300" />
                  
                  <div className="relative z-10">
                    {/* Icon & Stats row */}
                    <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                      <div className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-200/50 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="text-white w-[18px] h-[18px] sm:w-[26px] sm:h-[26px]" />
                      </div>

                      <div className="text-right min-w-0">
                        <div className="text-base sm:text-2xl font-bold leading-tight whitespace-nowrap bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                          {item.stats}
                        </div>
                        <div className="text-[9px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide">
                          {item.statsLabel}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm sm:text-lg leading-snug mb-1.5 sm:mb-2 group-hover:text-orange-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-[12.5px] sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-orange-100/50">
                      <div className="flex items-center gap-2 text-orange-600 text-sm font-semibold group-hover:gap-3 transition-all cursor-pointer">
                        <span>Learn more</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 rounded-2xl p-1">
            <div className="bg-white rounded-xl px-6 py-4 sm:rounded-l-xl sm:rounded-r-none w-full sm:w-auto">
              <p className="text-gray-700 font-medium">Ready to start your spiritual journey?</p>
              <p className="text-orange-600 text-sm">Join 10,000+ happy pilgrims</p>
            </div>
            <button 
              onClick={() => setOpen(true)}
              className="text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors w-full sm:w-auto cursor-pointer"
            >
              Book Your Yatra Now →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
    </>
   
  );
}
