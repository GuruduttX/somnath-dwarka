import { checkAdmin, clientIp, dropPending, findPending, issueCode } from "@/src/lib/mcp/oauth";
import { htmlResponse, renderLoginPage, renderMessagePage } from "@/src/lib/mcp/pages";

/* The sign-in form of /mcp/oauth/authorize/. Checks the admin panel login, then sends the browser back to Claude with a code. */

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = new URLSearchParams(await req.text());
  const pendingId = form.get("pending_id") ?? "";
  const login = await findPending(pendingId);
  if (!login) return htmlResponse(renderMessagePage("Link expired", "This sign-in page has expired. Go back to Claude and press Connect again."), 400);

  const redirect = new URL(login.redirectUri);
  if (login.state) redirect.searchParams.set("state", login.state);

  if (form.get("action") === "deny") {
    await dropPending(login.hash);
    redirect.searchParams.set("error", "access_denied");
    redirect.searchParams.set("error_description", "The user denied access");
    return Response.redirect(redirect.href, 302);
  }

  const result = checkAdmin(clientIp(req), form.get("username"), form.get("password"));
  if (result !== "ok") {
    const error =
      result === "locked"
        ? "Too many failed attempts. Try again in 15 minutes."
        : result === "unconfigured"
          ? "Admin login is not configured on this site."
          : "Wrong username or password.";
    return htmlResponse(
      renderLoginPage({ pendingId, clientName: login.clientName, redirectHost: redirect.host, error }),
      result === "locked" ? 429 : 401
    );
  }

  redirect.searchParams.set("code", await issueCode(login));
  return Response.redirect(redirect.href, 302);
}
