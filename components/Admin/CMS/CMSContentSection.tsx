"use client";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

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
        <label className="text-sm text-pink-400/70">
          Sub Content
        </label>

        <textarea
          required
          rows={5}
          value={subContent}
          onChange={(e) => onChange("subContent", e.target.value)}
          placeholder="Let’s be real for a second..."
          className="mt-2 w-full px-5 py-3 rounded-xl
          bg-pink-950/40 text-pink-200
          border border-pink-900/40
          focus:ring-2 focus:ring-pink-600/40
          transition resize-none"
        />
      </div>

      {/* ================= EDITOR ================= */}
      <div
        className="relative rounded-2xl p-4
        bg-[#1e0d14]
        border border-pink-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]
        transition"
      >

        {/* Glow Effect */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-600/10 blur-3xl pointer-events-none hover:bg-pink-700" />

        <SunEditor
          setContents={content}
          setOptions={{
            minHeight: "60vh",
            maxHeight: "65vh",
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
          onChange={(content) => {
            onChange("content", content);
          }}
        />
      </div>
    </div>
  );
};

export default CMSContentSection;