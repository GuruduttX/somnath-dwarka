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

/**
 * Title-safe clamp: trims at a word boundary and strips trailing separators
 * rather than cutting mid-word and appending "…". A <title> is a label, not
 * prose — "Budget Hotels in Somnath — Areas, Tariff Range &…" reads as broken
 * in a SERP, so we drop the partial word instead.
 */
const clampTitle = (s: string, max: number) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const atWord = cut.slice(0, cut.lastIndexOf(" "));
  return (atWord || cut).replace(/[\s–—\-|,:;&]+$/, "");
};

/** " — Somnath Dwarka Tours" — appended only when the whole title still fits. */
const TITLE_SUFFIX = ` — ${BRAND.shortName}`;
export const TITLE_MAX = 60;

/**
 * Final <title> text. The root layout used to append the brand via a metadata
 * `template`, which ran *after* the 60-char clamp and pushed 177 of 188 pages
 * over the limit (up to 91 chars). Composing here instead means the budget is
 * enforced on the string that actually ships: the brand suffix is added only
 * when the page title leaves room for it, and dropped when it does not — the
 * page's own keywords are worth more than a repeated brand name.
 */
export function composeTitle(raw: string): string {
  const base = clampTitle(raw.trim(), TITLE_MAX);
  return base.length + TITLE_SUFFIX.length <= TITLE_MAX ? base + TITLE_SUFFIX : base;
}

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
  const title = composeTitle(input.title);
  const description = clamp(input.description, 155);
  const canonical = input.canonicalOverride ?? abs(input.path);
  const image = input.ogImage ?? BRAND.ogImage;
  // Staging is noindex sitewide (SOP §15); production honours per-page noindex.
  const noindex = IS_STAGING || !!input.noindex;

  return {
    // `absolute` opts out of the layout's title template — the brand suffix is
    // already composed in, within the 60-char budget.
    title: { absolute: title },
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

/**
 * Node types this site emits on every page from one place: Organization and
 * WebSite in the root layout, BreadcrumbList in PageShell, FAQPage in the Faq
 * component. Nothing else may re-declare them.
 */
const SITEWIDE_TYPES = new Set(["Organization", "WebSite", "BreadcrumbList", "FAQPage"]);

type LdNode = Record<string, unknown>;

/**
 * Clean a CMS-supplied `schema_overrides` blob before it is rendered.
 *
 * That field takes raw JSON-LD pasted by an editor, and the natural thing to
 * paste is a complete @graph copied from a generator — which re-declares the
 * Organization, WebSite, BreadcrumbList and FAQPage nodes the page already
 * emits. The package pillar was shipping two FAQPage, two BreadcrumbList and
 * two Organization nodes for exactly this reason; a duplicated FAQPage is the
 * one that costs a rich result rather than merely being untidy.
 *
 * So the override is honoured for everything it uniquely contributes and
 * filtered for the four types the page owns elsewhere. Returns null when the
 * blob is unparseable or contributes nothing, so callers can fall back.
 */
export function sanitizeSchemaOverride(raw: string): LdNode[] | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  const flatten = (v: unknown): LdNode[] => {
    if (Array.isArray(v)) return v.flatMap(flatten);
    if (v && typeof v === "object") {
      const node = v as LdNode;
      // A wrapper carrying only @context + @graph is a container, not a node.
      if (Array.isArray(node["@graph"])) return flatten(node["@graph"]);
      return [node];
    }
    return [];
  };

  const kept = flatten(parsed).filter((n) => {
    const t = n["@type"];
    const types = Array.isArray(t) ? t : [t];
    return !types.some((x) => typeof x === "string" && SITEWIDE_TYPES.has(x));
  });

  if (!kept.length) return null;
  // Re-attach @context: it lived on the wrapper we just unwrapped.
  return kept.map((n) => ({ "@context": "https://schema.org", ...n }));
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: `${SITE_URL}/`,
    // An ImageObject rather than a bare URL: Google reads the logo property for
    // knowledge-panel branding and wants a resolvable image node.
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: BRAND.logo,
      caption: BRAND.name,
    },
    image: { "@id": `${SITE_URL}/#logo` },
    description: BRAND.tagline,
    // The phone and email are published on every page already, so declaring the
    // contact point states a fact the site is committed to rather than adding a
    // new claim. The postal address stays behind the NAP gate in
    // localBusinessSchema until the client confirms it.
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone,
      email: CONTACT.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "gu"],
    },
    // Populated from BRAND.socialProfiles as the client confirms each one, and
    // omitted entirely while none are: `sameAs: []` asserts "no profiles exist".
    ...(BRAND.socialProfiles.length ? { sameAs: [...BRAND.socialProfiles] } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND.name,
    description: BRAND.tagline,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
    // No SearchAction: it declared a sitelinks searchbox at /search?q=, which
    // is not a route on this site (it 404s), and Google retired that rich
    // result in any case. Declaring a capability the site lacks is a
    // correctness bug in the graph, not a missed opportunity.
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
  /**
   * Marks the answer-first block as the passage worth reading aloud. Templates
   * already wrap that copy in `.speakable`, so answer engines get pointed at
   * the direct answer rather than at whatever prose happens to come first.
   */
  speakable?: boolean;
  dateModified?: string;
  /** Wires the page's FAQ block in as the page's main entity. */
  faqCount?: number;
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
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...(opts.speakable
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".speakable"],
          },
        }
      : {}),
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
