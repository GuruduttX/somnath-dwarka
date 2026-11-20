import { connectDB } from "@/src/lib/mongodb";
import { CONTENT_TYPES } from "@/src/lib/contentRegistry";
import { GROUP_RESOLVERS } from "@/src/lib/cms-groups";
import type { PageMatch } from "@/src/lib/cms-groups/types";
import { customPagesCollection } from "@/src/lib/customPages";
import { PAGE_DEFS } from "@/src/lib/pages/registry";
import TourPackageModel from "@/src/models/packageModel";
import Blog from "@/src/models/blogModel";

/*
  find_page: which content types and items control a URL of the site. Rules
  that hold for the whole site live here; each part of the site adds its own
  through the resolvers in src/lib/cms-groups.
*/

/** "https://site/Guides/X?y=1" → "/guides/x/". */
export function normalizePath(input: string): string {
  let p = input.trim();
  try {
    if (/^https?:\/\//i.test(p)) p = new URL(p).pathname;
  } catch {
    // Not a URL: use it as a path.
  }
  p = p.split(/[?#]/)[0].toLowerCase();
  if (!p.startsWith("/")) p = `/${p}`;
  if (!p.endsWith("/")) p = `${p}/`;
  return p.replace(/\/{2,}/g, "/");
}

const norm = (p: string) => normalizePath(p);

async function builtIn(path: string): Promise<PageMatch[]> {
  const out: PageMatch[] = [];
  const segs = path.split("/").filter(Boolean);

  // Code-built page copy registered as "page" items (home, about, policies, hub copy, ...).
  // A page with copy of its own (e.g. /festivals/festival-calendar/) is not also a
  // page of a route pattern that would match it (/festivals/[festival]).
  const exact = PAGE_DEFS.some((d) => !d.path.includes("[") && d.scope !== "layout" && norm(d.path) === path);
  for (const d of PAGE_DEFS) {
    if (d.path.includes("[")) {
      const re = new RegExp(`^${norm(d.path).replace(/\[[^\]]+\]/g, "[^/]+")}$`);
      if (!exact && re.test(path)) out.push({ type: "page", id: d.id, what: `${d.title}: copy shared by every page of ${d.path}` });
    } else if (norm(d.path) === path && d.scope !== "layout") {
      out.push({ type: "page", id: d.id, what: `${d.title}: the page's copy` });
    }
  }
  // Site-wide blocks show on every page.
  for (const d of PAGE_DEFS) if (d.scope === "layout") out.push({ type: "page", id: d.id, what: `${d.title} (site-wide, on every page)` });

  if (!segs.length) return out;
  await connectDB();
  const last = segs[segs.length - 1];

  if (segs.length === 1) {
    const custom = await (await customPagesCollection()).findOne({ $or: [{ slug: last }, { previousSlugs: last }] }, { projection: { id: 1, title: 1 } });
    if (custom) out.push({ type: "custom_page", id: custom.id, what: `Custom page "${custom.title}"` });
  }
  if (segs[0] === "somnath-dwarka-tour-package" && segs.length === 2) {
    const pkg = await TourPackageModel.findOne({ slug: last }, { title: 1 }).lean<{ _id: unknown; title?: string }>();
    if (pkg) out.push({ type: "package", id: String(pkg._id), what: `Tour package "${pkg.title}" (the CMS item wins over any code copy of this page)` });
  }
  if (segs[0] === "guides" && segs.length === 2) {
    const blog = await Blog.findOne({ slug: last }, { title: 1 }).lean<{ _id: unknown; title?: string }>();
    if (blog) out.push({ type: "blog", id: String(blog._id), what: `Guide "${blog.title}"` });
  }
  // Any generic CMS item whose slug is the last segment (hubs, spokes, destinations, places, temples, ...).
  for (const def of Object.values(CONTENT_TYPES)) {
    const doc = await def.model.findOne({ slug: last }, { title: 1, name: 1, status: 1 }).lean<{ _id: unknown; title?: string; name?: string; status?: string }>();
    if (doc) {
      out.push({
        type: def.key,
        id: String(doc._id),
        what: `${def.label} item "${doc.title ?? doc.name ?? last}" (${doc.status ?? "draft"}; URL pattern ${def.pathHint}) — check the pattern matches this URL`,
      });
    }
  }
  return out;
}

export async function findPage(input: string): Promise<{ path: string; matches: PageMatch[]; note?: string }> {
  const path = normalizePath(input);
  const results = await Promise.all([
    builtIn(path),
    ...GROUP_RESOLVERS.map(async (r) => {
      try {
        return await r(path);
      } catch (err) {
        console.error("find_page resolver failed", err);
        return [];
      }
    }),
  ]);
  const seen = new Set<string>();
  const matches = results.flat().filter((m) => {
    const k = `${m.type}:${m.id}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  const pageSpecific = matches.filter((m) => !m.what.includes("site-wide"));
  return {
    path,
    matches,
    ...(pageSpecific.length
      ? {}
      : {
          note:
            "Nothing page-specific controls this URL through the connector. It may be built from code alone, or not exist. " +
            "For a brand-new page at a free one-segment URL, create a custom_page.",
        }),
  };
}
