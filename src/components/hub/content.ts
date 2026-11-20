/*
  Section headings of the long-form block on the circuit package hubs
  (src/components/hub/HubContent.tsx), editable per hub through the
  site_package_hub_sections dataset (src/lib/cms-groups/destinations.ts). The
  block's content itself (tables, itinerary, prices, notes) is the CMS hub item.
*/

export const HUB_SECTION_LABEL_DEFAULTS = {
  chooser: {
    eyebrow: "Choose your version",
    title: "Every plan is a separate trip",
    byDuration: "By duration",
    durationColumns: ["Plan", "Nights", "3 star, pp", "4 star, pp", "5 star, pp", "Best for"],
    byStartCity: "By start city",
    startCityColumns: ["You start from", "Road reality"],
  },
  constraints: {
    eyebrow: "Read this first",
    title: "The clock that decides this circuit",
    columns: ["Fixed constraint", "The time", "What it forces"],
  },
  itinerary: { eyebrow: "Sample plan", title: "The standard four day circuit, hour by hour" },
  price: {
    eyebrow: "What it costs",
    title: "Price sheet",
    perUnit: "per person, per night",
    hotelsLabel: "Hotels",
    tierNoteTitle: "About the 5 star tier, said plainly",
    vehicleHeading: "Your vehicle comes with the package",
    vehicleColumns: ["Travellers", "Vehicle"],
    exclusionsHeading: "Not included, on any tier",
    fraudTitle: "A warning worth reading",
  },
  whyChoose: { eyebrow: "Why us", title: "Why choose Experience My India" },
  notForYou: { eyebrow: "Honest fit", title: "This circuit is not for you if" },
  practical: { eyebrow: "Good to know", title: "Practical notes for both temples" },
};

export type HubSectionLabels = typeof HUB_SECTION_LABEL_DEFAULTS;

export type HubSectionsItem = HubSectionLabels & { hub: string };

/** The hubs that render HubContent. */
export const HUB_SECTION_ITEMS: HubSectionsItem[] = [
  "somnath-dwarka-tour-package",
  "somnath-dwarka-gir-tour-package",
  "gujarat-tour-packages",
].map((hub) => ({ hub, ...HUB_SECTION_LABEL_DEFAULTS }));
