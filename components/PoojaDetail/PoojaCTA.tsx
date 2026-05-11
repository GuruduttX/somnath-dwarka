"use client";
import { useState } from "react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";

export default function PoojaCTA() {
  const [isFromOpen, setIsFromOpen] = useState(false);
  return (
    <>
      <section className="py-20 px-6 bg-amber-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Book Your Sacred Pooja Todzay
          </h2>

          {/* Description */}
          <p className="text-lg mb-10 text-amber-100 max-w-2xl mx-auto">
            Experience divine blessings in the holy land of Mathura and
            Vrindavan. Our team will arrange everything from pandit to pooja
            samagri so you can focus on your spiritual journey.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="bg-white text-amber-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setIsFromOpen(true)}
            >
              Book Pooja Now
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-amber-600 transition">
              Contact Us
            </button>
          </div>

        </div>
      </section>
          {/* 3. common Form Component */}
          <CommonEnquiryForm
            open={isFromOpen}
            onClose={() => setIsFromOpen(false)}
            defaultService="Taxi Booking"
          />
    </>
  );
}
