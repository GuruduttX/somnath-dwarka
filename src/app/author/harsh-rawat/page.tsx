import type { Metadata } from "next";
import { buildMetadata, personSchema } from "@/src/lib/seo";
import PageShell from "@/src/components/shared/PageShell";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Section from "@/src/components/shared/Section";
import VerifyStamp from "@/src/components/shared/VerifyStamp";
import JsonLd from "@/src/components/seo/JsonLd";
import { SEED_AUTHOR } from "@/src/lib/seed/destinations";

const PATH = "/author/harsh-sharma/";
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: `${SEED_AUTHOR.name} — Author, Somnath Dwarka Guides`,
  description: `About ${SEED_AUTHOR.name}, ${SEED_AUTHOR.job_title}. Verified biography and credentials pending.`,
  path: PATH,
  // E-E-A-T: hold the page out of the index until a real, verified bio exists.
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
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{SEED_AUTHOR.name}</h1>
        <p className="text-gray-500 mt-1">{SEED_AUTHOR.job_title}</p>
        <AnswerFirst>{SEED_AUTHOR.answer_first}</AnswerFirst>
      </div>

      <Section id="bio" title="Biography">
        {SEED_AUTHOR.bio_verified && SEED_AUTHOR.bio ? (
          <p className="text-gray-700">{SEED_AUTHOR.bio}</p>
        ) : (
          <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
            <p className="text-gray-700 mb-2">
              A verified biography, years of experience and profile links for {SEED_AUTHOR.name}
              {" "}are being confirmed. We do not publish author credentials as fact until verified.
            </p>
            <VerifyStamp fact={{ key: "bio", label: "Author bio", value: "", verify: false }} />
          </div>
        )}
      </Section>

      {/* Person schema still asserts only the name/role until bio verified. */}
      <JsonLd
        data={personSchema({
          name: SEED_AUTHOR.name,
          path: PATH,
          jobTitle: SEED_AUTHOR.job_title,
          image: SEED_AUTHOR.photo || undefined,
          sameAs: SEED_AUTHOR.sameAs,
        })}
      />
    </PageShell>
  );
}
