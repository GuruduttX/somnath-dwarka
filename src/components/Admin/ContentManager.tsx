"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import FieldRenderer from "@/src/components/Admin/FieldRenderer";
import { getSchema, FAQ_FIELD } from "@/src/config/contentSchemas";

/**
 * Generic content manager (SOP §15). Lists entries for one content type and
 * provides a real form editor: friendly inputs for the shared SEO fields plus
 * schema-driven inputs for type-specific fields (no raw JSON). Talks to
 * /api/admin/content/[type].
 */
type Entry = Record<string, unknown> & { _id?: string; slug?: string };

const inputCls =
  "w-full px-4 py-2.5 rounded-lg bg-blue-950/30 text-blue-100 placeholder-blue-400/40 border border-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

const STRIP = ["_id", "__v", "createdAt", "updatedAt"];

export default function ContentManager({
  type,
  label,
  pathHint,
}: {
  type: string;
  label: string;
  pathHint: string;
  /** kept for backwards-compat; schema is looked up by type */
  typeFields?: string[];
}) {
  const schema = getSchema(type);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [form, setForm] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/content/${type}/`);
    const json = await res.json();
    setEntries(json.data ?? []);
    setLoading(false);
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  const startNew = () => setForm({ slug: "", status: "draft", noindex: false, faq: [] });
  const startEdit = (e: Entry) => setForm({ ...e });
  const setField = (k: string, v: unknown) => setForm((f) => (f ? { ...f, [k]: v } : f));

  async function save() {
    if (!form) return;
    if (!form.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(form.slug))) {
      toast.error("Slug must be lowercase, hyphenated, no spaces");
      return;
    }
    const payload: Entry = { ...form };
    STRIP.forEach((k) => delete payload[k]);
    const isEdit = Boolean(form._id);
    const res = await fetch(
      isEdit ? `/api/admin/content/${type}/${form._id}/` : `/api/admin/content/${type}/`,
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const json = await res.json();
    if (!res.ok || !json.success) {
      toast.error(json.message || "Save failed");
      return;
    }
    toast.success(isEdit ? "Updated" : "Created");
    setForm(null);
    load();
  }

  async function remove(id?: string) {
    if (!id || !confirm("Delete this entry?")) return;
    const res = await fetch(`/api/admin/content/${type}/${id}/`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted");
      load();
    } else {
      toast.error("Delete failed");
    }
  }

  return (
    <div className="p-6 text-blue-100">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold">{label}</h1>
        <button onClick={startNew} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm">
          + New
        </button>
      </div>
      <p className="text-blue-300/60 text-xs mb-6">Public path: {pathHint}</p>

      {form ? (
        <div className="mb-8 rounded-xl border border-blue-900/40 bg-blue-950/20 p-5 space-y-5">
          <h2 className="font-semibold">{form._id ? "Edit" : "New"} entry</h2>

          {/* Shared SEO fields */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wide text-blue-300/60">SEO &amp; page basics</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-sm">Slug*
                <input className={inputCls} value={String(form.slug ?? "")} onChange={(e) => setField("slug", e.target.value)} placeholder="e.g. from-surat" />
              </label>
              <label className="text-sm">Status
                <select className={inputCls} value={String(form.status ?? "draft")} onChange={(e) => setField("status", e.target.value)}>
                  <option value="draft">draft</option>
                  <option value="published">published</option>
                </select>
              </label>
              <label className="text-sm">H1
                <input className={inputCls} value={String(form.h1 ?? "")} onChange={(e) => setField("h1", e.target.value)} />
              </label>
              <label className="text-sm">Title tag (≤60)
                <input className={inputCls} maxLength={65} value={String(form.title_tag ?? "")} onChange={(e) => setField("title_tag", e.target.value)} />
              </label>
            </div>
            <label className="text-sm block">Meta description (≤155)
              <input className={inputCls} maxLength={160} value={String(form.meta_description ?? "")} onChange={(e) => setField("meta_description", e.target.value)} />
            </label>
            <label className="text-sm block">Answer-first (40–60 words)
              <textarea className={inputCls} rows={3} value={String(form.answer_first ?? "")} onChange={(e) => setField("answer_first", e.target.value)} />
            </label>
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" checked={Boolean(form.noindex)} onChange={(e) => setField("noindex", e.target.checked)} />
              noindex (hide from search)
            </label>
          </div>

          {/* Type-specific fields */}
          {schema.length ? (
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wide text-blue-300/60">{label} details</h3>
              {schema.map((field) => (
                <div key={field.name}>
                  {field.type !== "checkbox" ? (
                    <label className="block text-sm text-blue-200 mb-1">
                      {field.label}
                      {field.hint ? <span className="text-blue-300/50"> — {field.hint}</span> : null}
                    </label>
                  ) : null}
                  <FieldRenderer field={field} value={form[field.name]} onChange={(v) => setField(field.name, v)} />
                </div>
              ))}
            </div>
          ) : null}

          {/* FAQ (shared) */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wide text-blue-300/60">FAQ (renders FAQPage schema)</h3>
            <FieldRenderer field={FAQ_FIELD} value={form.faq} onChange={(v) => setField("faq", v)} />
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={save} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm">Save</button>
            <button onClick={() => setForm(null)} className="px-4 py-2 rounded-lg bg-blue-950/40 border border-blue-900/50 text-sm">Cancel</button>
          </div>
        </div>
      ) : null}

      {loading ? (
        <p className="text-blue-300/60">Loading…</p>
      ) : (
        <div className="rounded-xl border border-blue-900/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-950/40 text-left">
              <tr>
                <th className="px-4 py-2">Slug</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.length ? entries.map((e) => (
                <tr key={String(e._id)} className="border-t border-blue-900/30">
                  <td className="px-4 py-2">{String(e.slug ?? "—")}</td>
                  <td className="px-4 py-2">{String(e.status ?? "draft")}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => startEdit(e)} className="text-blue-300 hover:text-white">Edit</button>
                    <button onClick={() => remove(String(e._id))} className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              )) : (
                <tr><td className="px-4 py-6 text-blue-300/50 text-center" colSpan={3}>No entries yet. The seeded pages still render — add entries here to override them.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
