"use client";
import React from "react";
import { Plus, Trash2 } from "lucide-react";

type SegmentType = {
  id: string;
  from: string;
  to: string;
};

type RouteType = {
  source: string;
  destination: string;
  segments: SegmentType[];
};

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const DestRoutes = ({
  route,
  setRoute,
}: {
  route: RouteType;
  setRoute: React.Dispatch<React.SetStateAction<RouteType>>;
}) => {

  const handleAddSegment = () => {
    setRoute((prev) => ({
      ...prev,
      segments: [...prev.segments, { id: crypto.randomUUID(), from: "", to: "" }],
    }));
  };

  const handleSegmentChange = (id: string, field: "from" | "to", value: string) => {
    setRoute((prev) => ({
      ...prev,
      segments: prev.segments.map((seg) =>
        seg.id === id ? { ...seg, [field]: value } : seg
      ),
    }));
  };

  const handleDeleteSegment = (id: string) => {
    setRoute((prev) => ({
      ...prev,
      segments: prev.segments.filter((seg) => seg.id !== id),
    }));
  };

  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      {/* Heading */}
      <h3 className="text-base font-semibold text-pink-100 mb-6">
        Route Configuration
      </h3>

      {/* Source */}
      <div className="mb-5">
        <label className="text-sm text-pink-300/70 font-medium">Source (Fixed)</label>
        <input
          type="text"
          required
          placeholder="Enter main source"
          value={route.source}
          onChange={(e) => setRoute((prev) => ({ ...prev, source: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Destination */}
      <div className="mb-6">
        <label className="text-sm text-pink-300/70 font-medium">Destination (Fixed)</label>
        <input
          type="text"
          required
          placeholder="Enter main destination"
          value={route.destination}
          onChange={(e) => setRoute((prev) => ({ ...prev, destination: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Segments */}
      <div>
        <label className="text-sm text-pink-300/70 font-medium">
          Route Segments (From → To)
        </label>

        <div className="space-y-3 mt-3">
          {route.segments.map((segment) => (
            <div
              key={segment.id}
              className="border border-pink-900/50 rounded-xl p-4 bg-pink-950/30"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="From"
                  value={segment.from}
                  required
                  onChange={(e) => handleSegmentChange(segment.id, "from", e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="To"
                  value={segment.to}
                  required
                  onChange={(e) => handleSegmentChange(segment.id, "to", e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end mt-3">
                <button
                  type="button"
                  onClick={() => handleDeleteSegment(segment.id)}
                  className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={handleAddSegment}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
              bg-pink-600/20 text-pink-300 border border-pink-600/40
              hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
              transition cursor-pointer"
          >
            <Plus size={15} /> Add Route Segment
          </button>
        </div>
      </div>

    </div>
  );
};

export default DestRoutes;