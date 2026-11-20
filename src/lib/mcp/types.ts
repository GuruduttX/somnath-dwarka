export type Doc = Record<string, unknown>;

/** One line of a list result: enough to pick an item without loading it. */
export interface ItemSummary {
  id: string;
  title: string;
  slug?: string;
  status?: string;
  updatedAt?: string;
  [field: string]: unknown;
}

export interface UpdateResult {
  id: string;
  title: string;
  /** Fields whose saved value equals what was sent. */
  saved: string[];
  /** Fields the website stored differently or ignored, with what it actually holds now. */
  differs: { field: string; savedValue: unknown }[];
}

/**
 * One editable section of a website's CMS (packages, blogs, ...). Each website
 * adapter builds these against that site's own API, so the MCP tools stay the
 * same for every site.
 */
export interface ContentType {
  key: string;
  label: string;
  /** What the section is, its main fields and any quirks, written for Claude. */
  description: string;
  /** A single settings document (e.g. the home page) instead of a list of items. */
  singleton?: boolean;
  list(): Promise<ItemSummary[]>;
  get(id: string): Promise<Doc>;
  create?(data: Doc): Promise<ItemSummary>;
  update?(id: string, changes: Doc): Promise<UpdateResult>;
  remove?(id: string): Promise<ItemSummary>;
}

export interface Site {
  /** Short id used in tool calls, e.g. "vrindavan". */
  id: string;
  name: string;
  baseUrl: string;
  notes?: string;
  contentTypes: ContentType[];
  /**
   * Stores an image on the site's own image host and returns its public URL.
   * The MCP layer has already converted it to WebP. Left out when the site has no upload API.
   */
  uploadImage?(image: { bytes: Uint8Array<ArrayBuffer>; fileName: string }): Promise<string>;
}

export class SiteError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message);
  }
}
