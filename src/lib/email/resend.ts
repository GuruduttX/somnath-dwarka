import { Resend } from "resend";

/**
 * Lazily constructed so a missing RESEND_API_KEY never crashes the build or an
 * unrelated route — enquiry capture must keep working even when mail is down.
 */
let client: Resend | null = null;

export function getResend(): Resend | null {
    const key = process.env.RESEND_API_KEY;
    if (!key) return null;
    if (!client) client = new Resend(key);
    return client;
}

/** Verified sending identity, e.g. `Somnath Dwarka Tours <info@yourdomain.com>`. */
export const MAIL_FROM =
    process.env.RESEND_FROM ?? "Somnath Dwarka Tours <onboarding@resend.dev>";

/** Internal inbox that gets a copy of every lead. Optional. */
export const MAIL_ADMIN = process.env.ENQUIRY_NOTIFY_EMAIL ?? "";
