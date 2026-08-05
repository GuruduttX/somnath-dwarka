"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Autosave-to-localStorage with an explicit recovery prompt.
 *
 * The editors used to restore a stored draft silently on mount, which meant an
 * editor opening a fresh form could be handed someone else's half-written post
 * with no way to tell. Here the stored draft is never applied on its own: it is
 * surfaced as `pending` so the UI can offer "Recover" or "Discard", and the
 * decision is the editor's.
 *
 * While a draft is pending we deliberately stop autosaving — otherwise the
 * first keystroke (or just the empty initial state) would overwrite the very
 * draft we are offering to restore, and a second refresh would lose it.
 */

type StoredDraft<T> = { savedAt: number; data: T };

export type DraftRecovery = {
  /** A recoverable draft exists and the editor hasn't chosen yet. */
  pending: boolean;
  /** When the pending draft was last autosaved (epoch ms). */
  savedAt: number | null;
  /** Apply the stored draft, then resume autosaving. */
  recover: () => void;
  /** Throw the stored draft away — the trash action. */
  discard: () => void;
  /** Wipe the draft after a successful save/publish so it isn't re-offered. */
  clear: () => void;
};

type Options<T> = {
  /** localStorage key. Edit screens should scope it per document id. */
  storageKey: string;
  /** Current editor state, in the shape you want restored. */
  draft: T;
  /** Gate writes until the editor's own initial load has finished. */
  ready: boolean;
  /** Push a recovered draft back into component state. */
  onRecover: (draft: T) => void;
  /** Is this draft worth storing/offering? Blank forms are not. */
  hasContent: (draft: T) => boolean;
  /** Debounce for writes, ms. */
  delay?: number;
};

export function useDraftRecovery<T>({
  storageKey,
  draft,
  ready,
  onRecover,
  hasContent,
  delay = 800,
}: Options<T>): DraftRecovery {
  const [pending, setPending] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const storedRef = useRef<T | null>(null);
  const lastWrittenRef = useRef<string | null>(null);

  // Callbacks are rebuilt every render by their callers; refs keep them out of
  // the effect deps so autosave isn't restarted on every keystroke.
  const onRecoverRef = useRef(onRecover);
  const hasContentRef = useRef(hasContent);
  onRecoverRef.current = onRecover;
  hasContentRef.current = hasContent;

  /* ---------- read once, but never apply ---------- */
  useEffect(() => {
    // Edit screens only know what counts as a real change once the server copy
    // has loaded, so the check waits for `ready` there too.
    if (!ready || checked) return;

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Drafts written before this hook existed are the bare payload, with
        // no envelope — treat the whole object as the data.
        const isEnvelope =
          parsed && typeof parsed === "object" && "data" in parsed && "savedAt" in parsed;
        const stored = (isEnvelope ? (parsed as StoredDraft<T>).data : parsed) as T;
        const at = isEnvelope ? (parsed as StoredDraft<T>).savedAt : null;

        if (stored && hasContentRef.current(stored)) {
          storedRef.current = stored;
          setSavedAt(at);
          setPending(true);
        } else {
          localStorage.removeItem(storageKey);
        }
      }
    } catch {
      // A corrupt entry is worse than none — drop it and carry on.
      localStorage.removeItem(storageKey);
    }
    setChecked(true);
  }, [storageKey, ready, checked]);

  /* ---------- debounced autosave ---------- */
  useEffect(() => {
    if (!ready || !checked || pending) return;

    const serialised = JSON.stringify(draft);
    if (serialised === lastWrittenRef.current) return;

    const timer = setTimeout(() => {
      try {
        if (!hasContentRef.current(draft)) {
          localStorage.removeItem(storageKey);
          lastWrittenRef.current = null;
          return;
        }
        const envelope: StoredDraft<T> = { savedAt: Date.now(), data: draft };
        localStorage.setItem(storageKey, JSON.stringify(envelope));
        lastWrittenRef.current = serialised;
      } catch {
        // Quota or private-mode failures must never break the editor.
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [draft, ready, checked, pending, storageKey, delay]);

  const recover = useCallback(() => {
    if (storedRef.current) onRecoverRef.current(storedRef.current);
    setPending(false);
  }, []);

  const discard = useCallback(() => {
    storedRef.current = null;
    lastWrittenRef.current = null;
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setSavedAt(null);
    setPending(false);
  }, [storageKey]);

  const clear = useCallback(() => {
    storedRef.current = null;
    lastWrittenRef.current = null;
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setSavedAt(null);
    setPending(false);
  }, [storageKey]);

  return { pending, savedAt, recover, discard, clear };
}
