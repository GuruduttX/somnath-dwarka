"use client";

import React, { useState } from "react";

import Image from "next/image";

import {
  Route,
  CheckCircle,
  XCircle,
  MapPin,
  Car,
  Clock,
  ChevronDown,
  Coffee,
  Navigation,
  ShieldCheck,
  Users,
  Star,
  Fuel,
  Wind,
} from "lucide-react";
import Link from "next/link";

interface TaxiFeature {
  id: string;
  description: string;
  _id: string;
}

export interface Taxiinterface {
  _id: string;
  title: string;
  basePrice: number;
  seats: number;
  cabType: "Sedan" | "SUV" | "Hatchback" | string; // Use union types if you have fixed categories
  fuelType: "Petrol" | "Diesel" | "EV" | "CNG" | string;
  inclusions: TaxiFeature[];
  exclusions: TaxiFeature[];
  image: string;
  alt: string;
  createdAt: string; // Dates often arrive as ISO strings on the frontend
  updatedAt: string;
  __v: number;
  status: "published" | "draft" | string;
}

interface LeftReviewSectionProps {
  taxi: Taxiinterface;
}

const itineraryData = [
  {
    id: 1,
    title: "Pickup & Journey Start",
    description:
      "Pickup at the scheduled time from your location. Our verified driver will arrive 10 minutes early to assist with your luggage.",
    icon: MapPin,
    colorTheme: "amber",
  },
  {
    id: 2,
    title: "Comfortable Highway Journey",
    description:
      "Enjoy a smooth, uninterrupted drive. Our cabs are equipped with premium AC and comfortable seating for a relaxing experience.",
    icon: Car,
    colorTheme: "orange",
  },
  {
    id: 3,
    title: "Refreshment Break (Optional)",
    description:
      "A quick 15-minute halt at a verified, hygienic highway food court for snacks and restroom use.",
    icon: Coffee,
    colorTheme: "amber",
  },
  {
    id: 4,
    title: "Arrival at Destination",
    description:
      "Reach your destination safely and on time. The driver will drop you exactly at your specified location.",
    icon: Clock,
    colorTheme: "orange",
  },
];

// ── floating label input helper ─────────────────────────────────────────
const FloatingInput = ({
  name,
  label,
  value,
  onChange,
  required = false,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  required?: boolean;
}) => (
  <div className="relative">
    <input
      placeholder={label}
      required={required}
      name={name}
      value={value}
      onChange={onChange}
      className="peer w-full border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition placeholder-transparent bg-white"
    />
    <label className="absolute left-4 top-1.5 text-[11px] text-gray-400 transition-all pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-amber-500">
      {label}
      {required && " *"}
    </label>
  </div>
);

