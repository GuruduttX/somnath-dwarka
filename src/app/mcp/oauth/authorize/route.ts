import { OAuthError, canonicalResource, getClient, mcpEnabled, publicOrigin, startLogin } from "@/src/lib/mcp/oauth";
import { htmlResponse, renderLoginPage, renderMessagePage } from "@/src/lib/mcp/pages";

/*
  Authorization endpoint: checks the request, then shows the sign-in page. The
  code is issued when that form is posted to /mcp/oauth/login/. Problems with
  the client or its redirect address are shown here (never redirected to an
  unchecked address); other problems go back to the client as OAuth errors.
*/

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!mcpEnabled()) return htmlResponse(renderMessagePage("Connector switched off", "The CMS connector is switched off right now."), 503);
  const q = new URL(req.url).searchParams;
  const origin = publicOrigin(req);

  const client = await getClient(q.get("client_id") ?? "").catch(() => null);
  if (!client) return htmlResponse(renderMessagePage("Unknown app", "This app is not registered. Go back to Claude and add the connector again."), 400);
  const redirectUri = q.get("redirect_uri") ?? (client.redirect_uris.length === 1 ? client.redirect_uris[0] : "");
  if (!client.redirect_uris.includes(redirectUri)) {
    return htmlResponse(renderMessagePage("Invalid request", "The return address does not match this app's registration."), 400);
  }

  const back = (error: string, description: string) => {
    const url = new URL(redirectUri);
    url.searchParams.set("error", error);
    url.searchParams.set("error_description", description);
    if (q.get("state")) url.searchParams.set("state", q.get("state")!);
    return Response.redirect(url.href, 302);
  };

  if (q.get("response_type") !== "code") return back("unsupported_response_type", "Only response_type=code is supported.");
  const challenge = q.get("code_challenge") ?? "";
  if (!challenge || q.get("code_challenge_method") !== "S256") return back("invalid_request", "PKCE with code_challenge_method=S256 is required.");

  let resource: string;
  try {
    resource = canonicalResource(q.get("resource"), origin);
  } catch (err) {
    return back("invalid_target", err instanceof OAuthError ? err.message : "Invalid resource.");
  }

  const clientName = client.client_name?.trim() || "An MCP client";
  const pendingId = await startLogin({
    clientId: client.client_id,
    clientName,
    redirectUri,
    codeChallenge: challenge,
    state: q.get("state") ?? undefined,
    scopes: (q.get("scope") ?? "").split(" ").filter(Boolean),
    resource,
  });
  return htmlResponse(renderLoginPage({ pendingId, clientName, redirectHost: new URL(redirectUri).host }));
}
