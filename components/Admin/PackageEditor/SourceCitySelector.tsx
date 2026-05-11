"use client";
import React, { useState, useRef, useEffect } from "react";
import { cities } from "@/config/cities";

// export const sourceCities = [
//   "delhi",
//   "mumbai",
//   "bangalore",
//   "jaipur",
//   "ahmedabad",
//   "kolkata",
//   "hyderabad",
//   "chennai",
//   "pune",
//   "lucknow",
// ];

type Props = {
  availableSrc: string[];
  setAvailableSrc: React.Dispatch<React.SetStateAction<string[]>>;
};

const SourceCitySelector = ({ availableSrc, setAvailableSrc }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCity = (city: string) => {
    if (availableSrc.includes(city)) {
      setAvailableSrc(availableSrc.filter((c) => c !== city));
    } else {
      setAvailableSrc([...availableSrc, city.toLocaleLowerCase()]);
    }
  };

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-3 relative" ref={dropdownRef}>
      {/* Label */}
      <label className="text-sm text-white/70">
        Source Cities <span className="text-red-500">*</span>
      </label>

      {/* Dropdown  */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3 rounded-xl bg-white/5 text-white
        border border-white/10 cursor-pointer flex justify-between items-center"
      >
        <span className="text-sm text-white/70">
          {availableSrc.length > 0
            ? `${availableSrc.length} selected`
            : "Select source cities"}
        </span>
        <span className="text-white/50">▼</span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl bg-[#2b0217] border border-white/10 shadow-lg">
          {cities.slice(1).map((city : any, idx : number) => {

            let lowerCase = city.toLowerCase();

            const isSelected = availableSrc.includes(lowerCase);

            return (
              <div
                key={idx}
                onClick={() => toggleCity(lowerCase)}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-white/10"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="accent-sky-500"
                />
                <span className="capitalize text-white/80">{city}</span>
              </div>
            );
          })}
        </div>
      )}

   
      {availableSrc.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {[...availableSrc].map((city, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm rounded-full bg-sky-600 text-white capitalize"
            >
              {city}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourceCitySelector;