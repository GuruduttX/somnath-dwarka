"use client";

import { Phone, Mail } from "lucide-react";

export default function BlogEnquiryCTA() {
    return (
        <section className="w-full bg-white py-6 md:py-10 px-6 md:px-12 lg:px-20">

            <div className="max-w-6xl mx-auto rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">

                {/* LEFT CONTENT */}
                <div className="max-w-xl text-center md:text-left">
                    <h2 className="text-xl md:text-3xl font-semibold text-gray-900">
                        Plan Your Spiritual Journey Today
                    </h2>

                    <p className="mt-3 text-gray-600 text-xs md:text-base">
                        Get personalized travel guidance, hotel bookings, taxi services,
                        and temple darshan assistance — all in one place.
                    </p>

                    {/* Contact Info */}
                    <div className="mt-4 flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start text-sm text-gray-700">
                        <span className="flex items-center gap-2">
                            <Phone size={16} className="text-orange-500" />
                            +91 98765 43210
                        </span>
                        <span className="flex items-center gap-2">
                            <Mail size={16} className="text-orange-500" />
                            support@spiritualindia.com
                        </span>
                    </div>
                </div>

                {/* RIGHT CTA */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center">

                    <button className="bg-orange-500 text-white px-2 md:px-6  py-3 rounded-full font-medium shadow-md hover:bg-orange-600 transition cursor-pointer text-sm md:text-md">
                        Get Enquiry
                    </button>

                    <button className="border border-orange-400 text-orange-600 px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition text-sm md:text-md cursor-pointer">
                        Talk to Expert
                    </button>

                </div>
            </div>
        </section>
    );
}