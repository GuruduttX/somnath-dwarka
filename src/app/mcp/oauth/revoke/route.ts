import { authenticateClient, revokeToken } from "@/src/lib/mcp/oauth";
import { basicCredentials, json, oauthErrorResponse, preflight, readParams } from "@/src/lib/mcp/http";

/* Token revocation (RFC 7009): an unknown token still answers 200. */

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const p = await readParams(req);
    const basic = basicCredentials(req);
    const client = await authenticateClient(p.client_id || basic.id, p.client_secret || basic.secret);
    await revokeToken(client, p.token);
    return json({});
  } catch (err) {
    return oauthErrorResponse(err);
  }
}

export const OPTIONS = preflight;
