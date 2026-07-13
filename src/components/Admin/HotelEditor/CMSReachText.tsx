"use client";

import RichTextEditor from "@/components/Admin/shared/RichTextEditor";

export default function CMSRichText({
  label,
  value,
  onChange,
  field,
}: {
  label: string;
  value: string;
  field: string;
  onChange: any;
}) {
  return (
    <div className="space-y-3">

      {/* LABEL */}
      <label className="text-sm text-blue-400/70">
        {label}
      </label>

      {/* EDITOR BOX */}
      <div
        className="relative rounded-2xl p-4
        bg-[#0b1220]
        border border-blue-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]"
      >
        {/* Glow */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-blue-600/10 blur-3xl pointer-events-none" />

        <RichTextEditor
          value={value}
          onChange={(val) => onChange(field, val)}
          minHeight="40vh"
          maxHeight="50vh"
        />
      </div>
    </div>
  );
}
