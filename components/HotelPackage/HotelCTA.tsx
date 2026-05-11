"use client";

import { motion } from "framer-motion";
import { Sparkles, Phone, MessageCircle } from "lucide-react";

export default function HotelCTA() {
  return (
    <section className="py-28 relative overflow-hidden">

      {/* BACKGROUND GRADIENT */}

      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-500 to-orange-600 opacity-95" />

      {/* GLOW EFFECT */}

      <div className="absolute w-[600px] h-[600px] bg-amber-400 rounded-full blur-[140px] opacity-30 -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-orange-400 rounded-full blur-[140px] opacity-30 bottom-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6 text-center text-white">

        {/* ICON */}

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex justify-center mb-6"
        >
          <Sparkles size={40} />
        </motion.div>

        {/* HEADING */}

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Ready for a Divine Stay in Vrindavan?
        </motion.h2>

        {/* SUBTEXT */}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg opacity-90"
        >
          Experience peaceful stays near the sacred temples of Vrindavan.
          Book your hotel today and enjoy a comfortable spiritual journey
          with exclusive packages and guided temple tours.
        </motion.p>

        {/* CTA BUTTONS */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6 mt-10"
        >

          {/* PRIMARY BUTTON */}

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-amber-600 font-semibold px-8 py-4 rounded-xl shadow-xl flex items-center gap-2 justify-center"
          >
            Book Your Stay
          </motion.button>

          {/* WHATSAPP BUTTON */}

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white px-8 py-4 rounded-xl flex items-center gap-2 justify-center"
          >
            <MessageCircle size={18} />
            Quick WhatsApp Enquiry
          </motion.button>

        </motion.div>

        {/* TRUST TEXT */}

        <p className="mt-8 text-sm opacity-80">
          Trusted by 10,000+ travellers visiting Mathura & Vrindavan every year
        </p>

      </div>
    </section>
  );
}