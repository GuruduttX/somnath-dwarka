import { BRAND, CONTACT, SITE_URL, waLink } from "@/src/config/site";
import { IEnquiry } from "@/src/types/enquiryTypes";

type EnquiryLike = Pick<
    IEnquiry,
    | "name"
    | "email"
    | "phone"
    | "countryCode"
    | "service"
    | "serviceLabel"
    | "message"
    | "details"
>;

// ─── Palette ──────────────────────────────────────────────────────────────────
// Saffron/amber on warm cream — the same brand tones the site's enquiry modal
// uses, so the mail feels like a continuation of the form the user just filled.
const C = {
    saffron: "#E87722",
    saffronDark: "#C55A0A",
    ink: "#2D1A0E",
    body: "#5A4030",
    muted: "#9A7C63",
    cream: "#FBF7F1",
    card: "#FFFFFF",
    line: "#EFE3D5",
    whatsapp: "#1DAA61",
} as const;

const esc = (s: string) =>
    s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

/** First name only — "Dear Gurudutt" reads warmer than the full legal name. */
const firstName = (full: string) => (full || "").trim().split(/\s+/)[0] || "Traveller";

/** Label/value rows summarising exactly what the traveller submitted. */
function summaryRows(enquiry: EnquiryLike): Array<[string, string]> {
    const d = enquiry.details ?? {};
    const rows: Array<[string, string | undefined]> = [
        ["Service", enquiry.serviceLabel || enquiry.service],
        ["Phone", `${enquiry.countryCode ?? ""}${enquiry.phone}`],
        ["Email", enquiry.email],
        ["Travelling with", d.travelWith],
        ["Looking to book", d.bookingTiming],
        ["Pickup", d.pickup],
        ["Drop", d.drop],
        ["Travel date", d.travelDate],
        ["Check-in", d.checkin],
        ["Check-out", d.checkout],
        ["Guests", d.guests],
        ["Message", enquiry.message],
    ];
    return rows.filter((r): r is [string, string] => Boolean(r[1] && r[1].trim()));
}

function renderSummary(enquiry: EnquiryLike) {
    return summaryRows(enquiry)
        .map(
            ([label, value]) => `
              <tr>
                <td style="padding:9px 0;border-bottom:1px solid ${C.line};font:500 13px/1.5 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.muted};white-space:nowrap;vertical-align:top;width:42%;">${esc(
                    label
                )}</td>
                <td style="padding:9px 0;border-bottom:1px solid ${C.line};font:600 13px/1.5 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.ink};vertical-align:top;">${esc(
                    value
                )}</td>
              </tr>`
        )
        .join("");
}

// ─── Customer confirmation ────────────────────────────────────────────────────

export function enquiryConfirmationSubject(enquiry: EnquiryLike) {
    return `Thank you ${firstName(enquiry.name)} — we've received your enquiry | ${BRAND.shortName}`;
}

