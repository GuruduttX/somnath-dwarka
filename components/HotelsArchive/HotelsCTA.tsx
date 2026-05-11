"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import Link from "next/link";

export default function HotelsCTA() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="py-8 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="
            relative
            grid
            lg:grid-cols-2
            gap-8 lg:gap-12
            items-center
            bg-white
            rounded-3xl
            shadow-xl
            border border-gray-100
            p-6 md:p-10
            overflow-hidden
            "
          >
            {/* subtle glow */}

            <div className="absolute -top-16 left-0 w-[260px] h-[260px] bg-amber-400/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[260px] h-[260px] bg-orange-400/20 blur-[120px] rounded-full"></div>

            {/* LEFT TEXT */}

            <div className="relative text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Find Your
                <span
                  className="
                  block
                  bg-gradient-to-r
                  from-amber-600
                  via-amber-600
                  to-orange-600
                  bg-clip-text
                  text-transparent
                  "
                >
                  Perfect Stay
                </span>
                in Vrindavan
              </h2>

              <p className="text-gray-600 mt-4 md:mt-5 max-w-md mx-auto lg:mx-0">
                Relax in peaceful hotels near temples and enjoy a comfortable
                spiritual journey in Vrindavan.
              </p>

              {/* buttons */}

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
                <Link
                  href="#hotel-browse"
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("hotel-browse");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="
                    px-7
                    py-3
                    rounded-full
                    text-white
                    font-medium
                    bg-gradient-to-r
                    from-amber-500
                    via-amber-500
                    to-orange-600
                    shadow-lg
                    flex items-center gap-2
                    "
                  >
                    Browse Hotels
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="
                    px-7
                    py-3
                    rounded-full
                    border
                    border-amber-500
                    text-amber-600
                    hover:bg-amber-50
                    transition
                    flex items-center gap-2
                    "
                  onClick={() => setIsFormOpen(true)}
                >
                  Enquire Now
                  <Phone size={18} />
                </motion.button>
              </div>
            </div>

            {/* RIGHT HOTEL PREVIEW CARD */}

            <motion.div
              whileHover={{ y: -8 }}
              className="
                hidden lg:block
                relative
                rounded-3xl
                overflow-hidden
                shadow-lg
                h-[260px]
                "
            >
              <Image
                src="/images/Home/hotel.webp"
                alt="Hotel Vrindavan"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* rating */}

              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg shadow flex items-center gap-1 text-sm">
                <Star size={14} className="text-yellow-500" />
                4.6
              </div>

              {/* text */}

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">Radha Palace Hotel</h3>

                <p className="text-sm opacity-90">Near Prem Mandir</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 3. The Form Component */}
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Hotel Booking" // Pre-selects this in the dropdown
      />
    </>
  );
}
