/**
 * Experience My India CRM (Atlas) integration — mirrors a captured lead into the
 * CRM's Enquiries screen from the visitor's browser.
 *
 * The key is a publishable one: the CRM only accepts it from this site's origin,
 * so it is safe in client code and has to be sent from the browser. Like the
 * Sembark push, this NEVER throws: by the time it runs the lead is already saved
 * by /api/enquiry, so a CRM outage or blocked script must not fail the form.
 */

export const ATLAS_LEAD = {
    scriptSrc: "https://crm.tourandactivities.com/atlas-lead.js",
    key: "pk_live_10fe339decbcd52ae76da32c9b9d3e67",
    api: "https://api.crm.tourandactivities.com",
    /** Routes the enquiry to the right sales team, whichever form it came from. */
    destination: "Somnath Dwarka",
} as const;

/**
 * How long a form waits on the CRM. AtlasLead.submit has no keepalive, so forms
 * that redirect to /thank-you would cancel the request if they didn't wait.
 */
const MAX_WAIT_MS = 3000;
const POLL_MS = 100;

type AtlasFields = Record<string, unknown>;

declare global {
    interface Window {
        AtlasLead?: { submit: (fields: AtlasFields) => Promise<unknown> };
    }
}

type Value = FormDataEntryValue | null | undefined;

/** The JSON body /api/enquiry takes (see enquirySchema). */
export type EnquiryBody = {
    name?: Value;
    email?: Value;
    countryCode?: Value;
    phone?: Value;
    service?: Value;
    message?: Value;
    details?: {
        travelWith?: Value;
        bookingTiming?: Value;
        pickup?: Value;
        drop?: Value;
        travelDate?: Value;
        checkin?: Value;
        checkout?: Value;
        guests?: Value;
    };
    source?: Value;
    pageUrl?: Value;
};

/** The formats the CRM parses as a date: 2026-12-20, 20/12/2026, 20 Dec 2026. */
const CRM_DATE = /^(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2} [A-Za-z]{3,9} \d{4})$/;

/**
 * Map our enquiry shape onto the CRM's field names. Fields the CRM doesn't know
 * are kept on the enquiry for the salesperson, so nothing captured is lost.
 */
function toAtlasFields(body: EnquiryBody): AtlasFields {
    const d = body.details ?? {};
    const travelDate = String(d.travelDate || d.checkin || "");
    const isDate = CRM_DATE.test(travelDate.trim());

    return {
        name: body.name,
        email: body.email,
        phone: body.phone ? `${body.countryCode ?? ""}${body.phone}` : undefined,
        destination: ATLAS_LEAD.destination,
        message: body.message,
        travel_date: isDate ? travelDate.trim() : undefined,
        // "October 2026", "Not decided yet", free-typed dates.
        preferred_travel_time: isDate ? undefined : travelDate,
        return_date: d.checkout,
        adults: d.guests,
        service: body.service,
        travel_with: d.travelWith,
        booking_timing: d.bookingTiming,
        pickup: d.pickup,
        drop: d.drop,
        form_name: body.source,
        page_url: body.pageUrl,
    };
}

/** Send a lead to the CRM. Never throws; resolves after MAX_WAIT_MS at the latest. */
export async function pushLeadToAtlas(body: EnquiryBody, extra?: AtlasFields): Promise<void> {
    const deadline = Date.now() + MAX_WAIT_MS;

    // The script is lazy-loaded, so a quick visitor can submit before it arrives.
    while (!window.AtlasLead && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, POLL_MS));
    }
    if (!window.AtlasLead) {
        console.warn("CRM: atlas-lead.js not loaded, lead not sent");
        return;
    }

    const sent = window.AtlasLead.submit({ ...toAtlasFields(body), ...extra }).catch((err) => {
        console.warn("CRM:", err instanceof Error ? err.message : err);
    });
    const timedOut = new Promise((resolve) => setTimeout(resolve, Math.max(0, deadline - Date.now())));
    await Promise.race([sent, timedOut]);
}

/**
 * Public lead capture: every enquiry form posts through here. Returns the
 * /api/enquiry response untouched, so callers handle success and errors as usual.
 */
export async function submitEnquiry(body: EnquiryBody): Promise<Response> {
    const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (res.ok) await pushLeadToAtlas(body);
    return res;
}
