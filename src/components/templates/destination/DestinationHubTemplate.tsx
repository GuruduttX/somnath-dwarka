import Link from "next/link";
import { ArrowRight, MapPin, Navigation, Sparkles, BookOpen } from "lucide-react";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks, { type RelatedLink } from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import PackageExplorer from "@/src/components/TourArchive/PackageExplorer";
import HangingDiyas from "@/src/components/TourArchive/HangingDiyas";
import CustomPackageCTA from "@/src/components/shared/CustomPackageCTA";
import { breadcrumbSchema, webPageSchema, type Crumb } from "@/src/lib/seo";
import { waLink } from "@/src/config/site";
import { themeFor } from "@/src/config/destinations";
import type { TourPackage } from "@/src/utils/TourData";

export type DestinationVariant = { label: string; slug: string; blurb?: string };

/** Generic travel imagery, matching the fallback pool the CMS cards already use. */
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&q=75&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=75&auto=format&fit=crop",
];

/**
 * Split "Gir Tour Packages — Lion Safari, Sasan Stay & Devalia" into the title
 * and its three chips. The subtitle is editor copy from the CMS h1, so the
 * chips are the editor's own words re-laid-out, never invented ones. A headline
 * with no em-dash tail simply yields no chips.
 */
function splitHeadline(h1: string): { title: string; chips: string[] } {
  const [title, ...rest] = h1.split(/\s+[—–]\s+/);
  const tail = rest.join(" — ");
  const chips = tail ? tail.split(/,|\s+&\s+/).map((c) => c.trim()).filter(Boolean) : [];
  return { title: title.trim(), chips };
}

/**
 * Give the "Tour Package(s)" half of the headline the warm gradient the other
 * package hubs use. Styled inline rather than via a shared class so the hero
 * carries its own look and does not depend on another component's <style>.
 */
