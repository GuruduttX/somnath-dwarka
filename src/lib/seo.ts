/**
 * SEO helpers — metadata builder + JSON-LD schema builders (SOP §4, §12).
 *
 * Hard gates (SOP §12): AggregateRating / Review / Offer / Event /
 * LocalBusiness only render when real data is supplied. The builders below
 * return `null` when the gate is not satisfied; callers must filter nulls.
 */
import type { Metadata } from "next";
import { SITE_URL, BRAND, CONTACT, IS_STAGING, OPERATOR } from "@/src/config/site";

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
  ogImageAlt?: string;
  ogType?: "website" | "article";
  /** Article-only OG fields; ignored unless `ogType: "article"`. */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
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
      locale: "en_IN",
      type: input.ogType ?? "website",
      // Dimensions + alt: without them Facebook/LinkedIn/WhatsApp guess the
      // crop on first scrape and often fall back to a small square card.
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.ogImageAlt ?? title,
        },
      ],
      // Article metadata is only meaningful on `type: "article"`; emitting
      // article:published_time on a website card is ignored at best.
      ...(input.ogType === "article"
        ? {
            ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
            ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
            ...(input.authors?.length ? { authors: input.authors } : {}),
            ...(input.section ? { section: input.section } : {}),
            ...(input.tags?.length ? { tags: input.tags } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      ...(BRAND.twitterHandle ? { site: BRAND.twitterHandle, creator: BRAND.twitterHandle } : {}),
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
    // Identity facts already published on the cab pages and the home trust
    // strip (OPERATOR), so the Organization node states the same entity the
    // visible copy does: the local unit of Experience My India, est. 2018.
    foundingDate: OPERATOR.foundingDate,
    founder: {
      "@type": "Person",
      name: OPERATOR.founder,
      url: `${SITE_URL}/author/harsh-rawat/`,
    },
    parentOrganization: {
      "@type": "Organization",
      name: OPERATOR.parent,
      slogan: OPERATOR.parentSlogan,
    },
    taxID: OPERATOR.gstin,
    identifier: { "@type": "PropertyValue", propertyID: "GSTIN", value: OPERATOR.gstin },
    areaServed: { "@type": "State", name: "Gujarat" },
    knowsLanguage: [...OPERATOR.languages],
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

/**
 * LocalBusiness (TravelAgency) — gated: only when real NAP is confirmed
 * (SOP §12). Google's local-business result needs a real postal address, so
 * this stays off until CONTACT.napConfirmed is flipped with the registered
 * address filled in (home SOP §17 [[REGISTERED ADDRESS]]). Everything else it
 * carries is already published on the site.
 */
export function localBusinessSchema() {
  if (!CONTACT.napConfirmed) return null;
  const a = CONTACT.address;
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BRAND.name,
    url: `${SITE_URL}/`,
    image: BRAND.ogImage,
    logo: BRAND.logo,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      ...(a.street ? { streetAddress: a.street } : {}),
      addressLocality: a.locality,
      addressRegion: a.region,
      ...(a.postalCode ? { postalCode: a.postalCode } : {}),
      addressCountry: a.country,
    },
    areaServed: ["Dwarka", "Somnath", "Gujarat"].map((name) => ({ "@type": "Place", name })),
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    identifier: { "@type": "PropertyValue", propertyID: "GSTIN", value: OPERATOR.gstin },
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
  /** @id of the node the page is about, e.g. a package's `${url}#trip`. */
  mainEntityId?: string;
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
    ...(opts.mainEntityId ? { mainEntity: { "@id": abs(opts.mainEntityId) } } : {}),
    inLanguage: "en-IN",
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
export function offerSchema(
  price?: number,
  currency = "INR",
  extra: { name?: string; path?: string; description?: string } = {}
) {
  if (!price || price <= 0) return null;
  return {
    "@type": "Offer",
    ...(extra.name ? { name: extra.name } : {}),
    ...(extra.description ? { description: extra.description } : {}),
    price: String(price),
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
    ...(extra.path ? { url: abs(extra.path) } : {}),
    // Per person on twin-sharing is how every package price on the site is
    // quoted; saying so keeps the structured price honest about its basis.
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(price),
      priceCurrency: currency,
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: 1,
        unitText: "per person, twin-sharing",
      },
      valueAddedTaxIncluded: false,
    },
    seller: { "@id": `${SITE_URL}/#organization` },
  };
}

/* ------------------------------- reviews gate ------------------------------- */

/**
 * A review a real, named guest actually gave. Nothing on the site may emit
 * Review / AggregateRating JSON-LD from anything else (SOP §12, home SOP §15):
 * a fabricated rating is a manual-action risk and a lie about real people.
 */
export type RealReview = {
  author: string;
  rating: number; // 1–5
  body: string;
  /** ISO date the review was given. */
  date?: string;
  /** Where it was left, e.g. "Google". */
  publisher?: string;
};

/**
 * `aggregateRating` + `review` properties for a Product/TouristTrip node.
 * Returns an empty object unless at least one real review is supplied, so a
 * caller can spread the result unconditionally.
 */
export function reviewProps(reviews?: RealReview[]) {
  const real = (reviews ?? []).filter(
    (r) => r.author?.trim() && r.body?.trim() && r.rating >= 1 && r.rating <= 5
  );
  if (!real.length) return {};
  const avg = real.reduce((a, r) => a + r.rating, 0) / real.length;
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(real.length),
      reviewCount: String(real.length),
    },
    review: real.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
      reviewBody: r.body,
      ...(r.date ? { datePublished: r.date } : {}),
      ...(r.publisher ? { publisher: { "@type": "Organization", name: r.publisher } } : {}),
    })),
  };
}

