import { oauthUrl, publicOrigin } from "@/src/lib/mcp/oauth";
import { json, preflight } from "@/src/lib/mcp/http";

/* OAuth authorization server metadata (RFC 8414), served at /.well-known/oauth-authorization-server via next.config rewrites. */

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const origin = publicOrigin(req);
  const auth = ["none", "client_secret_post", "client_secret_basic"];
  return json({
    issuer: origin,
    authorization_endpoint: oauthUrl(origin, "authorize"),
    token_endpoint: oauthUrl(origin, "token"),
    registration_endpoint: oauthUrl(origin, "register"),
    revocation_endpoint: oauthUrl(origin, "revoke"),
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: auth,
    revocation_endpoint_auth_methods_supported: auth,
  });
}

export const OPTIONS = preflight;
