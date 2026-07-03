"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Users, Check, Shield, Compass, Navigation } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

// Route Card Component
interface RouteItem {
  slug: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  stops?: string[];
}

export function RouteCardGrid({ routes }: { routes: RouteItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");

  const handleQuickQuote = (origin: string, destination: string) => {
    setSelectedRoute(`${origin} to ${destination} taxi`);
    setIsOpen(true);
  };

  return (
    <>
      <CommonEnquiryForm open={isOpen} onClose={() => setIsOpen(false)} defaultService={selectedRoute} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4">
        {routes.map((route, idx) => (
          <motion.div
            key={route.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between bg-white border border-orange-100 hover:border-orange-300 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100/40 to-transparent rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div>
              {/* Card Header Route */}
              <div className="flex items-center justify-between mb-3 border-b border-orange-50 pb-2">
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Compass size={11} className="animate-spin-slow" />
                  Popular Pilgrimage
                </span>
                <span className="text-[10px] text-gray-400 font-mono">#{idx + 1}</span>
              </div>

              {/* Route Heading */}
              <h3 className="text-base font-bold text-gray-900 group-hover:text-[#E87722] transition-colors">
                {route.origin} <span className="text-gray-400 font-light mx-0.5">→</span> {route.destination}
              </h3>

              {/* Specs */}
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin size={13} className="text-orange-400" />
                  <span>{route.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={13} className="text-orange-400" />
                  <span>{route.duration}</span>
                </div>
              </div>

              {/* Stops en route */}
              {route.stops && route.stops.length > 0 && (
                <div className="mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Via stops:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {route.stops.map((stop) => (
                      <span key={stop} className="text-[10px] text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t border-orange-50 pt-3 mt-4">
              <Link href={`/${route.slug}/`} className="flex-1 text-center py-2 px-3 text-xs font-semibold border border-orange-100 hover:border-orange-300 text-gray-700 bg-white hover:bg-orange-50/20 rounded-xl transition">
                Fares & Stops
              </Link>
              <button
                onClick={() => handleQuickQuote(route.origin, route.destination)}
                className="flex-1 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-[#E87722] to-[#FF8A2A] hover:opacity-90 rounded-xl flex items-center justify-center gap-1 group/btn cursor-pointer"
              >
                <span>Quick Quote</span>
                <ArrowRight size={11} className="transition-transform group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// Vehicle Card Component
interface VehicleItem {
  slug: string;
  vehicle_name: string;
  seats: number;
  suitable_for: string;
}

export function VehicleCardGrid({ vehicles, hubPath }: { vehicles: VehicleItem[]; hubPath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const handleBookVehicle = (name: string) => {
    setSelectedVehicle(`${name} booking for Somnath Dwarka`);
    setIsOpen(true);
  };

  const getVehicleFeatures = (name: string) => {
    if (name.toLowerCase().includes("innova")) {
      return ["Dual AC vents", "Adjustable Captain Seats", "Spacious luggage room", "Ideal for long highway drives"];
    } else if (name.toLowerCase().includes("ertiga")) {
      return ["AC comfort", "Cost-effective 6 seats", "Flexible boot space", "Friendly driving experience"];
    }
    return ["Fully air-conditioned", "Experienced highway driver", "Clean interior guarantee", "24/7 client dispatch"];
  };

  return (
    <>
      <CommonEnquiryForm open={isOpen} onClose={() => setIsOpen(false)} defaultService={selectedVehicle} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 my-4 max-w-6xl mx-auto">
        {vehicles.map((vehicle, idx) => {
          const features = getVehicleFeatures(vehicle.vehicle_name);
          return (
            <motion.div
              key={vehicle.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between bg-white border border-orange-100 hover:border-orange-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Highlight badge for Innova */}
              {vehicle.vehicle_name.toLowerCase().includes("innova") && (
                <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/70 border border-orange-200 px-2.5 py-0.5 rounded-full">
                  Recommended
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                    <Navigation size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vehicle.vehicle_name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#E87722] font-semibold mt-0.5">
                      <Users size={12} />
                      <span>Max {vehicle.seats} Passengers</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed min-h-[36px]">
                  {vehicle.suitable_for}
                </p>

                {/* Features checklist */}
                <ul className="mt-4 space-y-2 border-t border-orange-50 pt-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check size={14} className="text-green-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 border-t border-orange-50 pt-4 mt-5">
                <Link
                  href={`${hubPath}${vehicle.slug}/`}
                  className="flex-1 text-center py-2 px-3 text-xs font-semibold border border-orange-100 hover:border-orange-300 text-gray-700 bg-white hover:bg-orange-50/20 rounded-xl transition"
                >
                  View Fares
                </Link>
                <button
                  onClick={() => handleBookVehicle(vehicle.vehicle_name)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-[#E87722] to-[#FF8A2A] hover:opacity-90 rounded-xl flex items-center justify-center gap-1 group/btn cursor-pointer"
                >
                  <span>Book Cab</span>
                  <ArrowRight size={11} className="transition-transform group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

// Airport Card Component
interface AirportItem {
  slug: string;
  airport: string;
  airportName: string;
  serves: string;
  distance: string;
  duration?: string;
}

export function AirportCardGrid({ airports, basePath }: { airports: AirportItem[]; basePath: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 my-4">
      {airports.map((airport, idx) => (
        <motion.div
          key={airport.slug}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          viewport={{ once: true }}
          className="group"
        >
          <Link
            href={`${basePath}${airport.slug}/`}
            className="relative block h-full p-4 rounded-2xl border border-orange-100 bg-white hover:border-orange-300 hover:shadow-md transition-all duration-300"
          >
            {/* Top orange line */}
            <div className="absolute top-0 left-4 right-4 h-[2px] bg-orange-200/50 group-hover:bg-orange-500 transition-colors rounded-full" />

            <div className="flex justify-between items-start pt-1">
              <div>
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md mb-2">
                  Meet & Greet Transfer
                </span>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#E87722] transition-colors">
                  {airport.airportName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Serves: <strong className="font-semibold text-gray-700">{airport.serves}</strong>
                </p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-orange-400" />
                    {airport.distance}
                  </span>
                  {airport.duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-orange-400" />
                      {airport.duration}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center transition-colors shrink-0">
                <ArrowRight size={14} className="text-orange-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
