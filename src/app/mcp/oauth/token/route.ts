import { OAuthError, authenticateClient, exchangeCode, exchangeRefresh, mcpEnabled, publicOrigin } from "@/src/lib/mcp/oauth";
import { basicCredentials, json, oauthErrorResponse, preflight, readParams } from "@/src/lib/mcp/http";

/* Token endpoint: authorization_code (with PKCE) and refresh_token (rotated on every use). */

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!mcpEnabled()) return json({ error: "temporarily_unavailable", error_description: "The connector is switched off." }, 503);
  try {
    const p = await readParams(req);
    const basic = basicCredentials(req);
    const client = await authenticateClient(p.client_id || basic.id, p.client_secret || basic.secret);
    const origin = publicOrigin(req);
    const resource = p.resource || null;
    if (p.grant_type === "authorization_code") return json(await exchangeCode(client, p.code, p.code_verifier, p.redirect_uri || undefined, resource, origin));
    if (p.grant_type === "refresh_token") return json(await exchangeRefresh(client, p.refresh_token, resource, origin));
    throw new OAuthError("unsupported_grant_type", "grant_type must be authorization_code or refresh_token.");
  } catch (err) {
    return oauthErrorResponse(err);
  }
}

export const OPTIONS = preflight;
