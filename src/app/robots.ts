import type { MetadataRoute } from "next";
import { SITE_URL, IS_STAGING } from "@/src/config/site";

/**
 * robots.txt (SOP §11). Staging blocks everything; production allows crawl of
 * indexable templates and disallows cart/thank-you/search/facet params.
 */
export default function robots(): MetadataRoute.Robots {
  if (IS_STAGING) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/thank-you", "/search", "/admin-x9AqP7mK2", "/api/", "/*?*"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
