"use client";

import { useState } from "react";
import { User, Phone, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function QuickQuery({ setOpen, form, setForm }: any) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const clearStatus = async () => {
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedbackMsg("");

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setStatus("idle");
      return;
    }
    if (!form.name.trim()) {
      alert("Name is required.");
      setStatus("idle");
      return;
    }

    try {
      const response = await fetch("api/simbark", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const formsubmitData = await response.json();
      if (!response.ok) throw new Error(formsubmitData.message || "Submission failed");
      setStatus("success");
      setFeedbackMsg("Enquiry sent! We'll call you shortly.");
      clearStatus();
    } catch (error) {
      setStatus("error");
      setFeedbackMsg("Something went wrong. Please try again.");
    } finally {
      setForm({ name: "", phone: "" });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-md shadow-orange-100/50">

      {/* ── ORANGE HEADER BAND ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 px-5 py-4">
        {/* Background mandala */}
        <svg viewBox="0 0 200 200" className="absolute -right-8 -top-8 h-28 w-28 opacity-10" aria-hidden="true">
          {[30, 55, 80].map((r) => (
            <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="white" strokeWidth="1" />
          ))}
          {[...Array(8)].map((_, i) => (
            <line
              key={i}
              x1="100" y1="100"
              x2={(100 + 90 * Math.cos((i * 45 * Math.PI) / 180)).toFixed(3)}
              y2={(100 + 90 * Math.sin((i * 45 * Math.PI) / 180)).toFixed(3)}
              stroke="white" strokeWidth="0.6"
            />
          ))}
        </svg>

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles size={10} className="text-orange-200" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-orange-200">
                Special Offer
              </span>
            </div>
            <p className="text-[15px] font-bold leading-tight text-white">
              Get Custom Pricing
              <span className="ml-1.5 text-[12px] font-normal text-orange-200">/person</span>
            </p>
            <p className="mt-0.5 text-[11px] text-orange-200/80">
              Limited time · No hidden charges
            </p>
          </div>
          {/* Price tag pill */}
          <div className="shrink-0 rounded-2xl bg-white/20 px-3 py-1.5 text-center backdrop-blur-sm border border-white/20">
            <p className="text-[10px] text-orange-200 font-medium">Starting</p>
            <p className="text-sm font-bold text-white leading-tight">₹4,999</p>
          </div>
        </div>
      </div>

      {/* ── FORM BODY ──────────────────────────────────────────── */}
      <div className="px-5 py-4">
        <p className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-orange-400">
          Quick Enquiry
        </p>

        <div className="flex flex-col gap-2.5">

          {/* Name field */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <User size={14} className="text-orange-300" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-orange-100 bg-orange-50/50 py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none ring-0 transition-all duration-150 focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-200"
            />
          </div>

          {/* Phone field */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
              <Phone size={14} className="text-orange-300" />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-orange-100 bg-orange-50/50 py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 outline-none ring-0 transition-all duration-150 focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-200"
            />
          </div>

          {/* Feedback messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-[12px] text-green-700">
              <CheckCircle2 size={13} />
              {feedbackMsg}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600">
              <AlertCircle size={13} />
              {feedbackMsg}
            </div>
          )}

          {/* Submit button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={status === "loading"}
            className="group mt-0.5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white shadow-md shadow-orange-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-300/50 active:translate-y-0 disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Enquiry
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Trust line */}
        <p className="mt-3 text-center text-[11px] text-gray-400">
          🔒 Your details are safe &amp; never shared
        </p>
      </div>
    </div>
  );
}