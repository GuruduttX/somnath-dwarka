"use client"

import { X, Check, CheckCircle2, Users, Clock } from "lucide-react"
import { useEffect, useState } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type FormType = {
  name: string
  email: string
  phone: string
  content: string
  travelWith: string
  bookingTime: string
}

const TOTAL_STEPS = 3

const TRAVEL_OPTIONS = ["Solo", "Spouse", "Family", "Friends"]

const TIMING_OPTIONS = [
  "Within 48 Hours",
  "Within 3 to 4 days",
  "Within a week",
  "Within a month",
  "Just Researching",
]

// ─── Styles (shared with CommonEnquiryForm design system) ────────────────────

const LP_STYLES = `
  
`

// ─── Root Component ───────────────────────────────────────────────────────────

export default function LeadPopup() {
  const [open, setOpen]       = useState(false)
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState<FormType>({
    name: "", email: "", phone: "",
    content: "", travelWith: "", bookingTime: "",
  })

  // Auto-open after 5 s
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 5000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    setSuccess(false)
    setStep(1)
  }

  // ── API submit — logic unchanged from original ──
  const handleSubmit = async (payload?: any) => {
    const submission = payload ?? form
    try {
      setLoading(true)
      const res = await fetch("/api/sembark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          phone:   form.phone,
          email:   form.email,
          comments: `
          Travel With: ${form.travelWith}
          Booking Time: ${submission.bookingTime ?? form.bookingTime}
          Message: ${form.content}
                    `.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setStep(4)
      } else {
        alert("Failed to send enquiry")
      }
    } catch (err) {
      console.error("Submission error:", err)
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  // Progress % — steps 1-3 only; success fills bar fully
  const progressPct = success ? 100 : (step / TOTAL_STEPS) * 100

  const stepTitle =
    success    ? "Enquiry Submitted" :
    step === 1 ? "Your Details"      :
    step === 2 ? "Travel Companions" :
                 "When to Book?"

  if (!open) return null

  return (
    <>
      <style>{LP_STYLES}</style>

      {/* Backdrop */}
      <div className="lp-backdrop" onClick={close} />

      {/* Modal */}
      <div className="lp-modal">
        <div className="lp-card">

          {/* ── Close button — sticky, never clipped ── */}
          <button className="lp-close-btn" onClick={close} aria-label="Close">
            <X size={15} color="#7A5C3A" />
          </button>

          {/* ── Header ── */}
          <div className="lp-header">
            <div style={{ paddingRight: 8 }}>
              {success ? (
                <div style={{ fontSize: 12, color: "#A0836A", fontWeight: 600, letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 4 }}>
                  All Done
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "#A0836A", fontWeight: 600, letterSpacing: ".6px", textTransform: "uppercase", marginBottom: 4 }}>
                  Step {step} of {TOTAL_STEPS}
                </div>
              )}
              <div style={{ fontSize: 18, fontWeight: 700, color: "#2D1A0E", marginBottom: 14 }}>
                {stepTitle}
              </div>
            </div>
            <div className="lp-progress-track">
              <div className="lp-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {/* ── Body ── */}
          <div className="lp-body">
            {step === 1 && (
              <Step1
                form={form}
                handleChange={handleChange}
                setForm={setForm}
                loading={loading}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <Step2
                form={form}
                setForm={setForm}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <Step3
                form={form}
                setForm={setForm}
                handleSubmit={handleSubmit}
                loading={loading}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && <Success onClose={close} />}
          </div>

        </div>
      </div>
    </>
  )
}

// ─── Step 1 — Contact Details + Message ──────────────────────────────────────

function Step1({ form, handleChange, loading, onNext }: any) {
  const validate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim())                         return alert("Name is required")
    if (!/^[0-9]{10}$/.test(form.phone))           return alert("Enter a valid 10-digit phone number")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return alert("Enter a valid email address")
    onNext()
  }

  return (
    <form onSubmit={validate} className="lp-step-anim" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label className="lp-label">Full Name</label>
        <input
          name="name" value={form.name} onChange={handleChange}
          placeholder="Your full name" required
          className="lp-input"
        />
      </div>

      <div>
        <label className="lp-label">Email Address</label>
        <input
          name="email" type="email" value={form.email} onChange={handleChange}
          placeholder="you@example.com" required
          className="lp-input"
        />
      </div>

      <div>
        <label className="lp-label">Phone Number</label>
        <div className="lp-phone-row">
          <input className="lp-cc" value="+91" readOnly />
          <input
            name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder="10-digit mobile number" required maxLength={10}
            className="lp-input" style={{ flex: 1 }}
          />
        </div>
      </div>

      <div>
        <label className="lp-label">Any Special Request</label>
        <textarea
          name="content" value={form.content} onChange={handleChange}
          placeholder="Tell us about your trip, special needs, preferences…"
          rows={3}
          className="lp-input"
        />
      </div>

      <button type="submit" disabled={loading} className="lp-btn-primary" style={{ marginTop: 4 }}>
        Continue →
      </button>
    </form>
  )
}

// ─── Step 2 — Travel Companions ───────────────────────────────────────────────

