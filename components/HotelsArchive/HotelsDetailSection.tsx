"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star,
  Trophy,
  MapPin,
  DoorOpen,
  ShieldCheck,
  Wifi,
  Car,
  Utensils,
  Bath,
} from "lucide-react";

export default function HotelDetailsSection({ HotelData }: { HotelData: any }) {

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });

  const clearStatus = () => {
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }

    try {

      const response = await fetch("/api/simbark", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          serviceType: form.comments,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setStatus("success");
      setFeedbackMsg("Enquiry has been sent successfully.");
      clearStatus();

    } catch (error) {

      setStatus("error");
      setFeedbackMsg("Something went wrong. Try again");
      clearStatus();

    } finally {

      setForm({
        name: "",
        phone: "",
        email: "",
        comments: "",
      });

    }

  };



  return (

    <section className="relative pt-8 md:pt-16 pb-6 md:pb-12 bg-gradient-to-br from-white via-amber-50/40 to-orange-50/40">

      {/* background glow */}

      
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-[120px] rounded-full"></div>


      <div className="max-w-[1300px] mx-auto px-6 grid lg:grid-cols-[1.6fr_1fr] gap-16 items-start">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* TITLE */}

          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {HotelData.title}
          </h1> */}


          {/* PREMIUM RATING AREA */}

          <div className="flex flex-wrap items-center gap-4 mt-6">

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-md"
            >
              <Star size={16} fill="white" />
              <span className="font-semibold">{HotelData.rating}</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium"
            >
              {HotelData.reviews} Reviews
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm text-sm font-medium"
            >
              <MapPin size={16} className="text-orange-500" />
              {HotelData.category}
            </motion.div>

          </div>


          {/* GUEST FAVORITE */}

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative mt-10 bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 text-white rounded-3xl p-8 flex justify-between items-center shadow-xl overflow-hidden"
          >

            <div className="absolute right-0 top-0 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>

            <div>
              <p className="text-sm opacity-80">Guest Favourite</p>

              <p className="font-semibold text-lg">
                One of the most loved hotels in {HotelData.category}
              </p>
            </div>

            <Trophy size={32} />

          </motion.div>


          {/* HOST */}

          <div className="mt-10 flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center font-semibold shadow-lg">
              R
            </div>

            <div>
              <p className="font-semibold text-lg">
                Hosted by {HotelData.host}
              </p>

              <p className="text-sm text-gray-500">
                Superhost · 6 years hosting
              </p>
            </div>

          </div>


          {/* FEATURES */}

          <div className="mt-12 space-y-6 border-t pt-10">

            <Feature icon={<Trophy />} title="Top Rated Hotel" desc="Top 10% rated property in Vrindavan" />
            <Feature icon={<DoorOpen />} title="Self Check-in" desc="Easy flexible check-in experience" />
            <Feature icon={<MapPin />} title="Prime Temple Location" desc="Just 5 minutes from Prem Mandir" />
            <Feature icon={<ShieldCheck />} title="Safe Stay" desc="Verified hotel with trusted service" />

          </div>



          {/* AMENITIES */}

          <div className="mt-16">

            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              What this place offers
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

              <Amenity icon={<Wifi />} title="Free WiFi" />
              <Amenity icon={<Car />} title="Free Parking" />
              <Amenity icon={<Utensils />} title="Pure Veg Restaurant" />
              <Amenity icon={<Bath />} title="Private Bathrooms" />
              <Amenity icon={<MapPin />} title="Temple View Rooms" />
              <Amenity icon={<ShieldCheck />} title="24×7 Security" />

            </div>

          </div>


          {/* DESCRIPTION */}

          <div className="mt-16 text-gray-600 leading-relaxed">

            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              About this stay
            </h3>

            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: HotelData.about ?? "" }}
            />

          </div>

        </motion.div>



        {/* RIGHT BOOKING FORM */}

        <div className="hidden md:block sticky top-28 bg-white/80 backdrop-blur-xl border border-orange-100 rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Enquire About This Hotel
          </h3>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

            <input
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-orange-500"
            />

            <input
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-orange-500"
            />

            <div className="flex gap-3">

              <div className="border border-gray-300 rounded-xl px-4 flex items-center bg-white">
                +91
              </div>

              <input
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:ring-1 focus:ring-orange-500"
              />

            </div>

            <textarea
              name="comments"
              placeholder="Comments"
              rows={4}
              value={form.comments}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-1 focus:ring-orange-500"
            />

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:scale-[1.02]"
            >
              Send Enquiry
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}



/* FEATURE CARD */

function Feature({ icon, title, desc }: any) {

  return (

    <motion.div
      whileHover={{ x: 6 }}
      className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition"
    >

      <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
        {icon}
      </div>

      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>

    </motion.div>

  );
}



/* AMENITY CARD */

function Amenity({ icon, title }: any) {

  return (

    <motion.div
      whileHover={{ y: -4 }}
      className="flex items-center gap-3 bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition"
    >

      <div className="text-amber-500">
        {icon}
      </div>

      <span className="text-sm font-medium">
        {title}
      </span>

    </motion.div>

  );
}