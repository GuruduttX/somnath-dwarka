import { publicOrigin, resourceUrl } from "@/src/lib/mcp/oauth";
import { json, preflight } from "@/src/lib/mcp/http";

/* OAuth protected resource metadata (RFC 9728) for /mcp/, served at /.well-known/oauth-protected-resource[/mcp] via next.config rewrites. */

export const dynamic = "force-dynamic";

export function GET(req: Request) {
  const origin = publicOrigin(req);
  return json({
    resource: resourceUrl(origin),
    authorization_servers: [origin],
    bearer_methods_supported: ["header"],
    resource_name: "Somnath Dwarka Tour Package CMS",
  });
}

export const OPTIONS = preflight;
