import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { downloadImage, toWebp } from "./images";
import { findPage } from "./resolve";
import { SiteError, type ContentType, type Doc, type Site } from "./types";

const instructions = (uploadPageUrl: string, adminUrl: string) => `This connector reads and edits the live content of somnathdwarkatourpackage.com (Somnath Dwarka Tour Package).
- Start with list_sites: it lists the content types, their fields and rules.
- To change something on a given page, call find_page with its URL first: it names the content types and items that control that page (its own item, shared copy, site-wide blocks).
- Find items with list_items (use search), and read an item with get_item before changing it.
- update_item: send only the fields that change. Each field you send replaces the stored value whole, so for objects and lists (itinerary, faqs, faq, highlights, sections, heroImage, hero_image, meta, ...) start from get_item and send the complete new value. Check the result: "differs" lists fields the site stored differently or ignored.
- Changing the slug of a package, guide, hub or other content item moves the page to a new URL and the old URL then shows 404. Say so before you change one, and mention links that point to the old URL. (Custom pages are the exception: their old URL redirects.)
- New items are created as drafts unless the user asks to publish. Tell the user they can review drafts in the admin panel (${adminUrl}).
- Delete only when the user clearly asked for it, and name the exact item (title and id) first.
- Code-built pages (home, about, contact, policies) are the 'page' type; brand-new pages are 'custom_page'.
- Images: an image field takes a URL. upload_image copies an image from any public URL onto the site's image host and returns its new URL. A photo attached in the chat cannot be passed to a tool: send the user to ${uploadPageUrl} (admin login) to upload it from their device, and ask them to paste the URL it shows.
- Facts with a verified flag (timings, prices, distances) only show once verified: never mark one verified unless the user confirmed it.
- Never write or invent customer reviews, testimonials or ratings.
- For many items, work through them one by one, report what was done, and stop to ask if the same error repeats.`;

const MAX_LIST = 200;

function text(value: unknown): CallToolResult {
  return { content: [{ type: "text", text: JSON.stringify(value) }] };
}

async function run(fn: () => Promise<unknown>): Promise<CallToolResult> {
  try {
    return text(await fn());
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!(err instanceof SiteError)) console.error("Tool error:", err);
    return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
  }
}

function pick(doc: Doc, fields: string[]): Doc {
  const out: Doc = {};
  for (const f of ["id", "_id", "slug", ...fields]) if (doc[f] !== undefined) out[f] = doc[f];
  return out;
}

