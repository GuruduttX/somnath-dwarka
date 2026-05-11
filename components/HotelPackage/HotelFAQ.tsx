"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// const faqs = [
//   {
//     question: "How can I book a hotel in Vrindavan through Experience My India?",
//     answer:
//       "You can easily book a hotel by selecting your preferred hotel from our listings and submitting an enquiry. Our team will contact you shortly to confirm the booking."
//   },
//   {
//     question: "Do you offer budget as well as luxury hotels in Vrindavan?",
//     answer:
//       "Yes, we offer a wide range of hotels including budget stays, mid-range hotels, and premium luxury accommodations near major temples."
//   },
//   {
//     question: "Can I book a hotel along with a Vrindavan tour package?",
//     answer:
//       "Absolutely. You can combine hotel stays with tour packages, taxi services, and temple visits for a complete spiritual travel experience."
//   },
//   {
//     question: "Are hotels located near Banke Bihari Temple or ISKCON Temple?",
//     answer:
//       "Yes, many of our partner hotels are located close to major temples including Banke Bihari Temple, ISKCON Temple, and Prem Mandir."
//   },
//   {
//     question: "Do you provide taxi service along with hotel booking?",
//     answer:
//       "Yes. We offer taxi services for temple visits, airport pickup, Mathura transfers, and full Vrindavan sightseeing tours."
//   },
//   {
//     question: "What is the cancellation policy for hotel bookings?",
//     answer:
//       "Cancellation policies depend on the specific hotel. Our team will inform you about the policy before confirming your booking."
//   }
// ];

interface FAQS {
  id : string;
  question : string;
  answer : string;
}

export default function HotelFAQ({faqs} : { faqs : FAQS[]}) {
  const [active, setActive] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-10 md:py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-5xl mx-auto px-6">
        
        <h2 className="text-4xl font-bold text-center mb-12">
          Hotel Booking <span className="text-amber-600">FAQs</span>
        </h2>

        <div className="space-y-5">
          {faqs.map((faq : FAQS, index : number) => (
            <div
              key={faq.id}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-amber-100 hover:shadow-xl transition"
            >
              
              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full p-6 text-left"
              >
                <span className="font-semibold text-lg text-gray-800">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition-transform ${
                    active === index ? "rotate-180 text-amber-600" : ""
                  }`}
                />
              </button>

              {active === index && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
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