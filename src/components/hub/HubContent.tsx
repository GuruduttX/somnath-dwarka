import Link from "next/link";
import {
  Route,
  Clock,
  CalendarClock,
  Wallet,
  Sparkles,
  ShieldAlert,
  Info,
  Car,
  ArrowRight,
  Check,
  AlertTriangle,
  Camera,
  Plane,
  TrainFront,
  Sun,
  Accessibility,
  Shirt,
} from "lucide-react";
import { s, list } from "@/src/lib/cms";
import { packagePath } from "@/src/lib/content";
import type {
  DurationRow,
  StartCityRow,
  ConstraintRow,
  ItineraryDay,
  PriceTierRow,
  VehicleRow,
  PointBlock,
  NoteRow,
} from "@/src/models/hubModel";

type Doc = Record<string, unknown>;

/**
 * Renders the money-circuit hub's long-form sales content from the CMS doc.
 * Every block is admin-editable (hubModel + contentSchemas) and hides when its
 * field is empty, so nothing here is hardcoded copy — the words come from admin.
 */
export default function HubContent({ hub }: { hub: Doc }) {
  const durationMatrix = list<DurationRow>(hub, "duration_matrix");
  const startCities = list<StartCityRow>(hub, "start_cities");
  const constraints = list<ConstraintRow>(hub, "constraint_table");
  const itinerary = list<ItineraryDay>(hub, "hourly_itinerary");
  const priceTiers = list<PriceTierRow>(hub, "price_tiers");
  const vehicles = list<VehicleRow>(hub, "vehicle_table");
  const exclusions = list<string>(hub, "exclusions");
  const whyChoose = list<PointBlock>(hub, "why_choose");
  const notForYou = list<PointBlock>(hub, "not_for_you");
  const practical = list<NoteRow>(hub, "practical_notes");

  const chooserIntro = s(hub, "chooser_intro");
  const chooserNote = s(hub, "chooser_note");
  const constraintIntro = s(hub, "constraint_intro");
  const constraintFootnote = s(hub, "constraint_footnote");
  const itineraryIntro = s(hub, "itinerary_intro");
  const itineraryFootnote = s(hub, "itinerary_footnote");
  const priceIntro = s(hub, "price_intro");
  const priceTierNote = s(hub, "price_tier_note");
  const vehicleNote = s(hub, "vehicle_note");
  const exclusionsNote = s(hub, "exclusions_note");
  const fraudAdvisory = s(hub, "fraud_advisory");
  const whyChooseIntro = s(hub, "why_choose_intro");

  const hasChooser = Boolean(chooserIntro) || durationMatrix.length > 0 || startCities.length > 0;
  const anything =
    hasChooser ||
    constraints.length ||
    itinerary.length ||
    priceTiers.length ||
    exclusions.length ||
    exclusionsNote ||
    fraudAdvisory ||
    whyChoose.length ||
    notForYou.length ||
    practical.length;

  if (!anything) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/25 to-white">
      {/* decorative background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-32 h-[28rem] w-[28rem] rounded-full bg-orange-200/25 blur-[110px]" />
        <div className="absolute -right-40 top-[55%] h-[28rem] w-[28rem] rounded-full bg-amber-200/25 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* ── By duration / start city chooser ── */}
        {hasChooser ? (
          <Section eyebrow="Choose your version" icon={<Route size={13} />} title="Every plan is a separate trip" intro={chooserIntro}>
            {durationMatrix.length > 0 ? (
              <>
                <SubHeading>By duration</SubHeading>
                <TableShell minW="720px">
                  <thead>
                    <HeadRow>
                      <Th>Plan</Th>
                      <Th>Nights</Th>
                      <Th>3 star, pp</Th>
                      <Th>4 star, pp</Th>
                      <Th>5 star, pp</Th>
                      <Th>Best for</Th>
                    </HeadRow>
                  </thead>
                  <tbody>
                    {durationMatrix.map((r, i) => (
                      <BodyRow key={i} i={i}>
                        <Td className="font-bold text-[#2a1a0d]">
                          {r.slug ? (
                            <Link href={packagePath(r.slug)} className="group inline-flex items-center gap-1 text-orange-700 hover:text-orange-800">
                              {r.plan}
                              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          ) : (
                            r.plan
                          )}
                        </Td>
                        <Td>{r.nights}</Td>
                        <Td className="font-semibold text-[#2a1a0d]">{r.price_3star}</Td>
                        <Td>{r.price_4star}</Td>
                        <Td>{r.price_5star}</Td>
                        <Td className="text-gray-600">{r.best_for}</Td>
                      </BodyRow>
                    ))}
                  </tbody>
                </TableShell>
              </>
            ) : null}

            {startCities.length > 0 ? (
              <>
                <SubHeading className="mt-10">By start city</SubHeading>
                <TableShell minW="560px">
                  <thead>
                    <HeadRow>
                      <Th>You start from</Th>
                      <Th>Road reality</Th>
                    </HeadRow>
                  </thead>
                  <tbody>
                    {startCities.map((r, i) => (
                      <BodyRow key={i} i={i}>
                        <Td className="font-bold text-[#2a1a0d]">
                          {r.slug ? (
                            <Link href={packagePath(r.slug)} className="group inline-flex items-center gap-1 text-orange-700 hover:text-orange-800">
                              {r.city}
                              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          ) : (
                            r.city
                          )}
                        </Td>
                        <Td className="text-gray-600">{r.road_reality}</Td>
                      </BodyRow>
                    ))}
                  </tbody>
                </TableShell>
              </>
            ) : null}

            {chooserNote ? <Note className="mt-6">{chooserNote}</Note> : null}
          </Section>
        ) : null}

        {/* ── The clock / constraint table (compact) ── */}
        {constraints.length > 0 ? (
          <Section eyebrow="Read this first" icon={<Clock size={13} />} title="The clock that decides this circuit" intro={constraintIntro}>
            <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_50px_-32px_rgba(234,88,12,0.35)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]" style={{ minWidth: "640px" }}>
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white">
                      <th className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-wider">Fixed constraint</th>
                      <th className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-wider">The time</th>
                      <th className="px-4 py-2.5 text-[10.5px] font-bold uppercase tracking-wider">What it forces</th>
                    </tr>
                  </thead>
                  <tbody>
                    {constraints.map((r, i) => (
                      <tr
                        key={i}
                        className={`border-t border-orange-50 align-top transition-colors hover:bg-orange-50/60 ${i % 2 ? "bg-orange-50/20" : "bg-white"}`}
                      >
                        <td className="px-4 py-2.5 font-bold text-[#2a1a0d]">{r.constraint}</td>
                        <td className="px-4 py-2.5 font-medium text-orange-700">{r.time}</td>
                        <td className="px-4 py-2.5 text-gray-500">{r.forces}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {constraintFootnote ? <Note className="mt-4">{constraintFootnote}</Note> : null}
          </Section>
        ) : null}

        {/* ── Hour-by-hour itinerary ── */}
        {itinerary.length > 0 ? (
          <Section eyebrow="Sample plan" icon={<CalendarClock size={13} />} title="The standard four day circuit, hour by hour" intro={itineraryIntro}>
            <div className="grid gap-5 lg:grid-cols-2">
              {itinerary.map((day, i) => {
                const steps = Array.isArray(day.steps) ? day.steps : [];
                return (
                  <div key={i} className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_20px_60px_-30px_rgba(234,88,12,0.35)]">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-6 py-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-black text-white ring-1 ring-white/40">
                        {i + 1}
                      </span>
                      <span className="font-playfair text-lg font-bold text-white">{day.day}</span>
                    </div>
                    <ul className="p-2">
                      {steps.map((step, j) => (
                        <li key={j} className="flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-orange-50/50">
                          <span className="inline-flex h-fit shrink-0 items-center gap-1.5 rounded-lg bg-orange-50 px-2.5 py-1 font-mono text-xs font-bold text-orange-700">
                            <Clock size={11} className="text-orange-500" />
                            {step.time}
                          </span>
                          <span className="text-[13.5px] leading-relaxed text-gray-700">{step.activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            {itineraryFootnote ? <Note className="mt-6">{itineraryFootnote}</Note> : null}
          </Section>
        ) : null}

        {/* ── Price sheet ── */}
        {priceTiers.length > 0 || priceIntro ? (
          <Section eyebrow="What it costs" icon={<Wallet size={13} />} title="Price sheet" intro={priceIntro}>
            {priceTiers.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-3">
                {priceTiers.map((t, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(234,88,12,0.4)] transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8c5e40]">{t.tier}</p>
                    {t.price ? (
                      <p className="mt-2 bg-gradient-to-br from-orange-600 to-amber-500 bg-clip-text font-playfair text-3xl font-black text-transparent">
                        {t.price}
                      </p>
                    ) : null}
                    <p className="mb-4 text-[11px] font-medium text-gray-400">per person, per night</p>
                    {t.hotels ? (
                      <div className="mb-2">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[#b07a4e]">Hotels</p>
                        <p className="text-sm font-medium text-gray-700">{t.hotels}</p>
                      </div>
                    ) : null}
                    {t.included ? (
                      <p className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                        <Check size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                        {t.included}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            {priceTierNote ? (
              <Callout tone="amber" icon={<Info size={16} />} title="About the 5 star tier, said plainly" className="mt-6">
                {priceTierNote}
              </Callout>
            ) : null}

            {/* Vehicle table */}
            {vehicles.length > 0 ? (
              <div className="mt-10">
                <SubHeading icon={<Car size={16} className="text-orange-500" />}>Your vehicle comes with the package</SubHeading>
                {vehicleNote ? <Note className="-mt-1 mb-4">{vehicleNote}</Note> : null}
                <TableShell minW="440px">
                  <thead>
                    <HeadRow>
                      <Th>Travellers</Th>
                      <Th>Vehicle</Th>
                    </HeadRow>
                  </thead>
                  <tbody>
                    {vehicles.map((v, i) => (
                      <BodyRow key={i} i={i}>
                        <Td className="font-bold text-[#2a1a0d]">{v.travellers}</Td>
                        <Td className="text-gray-700">{v.vehicle}</Td>
                      </BodyRow>
                    ))}
                  </tbody>
                </TableShell>
              </div>
            ) : null}

            {/* Exclusions */}
            {exclusions.length > 0 || exclusionsNote ? (
              <div className="mt-10">
                <SubHeading>Not included, on any tier</SubHeading>
                {exclusions.length > 0 ? (
                  <ul className="flex flex-wrap gap-2.5">
                    {exclusions.map((e, i) => (
                      <li
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-600 shadow-sm"
                      >
                        <span className="text-gray-300">✕</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {exclusionsNote ? <Note className="mt-4">{exclusionsNote}</Note> : null}
              </div>
            ) : null}

            {/* Fraud advisory */}
            {fraudAdvisory ? (
              <Callout tone="red" icon={<AlertTriangle size={16} />} title="A warning worth reading" className="mt-6">
                {fraudAdvisory}
              </Callout>
            ) : null}
          </Section>
        ) : null}

        {/* ── Why choose us ── */}
        {whyChoose.length > 0 ? (
          <Section eyebrow="Why us" icon={<Sparkles size={13} />} title="Why choose Experience My India" intro={whyChooseIntro}>
            <div className="grid gap-5 md:grid-cols-2">
              {whyChoose.map((p, i) => (
                <div
                  key={i}
                  className="group rounded-3xl border border-orange-100 bg-white p-6 shadow-[0_20px_60px_-38px_rgba(234,88,12,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-200"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white shadow-md shadow-orange-500/30">
                      <Check size={16} strokeWidth={3} />
                    </span>
                    <div>
                      {p.heading ? <p className="font-playfair text-[17px] font-bold text-[#2a1a0d]">{p.heading}</p> : null}
                      <p className="mt-1 text-[14px] leading-relaxed text-gray-600">{p.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {/* ── Not for you if ── */}
        {notForYou.length > 0 ? (
          <Section eyebrow="Honest fit" icon={<ShieldAlert size={13} />} title="This circuit is not for you if">
            <div className="grid gap-4 md:grid-cols-2">
              {notForYou.map((p, i) => (
                <div key={i} className="flex gap-3.5 rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50/60 to-white p-5 shadow-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">✕</span>
                  <div>
                    {p.heading ? <p className="font-semibold text-[#2a1a0d]">{p.heading}</p> : null}
                    <p className="mt-0.5 text-[14px] leading-relaxed text-gray-600">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {/* ── Practical notes ── */}
        {practical.length > 0 ? (
          <Section eyebrow="Good to know" icon={<Info size={13} />} title="Practical notes for both temples">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {practical.map((n, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(234,88,12,0.4)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                    {noteIcon(n.label)}
                  </span>
                  <p className="font-playfair text-[16px] font-bold text-[#2a1a0d]">{n.label}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-gray-600">{n.text}</p>
                </div>
              ))}
            </div>
          </Section>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------ atoms ------------------------------ */

function Section({
  eyebrow,
  icon,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  icon?: React.ReactNode;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-orange-100/70 py-14 first:border-t-0 sm:py-20">
      <div className="max-w-3xl">
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-600 shadow-sm backdrop-blur">
            {icon}
            {eyebrow}
          </span>
        ) : null}
        <h2 className="mt-4 font-playfair text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#1a1207] sm:text-[2.5rem]">
          {title}
        </h2>
        {intro ? <p className="mt-4 text-[15px] leading-relaxed text-gray-600 sm:text-base">{intro}</p> : null}
      </div>
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  );
}

function SubHeading({
  children,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`mb-4 flex items-center gap-2 font-playfair text-xl font-bold text-[#2a1a0d] ${className}`}>
      {icon}
      {children}
    </h3>
  );
}

function Note({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-[14px] italic leading-relaxed text-gray-500 ${className}`}>{children}</p>;
}

function Callout({
  children,
  title,
  icon,
  tone,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  tone: "amber" | "red";
  className?: string;
}) {
  const tones = {
    amber: "border-amber-200 bg-gradient-to-br from-amber-50 to-white text-amber-700",
    red: "border-rose-200 bg-gradient-to-br from-rose-50 to-white text-rose-700",
  };
  return (
    <div className={`rounded-3xl border p-5 sm:p-6 ${tones[tone]} ${className}`}>
      <p className="mb-1.5 flex items-center gap-2 text-sm font-bold">
        {icon}
        {title}
      </p>
      <p className="text-[14px] leading-relaxed text-gray-600">{children}</p>
    </div>
  );
}

function TableShell({ children, minW }: { children: React.ReactNode; minW: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_20px_60px_-32px_rgba(234,88,12,0.35)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm" style={{ minWidth: minW }}>
          {children}
        </table>
      </div>
    </div>
  );
}

function HeadRow({ children }: { children: React.ReactNode }) {
  return <tr className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white">{children}</tr>;
}

function BodyRow({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <tr className={`border-t border-orange-50 align-top transition-colors hover:bg-orange-50/60 ${i % 2 ? "bg-orange-50/20" : "bg-white"}`}>
      {children}
    </tr>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-5 py-4 ${className}`}>{children}</td>;
}

/** Pick a themed icon for a practical-note label. */
function noteIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("dress")) return <Shirt size={18} />;
  if (l.includes("photo")) return <Camera size={18} />;
  if (l.includes("time") || l.includes("window") || l.includes("best") || l.includes("season")) return <Sun size={18} />;
  if (l.includes("rail") || l.includes("train")) return <TrainFront size={18} />;
  if (l.includes("air") || l.includes("flight")) return <Plane size={18} />;
  if (l.includes("access")) return <Accessibility size={18} />;
  return <Info size={18} />;
}
