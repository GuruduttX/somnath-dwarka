# CMS Editor Guide

How to add and edit pages **without touching code** (SOP §15). Every entry you
publish becomes a live, SEO-complete page (answer-first block, FAQ schema,
breadcrumb, canonical, internal links, verify stamps — all automatic).

## Where to log in

Admin panel: `/admin-x9AqP7mK2` → log in. You'll see:

- **Blogs** — long-form guides (rendered at `/guides/{slug}/`)
- **Packages** — tour packages (rendered at `/somnath-dwarka-tour-package/{slug}/`)
- **Content** — everything else (cabs, hotels, destinations, temple info,
  journeys, places, festivals, comparisons, tools, authors)
- **Pages (Claude)** — custom pages and editable static pages, with draft previews
- **Media upload** — put photos from your phone/computer on the image host and copy their URL

## Editing through Claude (MCP connector)

Everything above can also be created, edited and published by chatting with
Claude: packages, guides, every Content type, brand-new pages, the copy of the
home / about / contact / policy pages, and images.

**Connect it once (claude.ai → Settings → Connectors → Add custom connector):**

- URL: `https://somnathdwarkatourpackage.com/mcp/` (with the trailing slash)
- Press **Connect** → a sign-in page opens → use the **same username and
  password as this admin panel** → **Allow**.

**What Claude can do**

| Type | What it is |
|------|------------|
| `package` | Tour packages (`/somnath-dwarka-tour-package/{slug}/`) |
| `blog` | Guides (`/guides/{slug}/`) |
| `hub`, `destination`, `temple`, `place`, `festival`, `taxi`, … | Every Content type of the admin |
| `custom_page` | A brand-new page at `/{slug}/` (hero, text, image, cards, package cards, table, CTA, FAQ, enquiry form) |
| `page` | Copy of every code-built page and template: home, about, contact, policies, listing pages (packages, taxi, hotels, festivals, compare, tools, plan, guides, temples, reviews), destination pillars, page templates, `site-chrome` (Navbar, footer, sticky WhatsApp bar) and `site-settings` |
| `site_*` | Lists kept in code, edited item by item: festivals, hotels, comparisons, tools, temple topics, plan guides, destination pillars/heroes/hubs, seed packages, cab routes, vehicles, airports, taxi copy, rate card, testimonials, reviews, … |
| `find_page` | Give it any URL of the site: it lists every type + item that controls that page |
| `upload_image` | Copies a photo from any public URL to the image host (as WebP) |

Tip: ask Claude "change X on https://somnathdwarkatourpackage.com/…": it calls
`find_page` first and edits the right item. With no edits saved, every page
shows exactly its code text.

New items start as **drafts**. Check them under **Pages (Claude)** (custom-page
previews) or the usual admin lists, then ask Claude to publish. A photo attached
in the chat cannot reach the site: upload it at **Media upload** and paste the
URL into the chat.

Home-page prices: edit the `tiers` of the `home` page; the title, hero price
line and FAQ follow automatically (they use the `{{priceFrom}}`,
`{{standardPrice}}`, `{{deluxePrice}}`, `{{premiumPrice}}` tokens).

To switch the connector off without a code change, set `MCP_ENABLED=false` on
the server.

## The golden rules (do not break these)

1. **Slugs are lowercase, hyphenated, no spaces.** `from-surat`, `hotels-in-somnath`.
   A slug with a space or capital letters will not publish a valid URL.
2. **Never present an unconfirmed number as fact.** Prices, timings, distances and
   fares show an "awaiting confirmation" stamp until you mark them verified. Only
   flip `verified` to true once you have the real figure **and** an official source.
3. **Faith / legend vs. fact.** Anything traditional or devotional is tagged
   "Faith / legend", never stated as a verified fact.
4. **No fake reviews or ratings.** Reviews and star ratings only appear when real.
5. **Title ≤ 60 characters, meta description ≤ 155.** The editor warns you.

## Shared fields (every content type has these)

| Field | What it does |
|-------|--------------|
| Slug | The URL segment (lowercase-hyphen). |
| Status | `draft` (hidden) or `published` (live + in sitemap). |
| H1 | The main on-page heading. |
| Title tag | The browser/Google title (≤60). |
| Meta description | The Google snippet (≤155). |
| Answer-first | A 40–60 word direct answer shown at the top (and used by Google/AI). |
| noindex | Tick to keep a page out of Google (e.g. thin utility pages). |

## Type-specific fields (the JSON block)

Under Content → *(type)*, each entry has a **Type-specific fields (JSON)** box.
Fill in the fields listed above the box. Example for a new cab route:

```json
{
  "kind": "route",
  "title": "Rajkot to Somnath Taxi — Fare, Distance & Cab Booking",
  "origin": "Rajkot",
  "destination": "Somnath",
  "fares": [
    { "vehicle": "Sedan", "seats": 4, "per_km": "₹14", "package_rate": "₹4500" }
  ],
  "stops": ["Junagadh"]
}
```

Example for a temple-timings page:

```json
{
  "destination": "somnath",
  "topic": "aarti",
  "timings_table": [
    { "label": "Morning aarti", "open": "07:00", "close": "" }
  ],
  "timings_verified": true,
  "official_source_url": "https://somnath.org/"
}
```

## Seed vs. CMS

The site ships with **seed content** so every page already renders. When you
publish a CMS entry with the same slug, it **overrides** the seed. So you can go
live immediately and replace placeholder pages one by one with verified content.

## Before you publish (quick checklist)

- [ ] Slug is lowercase-hyphen, no spaces.
- [ ] H1, title tag (≤60), meta description (≤155), answer-first (40–60 words) filled.
- [ ] Every price/timing/fare/distance is either verified (with source) or left as a stamp.
- [ ] Faith/legend content is tagged, not stated as fact.
- [ ] Status set to `published`.

## Health check (for the dev/deploy step)

After a deploy, run against the live URL:

```bash
BASE=https://somnathdwarkatourpackage.com npm run health-check
```

It fails the build if there are orphan pages, money pages more than 2 clicks from
home, a dominant duplicate anchor, or a page missing an H1/canonical.
