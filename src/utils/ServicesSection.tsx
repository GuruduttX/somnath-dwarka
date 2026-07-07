"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin, Car, Hotel, Sparkles,
  Phone, Mail, Clock, CheckCircle2, ArrowRight, Users, Star, Award,
} from "lucide-react";

const stats = [
  { icon: Users, value: "5000+", label: "Happy Pilgrims" },
  { icon: Star, value: "4.8", label: "Avg Rating" },
  { icon: Award, value: "12+", label: "Years Experience" },
  { icon: CheckCircle2, value: "50+", label: "Tour Packages" },
];

const whyUs = [
  "Trusted by 5000+ pilgrims",
  "Best price guarantee",
  "Local experts 12+ years Exp.",
  "24/7 trip support",
];

const serviceOptions = [
  { value: "tour", label: "Tour Package", icon: MapPin },
  { value: "hotel", label: "Hotel Booking", icon: Hotel },
  { value: "taxi", label: "Taxi Service", icon: Car },
  { value: "puja", label: "Puja & Temple", icon: Sparkles },
];

const TIMING_OPTIONS = [
  "Within 48 Hours",
  "Within 3 to 4 days",
  "Within a week",
  "Within a month",
  "Just Researching",
];

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", timing: "" });

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name is required");
    if (!/^[0-9]{10}$/.test(form.phone)) return alert("Enter valid 10-digit phone");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) return alert("Enter valid email");
    if (!form.service) return alert("Select service type");
    setStep(2);
  };

  const handleSubmit = async (timing: string) => {
    const payload = { ...form, timing };
    setLoading(true);
    try {
      const res = await fetch("/api/simbark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          service: payload.service,
          comments: `Booking Timing: ${timing}`,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
        setForm({ name: "", email: "", phone: "", service: "", timing: "" });
      } else {
        alert(data.message || "Failed to submit");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="services" className="relative py-10 md:py-20 overflow-hidden bg-gradient-to-b from-white via-amber-50/40 to-white">

      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-200/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-200/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            ✦ Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Plan Your Divine Journey
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
              <line x1="0" y1="6" x2="26" y2="6" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="34" cy="6" r="3" fill="#f97316"/>
              <circle cx="43" cy="6" r="2" fill="#fbbf24"/>
              <circle cx="50" cy="6" r="1.5" fill="#fde68a"/>
            </svg>
            <p className="text-gray-400 text-sm">We'll get back to you within 2 hours</p>
            <svg width="80" height="12" viewBox="0 0 80 12" fill="none">
              <circle cx="30" cy="6" r="1.5" fill="#fde68a"/>
              <circle cx="37" cy="6" r="2" fill="#fbbf24"/>
              <circle cx="46" cy="6" r="3" fill="#f97316"/>
              <line x1="54" y1="6" x2="80" y2="6" stroke="#fdba74" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — completely untouched */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <p className="text-gray-500 text-sm leading-relaxed">
              Vrindavan's most trusted travel partner — curating complete spiritual journeys across Vrindavan, Mathura &amp; Braj Dham since 2012.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3 bg-white border border-amber-100 rounded-xl px-3.5 py-3 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-gray-900 leading-none">{value}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 rounded-xl md:rounded-2xl p-2 md:p-4">
              <p className="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Why Choose Us</p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-8">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-white/90 text-xs text-nowrap">
                    <CheckCircle2 size={12} className="text-yellow-200 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Phone, label: "+91 98765 43210" },
                { icon: Mail, label: "info@vrindavan.com" },
                { icon: Clock, label: "8AM – 9PM Daily" },
                { icon: MapPin, label: "Vrindavan, UP" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white border border-amber-100 rounded-xl px-3 py-2.5 shadow-sm">
                  <Icon size={12} className="text-amber-500 flex-shrink-0" />
                  <span className="text-gray-500 text-xs truncate">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — multistep form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl border border-amber-100 shadow-xl shadow-amber-100/30 p-6 overflow-y-auto max-h-[520px]">

              {/* ── Step 1 — all original fields ── */}
              {step === 1 && (
                <form onSubmit={handleStep1} className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">Send an Enquiry</h3>
                    <p className="text-gray-400 text-xs mt-0.5">We'll get back to you within 2 hours.</p>
                  </div>

                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />

                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />

                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  />

                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select a Service</option>
                    {serviceOptions.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 text-white font-bold text-sm shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-300/60 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-1"
                  >
                    Next
                    <ArrowRight size={15} />
                  </button>

                  <p className="text-center text-[11px] text-gray-400">🔒 Your details are safe with us.</p>
                </form>
              )}

              {/* ── Step 2 — timing (ref Step 3) ── */}
              {step === 2 && (
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">Almost there, {form.name}!</h3>
                    <p className="text-gray-400 text-xs mt-0.5">When are you looking to book?</p>
                  </div>

                  {TIMING_OPTIONS.map((opt) => {
                    const selected = form.timing === opt;
                    return (
                      <div
                        key={opt}
                        onClick={async () => {
                          setForm((p) => ({ ...p, timing: opt }));
                          await handleSubmit(opt);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all
                          ${selected
                            ? "border-amber-400 bg-amber-50 shadow-sm"
                            : "border-gray-200 bg-gray-50 hover:border-amber-300 hover:bg-amber-50/50"
                          }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                          ${selected ? "border-amber-500" : "border-gray-300"}`}>
                          {selected && <div className="w-2 h-2 rounded-full bg-amber-500" />}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{opt}</span>
                        {loading && selected && (
                          <span className="ml-auto text-xs text-amber-500">Sending…</span>
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-amber-600 hover:underline text-left mt-1 cursor-pointer"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {/* ── Step 3 — Success ── */}
              {step === 3 && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-200">
                    <CheckCircle2 size={26} className="text-white" />
                  </div>
                  <h4 className="text-lg font-extrabold text-gray-900 mb-1">Enquiry Sent!</h4>
                  <p className="text-gray-400 text-sm">We'll reach out within 2 hours.</p>
                  <button
                    onClick={() => { setStep(1); setForm({ name: "", email: "", phone: "", service: "", timing: "" }); }}
                    className="mt-5 text-amber-600 text-sm font-semibold hover:underline"
                  >
                    Send another
                  </button>
                </div>
              )}

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}