"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, MapPin, Sparkles, ArrowRight } from "lucide-react";
import TourEnquiryPopup from "@/src/utils/TourEnquiryPopUp";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

const features = [
  { icon: MapPin, label: "Prime Temple Locations" },
  { icon: CalendarCheck, label: "Easy & Flexible Booking" },
  { icon: Sparkles, label: "Comfortable Spiritual Stay" },
];

export default function HotelCTA() {
  const [open, setOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <TourEnquiryPopup open={open} onClose={() => setOpen(false)} />
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Hotel Booking"
      />

      <section id="hotel-cta" className="py-10 md:py-16 px-4 sm:px-6 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 shadow-xl shadow-amber-300/30"
          >
            {/* Dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* Orbs */}
            <div className="absolute -top-14 -left-14 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-10 right-20 w-44 h-44 rounded-full bg-white/[0.06] pointer-events-none" />

            <div className="relative px-8 md:px-16 py-12 md:py-14 text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase mb-5">
                <Sparkles size={10} className="opacity-80" />
                Vrindavan Hotel Booking
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
                Plan Your Peaceful Stay
                <br className="hidden md:block" /> in Vrindavan
              </h2>

              <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
                Carefully selected hotels near sacred temples — ensuring a
                relaxing and spiritual environment for every pilgrim and
                traveller.
              </p>

              {/* Features */}
              <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-3 mb-10 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-hide">
                {features.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex-shrink-0 flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-medium text-white/90"
                  >
                    <Icon size={14} className="text-yellow-200" />
                    {label}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-amber-700 font-bold text-sm shadow-lg shadow-black/15 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Book Your Stay Now
                <ArrowRight size={15} />
              </motion.button>

              {/* Trust note */}
              <p className="mt-4 text-white text-xs">
                Free cancellation · No booking fees
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}