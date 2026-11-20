import type { Metadata } from "next";
import Image from "@/src/components/shared/Img";
import Link from "next/link";
import { buildMetadata, personSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import JsonLd from "@/src/components/seo/JsonLd";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { fillVars } from "@/src/components/templates/copy";
import { AUTHOR_PAGE } from "./content";

const PATH = AUTHOR_PAGE.path;
/* Copy lives in ./content.ts and is editable through the CMS; a save refreshes this page at once. */
export const revalidate = 3600;

/**
 * Placeholder author profile — dummy content for layout/design. Swap `bio`,
 * `stats`, `expertise`, `guides` and `sameAs` (./content.ts, or through the CMS)
 * for verified data before this page is allowed into the index (`bio_verified`).
 */
export async function generateMetadata(): Promise<Metadata> {
  const a = await getPageContent(AUTHOR_PAGE);
  const v = { name: a.name, job_title: a.job_title, firstStat: a.stats[0]?.value ?? "" };
  return buildMetadata({
    title: fillVars(a.meta.title, v),
    description: fillVars(a.meta.description, v),
    path: PATH,
    // E-E-A-T: this is placeholder content, so keep the page out of the index.
    noindex: !a.bio_verified,
  });
}

export default async function AuthorPage() {
  const AUTHOR = await getPageContent(AUTHOR_PAGE);
  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Author", path: PATH },
      ]}
    >
      {/* Full-bleed hero band */}
      <section className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-white border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:pt-6 sm:pb-14">
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
                {AUTHOR.eyebrow}
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
                {AUTHOR.bioHeading}
              </h2>
              <div className="space-y-4 text-[17px] leading-relaxed text-gray-700">
                {AUTHOR.bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            <section id="guides" className="scroll-mt-24 mt-12" aria-labelledby="guides-h">
              <h2 id="guides-h" className="text-2xl font-bold text-gray-900 mb-4">
                {fillVars(AUTHOR.guidesHeading, { firstName: AUTHOR.name.split(" ")[0] })}
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
                {AUTHOR.expertiseHeading}
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
          sameAs: AUTHOR.sameAs,
        })}
      />
    </PageShell>
  );
}
