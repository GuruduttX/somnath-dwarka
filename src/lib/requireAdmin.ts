import { cookies } from "next/headers";
import { verifyToken, COOKIE_NAME } from "@/src/lib/auth";

/**
 * Server-side admin guard for the generic content API. Returns true when a
 * valid admin JWT cookie is present. (Existing admin routes rely on the
 * obscured path; the new content routes additionally verify the token.)
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return false;
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}
