import type { IEnquiry } from "@/src/types/enquiryTypes";

/**
 * Sembark CRM integration — pushes a captured lead to Sembark as a
 * "Trip Plan Request".
 *
 * Server-only. The API token lives in `SEMBARK_API_TOKEN` and must never reach
 * the client bundle (no `NEXT_PUBLIC_` prefix). Like the mailer, this module
 * NEVER throws: a CRM outage must not lose a lead or fail the form submission —
 * the enquiry is already persisted in Mongo before we get here.
 */

const SEMBARK_API_URL =
    process.env.SEMBARK_API_URL ??
    "https://api.sembark.com/integrations/v1/trip-plan-requests";

/** How long to wait on Sembark before giving up, so a hang never blocks the form. */
const REQUEST_TIMEOUT_MS = 8000;

export type SembarkResult = {
    synced: boolean;
    /** Sembark's id for the created trip-plan request, when it returns one. */
    id?: string;
    error?: string;
};

/** Sembark's documented payload. `name` + `phone_number` are the only required fields. */
type SembarkPayload = {
    name: string;
    phone_number: string;
    email?: string;
    destination?: string;
    comments?: string;
};

/**
 * Flatten the enquiry's free-form extras into the single `comments` field so no
 * captured context is lost on the CRM side.
 */
function buildComments(enquiry: Pick<IEnquiry, "message" | "serviceLabel" | "service" | "details" | "source" | "pageUrl">): string | undefined {
    const lines: string[] = [];

    if (enquiry.message) lines.push(enquiry.message.trim());

    const enquiredFor = enquiry.serviceLabel || enquiry.service;
    if (enquiredFor) lines.push(`Enquiry for: ${enquiredFor}`);

    const d = enquiry.details;
    if (d) {
        const detailMap: Array<[string, string | undefined]> = [
            ["Travelling with", d.travelWith],
            ["Booking timing", d.bookingTiming],
            ["Pickup", d.pickup],
            ["Drop", d.drop],
            ["Travel date", d.travelDate],
            ["Check-in", d.checkin],
            ["Check-out", d.checkout],
            ["Guests", d.guests],
        ];
        for (const [label, value] of detailMap) {
            if (value) lines.push(`${label}: ${value}`);
        }
    }

    if (enquiry.source) lines.push(`Source: ${enquiry.source}`);
    if (enquiry.pageUrl) lines.push(`Page: ${enquiry.pageUrl}`);

    const comments = lines.join("\n").trim();
    return comments || undefined;
}

/**
 * Map our enquiry to Sembark's fields.
 *
 * `phone_number` is sent in full international form (`+91XXXXXXXXXX`) by joining
 * the stored country code with the digits. We have no dedicated destination
 * input, so we best-effort it from the taxi drop/pickup location and otherwise
 * omit it (it's optional). Everything else is dumped into `comments`.
 */
function toSembarkPayload(enquiry: IEnquiry): SembarkPayload {
    const countryCode = (enquiry.countryCode || "+91").trim();
    const phoneNumber = `${countryCode}${enquiry.phone}`;

    const payload: SembarkPayload = {
        name: enquiry.name,
        phone_number: phoneNumber,
    };

    if (enquiry.email) payload.email = enquiry.email;

    const destination = enquiry.details?.drop || enquiry.details?.pickup;
    if (destination) payload.destination = destination;

    const comments = buildComments(enquiry);
    if (comments) payload.comments = comments;

    return payload;
}

/**
 * Send a lead to Sembark. Returns `{ synced: false, error }` on any failure
 * (missing token, network error, timeout, non-2xx) — it never throws.
 */
export async function pushLeadToSembark(enquiry: IEnquiry): Promise<SembarkResult> {
    const token = process.env.SEMBARK_API_TOKEN;
    if (!token) {
        console.warn("[sembark] SEMBARK_API_TOKEN not set — skipping CRM sync");
        return { synced: false, error: "not_configured" };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const res = await fetch(SEMBARK_API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(toSembarkPayload(enquiry)),
            signal: controller.signal,
        });

        if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.error(`[sembark] CRM sync failed: HTTP ${res.status}`, detail.slice(0, 500));
            return { synced: false, error: `http_${res.status}` };
        }

        // Sembark returns the created record; surface its id when present.
        const data = (await res.json().catch(() => null)) as
            | { id?: string | number; data?: { id?: string | number } }
            | null;
        const id = data?.id ?? data?.data?.id;

        return { synced: true, id: id != null ? String(id) : undefined };
    } catch (err) {
        const reason = err instanceof Error && err.name === "AbortError" ? "timeout" : "network_error";
        console.error(`[sembark] CRM sync threw (${reason}):`, err);
        return { synced: false, error: reason };
    } finally {
        clearTimeout(timeout);
    }
}
