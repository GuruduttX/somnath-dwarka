import { mcpEnabled, registerClient } from "@/src/lib/mcp/oauth";
import { json, oauthErrorResponse, preflight } from "@/src/lib/mcp/http";

/* Dynamic client registration (RFC 7591): claude.ai registers itself here when the connector is added. */

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!mcpEnabled()) return json({ error: "temporarily_unavailable", error_description: "The connector is switched off." }, 503);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_client_metadata", error_description: "The body must be JSON." }, 400);
  }
  try {
    return json(await registerClient(body), 201);
  } catch (err) {
    return oauthErrorResponse(err);
  }
}

export const OPTIONS = preflight;
