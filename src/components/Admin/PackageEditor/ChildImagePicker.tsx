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
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
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
      formData.append("folder", "package");

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
    <div className="w-full">

      <div className="flex items-center justify-between mb-4">
        <label className="text-sm text-blue-300/70">
          Gallery Images
          <span className="ml-2 text-xs text-blue-400/50">
            ({childImage.length}/4)
          </span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {childImage.map((img) => (
          <div
            key={img.id}
            className="flex flex-col border border-blue-900/50 rounded-2xl p-4 bg-blue-950/30"
          >

            {/* Upload */}
            <label
              htmlFor={`image-${img.id}`}
              className="group relative block aspect-square w-full rounded-xl overflow-hidden
              border-2 border-dashed border-blue-900/50
              flex items-center justify-center text-center cursor-pointer
              hover:border-blue-600/50 hover:bg-blue-950/20 transition"
            >
              {img.image ? (
                <>
                  <img
                    src={img.image}
                    alt={img.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center
                    bg-black/50 text-xs text-blue-100 opacity-0 group-hover:opacity-100 transition">
                    Change image
                  </span>
                </>
              ) : (
                <div className="px-3">
                  <p className="text-blue-400/60 text-sm">
                    <span className="text-blue-400">Browse</span>
                  </p>
                  <p className="text-xs text-blue-500/40 mt-1">
                    .webp • Max 2MB
                  </p>
                </div>
              )}

              <input
                id={`image-${img.id}`}
                type="file"
                accept="image/webp"
                className="hidden"
                onChange={(e) => handleImageUpload(img.id, e)}
              />
            </label>

            {/* Alt */}
            <input
              value={img.alt}
              onChange={(e) => handleAltChange(img.id, e.target.value)}
              placeholder="Alt tag for SEO"
              className={`${inputClass} mt-3 !px-3 !py-2 text-sm`}
            />

            {/* Delete */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => handleDeleteChildImage(img.id)}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500"
              >
                <Trash2 size={13} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      {childImage.length < 4 && (
        <div className="mt-5">
          <button
            type="button"
            onClick={handleChildImageAdd}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              bg-blue-600/20 text-blue-300 border border-blue-600/40
              hover:bg-blue-600/30 hover:border-blue-500/60 hover:text-blue-200
              transition disabled:opacity-50 cursor-pointer"
          >
            <Plus size={15} /> Add Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ChildImagePicker;