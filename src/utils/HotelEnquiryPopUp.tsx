"use client";

import { X, Hotel } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HotelEnquiryPopup({ open, onClose }: Props) {

  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: "",
    message: "",
  });

  useEffect(() => {
    if (open) requestAnimationFrame(() => setAnimate(true));
    else setAnimate(false);
  }, [open]);

  if (!open) return null;

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          phone:   form.phone,
          email:   form.email,
          service: "Hotel Booking",
          message: form.message,
          details: {
            checkin:  form.checkin,
            checkout: form.checkout,
            guests:   form.guests,
          },
          source:  "HotelEnquiryPopup",
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("Hotel enquiry sent ✅ We'll call you shortly.");
      onClose();
    } catch (err: any) {
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center">

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative bg-white w-full max-w-4xl mx-4 rounded-3xl shadow-xl
        transform transition duration-500
        ${animate ? "translate-y-10 opacity-100" : "-translate-y-40 opacity-0"}`}
      >

        <button
          onClick={onClose}
          className="absolute top-5 right-5 bg-white rounded-full p-2 shadow"
        >
          <X />
        </button>

        <div className="p-8 border-b bg-pink-500 text-white rounded-t-3xl">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Hotel /> Hotel Booking Enquiry
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 grid md:grid-cols-2 gap-4"
        >

          <input name="name" placeholder="Full Name" className="input" required onChange={handleChange}/>
          <input name="phone" placeholder="Phone Number" className="input" required onChange={handleChange}/>

          <input
            name="email"
            type="email"
            placeholder="Email Address (for your booking confirmation)"
            className="input md:col-span-2"
            required
            onChange={handleChange}
          />

          <input type="date" name="checkin" className="input" onChange={handleChange}/>
          <input type="date" name="checkout" className="input" onChange={handleChange}/>

          <input name="guests" placeholder="Guests" className="input" onChange={handleChange}/>

          <textarea
            name="message"
            className="input md:col-span-2 h-24"
            placeholder="Special request"
            onChange={handleChange}
          />

          <button className="bg-pink-600 text-white py-3 rounded-xl md:col-span-2">
            {loading ? "Sending..." : "Send Hotel Enquiry"}
          </button>

        </form>

      </div>
    </div>
  );
}