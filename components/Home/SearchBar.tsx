"use client"

import React, { useState } from 'react'
import { MapPin, Car, Hotel, Search } from "lucide-react";

const SearchBar = () => {

    const [service, setService] = useState("tour");
    return (
      <div>
        <div className="grid grid-cols-2 sm:flex gap-3 mt-8 w-full">
          <button
            onClick={() => setService("tour")}
            className={`px-3 py-2.5 md:px-5 md:py-3 text-xs md:text-base rounded-3xl flex items-center gap-1.5 md:gap-2 font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              service === "tour"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white hover:bg-pink-50"
            }`}
          >
            <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
            Tour Packages
          </button>

          <button
            onClick={() => setService("taxi")}
            className={`px-3 py-2.5 md:px-5 md:py-3 text-xs md:text-base rounded-3xl flex items-center gap-1.5 md:gap-2 font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              service === "taxi"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white hover:bg-pink-50"
            }`}
          >
            <Car size={16} className="md:w-[18px] md:h-[18px]" />
            Taxi Service
          </button>

          <button
            onClick={() => setService("hotel")}
            className={`px-3 py-2.5 md:px-5 md:py-3 text-xs md:text-base rounded-3xl flex items-center gap-1.5 md:gap-2 font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              service === "hotel"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white hover:bg-pink-50"
            }`}
          >
            <Hotel size={16} className="md:w-[18px] md:h-[18px]" />
            Hotels
          </button>

          <button
            onClick={() => setService("puja")}
            className={`px-3 py-2.5 md:px-5 md:py-3 text-xs md:text-base rounded-3xl flex items-center gap-1.5 md:gap-2 font-medium transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
              service === "puja"
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white hover:bg-pink-50"
            }`}
          >
            <Hotel size={16} className="md:w-[18px] md:h-[18px]" />
            Puja
          </button>
        </div>

        {/* SEARCH BOX */}
        {/* SEARCH BOX */}
        <div className="mt-6 w-full">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-pink-100 shadow-xl rounded-full p-2 md:p-3">
            <input
              type="text"
              placeholder={
                service === "tour"
                  ? "Search Vrindavan Tour Packages..."
                  : service === "taxi"
                    ? "Enter Pickup Location..."
                    : service === "hotel"
                      ? "Search Hotels in Vrindavan..."
                      : "Search Related Puja..."
              }
              className="flex-1 px-4 py-2 md:py-3 outline-none bg-transparent text-sm md:text-base text-gray-700 placeholder-gray-400"
            />

            <button className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 md:px-7 py-2 md:py-3 rounded-full flex items-center gap-2 hover:scale-105 hover:shadow-lg transition cursor-pointer font-medium">
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>
    );
}

export default SearchBar