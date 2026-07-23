import type { ReactNode } from "react";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import AnswerFirst from "@/src/components/shared/AnswerFirst";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks, { type RelatedLink } from "@/src/components/shared/RelatedLinks";
import JsonLd from "@/src/components/seo/JsonLd";
import { webPageSchema, type Crumb } from "@/src/lib/seo";

/**
 * Shared shell for every CMS-driven page in the hub-and-spoke tree (SOP §5, §8).
 *
 * Empty blocks render nothing rather than a placeholder: a freshly-imported
 * scaffold shows its H1, breadcrumb, links and CTA, and stays noindex until an
 * editor fills the verified fields. That keeps the page reachable (no orphans,
 * no 404s from the home page) without asserting a fact nobody has checked.
 */
export type CmsPageProps = {
  crumbs: Crumb[];
  h1: string;
  path: string;
  answerFirst?: string;
  body?: string;
  faq?: { question: string; answer: string }[];
  related: RelatedLink[];
  ctaContext: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  /** Extra JSON-LD for the page's schema_set, e.g. TouristTrip. */
  extraSchema?: Record<string, unknown> | null;
  children?: ReactNode;
};

export default function CmsPage({
  crumbs,
  h1,
  path,
  answerFirst,
  body,
  faq,
  related,
  ctaContext,
  ctaTitle,
  ctaSubtitle,
  extraSchema,
  children,
}: CmsPageProps) {
  const paragraphs = (body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <PageShell crumbs={crumbs}>
      <Section>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{h1}</h1>
        {answerFirst ? (
          <div className="mt-4">
            <AnswerFirst speakable>{answerFirst}</AnswerFirst>
          </div>
        ) : null}
        {paragraphs.length ? (
          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-7 text-gray-700">
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </Section>

      {children}

      {faq?.length ? <Faq items={faq} /> : null}

      <CtaBand context={ctaContext} title={ctaTitle} subtitle={ctaSubtitle} />
      <RelatedLinks links={related} />

      {/* BreadcrumbList JSON-LD comes from PageShell, which owns the single breadcrumb. */}
      <JsonLd data={webPageSchema({ name: h1, description: answerFirst ?? h1, path })} />
      {extraSchema ? <JsonLd data={extraSchema} /> : null}
    </PageShell>
  );
}
