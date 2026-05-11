"use client"
import CommonEnquiryForm from "@/utils/CommanEnquiryForm"
import { MapPin, Phone, CarTaxiFront, Star, Shield, Clock, CheckCircle, CheckCircle2, ArrowRight, Navigation, Home, ChevronRight, Users, Calendar, ChevronLeft } from "lucide-react"
import Link from "next/link";
import { useState, useCallback } from "react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Step1Form = { name: string; phone: string }
type Step2Form = { pickup: string; drop: string; date: string; cabType: string; passengers: string }

const CAB_TYPES = ["Sedan", "SUV", "Tempo Traveller", "Bus"]
const PASSENGER_OPTIONS = ["1–2", "3–4", "5–6", "7+"]

// ─── Animation helper (CSS injected once) ────────────────────────────────────

const STEP_ANIM_STYLE = `
@keyframes txSlideIn {
  from { opacity: 0; transform: translateX(18px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes txSlideBack {
  from { opacity: 0; transform: translateX(-18px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes txFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes txPopIn {
  from { opacity: 0; transform: scale(0.6); }
  to   { opacity: 1; transform: scale(1); }
}
.tx-step-enter  { animation: txSlideIn   0.28s cubic-bezier(.22,.68,0,1.1) both; }
.tx-step-back   { animation: txSlideBack 0.28s cubic-bezier(.22,.68,0,1.1) both; }
.tx-fade-in     { animation: txFadeIn    0.4s cubic-bezier(.22,.68,0,1.1) both; }
.tx-pop-in      { animation: txPopIn     0.5s 0.15s cubic-bezier(.34,1.56,.64,1) both; }
`

// ─── WhatsApp icon (from reference) ──────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.445h.006c6.585 0 11.946-5.336 11.949-11.896.002-3.176-1.24-6.165-3.48-8.448zm-8.475 18.3h-.004c-1.774 0-3.513-.474-5.031-1.37l-.361-.213-3.741.977 1.001-3.648-.235-.374a9.86 9.86 0 01-1.52-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.878 9.884zm5.42-7.4c-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.148-.669.15-.198.296-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white" />
    </svg>
  )
}

// ─── Success card — rendered inside both mobile & desktop cards ───────────────

function SuccessCard({ name, onReset }: { name: string; onReset: () => void }) {
  return (
    <div className="tx-fade-in flex flex-col items-center text-center py-2">
      {/* Icon */}
      <div
        className="tx-pop-in w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white"
        style={{
          background: "linear-gradient(145deg,#E87722,#C55A0A)",
          boxShadow: "0 6px 28px rgba(200,90,10,0.38)",
        }}
      >
        <CheckCircle2 size={28} />
      </div>

      <h3 className="text-xl font-extrabold text-[#3A1F0D] mb-1 leading-tight">
        Jai Shri Krishna!
      </h3>
      <p className="text-sm font-semibold text-[#7A4820] mb-3">
        We&apos;ll Call You Shortly
      </p>

      {/* Divider */}
      <div
        className="w-8 h-0.5 rounded-full mb-3"
        style={{ background: "linear-gradient(90deg,transparent,#C8700A,transparent)" }}
      />

      <p className="text-xs leading-relaxed text-[#8A6040] mb-4 max-w-[220px]">
        Our driver will WhatsApp you within{" "}
        <strong className="text-[#4A2710]">30 minutes</strong>{" "}
        with your confirmed ride details.
      </p>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/91XXXXXXXXXX?text=Radhe%20Radhe%2C%20I%20just%20booked%20a%20taxi"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
        style={{
          background: "#1DAA61",
          boxShadow: "0 6px 20px rgba(29,170,97,0.30)",
        }}
      >
        <WhatsAppIcon />
        WhatsApp Us Directly
      </a>

      <button
        onClick={onReset}
        className="mt-3 text-xs text-[#9A7055] hover:text-[#3A1F0D] transition-colors bg-transparent border-none cursor-pointer"
      >
        Book another ride →
      </button>
    </div>
  )
}

// ─── Shared tiny sub-components ──────────────────────────────────────────────