/** One server per request: the endpoint runs stateless, so nothing is shared between calls. */
/** `uploadPageUrl`: the site's browser page for photos on the user's own device; `adminUrl`: the admin panel. */
export function buildMcpServer(sites: Site[], uploadPageUrl: string, adminUrl: string): McpServer {
  const server = new McpServer({ name: "somnath-dwarka-cms", version: "1.0.0" }, { instructions: instructions(uploadPageUrl, adminUrl) });

  const siteIds = sites.map((s) => s.id) as [string, ...string[]];
  const siteArg = z.enum(siteIds).describe("Website id, from list_sites");
  const typeArg = z.string().min(1).describe("Content type key from list_sites, e.g. 'package', 'blog' or 'hub'");
  const idArg = z.string().min(1).describe("The item's id or slug, from list_items");

  function resolve(siteId: string, typeKey: string): { site: Site; type: ContentType } {
    const site = sites.find((s) => s.id === siteId);
    if (!site) throw new SiteError(400, `Unknown site "${siteId}". Sites: ${siteIds.join(", ")}`);
    const type = site.contentTypes.find((t) => t.key === typeKey);
    if (!type) {
      throw new SiteError(400, `Site ${site.id} has no content type "${typeKey}". Types: ${site.contentTypes.map((t) => t.key).join(", ")}`);
    }
    return { site, type };
  }

  server.registerTool(
    "list_sites",
    {
      title: "List websites",
      description: "Lists the websites this connector can edit, and for each one its content types with their fields and rules. Call this first.",
      inputSchema: {},
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () =>
      run(async () =>
        sites.map((s) => ({
          id: s.id,
          name: s.name,
          url: s.baseUrl,
          notes: s.notes,
          contentTypes: s.contentTypes.map((t) => ({
            key: t.key,
            label: t.label,
            description: t.description,
            canCreate: Boolean(t.create),
            canDelete: Boolean(t.remove),
            ...(t.singleton ? { singleton: true } : {}),
          })),
          canUploadImages: Boolean(s.uploadImage),
        }))
      )
  );

  server.registerTool(
    "list_items",
    {
      title: "List items",
      description:
        "Lists the items of one content type on one website, drafts included, as short summaries (id, title, slug, status and a few key fields). " +
        "Use search to narrow by title, slug or id.",
      inputSchema: {
        site: siteArg,
        type: typeArg,
        search: z.string().optional().describe("Words that must all appear in the title, slug or id (case-insensitive)"),
        status: z.string().optional().describe("Only items with this status, e.g. 'draft' or 'published'"),
        limit: z.number().int().min(1).max(MAX_LIST).optional().describe(`How many to return (default 50, max ${MAX_LIST})`),
        offset: z.number().int().min(0).optional().describe("Skip this many items first, for paging"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ site, type, search, status, limit, offset }) =>
      run(async () => {
        const { type: ct } = resolve(site, type);
        let items = await ct.list();
        if (search?.trim()) {
          const terms = search.toLowerCase().split(/\s+/).filter(Boolean);
          items = items.filter((i) => {
            const hay = `${i.title} ${i.slug ?? ""} ${i.id}`.toLowerCase();
            return terms.every((t) => hay.includes(t));
          });
        }
        if (status?.trim()) items = items.filter((i) => (i.status ?? "").toLowerCase() === status.trim().toLowerCase());
        const start = offset ?? 0;
        const page = items.slice(start, start + (limit ?? 50));
        return { site, type, total: items.length, offset: start, count: page.length, items: page };
      })
  );

  server.registerTool(
    "get_item",
    {
      title: "Get item",
      description: "Returns one item with all its fields, exactly as the website stores it. Pass `fields` to get only some top-level fields of a large item.",
      inputSchema: {
        site: siteArg,
        type: typeArg,
        id: idArg,
        fields: z.array(z.string()).optional().describe("Only return these top-level fields (id and slug are always included)"),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ site, type, id, fields }) =>
      run(async () => {
        const { type: ct } = resolve(site, type);
        const item = await ct.get(id);
        return { site, type, item: fields?.length ? pick(item, fields) : item };
      })
  );

  server.registerTool(
    "create_item",
    {
      title: "Create item",
      description:
        "Creates a new item (package, guide, hub, temple page, custom page, ...) on the website. `data` holds the fields listed for that type in list_sites. " +
        "Items start as drafts unless `data.status` says otherwise. Returns the new item's id and slug.",
      inputSchema: {
        site: siteArg,
        type: typeArg,
        data: z.record(z.string(), z.unknown()).describe("The new item's fields"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ site, type, data }) =>
      run(async () => {
        const { site: s, type: ct } = resolve(site, type);
        if (!ct.create) throw new SiteError(400, `${ct.label} on ${s.id} cannot be created through this connector.`);
        const created = await ct.create(data);
        return { site, type, created };
      })
  );

  server.registerTool(
    "update_item",
    {
      title: "Update item",
      description:
        "Changes fields of one existing item. Send only the fields to change; each one replaces the stored value whole " +
        "(for objects and lists, send the complete new value). Returns which fields were saved and which the site stored differently.",
      inputSchema: {
        site: siteArg,
        type: typeArg,
        id: idArg,
        changes: z.record(z.string(), z.unknown()).describe("Fields to change, with their new values"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ site, type, id, changes }) =>
      run(async () => {
        const { site: s, type: ct } = resolve(site, type);
        if (!ct.update) throw new SiteError(400, `${ct.label} on ${s.id} cannot be updated through this connector.`);
        return { site, type, ...(await ct.update(id, changes)) };
      })
  );

  server.registerTool(
    "delete_item",
    {
      title: "Delete item",
      description: "Permanently deletes one item from a website. Only use when the user explicitly asked to delete this exact item.",
      inputSchema: { site: siteArg, type: typeArg, id: idArg },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ site, type, id }) =>
      run(async () => {
        const { site: s, type: ct } = resolve(site, type);
        if (!ct.remove) throw new SiteError(400, `${ct.label} on ${s.id} cannot be deleted through this connector.`);
        return { site, type, deleted: await ct.remove(id) };
      })
  );

  server.registerTool(
    "find_page",
    {
      title: "Find what controls a page",
      description:
        "Given a URL or path of the website (e.g. '/festivals/navratri/' or a full https link), lists every content type and item id that controls " +
        "that page: its own item, copy shared by all pages of that kind, and site-wide blocks. Use it before editing a page you know only by URL.",
      inputSchema: { site: siteArg, url: z.string().min(1).describe("The page's URL or path") },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ site, url }) => run(async () => ({ site, ...(await findPage(url)) }))
  );

  server.registerTool(
    "upload_image",
    {
      title: "Upload image",
      description:
        "Copies an image from a public URL onto one website's own image host and returns the new URL, to put in an item's image fields. " +
        "The image is converted to WebP and scaled to at most 2400px on its longest side. " +
        `It cannot take a photo attached in the chat; for a photo on the user's device, send them to ${uploadPageUrl}.`,
      inputSchema: {
        site: siteArg,
        imageUrl: z.string().min(1).describe("Public http(s) address of the image file itself (not of a web page showing it)"),
        name: z.string().optional().describe("Short name for the file, e.g. 'somnath-temple-evening' (default: taken from the URL)"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async ({ site, imageUrl, name }) =>
      run(async () => {
        const s = sites.find((x) => x.id === site);
        if (!s?.uploadImage) throw new SiteError(400, `${site} cannot take image uploads through this connector.`);
        const source = await downloadImage(imageUrl);
        const image = await toWebp(source.bytes, name?.trim() || source.name);
        const url = await s.uploadImage(image);
        return { site, url, width: image.width, height: image.height, sizeKb: Math.round(image.bytes.length / 1024) };
      })
  );

  return server;
}
