import Link from "next/link";
import { customPagePath, customPagesCollection } from "@/src/lib/customPages";
import { PAGE_DEFS } from "@/src/lib/pages/registry";
import { pagesCollection } from "@/src/lib/pages/db";
import { canHide } from "@/src/lib/pages/visibility";

/*
  Read-only overview of what the Claude connector edits beyond the regular
  admin screens: custom pages (with draft previews) and the code-built pages
  whose copy is editable. Changes are made through Claude (the /mcp/
  connector); this screen is for checking them.
*/

export const dynamic = "force-dynamic";

export default async function CustomPagesAdmin() {
  let pages: { id: string; title: string; slug: string; status: string; updatedAt?: string }[] = [];
  let stored = new Map<string, { status?: string; updatedAt?: string; content?: Record<string, unknown> }>();
  let error = "";
  try {
    pages = await (await customPagesCollection())
      .find({}, { projection: { _id: 0, id: 1, title: 1, slug: 1, status: 1, updatedAt: 1 } })
      .sort({ updatedAt: -1 })
      .toArray();
    const docs = await (await pagesCollection()).find({}, { projection: { _id: 0, id: 1, status: 1, updatedAt: 1, content: 1 } }).toArray();
    stored = new Map(docs.map((d) => [d.id, d]));
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load pages.";
  }

  return (
    <div className="p-6 text-blue-100">
      <h1 className="text-2xl font-bold mb-1">Pages (Claude CMS)</h1>
      <p className="text-blue-300/70 mb-6 text-sm">
        Custom pages and static-page copy are created and edited through the Claude connector at <code>/mcp/</code>. Drafts open in a
        preview only you can see.
      </p>
      {error && <p className="mb-4 text-red-400 text-sm">{error}</p>}

      <h2 className="text-lg font-semibold mb-3">Custom pages</h2>
      {pages.length === 0 ? (
        <p className="text-sm text-blue-300/60 mb-8">No custom pages yet. Ask Claude to create one.</p>
      ) : (
        <div className="mb-10 overflow-x-auto rounded-xl border border-blue-900/40">
          <table className="w-full text-sm">
            <thead className="bg-blue-950/40 text-left">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Updated</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.id} className="border-t border-blue-900/40">
                  <td className="px-4 py-2 font-medium">{p.title}</td>
                  <td className="px-4 py-2 text-blue-300/80">{customPagePath(p.slug)}</td>
                  <td className="px-4 py-2">
                    <span className={p.status === "published" ? "text-emerald-400" : "text-amber-300"}>{p.status}</span>
                  </td>
                  <td className="px-4 py-2 text-blue-300/60">{p.updatedAt ? new Date(p.updatedAt).toLocaleString("en-IN") : ""}</td>
                  <td className="px-4 py-2 space-x-3 whitespace-nowrap">
                    <Link className="text-orange-300 hover:underline" href={`/admin-x9AqP7mK2-preview/custom-page/${p.id}/`} target="_blank">
                      Preview
                    </Link>
                    {p.status === "published" && (
                      <Link className="text-blue-300 hover:underline" href={customPagePath(p.slug)} target="_blank">
                        Live
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-3">Editable static pages</h2>
      <div className="overflow-x-auto rounded-xl border border-blue-900/40">
        <table className="w-full text-sm">
          <thead className="bg-blue-950/40 text-left">
            <tr>
              <th className="px-4 py-2">Page</th>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Path</th>
              <th className="px-4 py-2">Edited fields</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {PAGE_DEFS.map((d) => {
              const s = stored.get(d.id);
              const edited = s ? Object.keys(s.content ?? {}) : [];
              return (
                <tr key={d.id} className="border-t border-blue-900/40">
                  <td className="px-4 py-2 font-medium">{d.title}</td>
                  <td className="px-4 py-2 text-blue-300/70">
                    <code>{d.id}</code>
                  </td>
                  <td className="px-4 py-2 text-blue-300/80">{d.path}</td>
                  <td className="px-4 py-2 text-blue-300/70">{edited.length ? edited.join(", ") : "—"}</td>
                  <td className="px-4 py-2">
                    {canHide(d) ? (
                      <span className={s?.status === "hidden" ? "text-red-400" : "text-emerald-400"}>{s?.status === "hidden" ? "hidden" : "live"}</span>
                    ) : (
                      <span className="text-blue-300/50">always on</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
