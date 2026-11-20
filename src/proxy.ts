import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const ADMIN_PREFIX = "/admin-x9AqP7mK2";
const PREVIEW_PREFIX = "/admin-x9AqP7mK2-preview";
const LOGIN_PATH = "/x9AqP7mK2-login";
const ADMIN_API_PREFIX = "/api/admin";

const under = (pathname: string, prefix: string) => pathname === prefix || pathname.startsWith(`${prefix}/`);

export async function proxy(request: NextRequest) {
    // Normalize away the trailing slash (this app uses `trailingSlash: true`).
    const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
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
    matcher: [
        "/admin-x9AqP7mK2",
        "/admin-x9AqP7mK2/:path*",
        "/admin-x9AqP7mK2-preview/:path*",
        "/x9AqP7mK2-login",
        "/api/admin/:path*",
    ],
};