/**
 * A tour package. Always a TouristTrip; additionally typed as a Product when it
 * carries a real Offer, which is what makes it eligible for Google's product
 * snippet and merchant-listing results (both need a price, and a Product with
 * no offer, rating or review is an error, so the Product type is only added
 * when one exists).
 *
 * Every field beyond name/description/path is optional, so existing callers
 * keep working and richer callers (home, package pages) add what they have.
 */
export function touristTripSchema(opts: {
  name: string;
  description: string;
  path: string;
  price?: number;
  /** Several priced options (e.g. comfort tiers) instead of a single price. */
  tiers?: { name: string; price: number; description?: string }[];
  /** Absolute or site-relative image URLs; the first is the primary image. */
  images?: string[];
  /**
   * The route: ordered stop names (typed as TouristAttraction), or day entries
   * ({ name, description }) which are listed as plain items — a day is not a
   * place, so it is not typed as one.
   */
  itinerary?: (string | { name: string; description?: string })[];
  /** ISO 8601 duration, e.g. "P3D". */
  duration?: string;
  touristType?: string | string[];
  sku?: string;
  /** Anchor id; defaults to `${url}#trip`. */
  id?: string;
  reviews?: RealReview[];
}) {
  const url = abs(opts.path);
  const offerList = (
    opts.tiers?.length
      ? opts.tiers.map((t) => offerSchema(t.price, "INR", { name: t.name, description: t.description, path: opts.path }))
      : [offerSchema(opts.price, "INR", { path: opts.path })]
  ).filter(Boolean) as Record<string, unknown>[];
  const ratings = reviewProps(opts.reviews);
  const sellable = offerList.length > 0 || "aggregateRating" in ratings;
  const images = (opts.images ?? []).filter(Boolean).map(abs);
  if (sellable && !images.length) images.push(BRAND.ogImage);

  return {
    "@context": "https://schema.org",
    "@type": sellable ? ["Product", "TouristTrip"] : "TouristTrip",
    "@id": opts.id ? abs(opts.id) : `${url}#trip`,
    name: opts.name,
    description: clamp(opts.description, 5000),
    url,
    ...(images.length ? { image: images } : {}),
    ...(opts.duration ? { duration: opts.duration } : {}),
    ...(opts.touristType ? { touristType: opts.touristType } : {}),
    ...(opts.itinerary?.length
      ? {
          itinerary: {
            "@type": "ItemList",
            numberOfItems: opts.itinerary.length,
            itemListElement: opts.itinerary.map((stop, i) =>
              typeof stop === "string"
                ? { "@type": "ListItem", position: i + 1, item: { "@type": "TouristAttraction", name: stop } }
                : {
                    "@type": "ListItem",
                    position: i + 1,
                    name: stop.name,
                    ...(stop.description ? { description: clamp(stop.description, 500) } : {}),
                  }
            ),
          },
        }
      : {}),
    provider: { "@id": `${SITE_URL}/#organization` },
    ...(sellable
      ? {
          brand: { "@type": "Brand", name: OPERATOR.parent },
          ...(opts.sku ? { sku: opts.sku } : {}),
          category: "Tour packages",
        }
      : {}),
    ...(offerList.length ? { offers: offerList.length === 1 ? offerList[0] : offerList } : {}),
    ...ratings,
  };
}

/**
 * ItemList of links — the summary-page carousel pattern. Use on any page whose
 * main content is a list of cards pointing at their own detail pages (package
 * pillars, hotel hub, guides, festivals…). Returns null for an empty list.
 */
export function itemListSchema(opts: {
  name: string;
  path: string;
  items: { name: string; path: string; image?: string }[];
  /** Distinguishes several lists on one page, e.g. "packages". */
  key?: string;
}) {
  const seen = new Set<string>();
  const items = opts.items.filter((i) => {
    if (!i?.path || !i.name) return false;
    const u = abs(i.path);
    if (seen.has(u)) return false;
    seen.add(u);
    return true;
  });
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${abs(opts.path)}#${opts.key ?? "itemlist"}`,
    name: opts.name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: abs(i.path),
      name: i.name,
      ...(i.image ? { image: abs(i.image) } : {}),
    })),
  };
}

/**
 * VideoObject — gated: Google requires name, thumbnailUrl and uploadDate, so
 * the node is omitted unless all three are real. Pass a YouTube id to derive
 * the embed and thumbnail URLs.
 */
export function videoObjectSchema(opts: {
  name: string;
  description: string;
  uploadDate?: string;
  youtubeId?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
  contentUrl?: string;
  /** ISO 8601, e.g. "PT2M30S". */
  duration?: string;
  transcript?: string;
  path?: string;
}) {
  const thumb =
    opts.thumbnailUrl ?? (opts.youtubeId ? `https://i.ytimg.com/vi/${opts.youtubeId}/hqdefault.jpg` : undefined);
  const embed = opts.embedUrl ?? (opts.youtubeId ? `https://www.youtube.com/embed/${opts.youtubeId}` : undefined);
  if (!opts.name || !thumb || !opts.uploadDate || !(embed || opts.contentUrl)) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    ...(opts.path ? { "@id": `${abs(opts.path)}#video` } : {}),
    name: opts.name,
    description: opts.description || opts.name,
    thumbnailUrl: [thumb],
    uploadDate: opts.uploadDate,
    ...(embed ? { embedUrl: embed } : {}),
    ...(opts.contentUrl ? { contentUrl: opts.contentUrl } : {}),
    ...(opts.duration ? { duration: opts.duration } : {}),
    ...(opts.transcript ? { transcript: opts.transcript } : {}),
    publisher: { "@id": `${SITE_URL}/#organization` },
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
