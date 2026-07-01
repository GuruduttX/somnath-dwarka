# Implementation Plan — somnathdwarkatourpackage.com

Engineering plan derived from the **Developer Build SOP v1.0**, reconciled against the
**current codebase state** (assessed 2026-07-01). Read alongside the SOP; where this plan
and the SOP disagree on a technical rule, the SOP wins.

Legend: 🔴 blocker · 🟠 Phase 1 · 🟡 Phase 2 · 🟢 Phase 3 · ✅ already exists

---

## 0. Current state summary

| Area | State |
|------|-------|
| Framework | Next.js 16.2.6, React 19, Tailwind v4, Mongoose, Cloudinary, TipTap, Zod |
| Admin CMS | ✅ Working editors for **Package** + **Blog** only (`/admin-x9AqP7mK2`) |
| Data models | ✅ `Package`, `Blog` only — 11 SOP content types missing |
| Public templates | Prototype: Home, About, Services, Blog archive/detail, Tour-package archive/detail (~3 of 16) |
| Content source | 🔴 Hardcoded (`PackageData` const, `dummyBlog`) — not CMS-driven |
| Indexation | 🔴 Global `noindex` in `layout.tsx`; no robots/sitemap/llms.txt |
| SEO head | Only `blog/[slug]` has `generateMetadata` + JSON-LD |
| API layer | 🔴 taxi/hotel/pooja routes import non-existent controllers; wrong `@/` alias paths |
| Client/server | 🔴 99 `use client` files — content-rendering must move to server |

---

## PHASE 0 — Blockers (must clear before any feature work)  🔴

These break the build or de-index the site. Nothing else matters until they're fixed.

### 0.1 Remove the global noindex
- `src/app/layout.tsx:13` sets `robots: { index:false, follow:false }` sitewide.
- **Action:** drive robots from an env flag: `noindex` **only** when `SITE_ENV=staging`
  (SOP §15 — staging noindex via env + `X-Robots-Tag` header). Production must be
  `index,follow` by default; per-page `noindex` comes from the CMS `noindex` field.
- **Accept:** production `view-source` shows `index,follow`; staging shows `noindex`.

### 0.2 Fix broken API imports + missing controllers/models
- `api/users/taxi`, `hotels`, `pooja` import `@/controllers/users/{taxi,hotel,pooja}Controllers`
  which **do not exist**; `tsconfig` maps `@/*`→`./*` (root) so `@/controllers`, `@/lib`
  resolve to non-existent root paths (real code is under `src/`).
- **Action:** (a) standardise imports to `@/src/...`; (b) either build or temporarily
  stub the taxi/hotel/pooja controllers→services→models so `next build` passes.
- **Accept:** `npm run build` completes with zero module-resolution errors.

### 0.3 Make detail pages CMS-driven (kill hardcoded content)
- `tour-packages/[duration]/[slug]/page.tsx:21` renders a hardcoded `PackageData`.
  `blog/[slug]` falls back to `dummyBlog`.
- **Action:** fetch by slug (server component) via the users service layer; add
  `generateStaticParams` (ISR) + `generateMetadata`; `notFound()` on miss.
- **Accept:** editing a package in the CMS changes the live page; view-source shows the
  real itinerary/price/FAQ text in raw HTML.

> ⚠️ `AGENTS.md`: this is a **modified Next.js** — read `node_modules/next/dist/docs/`
> for routing, metadata, and caching APIs **before** implementing 0.1–0.3.

---

## PHASE 1 — MVP authority (ship + index first)  🟠

Order follows SOP §7. Goal: the money silos + core info pillars live, indexable, schema-valid.

### 1.1 Tech / SEO foundation
- [ ] Env-based robots (from 0.1) + `X-Robots-Tag` on staging.
- [ ] `robots.txt` (Next `app/robots.ts`): allow indexable templates; disallow `/cart`,
      `/thank-you`, internal search, non-indexable facet params; link sitemap.
- [ ] `sitemap.xml` (`app/sitemap.ts`, split by type if large): **canonical index,follow
      URLs only**, excludes `noindex`, auto-updates on publish.