function highlightHeadline(text: string) {
  return text.split(/(tour packages?)/i).map((part, i) =>
    /^tour packages?$/i.test(part) ? (
      <span
        key={i}
        className="inline-block pr-[0.12em] pb-[0.06em] italic"
        style={{
          backgroundImage:
            "linear-gradient(100deg,#EA580C 0%,#F97316 30%,#F59E0B 55%,#EA580C 80%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

const MINOR = new Set(["and", "the", "of", "to", "for", "in", "on"]);
const titleCase = (t: string) =>
  t
    .split("-")
    .map((w, i) => (i > 0 && MINOR.has(w) ? w : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

/**
 * A one-line descriptor for a variant, derived from its slug shape.
 *
 * This restates the label the editor already wrote ("from-rajkot" → "Round trip
 * starting from Rajkot"); it asserts no price, duration or inclusion. An
 * editor-authored blurb always wins.
 */
function describeVariant(slug: string, blurb?: string): string {
  if (blurb?.trim()) return blurb.trim();
  const days = slug.match(/^(\d+)-days?$/);
  if (days) return `A ${days[1]}-day plan`;
  const dayThemed = slug.match(/^(\d+)-day-(.+)$/);
  if (dayThemed) return `A ${dayThemed[1]}-day plan built around ${titleCase(dayThemed[2])}`;
  if (slug.startsWith("from-")) return `Round trip starting from ${titleCase(slug.slice(5))}`;
  if (slug.startsWith("with-")) return `Adds ${titleCase(slug.slice(5))} to the route`;
  return titleCase(slug);
}

/** Which explorer group a variant belongs to, from the shape of its slug. */
type Group = "duration" | "city" | "route" | "traveller";
function groupOf(slug: string): Group {
  if (/^\d+-days?$/.test(slug) || /^\d+-day-/.test(slug)) return "duration";
  if (slug.startsWith("from-")) return "city";
  if (slug.startsWith("with-")) return "route";
  return "traveller";
}

/**
 * Explorer copy for a destination hub. Its groups mean something different from
 * the circuit hubs': "traveller" here holds the themed ways to visit one place,
 * not budget tiers.
 */
const GROUP_COPY = {
  duration: { title: "Choose by duration", blurb: "Plans sized to how long you have." },
  city: { title: "Choose by starting city", blurb: "Round trips with pickup and drop from your city." },
  route: { title: "Add a destination", blurb: "Extend the trip with a nearby stop." },
  traveller: { title: "Choose by experience", blurb: "The different ways people plan this trip." },
} as const;

function toTourPackage(
  v: DestinationVariant,
  index: number,
  hub: string,
  photo: string | undefined,
  place: string,
): TourPackage {
  const days = Number(v.slug.match(/^(\d+)-day/)?.[1] ?? 0);
  const rotated = [
    ...FALLBACK_IMAGES.slice(index % FALLBACK_IMAGES.length),
    ...FALLBACK_IMAGES.slice(0, index % FALLBACK_IMAGES.length),
  ];
  return {
    id: v.slug,
    slug: v.slug,
    title: v.label,
    location: place,
    // No duration is claimed where the CMS holds none; the card shows the
    // descriptor instead of inventing "4 Days / 3 Nights".
    duration: days ? `${days} Day${days === 1 ? "" : "s"}` : "Flexible",
    groupType: describeVariant(v.slug, v.blurb),
    days,
    // Price stays 0 until an editor verifies one, so the card reads "Custom".
    price: 0,
    originalPrice: 0,
    inclusions: [],
    images: photo ? [photo, ...rotated].slice(0, 5) : rotated.slice(0, 5),
    href: `/${hub}/${v.slug}/`,
    badge: index === 0 ? "Most asked for" : undefined,
    popular: index === 0,
  };
}

/** Answers that hold for any destination hub until an editor writes its own. */
const defaultFaq = (place: string) => [
  {
    question: `What does a ${place} tour package include?`,
    answer:
      "A private vehicle with driver, hotel stays where the plan runs overnight, and a day-wise itinerary sequenced around opening and darshan times. Entry tickets, ropeway fares and safari permits are charged at actuals. Exact inclusions are listed on each package once your dates are confirmed.",
  },
  {
    question: `How do I get a price for a ${place} trip?`,
    answer:
      "Share your dates, how many people are travelling and the hotel tier you want. Cost moves with all three, so a firm quote comes back against your specific trip rather than a headline number that changes later.",
  },
  {
    question: "Can the itinerary be customised?",
    answer:
      "Yes. Every package here is a starting point — days can be added or dropped, the starting city changed and stops swapped in or out. Tell us what matters most and we sequence the rest around it.",
  },
  {
    question: "How far ahead should I book?",
    answer:
      "As early as your dates are fixed, especially for festival weeks and the December–January peak, when hotels and any permit-based activity fill first.",
  },
];

/**
 * The shared template for every destination hub — /gir-tour-package/,
 * /kutch-tour-package/, /ambaji-tour-package/ and the rest.
 *
 * The hero is the part that differs from the circuit hubs: a destination is a
 * place first, so it opens on a photo-led split with the editor's own subtitle
 * as chips, rather than the circuit hubs' animated temple. Everything below is
 * deliberately the same furniture as the rest of the site — the same card and
 * filter explorer, the same FAQ above the CTA band — so a traveller moving
 * between pages meets one consistent interface.
 */
export default function DestinationHubTemplate({
  slug,
  h1,
  crumbs,
  path,
  answerFirst,
  body,
  variants,
  faq,
  related,
  pillarPath,
  extraSchema,
}: {
  slug: string;
  h1: string;
  crumbs: Crumb[];
  path: string;
  answerFirst?: string;
  body?: string;
  variants: DestinationVariant[];
  faq: { question: string; answer: string }[];
  related: RelatedLink[];
  pillarPath?: string;
  extraSchema?: Record<string, unknown> | null;
}) {
  const theme = themeFor(slug);
  const { title, chips } = splitHeadline(h1);

  // The editor's own subtitle leads; the themed highlights top the row up to
  // three, so every destination shows a full set even when the CMS h1 carries
  // no subtitle at all.
  const keywords = (t: string) =>
    t
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter((w) => w.length >= 5);
  const chipWords = new Set(chips.flatMap(keywords));
  const heroChips = [
    ...chips,
    // Skip a highlight that repeats a word the editor's subtitle already used,
    // so Palitana does not read "Shatrunjaya Climb · Shatrunjaya hill".
    ...(theme.highlights ?? []).filter((h) => !keywords(h).some((w) => chipWords.has(w))),
  ].slice(0, 3);
  const paragraphs = (body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const cards = variants.map((v, i) => toTourPackage(v, i, slug, theme.photo, theme.name));

  // A hub with three or fewer packages splits into groups of one, which reads
  // as a broken grid. Below that threshold they all sit in one row instead.
  const singleRow = cards.length > 0 && cards.length <= 3;
  const groupCopy = singleRow
    ? {
        ...GROUP_COPY,
        route: {
          title: "All packages",
          blurb: `Every ${theme.name} plan we run — open one for the full itinerary.`,
        },
      }
    : GROUP_COPY;

  // Stable per-slug pick, so the hero image does not change between builds.
  const placeholderImage =
    FALLBACK_IMAGES[
      [...slug].reduce((total, ch) => total + ch.charCodeAt(0), 0) % FALLBACK_IMAGES.length
    ];
  const inGroup = (g: Group) => cards.filter((c) => groupOf(c.slug) === g);

  return (
    <PageShell crumbs={crumbs} flushHero>
      {/* ── HERO — photo-led, on the site's warm light palette ── */}
      <section className="relative -mt-28 overflow-hidden pt-40 pb-10 sm:pt-42 lg:pt-44 lg:pb-4">
        {/* Warm wash, matching the rest of the site */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFF4E8_50%,#FFFFFF_100%)]" />
          <div className="absolute left-[8%] top-[10%] h-[55%] w-[45%] bg-[radial-gradient(ellipse_at_center,rgba(251,146,60,0.18)_0%,transparent_65%)]" />
          <div className="absolute -right-[8%] bottom-[10%] h-[50%] w-[40%] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.16)_0%,transparent_65%)]" />
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: "radial-gradient(circle,#EA580C 1px,transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>

        <div className="relative z-[2] mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-12">
          {/* ══ LEFT ══ */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700 backdrop-blur-sm">
              <MapPin size={12} /> Destination · Gujarat
            </p>

            <h1 className="font-playfair mt-7 text-4xl font-black leading-[1.08] tracking-[-0.03em] text-[#3a2416] sm:text-5xl lg:text-[3.4rem]">
              {highlightHeadline(title)}
            </h1>

            {heroChips.length ? (
              <ul className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                {heroChips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-orange-200/70 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#7a4a2b] shadow-sm"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            ) : null}

            {(answerFirst || theme.standfirst) && (
              <p className="mx-auto mt-7 max-w-[600px] text-[13px] leading-[1.7] text-[#6b4c38] sm:text-sm sm:leading-[1.75] lg:mx-0">
                {answerFirst || theme.standfirst}
              </p>
            )}

            {/* CTAs — same shapes as the other package hubs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#packages"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#EA580C_0%,#F97316_50%,#FB923C_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(234,88,12,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Sparkles size={15} />
                See {variants.length} package{variants.length === 1 ? "" : "s"}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={waLink(`Hi, I'd like a ${theme.name} tour package quote`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300 bg-white/70 px-7 py-3.5 text-sm font-semibold text-orange-700 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-white"
              >
                <Navigation size={15} />
                Chat on WhatsApp
              </a>
            </div>

            {pillarPath ? (
              <Link
                href={pillarPath}
                className="mt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8c5e40] underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
              >
                <BookOpen size={14} /> Read the {theme.name} travel guide first
              </Link>
            ) : null}
          </div>

          {/* ══ RIGHT — the place itself, in an arched light frame ══ */}
          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:mx-0 lg:max-w-[380px]">
            <div className="relative">
              {/* Offset accent outline behind the frame */}
              <div
                className="absolute -bottom-4 -right-4 h-full w-full rounded-t-full rounded-b-[40px] border-2 border-orange-200/70"
                aria-hidden="true"
              />
              <div className="relative aspect-4/5 overflow-hidden rounded-t-full rounded-b-[40px] border-4 border-white bg-orange-50 shadow-[0_24px_60px_rgba(234,88,12,0.20)]">
                {theme.photo ? (
                  <>
                    <img src={theme.photo} alt={theme.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-center text-white">
                      <p className="font-playfair text-2xl font-bold">{theme.name}</p>
                      <p className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-white/85">
                        <MapPin size={11} /> Gujarat, India
                      </p>
                    </div>
                  </>
                ) : (
                  /* No photograph of this place in the repo yet, so a generic
                     scene from the shared fallback pool stands in. It carries
                     no caption on purpose: labelling stock scenery with the
                     destination's name would tell a traveller they are looking
                     at a place they are not. Add a real photo to
                     config/destinations.ts and it takes over here, captioned. */
                  <img
                    src={placeholderImage}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES — the same cards and filters as every other hub ── */}
      <div id="packages" className="relative bg-white">
        <HangingDiyas />

        <div className="relative z-20 mx-auto max-w-3xl px-4 pt-14 text-center sm:pt-16">
          <h2 className="font-playfair mt-20 text-4xl font-black leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            <span className="text-orange-500">{theme.name}</span>
            <span className="mt-1 block text-[#111827]">Tour Packages</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
            Every plan below opens in full — day by day, what is included and what is not, with an
            enquiry form for a firm quote on your dates.
          </p>
        </div>

        {cards.length ? (
          <PackageExplorer
            duration={singleRow ? [] : inGroup("duration")}
            city={singleRow ? [] : inGroup("city")}
            traveller={singleRow ? [] : inGroup("traveller")}
            route={singleRow ? cards : inGroup("route")}
            groupCopy={groupCopy}
          />
        ) : (
          <p className="mx-auto max-w-3xl px-4 pb-16 text-center text-sm text-gray-500">
            Packages for {theme.name} are being finalised — tell us your dates and we will plan one
            around them.
          </p>
        )}
      </div>

      {/* ── Editor prose, where the CMS doc carries any ── */}
      {paragraphs.length ? (
        <section className="bg-white pb-4">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-7 text-gray-700">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CustomPackageCTA />

      {/* FAQ sits above the CTA band, as on the other package pages. */}
      <Faq
        items={faq.length ? faq : defaultFaq(theme.name)}
        heading={`Planning a ${theme.name} trip — your questions answered`}
        subheading="What the package covers, how pricing works and how far ahead to book."
      />

      <CtaBand context={theme.name} title={`Plan your ${theme.name} trip`} />
      <RelatedLinks links={related} />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={webPageSchema({ name: h1, description: answerFirst ?? h1, path })} />
      {extraSchema ? <JsonLd data={extraSchema} /> : null}
    </PageShell>
  );
}
