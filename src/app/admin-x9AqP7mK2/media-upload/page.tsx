"use client";

import { useState } from "react";

/*
  Media upload: puts photos from this phone or computer on the site's image
  host (Cloudflare R2) and shows each one's URL to paste into a Claude chat or
  any CMS image field. A photo attached in a claude.ai chat never reaches the
  /mcp/ connector's tools, so this is the way in for those. Any common format
  is accepted and saved as WebP (max 2400px). Behind the admin login.
*/

type Result = { name: string; url?: string; error?: string; sizeKb?: number };

export default function MediaUploadPage() {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [copied, setCopied] = useState("");

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    const done: Result[] = [];
    for (const file of Array.from(files).slice(0, 10)) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/media-upload/", { method: "POST", body: fd });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.url) throw new Error(json.error || `Upload failed (HTTP ${res.status})`);
        done.push({ name: file.name, url: json.url, sizeKb: json.sizeKb });
      } catch (err) {
        done.push({ name: file.name, error: err instanceof Error ? err.message : "Upload failed" });
      }
      setResults([...done]);
    }
    setBusy(false);
  }

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
    } catch {
      setCopied("");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-white">
      <h1 className="text-2xl font-bold">Media upload</h1>
      <p className="mt-2 text-white/70">
        Pick photos from this device. Each is saved as WebP (max 2400px) on the site&apos;s image host. Copy its link and paste it in
        your Claude chat, e.g. &quot;use this as the hero image of the 2 nights 3 days Somnath Dwarka package&quot;.
      </p>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-400/60 bg-orange-500/10 px-6 py-10 text-center hover:bg-orange-500/20">
        <span className="text-base font-semibold text-orange-300">{busy ? "Uploading…" : "Choose images (up to 10)"}</span>
        <span className="mt-1 text-sm text-white/60">JPG, PNG, WebP, AVIF or GIF · up to 25 MB each</span>
        <input type="file" accept="image/*" multiple disabled={busy} className="sr-only" onChange={(e) => upload(e.target.files)} />
      </label>

      <ul className="mt-8 space-y-4">
        {results.map((r, i) => (
          <li key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="break-all text-sm font-semibold">
              {r.name}
              {r.sizeKb ? <span className="font-normal text-white/50"> · {r.sizeKb} KB</span> : null}
            </p>
            {r.url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.url} alt="" className="mt-3 max-h-56 rounded-lg" />
                <div className="mt-3 flex gap-2">
                  <input
                    readOnly
                    value={r.url}
                    className="min-w-0 flex-1 rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm"
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    type="button"
                    onClick={() => copy(r.url!)}
                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    {copied === r.url ? "Copied" : "Copy"}
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-2 text-sm font-semibold text-red-400">{r.error}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
