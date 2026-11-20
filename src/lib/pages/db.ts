import { connectDB } from "@/src/lib/mongodb";

/*
  Stored CMS edits of code-built pages: one document per page, keyed by the
  page id from lib/pages/registry.ts. Only the fields an editor changed are
  stored (under `content`); the page's code holds every default.
*/

export const PAGES_COLLECTION = "site_pages";

export interface StoredPageDoc {
  id: string;
  content?: Record<string, unknown>;
  /** "hidden" when the page was hidden through the CMS. */
  status?: string;
  /** The page's public path, stored while it is hidden (for the sitemap). */
  path?: string;
  redirectTo?: string;
  updatedAt?: string;
}

let indexed: Promise<unknown> | undefined;

export async function pagesCollection() {
  const db = (await connectDB()).connection.db;
  if (!db) throw new Error("The database is not connected.");
  const col = db.collection<StoredPageDoc>(PAGES_COLLECTION);
  indexed ??= col.createIndex({ id: 1 }, { unique: true }).catch((err: unknown) => {
    indexed = undefined;
    throw err;
  });
  await indexed;
  return col;
}
