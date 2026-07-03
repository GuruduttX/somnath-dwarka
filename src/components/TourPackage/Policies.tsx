"use client";

import { useState } from "react";
import {
  RotateCcw,
  Ban,
  BadgeCheck,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: any = {
  "Refund": <RotateCcw className="w-5 h-5 text-orange-600" />,
  "Cancel": <Ban className="w-5 h-5 text-orange-600" />,
  "Confirmation": <BadgeCheck className="w-5 h-5 text-orange-600" />,
  "Payment": <CreditCard className="w-5 h-5 text-orange-600" />,
};

//refund?: string;
//   cancel?: string;
//   confirmation?: string;
//   payment?: string;



export default function Policies({ PackageData }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const DEFAULT_POLICIES = [
    {
      title: "Refund",
      description: "Refunds are processed within 7-10 working days after cancellation approval, subject to bank processing times.",
    },
    {
      title: "Cancel",
      description: "Cancellations made 15 days or more prior to departure are eligible for a full refund. Cancellations between 7-14 days will receive a 50% refund.",
    },
    {
      title: "Payment",
      description: "Secure your pilgrimage with a 20% advance booking amount. The remaining balance can be settled upon arrival or trip start.",
    },
    {
      title: "Confirmation",
      description: "Your booking will be formally confirmed via email/WhatsApp once the advance payment is received and hotel availability is locked.",
    },
  ];

  const policiesList = PackageData?.policies?.length ? PackageData.policies : DEFAULT_POLICIES;

  return (
    <section className="max-w-6xl mx-auto py-6 md:py-20 px-6">
      <div className="mb-14 text-center md:text-start">
        <h2 className="text-3xl font-semibold text-gray-900">
          Policies & Important Information
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
          Please review the following policies carefully before confirming your
          Somnath–Dwarka yatra.
        </p>
      </div>

      <div className="space-y-4">
        {policiesList.map((item: any, index: number) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                isOpen
                  ? "border-orange-300 bg-orange-50"
                  : "border-orange-100/80 bg-white hover:border-orange-300"
              }`}
            >
              {/* Toggle Header */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {iconMap[item.title]}
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Collapsible Description */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5">
                      <div className="h-px w-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 mb-4" />
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
