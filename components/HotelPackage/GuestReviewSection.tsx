"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  MapPin,
  MessageCircle,
  CheckCircle2,
  Key,
  Sparkle,
} from "lucide-react";

export default function GuestReviewSection({ HotelData }: any) {
  const highlightLabels: Record<string, string> = {
    comfortStay: "Comfort Stay",
    greatLocation: "Great Location",
    hospitality: "Hospitality",
    amazingView: "Amazing View",
    cleanliness: "Cleanliness",
    greatValue: "Great Value",
  };

  return (
    <section className="relative py-10 md:py-20 bg-gradient-to-br from-yellow-50 via-amber-50/40 to-orange-50/40 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-200/30 blur-[140px] rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-200/30 blur-[140px] rounded-full"></div>

      <div className="max-w-[1300px] mx-auto px-6">
        {/* HERO RATING */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div
            className="inline-flex items-center gap-5 px-8 py-5 rounded-2xl 
            bg-white/60 backdrop-blur-xl border border-white/40 
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
          >
            {/* Left Icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full 
              bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md"
            >
              ⭐
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center leading-none">
              <span
                className="text-5xl md:text-6xl font-extrabold 
                bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600 
                bg-clip-text text-transparent"
              >
                {HotelData.rating}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-gray-400 mt-1">
                Guest Rating
              </span>
            </div>

            {/* Right Icon */}
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full 
              bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md"
            >
              ⭐
            </div>
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-gray-900">
            Guest Favourite
          </h3>

          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-[15px]">
            This hotel ranks among the top stays in Vrindavan based on guest
            comfort, hospitality, and location experience.
          </p>
        </motion.div>

        {/* RATING BREAKDOWN */}

        <div className="mt-10 flex md:grid md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          <RatingCard
            title="Cleanliness"
            rating={HotelData.ratingSummary.scores.cleanliness}
            icon={<Sparkles />}
          />

          <RatingCard
            title="Accuracy"
            rating={HotelData.ratingSummary.scores.accuracy}
            icon={<CheckCircle2 />}
          />

          <RatingCard
            title="Check-in"
            rating={HotelData.ratingSummary.scores.checkIn}
            icon={<Key />}
          />

          <RatingCard
            title="Communication"
            rating={HotelData.ratingSummary.scores.communication}
            icon={<MessageCircle />}
          />

          <RatingCard
            title="Location"
            rating={HotelData.ratingSummary.scores.location}
            icon={<MapPin />}
          />

          <RatingCard
            title="Value"
            rating={HotelData.ratingSummary.scores.value}
            icon={<Sparkle />}
          />
        </div>

        {/* OVERALL RATING BARS */}

        <div className="mt-10 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-10">
            Overall Rating Distribution
          </h3>

          <RatingBar stars={5} width="100%" />
          <RatingBar stars={4} width="70%" />
          <RatingBar stars={3} width="40%" />
          <RatingBar stars={2} width="15%" />
          <RatingBar stars={1} width="5%" />
        </div>

        {/* REVIEW TAGS */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {Object.entries(HotelData.ratingSummary.highlights).map(
            ([key, count]) => {
              if (!count || !highlightLabels[key]) return null;

              return (
                <Tag key={key} label={`${highlightLabels[key]} (${count})`} />
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

/* RATING CARD */

function RatingCard({ title, rating, icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative flex-none w-[75vw] max-w-[280px] md:w-auto md:max-w-none snap-center md:snap-align-none bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 group-hover:from-amber-500 group-hover:to-orange-600 group-hover:text-white transition">
          {icon}
        </div>
      </div>

      <p className="text-sm text-gray-500">{title}</p>

      <p className="text-2xl font-semibold text-gray-900 mt-1">{rating}</p>
    </motion.div>
  );
}

/* RATING BAR */

function RatingBar({ stars, width }: any) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-sm text-gray-600 w-6">{stars}</span>

      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width }}
          transition={{ duration: 1.2 }}
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-orange-600"
        />
      </div>
    </div>
  );
}

/* TAG */

function Tag({ label }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      className="px-6 py-3 bg-white/80 backdrop-blur-md border border-white/50 rounded-full shadow-md text-sm text-gray-700 hover:shadow-lg transition cursor-pointer"
    >
      {label}
    </motion.div>
  );
}
