/**
 * GA4 event tracking (SOP §13). Tag CTA/WhatsApp/call/tool/form events by page
 * cluster for blueprint B7 measurement. No-ops when GA isn't loaded.
 */
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export type EventName =
  | "cta_click"
  | "whatsapp_click"
  | "call_click"
  | "form_submit"
  | "tool_use";

export function track(name: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  w.gtag?.("event", name, params);
}
