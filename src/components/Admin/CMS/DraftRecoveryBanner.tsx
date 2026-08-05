"use client";

import { History, RotateCcw, Trash2 } from "lucide-react";

/**
 * Top-of-editor prompt shown when an autosaved draft is waiting.
 *
 * Nothing is restored until "Recover" is clicked; the trash button deletes the
 * stored draft so the fresh form stands.
 */

const relativeTime = (savedAt: number | null) => {
  if (!savedAt) return "an earlier session";
  const seconds = Math.max(0, Math.round((Date.now() - savedAt) / 1000));
  if (seconds < 60) return "less than a minute ago";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

export default function DraftRecoveryBanner({
  savedAt,
  onRecover,
  onDiscard,
  editorType = "draft",
}: {
  savedAt: number | null;
  onRecover: () => void;
  onDiscard: () => void;
  editorType?: string;
}) {
  return (
    <div
      role="status"
      className="sticky top-4 z-30 mb-6 flex flex-col gap-3 rounded-2xl border border-amber-400/30
      bg-amber-400/10 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
          <History size={18} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-100">Unsaved changes found</p>
          <p className="mt-0.5 text-xs text-amber-100/70">
            We autosaved this {editorType.toLowerCase()} {relativeTime(savedAt)}. Recover it, or
            discard it to start from what&apos;s on screen now.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:ml-4">
        <button
          type="button"
          onClick={onRecover}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold
          text-[#0b1220] transition hover:bg-amber-300"
        >
          <RotateCcw size={15} />
          Recover
        </button>

        <button
          type="button"
          onClick={onDiscard}
          title="Discard the autosaved draft"
          aria-label="Discard the autosaved draft"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2.5
          text-white/60 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
