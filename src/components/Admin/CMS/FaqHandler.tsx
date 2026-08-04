"use client";

import React from 'react'
import { createPortal } from 'react-dom'
import { Plus, Trash2, ClipboardPaste, X } from 'lucide-react'
import { parseFaqInput, type ParsedFaq } from '@/src/lib/faqImport'

type faq = {
  id: string
  question: string
  answer: string
}

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const PLACEHOLDER = `Paste FAQs in any of these shapes:

Q: How many days are enough for Somnath and Dwarka?
A: Three days covers both temples comfortably.

## How far is Dwarka from Somnath?
About 230 km, roughly 4.5 hours by road.

1. Is a cab included?
Yes, an AC sedan with driver is included.

…or a JSON array / schema.org FAQPage blob.`;

/**
 * Paste-to-import dialog.
 *
 * Editors draft FAQs elsewhere — a Doc, an AI reply, a JSON-LD blob pulled off a
 * SERP — and re-typing twenty pairs into twenty separate inputs is where the
 * mistakes come from. This takes the paste as-is, shows what it understood
 * before anything is committed, and only then writes the rows.
 */
const ImportDialog = ({
  onClose, onImport, existingCount,
}: {
  onClose: () => void;
  onImport: (rows: ParsedFaq[], mode: "append" | "replace") => void;
  existingCount: number;
}) => {
  const [raw, setRaw] = React.useState("");
  const [mode, setMode] = React.useState<"append" | "replace">("append");

  // Re-parsing on every keystroke is cheap here (a paste is a few KB) and makes
  // the preview the source of truth for what Import will actually do.
  const parsed = React.useMemo(() => parseFaqInput(raw), [raw]);

  // Escape closes, matching every other dialog the editor has used.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Freeze the editor behind the dialog. Without this the long blog form keeps
  // scrolling under the overlay once the preview list hits its own scroll end,
  // which reads as the centred panel drifting off-centre.
  React.useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  // Portalled to <body>: any ancestor with a transform, filter or backdrop-filter
  // becomes the containing block for `position: fixed`, which would anchor the
  // overlay to that element instead of the viewport. Rendering outside the form
  // makes viewport-centring unconditional.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Import FAQs"
      onClick={onClose}
    >
      {/* Fixed height rather than max-height: the panel would otherwise grow and
          shrink under the cursor as the live preview appears and rows are typed. */}
      <div
        className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-blue-900/60 bg-[#0b1220] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-blue-900/50 px-6 py-4">
          <div>
            <h4 className="text-base font-semibold text-blue-100">Import FAQs</h4>
            <p className="mt-1 text-xs text-blue-300/60">
              Paste questions and answers in any common format — they&apos;re split
              into rows automatically.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1 text-blue-300/60 transition hover:bg-blue-900/40 hover:text-blue-200 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* min-h-0: without it a flex child refuses to shrink below its content,
            so the panel would push past its fixed height instead of scrolling. */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          <textarea
            autoFocus
            rows={10}
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={PLACEHOLDER}
            className={`${inputClass} mt-0 resize-y font-mono text-sm leading-relaxed`}
          />

          {raw.trim() && (
            <div className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-blue-300/70">
                {parsed.length
                  ? `Preview — ${parsed.length} FAQ${parsed.length > 1 ? "s" : ""} detected`
                  : "Nothing detected"}
              </p>

              {parsed.length ? (
                <ol className="mt-3 space-y-3">
                  {parsed.map((f, i) => (
                    <li
                      key={i}
                      className="rounded-xl border border-blue-900/50 bg-blue-950/30 p-4"
                    >
                      <p className="text-sm font-medium text-blue-100">
                        {i + 1}. {f.question}
                      </p>
                      <p className="mt-1.5 whitespace-pre-line text-sm text-blue-300/70">
                        {f.answer}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-2 text-sm text-amber-300/80">
                  Couldn&apos;t split that into pairs. Try prefixing each line with
                  <span className="font-mono"> Q: </span> and
                  <span className="font-mono"> A: </span>, or separate each
                  question from its answer with a blank line.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-blue-900/50 px-6 py-4">
          {/* Replace is offered because re-importing a corrected list is the
              common second use, and deleting the old rows one by one is worse. */}
          <div className="flex items-center gap-4 text-sm text-blue-300/80">
            {(["append", "replace"] as const).map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="faq-import-mode"
                  checked={mode === m}
                  onChange={() => setMode(m)}
                  className="accent-blue-500"
                />
                {m === "append"
                  ? `Add to existing (${existingCount})`
                  : "Replace all existing"}
              </label>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2 text-sm text-blue-300/70 transition hover:text-blue-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!parsed.length}
              onClick={() => onImport(parsed, mode)}
              className="rounded-full bg-blue-600/30 px-6 py-2 text-sm font-medium text-blue-100
                border border-blue-500/50 transition
                hover:bg-blue-600/50 hover:border-blue-400/70
                disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600/30
                cursor-pointer"
            >
              Import {parsed.length || ""}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const FaqHandler = ({
  faqs, setFaqs,
}: {
  faqs: faq[];
  setFaqs: React.Dispatch<React.SetStateAction<faq[]>>;
  editorType: "Blog" | "Package" | "Temple" | "Pooja";
}) => {
  const [importOpen, setImportOpen] = React.useState(false);

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { id: crypto.randomUUID(), question: "", answer: "" }]);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  const handleQuestionChange = (id: string, value: string) => {
    setFaqs((prev) => prev.map((faq) => faq.id === id ? { ...faq, question: value } : faq));
  };

  const handleAnswerChange = (id: string, value: string) => {
    setFaqs((prev) => prev.map((faq) => faq.id === id ? { ...faq, answer: value } : faq));
  };

  const handleImport = (rows: ParsedFaq[], mode: "append" | "replace") => {
    const imported: faq[] = rows.map((r) => ({
      id: crypto.randomUUID(),
      question: r.question,
      answer: r.answer,
    }));
    setFaqs((prev) =>
      mode === "replace"
        ? imported
        // Blank rows the editor added but never filled would block submit, and
        // they carry no intent — drop them when rows arrive to take their place.
        : [...prev.filter((f) => f.question.trim() || f.answer.trim()), ...imported]
    );
    setImportOpen(false);
  };

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-blue-100">FAQs</h3>

        <button
          type="button"
          onClick={() => setImportOpen(true)}
          className="flex items-center gap-2 rounded-full border border-blue-600/40 bg-blue-600/10
            px-4 py-2 text-xs font-medium text-blue-300 transition
            hover:bg-blue-600/25 hover:border-blue-500/60 hover:text-blue-200 cursor-pointer"
        >
          <ClipboardPaste size={14} /> Import
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq: faq) => (
          <div
            key={faq.id}
            className="border border-blue-900/50 rounded-2xl p-5 bg-blue-950/30"
          >
            <input
              required
              type="text"
              placeholder="Enter the question"
              className={inputClass}
              value={faq.question}
              onChange={(e) => handleQuestionChange(faq.id, e.target.value)}
            />

            <textarea
              rows={3}
              required
              placeholder="Enter the answer"
              className={`${inputClass} resize-none`}
              value={faq.answer}
              onChange={(e) => handleAnswerChange(faq.id, e.target.value)}
            />

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteFaq(faq.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAddFaq}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-blue-600/20 text-blue-300 border border-blue-600/40
            hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add FAQ
        </button>
      </div>

      {importOpen && (
        <ImportDialog
          onClose={() => setImportOpen(false)}
          onImport={handleImport}
          existingCount={faqs.length}
        />
      )}

    </div>
  );
};

export default FaqHandler;
