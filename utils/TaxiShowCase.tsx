"use client";

import Image from "next/image";
import { useState } from "react";
import { MapPin, Phone, User, CarTaxiFront } from "lucide-react";

export default function TaxiShowCase() {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [pickup,setPickup] = useState("");
  const [drop,setDrop] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async ()=> {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!phone.trim()) {
      alert("phone is required.");
      return;
    }

    if (!pickup.trim()) {
      alert("pickup is required.");
      return;
    }

    if (!drop.trim()) {
      alert("drop is required.");
      return;
    }

    try {
      const response = await fetch("api/simbark", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          phone_number: phone,
          comments: `service Type - Taxi booking, PickUp - ${pickup} Drop - ${drop}`,
        }),
      });

      const formsubmitData = await response.json();

      if (!response.ok) {
        throw new Error(formsubmitData.message || "Submission failed");
      }

      console.log("Success:", formsubmitData);
    } catch (error) {
      console.log("ERROR: submitting form", error);
    } finally {
      setName("")
      setPhone("")
      setPickup("")
      setDrop("")
    }
  }
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-amber-400/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-orange-400/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* Taxi Image */}
        <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl group">

          <Image
            src="/images/Home/taxi-home.webp"
            alt="Taxi Service"
            fill
            loading="lazy"
            className="object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-2xl font-bold">Premium Taxi Service</h3>
            <p className="text-sm opacity-90">
              Comfortable rides for your spiritual journey
            </p>
          </div>

        </div>

        {/* Booking Card */}
        <div className="relative">

          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-amber-500 to-orange-600 rounded-3xl blur opacity-20"></div>

          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-amber-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
              Book Your Taxi
            </h2>

            <div className="space-y-6">

              {/* Name */}
              <div className="relative group">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur outline-none text-sm transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />

                <label className="absolute left-11 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                  Your Name
                </label>

              </div>

              {/* Phone */}
              <div className="relative group">

                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition"
                />

                <input
                  type="number"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur outline-none text-sm transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />

                <label className="absolute left-11 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                  Phone Number
                </label>

              </div>

              {/* Pickup */}
              <div className="relative group">

                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition"
                />

                <input
                  type="text"
                  value={pickup}
                  onChange={(e)=>setPickup(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur outline-none text-sm transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                />

                <label className="absolute left-11 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                  Pickup Location
                </label>

              </div>

              {/* Drop */}
              <div className="relative group">

                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition"
                />

                <input
                  type="text"
                  value={drop}
                  onChange={(e)=>setDrop(e.target.value)}
                  placeholder=" "
                  className="peer w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur outline-none text-sm transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />

                <label className="absolute left-11 top-3 text-gray-500 text-sm transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-600 peer-focus:bg-white peer-focus:px-1 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm">
                  Drop Location
                </label>

              </div>

            </div>

            {/* Button */}
            <button
             
              className="w-full mt-8 py-3 rounded-full cursor-pointer text-white font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-amber-500 to-orange-600 hover:scale-[1.02] transition shadow-lg"
             onClick={handleSubmit}>
              <CarTaxiFront size={18}/>
              Book Taxi Now
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}