function Step2({ form, setForm, onNext, onBack }: any) {
  return (
    <div className="lp-step-anim" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <div className="lp-step-badge">
          <Check size={14} />
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#2D1A0E" }}>
            Awesome, <span style={{ color: "#E87722" }}>{form.name || "Traveler"}</span>!
          </div>
          <div style={{ fontSize: 13, color: "#A0836A" }}>
            Who are you planning this trip with?
          </div>
        </div>
      </div>

      {TRAVEL_OPTIONS.map(opt => {
        const selected = form.travelWith === opt
        return (
          <div
            key={opt}
            className={`lp-option-row ${selected ? "selected" : ""}`}
            onClick={() => {
              setForm((p: FormType) => ({ ...p, travelWith: opt }))
              setTimeout(onNext, 200)
            }}
          >
            <div className="lp-radio">
              {selected && <div className="lp-radio-dot" />}
            </div>
            <span className="lp-option-label">{opt}</span>
          </div>
        )
      })}

      <BackButton onClick={onBack} />
    </div>
  )
}

// ─── Step 3 — Booking Timing ──────────────────────────────────────────────────

function Step3({ form, setForm, handleSubmit, loading, onBack }: any) {
  return (
    <div className="lp-step-anim" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <div className="lp-step-badge">
          <Check size={14} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#2D1A0E" }}>
            Almost there, <span style={{ color: "#E87722" }}>{form.name || "Traveler"}</span>!
          </div>
          <div style={{ fontSize: 13, color: "#A0836A" }}>
            How soon would you like to book?
          </div>
        </div>
      </div>

      {TIMING_OPTIONS.map(opt => {
        const selected = form.bookingTime === opt
        return (
          <div
            key={opt}
            className={`lp-option-row ${selected ? "selected" : ""}`}
            onClick={async () => {
              const updated = { ...form, bookingTime: opt }
              setForm(updated)
              await handleSubmit(updated)
            }}
          >
            <div className="lp-radio">
              {selected && <div className="lp-radio-dot" />}
            </div>
            <span className="lp-option-label">{opt}</span>
            {loading && selected && (
              <span style={{ marginLeft: "auto", fontSize: 12, color: "#A0836A" }}>Sending…</span>
            )}
          </div>
        )
      })}

      <BackButton onClick={onBack} />
    </div>
  )
}

// ─── Step 4 — Success ─────────────────────────────────────────────────────────

function Success({ onClose }: { onClose: () => void }) {
  return (
    <div className="lp-success-wrap">
      {/* Ambient blobs */}
      <div style={{
        position: "absolute", top: -48, right: -48, width: 160, height: 160,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(230,140,60,.18) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -40, left: -40, width: 140, height: 140,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(200,120,40,.12) 0%,transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Icon */}
        <div className="lp-success-icon">
          <CheckCircle2 size={32} />
        </div>

        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#3A1F0D", margin: "0 0 6px", lineHeight: 1.1 }}>
          Jai Shri Krishna!
        </h2>
        <p style={{ fontSize: 17, fontWeight: 600, color: "#7A4820", margin: "0 0 16px" }}>
          We&apos;ll Call You Shortly
        </p>

        {/* Divider */}
        <div style={{
          width: 32, height: 2, borderRadius: 99, margin: "0 auto 16px",
          background: "linear-gradient(90deg,transparent,#C8700A,transparent)",
        }} />

        <p style={{ fontSize: 14, lineHeight: 1.8, color: "#8A6040", marginBottom: 28, maxWidth: 260 }}>
          Our pilgrimage expert will WhatsApp you within{" "}
          <strong style={{ color: "#4A2710", fontWeight: 600 }}>30 minutes</strong>{" "}
          with your personalised itinerary and package details.
        </p>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/7302265809?text=Radhe%20Radhe%2C%20I%20just%20submitted%20the%20form"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            width: "100%", padding: "15px 20px", borderRadius: 16,
            background: "#1DAA61", color: "#fff",
            fontSize: 15, fontWeight: 600, textDecoration: "none",
            boxShadow: "0 8px 24px rgba(29,170,97,.32)",
            transition: "transform .18s, box-shadow .18s",
            boxSizing: "border-box",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 28px rgba(29,170,97,.38)"
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = ""
            ;(e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(29,170,97,.32)"
          }}
        >
          <WhatsAppIcon />
          WhatsApp Us Directly
        </a>

        <button
          onClick={onClose}
          style={{
            marginTop: 18, background: "none", border: "none", cursor: "pointer",
            fontSize: 13, color: "#9A7055", letterSpacing: ".3px",
            transition: "color .15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#3A1F0D" }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#9A7055" }}
        >
          Continue browsing →
        </button>
      </div>
    </div>
  )
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: 13, color: "#A0836A", padding: "4px 0",
        display: "inline-flex", alignItems: "center", gap: 4,
        transition: "color .15s",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#3A1F0D" }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#A0836A" }}
    >
      ← Back
    </button>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.445h.006c6.585 0 11.946-5.336 11.949-11.896.002-3.176-1.24-6.165-3.48-8.448zm-8.475 18.3h-.004c-1.774 0-3.513-.474-5.031-1.37l-.361-.213-3.741.977 1.001-3.648-.235-.374a9.86 9.86 0 01-1.52-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.878 9.884zm5.42-7.4c-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="white"
      />
    </svg>
  )
}