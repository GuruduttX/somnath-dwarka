import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sparkles, ShieldCheck, Wallet } from "lucide-react";
import { buildMetadata, webPageSchema } from "@/src/lib/seo";
import { SITE_URL } from "@/src/config/site";
import JsonLd from "@/src/components/seo/JsonLd";
import PageShell from "@/src/components/shared/PageShell";
import Section from "@/src/components/shared/Section";
import DataTable from "@/src/components/shared/DataTable";
import Faq from "@/src/components/shared/Faq";
import CtaBand from "@/src/components/shared/CtaBand";
import RelatedLinks from "@/src/components/shared/RelatedLinks";
import HotelCityHero from "@/src/components/hotels/HotelCityHero";
import { HotelPropertyCards } from "@/src/components/hotels/HotelPropertyCards";
import { SEED_HOTELS } from "@/src/lib/seed/destinations";
import { getHotelBySlug } from "@/src/lib/content";
import HotelSopSections from "@/src/components/hotels/HotelSopSections";
import { buildRelatedLinks } from "@/src/lib/links";
import { getDatasetItem } from "@/src/lib/datasets/store";
import { getPageContent } from "@/src/lib/pages/getPageContent";
import { fillVars } from "@/src/lib/sectionCopy";
import { HOTELS_DATASET, HOTEL_CITY_COPY_DATASET } from "@/src/lib/cms-groups/catalog";
import { HOTEL_CITY_PAGE } from "../content";

export const revalidate = 3600;
type Params = { params: Promise<{ slug: string }> };

/** "Why book" strip icons by position. */
const WHY_ICONS = [ShieldCheck, Wallet, Sparkles];

/* Prerenders the code hotel pages; ones added through the CMS (site_hotels) render on first visit.
   Page data: its site_hotels item; SOP copy: its site_hotel_city_copy item (when one exists);
   shared copy: ../content.ts (CMS page "hotel-city"). */
export function generateStaticParams() {
  return SEED_HOTELS.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const h = await getDatasetItem(HOTELS_DATASET, slug);
  if (!h) return {};
  const copy = await getDatasetItem(HOTEL_CITY_COPY_DATASET, slug);
  return buildMetadata({
    title: copy?.titleTag ?? h.title,
    description: copy?.metaDescription ?? h.answer_first,
    path: `/hotels/${slug}/`,
  });
}

