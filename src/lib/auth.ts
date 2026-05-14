import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "admin_token";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const TOKEN_EXPIRY = "24h";

export async function signToken(payload: Record<string, unknown>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRY)
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
}

export { COOKIE_NAME };
