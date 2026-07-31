"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

type EditorType = "Blog" | "Package" | "Temple" | "Pooja" | "Taxi" | "Hotel";

interface CMSMediaSectionProps {
  image: string;
  alt: string;
  editorType: EditorType;
  onChange: (field: "image" | "alt", value: string) => void;
}

const CMSMediaSection = ({
  image,
  alt,
  onChange,
  editorType,
}: CMSMediaSectionProps) => {

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    if (file.type !== "image/webp") {
      toast.error("Only WEBP images are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", editorType);

    try {

      setLoading(true);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Upload failed");
        setLoading(false);
        return;
      }

      onChange("image", data.url);

      toast.success("Image uploaded successfully");

    } catch (error) {

      console.log(error);

      toast.error("Upload failed");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="space-y-4">

      {/* IMAGE UPLOAD — main / cover */}
      <div>
        <label className="text-sm text-blue-300/70">
          {editorType} Image <span className="text-xs text-blue-400/40">(cover)</span>
        </label>

        <label
          htmlFor="image-upload"
          className="group relative mt-2 block aspect-square w-full max-w-[18rem] mx-auto
            rounded-xl overflow-hidden cursor-pointer
            border-2 border-dashed border-blue-900/50
            hover:border-blue-600/50 transition"
        >

          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center
              bg-black/40 backdrop-blur-sm">
              <div className="w-10 h-10 border-4 border-blue-500/30
                border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {image ? (
            <>
              <img
                src={image}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center
                bg-black/50 text-sm text-blue-100 opacity-0 group-hover:opacity-100 transition">
                Change cover image
              </span>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center
              hover:bg-blue-950/20 transition">
              <p className="text-blue-400/60 text-sm px-4">
                Drag & drop image or{" "}
                <span className="text-blue-400">Browse</span>
              </p>
              <p className="text-xs text-blue-500/40 mt-1">
                Only .webp up to 2MB
              </p>
            </div>
          )}

          <input
            id="image-upload"
            type="file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* ALT TEXT */}
      <div>
        <label className="text-sm text-blue-300/70">
          Alt Tag For Image
        </label>

        <input
          value={alt}
          required
          onChange={(e) => onChange("alt", e.target.value)}
          placeholder="Describe the image for SEO"
          className="mt-2 w-full px-4 py-2.5 rounded-lg text-sm
            bg-blue-950/30 text-blue-100
            placeholder-blue-400/40
            border border-blue-900/50
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
            transition"
        />
      </div>

    </div>
  );
};

export default CMSMediaSection;