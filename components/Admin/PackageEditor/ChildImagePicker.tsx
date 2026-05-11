"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";

type ChildImage = {
  id: string;
  image: string;
  alt: string;
};

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const ChildImagePicker = ({
  childImage,
  setChildImage,
}: {
  childImage: ChildImage[];
  setChildImage: React.Dispatch<React.SetStateAction<ChildImage[]>>;
}) => {

  const [loading, setLoading] = useState(false);

  // Add Image
  const handleChildImageAdd = () => {
    if (childImage.length >= 4) {
      toast.error("Maximum 4 child images allowed");
      return;
    }

    setChildImage((prev) => [
      ...prev,
      { id: crypto.randomUUID(), image: "", alt: "" },
    ]);
  };

  //  Alt Change
  const handleAltChange = (id: string, value: string) => {
    setChildImage((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, alt: value } : img
      )
    );
  };

  //  Delete
  const handleDeleteChildImage = (id: string) => {
    setChildImage((prev) => prev.filter((img) => img.id !== id));
  };

  // Upload Function
  const upload = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file); //  backend expects "image"
      formData.append("folder", "vrindavan-package");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error("Upload failed");
      }

      toast.success("Image uploaded successfully");
      return data.url;

    } catch (error) {
      console.log(error);
      toast.error("Upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  //  Handle Upload
  const handleImageUpload = async (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    if (file.type !== "image/webp") {
      toast.error("Only WEBP images are allowed");
      return;
    }

    const fileUrl = await upload(file);

    if (!fileUrl) return;

    setChildImage((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, image: fileUrl } : img
      )
    );
  };

  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-pink-100 mb-6">
        Other Four Images
        <span className="ml-2 text-xs text-pink-400/50">
          ({childImage.length}/4)
        </span>
      </h3>

      <div className="space-y-5">
        {childImage.map((img) => (
          <div
            key={img.id}
            className="border border-pink-900/50 rounded-2xl p-5 bg-pink-950/30"
          >

            {/* Upload */}
            <div>
              <label className="text-sm text-pink-300/70">
                Upload Child Image
              </label>

              <label
                htmlFor={`image-${img.id}`}
                className="mt-3 block rounded-xl border-2 border-dashed border-pink-900/50
                p-6 text-center cursor-pointer
                hover:border-pink-600/50 hover:bg-pink-950/20 transition"
              >
                {img.image ? (
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="mx-auto max-h-40 rounded-lg object-contain"
                  />
                ) : (
                  <>
                    <p className="text-pink-400/60 text-sm">
                      Drag & drop or <span className="text-pink-400">Browse</span>
                    </p>
                    <p className="text-xs text-pink-500/40 mt-1">
                      Only .webp • Max 2MB
                    </p>
                  </>
                )}

                <input
                  id={`image-${img.id}`}
                  type="file"
                  accept="image/webp"
                  className="hidden"
                  onChange={(e) => handleImageUpload(img.id, e)} 
                />
              </label>
            </div>

            {/* Alt */}
            <div className="mt-4">
              <label className="text-sm text-pink-300/70">
                Alt Tag For Image
              </label>
              <input
                value={img.alt}
                onChange={(e) => handleAltChange(img.id, e.target.value)}
                placeholder="Describe image for SEO"
                className={inputClass}
              />
            </div>

            {/* Delete */}
            <div className="flex justify-end mt-3">
              <button
                type="button"
                onClick={() => handleDeleteChildImage(img.id)}
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500"
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
          onClick={handleChildImageAdd}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm
            bg-pink-600/20 text-pink-300 border border-pink-600/40
            hover:bg-pink-600/30 transition disabled:opacity-50"
        >
          <Plus size={15} /> Add Child Image
        </button>
      </div>
    </div>
  );
};

export default ChildImagePicker;