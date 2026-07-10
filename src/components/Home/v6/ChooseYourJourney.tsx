import Link from "next/link";
import Section from "@/src/components/shared/Section";
import { getPublishedHubs } from "@/src/lib/content";
import { s } from "@/src/lib/cms";
import { DynamicIcon } from "./AnimatedIcons";

/**
 * Home §3 — "Choose your journey" (home-page map v6) with modern designs, gradients, and SVGs.
 */
const FLAGSHIP = {
  slug: "somnath-dwarka-tour-package",
  title: "Somnath Dwarka Tour Package",
  blurb: "The flagship pilgrimage circuit — 1 to 5 days.",
};

const CIRCUIT_KINDS = new Set(["circuit", "triangle", "umbrella"]);

function HubCard({
  href,
  title,
  blurb,
  kind,
  isFlagship = false,
}: {
  href: string;
  title: string;
  blurb?: string;
  kind: "circuit" | "destination";
  isFlagship?: boolean;
}) {
  // Gradients matching pilgrimage (saffron) vs destinations (peach/coral)
  const borderGradient = isFlagship
    ? "from-orange-500/35 to-amber-500/35 group-hover:from-orange-500 group-hover:to-amber-500"
    : kind === "circuit"
    ? "from-orange-300/35 to-amber-300/35 group-hover:from-orange-400 group-hover:to-amber-400"
    : "from-orange-300/35 to-red-300/35 group-hover:from-orange-400 group-hover:to-red-400";

  const bgGradient = isFlagship
    ? "from-orange-50/60 to-amber-50/40"
    : kind === "circuit"
    ? "from-amber-50/25 to-stone-50/20"
    : "from-orange-50/25 to-stone-50/20";

  const slug = href.replace(/\//g, "");

  return (
    <li>
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
          className="relative h-full rounded-[14px] bg-white p-5 flex items-center justify-between gap-4 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md"
        >

          {/* Subtle background spotlight */}
          <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

          {/* Left Text */}
          <div className="flex-1 min-w-0">
            {isFlagship ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-orange-100 text-orange-850 mb-2">
                Flagship Yatra
              </span>
            ) : null}
            <span className="block font-bold text-gray-900 text-[15px] md:text-base leading-snug tracking-tight group-hover:text-orange-700 transition-colors duration-200">
              {title}
            </span>
            {blurb ? (
              <span className="mt-1.5 block text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                {blurb}
              </span>
            ) : null}
          </div>

          {/* Right Icon */}
          <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-stone-50 rounded-xl border border-stone-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:border-orange-100">
            <DynamicIcon slug={slug} defaultType={kind} className="group-hover:scale-110" />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default async function ChooseYourJourney() {
  const hubs = await getPublishedHubs();

  const circuits = hubs.filter((h) => CIRCUIT_KINDS.has(s(h, "hub_kind")));
  const destinations = hubs.filter((h) => s(h, "hub_kind") === "destination");

  return (
    <Section id="choose-your-journey" title="Choose your journey" wide>
      {/* Circuits List */}
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-5 bg-gradient-to-b from-orange-600 to-amber-500 rounded-full" />
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-855">
          Pilgrimage circuits
        </h3>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <HubCard
          href={`/${FLAGSHIP.slug}/`}
          title={FLAGSHIP.title}
          blurb={FLAGSHIP.blurb}
          kind="circuit"
          isFlagship
        />
        {circuits.map((h) => (
          <HubCard
            key={String(h.slug)}
            href={`/${h.slug}/`}
            title={s(h, "title")}
            blurb={s(h, "head_term")}
            kind="circuit"
          />
        ))}
      </ul>

      {/* Destinations List */}
      {destinations.length ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-gradient-to-b from-orange-500 to-red-500 rounded-full" />
            <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-orange-855">
              Destination packages
            </h3>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((h) => (
              <HubCard
                key={String(h.slug)}
                href={`/${h.slug}/`}
                title={s(h, "title")}
                blurb={s(h, "head_term")}
                kind="destination"
              />
            ))}
          </ul>
        </>
      ) : null}
    </Section>
  );
}
