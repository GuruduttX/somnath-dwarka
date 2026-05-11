"use client";
import { useState } from "react";

interface FAQSI  {id : string, question : string, answer : string}

export default function PoojaFAQ({faqs}: { faqs : FAQSI[]}) {
 

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-20 px-0 md:px-6 bg-white">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-7 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600">
            Find answers to common questions about booking and performing pooja
            in Mathura and Vrindavan.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">

          {faqs.map((faq : any, index : number) => (
            <div
              key={index}
              className="border border-amber-100 rounded-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left font-medium"
              >
                <span>{faq.question}</span>

                <span className="text-amber-500 text-xl">
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}