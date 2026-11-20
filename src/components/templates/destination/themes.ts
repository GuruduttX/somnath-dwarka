import { DEFAULT_DESTINATION_THEME, type DestinationTheme } from "@/src/config/destinations";
import { getDatasetItem } from "@/src/lib/datasets/store";
import { DESTINATION_HUBS_DATASET } from "@/src/lib/cms-groups/destinations";

/**
 * The live display theme of a destination hub: its site_destination_hubs item
 * (config/destinations.ts plus CMS edits), or the neutral default for a hub
 * that has no item. The server-side replacement for `themeFor`.
 */
export async function getDestinationTheme(slug: string): Promise<DestinationTheme> {
  const item = await getDatasetItem(DESTINATION_HUBS_DATASET, slug);
  if (!item) return DEFAULT_DESTINATION_THEME;
  return {
    name: item.name || DEFAULT_DESTINATION_THEME.name,
    accent: item.accent?.length === 2 ? item.accent : DEFAULT_DESTINATION_THEME.accent,
    ...(item.photo ? { photo: item.photo } : {}),
    ...(item.standfirst ? { standfirst: item.standfirst } : {}),
    ...(item.highlights?.length ? { highlights: item.highlights } : {}),
  };
}