export function enquiryConfirmationHtml(enquiry: EnquiryLike) {
    const name = esc(firstName(enquiry.name));
    const summary = renderSummary(enquiry);
    const wa = waLink(
        `Hello, I just submitted an enquiry on ${SITE_URL} for ${enquiry.service}.`
    );

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(enquiryConfirmationSubject(enquiry))}</title>
</head>
<body style="margin:0;padding:0;background:${C.cream};">

  <!-- Preheader: shown in the inbox preview line, hidden in the body -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${name}, your ${esc(enquiry.service)} enquiry is with our pilgrimage desk — we'll reply within 2 hours.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};padding:32px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:20px;overflow:hidden;box-shadow:0 6px 28px rgba(70,40,15,0.08);">

          <!-- Brand band -->
          <tr>
            <td style="background:linear-gradient(135deg,${C.saffron} 0%,${C.saffronDark} 100%);padding:30px 32px;text-align:center;">
              <div style="font:800 21px/1.25 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;letter-spacing:-0.2px;">
                ${esc(BRAND.name)}
              </div>
              <div style="font:500 12px/1.5 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:rgba(255,255,255,0.86);margin-top:5px;letter-spacing:0.3px;">
                ${esc(BRAND.tagline)}
              </div>
            </td>
          </tr>

          <!-- Hero -->
          <tr>
            <td style="padding:38px 32px 8px;text-align:center;">
              <div style="width:60px;height:60px;line-height:60px;margin:0 auto 20px;border-radius:50%;background:#FDF0E2;font-size:27px;color:${C.saffronDark};font-weight:bold;">&#10003;</div>
              <h1 style="margin:0 0 10px;font:800 27px/1.2 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.ink};">
                Thank you, ${name}!
              </h1>
              <p style="margin:0;font:400 15px/1.7 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.body};">
                We&rsquo;ve received your enquiry. A pilgrimage expert from our team will get back to you <strong style="color:${C.ink};">within 2 hours</strong> with a personalised plan and pricing.
              </p>
            </td>
          </tr>

          ${
              summary
                  ? `
          <!-- Submitted details -->
          <tr>
            <td style="padding:26px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.cream};border:1px solid ${C.line};border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px 6px;font:700 11px/1 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.muted};letter-spacing:1px;text-transform:uppercase;">
                    Your enquiry
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 20px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${summary}</table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
                  : ""
          }

          <!-- WhatsApp CTA -->
          <tr>
            <td style="padding:26px 32px 4px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:12px;background:${C.whatsapp};">
                    <a href="${wa}" target="_blank" style="display:inline-block;padding:14px 30px;font:600 15px/1 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#ffffff;text-decoration:none;border-radius:12px;">
                      Chat with us on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 0 0;font:400 13px/1.6 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.muted};">
                In a hurry? Message us and skip the queue.
              </p>
            </td>
          </tr>

          <!-- Need help -->
          <tr>
            <td style="padding:24px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;font:400 14px/1.8 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.body};">
                    <strong style="color:${C.ink};">Need immediate help?</strong><br>
                    Call / WhatsApp: <a href="tel:${CONTACT.phone}" style="color:${C.saffronDark};text-decoration:none;font-weight:600;">${esc(
                        CONTACT.phoneDisplay
                    )}</a><br>
                    Email: <a href="mailto:${CONTACT.email}" style="color:${C.saffronDark};text-decoration:none;font-weight:600;">${esc(
                        CONTACT.email
                    )}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 32px 32px;text-align:center;">
              <div style="height:1px;background:${C.line};margin-bottom:20px;"></div>
              <p style="margin:0 0 6px;font:600 13px/1.6 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.ink};">
                <a href="${SITE_URL}" style="color:${C.ink};text-decoration:none;">${esc(BRAND.name)}</a>
              </p>
              <p style="margin:0;font:400 12px/1.7 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:${C.muted};">
                You&rsquo;re receiving this because you submitted an enquiry on ${esc(
                    SITE_URL.replace(/^https?:\/\//, "")
                )}.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export function enquiryConfirmationText(enquiry: EnquiryLike) {
    const lines = summaryRows(enquiry).map(([l, v]) => `  ${l}: ${v}`);
    return [
        `Thank you, ${firstName(enquiry.name)}!`,
        "",
        `We've received your enquiry. A pilgrimage expert will get back to you within 2 hours with a personalised plan and pricing.`,
        "",
        ...(lines.length ? ["Your enquiry:", ...lines, ""] : []),
        `Need immediate help? Call/WhatsApp ${CONTACT.phoneDisplay} or email ${CONTACT.email}`,
        "",
        BRAND.name,
        SITE_URL,
    ].join("\n");
}

// ─── Internal lead notification ───────────────────────────────────────────────

export function enquiryAdminSubject(enquiry: EnquiryLike) {
    return `New ${enquiry.service} lead — ${enquiry.name} (${enquiry.countryCode ?? ""}${enquiry.phone})`;
}

export function enquiryAdminHtml(enquiry: EnquiryLike, source?: string, pageUrl?: string) {
    const rows = renderSummary(enquiry);
    return `<!doctype html>
<html><body style="margin:0;background:${C.cream};padding:24px;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;">
    <tr><td style="background:${C.ink};padding:20px 24px;color:#fff;font-size:16px;font-weight:700;">New enquiry &mdash; ${esc(
        enquiry.name
    )}</td></tr>
    <tr><td style="padding:8px 24px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${rows}
        ${
            source
                ? `<tr><td style="padding:9px 0;border-bottom:1px solid ${C.line};font-size:13px;color:${C.muted};">Source</td><td style="padding:9px 0;border-bottom:1px solid ${C.line};font-size:13px;font-weight:600;color:${C.ink};">${esc(
                      source
                  )}</td></tr>`
                : ""
        }
        ${
            pageUrl
                ? `<tr><td style="padding:9px 0;font-size:13px;color:${C.muted};">Page</td><td style="padding:9px 0;font-size:13px;font-weight:600;color:${C.ink};">${esc(
                      pageUrl
                  )}</td></tr>`
                : ""
        }
      </table>
    </td></tr>
  </table>
</body></html>`;
}
