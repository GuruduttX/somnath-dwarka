/**
 * One code-built page (or site-wide block) whose copy can be edited through
 * the CMS API. Registered in `lib/pages/registry.ts`.
 */
export interface PageDef<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Stable id used in the API and by the MCP connector, e.g. "about". */
  id: string;
  /** Name shown in lists. */
  title: string;
  /** Rough grouping for lists: "Tour package pages", "Company pages", "Site-wide", ... */
  group: string;
  /**
   * Public path of the page, e.g. "/about". Site-wide blocks use "/". Copy shared by
   * every page of a dynamic route (a template) uses the route pattern, e.g. "/blog/[slug]".
   */
  path: string;
  /** "layout" refreshes every page after a save (navbar, footer, site settings); default "page". */
  scope?: "page" | "layout";
  /** Other paths whose content shows this page's copy and must refresh with it. */
  alsoRevalidate?: string[];
  /** Notes for whoever edits the page: what the main fields are, any quirks. */
  notes?: string;
  /** The full default copy. Plain JSON only: strings, numbers, booleans, lists and objects. */
  defaults: T;
}
