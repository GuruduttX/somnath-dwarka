"use client";

import { useState } from "react";
import {
  ChevronDown,
  Sparkles,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

const faqs = [
  {
    question: "Which are the most popular Gujarat spiritual tours?",
    answer:
      "Dwarka Somnath Yatra, Somnath Jyotirlinga Tour, Nageshwar Darshan and Statue of Unity spiritual journeys are among our most loved Gujarat experiences.",
  },

  {
    question: "Do you provide complete Dwarka Somnath packages?",
    answer:
      "Yes, we provide complete packages including hotel stays, private transportation, sightseeing, temple visits and personalized travel assistance.",
  },

  {
    question: "Can I customize my Gujarat tour package?",
    answer:
      "Absolutely. You can customize your itinerary, hotel category, transport type, travel duration and sightseeing preferences according to your needs.",
  },

  {
    question: "Are your tour packages suitable for families and senior citizens?",
    answer:
      "Yes, our tours are carefully planned for families and senior citizens with comfortable stays, flexible schedules and smooth travel arrangements.",
  },

  {
    question: "Which is the best time to visit Dwarka and Somnath?",
    answer:
      "October to March is considered the ideal time due to pleasant weather and peaceful temple experiences during the spiritual season.",
  },

  {
    question: "Do you provide private cab and driver services?",
    answer:
      "Yes, we offer premium private cab services with experienced local drivers for safe and comfortable Gujarat journeys.",
  },
];

export default function HomeFaqSection() {
  const [active, setActive] = useState<number | null>(0);
  const [open, setOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <>
      <CommonEnquiryForm 
        open={open} 
        onClose={() => setOpen(false)} 
        defaultService="Tour Package" 
      />
    <section className="relative overflow-hidden bg-[#FCFBF8] py-20 md:py-28">
      
      {/* SOFT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-orange-100/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          
          {/* BADGE */}
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-stone-200
              bg-white
              px-4 py-2
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-orange-600
              shadow-sm
            "
          >
            <Sparkles size={13} />
            Frequently Asked Questions
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-6
              text-3xl
              font-bold
              leading-[1.08]
              tracking-tight
              text-slate-900
              md:text-4xl
              lg:text-5xl
            "
          >
            Everything About Your
            <br />
            Gujarat Spiritual Journey
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mx-auto mt-6
              max-w-2xl
              text-[15px]
              leading-8
              text-slate-600
              md:text-[17px]
            "
          >
            Discover answers to the most common questions
            about Dwarka, Somnath, Gujarat tour packages,
            hotels, transport and spiritual journeys.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
          
          {/* FAQS */}
          <div className="space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = active === index;

              return (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-[28px]
                    border border-stone-200
                    bg-white/90
                    shadow-[0_10px_35px_rgba(0,0,0,0.04)]
                    backdrop-blur-sm
                    transition-all duration-300
                    hover:border-stone-300
                  "
                >
                  
                  {/* QUESTION */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="
                      flex w-full cursor-pointer
                      items-start justify-between gap-5
                      px-6 py-6 text-left
                      md:px-7
                    "
                  >
                    
                    <h3
                      className="
                        text-[17px]
                        font-semibold
                        leading-8
                        text-slate-900
                        md:text-[18px]
                      "
                    >
                      {faq.question}
                    </h3>

                    {/* ICON */}
                    <div
                      className={`
                        mt-1
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-full
                        transition-all duration-300
                        ${
                          isOpen
                            ? "rotate-180 bg-orange-600 text-white"
                            : "bg-stone-100 text-slate-700"
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
                        
                        <div className="h-px w-full bg-gradient-to-r from-stone-200 via-stone-100 to-transparent" />

                        <p
                          className="
                            pt-5
                            text-[15px]
                            leading-8
                            text-slate-600
                          "
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT CTA */}
          <div className="lg:sticky lg:top-28 h-fit">
            
            <div
              className="
                relative overflow-hidden
                rounded-[32px]
                border border-orange-100
                bg-gradient-to-br
                from-orange-500
                via-orange-600
                to-orange-700
                p-8 md:p-10
                text-white
                shadow-[0_25px_60px_rgba(249,115,22,0.22)]
              "
            >
              
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

              <div className="relative">
                
                {/* ICON */}
                <div
                  className="
                    flex h-14 w-14
                    items-center justify-center
                    rounded-full
                    bg-white/15
                    backdrop-blur-sm
                  "
                >
                  <PhoneCall size={24} />
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-3xl font-bold leading-tight">
                  Need Help Planning
                  <br />
                  Your Journey?
                </h3>

                {/* TEXT */}
                <p className="mt-5 text-[15px] leading-8 text-orange-50/90">
                  Our Gujarat travel experts are ready to help
                  you create a peaceful and comfortable
                  spiritual experience across Dwarka,
                  Somnath and beyond.
                </p>

                {/* FEATURES */}
                <div className="mt-8 space-y-3">
                  
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-medium">
                      Trusted Spiritual Travel Assistance
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <ShieldCheck size={18} />
                    <span className="text-sm font-medium">
                      Personalized Gujarat Tour Planning
                    </span>
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => setOpen(true)}
                  className="
                    mt-8
                    flex w-full cursor-pointer
                    items-center justify-center
                    rounded-2xl
                    bg-white
                    px-6 py-4
                    text-sm font-semibold
                    text-orange-600
                    transition-all duration-300
                    hover:bg-orange-50
                  "
                >
                  Contact Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}