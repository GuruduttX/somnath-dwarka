import { NextRequest } from "next/server";
import { SiteError } from "./types";

import * as packages from "@/src/app/api/admin/tour-packages/route";
import * as packageItem from "@/src/app/api/admin/tour-packages/[id]/route";
import * as blogs from "@/src/app/api/admin/blog/route";
import * as blogItem from "@/src/app/api/admin/blog/[id]/route";
import * as pages from "@/src/app/api/admin/pages/route";
import * as pageItem from "@/src/app/api/admin/pages/[id]/route";
import * as customPages from "@/src/app/api/admin/custom-pages/route";
import * as customPageItem from "@/src/app/api/admin/custom-pages/[id]/route";

/*
  The MCP tools reach packages, guides (blogs), page copy and custom pages
  through the same API route handlers the admin panel uses, called in this
  process rather than over HTTP: every rule those handlers apply (zod
  validation, slug normalising, cache refresh) applies to Claude's edits too,
  with no network hop and no second login. The /mcp/ endpoint has already
  checked the caller's OAuth token.

  The generic content types (hubs, temples, destinations, ...) and image
  uploads are reached through their services instead (lib/mcp/modelType.ts),
  because their route handlers check the admin cookie of the incoming
  request, which an in-process call does not carry.
*/

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Handler = (req: NextRequest, ctx: { params: Promise<Record<string, string>> }) => Promise<Response>;
type RouteModule = Partial<Record<Method, unknown>>;

const ROUTES: { pattern: RegExp; param?: string; mod: RouteModule }[] = [
  { pattern: /^\/api\/admin\/tour-packages$/, mod: packages },
  { pattern: /^\/api\/admin\/tour-packages\/([^/]+)$/, param: "id", mod: packageItem },
  { pattern: /^\/api\/admin\/blog$/, mod: blogs },
  { pattern: /^\/api\/admin\/blog\/([^/]+)$/, param: "id", mod: blogItem },
  { pattern: /^\/api\/admin\/pages$/, mod: pages },
  { pattern: /^\/api\/admin\/pages\/([^/]+)$/, param: "id", mod: pageItem },
  { pattern: /^\/api\/admin\/custom-pages$/, mod: customPages },
  { pattern: /^\/api\/admin\/custom-pages\/([^/]+)$/, param: "id", mod: customPageItem },
];

async function readJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  if (!text) return {};
  try {
    const parsed = JSON.parse(text);
    return parsed && typeof parsed === "object" ? parsed : { data: parsed };
  } catch {
    return { error: `Non-JSON response (HTTP ${res.status}): ${text.slice(0, 200)}` };
  }
}

/** A zod `flatten()` result ({formErrors, fieldErrors}) as one readable line. */
function flattened(v: unknown): string | null {
  if (!v || typeof v !== "object") return null;
  const { formErrors, fieldErrors } = v as { formErrors?: unknown; fieldErrors?: unknown };
  if (formErrors === undefined && fieldErrors === undefined) return null;
  const parts: string[] = [];
  if (Array.isArray(formErrors)) parts.push(...formErrors.map(String));
  if (fieldErrors && typeof fieldErrors === "object") {
    for (const [field, msgs] of Object.entries(fieldErrors)) parts.push(`${field}: ${Array.isArray(msgs) ? msgs.join(", ") : String(msgs)}`);
  }
  return parts.length ? `Validation failed. ${parts.join("; ")}` : "Validation failed.";
}

function errorText(json: Record<string, unknown>, status: number): string {
  for (const key of ["errors", "error", "message"]) {
    const v = json[key];
    if (typeof v === "string" && v) return v;
    const flat = flattened(v);
    if (flat) return flat;
  }
  return `HTTP ${status}`;
}

export class SiteApi {
  constructor(private readonly siteName: string) {}

  /** Calls one API route handler with a JSON body. */
  async request<T = Record<string, unknown>>(method: string, path: string, body?: unknown): Promise<T> {
    const url = new URL(path, "http://cms.internal");
    const route = ROUTES.find((r) => r.pattern.test(url.pathname));
    const handler = route?.mod[method as Method] as Handler | undefined;
    if (!route || typeof handler !== "function") throw new SiteError(404, `${this.siteName}: no ${method} route for ${url.pathname}.`);

    const match = url.pathname.match(route.pattern);
    const params: Record<string, string> = route.param && match ? { [route.param]: decodeURIComponent(match[1]) } : {};
    const req = new NextRequest(url, {
      method,
      headers: body !== undefined ? { "content-type": "application/json", accept: "application/json" } : { accept: "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    const res = await handler(req, { params: Promise.resolve(params) });
    if (!res) throw new SiteError(500, `${this.siteName}: ${method} ${url.pathname} gave no response.`);
    const json = await readJson(res);
    if (!res.ok || json.success === false) throw new SiteError(res.status, `${this.siteName}: ${errorText(json, res.status)}`);
    return json as T;
  }
}
