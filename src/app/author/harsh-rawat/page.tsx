import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata, personSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_AUTHOR } from "@/src/lib/seed/destinations";

const PATH = "/author/harsh-rawat/";
export const revalidate = 3600;

/**
 * Placeholder author profile — dummy content for layout/design. Swap `bio`,
 * `stats`, `expertise`, `guides` and `sameAs` for verified data before this
 * page is allowed into the index (see `bio_verified` in SEED_AUTHOR).
 */
const AUTHOR = {
  ...SEED_AUTHOR,
  bio: [
    "Harsh Rawat has spent the better part of a decade walking the pilgrim trail between Somnath and Dwarka — from the pre-dawn aarti at the Somnath Jyotirlinga to the flag-change ceremony atop the Dwarkadhish temple. What began as a personal pilgrimage turned into a full-time calling: mapping the routes, timing the ferries to Bet Dwarka, and learning which dharamshalas actually hold a booking when the festival crowds arrive.",
    "He writes the way a good local guide talks — practical first. Every itinerary on this site is one he has travelled himself, cross-checked against temple timings, seasonal road closures and the real cost of a shared cab in peak season. When something changes on the ground, the guide changes with it.",
    "Off the road, Harsh documents the folk traditions of coastal Gujarat and mentors first-time solo pilgrims planning the Char Dham of the west.",
  ],
  stats: [
    { label: "Years on the circuit", value: "9+" },
    { label: "Guides published", value: "40+" },
    { label: "Temples covered", value: "25" },
    { label: "Pilgrims helped", value: "12k+" },
  ],
  expertise: [
    "Somnath–Dwarka pilgrimage routes",
    "Temple darshan timings & rituals",
    "Bet Dwarka ferry logistics",
    "Budget & senior-friendly travel",
    "Festival-season planning",
    "Coastal Gujarat folk heritage",
  ],
  guides: [
    { title: "Somnath to Dwarka: the complete 3-day itinerary", path: "/guides/somnath-to-dwarka-itinerary/" },
    { title: "Dwarkadhish Temple: darshan timings & aarti guide", path: "/guides/dwarkadhish-temple-timings/" },
    { title: "How to reach Bet Dwarka (ferry + road)", path: "/guides/bet-dwarka-how-to-reach/" },
    { title: "Best time to visit Somnath & Dwarka", path: "/guides/best-time-to-visit-somnath-dwarka/" },
  ],
};

export const metadata: Metadata = buildMetadata({
  title: `${AUTHOR.name} — Author, Somnath Dwarka Guides`,
  description: `About ${AUTHOR.name}, ${AUTHOR.job_title}. ${AUTHOR.stats[0].value} years travelling and documenting the Somnath–Dwarka pilgrim circuit.`,
  path: PATH,
  // E-E-A-T: this is placeholder content, so keep the page out of the index.
  noindex: !SEED_AUTHOR.bio_verified,
});

export default function AuthorPage() {
  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Author", path: PATH },
      ]}
    >
      {/* Full-bleed hero band */}
      <section className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-white border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-14 sm:pb-14">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            {AUTHOR.photo ? (
              <Image
                src={AUTHOR.photo}
                alt={`Portrait of ${AUTHOR.name}`}
                width={160}
                height={160}
                className="h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-full object-cover ring-4 ring-white shadow-lg"
                priority
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
                Author
              </p>
              <h1 className="mt-1 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                {AUTHOR.name}
              </h1>
              <p className="mt-2 text-lg text-gray-600">{AUTHOR.job_title}</p>

              {/* Stat row */}
              <dl className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-10">
                {AUTHOR.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-sm text-gray-500">{s.label}</dt>
                    <dd className="text-2xl font-bold text-gray-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Body: main bio + sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          {/* Main column */}
          <div className="min-w-0">
            <section id="bio" className="scroll-mt-24" aria-labelledby="bio-h">
              <h2 id="bio-h" className="text-2xl font-bold text-gray-900 mb-4">
                Biography
              </h2>
              <div className="space-y-4 text-[17px] leading-relaxed text-gray-700">
                {AUTHOR.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            <section id="guides" className="scroll-mt-24 mt-12" aria-labelledby="guides-h">
              <h2 id="guides-h" className="text-2xl font-bold text-gray-900 mb-4">
                Recent guides by {AUTHOR.name.split(" ")[0]}
              </h2>
              <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                {AUTHOR.guides.map((g) => (
                  <li key={g.path}>
                    <Link
                      href={g.path}
                      className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-orange-50/50"
                    >
                      <span className="font-medium text-gray-800">{g.title}</span>
                      <span aria-hidden="true" className="text-orange-500">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Areas of expertise
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AUTHOR.expertise.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <JsonLd
        data={personSchema({
          name: AUTHOR.name,
          path: PATH,
          jobTitle: AUTHOR.job_title,
          image: AUTHOR.photo || undefined,
          sameAs: SEED_AUTHOR.sameAs,
        })}
      />
    </PageShell>
  );
}
