"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

interface PackageFAQ {
  question: string;
  answer: string;
}

export default function PackageFaqSection({
  PackageData,
}: {
  PackageData: { faqs: PackageFAQ[] };
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-10 md:py-16 bg-white px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 text-[11px] font-medium text-orange-700 uppercase tracking-wider mb-4">
            <HelpCircle className="w-3 h-3" />
            Got questions?
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl">
            Clear answers to common questions about this tour — so you can plan
            your yatra with full confidence.
          </p>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-2.5">
          {PackageData.faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? "border-orange-400 bg-white"
                    : "border-orange-100 bg-white hover:border-orange-200"
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:py-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-medium text-gray-900 leading-snug flex-1">
                    {faq.question}
                  </span>

                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-orange-500 border-orange-500"
                        : "bg-orange-50 border-orange-200"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-white" : "text-orange-500"
                      }`}
                    />
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <p className="text-[11px] font-medium text-orange-400 tracking-wide mb-2">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed border-l-2 border-orange-200 pl-4">
                        {faq.answer}
                      </p>
                    </div>
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