"use client";

import { useState } from "react";

/**
 * Short enquiry form (SOP §13): name, phone/email, dates, package/route.
 * Honeypot spam protection, server-side handled by /api/simbark, success →
 * /thank-you (noindex). Lead also deep-links to WhatsApp as a fallback.
 */
export default function EnquiryForm({
  context = "General enquiry",
  compact = false,
}: {
  context?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot tripped
    setStatus("sending");
    try {
      const res = await fetch("/api/simbark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          comments: `[${context}] dates: ${data.get("dates") || "-"} · interest: ${
            data.get("interest") || "-"
          }`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      window.location.href = "/thank-you";
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-label={`Enquiry — ${context}`}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className={compact ? "" : "grid sm:grid-cols-2 gap-3"}>
        <label className="block">
          <span className="sr-only">Your name</span>
          <input required name="name" placeholder="Your name" className="ceq-input" />
        </label>
        <label className="block">
          <span className="sr-only">Phone</span>
          <input required name="phone" type="tel" placeholder="Phone / WhatsApp" className="ceq-input" />
        </label>
      </div>
      <div className={compact ? "" : "grid sm:grid-cols-2 gap-3"}>
        <label className="block">
          <span className="sr-only">Email</span>
          <input name="email" type="email" placeholder="Email (optional)" className="ceq-input" />
        </label>
        <label className="block">
          <span className="sr-only">Travel dates</span>
          <input name="dates" placeholder="Travel dates" className="ceq-input" />
        </label>
      </div>
      <input type="hidden" name="interest" value={context} />
      {status === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please WhatsApp us instead.
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="ceq-btn-primary">
        {status === "sending" ? "Sending…" : "Get a callback"}
      </button>
    </form>
  );
}
