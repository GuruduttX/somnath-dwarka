"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";

const journey = [
  {
    step: "01",
    title: "Prem Mandir Darshan",
    description:
      "Experience the divine beauty of Prem Mandir illuminated in the evening. Marvel at the intricate marble carvings and spiritual light shows.",
    image: "/images/Home/prem-mandir.jpg",
    tag: "Must Visit",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    step: "02",
    title: "Banke Bihari Temple",
    description:
      "Witness the sacred darshan of Lord Krishna at the famous Banke Bihari temple. Feel the divine energy and centuries of devotion.",
    image: "/images/Home/Mandir.jpg",
    tag: "Sacred Site",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    step: "03",
    title: "Iskcon Temple Visit",
    description:
      "Immerse yourself in peaceful kirtans and the spiritual atmosphere of the grand Iskcon temple complex.",
    image: "/images/Home/Mandir-new.jpg",
    tag: "Spiritual",
    tagColor: "bg-yellow-100 text-yellow-700",
  },
];

export default function SpiritualJourney() {
  return (
    <section className="relative py-16 md:py-28 overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-white">

      {/* Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/30 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={11} />
            Divine Experiences
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Your Spiritual Journey
          </h2>
          <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
            Curated darshans &amp; experiences across Vrindavan's holiest temples
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-28">
            {journey.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    !isEven ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative group">
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-orange-400/20 via-amber-300/10 to-transparent blur-sm" />

                    <div className="relative h-[300px] md:h-[360px] cursor-pointer rounded-2xl overflow-hidden shadow-xl shadow-orange-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                      {/* Step badge */}
                      <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center">
                        <span className="text-white font-black text-sm">
                          {item.step}
                        </span>
                      </div>

                      {/* Tag */}
                      <div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${item.tagColor} backdrop-blur-sm`}
                      >
                        {item.tag}
                      </div>

                      {/* Bottom label */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/80 text-xs font-medium">
                        <MapPin size={11} />
                        Vrindavan, India
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div
                    className={`flex flex-col ${!isEven ? "md:items-end md:text-right" : ""}`}
                  >
                    {/* Step indicator */}
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                      <div
                        className={`flex items-center gap-2 ${!isEven ? "md:flex-row-reverse" : ""}`}
                      >
                        <div className="w-8 h-px bg-orange-300" />
                        <span className="text-orange-400 font-bold text-xs tracking-widest uppercase">
                          Step {item.step}
                        </span>
                        <div className="w-8 h-px bg-orange-300" />
                      </div>
                    </div>

                    <h3 className="text-2xl text-center md:text-start md:text-3xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm text-center md:text-start leading-relaxed max-w-sm mb-6">
                      {item.description}
                    </p>

                    {/* Feature pills */}
                    <div
                      className={`flex flex-wrap gap-2 mb-7 justify-center md:justify-start ${!isEven ? "md:justify-end" : ""}`}
                    >
                      {["Free Guide", "Group Tours", "Puja Service"].map(
                        (f) => (
                          <span
                            key={f}
                            className="px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-medium"
                          >
                            {f}
                          </span>
                        ),
                      )}
                    </div>

                    <button className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 mx-auto md:mx-0 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-semibold text-sm shadow-md shadow-orange-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/50 transition-all duration-200 w-fit">
                      Explore Experience
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  {/* Center dot on timeline */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-orange-400 bg-white hidden md:block shadow-md shadow-orange-200" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}