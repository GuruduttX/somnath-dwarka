"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Sparkles } from "lucide-react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";

const faqs = [
  {
    category: "Tour Packages",
    questions: [
      {
        q: "What tour packages do you offer for Vrindavan and Mathura?",
        a: "We offer a wide range of packages including day tours, overnight stays, Braj Mandal Parikrama, Govardhan Parikrama, Mathura–Vrindavan combo tours, and custom group packages. All tours include a local expert guide, transport and temple visit assistance.",
      },
      {
        q: "Can I customise a tour package for my family or group?",
        a: "Absolutely. We specialise in customised packages for families, pilgrim groups and corporate retreats. Just share your dates, group size and preferences and our team will craft a personalised itinerary within 2 hours.",
      },
      {
        q: "How far in advance should I book a tour package?",
        a: "We recommend booking at least 3–5 days in advance for regular tours. During peak seasons like Holi, Janmashtami and Radhashtami, booking 2–3 weeks ahead is strongly advised as slots fill quickly.",
      },
      {
        q: "Are meals included in the tour packages?",
        a: "Select packages include breakfast and one prasad meal at a temple. Full-board options are available on request. All meals served are pure vegetarian in keeping with the spiritual nature of Vrindavan.",
      },
    ],
  },
  {
    category: "Hotels & Stay",
    questions: [
      {
        q: "Which areas of Vrindavan do your hotel partners operate in?",
        a: "Our hotel partners are located near all major temples including Banke Bihari, Prem Mandir, ISKCON, Radha Raman and Govardhan. We recommend properties based on your preferred darshan schedule.",
      },
      {
        q: "Is accommodation available during Janmashtami and Holi?",
        a: "Yes, but availability is extremely limited during festivals. We strongly advise booking 4–6 weeks in advance for Janmashtami, Holi and Radhashtami. Early booking also secures better room rates.",
      },
      {
        q: "Are the hotels suitable for elderly pilgrims?",
        a: "Yes. We have a curated list of ground-floor and lift-accessible rooms with attached bathrooms, 24-hour hot water and proximity to temples — specifically recommended for senior pilgrims and those with mobility needs.",
      },
    ],
  },
  {
    category: "Taxi & Travel",
    questions: [
      {
        q: "Do you offer Delhi to Vrindavan taxi service?",
        a: "Yes. We provide comfortable AC cab services from Delhi, Agra, Jaipur and other nearby cities to Vrindavan and Mathura. All vehicles are clean, GPS-tracked and driven by verified local drivers.",
      },
      {
        q: "Can I hire a taxi for a full-day temple tour within Vrindavan?",
        a: "Definitely. Our local temple circuit packages cover Banke Bihari, Prem Mandir, ISKCON, Radha Raman, Nidhivan and more — with flexible timing so you can take darshan at your own pace.",
      },
      {
        q: "Are the taxis available for early morning pickups?",
        a: "Yes, our taxis are available 24/7 including early morning Mangala Aarti pickups starting from 4:30 AM. Just mention your preferred pickup time at the time of booking.",
      },
    ],
  },
  {
    category: "Puja & Temple Rituals",
    questions: [
      {
        q: "What types of puja services can you arrange?",
        a: "We arrange a range of sacred rituals including Abhishek, Rukmini Vivah, Annakut, 56 Bhog offering, Yamuna Aarti, and personalised naam jap sessions — all conducted by experienced and authentic Braj priests.",
      },
      {
        q: "Do I need to bring any puja samagri (materials) myself?",
        a: "No. All puja materials are arranged by us as part of the booking. You just need to be present at the scheduled time. Special requests for additional offerings can be accommodated with advance notice.",
      },
      {
        q: "Can non-Hindus participate in the temple and puja experiences?",
        a: "Yes. Many temples in Vrindavan welcome devotees of all faiths. Our guides ensure a respectful and meaningful experience for everyone regardless of their religious background.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>("0-0");
  const [open, setOpen] = useState(false);

  const toggle = (key: string) =>
    setOpenItem((prev) => (prev === key ? null : key));

  return (
    <>
     <CommonEnquiryForm open={open} onClose={()=>setOpen(false)} />
    <main className="min-h-screen bg-gradient-to-b from-white via-amber-50/40 to-white">

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-200/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={11} />
            Help Center
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
              <line x1="0" y1="6" x2="26" y2="6" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="34" cy="6" r="3" fill="#f97316"/>
              <circle cx="43" cy="6" r="2" fill="#fbbf24"/>
              <circle cx="50" cy="6" r="1.5" fill="#fde68a"/>
            </svg>
            <p className="text-gray-400 text-sm">Everything you need to know before your journey</p>
            <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
              <circle cx="30" cy="6" r="1.5" fill="#fde68a"/>
              <circle cx="37" cy="6" r="2" fill="#fbbf24"/>
              <circle cx="46" cy="6" r="3" fill="#f97316"/>
              <line x1="54" y1="6" x2="80" y2="6" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
            Can't find your answer? Call us at{" "}
            <a href="tel:+919876543210" className="text-amber-600 font-semibold hover:underline">+91 98765 43210</a>{" "}
            or email{" "}
            <a href="mailto:info@vrindavantravel.com" className="text-amber-600 font-semibold hover:underline">info@vrindavantravel.com</a>
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          {faqs.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: si * 0.08 }}
              viewport={{ once: true }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-200 to-transparent" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                  {section.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-amber-200 to-transparent" />
              </div>

              {/* Questions */}
              <div className="flex flex-col gap-3">
                {section.questions.map((item, qi) => {
                  const key = `${si}-${qi}`;
                  const isOpen = openItem === key;

                  return (
                    <div
                      key={qi}
                      onClick={() => toggle(key)}
                      className={`group bg-white border rounded-2xl overflow-hidden shadow-sm cursor-pointer transition-all duration-200
                        ${isOpen
                          ? "border-amber-300 shadow-md shadow-amber-100/60"
                          : "border-amber-100 hover:border-amber-200 hover:shadow-md hover:shadow-amber-100/40"
                        }`}
                    >
                      {/* Question row */}
                      <div className="flex items-center justify-between gap-4 px-5 py-4">
                        <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-amber-700" : "text-gray-800"}`}>
                          {item.q}
                        </span>
                        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200
                          ${isOpen
                            ? "bg-gradient-to-br from-orange-500 to-amber-400 text-white"
                            : "bg-amber-50 border border-amber-200 text-amber-500 group-hover:bg-amber-100"
                          }`}
                        >
                          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                        </div>
                      </div>

                      {/* Answer */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-5">
                              <div className="h-px w-full bg-gradient-to-r from-amber-100 via-orange-200 to-amber-100 mb-4" />
                              <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 px-8 py-10 text-center shadow-xl shadow-amber-300/30">
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">Still have questions?</h3>
            <p className="text-white/70 text-sm mb-6">Our team is available 7 days a week to help plan your journey.</p>
            
              <button 
              onClick={()=>setOpen(true)}             
              className="inline-flex items-center  cursor-pointer gap-2 px-7 py-3 rounded-xl bg-white text-amber-700 font-bold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
            
              Call Us Now
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 7.5h11M9 3.5l4 4-4 4" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

             </button>
          
          </div>
        </div>
      </section>

    </main>
    </>
   
  );
}