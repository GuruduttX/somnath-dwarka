/**
 * Guarantee every item in an editor array carries a stable `id`.
 *
 * The admin's PackageEditor lists key on `item.id`. A record written outside the
 * editor — a seed script, an import, a hand-edited document — can arrive without
 * one, which makes React see duplicate empty keys and drop or duplicate rows.
 * Normalise on hydration so the editor never depends on the writer's diligence.
 *
 * Existing ids are preserved: re-running this must not reshuffle React's identity
 * for rows the user is already editing.
 */
export type WithId = { id?: string };

const newId = (): string =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;

export function withIds<T extends WithId>(items: unknown): T[] {
  if (!Array.isArray(items)) return [];
  return items.map((item) => {
    const it = (item ?? {}) as T;
    return it.id ? it : { ...it, id: newId() };
  });
}
