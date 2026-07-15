import Link from "next/link";
import Section from "@/src/components/shared/Section";
import { CONTACT, RESPONSE_SLA, telLink, waLink, type Offer } from "@/src/config/site";
import { DynamicIcon } from "./AnimatedIcons";

/**
 * Static home sections from the v6 home-page map: §4 explore by interest,
 * §7 offer ribbon, §8 plan essentials, §14 how it works, §15 coverage + NAP.
 *
 * Every claim here is either structural (a link, a step) or gated in
 * config/site.ts. Nothing asserts a price, a timing or a credential.
 */

function LinkCard({ href, title, blurb }: { href: string; title: string; blurb?: string }) {
  return (
    <li>
      <Link
        href={href}
        className="block h-full rounded-xl border border-orange-100 bg-white p-4 transition hover:border-orange-300 hover:shadow-sm"
      >
        <span className="block font-semibold text-gray-900">{title}</span>
        {blurb ? <span className="mt-1 block text-sm text-gray-600">{blurb}</span> : null}
      </Link>
    </li>
  );
}

function InterestCard({ href, title, blurb, className = "" }: { href: string; title: string; blurb?: string; className?: string }) {
  // One orange scheme for every tile — no per-topic accent colours.
  const borderGradient =
    "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400";

  const slug = href.replace(/\//g, "");

  return (
    <li className={className}>
      <Link
        href={href}
        className="group relative block h-full rounded-2xl p-[2px] bg-transparent"
      >
        {/* Glow border wrapper */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${borderGradient} transition-all duration-300 group-hover:-translate-y-1`}
        />

        {/* Card Body */}
        <div
          className="relative h-full rounded-[14px] bg-white p-4 sm:p-5 flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
        >
          {/* Subtle background spotlight */}
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          {/* Left Text */}
          <div className="flex-1 min-w-0">
            <span className="block font-bold text-gray-900 text-[15px] md:text-base leading-snug tracking-tight group-hover:text-orange-700 transition-colors duration-200">
              {title}
            </span>
            {blurb ? (
              <span className="mt-1.5 block text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                {blurb}
              </span>
            ) : null}
          </div>

          {/* Right Icon — tinted orange so every tile reads as one palette (the source SVGs
              carry their own multi-colour gradients). */}
          <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-orange-50 rounded-xl border border-orange-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:border-orange-200 [&_svg]:[filter:grayscale(1)_sepia(1)_saturate(6)_hue-rotate(-12deg)]">
            <DynamicIcon slug={slug} defaultType="interest" className="group-hover:scale-110" />
          </div>
        </div>
      </Link>
    </li>
  );
}

/** §4 — route the three non-pilgrimage intents plus the cab vertical. */
export function ExploreByInterest() {
  const tiles = [
    { href: "/heritage-tours-gujarat/", title: "Heritage tours", blurb: "UNESCO sites, Rani ki Vav, Dholavira" },
    { href: "/wildlife-nature-tours/", title: "Wildlife & nature", blurb: "Gir lions, Devalia, Velavadar" },
    { href: "/temples/", title: "Temples of Gujarat", blurb: "Dakor, Virpur, Salangpur, Chotila" },
    { href: "/somnath-dwarka-taxi-service/", title: "Private cabs", blurb: "Fixed fares, verified routes" },
  ];
  return (
    <Section id="explore-by-interest" title="Explore by interest" full className="!pt-0">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t, i) => (
          <InterestCard
            key={t.href}
            {...t}
            className={i === tiles.length - 1 && tiles.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""}
          />
        ))}
      </ul>
    </Section>
  );
}


/**
 * §7 — offer ribbon. OPS-CONFIRM: renders only confirmed, unexpired offers.
 * Resolve them with `liveOffers(path, Date.now())` outside render and pass the
 * result in; an empty list renders no ribbon, which is the intended default.
 */
export function OfferRibbon({ offers }: { offers: Offer[] }) {
  if (!offers.length) return null;

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2">
      {offers.map((o) => (
        <p key={o.id} className="text-sm text-amber-900">
          <strong className="font-semibold">{o.label}</strong> — {o.detail}
        </p>
      ))}
    </div>
  );
}

/**
 * §6 — the E-E-A-T link row. /methodology/, /team/ and /editorial-policy/ are
 * MVP-wave trust pages; the home page must reach them in one click.
 */
export function TrustLinks() {
  const links = [
    { href: "/about/", label: "About us" },
    { href: "/methodology/", label: "How we verify" },
    { href: "/team/", label: "Our team" },
    { href: "/reviews/", label: "Reviews" },
    { href: "/editorial-policy/", label: "Editorial policy" },
  ];
  return (
    <nav aria-label="Why trust us" className="mx-auto max-w-7xl px-4 pb-10">
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm font-medium text-orange-700 hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** §8 — the highest-intent planning questions, on the URL map's canonical slugs. */
function EssentialCard({ href, title, className = "" }: { href: string; title: string; className?: string }) {
  const normHref = href.toLowerCase();
  
  // Icon selector based on link target
  let icon = (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-600 transition-transform duration-300 group-hover:scale-110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ); // default clock

  if (normHref.includes("aarti") || normHref.includes("darshan")) {
    icon = (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-amber-600 transition-all duration-300 group-hover:scale-110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C12 2 14.5 5.5 14.5 7.5C14.5 9 13.5 10 12 10C10.5 10 9.5 9 9.5 7.5C9.5 5.5 12 2 12 2Z" fill="#F97316" stroke="#EA580C" />
        <path d="M5 16C5 13 8 13 12 13C16 13 19 13 19 16C19 19 16 20 12 20C8 20 5 19 5 16Z" fill="#F59E0B" stroke="#D97706" />
      </svg>
    ); // diya flame / sacred
  } else if (normHref.includes("distance") || normHref.includes("route")) {
    icon = (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-sky-600 transition-all duration-300 group-hover:translate-x-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M6 9V12C6 14 8 15 11 15C13 15 15 16 15 18V15" />
      </svg>
    ); // route path
  } else if (normHref.includes("days") || normHref.includes("how-many")) {
    icon = (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-emerald-600 transition-all duration-300 group-hover:scale-110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <circle cx="8" cy="14" r="1" fill="currentColor" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
      </svg>
    ); // calendar
  } else if (normHref.includes("first") || normHref.includes("decision") || normHref.includes("which")) {
    icon = (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-indigo-600 transition-all duration-300 group-hover:rotate-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
        <polyline points="5 18 11 12 5 6" opacity="0.5" />
      </svg>
    ); // directional indicator
  }

  return (
    <li className={className}>
      <Link
        href={href}
        className="group relative block h-full rounded-2xl bg-transparent"
      >
        <div className="h-full rounded-2xl border border-stone-200 bg-white p-4 transition-all duration-300 group-hover:border-orange-300 group-hover:-translate-y-1 group-hover:shadow-sm">
          <div className="flex flex-col-reverse items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3.5">
            {/* Mini Icon wrapper */}
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center transition-colors duration-300 group-hover:bg-orange-50/50 group-hover:border-orange-100">
              {icon}
            </div>
            {/* Text */}
            <span className="block font-semibold text-gray-800 text-[13.5px] leading-tight group-hover:text-orange-700 transition-colors duration-200">
              {title}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

/** §8 — the highest-intent planning questions, on the URL map's canonical slugs. */
export function PlanEssentials() {
  const links = [
    { href: "/somnath/somnath-temple-timings/", title: "Somnath temple timings" },
    { href: "/dwarka/dwarkadhish-temple-timings/", title: "Dwarkadhish temple timings" },
    { href: "/somnath/somnath-aarti-timings/", title: "Somnath aarti timings" },
    { href: "/dwarka/dwarkadhish-darshan/", title: "Dwarkadhish darshan" },
    { href: "/plan/dwarka-to-somnath-distance/", title: "Dwarka to Somnath distance" },
    { href: "/plan/how-many-days-for-somnath-dwarka/", title: "How many days do you need?" },
    { href: "/plan/somnath-or-dwarka-which-first/", title: "Somnath or Dwarka first?" },
    { href: "/somnath/live-darshan/", title: "Somnath live darshan" },
  ];
  return (
    <Section id="plan-essentials" title="Plan-your-trip essentials" full>
      <ul className="grid grid-cols-2 gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l, i) => (
          <EssentialCard
            key={l.href}
            href={l.href}
            title={l.title}
            className={i === links.length - 1 && links.length % 2 === 1 ? "col-span-2 sm:col-span-1" : ""}
          />
        ))}
      </ul>
    </Section>
  );
}


/** §14 — the booking path. The response-time claim renders only once verified. */
export function HowItWorks() {
  const steps = [
    { title: "Tell us your dates", body: "Share your travel window, group size and the temples you want to cover." },
    { title: "Get a plan and a firm price", body: "A local planner sends a day-wise itinerary with what is and is not included." },
    { title: "Confirm with a deposit", body: "Pay securely by UPI or Razorpay. The balance is due on arrival." },
    { title: "Travel with local support", body: "Your driver and a local coordinator stay reachable through the trip." },
  ];

  return (
    <Section id="how-it-works" title="How it works">
      {RESPONSE_SLA.verify && RESPONSE_SLA.value ? (
        <p className="mb-6 text-sm text-gray-600">
          {RESPONSE_SLA.label}: {RESPONSE_SLA.value}
        </p>
      ) : null}
      <ol className="grid gap-4 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-orange-100 bg-white p-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-orange-600">
              Step {i + 1}
            </span>
            <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-700">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/**
 * §15 — coverage and local presence. The postal address renders only when
 * CONTACT.napConfirmed is true, matching the gate on localBusinessSchema:
 * an unconfirmed NAP is a citation liability, not a trust signal.
 */
export function CoverageAndPresence() {
  const { address, napConfirmed, phoneDisplay, email } = CONTACT;

  return (
    <Section id="coverage" title="Where we operate">
      <p className="text-[15px] leading-7 text-gray-700">
        We run trips across Saurashtra and Gujarat — Somnath, Dwarka, Gir, Junagadh–Girnar,
        Porbandar, Diu, Kutch and the Statue of Unity — with pickups from Ahmedabad, Rajkot,
        Mumbai and the nearest railheads.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-900">Talk to a local planner</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              <a href={telLink()} className="hover:text-orange-600">{phoneDisplay}</a>
            </li>
            <li>
              <a href={waLink("Trip enquiry from the website")} className="hover:text-orange-600">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-orange-600">{email}</a>
            </li>
          </ul>
        </div>

        {napConfirmed ? (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Office</h3>
            <address className="text-sm not-italic leading-6 text-gray-700">
              {address.street ? <>{address.street}<br /></> : null}
              {address.locality}, {address.region}
              {address.postalCode ? <> {address.postalCode}</> : null}
            </address>
          </div>
        ) : null}
      </div>

      <p className="mt-6 text-sm">
        <Link href="/contact/" className="font-semibold text-orange-700 hover:underline">
          Contact us →
        </Link>
      </p>
    </Section>
  );
}
