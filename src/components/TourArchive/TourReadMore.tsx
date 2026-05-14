"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ToursReadMore() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #FFF9EE 0%, #FFFBF2 50%, #FFF8E6 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-64 h-64 rounded-full bg-yellow-100 opacity-50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-48 rounded-full bg-orange-100 opacity-40 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">

        {/* Title */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold tracking-wide uppercase mb-4">
            About Our Packages
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Mathura Vrindavan Tour Packages
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Discover the divine land of Lord Krishna through curated spiritual
            journeys across Mathura, Vrindavan, Govardhan and Barsana.
          </p>
          <div className="mt-4 h-1 w-14 rounded-full bg-linear-to-r from-orange-500 to-amber-400 mx-auto" />
        </div>

        {/* Content Card */}
        <div className="bg-white border border-orange-100 rounded-3xl shadow-lg shadow-orange-100/40 p-6 sm:p-8 md:p-10 leading-relaxed text-gray-600 text-sm sm:text-base">

          {/* Top accent bar */}
          <div className="h-1 w-full rounded-full bg-linear-to-r from-orange-400 via-amber-300 to-yellow-300 mb-6" />

          <p>
            Mathura and Vrindavan are among the most sacred destinations in
            India and attract millions of devotees every year. These holy
            cities are deeply connected with the life and divine pastimes of
            Lord Krishna. Our Mathura Vrindavan tour packages are designed to
            offer a peaceful spiritual journey covering famous temples,
            cultural landmarks, and the vibrant traditions of Braj.
          </p>

          {open && (
            <div className="space-y-4 mt-5">
              <p>
                Visitors can explore iconic temples such as Banke Bihari
                Temple, ISKCON Vrindavan, Prem Mandir, Dwarkadhish Temple,
                Radha Raman Temple and many other sacred places. The region
                also includes spiritually significant locations like Govardhan
                Parikrama, Barsana (the birthplace of Radha Rani), and
                Nandgaon.
              </p>
              <p>
                Our Braj tour packages are carefully planned to provide a
                comfortable experience including guided temple visits, private
                taxi services, hotel stays and assistance for darshan. Whether
                you are traveling with family, planning a spiritual retreat, or
                visiting during festivals such as Holi, Janmashtami or Radha
                Ashtami, our packages ensure a memorable pilgrimage.
              </p>
              <p>
                From one-day Mathura Vrindavan tours to multi-day Braj
                pilgrimage circuits, travelers can experience the devotional
                atmosphere of the region while exploring its ancient temples,
                ghats, and sacred forests. These tours allow devotees to
                connect deeply with the spiritual heritage of Krishna&apos;s
                birthplace while enjoying well-organized travel arrangements.
              </p>
              <p>
                If you are planning a spiritual journey to Braj, our Mathura
                Vrindavan tour packages provide the perfect balance of
                devotion, comfort and local expertise to help you experience
                the divine charm of Krishna&apos;s land.
              </p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-semibold text-sm hover:bg-orange-100 transition cursor-pointer"
          >
            {open ? "Read Less" : "Read More"}
            <ChevronDown
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              size={16}
            />
          </button>
        </div>
      </div>
    </section>
  );
}