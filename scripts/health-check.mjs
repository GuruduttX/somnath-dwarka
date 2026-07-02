/**
 * SEO/link health checks (SOP §8, §14). Crawls the running site and reports:
 *  - orphan pages (in sitemap but no inbound internal link)
 *  - click-depth to money pages (must be ≤2 from home)
 *  - duplicate exact-match anchors into money pages
 *  - pages missing critical SSR content (h1, canonical) / broken links
 *
 * Usage: BASE=http://localhost:3000 node scripts/health-check.mjs
 */
const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const MONEY = [
  "/somnath-dwarka-tour-package/",
  "/somnath-dwarka-taxi-service/",
  "/hotels/",
];

async function get(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";
  return { status: res.status, html };
}

/** Strip global chrome (header/footer/breadcrumb) — SOP §8 anchor rotation
 *  applies to CONTEXTUAL in-content links, not structural navigation. */
function contentOnly(html) {
  return html
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/gi, "");
}

function extractLinks(html) {
  const out = new Set();
  const re = /href="(\/[^"#?]*)"/g;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1];
    if (!href.endsWith("/")) href += "/";
    if (/\.(xml|txt|ico|png|jpg|webp|svg)$/.test(m[1])) continue;
    if (href.startsWith("/api/") || href.startsWith("/admin")) continue;
    out.add(href);
  }
  return [...out];
}

async function sitemapUrls() {
  const res = await fetch(BASE + "/sitemap.xml");
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(BASE, "").replace(/^https?:\/\/[^/]+/, "")
  );
}

async function main() {
  const problems = [];
  const urls = await sitemapUrls();
  console.log(`Sitemap URLs: ${urls.length}`);

  const inbound = new Map(); // path -> Set(sourcePaths)
  const anchorsToMoney = new Map(); // money path -> [anchorText]
  const depth = new Map(); // path -> click depth from home

  // BFS from home for click-depth + gather links/anchors
  const queue = [["/", 0]];
  const visited = new Set();
  const pageLinks = new Map();

  while (queue.length) {
    const [path, d] = queue.shift();
    if (visited.has(path)) continue;
    visited.add(path);
    const { status, html } = await get(path);
    if (status !== 200) {
      if (urls.includes(path)) problems.push(`BROKEN: ${path} returned ${status}`);
      continue;
    }
    if (!/<h1[\s>]/i.test(html)) problems.push(`NO H1: ${path}`);
    if (!/rel="canonical"/i.test(html)) problems.push(`NO CANONICAL: ${path}`);

    const links = extractLinks(html);
    pageLinks.set(path, links);
    // Contextual anchors only (chrome stripped) for anchor-diversity.
    const content = contentOnly(html);
    for (const l of links) {
      if (!inbound.has(l)) inbound.set(l, new Set());
      inbound.get(l).add(path);
      if (!depth.has(l)) depth.set(l, d + 1);
      // capture CONTEXTUAL anchor text into money pages (chrome excluded)
      if (MONEY.includes(l)) {
        const re = new RegExp(`href="${l.replace(/\//g, "\\/").replace(/[-]/g, "\\-")}"[^>]*>([^<]{2,80})<`, "g");
        let mm;
        while ((mm = re.exec(content))) {
          if (!anchorsToMoney.has(l)) anchorsToMoney.set(l, []);
          anchorsToMoney.get(l).push(mm[1].trim());
        }
      }
      if (visited.has(l) || l.startsWith("/api")) continue;
      queue.push([l, d + 1]);
    }
  }
  depth.set("/", 0);

  // Orphan check: sitemap URL with no inbound internal link
  for (const u of urls) {
    if (u === "/") continue;
    if (!inbound.has(u) || inbound.get(u).size === 0) problems.push(`ORPHAN: ${u} (no inbound internal links)`);
  }

  // Click-depth to money pages
  for (const m of MONEY) {
    const d = depth.get(m);
    if (d === undefined) problems.push(`UNREACHABLE money page: ${m}`);
    else if (d > 2) problems.push(`DEEP money page: ${m} is ${d} clicks from home (>2)`);
  }

  // Anchor diversity into money pages (SOP §8): fail only when ONE anchor
  // dominates the contextual links (poor rotation), not when many vary.
  for (const [m, anchors] of anchorsToMoney) {
    const counts = {};
    anchors.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
    const distinct = Object.keys(counts).length;
    const total = anchors.length;
    const [topAnchor, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] || ["", 0];
    const share = total ? topCount / total : 0;
    if (total >= 6 && (distinct < 3 || share > 0.5)) {
      problems.push(
        `ANCHOR DOMINANCE into ${m}: "${topAnchor}" is ${Math.round(share * 100)}% of ${total} contextual links (${distinct} distinct)`
      );
    }
  }

  console.log(`Crawled: ${visited.size} pages`);
  if (problems.length) {
    console.log(`\n❌ ${problems.length} issue(s):`);
    problems.forEach((p) => console.log("  - " + p));
    process.exit(1);
  } else {
    console.log("\n✅ Health check passed: no orphans, money pages ≤2 clicks, anchors varied, all pages have h1 + canonical.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
