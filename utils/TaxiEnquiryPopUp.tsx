"use client";

import { X, CarTaxiFront, MapPin, Phone, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TaxiEnquiryPopup({ open, onClose }: Props) {
  const [animate, setAnimate] = useState(false);
  const [loading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    if (open) requestAnimationFrame(() => setAnimate(true));
    else setAnimate(false);
  }, [open]);

  if (!open) return null;

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative bg-white w-full max-w-4xl mx-4 rounded-3xl shadow-2xl
        transform transition duration-500
        ${animate ? "translate-y-10 opacity-100" : "-translate-y-40 opacity-0"}`}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          <X />
        </button>

        {/* HEADER */}
        <div className="p-8 border-b bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-t-3xl">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <CarTaxiFront /> Taxi Booking Enquiry
          </h2>
          <p className="opacity-90">
            Book comfortable taxi service in Mathura & Vrindavan
          </p>
        </div>

        {/* FORM */}
        <form className="p-8 grid md:grid-cols-2 gap-6">

          {/* NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18}/>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
              required
            />
          </div>

          {/* PHONE */}
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 text-gray-400" size={18}/>
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
              required
            />
          </div>

          {/* PICKUP */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18}/>
            <input
              name="pickup"
              placeholder="Pickup Location"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

          {/* DROP */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18}/>
            <input
              name="drop"
              placeholder="Drop Location"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

          {/* DATE */}
          <div className="relative md:col-span-2">
            <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18}/>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
            />
          </div>

          {/* MESSAGE */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              placeholder="Trip details or special request..."
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200
              focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none
              transition resize-none h-28"
            />
          </div>

          {/* SUBMIT */}
          <button
            className="md:col-span-2 bg-gradient-to-r from-pink-600 to-pink-500
            hover:from-pink-700 hover:to-pink-600 text-white py-3 rounded-xl
            font-semibold shadow-lg transition"
          >
            {loading ? "Sending..." : "Send Taxi Enquiry"}
          </button>

        </form>
      </div>
    </div>
  );
}