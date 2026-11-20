import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const ADMIN_PREFIX = "/admin-x9AqP7mK2";
const PREVIEW_PREFIX = "/admin-x9AqP7mK2-preview";
const LOGIN_PATH = "/x9AqP7mK2-login";
const ADMIN_API_PREFIX = "/api/admin";

const under = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);

/*
  Trailing slashes. The site uses `trailingSlash: true`, but next.config.ts sets
  `skipTrailingSlashRedirect` so the Claude connector can answer at /mcp: MCP
  clients (claude.ai) strip the slash from the connector URL and do not follow
  a redirect. These two rules are Next's own built-in ones
  (next/dist/lib/load-custom-routes.js), applied here instead, so every other
  URL redirects exactly as before:
    - a path whose last segment has no dot gets a slash:    /about  → /about/
    - a file path with a trailing slash loses it:     /robots.txt/  → /robots.txt
  /.well-known/ paths are left alone, as Next does.
*/
const NOT_FILE = /^\/(?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/.]+$/;
const FILE_WITH_SLASH = /^\/(?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+\/$/;
/** Answer without a slash redirect (the MCP endpoint). */
const NO_SLASH_REDIRECT = new Set(["/mcp"]);

function trailingSlashRedirect(request: NextRequest): NextResponse | null {
    const raw = request.nextUrl.pathname;
    let target: string | null = null;
    if (NOT_FILE.test(raw) && !NO_SLASH_REDIRECT.has(raw)) target = `${raw}/`;
    else if (FILE_WITH_SLASH.test(raw) && !request.headers.has("x-nextjs-data")) target = raw.slice(0, -1);
    if (!target) return null;
    // A plain URL, so nothing re-applies trailing-slash formatting to the target.
    const url = new URL(request.url);
    url.pathname = target;
    return NextResponse.redirect(url, 308);
}

export async function proxy(request: NextRequest) {
    const slash = trailingSlashRedirect(request);
    if (slash) return slash;

    // Normalize away the trailing slash (this app uses `trailingSlash: true`).
    const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
    const guarded =
        under(pathname, ADMIN_API_PREFIX) || under(pathname, ADMIN_PREFIX) || under(pathname, PREVIEW_PREFIX) || pathname === LOGIN_PATH;
    if (!guarded) return NextResponse.next();

    const token = request.cookies.get(COOKIE_NAME)?.value;

    let isAuthed = false;
    if (token) {
        try {
            await verifyToken(token);
            isAuthed = true;
        } catch {
            isAuthed = false;
        }
    }

    // Every admin API answers only to a signed-in admin: these routes create,
    // change and delete live content and read drafts. (The /mcp/ connector
    // reaches them in-process, after its own OAuth check, never through here.)
    if (under(pathname, ADMIN_API_PREFIX)) {
        if (!isAuthed) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.next();
    }

    // Protect the admin dashboard and draft previews: redirect unauthenticated users to login.
    if (under(pathname, ADMIN_PREFIX) || under(pathname, PREVIEW_PREFIX)) {
        if (!isAuthed) {
            return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
        }
        return NextResponse.next();
    }

    // If already logged in, keep the admin away from the login page.
    if (pathname === LOGIN_PATH && isAuthed) {
        return NextResponse.redirect(new URL(ADMIN_PREFIX, request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Every path except Next's own assets: the trailing-slash rules apply site-wide.
    matcher: ["/((?!_next/).*)"],
};
