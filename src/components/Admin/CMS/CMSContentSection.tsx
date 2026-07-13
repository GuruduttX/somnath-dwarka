"use client";

import RichTextEditor from "@/src/components/Admin/shared/RichTextEditor";

const CMSContentSection = ({
  subContent,
  content,
  onChange,
}: {
  subContent: string;
  content: string;
  onChange: any;
  editorType: "Blog" | "Package" | "Temple";
}) => {
  return (
    <div className="space-y-6">

      {/* ================= SUB CONTENT ================= */}
      <div>
        <label className="text-sm text-blue-400/70">
          Sub Content
        </label>

        <textarea
          required
          rows={5}
          value={subContent}
          onChange={(e) => onChange("subContent", e.target.value)}
          placeholder="Let's be real for a second..."
          className="mt-2 w-full px-5 py-3 rounded-xl
          bg-blue-950/40 text-blue-200
          border border-blue-900/40
          focus:ring-2 focus:ring-blue-600/40
          transition resize-none"
        />
      </div>

      {/* ================= EDITOR ================= */}
      <div
        className="relative rounded-2xl p-4
        bg-[#0b1220]
        border border-blue-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]
        transition"
      >
        {/* Glow Effect */}
        <div className="text-black absolute -top-10 left-10 w-40 h-40 bg-blue-600/10 blur-3xl pointer-events-none hover:bg-blue-700" />

        <RichTextEditor
          value={content}
          onChange={(val) => onChange("content", val)}
          minHeight="60vh"
          maxHeight="65vh"
        />
      </div>
    </div>
  );
};

export default CMSContentSection;
