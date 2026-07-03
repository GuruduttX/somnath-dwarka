"use client";

import { useState } from "react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

/**
 * Small "can't find what you're looking for?" prompt with an outlined button
 * that opens the enquiry form for a bespoke itinerary. Sits above the main CTA.
 */
export default function CustomPackageCTA({
  prompt = "Can't find what you're looking for?",
  label = "Request Custom Package",
}: {
  prompt?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-2 text-center sm:pt-12">
        <p className="text-lg font-medium text-gray-400 sm:text-xl">{prompt}</p>
        <button
          onClick={() => setOpen(true)}
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border-2 border-orange-500 bg-transparent px-8 py-4 text-lg font-extrabold text-orange-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white hover:shadow-[0_16px_40px_rgba(234,88,12,0.28)] active:translate-y-0 sm:w-auto cursor-pointer"
        >
          {label}
        </button>
      </div>

      <CommonEnquiryForm
        open={open}
        onClose={() => setOpen(false)}
        defaultService="Custom Somnath Dwarka Package"
      />
    </>
  );
}
