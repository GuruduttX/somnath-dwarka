"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Rohit Sharma",
    location: "Delhi",
    review:
      "Our Mathura & Vrindavan trip was beautifully organized. The taxi was on time, hotel was clean, and the pooja arrangements were divine. Highly recommended!",
  },
  {
    name: "Priya Verma",
    location: "Lucknow",
    review:
      "Very professional service. Everything was smooth from hotel booking to temple visits. Felt truly peaceful and cared for.",
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad",
    review:
      "Affordable packages and very supportive team. The drivers were polite and knowledgeable about Mathura & Vrindavan.",
  },
];

export default function TestimonialsPreview() {
  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="relative bg-amber-50 py-16 md:py-24 overflow-hidden">
      
      {/* Background Blur Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-300/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-700">
          What Our Travelers Say
        </h2>

        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Real experiences from devotees and travelers who trusted 
          <span className="font-semibold text-amber-600"> MathuraVrindavanService</span>
        </p>

        {/* Slider */}
        <div className="relative mt-10 sm:mt-16">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="bg-white shadow-xl shadow-amber-200/40 rounded-3xl p-6 sm:p-10"
            >
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-amber-500 text-xl">
                      ★
                    </span>
                  ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                “{testimonials[index].review}”
              </p>

              {/* User Info */}
              <div className="mt-6 sm:mt-8">
                <h4 className="font-semibold text-amber-700 text-lg">
                  {testimonials[index].name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {testimonials[index].location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 sm:mt-8 gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === i
                    ? "bg-amber-600 w-6"
                    : "bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
