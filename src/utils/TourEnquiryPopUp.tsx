"use client";

import { X, Map, User, Phone, Mail, Send } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function TourEnquiryPopup({ open, onClose }: Props) {
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "Tour Package",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // PHONE VALIDATION
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Enter valid email");
      return;
    }

    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/simbark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Submitted successfully ✅");

      // RESET
      setForm({
        name: "",
        phone: "",
        email: "",
        serviceType: "Tour Package",
      });

      onClose(); // optional UX improvement
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setAnimate(true));
      document.body.style.overflow = "hidden";
    } else {
      setAnimate(false);
      document.body.style.overflow = "auto";
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">

  {/* BACKDROP — warm amber blur, no black */}
  <div
    className="absolute inset-0 backdrop-blur-md"
    style={{ background: "rgba(180, 80, 10, 0.25)" }}
    onClick={onClose}
  />

  {/* MODAL */}
  <div
    className={`relative w-full max-w-md rounded-3xl overflow-hidden
    transform transition-all duration-500
    ${animate ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-95"}`}
    style={{
      background: "#fffaf5",
      boxShadow: "0 24px 80px rgba(160, 60, 0, 0.22), 0 4px 20px rgba(200, 100, 0, 0.12)",
    }}
  >

    {/* CLOSE */}
    <button
      onClick={onClose}
      className="absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.3)",
        border: "1px solid rgba(255,255,255,0.5)",
        color: "#fff",
      }}
    >
      <X size={16} />
    </button>

    {/* HEADER */}
    <div
      className="px-7 pt-8 pb-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(148deg, #7C2D00 0%, #B8420F 50%, #E8781A 100%)",
      }}
    >
      {/* decorative circles */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 rounded-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <div
        className="absolute -bottom-14 -left-6 w-36 h-36 rounded-full"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />

      <p
        className="text-xs tracking-widest uppercase mb-1 font-medium"
        style={{ color: "rgba(255, 210, 150, 0.85)" }}
      >
        We'd love to meet you
      </p>
      <h2
        className="text-2xl font-bold text-white flex items-center gap-2.5"
      >
        <Map size={21} style={{ color: "rgba(255,200,120,0.9)" }} />
        Plan Your Visit
      </h2>
      <p
        className="text-sm mt-1 font-light"
        style={{ color: "rgba(255, 225, 185, 0.75)" }}
      >
        Fill in your details and we'll be in touch.
      </p>
    </div>

    {/* WAVE DIVIDER */}
    <svg
      viewBox="0 0 460 28"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full -mt-px block"
      style={{ height: 28 }}
    >
      <path
        d="M0,0 C80,28 160,0 230,16 C300,28 380,4 460,20 L460,0 Z"
        fill="#E8781A"
      />
      <path
        d="M0,0 C80,28 160,0 230,16 C300,28 380,4 460,20 L460,28 L0,28 Z"
        fill="#fffaf5"
      />
    </svg>

    {/* FORM BODY */}
    <form onSubmit={handleSubmit} className="px-7 pb-7 space-y-4" style={{ background: "#fffaf5" }}>

      {/* Name */}
      <div>
        <label
          className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
          style={{ color: "#9C4018" }}
        >
          Your Name
        </label>
        <div className="relative flex items-center">
          <User
            size={15}
            className="absolute left-3.5 pointer-events-none"
            style={{ color: "#C96030" }}
          />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "#fff",
              border: "1.5px solid #F0C8A0",
              color: "#3D1A08",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#D96018";
              e.target.style.boxShadow = "0 0 0 3px rgba(217,96,24,0.14)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#F0C8A0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
          style={{ color: "#9C4018" }}
        >
          Phone Number
        </label>
        <div className="relative flex items-center">
          <Phone
            size={15}
            className="absolute left-3.5 pointer-events-none"
            style={{ color: "#C96030" }}
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+98765 43210"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "#fff",
              border: "1.5px solid #F0C8A0",
              color: "#3D1A08",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#D96018";
              e.target.style.boxShadow = "0 0 0 3px rgba(217,96,24,0.14)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#F0C8A0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          className="block text-xs font-semibold tracking-widest uppercase mb-1.5"
          style={{ color: "#9C4018" }}
        >
          Email Address
        </label>
        <div className="relative flex items-center">
          <Mail
            size={15}
            className="absolute left-3.5 pointer-events-none"
            style={{ color: "#C96030" }}
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "#fff",
              border: "1.5px solid #F0C8A0",
              color: "#3D1A08",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#D96018";
              e.target.style.boxShadow = "0 0 0 3px rgba(217,96,24,0.14)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#F0C8A0";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Thin divider */}
      <div
        className="w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #F0C090, transparent)",
        }}
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
        style={{
          background: loading
            ? "#D0906A"
            : "linear-gradient(130deg, #A83208, #D96018)",
          boxShadow: loading ? "none" : "0 4px 18px rgba(180, 70, 10, 0.35)",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,220,180,0.9)"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <Send size={15} style={{ stroke: "rgba(255,210,150,0.9)" }} />
            Confirm My Visit
          </>
        )}
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "#B07850" }}
      >
        We'll reach out within 24 hours to confirm.
      </p>

    </form>
  </div>
</div>
  );
}