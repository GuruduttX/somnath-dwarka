import Link from "next/link";
import { getPublishedPackages, packagePath } from "@/src/lib/content";
import BeyondTemplesRail, { type Layout, type RailCard } from "./BeyondTemplesRail";

/**
 * Home — "Gujarat's Untold Escapes".
 *
 * Shows a deliberate MIX of the real published packages rather than one theme:
 * a wildlife add-on, a monument add-on, a beach add-on, a hill/heritage add-on,
 * plus the budget, family, luxury and single-day variants — so the rail reads as
 * the range of trips actually bookable, at their real CMS prices, each linking
 * to its own package page.
 *
 * Curated by slug (editorial order/tags/photos) but titles, durations and prices
 * come from the CMS, so re-pricing a package in admin updates the card too.
 */
const MIX: {
  slug: string;
  title: string;
  tag: string;
  tagColor: string;
  image: string;
  layout: Layout;
}[] = [
  {
    slug: "with-gir",
    title: "Somnath Dwarka with Gir",
    tag: "Wildlife",
    tagColor: "rgba(217,119,6,0.88)",
    image: "/images/gir/gir-hero.webp",
    layout: "tall",
  },
  {
    slug: "with-statue-of-unity",
    title: "With Statue of Unity",
    tag: "Monument",
    tagColor: "rgba(99,102,241,0.88)",
    image: "/images/home/StatueOfUnity.webp",
    layout: "wide",
  },
  {
    slug: "with-diu",
    title: "Somnath Dwarka with Diu",
    tag: "Coastal",
    tagColor: "rgba(14,165,233,0.88)",
    image:
      "https://res.cloudinary.com/dnhau4zv2/image/upload/somnath-dwarka/destinations/diu.jpg",
    layout: "wide",
  },
  {
    slug: "budget",
    title: "Budget Yatra",
    tag: "Value",
    tagColor: "rgba(16,185,129,0.88)",
    image: "/images/home/DwarikaLongImage.webp",
    layout: "square",
  },
  {
    slug: "for-family",
    title: "Family Package",
    tag: "Family",
    tagColor: "rgba(249,115,22,0.88)",
    image: "/images/CTA.webp",
    layout: "square",
  },
  {
    slug: "luxury",
    title: "Luxury Yatra",
    tag: "Premium",
    tagColor: "rgba(168,85,247,0.88)",
    image: "/images/home/HomeHero.webp",
    layout: "tall",
  },
  {
    slug: "with-junagadh-girnar",
    title: "With Junagadh & Girnar",
    tag: "Nature",
    tagColor: "rgba(34,197,94,0.88)",
    image: "/images/junagadh-girnar/junagadh-girnar-hero.webp",
    layout: "banner",
  },
  {
    slug: "1-day-somnath",
    title: "Somnath in a Day",
    tag: "Short trip",
    tagColor: "rgba(180,120,20,0.88)",
    image: "/images/home/SomnathLongImage.webp",
    layout: "banner",
  },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default async function BeyondTemples() {
  const packages = (await getPublishedPackages()) as Array<Record<string, unknown>>;
  const bySlug = new Map(packages.map((p) => [String(p.slug), p]));

  // A curated slug that is unpublished (or renamed) drops out rather than
  // rendering a card that 404s.
  const cards: RailCard[] = MIX.flatMap((m) => {
    const pkg = bySlug.get(m.slug);
    if (!pkg) return [];

    const price = Number(pkg.price_from ?? pkg.price ?? 0);
    if (!price) return [];

    return [
      {
        id: m.slug,
        title: m.title,
        href: packagePath(m.slug),
        duration: String(pkg.duration || "").replace(/\s*\/\s*/, " "),
        price: inr(price),
        tag: m.tag,
        tagColor: m.tagColor,
        image: m.image,
        layout: m.layout,
      },
    ];
  });

  if (!cards.length) return null;

  return (
    <section id="beyond-temples" className="bg-white pt-10 pb-5 lg:pt-14 lg:pb-8 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="h-px w-7 bg-orange-500" />
          <span className="text-orange-600 text-[0.62rem] font-semibold tracking-[0.26em] uppercase">
            Beyond Temples
          </span>
          <div className="h-px w-7 bg-orange-500" />
        </div>

        {/* Title */}
        <h2
          className="font-bold text-slate-900 leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)" }}
        >
          Gujarat&apos;s{" "}
          <span
            style={{
              background: "linear-gradient(120deg, #EA580C 0%, #F97316 50%, #FB923C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Untold Escapes
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <BeyondTemplesRail cards={cards} />

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-10 text-center">
        <Link
          href="/somnath-dwarka-tour-package/"
          className="inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(120deg, #EA580C 0%, #F97316 100%)",
            boxShadow: "0 4px 20px rgba(249,115,22,0.32)",
          }}
        >
          View All Packages
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