function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden mb-3">
      <div
        className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(step, total) / total * 100}%` }}
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TaxiHero() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  // multi-step state: 1 = contact, 2 = trip details, 3 = success
  const [step, setStep]             = useState<1 | 2 | 3>(1)
  const [direction, setDirection]   = useState<"forward" | "back">("forward")
  const [submitting, setSubmitting] = useState(false)

  const [step1, setStep1] = useState<Step1Form>({ name: "", phone: "" })
  const [step2, setStep2] = useState<Step2Form>({ pickup: "", drop: "", date: "", cabType: "", passengers: "" })

  // ── Handlers ──

  const handleStep1Change = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStep1(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleStep2Change = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStep2(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const goNext = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const phoneRegex = /^[0-9]{10}$/
    if (!step1.name.trim())          { alert("Name is required."); return }
    if (!phoneRegex.test(step1.phone)) { alert("Please enter a valid 10-digit phone number."); return }
    setDirection("forward")
    setStep(2)
  }

  const goBack = () => {
    setDirection("back")
    setStep(1)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!step2.pickup.trim())    { alert("Pickup location is required."); return }
    if (!step2.drop.trim())      { alert("Drop location is required."); return }
    if (!step2.date.trim())      { alert("Travel date is required."); return }
    if (!step2.cabType)          { alert("Please select a cab type."); return }
    if (!step2.passengers)       { alert("Please select number of passengers."); return }

    const comments = [
      `Service Type - Taxi Booking`,
      `Pickup - ${step2.pickup}`,
      `Drop - ${step2.drop}`,
      `Date - ${step2.date}`,
      `Cab Type - ${step2.cabType}`,
      `Passengers - ${step2.passengers}`,
    ].join(", ")

    setSubmitting(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/simbark`, {
        method: "POST",
        body: JSON.stringify({
          name: step1.name,
          phone: step1.phone,
          comments,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Submission failed")
      // Show success step on API success
      setDirection("forward")
      setStep(3)
    } catch (error) {
      console.log("ERROR: submitting form", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setStep1({ name: "", phone: "" })
    setStep2({ pickup: "", drop: "", date: "", cabType: "", passengers: "" })
    setDirection("forward")
    setStep(1)
  }

  const animClass = direction === "forward" ? "tx-step-enter" : "tx-step-back"

  return (
    <>
      <style>{STEP_ANIM_STYLE}</style>

      {/*
        min-h-[93vh]: mobile grows to fit content + form
        lg:h-[93vh]:  desktop locked at exactly 93vh
      */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-900 via-orange-700 to-amber-500 min-h-[93vh] lg:h-[93vh] flex items-start ">

        {/* Glow Orbs */}
        <div className="absolute top-[-120px] right-[-100px] w-[500px] h-[500px] bg-yellow-400/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[420px] h-[420px] bg-orange-400/20 blur-[100px] rounded-full pointer-events-none" />

        {/* Dot Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1.2px, transparent 1.2px)", backgroundSize: "28px 28px" }}
        />

        {/* Large Taxi Silhouette — bottom-right */}
        <div className="absolute bottom-12 right-[-3%] w-[260px] sm:w-[380px] lg:w-[520px] opacity-[0.09] pointer-events-none select-none">
          <svg viewBox="0 0 580 220" fill="white" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="105" width="520" height="82" rx="14" />
            <path d="M148,105 L192,38 L390,38 L432,105 Z" />
            <rect x="250" y="24" width="80" height="20" rx="5" />
            <circle cx="452" cy="187" r="33" /><circle cx="452" cy="187" r="17" fill="rgba(0,0,0,0.35)" />
            <circle cx="138" cy="187" r="33" /><circle cx="138" cy="187" r="17" fill="rgba(0,0,0,0.35)" />
            <path d="M197,46 L222,103 L202,103 L182,46 Z" opacity="0.35" />
            <rect x="228" y="46" width="130" height="54" rx="5" opacity="0.35" />
            <path d="M364,46 L382,46 L398,103 L376,103 Z" opacity="0.35" />
            <rect x="530" y="116" width="22" height="30" rx="6" opacity="0.65" />
            <rect x="28" y="116" width="22" height="30" rx="6" opacity="0.5" />
            <rect x="360" y="107" width="3" height="78" rx="1.5" opacity="0.3" />
            <rect x="510" y="160" width="48" height="12" rx="6" opacity="0.5" />
            <rect x="22" y="160" width="48" height="12" rx="6" opacity="0.4" />
          </svg>
        </div>

        {/* Small Taxi — top-left */}
        <div className="absolute top-20 left-[2%] w-[90px] sm:w-[130px] opacity-[0.07] pointer-events-none select-none -rotate-6">
          <svg viewBox="0 0 200 80" fill="white" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="38" width="180" height="30" rx="6" />
            <path d="M52,38 L66,14 L134,14 L148,38 Z" />
            <rect x="88" y="8" width="24" height="9" rx="2" />
            <circle cx="155" cy="68" r="12" /><circle cx="45" cy="68" r="12" />
            <rect x="180" y="44" width="8" height="10" rx="3" opacity="0.6" />
            <rect x="12" y="44" width="8" height="10" rx="3" opacity="0.5" />
          </svg>
        </div>

        {/* Checkered Band — top-right */}
        <div className="absolute top-0 right-0 w-[160px] sm:w-[220px] h-[24px] opacity-[0.15] pointer-events-none select-none overflow-hidden">
          <svg viewBox="0 0 220 24" fill="white" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
            <rect x="0"   y="0"  width="12" height="12" /><rect x="24"  y="0"  width="12" height="12" /><rect x="48"  y="0"  width="12" height="12" />
            <rect x="72"  y="0"  width="12" height="12" /><rect x="96"  y="0"  width="12" height="12" /><rect x="120" y="0"  width="12" height="12" />
            <rect x="144" y="0"  width="12" height="12" /><rect x="168" y="0"  width="12" height="12" /><rect x="192" y="0"  width="12" height="12" />
            <rect x="12"  y="12" width="12" height="12" /><rect x="36"  y="12" width="12" height="12" /><rect x="60"  y="12" width="12" height="12" />
            <rect x="84"  y="12" width="12" height="12" /><rect x="108" y="12" width="12" height="12" /><rect x="132" y="12" width="12" height="12" />
            <rect x="156" y="12" width="12" height="12" /><rect x="180" y="12" width="12" height="12" /><rect x="204" y="12" width="12" height="12" />
          </svg>
        </div>

        {/* Road dashes */}
        <div className="absolute bottom-[3.2rem] left-0 right-0 pointer-events-none select-none">
          <svg viewBox="0 0 1440 6" preserveAspectRatio="none" className="w-full h-[5px] opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="3" x2="1440" y2="3" stroke="white" strokeWidth="3" strokeDasharray="80 40" />
          </svg>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 md:h-14">
            <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-24 grid lg:grid-cols-2 gap-6 lg:gap-6 xl:gap-12 lg:items-center w-full">

          {/* ── LEFT ── centered on mobile, left-aligned on desktop */}
          <div className="text-white text-center lg:text-left">

            {/* Breadcrumb Pill */}
            <nav className="inline-flex items-center bg-amber-500/30 border border-yellow-400/40 rounded-full px-4 py-1.5 text-sm mb-3">
              <Link href="/" className="flex items-center gap-1.5 text-yellow-200 hover:text-white transition-colors font-medium">
                <Home size={12} />
                <span>Home</span>
              </Link>
              <ChevronRight size={13} className="mx-1 text-yellow-400/60" />
              <span className="flex items-center gap-1.5 text-yellow-300 font-bold">
                <CarTaxiFront size={12} />
                Taxi Service
              </span>
            </nav>

            {/* Live Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-yellow-200 mb-3 w-fit mx-auto lg:mx-0">
              <span>Braj&apos;s Most Trusted Taxi Service</span>
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            </div>

            {/* Heading */}
            <h1 className="text-[1.75rem] sm:text-4xl lg:text-[2.7rem] xl:text-5xl font-extrabold leading-tight mb-3">
              Sacred Journeys,
              <span className="block text-yellow-300 mt-0.5">Comfortable Rides</span>
              <span className="block text-lg sm:text-xl lg:text-2xl font-semibold text-orange-100/90 mt-1">
                Vrindavan &amp; Mathura
              </span>
            </h1>

            {/* Description */}
            <p className="text-orange-100/85 text-sm sm:text-base max-w-xl leading-relaxed mb-4 mx-auto lg:mx-0">
              Experience the spiritual essence of Braj with reliable, comfortable taxi services.
              Expert drivers, AC vehicles and 24/7 availability for your divine journey.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-7 mb-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-yellow-300">5000+</div>
                <div className="text-[11px] text-orange-200">Happy Pilgrims</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-yellow-300 flex items-center justify-center gap-1">
                  4.9 <Star size={14} className="fill-yellow-300 text-yellow-300" />
                </div>
                <div className="text-[11px] text-orange-200">Customer Rating</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-yellow-300">10+</div>
                <div className="text-[11px] text-orange-200">Years Experience</div>
              </div>
            </div>

            {/* Feature Chips */}
            <div className="flex flex-wrap gap-2 mb-5 justify-center lg:justify-start">
              {[
                { icon: <MapPin size={11} />, label: "Temple Tours" },
                { icon: <Clock size={11} />, label: "24/7 Available" },
                { icon: <Shield size={11} />, label: "Safe Rides" },
                { icon: <CheckCircle size={11} />, label: "Fixed Fares" },
                { icon: <CarTaxiFront size={11} />, label: "AC Vehicles" },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 bg-white/10 border border-white/15 text-orange-100 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="text-yellow-300">{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            {/* CTA Buttons — only on mobile (form is hidden on mobile) */}
            <div className="flex flex-wrap gap-3 justify-center lg:hidden">
              <button
                className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-orange-900 font-bold rounded-xl shadow-xl shadow-yellow-500/30 transition-all cursor-pointer text-sm"
                onClick={() => setIsFormOpen(true)}
              >
                <CarTaxiFront size={16} />
                Book Taxi Now
                <ArrowRight size={13} />
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-all cursor-pointer text-sm">
                <Phone size={16} />
                Call Now
              </button>
            </div>

            {/* Desktop-only CTA */}
            <div className="hidden lg:flex flex-wrap gap-3">
              <button
                className="flex items-center gap-2 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-orange-900 font-bold rounded-xl shadow-xl shadow-yellow-500/30 transition-all hover:scale-[1.03] cursor-pointer text-sm"
                onClick={() => setIsFormOpen(true)}
              >
                <CarTaxiFront size={16} />
                Book Taxi Now
                <ArrowRight size={13} />
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-xl transition-all hover:scale-[1.03] cursor-pointer text-sm">
                <Phone size={16} />
                Call Now
              </button>
            </div>
          </div>

          {/* ── RIGHT FORM ── always visible; style differs on mobile vs desktop */}
          <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 lg:self-center">

            {/* Glow — desktop only (too heavy on mobile) */}
            <div className="absolute inset-0 bg-yellow-400/15 blur-2xl rounded-3xl scale-95 pointer-events-none hidden lg:block" />

            {/* ── MOBILE form card: transparent/glass style on the orange bg ── */}
            <div className="block lg:hidden bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-400/30 border border-yellow-300/40 flex items-center justify-center flex-shrink-0">
                  {step === 3
                    ? <CheckCircle2 size={18} className="text-yellow-300" />
                    : <CarTaxiFront size={18} className="text-yellow-300" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-base leading-tight">
                      {step === 3 ? "Booking Confirmed!" : "Book Your Taxi"}
                    </h3>
                    {step < 3 && (
                      <span className="text-[10px] text-yellow-300/80 font-semibold">Step {step} / 2</span>
                    )}
                  </div>
                  <p className="text-orange-200 text-xs mt-0.5">
                    {step === 3 ? "Jai Shri Krishna 🙏" : "Instant confirmation • Best rates"}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-5 pt-3">
                <StepBar step={step === 3 ? 2 : step} total={2} />
              </div>

              {/* Form body */}
              <div className="px-5 pb-4">
                {/* STEP 1 — mobile */}
                {step === 1 && (
                  <form key="m-s1" className={`space-y-3 ${animClass}`} onSubmit={goNext}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Your Name</label>
                        <input
                          type="text" name="name" value={step1.name} placeholder="Full name"
                          className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition"
                          onChange={handleStep1Change}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Phone</label>
                        <input
                          type="tel" name="phone" value={step1.phone} placeholder="10-digit no."
                          className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2.5 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition"
                          onChange={handleStep1Change}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-orange-900 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-yellow-500/30 cursor-pointer flex items-center justify-center gap-2"
                    >
                      Next: Trip Details
                      <ArrowRight size={13} />
                    </button>
                  </form>
                )}

                {/* STEP 2 — mobile */}
                {step === 2 && (
                  <form key="m-s2" className={`space-y-3 ${animClass}`} onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Pickup</label>
                        <div className="relative">
                          <Navigation size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-300 pointer-events-none" />
                          <input
                            type="text" name="pickup" value={step2.pickup} placeholder="From where?"
                            className="w-full bg-white/20 border border-white/30 rounded-xl pl-8 pr-2 py-2.5 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition"
                            onChange={handleStep2Change}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Drop</label>
                        <div className="relative">
                          <MapPin size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300 pointer-events-none" />
                          <input
                            type="text" name="drop" value={step2.drop} placeholder="Going to?"
                            className="w-full bg-white/20 border border-white/30 rounded-xl pl-8 pr-2 py-2.5 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition"
                            onChange={handleStep2Change}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Travel Date</label>
                      <div className="relative">
                        <Calendar size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-300 pointer-events-none" />
                        <input
                          type="date" name="date" value={step2.date}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-white/20 border border-white/30 rounded-xl pl-8 pr-3 py-2.5 text-white placeholder-white/50 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition [color-scheme:dark]"
                          onChange={handleStep2Change}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Cab Type</label>
                        <select
                          name="cabType" value={step2.cabType}
                          className="w-full bg-white/20 border border-white/30 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition [color-scheme:dark]"
                          onChange={handleStep2Change}
                        >
                          <option value="" className="text-gray-800">Select</option>
                          {CAB_TYPES.map(c => <option key={c} value={c} className="text-gray-800">{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-yellow-300/80 uppercase tracking-wider mb-1">Passengers</label>
                        <div className="relative">
                          <Users size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-300 pointer-events-none" />
                          <select
                            name="passengers" value={step2.passengers}
                            className="w-full bg-white/20 border border-white/30 rounded-xl pl-8 pr-2 py-2.5 text-white text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400/60 focus:border-transparent transition [color-scheme:dark]"
                            onChange={handleStep2Change}
                          >
                            <option value="" className="text-gray-800">Select</option>
                            {PASSENGER_OPTIONS.map(p => <option key={p} value={p} className="text-gray-800">{p}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button" onClick={goBack}
                        className="flex items-center gap-1 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl transition-all cursor-pointer text-sm flex-shrink-0"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="submit" disabled={submitting}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-70 text-orange-900 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-yellow-500/30 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CarTaxiFront size={16} />
                        {submitting ? "Booking…" : "Get Taxi Now"}
                        {!submitting && <ArrowRight size={13} />}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3 — success (mobile) */}
                {step === 3 && (
                  <div key="m-s3" className="pt-1">
                    <SuccessCard name={step1.name} onReset={handleReset} />
                  </div>
                )}

                {/* Trust badges — hidden on success */}
                {step < 3 && (
                  <div className="mt-3 flex items-center justify-center gap-3 pt-3 border-t border-white/15">
                    <div className="flex items-center gap-1 text-[11px] text-orange-200">
                      <Shield size={11} className="text-green-400" /> 100% Safe
                    </div>
                    <div className="w-px h-3 bg-white/20" />
                    <div className="flex items-center gap-1 text-[11px] text-orange-200">
                      <CheckCircle size={11} className="text-blue-300" /> Verified Drivers
                    </div>
                    <div className="w-px h-3 bg-white/20" />
                    <div className="flex items-center gap-1 text-[11px] text-orange-200">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" /> Top Rated
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── DESKTOP form card: white card style ── */}
            <div className="hidden lg:block relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-orange-900/30">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    {step === 3
                      ? <CheckCircle2 size={20} className="text-white" />
                      : <CarTaxiFront size={20} className="text-white" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {step === 3 ? "Booking Confirmed!" : "Book Your Taxi"}
                      </h3>
                      {step < 3 && (
                        <span className="text-[11px] text-orange-100/80 font-semibold">Step {step} of 2</span>
                      )}
                    </div>
                    <p className="text-orange-100 text-xs mt-0.5">
                      {step === 3 ? "Jai Shri Krishna 🙏" : "Instant confirmation • Best rates guaranteed"}
                    </p>
                  </div>
                </div>
                {/* Progress bar inside header */}
                <div className="mt-3 w-full h-0.5 bg-white/25 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(step, 2) / 2 * 100}%` }}
                  />
                </div>
              </div>

              {/* Form body */}
              <div className="px-6 py-5">
                {/* STEP 1 — desktop */}
                {step === 1 && (
                  <form key="d-s1" className={`space-y-3 ${animClass}`} onSubmit={goNext}>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                      <input
                        type="text" name="name" value={step1.name} placeholder="Enter your full name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm transition"
                        onChange={handleStep1Change}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</label>
                      <input
                        type="tel" name="phone" value={step1.phone} placeholder="10-digit mobile number"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-sm transition"
                        onChange={handleStep1Change}
                        maxLength={10}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-400/30 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 mt-1"
                    >
                      Next: Trip Details
                      <ArrowRight size={13} />
                    </button>
                  </form>
                )}

                {/* STEP 2 — desktop */}
                {step === 2 && (
                  <form key="d-s2" className={`space-y-3 ${animClass}`} onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Pickup</label>
                        <div className="relative">
                          <Navigation size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none" />
                          <input
                            type="text" name="pickup" value={step2.pickup} placeholder="From where?"
                            className="w-full border border-gray-200 rounded-xl pl-8 pr-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-xs transition"
                            onChange={handleStep2Change}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Drop</label>
                        <div className="relative">
                          <MapPin size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" />
                          <input
                            type="text" name="drop" value={step2.drop} placeholder="Going to?"
                            className="w-full border border-gray-200 rounded-xl pl-8 pr-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 placeholder-gray-400 text-xs transition"
                            onChange={handleStep2Change}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Travel Date</label>
                      <div className="relative">
                        <Calendar size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
                        <input
                          type="date" name="date" value={step2.date}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-sm transition"
                          onChange={handleStep2Change}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Cab Type</label>
                        <select
                          name="cabType" value={step2.cabType}
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-sm transition bg-white"
                          onChange={handleStep2Change}
                        >
                          <option value="">Select cab</option>
                          {CAB_TYPES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Passengers</label>
                        <div className="relative">
                          <Users size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none" />
                          <select
                            name="passengers" value={step2.passengers}
                            className="w-full border border-gray-200 rounded-xl pl-8 pr-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-sm transition bg-white"
                            onChange={handleStep2Change}
                          >
                            <option value="">Select</option>
                            {PASSENGER_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button
                        type="button" onClick={goBack}
                        className="flex items-center gap-1 px-4 py-3 border border-gray-200 hover:border-orange-300 text-gray-600 hover:text-orange-600 font-semibold rounded-xl transition-all cursor-pointer text-sm flex-shrink-0"
                      >
                        <ChevronLeft size={14} />
                        Back
                      </button>
                      <button
                        type="submit" disabled={submitting}
                        className="flex-1 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 disabled:opacity-70 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-orange-400/30 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CarTaxiFront size={16} />
                        {submitting ? "Booking…" : "Get Taxi Now"}
                        {!submitting && <ArrowRight size={13} />}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3 — success (desktop) */}
                {step === 3 && (
                  <div key="d-s3">
                    <SuccessCard name={step1.name} onReset={handleReset} />
                  </div>
                )}

                {/* Trust badges — hidden on success */}
                {step < 3 && (
                  <div className="mt-3.5 flex items-center justify-center gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <Shield size={11} className="text-green-500" /> 100% Safe
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <CheckCircle size={11} className="text-blue-500" /> Verified Drivers
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <Star size={11} className="text-yellow-500 fill-yellow-500" /> Top Rated
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      <CommonEnquiryForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        defaultService="Taxi Booking"
        name={""}
        phone={""}
      />
    </>
  )
}