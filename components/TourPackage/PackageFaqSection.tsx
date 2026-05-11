"use client";

import { ChevronDown } from "lucide-react";

interface PackageFAQ {
  question: string;
  answer: string;
}

export default function PackageFaqSection({
  PackageData,
}: {
  PackageData: { faqs: PackageFAQ[] };
}) {
  return (
    <section className="py-10 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">

        {/* HEADER */}
        <div className="md:mb-16">
          <h2 className="text-3xl md:text-4xl text-center md:text-start font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-gray-600 text-center md:text-start max-w-2xl leading-relaxed">
            Clear answers to common questions about this tour package,
            so you can plan your Mathura–Vrindavan yatra with confidence.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="divide-y divide-orange-100">

          {PackageData.faqs.map((faq, index) => (
            <details
              key={index}
              className="group py-8"
            >
              <summary className="list-none flex items-center justify-between cursor-pointer gap-6">

                <h3 className="text-lg font-medium text-gray-900 leading-snug">
                  {faq.question}
                </h3>

                <ChevronDown
                  className="w-5 h-5 text-[#A84010] transition-transform duration-300 group-open:rotate-180"
                />
              </summary>

              <div className="mt-6 pl-6 border-l-2 border-orange-200">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}

        </div>
      </div>
    </section>
  );
}