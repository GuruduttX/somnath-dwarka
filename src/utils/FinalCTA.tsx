"use client";

import { motion } from "framer-motion";
import { CarTaxiFront, Hotel, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CommonEnquiryForm from "./CommanEnquiryForm";

export default function FinalCTA() {
    const [isFormOpen, setIsFromOpen] = useState(false);
    return (
      <>
        <section className="py-10 md:py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            {/* headline */}

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-amber-600 via-amber-600 to-orange-600 bg-clip-text text-transparent"
            >
              Begin Your Divine Journey
              <span className="block text-gray-800 mt-2">
                in Vrindavan Today
              </span>
            </motion.h2>

            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              Book your spiritual tour, comfortable taxi rides, and peaceful
              hotel stays with trusted local services in Vrindavan.
            </p>

            {/* CTA cards */}

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {/* Tour CTA */}

              <motion.div
                whileHover={{ y: -10 }}
                className="
            bg-white
            border border-gray-100
            rounded-3xl
            p-8
            shadow-lg
            hover:shadow-xl
            transition
            "
              >
                <MapPin className="mx-auto text-amber-600" />

                <h3 className="text-xl font-semibold mt-4 text-gray-800">
                  Explore Tours
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Discover divine temples and spiritual places in Braj.
                </p>
                <Link href="/tour-packages#tours">
                  <button
                    className=" mt-6
                                            px-6
                                            py-2
                                            rounded-full
                                            text-white
                                            bg-gradient-to-r
                                            from-amber-500
                                            via-amber-500
                                            to-orange-600
                                            hover:scale-105
                                            transition
                                            "
                  >
                    View Tours
                  </button>
                </Link>
              </motion.div>

              {/* Taxi CTA */}

              <motion.div
                whileHover={{ y: -10 }}
                className="
            bg-white
            border border-gray-100
            rounded-3xl
            p-8
            shadow-lg
            hover:shadow-xl
            transition
            "
              >
                <CarTaxiFront className="mx-auto text-amber-600" />

                <h3 className="text-xl font-semibold mt-4 text-gray-800">
                  Book Taxi
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Comfortable AC taxis with professional drivers.
                </p>

                <button
                  className="
              mt-6
              px-6
              py-2
              rounded-full
              text-white
              bg-gradient-to-r
              from-amber-500
              via-amber-500
              to-orange-600
              hover:scale-105
              transition
            "
                  onClick={() => setIsFromOpen(true)}
                >
                  Book Ride
                </button>
              </motion.div>

              {/* Hotel CTA */}

              <motion.div
                whileHover={{ y: -10 }}
                className="
            bg-white
            border border-gray-100
            rounded-3xl
            p-8
            shadow-lg
            hover:shadow-xl
            transition
            "
              >
                <Hotel className="mx-auto text-amber-600" />

                <h3 className="text-xl font-semibold mt-4 text-gray-800">
                  Find Hotels
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  Peaceful stays near temples and spiritual places.
                </p>
                <Link href="/hotels">
                  <button
                    className="
              mt-6
              px-6
              py-2
              rounded-full
              text-white
              bg-gradient-to-r
              from-amber-500
              via-amber-500
              to-orange-600
              hover:scale-105
              transition
            "
                  >
                    Browse Hotels
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* final message */}

            <p className="text-gray-500 text-sm mt-16">
              Trusted by thousands of travelers visiting Vrindavan every year
            </p>
          </div>
        </section>
        {/* 3. common Form Component */}
        <CommonEnquiryForm
          open={isFormOpen}
          onClose={() => setIsFromOpen(false)}
          defaultService="Taxi Booking"
        />
      </>
    );
}