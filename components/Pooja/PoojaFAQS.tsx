"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

const FAQS = [
  {
    question: "What is included in the pooja packages?",
    answer:
      "Pandit services, pooja samagri, temple arrangements, and complete ritual guidance are included.",
  },
  {
    question: "Can I customize my pooja package?",
    answer:
      "Yes, you can fully customize pooja type, timing, and additional services.",
  },
  {
    question: "Do you provide online pooja services?",
    answer:
      "Yes, we offer live-streamed pooja so you can attend from anywhere.",
  },
  {
    question: "Are your pandits verified?",
    answer:
      "All pandits are highly experienced and verified in Vedic rituals.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before scheduled pooja.",
  },
];

export default function PoojaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative max-w-6xl mx-auto px-3 sm:px-4 py-16 md:py-20">

      {/* 🌟 subtle glow only (not overpowering) */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200/40 blur-3xl rounded-full"></div>

      {/* Container */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-orange-100">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Pooja FAQs
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need to know before booking
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="group rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-left"
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    {/* ICON with accent */}
                    <div className="p-2 rounded-lg bg-orange-100 group-hover:bg-orange-200 transition cursor-p">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                    </div>

                    <span className="text-gray-800 font-medium cursor-pointer">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`px-4 sm:px-5 text-gray-600 cursor-pointer text-sm transition-all duration-400 ${
                    isOpen
                      ? "max-h-40 opacity-100 pb-5"
                      : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}