const LeftReviewSection = ({ taxi }: LeftReviewSectionProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    pickUp: "",
    drop: "",
    phone: "",
    time: "",
  });
  const [destination, setDestination] = useState("Your destination");
  const [pickUp, setPickUp] = useState("Your location");
  const [success, setSuccess] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(1);

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setDestination(form.drop);
    setPickUp(form.pickUp);
    console.log(form);
    try {
      const response = await fetch(`/api/simbark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          serviceType: `pickUp:- ${form.pickUp}, Drop:- ${form.drop}, PickUp Time:- ${form.time} "Enquiry from taxi Review page."`,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setDestination(form.drop);
        setPickUp(form.pickUp);
        setForm({
          name: "",
          email: "",
          phone: "",
          pickUp: "",
          drop: "",
          time: "",
        });
      } else {
        alert(data.message || "Failed to submit");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkFormFilled = () => {
    if (
      form.name == "" ||
      form.phone == "" ||
      form.email ||
      form.pickUp ||
      form.drop ||
      form.time
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="space-y-5 sm:space-y-7 mt-7">
      {/* BREADCRUMB */}
      <nav>
        <div className="flex items-center flex-wrap text-sm text-gray-400 gap-1 ml-2">
          <Link href="/" className="hover:text-amber-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/taxi" className="hover:text-amber-500 transition-colors">
            Taxi
          </Link>
          <span>/</span>
          <span className="text-amber-600 font-semibold line-clamp-1">
            {taxi.title}
          </span>
        </div>
      </nav>

      {/* JOURNEY ROUTE CARD */}
      {/* JOURNEY ROUTE CARD */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg">
        {/* Header label */}
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest opacity-80 mb-5">
          <Route size={13} />
          Journey Route
        </div>

        {/* Route row */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Pickup */}
          <div className="flex flex-col gap-1.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Navigation size={17} className="fill-white stroke-white" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
              Pickup
            </p>
            <p className="text-base sm:text-lg font-semibold truncate">
              {pickUp}
            </p>
          </div>

          {/* Connector + cab icon */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_4px,transparent_4px,transparent_8px)]" />
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 mx-1">
                <Car size={17} />
              </div>
              <div className="flex-1 h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.6)_0,rgba(255,255,255,0.6)_4px,transparent_4px,transparent_8px)]" />
            </div>
            <span className="text-[10px] opacity-60 font-medium tracking-wide">
              via road
            </span>
          </div>

          {/* Drop */}
          <div className="flex flex-col gap-1.5 items-end">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <MapPin size={17} className="fill-white/30 stroke-white" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
              Destination
            </p>
            <p className="text-base sm:text-lg font-semibold truncate">
              {destination}
            </p>
          </div>
        </div>

        {/* Footer badges */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap gap-4">
          {[
            { icon: <Clock size={13} />, label: "On-time pickup" },
            { icon: <ShieldCheck size={13} />, label: "Safe ride" },
            { icon: <Users size={13} />, label: "Local driver" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-[11px] font-medium opacity-80"
            >
              {icon}
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* TRAVELLER DETAILS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg p-5 sm:p-6 border border-amber-100">
        <h2 className="text-base sm:text-lg font-semibold mb-4">
          Traveller Details
        </h2>
        <form onSubmit={handleSubmit} id="taxi-booking-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FloatingInput
              name="name"
              label="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <FloatingInput
              name="phone"
              label="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <FloatingInput
              name="pickUp"
              label="Pickup Location"
              value={form.pickUp}
              onChange={handleChange}
              required
            />
            <FloatingInput
              name="drop"
              label="Drop Location"
              value={form.drop}
              onChange={handleChange}
              required
            />
            <FloatingInput
              name="time"
              label="Pickup Time (mention AM/PM)"
              value={form.time}
              onChange={handleChange}
              required
            />
            <FloatingInput
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {success && (
            <p className="text-green-600 text-sm font-medium mt-4 px-1">
              ✓ Enquiry sent successfully!
            </p>
          )}
        </form>
      </div>

      {/* CAB DETAILS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition">
        {/* Image — full width on mobile, left side on sm+ */}
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full h-44 sm:w-36 sm:h-auto shrink-0 bg-amber-50">
            <Image
              src={taxi.image}
              alt={taxi.alt || "cab"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 144px"
            />
            {/* Best seller badge overlaid on image */}
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
              Best Seller
            </span>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1 min-w-0">
            <h3 className="text-base font-bold text-stone-800 leading-snug">
              {taxi.title}
            </h3>

            {/* Spec pills */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">
                <Users size={11} className="text-amber-500" />
                {taxi.seats} Seats
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">
                <Wind size={11} className="text-amber-500" />
                AC
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">
                <Car size={11} className="text-amber-500" />
                {taxi.cabType}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 bg-stone-50 border border-stone-100 rounded-full px-3 py-1">
                <Fuel size={11} className="text-amber-500" />
                {taxi.fuelType}
              </span>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium mt-auto">
              <Star size={12} className="fill-amber-400 stroke-amber-400" />
              Comfortable Ride · Trusted Driver
            </div>
          </div>
        </div>
      </div>

      {/* INCLUSIONS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md sm:shadow-lg border border-amber-100">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Inclusions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
          {taxi.inclusions.map((item) => (
            <div key={item._id} className="flex items-start gap-2">
              <CheckCircle
                className="text-green-500 mt-0.5 shrink-0"
                size={16}
              />
              <span className="text-gray-600 leading-snug">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* EXCLUSIONS */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-md sm:shadow-lg border border-amber-100">
        <h2 className="text-base sm:text-lg font-semibold mb-4">Exclusions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
          {taxi.exclusions.map((item) => (
            <div key={item._id} className="flex items-start gap-2">
              <XCircle className="text-red-400 mt-0.5 shrink-0" size={16} />
              <span className="text-gray-600 leading-snug">
                {item.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TRIP ITINERARY */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-md sm:shadow-xl border border-amber-100">
        <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center gap-2">
          Trip Itinerary
        </h2>
        <div className="relative space-y-2">
          {/* Timeline line — desktop only */}
          <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-amber-100 -z-10 hidden sm:block" />

          {itineraryData.map((step) => {
            const Icon = step.icon;
            const isOpen = openStep === step.id;
            return (
              <div
                key={step.id}
                className={`rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "bg-amber-50/60 shadow-sm ring-1 ring-amber-100/60"
                    : "hover:bg-gray-50"
                }`}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full text-left flex items-center justify-between p-3 sm:p-4 gap-3 group"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-full transition-colors duration-300 ${
                        step.colorTheme === "amber"
                          ? "bg-amber-100 text-amber-600 group-hover:bg-amber-200"
                          : "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-semibold transition-colors duration-300 ${isOpen ? "text-amber-700" : "text-gray-800"}`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 bg-amber-100/60"
                        : "text-gray-400 group-hover:text-amber-600"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Accordion body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-gray-500 pb-4 px-3 sm:pl-[4.5rem] sm:pr-8 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeftReviewSection;
