"use client";

import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import { useState } from "react";

export default function PoojaBenefits() {
  const [open, setOpen] = useState(false);

  const benefits = [
    {
      title: "Spiritual Peace",
      desc: "Performing pooja in the holy land of Mathura and Vrindavan brings inner peace and spiritual harmony.",
      icon: "🕉️",
      accent: "from-amber-500 to-orange-400",
      soft: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-600",
    },
    {
      title: "Divine Blessings",
      desc: "Seek blessings from Lord Krishna and other deities through sacred rituals performed by experienced priests.",
      icon: "🙏",
      accent: "from-orange-500 to-amber-400",
      soft: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-600",
    },
    {
      title: "Positive Energy",
      desc: "Poojas help remove negative energies and invite positivity, prosperity, and happiness into life.",
      icon: "✨",
      accent: "from-amber-400 to-orange-400",
      soft: "bg-fuchsia-50",
      border: "border-orange-100",
      text: "text-amber-600",
    },
    {
      title: "Family Wellbeing",
      desc: "Special poojas are performed for health, success, prosperity, and overall wellbeing of your family.",
      icon: "🏵️",
      accent: "from-amber-600 to-orange-500",
      soft: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-700",
    },
  ];

  return (
    <>
      <CommonEnquiryForm
        open={open}
        onClose={() => setOpen(false)}
        defaultService="Pooja"
      />

      <section className="py-10 mb-8 md:py-24 px-6 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#FFFBEA_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#FFFBEA_0%,_transparent_60%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              <span className="text-amber-600 text-xs font-semibold uppercase tracking-widest">
                Why Perform Pooja
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Benefits of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                Performing Pooja
              </span>
            </h2>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-5">
              <div className="h-px w-10 bg-amber-200 rounded-full" />
              <div className="h-0.5 w-16 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
              <div className="h-px w-10 bg-amber-200 rounded-full" />
            </div>

            <p className="text-gray-500 max-w-xl mx-auto text-[15px] leading-relaxed">
              Performing sacred poojas in Mathura and Vrindavan helps devotees
              connect spiritually and receive divine blessings from Lord
              Krishna.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {benefits.map((item, index) => (
              <div
                key={index}
                className={`group relative flex-none w-[85vw] max-w-[320px] md:w-auto md:max-w-none snap-center md:snap-align-none bg-white rounded-2xl border ${item.border} p-7
                shadow-sm hover:shadow-xl hover:shadow-amber-100 
                hover:-translate-y-1.5 transition-all duration-300 cursor-default overflow-hidden`}
              >
                {/* Top gradient bar */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r ${item.accent}`}
                />

                {/* Soft background on hover */}
                <div
                  className={`absolute inset-0 ${item.soft} opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl`}
                />

                <div className="relative z-10 flex flex-col gap-4">
                  {/* Icon tile */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.soft} border ${item.border} flex items-center justify-center text-2xl
                  group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>

                  {/* Index number */}
                  <span
                    className={`text-xs font-bold ${item.text} uppercase tracking-widest`}
                  >
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className={`h-px w-10 bg-gradient-to-r ${item.accent} rounded-full`}
                  />

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4
          bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100
          rounded-2xl px-2 py-2 md:px-8 md:py-7"
          >
            <div className="text-center sm:text-left">
              <p className="text-gray-900 font-bold text-lg">
                Ready to begin your spiritual journey?
              </p>
              <p className="text-gray-500 text-sm mt-0.5">
                Book a pooja today with our certified pandits.
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="shrink-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
            bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm
            shadow-[0_4px_20px_#E17100]
            hover:shadow-[0_6px_28px_#E17100] hover:scale-[1.03]
            active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Book a Pooja Now
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                →
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
