"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { track } from "@/src/lib/events";

/**
 * Home §14 — two-step enquiry form, anchored in the page (never a popup).
 *
 * Step 1 (name, mobile, travel month) creates the lead and fires the
 * conversion, so a visitor who stops there still counts. Step 2 (group size,
 * starting city, hotel category, request) qualifies that same lead through a
 * signed PATCH rather than creating a second one. Honeypot spam guard.
 */

const STARTING_CITIES = ["Ahmedabad", "Rajkot", "Jamnagar", "Dwarka", "Somnath", "Mumbai", "Other"];

type Lead = { id: string; token: string };

/** "+91 98765 43210" / "098765 43210" → "9876543210". */
const cleanPhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
};

export default function TwoStepEnquiry({
  months,
  tiers,
}: {
  /** e.g. ["October 2026", …] — computed on the server so render stays pure. */
  months: string[];
  tiers: string[];
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");
  const [lead, setLead] = useState<Lead | null>(null);

  async function submitStep1(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("company")) return; // honeypot tripped
    const phone = cleanPhone(String(data.get("phone") || ""));
    if (phone.length < 10) {
      setStatus("error");
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          countryCode: "+91",
          phone,
          service: "Somnath Dwarka Tour Package",
          details: { travelDate: data.get("month") || undefined },
          source: "HomeTwoStepForm",
          pageUrl: window.location.href,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "failed");
      // Step 1 is the conversion — it must fire even if step 2 is abandoned.
      track("generate_lead", { form: "home_two_step", step: 1, currency: "INR" });
      track("form_submit", { form: "home_two_step", step: 1, page_cluster: "home" });
      setLead({ id: json.data?.id, token: json.data?.token });
      setStatus("idle");
      setStep(2);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message !== "failed" ? err.message : "Something went wrong. Please WhatsApp us instead.");
    }
  }

  async function submitStep2(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lead?.id || !lead.token) {
      setStep(3);
      return;
    }
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          token: lead.token,
          adults: data.get("adults"),
          children: data.get("children") || 0,
          startingCity: data.get("city"),
          hotelCategory: data.get("tier") || undefined,
          request: data.get("request") || undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "failed");
      track("form_submit", { form: "home_two_step", step: 2, page_cluster: "home" });
      setStatus("idle");
      setStep(3);
    } catch {
      setStatus("error");
      setError("We could not save these details, but your enquiry is with us. We will ask on WhatsApp.");
    }
  }

  const input =
    "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-orange-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100";
  const select = `${input} appearance-none pr-10`;
  const label = "mb-1.5 block text-[12.5px] font-semibold text-[#2D1B10]";
  const btn =
    "inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-orange-600 to-orange-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(234,88,12,0.28)] transition hover:brightness-110 disabled:opacity-60 sm:w-auto";

  return (
    <div>
      <ol className="mb-5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider" aria-label="Form progress">
        {["Your details", "Your trip"].map((s, i) => (
          <li key={s} className="flex items-center gap-2" aria-current={step === i + 1 ? "step" : undefined}>
            {i > 0 ? <span className={`h-px w-8 ${step > i ? "bg-orange-400" : "bg-slate-200"}`} aria-hidden="true" /> : null}
            <span className={`flex items-center gap-2 ${step > i ? "text-orange-600" : "text-slate-400"}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${step > i ? "bg-orange-600 text-white" : "bg-slate-100"}`}>
                {step > i + 1 ? <CheckCircle2 size={14} aria-hidden="true" /> : i + 1}
              </span>
              {s}
            </span>
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <form onSubmit={submitStep1} aria-label="Enquiry step 1 of 2">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className={label}>Name</span>
              <input required minLength={2} name="name" autoComplete="name" placeholder="Your name" className={input} />
            </label>
            <label className="block">
              <span className={label}>Mobile number</span>
              <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" className={input} />
            </label>
            <label className="block">
              <span className={label}>Travel month</span>
              <span className="relative block">
                <select required name="month" defaultValue="" className={select}>
                  <option value="" disabled>Select month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                  <option value="Not decided yet">Not decided yet</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-orange-700" aria-hidden="true" />
              </span>
            </label>
          </div>
          {status === "error" ? <p className="mt-3 text-sm text-red-600" role="alert">{error}</p> : null}
          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button type="submit" disabled={status === "sending"} className={btn}>
              {status === "sending" ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : null}
              Get my plan and price <ArrowRight size={16} aria-hidden="true" />
            </button>
            <p className="text-[12.5px] leading-relaxed text-slate-500">
              We use your number only to send your plan and reply to this enquiry, by call or WhatsApp. No spam and no
              obligation. See our{" "}
              <Link href="/privacy/" className="underline underline-offset-2">privacy policy</Link>.
            </p>
          </div>
        </form>
      ) : null}

      {step === 2 ? (
        <form onSubmit={submitStep2} aria-label="Enquiry step 2 of 2">
          <p className="mb-5 flex items-start gap-2 rounded-2xl bg-green-50 p-4 text-[14px] text-green-900">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
            Got it, your enquiry is with us. Four quick answers let us send an exact price rather than a range.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Adults</span>
              <input required name="adults" type="number" min={1} max={60} defaultValue={2} className={input} />
            </label>
            <label className="block">
              <span className={label}>Children</span>
              <input name="children" type="number" min={0} max={60} defaultValue={0} className={input} />
            </label>
            <label className="block">
              <span className={label}>Starting city</span>
              <span className="relative block">
                <select required name="city" defaultValue="" className={select}>
                  <option value="" disabled>Select city</option>
                  {STARTING_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-orange-700" aria-hidden="true" />
              </span>
            </label>
            <label className="block">
              <span className={label}>Hotel category</span>
              <span className="relative block">
                <select name="tier" defaultValue="" className={select}>
                  <option value="">Not sure yet</option>
                  {tiers.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-orange-700" aria-hidden="true" />
              </span>
            </label>
          </div>
          <label className="mt-4 block">
            <span className={label}>Any special request (optional)</span>
            <textarea name="request" rows={2} maxLength={1000} placeholder="Elders travelling, wheelchair, a festival date, add Gir…" className={input} />
          </label>
          {status === "error" ? <p className="mt-3 text-sm text-red-600" role="alert">{error}</p> : null}
          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button type="submit" disabled={status === "sending"} className={btn}>
              {status === "sending" ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : null}
              Send my trip details <ArrowRight size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setStep(3)} className="text-[13.5px] font-semibold text-slate-500 underline-offset-2 hover:underline">
              Skip, just contact me
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 ? (
        <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-5 text-green-900" role="status">
          <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-green-600" aria-hidden="true" />
          <div>
            <p className="text-[16px] font-bold">Thank you, we have your enquiry.</p>
            <p className="mt-1 text-[14.5px] leading-relaxed">
              Your coordinator will send a day-wise plan with the price and named hotels, most often the same day.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
