import type { DatasetDef } from "@/src/lib/datasets/types";
import type { PageDef } from "@/src/lib/pages/types";

/**
 * What one part of the site (destinations, packages, taxi, ...) makes
 * editable through the /mcp/ connector. Each part keeps its own file in
 * src/lib/cms-groups/ and src/lib/cms-groups/index.ts joins them, so the
 * parts never edit the same file.
 */
export interface CmsGroup {
  /** Code datasets (lists of items) — each becomes an MCP content type of its own. */
  datasets: DatasetDef[];
  /** Code-built page copy — each becomes an item of the MCP "page" type. */
  pages: PageDef[];
  /** Tell find_page which content type and item edit a URL of this part. */
  resolvers: PageResolver[];
}

/** One way to edit (part of) a page: the MCP content type, the item id, and what that item controls. */
export interface PageMatch {
  type: string;
  id: string;
  what: string;
}

/**
 * Given a site path ("/festivals/navratri/", always with leading and trailing
 * slash, lowercase), returns the items that control it, or [] when the path
 * is not this part's. May read the database.
 */
export type PageResolver = (path: string) => PageMatch[] | Promise<PageMatch[]>;
