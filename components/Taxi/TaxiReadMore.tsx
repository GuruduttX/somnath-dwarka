"use client"

import { useState } from "react"
import { ChevronDown, MapPin, CarTaxiFront, ShieldCheck } from "lucide-react"

export default function TaxiReadMore() {

  const [expanded, setExpanded] = useState(false)

  return (
    <section className="relative py-10 md:py-24 overflow-hidden bg-gradient-to-b from-white via-amber-50 to-white">
      

      {/* Soft Grid */}
      <div
        className="absolute inset-0 
      bg-[linear-gradient(to_right,#ec489910_1px,transparent_1px),linear-gradient(to_bottom,#ec489910_1px,transparent_1px)]
      bg-[size:70px_70px]
      opacity-30"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-amber-600 font-medium tracking-widest uppercase mb-4 text-sm md:text-lg">
            Vrindavan Divine Taxi Service
          </p>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
            Explore Sacred
            <span className="text-amber-600"> Mathura & Vrindavan </span>
            with Comfortable Taxi Services
          </h2>

        </div>

        {/* Main Card */}
        <div className="mt-8 md:mt-16 bg-white/80 backdrop-blur-xl border border-amber-400 shadow-[0_20px_60px_rgba(235, 141, 27)] rounded-3xl p-10 md:p-14">
          {/* Intro Text */}
          <p className="text-gray-700 text-center leading-relaxed text-sm md:text-lg">
            Mathura and Vrindavan are among the most sacred destinations in
            India, where thousands of devotees arrive every day to experience
            the divine presence of Lord Krishna. Visiting temples, ghats, and
            spiritual sites across Braj requires comfortable and reliable
            transportation.
            {!expanded && "..."}
          </p>

          {expanded && (
            <div className="mt-6 space-y-5 text-center text-gray-700 text-sm md:text-lg leading-relaxed">
              <p>
                Our taxi services in Mathura and Vrindavan are specially
                designed for pilgrims and travelers who want a smooth and
                peaceful journey. Whether you wish to visit the famous Banke
                Bihari Temple, Prem Mandir, ISKCON Vrindavan, Govardhan,
                Barsana, or Nandgaon, our professional drivers help you travel
                comfortably across every sacred location in Braj.
              </p>

              <p>
                We provide clean vehicles, experienced local drivers, and
                flexible travel plans that allow you to focus on your spiritual
                experience while we handle the transportation. From short temple
                visits to complete Braj Darshan tours, our taxi services ensure
                that your journey remains safe, relaxing, and memorable.
              </p>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5 md:mt-12">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <MapPin className="text-amber-600" size={20} />
              <span className="text-gray-700 font-medium text-sm md:text-md">
                Temple Tours & Braj Darshan
              </span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <CarTaxiFront className="text-amber-600" size={20} />
              <span className="text-gray-700 font-medium text-sm md:text-md">
                Comfortable Local Taxi
              </span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <ShieldCheck className="text-amber-600" size={20} />
              <span className="text-gray-700 font-medium text-sm md:text-md">
                Safe & Trusted Drivers
              </span>
            </div>
          </div>

          {/* Read More Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg shadow-amber-400/40 transition cursor-pointer"
            >
              {expanded ? "Read Less" : "Read More"}
              <ChevronDown
                size={18}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}