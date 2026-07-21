"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

/**
 * Long-form page copy: the decision table, argument sections, price matrix,
 * why-choose, the honest-fit list, price footnotes and the closing CTA.
 *
 * All of this used to live only in scripts/data/*.json and reach the page via a
 * seed script, so it rendered to visitors but could not be edited here. These
 * are the sections that make up most of the body of a spoke or origin page.
 */

export type Decision = {
  title: string;
  intro: string;
  headers: string[];
  rows: string[][];
  note: string;
};
export type ProseSection = { id: string; h2: string; body: string[] };
export type PriceMatrix = { headers: string[]; rows: string[][] };
/**
 * Editor shape for both titled lists. The stored documents differ — whyChoose
 * holds `points`, notForYou holds `items` — so the pages map between the two at
 * the hydrate/submit boundary rather than carrying the inconsistency into the UI.
 */
export type TitledList = { title: string; items: string[] };

export type PageCopyState = {
  decision: Decision;
  sections: ProseSection[];
  priceMatrix: PriceMatrix;
  whyChoose: TitledList;
  notForYou: TitledList;
  priceNotes: string[];
  finalCta: string;
};

export const emptyPageCopy = (): PageCopyState => ({
  decision: { title: "", intro: "", headers: [], rows: [], note: "" },
  sections: [],
  priceMatrix: { headers: [], rows: [] },
  whyChoose: { title: "", items: [] },
  notForYou: { title: "", items: [] },
  priceNotes: [],
  finalCta: "",
});

const inputClass = `
  mt-2 w-full px-4 py-2.5 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const cellClass = `
  w-full px-3 py-2 rounded-lg text-sm
  bg-blue-950/40 text-blue-100
  placeholder-blue-400/30
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/40
  transition
