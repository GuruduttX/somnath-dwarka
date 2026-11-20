import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageShell from "@/src/components/shared/PageShell";
import Faq from "@/src/components/shared/Faq";
import EnquiryForm from "@/src/components/shared/EnquiryForm";
import JsonLd from "@/src/components/seo/JsonLd";
import TourCard from "@/src/utils/TourCard";
import type { TourCardData } from "@/src/utils/TourData";
import { webPageSchema } from "@/src/lib/seo";
import { plain, rich, type RichLink } from "@/src/lib/pages/rich";
import { customPagePath, type CustomPage, type CustomPageLink, type CustomPageSection } from "@/src/lib/customPages";
import CmsImage from "./CmsImage";

/*
  The one template every custom page (lib/customPages.ts) renders with. It
  borrows the site's own look: PageShell (the floating Navbar, breadcrumb and
  its JSON-LD), the cream and saffron accents, the shared TourCard, FAQ and
  enquiry form. Sections alternate white and cream so a long page keeps its
  rhythm. The footer comes from the root layout (PublicChrome).
*/

const H2 = "text-2xl md:text-4xl font-bold leading-tight text-gray-900";
const BODY = "text-[16px] leading-relaxed text-gray-700 sm:text-[17px]";
const isOutside = (href: string) => /^(https?:|tel:|mailto:)/i.test(href);

const TextLink: RichLink = ({ href, children }) =>
  isOutside(href) ? (
    <a href={href} className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700" rel="noopener">
      {children}
    </a>
  ) : (
    <Link href={href} className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700">
      {children}
    </Link>
  );

const text = (s: string) => rich(s, TextLink);