- [ ] HTML sitemap page (`/sitemap`) for users + crawlers.
- [ ] `llms.txt` at root: money-page summary + core verified facts
      (Dwarka↔Somnath ≈233 km / ~4.5–5 hr `verify`; 4–5 day circuit; core timings) —
      **and** ensure those facts exist in on-page crawlable text.
- [ ] GA4 + GSC wiring; event scaffolding for CTA/WhatsApp/call/form (SOP §13).
- [ ] Canonical + OG/Twitter + BreadcrumbList helpers (shared head module, SOP §4).

### 1.2 Shared CMS schema upgrade (SOP §2) — do before templates
Add **shared fields to every content type**: `slug, title_tag, meta_description, h1,
answer_first_block (40–60 words), body[], faq[]{question,answer,fact_tag},
breadcrumb_parent, related_links[]{target,anchor,type}, hero_image+alt, schema_overrides,
noindex, canonical_override`.
- [ ] Extend `Package` model + Zod + admin editor with the shared fields above +
      `answer_first_block`, `related_links`, four-tag support.
- [ ] Introduce the **four-tag enforcement** (`verified · faith-legend · local · opinion`)
      and a **verify-stamp** (`last verified: {date}` + source URL) at the field level.

### 1.3 Component library (SOP §6) — build once, reuse
- [ ] answer-first callout · verify-date stamp · four-tag badge · DOM-persistent
      itinerary accordion · DOM-persistent FAQ accordion · price table · timings table ·
      fare-by-vehicle table · distance/mode table · inclusions/exclusions table ·
      breadcrumb · TOC jump-links · trust band · **sticky WhatsApp+Call bar** ·
      short enquiry form · related-links module · map embed (lazy).
- [ ] All: responsive, keyboard-accessible, labelled, contrast-compliant, **no CLS**.

### 1.4 Routing migration (SOP §3)
Move from `/tour-packages/[duration]/[slug]` to the SOP scheme; 301 legacy paths.
- [ ] `/` Home · `/somnath-dwarka-tour-package/` PackagePillar ·
      `/somnath-dwarka-tour-package/{duration|from-city|with-addon|facet}/` Package
- [ ] `/somnath-dwarka-taxi-service/` CabHub · `/{origin}-to-{dest}-taxi/` CabRoute
- [ ] `/somnath/` `/dwarka/` DestinationPillar · `/{destination}/{topic}/` TempleInfo
- [ ] `/plan/{topic}/` JourneyItinerary
- [ ] Trust: `/about`, `/author/harsh-sharma`, `/contact`, `/booking-policy`,
      `/cancellation-refund`, `/terms`, `/privacy`
- [ ] One trailing-slash convention + 301 the other; self-canonical each page;
      `noindex,follow` + canonical-to-parent on non-strategic facet combos.

### 1.5 Templates to build/upgrade in Phase 1 (SOP §5 + DoD)
For each: required blocks in **server HTML**, single H1, breadcrumb + JSON-LD, answer-first,
FAQPage schema, required internal links, title ≤60 / meta ≤155, verify-stamps, four-tag
styling, CWV + WCAG AA, schema validates with zero errors.
- [ ] **Home** — Organization, WebSite(SearchAction), LocalBusiness*, BreadcrumbList
- [ ] **PackagePillar** — variant matrix, price table `verify`, TouristTrip/Product+Offer
- [ ] **Package variants**: `4-days-3-nights`, `3-days-2-nights`, `from-ahmedabad`,
      `from-rajkot`, `from-mumbai`
- [ ] **CabHub** + **CabRoute** `somnath-to-dwarka-taxi` (needs CabRoute model)
- [ ] **DestinationPillar** `/somnath/` + `/dwarka/` (needs model)
- [ ] **TempleInfo** timings/aarti/darshan ×2 (needs model; timings `verify` + stamp + source)
- [ ] **JourneyItinerary** `/plan/`: distance, which-first, how-many-days, 3-day, 4-day
- [ ] **Trust**: about, author (real bio blocker), contact, policies

### 1.6 New models needed in Phase 1
`CabRoute/Vehicle`, `DestinationPillar`, `TempleInfo`, `JourneyItinerary`, `Author/Trust`
— each with shared fields + type-specific fields per SOP §2, plus admin editors.

---

