"use client"

import { useState } from "react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";


export default function PoojaCTASection() {
  const  [open, setOpen] = useState(false);
  return (
    <>
      <CommonEnquiryForm open={open} onClose={()=>setOpen(true)}/>
      <section className="relative py-12 md:py-14 bg-gradient-to-r from-amber-600 to-orange-500 overflow-hidden">

      {/* Top Wave */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 C240,0 1200,0 1440,64 L1440,0 L0,0 Z"
          fill="white"
          opacity="0.15"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-12">

          {/* Left Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-5 md:mb-6">
              Preserve the Divine Moments
            </h2>

            <p className="text-amber-100 mb-6 md:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
              Explore sacred ceremonies and spiritual events conducted with
              devotion and tradition. Revisit divine blessings anytime.
            </p>

            <button onClick={()=>setOpen(true)} className="bg-white cursor-pointer text-amber-600 px-6 sm:px-7 md:px-8 py-3 rounded-full font-medium text-sm sm:text-base hover:bg-amber-100 transition mx-auto md:mx-0">
              Browse All Poojas
            </button>
          </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-[240px] h-[190px] sm:w-[280px] sm:h-[220px] md:w-[480px] md:h-[420px]">

            {/* Gradient Border Frame */}
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-amber-500 to-orange-400">
              <div className="w-full h-full rounded-2xl bg-white"></div>
            </div>

            {/* Image */}
            <img
              src="/images/pooja/pooja-image.webp"
              alt="Pooja Ritual"
              className="absolute inset-[6px] w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>


        </div>
      </div>

      {/* Bottom Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,36 C240,100 1200,100 1440,36 L1440,100 L0,100 Z"
          fill="white"
          opacity="0.15"
        />
      </svg>

    </section>
    </>
    
  );
}