export default async function HotelCityPage({ params }: Params) {
  const { slug } = await params;
  const h = await getDatasetItem(HOTELS_DATASET, slug);
  if (!h) notFound();

  const [copy, t] = await Promise.all([getDatasetItem(HOTEL_CITY_COPY_DATASET, slug), getPageContent(HOTEL_CITY_PAGE)]);
  const v = (text: string) => fillVars(text, { city: h.city, nearTemple: h.near_temple });

  // The named hotels are CMS data (Content -> Hotels -> "Hotels shown on this
  // page"); the seed only stands in for cities not yet filled in.
  const cms = await getHotelBySlug(slug);
  const cmsProperties = Array.isArray(cms?.properties)
    ? (cms.properties as typeof h.properties)
    : [];
  const properties = cmsProperties.length ? cmsProperties : h.properties ?? [];
  /**
   * The figure in the hero is the operator's own Tripadvisor rating, which the
   * hotel SOPs state as 4.5. It is NOT an average of the hotels listed below:
   * those are named third-party properties we hold no ratings for, and averaging
   * their zeroes previously rendered "0.0 avg rating" beside real businesses.
   * A property that does carry a real rating is included.
   */
  const rated = properties.filter((p) => (p.rating || 0) > 0);
  const avgRating = rated.length
    ? rated.reduce((s, p) => s + (p.rating || 0), 0) / rated.length
    : 4.5;

  const related = buildRelatedLinks({
    self: `/hotels/${slug}/`,
    pillar: { target: "/hotels/", anchor: v(t.related.pillarAnchor) },
    money: "packages",
    siblings: [
      { target: `/${h.city.toLowerCase()}/`, anchor: v(t.related.cityGuideAnchor), type: "sibling" },
      { target: "/somnath-dwarka-taxi-service/", anchor: v(t.related.cabAnchor), type: "money" },
    ],
  });

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels/" },
    { name: v(t.crumb), path: `/hotels/${slug}/` },
  ];

  return (
    <PageShell crumbs={crumbs} flushHero lightCrumb>
      <HotelCityHero
        city={h.city}
        h1={h.h1}
        nearTemple={h.near_temple}
        image={h.hero_image || "/images/hotels/hero.webp"}
        tiers={h.tiers}
        count={properties.length}
        rating={avgRating}
        copy={{
          eyebrow: v(t.hero.eyebrow),
          nearPrefix: v(t.hero.nearPrefix),
          ratingSuffix: v(t.hero.ratingSuffix),
          countSuffix: v(t.hero.countSuffix),
          perNight: v(t.hero.perNight),
          primaryCta: v(t.hero.primaryCta),
          whatsappCta: v(t.hero.whatsappCta),
          whatsappMessage: v(t.hero.whatsappMessage),
          imageAlt: v(t.hero.imageAlt),
        }}
      />

      {/* ── Intro / answer-first ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-4xl px-4 pt-12 text-center sm:pt-14">
          <p className="text-[15px] leading-[1.8] text-[#6b4c38] sm:text-base">{copy?.quickAnswer ?? h.answer_first}</p>
        </div>
      </div>

      {/* ── Hotel listing ── */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-14 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-orange-700">
              <Sparkles size={14} />
              {v(t.listing.badge)}
            </span>
            <h2 className="mt-5 text-3xl font-black leading-[1.1] tracking-[-0.02em] text-[#111827] sm:text-4xl">
              {v(t.listing.headingStart)} <span className="text-orange-500">{v(t.listing.headingHighlight)}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-gray-500">
              {v(t.listing.intro)}
            </p>
          </div>

          <div className="mt-10 pb-2">
            <HotelPropertyCards properties={properties} city={h.city} note={v(t.listing.honestyNote)} />
          </div>

          {copy ? (
            <p className="mx-auto max-w-3xl pb-2 text-center text-sm leading-relaxed text-gray-500">
              {copy.propertiesNote}
            </p>
          ) : null}
        </div>
      </div>

      {/* ── Tier price guide ── */}
      <Section id="tiers" title={v(t.tiers.title)}>
        <DataTable
          columns={t.tiers.columns.map(v)}
          rows={h.tiers.map((t) => [t.tier, t.area, t.typical_range])}
          verify={{ key: "range", label: "Price ranges", value: "", verify: false }}
        />
        <p className="mt-2 text-sm text-gray-500">
          {v(t.tiers.note)}
        </p>
      </Section>

      {/* ── Why book with us strip ── */}
      <div className="mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.whyStrip.map((w, i) => ({ Icon: WHY_ICONS[i % WHY_ICONS.length], t: v(w.title), s: v(w.text) })).map(({ Icon, t, s }) => (
            <div key={t} className="rounded-2xl border border-orange-100 bg-orange-50/40 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 ring-1 ring-orange-100">
                <Icon size={18} />
              </span>
              <p className="mt-3 text-[15px] font-bold text-[#3a2416]">{t}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#6b4c38]">{s}</p>
            </div>
          ))}
        </div>
      </div>


      {copy ? <HotelSopSections copy={copy} /> : null}

      <Faq items={copy?.faq ? [...copy.faq] : h.faq} heading={v(t.faqHeading)} />
      <CtaBand context={v(t.ctaBand.context)} title={v(t.ctaBand.title)} subtitle={v(t.ctaBand.subtitle)} />
      <RelatedLinks links={related} />

      {/*
        A city hotel page is a curated list, so it declares CollectionPage plus
        an ItemList of the named properties. The Faq component emits FAQPage.
        No AggregateRating is published here: the hero's 4.5 is the operator's
        own Tripadvisor score, not a rating of this list, and the named
        properties are third-party businesses whose reviews are not ours to
        claim. A property's own rating rides along only when it is real.
      */}
      <JsonLd
        data={[
          webPageSchema({
            name: h.h1,
            description: h.answer_first,
            path: `/hotels/${slug}/`,
            type: "CollectionPage",
            crumbs,
            speakable: true,
          }),
          ...(properties.length
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "ItemList",
                  "@id": `${SITE_URL}/hotels/${slug}/#properties`,
                  name: v(t.crumb),
                  numberOfItems: properties.length,
                  isPartOf: { "@id": `${SITE_URL}/hotels/${slug}/#webpage` },
                  itemListElement: properties.map((p, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    item: {
                      "@type": "Hotel",
                      name: p.name,
                      description: p.description,
                      ...(p.image ? { image: p.image } : {}),
                      address: {
                        "@type": "PostalAddress",
                        addressLocality: h.city,
                        addressRegion: "Gujarat",
                        addressCountry: "IN",
                      },
                      ...(p.amenities?.length
                        ? {
                            amenityFeature: p.amenities.map((a) => ({
                              "@type": "LocationFeatureSpecification",
                              name: a,
                              value: true,
                            })),
                          }
                        : {}),
                      ...(p.rating > 0
                        ? {
                            aggregateRating: {
                              "@type": "AggregateRating",
                              ratingValue: String(p.rating),
                              bestRating: "5",
                              ...(p.reviews
                                ? { reviewCount: String(p.reviews) }
                                : { ratingCount: "1" }),
                            },
                          }
                        : {}),
                    },
                  })),
                },
              ]
            : []),
        ]}
      />
    </PageShell>
  );
}
