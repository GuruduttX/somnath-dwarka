/**
 * SEO helpers — metadata builder + JSON-LD schema builders (SOP §4, §12).
 *
 * Hard gates (SOP §12): AggregateRating / Review / Offer / Event /
 * LocalBusiness only render when real data is supplied. The builders below
 * return `null` when the gate is not satisfied; callers must filter nulls.
 */
import type { Metadata } from "next";
import { SITE_URL, BRAND, CONTACT, IS_STAGING } from "@/src/config/site";

export type Crumb = { name: string; path: string };

const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

const clamp = (s: string, max: number) =>
  s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…";

type MetaInput = {
  title: string; // ≤60 enforced
  description: string; // ≤155 enforced
  path: string; // canonical path, e.g. "/somnath-dwarka-tour-package/"
  noindex?: boolean;
  canonicalOverride?: string;
  ogImage?: string;
  ogType?: "website" | "article";
};

/** Build a page's <head> metadata (title ≤60, meta ≤155, self-canonical, OG/Twitter). */
export function buildMetadata(input: MetaInput): Metadata {
  const title = clamp(input.title, 60);
  const description = clamp(input.description, 155);
  const canonical = input.canonicalOverride ?? abs(input.path);
  const image = input.ogImage ?? BRAND.ogImage;
  // Staging is noindex sitewide (SOP §15); production honours per-page noindex.
  const noindex = IS_STAGING || !!input.noindex;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: !noindex,
      follow: true,
      googleBot: { index: !noindex, follow: true },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND.name,
      type: input.ogType ?? "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ---------------------------------- JSON-LD ---------------------------------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    url: `${SITE_URL}/`,
    logo: BRAND.logo,
    sameAs: [] as string[],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND.name,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** LocalBusiness — gated: only when real NAP confirmed (SOP §12). */
export function localBusinessSchema() {
  if (!CONTACT.napConfirmed) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BRAND.name,
    url: `${SITE_URL}/`,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.locality,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: CONTACT.address.country,
    },
  };
}

/**
 * Generic page node — use for pages without a more specific type. `type` may be
 * narrowed to AboutPage / ContactPage / CollectionPage / FAQPage etc. Wires the
 * page to the sitewide WebSite + Organization nodes and (optionally) its
 * BreadcrumbList so search/answer engines get one connected graph.
 */
export function webPageSchema(opts: {
  name: string;
  description: string;
  path: string;
  type?:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "CheckoutPage";
  crumbs?: Crumb[];
  primaryImage?: string;
}) {
  const url = abs(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: clamp(opts.name, 110),
    description: clamp(opts.description, 300),
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    ...(opts.primaryImage ? { primaryImageOfPage: opts.primaryImage } : {}),
    ...(opts.crumbs?.length
      ? { breadcrumb: { "@id": `${url}#breadcrumb` } }
      : {}),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  // Anchor the list to the current (last) crumb so webPageSchema can reference it.
  const selfPath = crumbs.length ? crumbs[crumbs.length - 1].path : "/";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${abs(selfPath)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** Offer — gated: only when a real price is supplied (SOP §12). */
export function offerSchema(price?: number, currency = "INR") {
  if (!price || price <= 0) return null;
  return {
    "@type": "Offer",
    price: String(price),
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
  };
}

export function touristTripSchema(opts: {
  name: string;
  description: string;
  path: string;
  price?: number;
}) {
  const offers = offerSchema(opts.price);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    ...(offers ? { offers } : {}),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
  /** e.g. "Car rental with driver" on the vehicle pages. */
  serviceType?: string;
  /** Full provider node; defaults to the site Organization reference. */
  provider?: object;
  /** Anchors the node so other blocks can reference it. Relative paths are absolutised. */
  id?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    ...(opts.id ? { "@id": abs(opts.id) } : {}),
    name: opts.name,
    description: opts.description,
    ...(opts.serviceType ? { serviceType: opts.serviceType } : {}),
    url: abs(opts.path),
    provider: opts.provider ?? { "@id": `${SITE_URL}/#organization` },
    ...(opts.areaServed ? { areaServed: opts.areaServed } : {}),
  };
}

/**
 * TaxiService with an OfferCatalog of the routes served, per the taxi hub SOP.
 *
 * Distinct from serviceSchema: the hub claims the category head, so it declares
 * the specific service type and lists every route spoke as an offer, which is
 * what lets the hub rank on breadth rather than on any one route.
 */
/**
 * The local operating unit, as the cab SOPs describe it: a TravelAgency under
 * the Experience My India parent, carrying the phone, founding year, founder,
 * spoken languages and GSTIN. Used as the `provider` on route spokes so the
 * trust signals sit in the same graph as the service being offered.
 */
export function localUnitProvider(opts: {
  name: string;
  parent: string;
  parentSlogan: string;
  telephone: string;
  foundingDate: string;
  founder: string;
  languages: readonly string[];
  gstin: string;
}) {
  return {
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#localunit`,
    name: opts.name,
    parentOrganization: {
      "@type": "Organization",
      name: opts.parent,
      slogan: opts.parentSlogan,
    },
    telephone: opts.telephone,
    foundingDate: opts.foundingDate,
    founder: { "@type": "Person", name: opts.founder },
    knowsLanguage: [...opts.languages],
    identifier: {
      "@type": "PropertyValue",
      propertyID: "GSTIN",
      value: opts.gstin,
    },
  };
}

export function taxiServiceSchema(opts: {
  name: string;
  serviceType: string;
  path: string;
  areaServed: string;
  catalogName?: string;
  offers?: { name: string; path: string }[];
  /** Full provider node; defaults to the site Organization reference. */
  provider?: object;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${abs(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    provider: opts.provider ?? { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: opts.areaServed },
    url: abs(opts.path),
    // Only the hub lists a catalogue; a single route spoke has nothing to offer
    // beyond itself, and an empty OfferCatalog is worse than none.
    ...(opts.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.catalogName ?? "Routes",
            itemListElement: opts.offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: o.name, url: abs(o.path) },
            })),
          },
        }
      : {}),
  };
}

export function placeSchema(opts: {
  name: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  author: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: clamp(opts.headline, 110),
    description: opts.description,
    url: abs(opts.path),
    ...(opts.image ? { image: opts.image } : {}),
    author: { "@type": "Person", name: opts.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

/** Event — gated: only with real dates (SOP §12). */
export function eventSchema(opts: {
  name: string;
  path: string;
  startDate?: string;
  location?: string;
}) {
  if (!opts.startDate) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: opts.name,
    url: abs(opts.path),
    startDate: opts.startDate,
    ...(opts.location
      ? { location: { "@type": "Place", name: opts.location } }
      : {}),
  };
}

/** Person — for the author/E-E-A-T page (SOP §5 #16). */
export function personSchema(opts: {
  name: string;
  path: string;
  jobTitle?: string;
  image?: string;
  sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    url: abs(opts.path),
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
  };
}
