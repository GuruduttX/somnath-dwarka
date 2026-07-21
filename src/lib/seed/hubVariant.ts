/**
 * The render shape a package hub's variant seed carries (SOP §5 #2, #3).
 *
 * Shared by the Gir triangle and Gujarat umbrella seeds so the hub pages and
 * their variant routes can be written against one type. Seeds are the fallback
 * when a CMS hub-spoke doc has no itinerary yet: every price is a PLACEHOLDER
 * (`price_verified: false`) and the UI stamps it as awaiting confirmation.
 */
export type HubVariantSeed = {
  slug: string;
  title: string;
  h1: string;
  facet: "duration" | "from-city" | "addon" | "traveller";
  duration: string;
  price_from: number;
  price_verified: boolean;
  answer_first: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string; stops?: string[] }[];
  inclusions: string[];
  exclusions: string[];
  faq: { question: string; answer: string }[];
  /** Card subtitle. Set where the route spans more than the hub's own name. */
  location?: string;
};
