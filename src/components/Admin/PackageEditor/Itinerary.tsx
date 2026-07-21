"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import RichTextEditor from "@/src/components/Admin/shared/RichTextEditor";

type ItineraryStep = {
  time: string;
  activity: string;
};

type Itinerary = {
  id: string;
  day: number;
  title: string;
  description: string;
  steps?: ItineraryStep[];
  dayDuration?: string;
  dayActivity?: string;
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

  const handleMetaChange = (
    id: string,
    field: "dayDuration" | "dayActivity",
    value: string
  ) => {
    setItinerary((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  /** Steps are the hour-by-hour rows the public page renders as a timeline. */
  const updateSteps = (
    id: string,
    fn: (steps: ItineraryStep[]) => ItineraryStep[]
  ) => {
    setItinerary((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, steps: fn(item.steps ?? []) } : item
      )
    );
  };

  const handleAddStep = (id: string) =>
    updateSteps(id, (steps) => [...steps, { time: "", activity: "" }]);

  const handleDeleteStep = (id: string, index: number) =>
    updateSteps(id, (steps) => steps.filter((_, i) => i !== index));

  const handleStepChange = (
    id: string,
    index: number,
    field: keyof ItineraryStep,
    value: string
  ) =>
    updateSteps(id, (steps) =>
      steps.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );

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

            {/* The two chips shown under the day title on the public page */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="text-sm text-blue-300/70 font-medium">
                  Day length <span className="text-blue-400/40">(chip)</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Day"
                  className={inputClass}
                  value={item.dayDuration ?? ""}
                  onChange={(e) => handleMetaChange(item.id, "dayDuration", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="text-sm text-blue-300/70 font-medium">
                  Day type <span className="text-blue-400/40">(chip)</span>
                </label>
                <input
                  type="text"
                  placeholder="Temple Visits"
                  className={inputClass}
                  value={item.dayActivity ?? ""}
                  onChange={(e) => handleMetaChange(item.id, "dayActivity", e.target.value)}
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

            {/* Hour-by-hour steps */}
            <div className="mt-5">
              <label className="text-sm text-blue-300/70 font-medium mb-2 block">
                Hour-by-hour steps{" "}
                <span className="text-blue-400/40">(optional)</span>
              </label>

              <div className="space-y-3">
                {(item.steps ?? []).map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-1/4">
                      <input
                        type="text"
                        placeholder="09:25"
                        className={inputClass}
                        value={step.time}
                        onChange={(e) =>
                          handleStepChange(item.id, index, "time", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="What happens at this time"
                        className={inputClass}
                        value={step.activity}
                        onChange={(e) =>
                          handleStepChange(item.id, index, "activity", e.target.value)
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="mt-2 p-3 text-red-400/70 hover:text-red-400 transition cursor-pointer"
                      onClick={() => handleDeleteStep(item.id, index)}
                      aria-label="Remove step"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleAddStep(item.id)}
                className="mt-3 flex items-center gap-1.5 text-sm text-blue-300 hover:text-blue-200 transition cursor-pointer"
              >
                <Plus size={14} /> Add step
              </button>
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
