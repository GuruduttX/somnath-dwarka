"use client";

import type { FieldDef } from "@/src/config/contentSchemas";

const inputCls =
  "w-full px-3 py-2 rounded-lg bg-pink-950/30 text-pink-100 placeholder-pink-400/40 border border-pink-900/50 focus:outline-none focus:ring-2 focus:ring-pink-500/40 text-sm";

type Obj = Record<string, unknown>;

/**
 * Renders a form control for one FieldDef, reading/writing into `value`.
 * Handles text/textarea/number/checkbox/select/list/verify/objectList.
 */
export default function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return <input className={inputCls} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.hint} />;

    case "textarea":
      return <textarea className={inputCls} rows={3} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={field.hint} />;

    case "number":
      return (
        <input
          type="number"
          className={inputCls}
          value={value === undefined || value === null ? "" : (value as number)}
          onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
        />
      );

    case "checkbox":
      return (
        <label className="flex items-center gap-2 text-sm text-pink-200">
          <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      );

    case "select":
      return (
        <select className={inputCls} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">— select —</option>
          {field.options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      );

    case "list": {
      const arr = Array.isArray(value) ? (value as string[]) : [];
      const setAt = (i: number, v: string) => onChange(arr.map((x, k) => (k === i ? v : x)));
      return (
        <div className="space-y-2">
          {arr.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input className={inputCls} value={item} onChange={(e) => setAt(i, e.target.value)} />
              <button type="button" onClick={() => onChange(arr.filter((_, k) => k !== i))} className="px-2 rounded-lg bg-red-900/40 text-red-300 text-sm">✕</button>
            </div>
          ))}
          <button type="button" onClick={() => onChange([...arr, ""])} className="text-sm text-pink-300 hover:text-white">+ Add</button>
        </div>
      );
    }

    case "verify": {
      const v = (value as Obj) ?? {};
      const set = (k: string, val: unknown) => onChange({ ...v, [k]: val });
      return (
        <div className="rounded-lg border border-pink-900/40 p-3 space-y-2">
          <input className={inputCls} placeholder="Value (e.g. 233 km)" value={(v.value as string) ?? ""} onChange={(e) => set("value", e.target.value)} />
          <label className="flex items-center gap-2 text-sm text-pink-200">
            <input type="checkbox" checked={Boolean(v.verified)} onChange={(e) => set("verified", e.target.checked)} />
            Verified (shows the “last verified” stamp)
          </label>
          <input className={inputCls} placeholder="Official source URL" value={(v.source_url as string) ?? ""} onChange={(e) => set("source_url", e.target.value)} />
        </div>
      );
    }

    case "objectList": {
      const arr = Array.isArray(value) ? (value as Obj[]) : [];
      const setItem = (i: number, obj: Obj) => onChange(arr.map((x, k) => (k === i ? obj : x)));
      const blank = () => Object.fromEntries(field.fields.map((f) => [f.name, f.type === "objectList" || f.type === "list" ? [] : ""]));
      return (
        <div className="space-y-3">
          {arr.map((row, i) => (
            <div key={i} className="rounded-lg border border-pink-900/40 p-3 space-y-2 bg-pink-950/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-pink-300/60">#{i + 1}</span>
                <button type="button" onClick={() => onChange(arr.filter((_, k) => k !== i))} className="text-red-300 text-xs">Remove</button>
              </div>
              {field.fields.map((sub) => (
                <div key={sub.name}>
                  {sub.type !== "checkbox" ? <label className="block text-xs text-pink-300/70 mb-1">{sub.label}</label> : null}
                  <FieldRenderer field={sub} value={row[sub.name]} onChange={(v) => setItem(i, { ...row, [sub.name]: v })} />
                </div>
              ))}
            </div>
          ))}
          <button type="button" onClick={() => onChange([...arr, blank()])} className="text-sm text-pink-300 hover:text-white">+ Add {field.label.toLowerCase()} row</button>
        </div>
      );
    }

    default:
      return null;
  }
}
