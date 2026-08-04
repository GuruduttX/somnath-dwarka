import type { MetadataRoute } from "next";
import { SITE_URL, IS_STAGING } from "@/src/config/site";

/**
 * robots.txt (SOP §11). Staging blocks everything; production allows crawl of
 * indexable templates and disallows the admin surface, the API and the
 * post-conversion pages.
 *
 * Two deliberate choices here:
 *
 * 1. Tracking params are listed individually rather than blanket-blocked with
 *    `Disallow: /*?*`. The blanket rule also blocked any future query-driven
 *    page (a filtered hotel list, a paginated guide index) before it could ever
 *    be crawled, and it bought nothing that the self-canonical on every page
 *    does not already handle for UTM-tagged URLs.
 *
 * 2. The AI crawlers are named and allowed explicitly. They are already covered
 *    by `User-agent: *`, but naming them makes the site's answer-engine posture
 *    a decision recorded in the repo rather than an accident of the default,
 *    and it gives one place to revoke a single crawler without touching the
 *    rules search engines read.
 */

/** Params that only ever produce a duplicate of a canonical URL. */
const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "msclkid",
];

/** Answer engines we want reading the site, named so the choice is explicit. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
];

/**
 * Never indexable, for any crawler.
 *
 * /thank-you/ is deliberately NOT here even though it must stay out of the
 * index. It carries `noindex` in its metadata, and a crawler that is blocked
 * from fetching the page can never read that tag — a disallowed URL can still
 * be indexed from inbound links, with no way to suppress it. Blocking the
 * crawl and asking for noindex are mutually exclusive; noindex is the one that
 * actually removes it.
 */
const PRIVATE_PATHS = [
  "/admin-x9AqP7mK2",
  "/x9AqP7mK2-login",
  "/api/",
  "/cart",
];

export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_PATHS, ...TRACKING_PARAMS.map((p) => `/*?*${p}=`)],
      },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
