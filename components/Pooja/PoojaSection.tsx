"use client";

import Link from "next/link";
import { useState } from "react";
import CommonEnquiryForm from "@/utils/CommanEnquiryForm";
import PoojaCard from "../Home/ProductShow/PoojaCards";


export default function PoojaSection({ poojaData }: { poojaData: any }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const categories = ["All",  "Special Pooja","Festival Pooja",
  "Daily Pooja",
  "Online Pooja",];

  const filteredPoojas =
    activeCategory === "All"
      ? poojaData
      : poojaData?.filter((item: any) => item.category === activeCategory);

  return (
    <>
        <CommonEnquiryForm open={open} onClose={()=>setOpen(false)}/>
         <section className="py-10 md:py-32 bg-gradient-to-b from-white to-amber-50/40 ">
          <div className="max-w-7xl mx-auto px-6">

            <div className="text-center mb-12">

      
              {/* headline with inline SVG underline decoration */}
              <div className="relative inline-block">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 ] via-amber-500 to-yellow-400 bg-clip-text text-transparent leading-tight tracking-tight">
                  Mathura Vrindavan Pooja Services
                </h2>

                {/* SVG decorative underline */}
                <svg
                  viewBox="0 0 320 12"
                  className="w-full mt-1"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="uline" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="#ea580c" />
                      <stop offset="50%"  stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#facc15" />
                    </linearGradient>
                  </defs>
                  {/* wavy underline path */}
                  <path
                    d="M0,6 Q40,0 80,6 T160,6 T240,6 T320,6"
                    fill="none"
                    stroke="url(#uline)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

    

      

            </div>
            
      

            {/* Filter Section */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 border
                    ${
                      activeCategory === cat
                        ? "bg-amber-500 text-white border-amber-500 shadow-md scale-105"
                        : "bg-white text-gray-600  border-gray-300 hover:border-amber-400 hover:text-amber-600 hover:shadow-sm"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoojas.map((item: any) =>
                item.status === "published" ? (
                    <PoojaCard product={item} setOpen={setOpen}/> 
                ) : null
              )}
            </div>
          </div>
    </section>
    </>

  );
}