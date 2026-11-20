import { randomUUID } from "crypto";
import { refreshSite } from "@/src/lib/refreshSite";
import { CONTENT_TYPES } from "@/src/lib/contentRegistry";
import { R2_PUBLIC_URL } from "@/src/lib/imageHost";
import { uploadImageService } from "@/src/services/admin/uploadImageServices";
import { SiteApi } from "./api";
import { modelType } from "./modelType";
import { datasetType } from "./datasetType";
import { GROUP_DATASETS } from "@/src/lib/cms-groups";
import { restType } from "./restType";
import { SiteError, type Doc, type Site } from "./types";

/**
 * somnathdwarkatourpackage.com, served by this same Next.js app. Packages,
 * guides, page copy and custom pages go through the API route handlers the
 * admin panel uses (lib/mcp/api.ts), so the admin panel's rules (zod
 * validation, required fields for publishing) apply to Claude's edits too.
 * The generic content types (hubs, temples, destinations, ...) go through
 * their Mongoose models with the models' own validators (lib/mcp/modelType.ts).
 */

const isObj = (v: unknown): v is Doc => !!v && typeof v === "object" && !Array.isArray(v);

/**
 * Gives every row of the named lists an `id` when it has none: the admin
 * panel keys rows by id and some schemas require one. Paths: "faqs" (a list)
 * or "routes.segments" (a list inside an object).
 */
function withRowIds(paths: string[]) {
  const fill = (list: unknown) => {
    if (!Array.isArray(list)) return list;
    return list.map((row) => (isObj(row) && (typeof row.id !== "string" || !row.id) ? { ...row, id: randomUUID() } : row));
  };
  return (body: Doc): Doc => {
    const out: Doc = { ...body };
    for (const path of paths) {
      const nested = path.match(/^(\w+)\.(\w+)$/);
      if (nested) {
        const [, obj, key] = nested;
        if (isObj(out[obj])) out[obj] = { ...(out[obj] as Doc), [key]: fill((out[obj] as Doc)[key]) };
      } else {
        out[path] = fill(out[path]);
      }
    }
    return out;
  };
}

const status = "status ('draft' | 'published'; required by the site on every save)";
const after = () => refreshSite();

/** Extra notes for some generic content types, on top of the field list read from the schema. */
const TYPE_NOTES: Record<string, string> = {
  hub:
    "Money and vertical hub pages at the root, e.g. /gir-tour-package/. hub_kind decides the template. variants[] lists the hub's spokes " +
    "(hub_spoke items whose `hub` is this slug). Hub, destination and trust slugs share the root URL level with custom pages and win over them.",
  "hub-spoke": "Each spoke lives at /<hub>/<slug>/: set `hub` to the parent hub's slug.",
  destination: "Destination guide pillars at /<slug>/, e.g. /gir/. Their topic pages are temple-info items, their places are place items.",
  "temple-info": "Topic pages at /<destination>/<slug>/: set `destination` to the pillar's slug.",
  place: "Place pages at /<parent_destination>/places/<slug>/.",
  taxi: "kind 'route' is a cab route page, kind 'vehicle' a vehicle page under /somnath-dwarka-taxi-service/.",
};

const VERIFY_NOTE =
  "Fields shaped {value, verified, verified_at, source_url} are fact fields: the value only shows publicly once verified is true, so " +
  "never mark a fact verified unless the user confirmed it from a real source. body is HTML (h2, h3, p, ul, ol, li, strong, em, a, table). " +
  "faq rows are {question, answer, fact_tag ('verified' | 'faith' | 'local' | 'opinion')}; related_links rows are {target (path), anchor, type}. " +
  "update_item sends each field as a whole replacement ($set), so for lists and objects send the complete new value.";