function Button({ link, variant }: { link: CustomPageLink; variant: "primary" | "secondary" | "light" }) {
  if (!link.label || !link.href) return null;
  const cls =
    variant === "primary"
      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200 hover:-translate-y-0.5"
      : variant === "light"
        ? "bg-white text-orange-700 hover:-translate-y-0.5"
        : "border border-orange-200 bg-white text-gray-900 hover:border-orange-400 hover:text-orange-700";
  const className = `inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition duration-300 ${cls}`;
  const inner = (
    <>
      {link.label}
      {variant !== "secondary" && <ArrowRight size={16} strokeWidth={2.6} />}
    </>
  );
  return isOutside(link.href) || link.href.startsWith("#") ? (
    <a href={link.href} className={className} {...(isOutside(link.href) ? { rel: "noopener" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {inner}
    </Link>
  );
}

function SectionHead({ heading, intro }: { heading: string; intro?: string }) {
  if (!heading && !intro) return null;
  return (
    <div className="mb-8 max-w-3xl">
      {heading && <h2 className={H2}>{heading}</h2>}
      {heading && <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-400" />}
      {intro && <p className={`mt-5 ${BODY}`}>{text(intro)}</p>}
    </div>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5">
      {items.map((p, i) => (
        <p key={i} className={BODY}>
          {text(p)}
        </p>
      ))}
    </div>
  );
}

function Section({ s, packages }: { s: CustomPageSection; packages: Record<string, TourCardData> }): ReactNode {
  switch (s.type) {
    case "text":
      return (
        <div className="mx-auto max-w-3xl">
          <SectionHead heading={s.heading} />
          <Paragraphs items={s.paragraphs} />
        </div>
      );
    case "imageText":
      return (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className={s.imageSide === "left" ? "lg:order-2" : ""}>
            <SectionHead heading={s.heading} />
            <Paragraphs items={s.paragraphs} />
          </div>
          {s.image && (
            <div
              className={`relative aspect-[4/3] overflow-hidden rounded-3xl border border-orange-100 shadow-xl shadow-orange-100 ${s.imageSide === "left" ? "lg:order-1" : ""}`}
            >
              <CmsImage src={s.image} alt={s.imageAlt || s.heading} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          )}
        </div>
      );
    case "list":
      return (
        <div>
          <SectionHead heading={s.heading} intro={s.intro} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {s.items.map((item, i) => (
              <li key={i} className="flex gap-3 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                <CheckCircle2 size={20} strokeWidth={2.4} className="mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
                <span className="text-[15.5px] leading-relaxed text-gray-700">{text(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "cards":
      return (
        <div>
          <SectionHead heading={s.heading} intro={s.intro} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.cards.map((c, i) => {
              const body = (
                <>
                  {c.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <CmsImage
                        src={c.image}
                        alt={c.title}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                    {c.text && <p className="mt-2 flex-1 text-[15px] leading-relaxed text-gray-600">{c.text}</p>}
                    {c.href && (
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-orange-600">
                        Learn more <ArrowRight size={15} strokeWidth={2.6} />
                      </span>
                    )}
                  </div>
                </>
              );
              const cls =
                "group flex flex-col overflow-hidden rounded-2xl border border-orange-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100";
              if (!c.href) return <div key={i} className={cls}>{body}</div>;
              return isOutside(c.href) ? (
                <a key={i} href={c.href} className={cls} rel="noopener">
                  {body}
                </a>
              ) : (
                <Link key={i} href={c.href} className={cls}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      );
    case "packages": {
      const found = [...new Set(s.packageSlugs)].map((slug) => packages[slug]).filter(Boolean);
      if (!found.length) return null;
      return (
        <div>
          <SectionHead heading={s.heading} intro={s.intro} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {found.map((pkg) => (
              <TourCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      );
    }
    case "image":
      if (!s.image) return null;
      return (
        <figure className="mx-auto max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-orange-100 shadow-xl shadow-orange-100">
            <CmsImage src={s.image} alt={s.imageAlt || s.caption} sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>
          {s.caption && <figcaption className="mt-3 text-center text-[14px] text-gray-500">{s.caption}</figcaption>}
        </figure>
      );
    case "table":
      return (
        <div>
          <SectionHead heading={s.heading} />
          <div className="overflow-x-auto rounded-2xl border border-orange-200 bg-white">
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-orange-50">
                  {s.columns.map((c, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-semibold text-gray-900">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((r, i) => (
                  <tr key={i} className="border-t border-orange-100">
                    {r.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                        {text(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "cta":
      return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 px-6 py-12 text-center text-white sm:px-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <h2 className="relative text-2xl font-bold leading-tight md:text-4xl">{s.heading}</h2>
          {s.text && <p className="relative mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-white/90">{s.text}</p>}
          <div className="relative mt-7 flex justify-center">
            <Button link={s.button} variant="light" />
          </div>
        </div>
      );
  }
}

export default function CustomPageView({
  page,
  packages,
  preview = false,
}: {
  page: CustomPage;
  /** Published packages named by the page's packages sections, as card data keyed by slug. */
  packages: Record<string, TourCardData>;
  /** Shown from the admin preview: marks a draft as not yet public. */
  preview?: boolean;
}) {
  const h = page.hero;
  const path = customPagePath(page.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: plain(page.title), path },
  ];
  return (
    <PageShell crumbs={crumbs}>
      {preview && page.status !== "published" && (
        <div className="mx-auto mb-4 w-[94%] max-w-[1400px] rounded-xl bg-gray-900 px-4 py-2.5 text-center text-[13px] font-semibold text-white">
          Draft preview: this page is not public yet. Publish it to show it at {path}
        </div>
      )}

      <main id="main-content" className="bg-white">
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFAF3 0%, #FFF1E1 100%)" }}>
          <div
            className={`relative mx-auto grid w-[94%] max-w-[1400px] grid-cols-1 items-center gap-10 pb-14 pt-10 lg:pb-20 lg:pt-14 ${h.image ? "lg:grid-cols-2" : ""}`}
          >
            <div className={h.image ? "" : "mx-auto max-w-3xl text-center"}>
              {h.eyebrow && (
                <span className="inline-flex items-center rounded-full border border-orange-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-600">
                  {h.eyebrow}
                </span>
              )}

              <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">{h.heading || page.title}</h1>

              {h.subheading && (
                <p className={`mt-5 text-[16px] leading-relaxed text-gray-700 sm:text-[17px] ${h.image ? "max-w-xl" : "mx-auto max-w-2xl"}`}>
                  {text(h.subheading)}
                </p>
              )}

              {(h.primaryButton.label || h.secondaryButton.label) && (
                <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center ${h.image ? "" : "sm:justify-center"}`}>
                  <Button link={h.primaryButton} variant="primary" />
                  <Button link={h.secondaryButton} variant="secondary" />
                </div>
              )}
            </div>

            {h.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#F1DCC0] shadow-[0_10px_34px_-14px_rgba(200,90,10,0.30)]">
                <CmsImage src={h.image} alt={h.imageAlt || page.title} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
              </div>
            )}
          </div>
        </section>

        {page.sections.map((s, i) => (
          <section key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#FFFDF9]"}>
            <div className="mx-auto w-[94%] max-w-[1200px] py-12 md:py-16">
              <Section s={s} packages={packages} />
            </div>
          </section>
        ))}

        {page.faqs.length > 0 && <Faq items={page.faqs.map((f) => ({ question: plain(f.q), answer: plain(f.a) }))} />}

        {page.showEnquiryForm && (
          <section id="enquiry-section" className="scroll-mt-24 bg-[#FFFDF9]">
            <div className="mx-auto w-[94%] max-w-xl py-12 md:py-16">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">Plan your yatra with a local team</h2>
              <EnquiryForm context={plain(page.title)} />
            </div>
          </section>
        )}
      </main>

      <JsonLd
        data={webPageSchema({
          name: plain(h.heading || page.title),
          description: plain(page.meta.description || h.subheading || page.title),
          path,
          crumbs,
          ...(h.image ? { primaryImage: h.image } : {}),
          dateModified: page.updatedAt,
          ...(page.faqs.length ? { faqCount: page.faqs.length } : {}),
        })}
      />
    </PageShell>
  );
}
