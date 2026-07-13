import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

const ADMIN_PREFIX = "/admin-x9AqP7mK2";
const LOGIN_PATH = "/x9AqP7mK2-login";

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

    // Protect the admin dashboard: redirect unauthenticated users to login.
    if (pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`)) {
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
    matcher: ["/admin-x9AqP7mK2", "/admin-x9AqP7mK2/:path*", "/x9AqP7mK2-login"],
};
