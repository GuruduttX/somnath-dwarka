"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import RichTextEditor from "@/src/components/Admin/shared/RichTextEditor";

type Itinerary = {
  id: string;
  day: number;
  title: string;
  description: string;
};

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-blue-950/30 text-blue-100
  placeholder-blue-400/40
  border border-blue-900/50
  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-600/50
  transition
`;

const ItinearyMaker = ({
  itinerary,
  setItinerary,
}: {
  itinerary: Itinerary[];
  setItinerary: React.Dispatch<React.SetStateAction<Itinerary[]>>;
  editorType: "Blog" | "Package";
}) => {

  const handleAddFaq = () => {
    setItinerary((prev) => [
      ...prev,
      { id: crypto.randomUUID(), day: 0, title: "", description: "" },
    ]);
  };

  const handleDeleteItineary = (id: string) => {
    setItinerary((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDurationChange = (id: string, value: string) => {
    setItinerary((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, day: value === "" ? 0 : Number(value) } : item
      )
    );
  };

  const handleTitleChange = (id: string, value: string) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: value } : item))
    );
  };

  const handleDescriptionChange = (id: string, value: string) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, description: value } : item))
    );
  };

  return (
    <div className="border border-blue-900/50 rounded-2xl w-full p-6 bg-blue-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-blue-100 mb-6">
        Itinerary Maker
      </h3>

      <div className="space-y-5">
        {itinerary.map((item: Itinerary) => (
          <div
            key={item.id}
            className="border border-blue-900/50 rounded-2xl w-full p-5 bg-blue-950/30"
          >
            {/* Day + Title */}
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="text-sm text-blue-300/70 font-medium">Day</label>
                <input
                  required
                  type="number"
                  placeholder="Day number"
                  className={inputClass}
                  value={item.day}
                  onChange={(e) => handleDurationChange(item.id, e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="text-sm text-blue-300/70 font-medium">Title</label>
                <input
                  required
                  type="text"
                  placeholder="Enter the title of the itinerary day"
                  className={inputClass}
                  value={item.title}
                  onChange={(e) => handleTitleChange(item.id, e.target.value)}
                />
              </div>
            </div>

            {/* Description Editor */}
            <div className="mt-5">
              <label className="text-sm text-blue-300/70 font-medium mb-2 block">
                Description
              </label>

              <RichTextEditor
                value={item.description}
                onChange={(val) => handleDescriptionChange(item.id, val)}
                minHeight="35vh"
                maxHeight="40vh"
              />
            </div>

            {/* Delete */}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteItineary(item.id)}
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
          <Plus size={15} /> Add Itinerary
        </button>
      </div>

    </div>
  );
};

export default ItinearyMaker;
