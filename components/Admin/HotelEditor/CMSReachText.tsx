"use client";

import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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
      <label className="text-sm text-pink-400/70">
        {label}
      </label>

      {/* EDITOR BOX */}
      <div
        className="relative rounded-2xl p-4
        bg-[#1e0d14]
        border border-pink-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]"
      >
        {/* Glow */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-600/10 blur-3xl pointer-events-none" />

        <SunEditor
          setContents={value}
          setOptions={{
            minHeight: "40vh",
            maxHeight: "50vh",
            buttonList: [
              ["undo", "redo"],
              ["formatBlock"],
              ["bold", "italic", "underline"],
              ["list"],
              ["align"],
              ["link", "image"],
              ["table"],
            ],
          }}
          onChange={(content) => onChange(field, content)}
        />
      </div>
    </div>
  );
}