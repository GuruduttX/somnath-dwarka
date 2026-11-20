import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { buildMcpServer } from "@/src/lib/mcp/server";
import { somnathSite } from "@/src/lib/mcp/content";
import { mcpEnabled, publicOrigin, verifyAccessToken } from "@/src/lib/mcp/oauth";
import { CORS, json, preflight } from "@/src/lib/mcp/http";

/*
  The MCP endpoint claude.ai connects to as a custom connector:
  https://somnathdwarkatourpackage.com/mcp (src/proxy.ts lets it answer
  without the site's trailing slash; /mcp/ works too). Every request needs an OAuth access token
  (lib/mcp/oauth.ts; sign-in uses the admin panel login). Stateless: a fresh
  server per request, answered as plain JSON. Same design as the Vrindavan
  site's connector.
*/

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

function unauthorized(origin: string, description: string) {
  return json({ error: "invalid_token", error_description: description }, 401, {
    "WWW-Authenticate": `Bearer error="invalid_token", error_description="${description}", resource_metadata="${origin}/.well-known/oauth-protected-resource/mcp"`,
  });
}

export async function POST(req: Request) {
  if (!mcpEnabled()) {
    return json({ jsonrpc: "2.0", error: { code: -32000, message: "The CMS connector is switched off (MCP_ENABLED=false)." }, id: null }, 503);
  }
  const origin = publicOrigin(req);

  const token = (req.headers.get("authorization") ?? "").match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? "";
  if (!token) return unauthorized(origin, "Missing access token");
  let stored: Awaited<ReturnType<typeof verifyAccessToken>>;
  try {
    stored = await verifyAccessToken(token, origin);
  } catch (err) {
    console.error("MCP token check failed:", err);
    return json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null }, 500);
  }
  if (!stored) return unauthorized(origin, "Invalid or expired access token");

  const server = buildMcpServer([somnathSite(origin)], `${origin}/admin-x9AqP7mK2/media-upload/`, `${origin}/admin-x9AqP7mK2/`);
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  try {
    await server.connect(transport);
    const res = await transport.handleRequest(req, {
      authInfo: {
        token,
        clientId: stored.clientId,
        scopes: stored.scopes,
        expiresAt: Math.floor(stored.expiresAt.getTime() / 1000),
        resource: new URL(stored.resource),
      },
    });
    // Read the whole answer before closing the per-request server.
    const body = await res.text();
    const headers = new Headers(res.headers);
    for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
    return new Response(body || null, { status: res.status, headers });
  } catch (err) {
    console.error("MCP request failed:", err);
    return json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null }, 500);
  } finally {
    void transport.close();
    void server.close();
  }
}

/*
  No sessions and no server-initiated stream, so GET and DELETE are not
  offered. A caller without a valid token still gets the 401 first, with the
  sign-in pointer, whatever the method: clients discover how to sign in that way.
*/
async function notAllowed(req: Request) {
  const origin = publicOrigin(req);
  const token = (req.headers.get("authorization") ?? "").match(/^Bearer\s+(.+)$/i)?.[1]?.trim() ?? "";
  if (!token) return unauthorized(origin, "Missing access token");
  const stored = await verifyAccessToken(token, origin).catch(() => null);
  if (!stored) return unauthorized(origin, "Invalid or expired access token");
  return json({ jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed. Use POST." }, id: null }, 405, { Allow: "POST" });
}
export const GET = notAllowed;
export const DELETE = notAllowed;
export const OPTIONS = preflight;
