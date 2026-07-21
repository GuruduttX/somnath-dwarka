/**
 * Booking policy shown on every package detail page.
 *
 * These are contractual terms presented to buyers, so they live here rather than
 * inline in a component: one place to find them, one place to change them.
 *
 * They are NOT editable in the admin CMS — the per-package policy editor was
 * removed deliberately, so the same terms apply to every package. Changing them
 * is a code change, and a considered one: the refund windows and advance
 * percentage below are commitments a customer can hold you to.
 *
 * Note these are more specific than /booking-policy, which says only that
 * "payment terms (advance and balance) are stated in your confirmation". If you
 * revise one, revise the other, or the two pages will contradict each other.
 */
export type Policy = { title: string; description: string };

export const PACKAGE_POLICIES: Policy[] = [
  {
    title: "Refund",
    description:
      "Refunds are processed within 7-10 working days after cancellation approval, subject to bank processing times.",
  },
  {
    title: "Cancel",
    description:
      "Cancellations made 15 days or more prior to departure are eligible for a full refund. Cancellations between 7-14 days will receive a 50% refund.",
  },
  {
    title: "Payment",
    description:
      "Secure your pilgrimage with a 20% advance booking amount. The remaining balance can be settled upon arrival or trip start.",
  },
  {
    title: "Confirmation",
    description:
      "Your booking will be formally confirmed via email/WhatsApp once the advance payment is received and hotel availability is locked.",
  },
];
