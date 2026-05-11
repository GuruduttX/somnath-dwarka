"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Phone, CarTaxiFront, ShieldCheck, Clock, Star } from "lucide-react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";

export default function TaxiNewCTA() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="relative py-10 md:py-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

        {/* Glow blobs */}
        {/* <div className="absolute -top-20 left-0 w-[350px] h-[350px] bg-orange-400/25 blur-[140px] rounded-full" /> */}
        {/* <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-amber-400/25 blur-[140px] rounded-full" /> */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
            {/* ── LEFT CONTENT ── */}
            <div className="text-center md:text-start min-w-0 w-full overflow-hidden">
              <h2 className="text-xl md:text-4xl font-bold leading-tight">
                Ready to Travel with
                <span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-amber-600 bg-clip-text text-transparent">
                  Reliable Taxi Services?
                </span>
              </h2>

              <p className="text-gray-600 mt-4 max-w-md mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
                Enjoy safe and comfortable rides across Vrindavan, Mathura,
                Govardhan and nearby destinations with our trusted drivers and
                well-maintained taxis.
              </p>

              {/* Trust points — horizontal scroll on mobile, 2-col grid on desktop */}
              {/* Outer wrapper clips the scroll so it never bleeds outside the card */}
              <div className="mt-7 md:mt-8 w-full overflow-hidden">
                <div className="flex md:grid md:grid-cols-2 gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0 w-full">
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 bg-orange-50 md:bg-transparent border border-orange-100 md:border-0 rounded-full md:rounded-none px-4 md:px-0 py-2 md:py-0 shrink-0">
                    <ShieldCheck
                      size={16}
                      className="text-orange-600 shrink-0"
                    />
                    Verified Drivers
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 bg-orange-50 md:bg-transparent border border-orange-100 md:border-0 rounded-full md:rounded-none px-4 md:px-0 py-2 md:py-0 shrink-0">
                    <Clock size={16} className="text-orange-600 shrink-0" />
                    On-Time Pickup
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 bg-orange-50 md:bg-transparent border border-orange-100 md:border-0 rounded-full md:rounded-none px-4 md:px-0 py-2 md:py-0 shrink-0">
                    <Star size={16} className="text-orange-600 shrink-0" />
                    4.8 Customer Rating
                  </div>
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600 bg-orange-50 md:bg-transparent border border-orange-100 md:border-0 rounded-full md:rounded-none px-4 md:px-0 py-2 md:py-0 shrink-0">
                    <CarTaxiFront
                      size={16}
                      className="text-orange-600 shrink-0"
                    />
                    Clean AC Cars
                  </div>
                </div>
              </div>

              {/* Buttons — always single row */}
              <div className="flex flex-col md:flex-row gap-3 mt-8 md:mt-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsFormOpen(true)}
                  className="flex-1 md:flex-none px-5 md:px-7 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 shadow-lg whitespace-nowrap cursor-pointer text-sm"
                >
                  <CarTaxiFront size={16} />
                  Book Your Ride
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 md:flex-none px-5 md:px-7 py-3 rounded-full border border-orange-500 text-orange-600 flex items-center justify-center gap-2 hover:bg-orange-50 cursor-pointer text-sm whitespace-nowrap"
                >
                  <Phone size={16} />
                  Call Driver
                </motion.button>
              </div>
            </div>

            {/* ── RIGHT VISUAL ── */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="relative h-[360px] hidden md:block"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/Home/taxi-home.webp"
                  alt="Taxi Ride"
                  fill
                  sizes="(max-width: 1024px) 0px, 50vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating price card */}
              <div className="absolute bottom-6 right-6 bg-white shadow-xl rounded-2xl px-5 py-3">
                <p className="text-xs text-gray-500">Starting Fare</p>
                <p className="text-lg font-semibold text-orange-600">
                  ₹799 / trip
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Taxi Booking"
      />
    </>
  );
}
