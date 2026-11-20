import type { DatasetDef } from "@/src/lib/datasets/types";
import type { PageDef } from "@/src/lib/pages/types";
import type { PageResolver } from "./types";
import { GROUP as destinations } from "./destinations";
import { GROUP as catalog } from "./catalog";
import { GROUP as packages } from "./packages";
import { GROUP as taxi } from "./taxi";
import { GROUP as site } from "./site";

/* Every part of the site's CMS coverage (see ./types.ts). */

const GROUPS = [site, destinations, catalog, packages, taxi];

export const GROUP_DATASETS: DatasetDef[] = GROUPS.flatMap((g) => g.datasets);
export const GROUP_PAGES: PageDef[] = GROUPS.flatMap((g) => g.pages);
export const GROUP_RESOLVERS: PageResolver[] = GROUPS.flatMap((g) => g.resolvers);

if (process.env.NODE_ENV !== "production") {
  const ids = new Set<string>();
  for (const d of GROUP_DATASETS) {
    if (ids.has(d.id)) throw new Error(`Duplicate dataset id "${d.id}" in src/lib/cms-groups`);
    if (!/^site_[a-z0-9_]+$/.test(d.id)) throw new Error(`Dataset id "${d.id}" must look like "site_festivals"`);
    ids.add(d.id);
    const keys = new Set<string>();
    for (const item of d.defaults) {
      const k = d.key(item);
      if (keys.has(k)) throw new Error(`Dataset "${d.id}" has two items with key "${k}"`);
      keys.add(k);
    }
  }
}
