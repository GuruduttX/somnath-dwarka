import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME } from "@/lib/auth";
import { timingSafeEqual } from "crypto";

function safeCompare(a: string, b: string): boolean {
    try {
        const bufA = Buffer.from(a, "utf8");
        const bufB = Buffer.from(b, "utf8");
        if (bufA.length !== bufB.length) {
            // Still run timingSafeEqual to avoid timing leak on length difference
            timingSafeEqual(bufA, bufA);
            return false;
        }
        return timingSafeEqual(bufA, bufB);
    } catch {
        return false;
    }
}

// Strip surrounding quotes that some dotenv parsers leave in the value
function readEnv(key: string): string {
    const val = process.env[key] ?? "";
    return val.replace(/^(['"])(.*)\1$/, "$2");
}

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ success: false, message: "Username and password are required" }, { status: 400 });
        }

        const adminUsername = readEnv("ADMIN_USERNAME");
        const adminPassword = readEnv("ADMIN_PASSWORD");

        const usernameMatch = safeCompare(username.trim(), adminUsername);
        const passwordMatch = safeCompare(password, adminPassword);

        if (!usernameMatch || !passwordMatch) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        const token = await signToken({ username: adminUsername, role: "admin" });

        const res = NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });

        res.cookies.set(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return res;
    } catch {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
