"use client";

import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function BookDarshanCTA() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  return (
    <section className="relative py-12 md:py-16 overflow-hidden bg-[#FFF9F2]">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-orange-200/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        
        {/* CONTAINER */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-br
            from-[#F97316]
            via-[#EA580C]
            to-[#C2410C]
            shadow-[0_25px_80px_rgba(234,88,12,0.25)]
          "
        >
          
          {/* OVERLAY */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

          {/* CONTENT */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            
            {/* LEFT SIDE */}
            <div className="relative px-6 py-10 sm:px-10 md:px-12 md:py-12 lg:py-14 flex flex-col justify-center">
              
              {/* TOP BADGE */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 w-fit">
                <Sparkles size={13} />
                Divine Dwarka Experience
              </div>

              {/* HEADING */}
              <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Book Your
                <br />
                Sacred Darshan
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-6 max-w-xl text-[15px] md:text-[17px] leading-8 text-orange-50/90">
                Experience peaceful temple darshan, premium
                spiritual stays and divine Gujarat journeys
                crafted with comfort, devotion and care.
              </p>

              {/* FEATURES */}
              <div className="mt-8 flex flex-wrap gap-3">
                
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                  <ShieldCheck size={16} />
                  Trusted Travel Partner
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
                  <Phone size={16} />
                  Instant Assistance
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex items-center justify-center px-5 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-12">
              
              {/* FORM CARD */}
              <div
                className="
                  w-full max-w-md
                  rounded-[30px]
                  bg-white
                  p-6 md:p-8
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                "
              >
                
                {/* TITLE */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-500">
                    Quick Enquiry
                  </p>

                  <h3 className="mt-2 text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                    Plan Your {" "}
                    <span className="text-orange-600">Divine</span>
                     {"  "} Journey {" "}
                  </h3>

                
                </div>

                {/* FORM */}
                <form className="mt-6 space-y-4">
                  
                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="
                        h-12 w-full
                        rounded-2xl
                        border border-stone-200
                        bg-[#FFFDF9]
                        px-5
                        text-[15px]
                        text-slate-800
                        outline-none
                        transition-all duration-300
                        placeholder:text-slate-400
                        focus:border-orange-400
                        focus:ring-4
                        focus:ring-orange-100
                      "
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="
                        h-12 w-full
                        rounded-2xl
                        border border-stone-200
                        bg-[#FFFDF9]
                        px-5
                        text-[15px]
                        text-slate-800
                        outline-none
                        transition-all duration-300
                        placeholder:text-slate-400
                        focus:border-orange-400
                        focus:ring-4
                        focus:ring-orange-100
                      "
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    className="
                      group
                      mt-1
                      flex h-12 w-full
                      items-center justify-center gap-2
                      rounded-2xl
                      bg-gradient-to-r
                      from-orange-500
                      to-orange-600
                      text-[15px]
                      font-semibold
                      text-white
                      shadow-[0_12px_30px_rgba(249,115,22,0.28)]
                      transition-all duration-300
                      hover:from-orange-600
                      hover:to-orange-700
                    "
                  >
                    Book Darshan

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </form>

                {/* FOOT NOTE */}
                <p className="mt-5 text-center text-xs leading-6 text-slate-400">
                  By submitting this form you agree to receive
                  tour assistance and booking updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}