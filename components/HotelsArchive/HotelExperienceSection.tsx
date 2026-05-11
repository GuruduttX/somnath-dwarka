"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Coffee, Hotel } from "lucide-react";

const highlights = [
  {
    title: "Near Sacred Temples",
    description:
      "Stay just minutes away from Prem Mandir, Banke Bihari Temple and other divine places.",
    icon: MapPin,
  },
  {
    title: "Spiritual Atmosphere",
    description:
      "Peaceful surroundings and devotional ambiance perfect for pilgrims visiting Vrindavan.",
    icon: Sparkles,
  },
  {
    title: "Comfortable Rooms",
    description:
      "Clean AC rooms with modern amenities to ensure a relaxing stay.",
    icon: Hotel,
  },
  {
    title: "Local Dining",
    description:
      "Enjoy pure vegetarian meals and traditional Braj cuisine near your hotel.",
    icon: Coffee,
  },
];

export default function HotelExperienceSection() {
  return (
    <section className="py-10 md:py-24 relative ">

      {/* subtle glow accents */}

      <div className="absolute -top-10 left-0 w-[300px] h-[300px] bg-amber-400/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-400/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">

        {/* heading */}

        <div className="text-center mb-16">

          <h2 className="
          text-4xl md:text-5xl font-bold
          bg-gradient-to-r
          from-amber-500
          via-amber-600
          to-orange-600
          bg-clip-text
          text-transparent
          ">
            Why Stay in Our Hotels
          </h2>

          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            Experience comfort, spirituality, and convenience
            during your Vrindavan visit.
          </p>

        </div>

        {/* highlight cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {highlights.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="
                bg-white
                rounded-3xl
                p-8
                shadow-lg
                border border-gray-100
                text-center
                "
              >

                <div className="
                w-14
                h-14
                mx-auto
                flex
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-amber-500
                via-amber-500
                to-orange-600
                text-white
                ">

                  <Icon size={22} />

                </div>

                <h3 className="text-lg font-semibold mt-5">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm mt-3">
                  {item.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}