`;

const card = "border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]";
const heading = "text-base font-semibold text-blue-100";
const label = "text-sm text-blue-300/70 font-medium";
const hint = "mt-1 text-xs text-blue-400/50";

const addBtn =
  "flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200 transition cursor-pointer";
const delBtn = "p-2 text-red-400/70 hover:text-red-400 transition cursor-pointer";

/** A titled list — used for both why-choose and the honest-fit block. */
function TitledListEditor({
  title,
  hintText,
  value,
  onChange,
  placeholder,
}: {
  title: string;
  hintText: string;
  value: TitledList;
  onChange: (next: TitledList) => void;
  placeholder: string;
}) {
  const items = value.items ?? [];
  return (
    <div className={card}>
      <h3 className={heading}>{title}</h3>
      <p className={hint}>{hintText}</p>

      <div className="mt-4">
        <label className={label}>Heading</label>
        <input
          type="text"
          className={inputClass}
          value={value.title ?? ""}
          placeholder="Section heading"
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>

      <div className="mt-4 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input
              type="text"
              className={cellClass}
              value={item}
              placeholder={placeholder}
              onChange={(e) =>
                onChange({ ...value, items: items.map((x, j) => (j === i ? e.target.value : x)) })
              }
            />
            <button
              type="button"
              className={delBtn}
              aria-label="Remove"
              onClick={() => onChange({ ...value, items: items.filter((_, j) => j !== i) })}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={`${addBtn} mt-3`}
        onClick={() => onChange({ ...value, items: [...items, ""] })}
      >
        <Plus size={14} /> Add point
      </button>
    </div>
  );
}

/** A header row plus body rows, shared by the decision table and the price matrix. */
function TableEditor({
  headers,
  rows,
  onChange,
}: {
  headers: string[];
  rows: string[][];
  onChange: (headers: string[], rows: string[][]) => void;
}) {
  const cols = Math.max(headers.length, ...rows.map((r) => r.length), 0);

  // Rows must stay rectangular or the rendered table loses cells.
  const fit = (r: string[]) => Array.from({ length: cols }, (_, i) => r[i] ?? "");

  const addColumn = () =>
    onChange([...headers, ""], rows.map((r) => [...fit(r), ""]));

  const removeColumn = (index: number) =>
    onChange(
      headers.filter((_, i) => i !== index),
      rows.map((r) => fit(r).filter((_, i) => i !== index)),
    );

  const addRow = () => onChange(headers, [...rows, Array.from({ length: cols || 1 }, () => "")]);

  return (
    <div className="space-y-3">
      <div>
        <label className={label}>Column headers</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {headers.map((h, i) => (
            <div key={i} className="flex items-center gap-1">
              <input
                type="text"
                className={`${cellClass} min-w-[9rem]`}
                value={h}
                placeholder={`Column ${i + 1}`}
                onChange={(e) => onChange(headers.map((x, j) => (j === i ? e.target.value : x)), rows)}
              />
              <button type="button" className={delBtn} aria-label="Remove column" onClick={() => removeColumn(i)}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button type="button" className={addBtn} onClick={addColumn}>
            <Plus size={14} /> Column
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((row, ri) => (
          <div key={ri} className="flex items-start gap-2">
            <span className="mt-2 text-xs text-blue-400/40 w-6 shrink-0">{ri + 1}</span>
            <div className="flex-1 flex flex-wrap gap-2">
              {fit(row).map((cell, ci) => (
                <textarea
                  key={ci}
                  rows={2}
                  className={`${cellClass} min-w-[9rem] flex-1 resize-y`}
                  value={cell}
                  placeholder={headers[ci] || `Column ${ci + 1}`}
                  onChange={(e) =>
                    onChange(
                      headers,
                      rows.map((r, j) => (j === ri ? fit(r).map((c, k) => (k === ci ? e.target.value : c)) : r)),
                    )
                  }
                />
              ))}
            </div>
            <button
              type="button"
              className={delBtn}
              aria-label="Remove row"
              onClick={() => onChange(headers, rows.filter((_, j) => j !== ri))}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button type="button" className={addBtn} onClick={addRow}>
        <Plus size={14} /> Add row
      </button>
    </div>
  );
}

const PageCopy = ({
  value,
  onChange,
}: {
  value: PageCopyState;
  onChange: React.Dispatch<React.SetStateAction<PageCopyState>>;
}) => {
  const set = <K extends keyof PageCopyState>(key: K, next: PageCopyState[K]) =>
    onChange((prev) => ({ ...prev, [key]: next }));

  const { decision, sections, priceMatrix, priceNotes } = value;

  return (
    <div className="space-y-6">
      {/* ── Decision block ── */}
      <div className={card}>
        <h3 className={heading}>Decision block</h3>
        <p className={hint}>
          The comparison section above the itinerary — e.g. &ldquo;Where the third night goes&rdquo;.
        </p>

        <div className="mt-4">
          <label className={label}>Heading</label>
          <input
            type="text"
            className={inputClass}
            value={decision.title}
            placeholder="Where the third night goes"
            onChange={(e) => set("decision", { ...decision, title: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <label className={label}>Intro</label>
          <textarea
            rows={3}
            className={`${inputClass} resize-y`}
            value={decision.intro}
            placeholder="Paragraph shown above the table"
            onChange={(e) => set("decision", { ...decision, intro: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <TableEditor
            headers={decision.headers}
            rows={decision.rows}
            onChange={(headers, rows) => set("decision", { ...decision, headers, rows })}
          />
        </div>

        <div className="mt-4">
          <label className={label}>Closing note</label>
          <textarea
            rows={3}
            className={`${inputClass} resize-y`}
            value={decision.note}
            placeholder="Paragraph shown below the table"
            onChange={(e) => set("decision", { ...decision, note: e.target.value })}
          />
        </div>
      </div>

      {/* ── Prose sections ── */}
      <div className={card}>
        <h3 className={heading}>Page sections</h3>
        <p className={hint}>
          The long-form argument blocks. Each paragraph is a separate entry; basic HTML is allowed.
        </p>

        <div className="mt-4 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="border border-blue-900/50 rounded-xl p-4 bg-blue-950/30">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className={cellClass}
                  value={section.h2}
                  placeholder="Section heading"
                  onChange={(e) =>
                    set(
                      "sections",
                      sections.map((s) => (s.id === section.id ? { ...s, h2: e.target.value } : s)),
                    )
                  }
                />
                <button
                  type="button"
                  className={delBtn}
                  aria-label="Remove section"
                  onClick={() => set("sections", sections.filter((s) => s.id !== section.id))}
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {section.body.map((para, pi) => (
                  <div key={pi} className="flex gap-2 items-start">
                    <textarea
                      rows={3}
                      className={`${cellClass} resize-y`}
                      value={para}
                      placeholder="Paragraph"
                      onChange={(e) =>
                        set(
                          "sections",
                          sections.map((s) =>
                            s.id === section.id
                              ? { ...s, body: s.body.map((b, j) => (j === pi ? e.target.value : b)) }
                              : s,
                          ),
                        )
                      }
                    />
                    <button
                      type="button"
                      className={delBtn}
                      aria-label="Remove paragraph"
                      onClick={() =>
                        set(
                          "sections",
                          sections.map((s) =>
                            s.id === section.id ? { ...s, body: s.body.filter((_, j) => j !== pi) } : s,
                          ),
                        )
                      }
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={`${addBtn} mt-3`}
                onClick={() =>
                  set(
                    "sections",
                    sections.map((s) => (s.id === section.id ? { ...s, body: [...s.body, ""] } : s)),
                  )
                }
              >
                <Plus size={14} /> Add paragraph
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${addBtn} mt-4`}
          onClick={() =>
            set("sections", [...sections, { id: crypto.randomUUID(), h2: "", body: [""] }])
          }
        >
          <Plus size={14} /> Add section
        </button>
      </div>

      {/* ── Price matrix ── */}
      <div className={card}>
        <h3 className={heading}>Price matrix</h3>
        <p className={hint}>The tier/price table shown with the pricing block.</p>
        <div className="mt-4">
          <TableEditor
            headers={priceMatrix.headers}
            rows={priceMatrix.rows}
            onChange={(headers, rows) => set("priceMatrix", { headers, rows })}
          />
        </div>
      </div>

      <TitledListEditor
        title="Why choose us"
        hintText="Bullet points in the why-choose block."
        value={value.whyChoose}
        onChange={(next) => set("whyChoose", next)}
        placeholder="A reason to book with you"
      />

      <TitledListEditor
        title="Not for you if"
        hintText="The honest-fit list — who this trip does not suit."
        value={value.notForYou}
        onChange={(next) => set("notForYou", next)}
        placeholder="Who this trip is not for"
      />

      {/* ── Price notes ── */}
      <div className={card}>
        <h3 className={heading}>Price notes</h3>
        <p className={hint}>Footnotes shown under the pricing block.</p>

        <div className="mt-4 space-y-2">
          {priceNotes.map((note, i) => (
            <div key={i} className="flex gap-2 items-start">
              <textarea
                rows={2}
                className={`${cellClass} resize-y`}
                value={note}
                placeholder="Note"
                onChange={(e) =>
                  set("priceNotes", priceNotes.map((n, j) => (j === i ? e.target.value : n)))
                }
              />
              <button
                type="button"
                className={delBtn}
                aria-label="Remove note"
                onClick={() => set("priceNotes", priceNotes.filter((_, j) => j !== i))}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button type="button" className={`${addBtn} mt-3`} onClick={() => set("priceNotes", [...priceNotes, ""])}>
          <Plus size={14} /> Add note
        </button>
      </div>

      {/* ── Final CTA ── */}
      <div className={card}>
        <h3 className={heading}>Closing CTA</h3>
        <p className={hint}>The last line of the page, above the enquiry form.</p>
        <textarea
          rows={3}
          className={`${inputClass} resize-y`}
          value={value.finalCta}
          placeholder="Send your dates and we will confirm the plan."
          onChange={(e) => set("finalCta", e.target.value)}
        />
      </div>
    </div>
  );
};

export default PageCopy;
