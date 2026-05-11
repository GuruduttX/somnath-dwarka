"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How can I book a taxi in Mathura and Vrindavan?",
    answer:
      "You can easily book a taxi through our website by filling the booking form with your pickup and drop location. Our team will confirm your ride and assign a professional driver for your journey."
  },
  {
    question: "Do you provide taxi service for Braj Darshan tours?",
    answer:
      "Yes, we provide taxi services for complete Braj Darshan tours including Govardhan, Barsana, Nandgaon, Gokul and other sacred destinations around Mathura and Vrindavan."
  },
  {
    question: "Are your drivers familiar with temple locations?",
    answer:
      "Our drivers are local experts who know all the major temples including Banke Bihari Temple, Prem Mandir, ISKCON Vrindavan and other pilgrimage sites."
  },
  {
    question: "What types of vehicles are available?",
    answer:
      "We provide sedan, SUV and larger vehicles suitable for family travel and pilgrimage tours in Mathura and Vrindavan."
  }
]

export default function TaxiFAQ() {

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-14 md:py-28  overflow-hidden">

      {/* Background Glow */}
      {/* <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-400/20 blur-[160px] rounded-full"/> */}

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Heading */}
        <div className="text-center mb-20">

          <p className="text-amber-600 uppercase tracking-widest text-sm mb-4">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Taxi Services in
            <span className="text-amber-600"> Mathura & Vrindavan</span>
          </h2>

        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[3px] bg-gradient-to-b from-amber-400 to-amber-600"/>

          <div className="space-y-7 md:space-y-16">

            {faqs.map((faq, index) => {

              const isLeft = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >

                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-amber-500 rounded-full shadow-lg shadow-amber-400"/>

                  {/* Card */}
                  <div
                    className={`bg-white/80 backdrop-blur-xl border border-amber-100 rounded-2xl shadow-lg p-6 max-w-md w-full ${
                      isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >

                    <button
                      onClick={() => toggle(index)}
                      className="flex justify-between items-center w-full text-left"
                    >

                      <span className="font-semibold text-gray-900">
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={20}
                        className={`text-amber-600 transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />

                    </button>

                    {openIndex === index && (
                      <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    )}

                  </div>

                </div>
              )
            })}

          </div>

        </div>

      </div>

    </section>
  )
}