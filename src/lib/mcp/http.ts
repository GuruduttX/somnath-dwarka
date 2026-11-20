import { OAuthError } from "./oauth";

/* Small HTTP helpers shared by the /mcp routes. */

/** Browser-based MCP clients call these endpoints cross-origin; claude.ai calls them from its servers. */
export const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type, Mcp-Protocol-Version, Mcp-Session-Id",
  "Access-Control-Expose-Headers": "WWW-Authenticate, Mcp-Session-Id",
};

export const preflight = () => new Response(null, { status: 204, headers: CORS });

export function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...CORS, ...headers },
  });
}

export function oauthErrorResponse(err: unknown) {
  if (err instanceof OAuthError) return json({ error: err.code, error_description: err.message }, err.status);
  console.error("MCP OAuth error:", err);
  return json({ error: "server_error", error_description: "Internal server error" }, 500);
}

/** A form (the OAuth standard) or JSON body as a plain object of strings. */
export async function readParams(req: Request): Promise<Record<string, string>> {
  const type = req.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const body = await req.json();
      return Object.fromEntries(Object.entries(body ?? {}).map(([k, v]) => [k, typeof v === "string" ? v : String(v ?? "")]));
    }
    return Object.fromEntries(new URLSearchParams(await req.text()));
  } catch {
    return {};
  }
}

/** Client credentials from HTTP Basic, when the client sends them that way. */
export function basicCredentials(req: Request): { id?: string; secret?: string } {
  const header = req.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return {};
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const sep = decoded.indexOf(":");
  if (sep <= 0) return {};
  try {
    return { id: decodeURIComponent(decoded.slice(0, sep)), secret: decodeURIComponent(decoded.slice(sep + 1)) };
  } catch {
    return {};
  }
}
