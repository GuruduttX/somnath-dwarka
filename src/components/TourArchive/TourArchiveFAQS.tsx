"use client";

import { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  Phone,
} from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

const faqs = [
  {
    question: "What is included in the Dwarka Somnath tour package?",
    answer:
      "Our packages typically include hotel stay, private transportation, temple sightseeing, driver assistance, and guided spiritual experiences across Dwarka and Somnath.",
  },

  {
    question: "How many days are ideal for Dwarka Somnath darshan?",
    answer:
      "A 4 to 6 day journey is ideal to comfortably explore Dwarkadhish Temple, Somnath Jyotirlinga, Bet Dwarka, Nageshwar Temple and nearby spiritual destinations.",
  },

  {
    question: "Do you provide private cab services for the tour?",
    answer:
      "Yes, we provide premium private cab services with experienced drivers for smooth and comfortable spiritual journeys across Gujarat.",
  },

  {
    question: "Can senior citizens comfortably join this pilgrimage?",
    answer:
      "Absolutely. Our packages are designed to be senior citizen friendly with comfortable stays, flexible travel pace and personalized assistance.",
  },

  {
    question: "Which is the best time to visit Dwarka and Somnath?",
    answer:
      "October to March is considered the best time due to pleasant weather and peaceful temple experiences during the spiritual season.",
  },

  {
    question: "Can I customize my Dwarka Somnath package?",
    answer:
      "Yes, we offer fully customizable spiritual journeys based on your duration, hotel preference, transport needs and temple itinerary.",
  },
];

export default function TourArchiveFAQ() {
  const [active, setActive] = useState<number | null>(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <>
      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Tour Package"
      />
    <section className="relative overflow-hidden  py-20 md:py-28">
      
      {/* TOP GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-orange-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm">
            <Sparkles size={13} />
            Frequently Asked Questions
          </div>

          {/* TITLE */}
          <h2 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900  leading-[1.05]">
            Everything About Your
            <br />
            Divine Gujarat Journey
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-slate-600 md:text-[17px]">
            Find answers to the most common questions about
            Dwarka Somnath tours, spiritual journeys, temple
            darshan and Gujarat pilgrimage experiences.
          </p>
        </div>

        {/* FAQ GRID */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={index}
                className="
                  group
                  overflow-hidden
                  rounded-[28px]
                  border border-orange-100
                  bg-white/90
                  backdrop-blur-sm
                  shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                  transition-all duration-300
                  hover:border-orange-200
                "
              >
                
                {/* BUTTON */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="
                    flex w-full items-start justify-between gap-5 cursor-pointer
                    px-6 py-6 text-left md:px-7
                  "
                >
                  
                  {/* QUESTION */}
                  <h3
                    className={`
                      text-[17px] md:text-[18px]
                      font-semibold
                      leading-8
                      transition-colors duration-300
                      ${
                        isOpen
                          ? "text-orange-600"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {faq.question}
                  </h3>

                  {/* ICON */}
                  <div
                    className={`
                      mt-1
                      flex h-10 w-10 shrink-0 items-center justify-center
                      rounded-full
                      transition-all duration-300
                      ${
                        isOpen
                          ? "bg-orange-500 text-white rotate-180"
                          : "bg-orange-50 text-orange-500"
                      }
                    `}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`
                    grid transition-all duration-500 ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-7">
                      
                      <div className="h-px w-full bg-gradient-to-r from-orange-100 via-orange-200 to-transparent" />

                      <p className="pt-5 text-[15px] leading-8 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-14 flex justify-center">
          
          <div
            className="
              flex flex-col items-center justify-center
              rounded-[30px]
              border border-orange-100
              bg-white/90
              px-8 py-8 text-center
              shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              backdrop-blur-sm
              md:px-12
            "
          >
            
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Phone size={24} />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Still Have Questions?
            </h3>

            <p className="mt-3 max-w-lg text-[15px] leading-7 text-slate-600">
              Our spiritual travel experts are here to help
              you plan a peaceful and comfortable Dwarka
              Somnath pilgrimage.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsFormOpen(true)}
                className="
                  inline-flex items-center justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-orange-500
                  to-orange-600
                  px-7 py-3.5
                  text-sm font-semibold text-white
                  shadow-[0_10px_30px_rgba(249,115,22,0.25)]
                  transition-all duration-300
                  hover:from-orange-600
                  hover:to-orange-700
                  cursor-pointer
                "
              >
                Contact Us Now
              </button>
              <a
                href="https://wa.me/917302265809"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full
                  border border-orange-200
                  bg-white
                  px-7 py-3.5
                  text-sm font-semibold text-orange-600
                  transition-all duration-300
                  hover:bg-orange-50
                  cursor-pointer
                "
              >
                <Phone size={16} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}