## PHASE 2 — Cluster completion  🟡
- [ ] Remaining `from-city` + `with-{addon}` + traveller/budget/transport package variants
- [ ] All cab routes + airport-transfer + Vehicle/fare pages
- [ ] Hotel hub + `hotels-in-{city}` (Hotel model; no Hotel/Rating schema unless real)
- [ ] Comparison pages (`/compare/{x-vs-y}/`)
- [ ] Festival pages (`/festivals/`) — **live + indexed 6–10 weeks before** Janmashtami /
      Maha Shivratri / peak season; Event schema only with real dates.

## PHASE 3 — Authority breadth  🟢
- [ ] Place spokes `/{destination}/places/{place}/`
- [ ] Guides/blog extensions (Article schema, real author)
- [ ] Tools: itinerary planner, fare calculator (static crawlable shell + JS layer, SOP §15)
- [ ] Hindi/Gujarati hreflang variants (reciprocal + x-default)

---

## Cross-cutting gates (enforce continuously)

- **Structured data (§12):** server-rendered JSON-LD from CMS fields; **hard code gate** —
  AggregateRating/Review/Event/Offer/LocalBusiness/Hotel render **only** with real data.
  Validate every template in Rich Results Test — zero errors before DoD.
- **Internal linking (§8):** breadcrumb auto-gen; per-page minimum (UP-to-pillar +
  INTO-money + ≥2 siblings); anchor-rotation pool per money page; CI orphan /
  click-depth / duplicate-anchor reports.
- **Performance (§9):** LCP <2.5s, INP <200ms, CLS <0.1 (mobile p75). WebP/AVIF + srcset +
  explicit width/height, lazy below fold, critical CSS inlined, `font-display:swap`,
  CDN + cache headers. **Lighthouse CI gate on PRs.** (Current 99 `use client` files are the
  main risk — move content rendering to server components.)
- **Accessibility (§10):** semantic landmarks, alt text, contrast ≥4.5:1, keyboard nav +
  visible focus, labelled forms, ARIA-correct accordions, skip-to-content. axe in CI.
- **Forms/conversion (§13):** enquiry form → `/thank-you` (noindex) + CRM/WhatsApp;
  sticky WhatsApp+Call sitewide; GA4 events tagged by page cluster.

---

## Client dependencies (blockers — collect before dependent pages go live) — SOP §16

| Needed from client | Blocks |
|---|---|
| Somnath & Dwarkadhish timings/aarti/darshan/light-&-sound + official source | TempleInfo, pillars |
| Dwarka↔Somnath distance/time, train reality, airport distances | Journey, cab, from-city |
| Package price bands + inclusions/exclusions | Package pillar + variants |
| Cab per-km/per-day fares by vehicle + NAP | Cab hub/routes/vehicles, GBP |
| Festival dates each year | Festival pages |
| Sudarshan Setu / Shivrajpur Blue-Flag confirmation | Place spokes |
| VVIP darshan + wheelchair/assistance availability | Senior-citizen package |
| Harsh Sharma real bio/experience/photo/sameAs | Author page + E-E-A-T (pre-publish blocker) |
| Real reviews (if any) | Reviews page + rating schema |
| Brand assets (logo, colors, contact, WhatsApp) | Global build |

---

## Pre-launch checklist (SOP §14) — gate before production
- [ ] Every URL resolves; trailing-slash + www/https 301s single-hop
- [ ] View-source confirms critical content in raw HTML on every template
- [ ] Sitemap = canonical indexable only; submitted to GSC/Bing
- [ ] No orphan pages; money pages ≤2 clicks from home (clean report)
- [ ] Anchor-diversity report: no sitewide duplicate exact-match anchor into money pages
- [ ] All schema validates; no AggregateRating/Event/Offer without real data
- [ ] CWV budgets pass mobile; axe clean; broken-link scan clean
- [ ] Every `verify` datum has stamp + source, confirmed by client
- [ ] Author page live with real bio (or held back — no placeholder-as-fact)
- [ ] 404 + custom errors; HTTPS everywhere; security headers
- [ ] **Staging noindex removed at launch** (the classic bug — see 0.1)
- [ ] robots.txt + llms.txt live and correct
