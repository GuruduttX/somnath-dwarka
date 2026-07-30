"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X, User, Mail, Phone, MessageSquare, CheckCircle2, Loader2 } from "lucide-react";

/**
 * Site-wide lead-capture popup. Opens once — 10s after the visitor's first
 * eligible page load — and posts to /api/enquiry (the same endpoint every other
 * form uses, so the lead is saved, emailed and pushed to Sembark CRM).
 *
 * A `sessionStorage` flag makes it open only once per site visit: after it has
 * shown (or the visitor submits), it never re-opens for the rest of the session,
 * even as they navigate between pages. Hidden on admin, login and thank-you.
 */

const DELAY_MS = 10_000;
const SHOWN_KEY = "enquiryPopupShown";

// Routes where the popup must never show.
const isBlockedPath = (path: string) =>
  path.startsWith("/admin-x9AqP7mK2") || path.includes("-login") || path === "/thank-you";

export default function EnquiryPopup() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  // Arm the timer only until the popup has shown once this session. The
  // sessionStorage flag survives navigations (so it won't reopen page to page)
  // but resets on a fresh visit — exactly "once when the user visits the site".
  useEffect(() => {
    if (submitted || isBlockedPath(pathname || "")) return;
    if (typeof window !== "undefined" && sessionStorage.getItem(SHOWN_KEY)) return;

    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        /* private mode / storage disabled — still open, just may recur */
      }
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname, submitted]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => setOpen(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const phone = form.phone.replace(/\D/g, ""); // digits only for the API
    if (form.name.trim().length < 2 || phone.length < 6) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          countryCode: "+91",
          phone,
          service: "General Enquiry",
          message: form.message.trim() || undefined,
          source: "Website Popup",
          pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "failed");

      setStatus("idle");
      setSubmitted(true); // don't nag again this session
      // brief success screen, then auto-close
      setTimeout(() => setOpen(false), 2600);
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  const done = submitted;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4
        bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-label="Plan your Somnath Dwarka trip"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl
          animate-[popIn_0.28s_cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center
            rounded-full bg-white/80 text-gray-500 backdrop-blur
            hover:bg-white hover:text-gray-800 transition"
        >
          <X size={18} />
        </button>

        {/* Header band */}
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 px-6 pt-7 pb-6 text-center">
          <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-xl font-bold text-white">
            Plan Your Somnath Dwarka Yatra
          </h2>
          <p className="relative mt-1 text-sm text-orange-50/90">
            Share your details — we&apos;ll call you back with the best plan &amp; price.
          </p>
        </div>

        {/* Body */}
        {done ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
            <CheckCircle2 className="text-green-500" size={54} />
            <h3 className="text-lg font-semibold text-gray-800">Thank you!</h3>
            <p className="text-sm text-gray-500">
              Your enquiry is received. Our team will reach out to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-3 px-6 py-6">
            {/* Full name */}
            <div className="relative">
              <User size={16} className={iconCls} />
              <input
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
                className={fieldCls}
                style={noOutline}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail size={16} className={iconCls} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="Email address"
                className={fieldCls}
                style={noOutline}
              />
            </div>

            {/* Phone — +91 is fixed, so it sits in the field as a static prefix */}
            <div className="relative">
              <Phone size={16} className={iconCls} />
              <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2
                border-r border-gray-200 pr-2 text-sm font-medium text-gray-500">
                +91
              </span>
              <input
                required
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value.replace(/[^\d]/g, ""))}
                placeholder="Phone / WhatsApp number"
                className={`${fieldCls} pl-[4.6rem]`}
                style={noOutline}
                maxLength={15}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-orange-400" />
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Your message (travel dates, group size…)"
                className={`${fieldCls} resize-none`}
                style={noOutline}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500" role="alert">
                Please enter a valid name and phone number.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl
                bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-sm font-semibold text-white
                shadow-lg shadow-orange-500/25 transition
                hover:from-orange-600 hover:to-amber-600 disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                "Get a Callback"
              )}
            </button>

          
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * Border + focus ring live on the field itself (no wrapper ring), so a focused
 * input can only ever draw one rounded box. `noOutline` is applied inline so no
 * global `:focus-visible` outline rule can stack a square ring on top of it.
 */
const fieldCls =
  "w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-3 text-sm text-gray-800 " +
  "placeholder-gray-400 transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100";

const iconCls = "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400";

const noOutline: React.CSSProperties = { outline: "none", outlineOffset: 0 };
