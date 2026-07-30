"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

/**
 * Modern, Tailwind-only enquiry form for the guide-detail sticky sidebar.
 * Posts to /api/enquiry (same endpoint as every other form) and redirects to
 * /thank-you on success. Styled entirely with Tailwind — no global `.ceq-*`.
 */
export default function GuideEnquiryForm({ context }: { context: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email") || undefined,
          service: context,
          details: { travelDate: data.get("dates") || undefined },
          source: "GuideSidebarForm",
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error("failed");
      window.location.href = "/thank-you";
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" aria-label={`Enquiry — ${context}`}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <input required name="name" placeholder="Your name" className={field} />
      <input required name="phone" type="tel" placeholder="Phone / WhatsApp" className={field} />
      <input name="email" type="email" placeholder="Email (optional)" className={field} />
      <input name="dates" placeholder="Travel dates" className={field} />

      {status === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          Something went wrong. Please WhatsApp us instead.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-600 hover:to-amber-600 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Get a callback"
        )}
      </button>
    </form>
  );
}
