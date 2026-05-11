"use client";

import { useState } from "react";
import { IFAQ } from "@/types/hotelTypes";

export default function FAQSection({faqs} : {faqs : IFAQ[]}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-10 md:py-20 px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-400"></div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq : any, index : number) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-300 ${
                  isActive
                    ? "border-amber-500 shadow-md shadow-amber-100"
                    : "border-gray-200"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-gray-800">
                    {faq.question}
                  </span>

                  {/* Plus Icon */}
                  <span
                    className={`text-amber-600 text-xl font-bold transition-transform duration-300 ${
                      isActive ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}