export function somnathSite(origin: string): Site {
  const session = new SiteApi("somnath-dwarka");

  return {
    id: "somnath-dwarka",
    name: `Somnath Dwarka Tour Package (${new URL(origin).host})`,
    baseUrl: origin,
    notes:
      "Every save, create and delete refreshes the site's pages at once; the live site's CDN can keep showing the old version for a few minutes. " +
      "Every public URL ends with a slash (/about/, /guides/<slug>/). " +
      "HTML fields (overview, content, body, itinerary descriptions) take simple HTML: h2, h3, p, ul, ol, li, strong, em, a, table. " +
      "Rows of lists (faqs, highlights, itinerary, ...) carry an `id`; leave existing ids as they are, new rows get one automatically. " +
      `Images live on ${R2_PUBLIC_URL} (WebP). ` +
      `Drafts of custom pages can be previewed at ${origin}/admin-x9AqP7mK2-preview/custom-page/<id>/ after signing in to the admin panel.`,
    // Stored on Cloudflare R2 through the same service the admin uploader uses.
    async uploadImage({ bytes, fileName }) {
      const file = new File([bytes], fileName, { type: "image/webp" });
      const url = await uploadImageService(file, "mcp-uploads");
      if (typeof url !== "string" || !url) throw new SiteError(502, "somnath-dwarka: the upload finished but no image URL came back.");
      return url;
    },
    contentTypes: [
      restType(session, {
        key: "package",
        label: "Tour packages",
        description:
          "Tour package pages at /somnath-dwarka-tour-package/<slug>/ (also listed on the home page and /somnath-dwarka-tour-package/). " +
          "Fields: title (required), slug, category, price (number, INR per person), rating (0-5), reviews (number), duration (e.g. '2 Nights 3 Days'), " +
          "days, nights, destination, durationbreakdown[{id, days, place}], overview (HTML), highlights[{id, description}], " +
          "itinerary[{id, day (number), title, description (HTML), dayDuration, dayActivity, steps[{time, activity}]}], inclusions[{id, description}], " +
          "exclusions[{id, description}], knowBeforeYouGo[{id, description}], faqs[{id, question, answer}], " +
          "priceTiers[{id, tier, perNight, total, hotel}], metaTitle, metaDescription, schemaTitle, schemaDescription, " +
          "heroImage {image (URL), alt} (required on every save, drafts too), childImages[{id, image, alt}], " +
          "testimonials[{id, name, description, rating 1-5}] (never invent these), routes {source, destination, segments[{id, from, to}]}, " +
          "isTransferIncluded, isStayIncluded, isBreakfastIncluded, isSightseeingIncluded (booleans), availableSrc[] (starting cities), " +
          "long-form copy: decision {title, intro, headers[], rows[[cell]], note}, sections[{h2, body[]}], priceMatrix {headers[], rows[[cell]]}, " +
          "whyChoose {title, points[]}, notForYou {title, items[]}, priceNotes[], finalCta. " +
          `${status}. Publishing needs title, slug, price, destination, at least one itinerary day and one highlight. ` +
          "Booking, refund and cancellation terms are site-wide code (src/config/policies.ts), not package fields. " +
          "Open an existing package with get_item before creating one, to follow the same content style.",
        listPath: "/api/admin/tour-packages",
        itemBase: "/api/admin/tour-packages",
        createPath: "/api/admin/tour-packages",
        itemKey: "_id",
        titleField: "title",
        summaryFields: ["category", "price", "duration"],
        // The site validates the whole package on every save, so the whole item is sent back with the changes.
        updateMode: "full",
        createDefaults: { status: "draft" },
        prepare: withRowIds([
          "durationbreakdown", "highlights", "itinerary", "inclusions", "exclusions", "knowBeforeYouGo", "faqs",
          "priceTiers", "testimonials", "childImages", "routes.segments",
        ]),
        afterWrite: after,
      }),
      restType(session, {
        key: "blog",
        label: "Guides (blog posts)",
        description:
          "Travel guides at /guides/<slug>/ (the old /blog/ URLs redirect there). Fields: title, slug (lowercase-hyphenated), category, author, " +
          "content (HTML, the article body), subContent (short summary), image (cover: https URL or /images/... path), alt, " +
          "meta {title, description}, structuredData {title, description}, faqs[{id, question, answer}], " +
          "testimonials[{id, name, location, destination, rating 1-5, review}] (never invent these), " +
          `${status}. Publishing needs title, slug, content of 20+ characters, image and meta.`,
        listPath: "/api/admin/blog",
        itemBase: "/api/admin/blog",
        createPath: "/api/admin/blog",
        itemKey: "_id",
        titleField: "title",
        summaryFields: ["category"],
        updateMode: "full",
        createDefaults: { status: "draft" },
        prepare: withRowIds(["faqs", "testimonials"]),
        afterWrite: after,
      }),
      ...Object.values(CONTENT_TYPES).map((def) => modelType(def, `${TYPE_NOTES[def.key] ?? ""} ${VERIFY_NOTE}`)),
      // Lists kept in code (seed pages, taxi and package copy, ...), editable item by item.
      ...GROUP_DATASETS.map(datasetType),
      restType(session, {
        key: "custom_page",
        label: "Custom pages (new pages)",
        description:
          "Brand-new pages made here, at /<slug>/, all drawn with one shared template in the site's style (cream and saffron hero, sections, FAQ, " +
          "enquiry form, the site's navbar and footer). Use this when the user wants a new landing or info page; code-built pages are the 'page' type, " +
          "and hubs/destinations/guides have their own types. Fields: " +
          "title (required; also the H1 when hero.heading is empty), slug (made from title when empty; words a site section already uses such as " +
          "'somnath', 'guides' or 'temples', slugs ending in '-taxi', and slugs of hub, destination or trust items are refused), status ('draft' | 'published'), " +
          "meta {title, description, ogImage, noindex (boolean)}, hero {eyebrow, heading, subheading, image, imageAlt, primaryButton {label, href}, " +
          "secondaryButton {label, href}}, sections[] (in page order, each with a type): " +
          "{type:'text', heading, paragraphs[]} | {type:'imageText', heading, paragraphs[], image, imageAlt, imageSide 'left'|'right'} | " +
          "{type:'list', heading, intro, items[]} (tick list) | {type:'cards', heading, intro, cards[{title, text, image, href}]} | " +
          "{type:'packages', heading, intro, packageSlugs[]} (live cards of published tour packages, by slug) | " +
          "{type:'image', image, imageAlt, caption} | {type:'table', heading, columns[], rows[[cell, ...]]} | " +
          "{type:'cta', heading, text, button {label, href}}; faqs[{q, a}] (plain text), showEnquiryForm (default true). " +
          "Text is plain: no HTML; use **bold**, [anchor](/path/) and the tokens {{whatsapp}}, {{whatsappUrl}}, {{phone}}, {{phoneUrl}}, {{email}}. " +
          "Links: a site path, #enquiry-section, https://, tel: or mailto:. Images: https URLs (upload_image gives one). " +
          "update_item: top-level fields replace the stored ones (send all sections when changing one); inside meta and hero, sub-fields left out keep " +
          "their value. Changing the slug moves the page and its old URL redirects to the new one. A draft can be previewed after signing in to the " +
          "admin panel at /admin-x9AqP7mK2-preview/custom-page/<id>/; it shows at /<slug>/ once published.",
        listPath: "/api/admin/custom-pages",
        itemBase: "/api/admin/custom-pages",
        createPath: "/api/admin/custom-pages",
        itemKey: "id",
        acceptsIdOrSlug: true,
        titleField: "title",
        summaryFields: ["path"],
        updateMode: "patch",
        createDefaults: { status: "draft" },
      }),
      restType(session, {
        key: "page",
        label: "Static pages and site-wide settings",
        description:
          "Pages built in code (home, about, contact, privacy, terms, booking and cancellation policy) and 'site-settings'. list_items shows each page: " +
          "id, pageTitle, pagePath, and `edited` (fields changed from the code default). Always get_item first: the page's fields are its own sections " +
          "(meta {title, description}, hero, faqs, ...), and every field shown can be changed; pageNotes explains quirks. " +
          "update_item: send whole top-level fields; each replaces the stored value after the site checks it against the page's shape " +
          "(unknown fields and wrong types are refused with a message). Inside an object field, leaving a sub-field out keeps its current value; " +
          "new list items get empty values for fields they leave out. Send a field as null to restore its code default. Text can use " +
          "[anchor](/path/) links and **bold** where the page notes say so, and the tokens {{whatsapp}}, {{whatsappUrl}}, {{phone}}, {{phoneUrl}}, " +
          "{{email}} (values live in 'site-settings'). " +
          "Hiding: pages other than the home page and site-wide settings have pageStatus ('live' | 'hidden') and redirectTo. A hidden page answers 404, " +
          "or permanently redirects to redirectTo (a path like '/about/' or a full https URL), and leaves the sitemap. Setting pageStatus back to " +
          "'live' shows it again with its copy intact. Code-built pages cannot be created or deleted (use custom_page for new pages); the page " +
          "refreshes on the site as soon as it is saved.",
        listPath: "/api/admin/pages",
        itemBase: "/api/admin/pages",
        itemKey: "id",
        acceptsIdOrSlug: true,
        titleField: "pageTitle",
        summaryFields: ["pagePath", "pageGroup", "pageStatus", "edited"],
        updateMode: "patch",
        allowDelete: false,
        nullResets: true,
      }),
    ],
  };
}
