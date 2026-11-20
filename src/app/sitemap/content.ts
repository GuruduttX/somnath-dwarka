import type { PageDef } from "@/src/lib/pages/types";

/*
  Copy of the HTML sitemap at /sitemap/ (page id "html-sitemap"). The lists
  themselves are built from the site's routes and published CMS items.
*/

export const HTML_SITEMAP_DEFAULTS = {
  meta: {
    title: "Sitemap — all pages",
    description: "Browse every page on the Somnath Dwarka tour package site: packages, cabs, hotels, destinations, guides and more.",
  },
  h1: "Sitemap",
  groupHeadings: { main: "Main pages", packages: "Tour packages", guides: "Guides" },
  schema: {
    name: "Sitemap — all pages",
    description: "Browse every page on the Somnath Dwarka tour package site.",
  },
};

export const HTML_SITEMAP_PAGE: PageDef<typeof HTML_SITEMAP_DEFAULTS> = {
  id: "html-sitemap",
  title: "HTML sitemap page",
  group: "Small pages",
  path: "/sitemap/",
  notes:
    "The human-readable sitemap at /sitemap/ (not the XML sitemap). meta {title, description}, h1, groupHeadings {main, packages, guides} " +
    "(the three list headings; the links under them are generated), schema {name, description} (CollectionPage JSON-LD). Plain text.",
  defaults: HTML_SITEMAP_DEFAULTS,
};
