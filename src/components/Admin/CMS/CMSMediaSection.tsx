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
    formData.append("folder", `vrindavan-${editorType}`);

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
    <div className="space-y-6">

      {/* IMAGE UPLOAD */}
      <div>
        <label className="text-sm text-pink-300/70">
          {editorType} Image
        </label>

        <label
          htmlFor="image-upload"
          className="relative mt-3 block rounded-xl border-2 border-dashed border-pink-900/50
            p-6 text-center cursor-pointer
            hover:border-pink-600/50 hover:bg-pink-950/20
            transition overflow-hidden"
        >

          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center
              bg-black/40 backdrop-blur-sm rounded-xl">

              <div className="w-10 h-10 border-4 border-pink-500/30
                border-t-pink-500 rounded-full animate-spin"></div>

            </div>
          )}

          {image ? (
            <img
              src={image}
              alt={alt}
              className="mx-auto max-h-40 rounded-lg object-contain"
            />
          ) : (
            <>
              <p className="text-pink-400/60 text-sm">
                Drag & drop image or{" "}
                <span className="text-pink-400">Browse</span>
              </p>
              <p className="text-xs text-pink-500/40 mt-1">
                Only .webp up to 2MB
              </p>
            </>
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
        <label className="text-sm text-pink-300/70">
          Alt Tag For Image
        </label>

        <input
          value={alt}
          required
          onChange={(e) => onChange("alt", e.target.value)}
          placeholder="Describe the image for SEO"
          className="mt-2 w-full px-5 py-3 rounded-xl
            bg-pink-950/30 text-pink-100
            placeholder-pink-400/40
            border border-pink-900/50
            focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
            transition"
        />
      </div>

    </div>
  );
};

export default CMSMediaSection;