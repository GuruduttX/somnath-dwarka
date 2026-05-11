"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Can I customize my Mathura Vrindavan tour package?",
    answer:
      "Yes, we provide fully customizable tour packages including hotel selection, temple visits, private transfers, and pooja arrangements tailored to your preferences.",
  },
  {
    question: "Do you arrange Delhi to Mathura transportation?",
    answer:
      "Yes, we offer comfortable AC taxi transfers from Delhi, Agra, and nearby cities with professional drivers.",
  },
  {
    question: "Are hotels included in your packages?",
    answer:
      "Our packages include verified hotel accommodations ranging from budget to premium categories.",
  },
  {
    question: "Can you arrange VIP darshan or temple pooja?",
    answer:
      "Yes, we coordinate advance temple pooja bookings and VIP darshan arrangements for a seamless spiritual experience.",
  },
  {
    question: "What is the ideal time to visit Mathura Vrindavan?",
    answer:
      "October to March offers pleasant weather. Festival seasons like Holi and Janmashtami require advance booking due to high demand.",
  },
];

export default function TourFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-32 px-4 sm:px-6 md:px-10 lg:px-20 border-t border-amber-100/80">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-20">
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mx-auto mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-l-4 border-amber-500 pl-4 sm:pl-6"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left cursor-pointer"
              >
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}