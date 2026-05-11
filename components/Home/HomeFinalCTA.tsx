"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import TourEnquiryPopup from "@/utils/TourEnquiryPopUp";
import { useState } from "react";
import Link from "next/link";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";

export default function FinalCTA() {
  const [open , setOpen] = useState(false);

  return (
    <>
      <CommonEnquiryForm open={open} onClose={()=>setOpen(false)}/>
      <section className="py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="
          relative
          grid
          lg:grid-cols-2
          gap-14
          items-center
          rounded-3xl
          p-10
          bg-white
          shadow-2xl
          border border-gray-100
          overflow-hidden
        "
          >
            {/* glow accents */}

            <div className="absolute -top-20 left-[-100px] w-[300px] h-[300px] bg-amber-400/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-orange-400/20 blur-[120px] rounded-full"></div>

            {/* LEFT IMAGE */}

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[260px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/Home/prem-mandir.jpg"
                  alt="Vrindavan Tour"
                  fill
                  loading="lazy"
                  className="object-cover"
                />

                {/* overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* price badge */}

                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-xl shadow">
                  <p className="text-xs text-gray-500">Tours starting from</p>

                  <p className="text-lg font-semibold text-amber-600">
                    ₹4,999 / person
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT CONTENT */}

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-center">
                Begin Your
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
                  Divine Vrindavan Journey
                </span>
              </h2>

              <p className="text-gray-600 mt-5 max-w-md">
                Explore sacred temples, spiritual tours, comfortable taxis and
                peaceful hotels with trusted local guides.
              </p>

              {/* buttons */}

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="tour-packages" className="items-center min-w-full">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="
                px-7
                py-3
                w-full
                rounded-full
                text-white
                font-medium
                flex items-center gap-2
                justify-center
                bg-gradient-to-r
                from-amber-500
                via-amber-500
                to-orange-600
                shadow-lg
                cursor-pointer
                "
                  >
                    Explore Tours
                    <ArrowRight size={18} />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="
                  px-7
                  py-3
                  rounded-full
                  w-full
                  border
                  border-amber-500
                  text-amber-600
                  flex items-center gap-2
                  justify-center
                  hover:bg-amber-50
                  transition
                  cursor-pointer
                "
                onClick={()=>setOpen(true)}
                >
                  Talk to Guide
                  <Phone size={18} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}