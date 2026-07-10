"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Users, Check, Shield, Compass, Navigation, Plane, Star, Briefcase } from "lucide-react";
import CommonEnquiryForm from "@/src/utils/CommanEnquiryForm";

// Map a vehicle name to the closest fleet photo.
function vehicleImage(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("innova") || n.includes("crysta")) return "/images/taxi/suv.jpg";
  if (n.includes("ertiga") || n.includes("mpv") || n.includes("suv") || n.includes("carnival")) return "/images/taxi/mpv.jpg";
  return "/images/taxi/sedan.jpg";
}

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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-6">
        {routes.map((route, idx) => (
          <motion.div
            key={route.slug}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between bg-white border border-orange-100/70 hover:border-orange-300 rounded-2xl p-5 shadow-xs hover:shadow-[0_12px_30px_rgba(234,88,12,0.08)] transition-all duration-300 overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br from-orange-100/30 to-amber-100/20 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

            <div>
              {/* Card Header Route */}
              <div className="flex items-center justify-between mb-4 border-b border-orange-50/80 pb-2">
                <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                  <Compass size={11} className="text-orange-500 animate-spin-slow" style={{ animationDuration: '8s' }} />
                  Popular Route
                </span>
                <span className="text-[10px] text-orange-300 font-mono font-bold">0{idx + 1}</span>
              </div>

              {/* Route Heading */}
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {route.origin} <span className="text-orange-400 font-light mx-1">→</span> {route.destination}
              </h3>

              {/* Specs */}
              <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                  <MapPin size={13} className="text-orange-500" />
                  <span>{route.distance}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                  <Clock size={13} className="text-orange-500" />
                  <span>{route.duration}</span>
                </div>
              </div>

              {/* Stops en route */}
              {route.stops && route.stops.length > 0 && (
                <div className="mt-4 border-t border-orange-50/50 pt-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Sightseeing En-Route:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {route.stops.map((stop) => (
                      <span key={stop} className="text-[10px] font-medium text-gray-700 bg-amber-50/50 border border-amber-100 px-2.5 py-0.5 rounded-md">
                        {stop}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 border-t border-orange-50/70 pt-4 mt-5">
              <Link href={`/somnath-dwarka-taxi-service/${route.slug}/`} className="flex-1 text-center py-2.5 px-3 text-xs font-bold border border-orange-200 hover:border-orange-300 text-orange-950 bg-white hover:bg-orange-50/30 rounded-xl transition">
                Fares & Details
              </Link>
              <button
                onClick={() => handleQuickQuote(route.origin, route.destination)}
                className="flex-1 py-2.5 px-3 text-xs font-extrabold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:opacity-95 rounded-xl flex items-center justify-center gap-1 group/btn cursor-pointer shadow-xs"
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
      return [
        "Dual AC vents & blower control",
        "Adjustable Captain seats with armrests",
        "Generous cargo volume (4 large suitcases)",
        "Premium highway suspension comfort"
      ];
    } else if (name.toLowerCase().includes("ertiga")) {
      return [
        "Roof-mounted rear AC vents",
        "Comfortable seating for up to 6 passenger seats",
        "Flexible third-row boot layout",
        "Best balance of cost and utility"
      ];
    }
    return [
      "AC climate control cabin",
      "Experienced highway pilot driver",
      "Fully sanitised dashboard & sheets",
      "24/7 client roadside assistance"
    ];
  };

  const getVehicleBaggage = (name: string) => {
    if (name.toLowerCase().includes("innova")) return "4 bags";
    if (name.toLowerCase().includes("ertiga")) return "3 bags";
    return "2 bags";
  };

  return (
    <>
      <CommonEnquiryForm open={isOpen} onClose={() => setIsOpen(false)} defaultService={selectedVehicle} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-6 max-w-6xl mx-auto">
        {vehicles.map((vehicle, idx) => {
          const features = getVehicleFeatures(vehicle.vehicle_name);
          const baggage = getVehicleBaggage(vehicle.vehicle_name);
          return (
            <motion.div
              key={vehicle.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group relative flex flex-col justify-between bg-white border border-orange-100 hover:border-orange-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-[0_16px_36px_rgba(234,88,12,0.09)] transition-all duration-300"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={vehicleImage(vehicle.vehicle_name)}
                  alt={`${vehicle.vehicle_name} cab for Somnath Dwarka trips`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                {/* Overlay layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/15 to-transparent mix-blend-multiply" />

                {/* Recommended badge for Innova */}
                {vehicle.vehicle_name.toLowerCase().includes("innova") && (
                  <div className="absolute top-3.5 left-3.5 text-[9px] font-extrabold uppercase tracking-wider text-orange-950 bg-amber-400 border border-amber-300 px-3 py-1 rounded-full shadow-sm">
                    ★ Premium Standard
                  </div>
                )}

                {/* Capacity Pills */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/50 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    <Users size={11} className="text-orange-400" />
                    {vehicle.seats} seats
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-white bg-black/50 border border-white/20 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    <Briefcase size={11} className="text-orange-400" />
                    {baggage}
                  </div>
                </div>

                {/* Name overlaid on image */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">{vehicle.vehicle_name}</h3>
                  <div className="flex items-center gap-1.5 text-[10.5px] text-orange-300 font-bold mt-1">
                    <Navigation size={11} className="rotate-45" />
                    <span>Private Saurashtra Highway Fleet</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-gray-600 leading-relaxed min-h-[38px] font-medium">
                  {vehicle.suitable_for}
                </p>

                {/* Features checklist */}
                <ul className="mt-4 space-y-2 border-t border-orange-50 pt-4 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mt-0.5">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="flex gap-2.5 border-t border-orange-50 pt-4 mt-5">
                  <Link
                    href={`${hubPath}${vehicle.slug}/`}
                    className="flex-1 text-center py-2.5 px-3 text-xs font-bold border border-orange-200 hover:border-orange-300 text-orange-950 bg-white hover:bg-orange-50/30 rounded-xl transition"
                  >
                    View Rates
                  </Link>
                  <button
                    onClick={() => handleBookVehicle(vehicle.vehicle_name)}
                    className="flex-1 py-2.5 px-3 text-xs font-extrabold text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:opacity-95 rounded-xl flex items-center justify-center gap-1 group/btn cursor-pointer shadow-xs"
                  >
                    <span>Request Booking</span>
                    <ArrowRight size={11} className="transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
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
    <div className="grid gap-6 sm:grid-cols-2 my-6">
      {airports.map((airport, idx) => (
        <motion.div
          key={airport.slug}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.08 }}
          viewport={{ once: true }}
          className="group"
        >
          <Link
            href={`${basePath}${airport.slug}/`}
            className="relative flex h-full overflow-hidden rounded-2xl border border-orange-100 bg-white hover:border-orange-300 hover:shadow-[0_12px_30px_rgba(234,88,12,0.07)] transition-all duration-300"
          >
            {/* Airplane image side */}
            <div className="relative w-28 shrink-0 overflow-hidden sm:w-36">
              <Image
                src="/images/taxi/airplane.jpg"
                alt="Airport transfer taxi service"
                fill
                sizes="(max-width: 640px) 150px, 200px"
                className="object-cover transition-transform duration-750 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/15 via-transparent to-white/90" />
              <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-orange-600 shadow-sm backdrop-blur-xs">
                <Plane size={15} />
              </div>
            </div>

            {/* Content side */}
            <div className="flex flex-1 items-start justify-between p-5">
              <div>
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-orange-850 bg-orange-50 border border-orange-100/50 px-2.5 py-0.5 rounded mb-2">
                  Meet & Greet Pickup
                </span>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {airport.airportName}
                </h3>
                <p className="text-xs text-gray-600 mt-1.5 font-medium">
                  Direct transfer to: <strong className="font-extrabold text-[#2d1b10]">{airport.serves}</strong>
                </p>
                <div className="flex items-center gap-3.5 mt-4 text-[11px] text-gray-500 font-semibold">
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded">
                    <MapPin size={11} className="text-orange-500" />
                    {airport.distance}
                  </span>
                  {airport.duration && (
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded">
                      <Clock size={11} className="text-orange-500" />
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
