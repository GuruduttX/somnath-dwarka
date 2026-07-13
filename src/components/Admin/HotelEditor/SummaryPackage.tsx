"use client";

type RatingSummary = {
  reviewText: string;
  scores: {
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
    cleanliness: number;
  };
  highlights: {
    hospitality: number;
    greatLocation: number;
    comfortStay: number;
  };
};

export default function RatingSummary({
  ratingSummary,
  setRatingSummary,
}: {
  ratingSummary: RatingSummary;
  setRatingSummary: React.Dispatch<React.SetStateAction<RatingSummary>>;
}) {
  const updateScore = (key: keyof RatingSummary["scores"], value: number) => {
    setRatingSummary((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [key]: value,
      },
    }));
  };

  const updateHighlight = (
    key: keyof RatingSummary["highlights"],
    value: number
  ) => {
    setRatingSummary((prev) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [key]: value,
      },
    }));
  };

  const updateText = (value: string) => {
    setRatingSummary((prev) => ({
      ...prev,
      reviewText: value,
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* LABEL */}
      <label className="text-sm text-blue-400/70">
        Rating Summary
      </label>

      {/* CONTAINER */}
      <div className="relative rounded-2xl p-5 bg-[#0b1220] border border-blue-900/40 shadow-[0_0_30px_rgba(236,72,153,0.08)]">
        
        {/* Glow */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* REVIEW TEXT */}
        <div className="mb-5">
          <textarea
            value={ratingSummary.reviewText}
            onChange={(e) => updateText(e.target.value)}
            placeholder="Write short review summary..."
            className="w-full px-4 py-2 rounded-xl bg-blue-950/40 text-blue-200 border border-blue-900/40 focus:ring-2 focus:ring-blue-600/40 outline-none resize-none"
          />
        </div>

        {/* SCORES */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(ratingSummary.scores).map(([key, value]) => (
            <div key={key}>
              <label className="text-xs text-blue-400/70 capitalize">
                {key}
              </label>
              <input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={value}
                onChange={(e) =>
                  updateScore(
                    key as keyof RatingSummary["scores"],
                    Number(e.target.value)
                  )
                }
                className="mt-1 w-full px-3 py-2 rounded-lg bg-blue-950/40 text-blue-200 border border-blue-900/40 focus:ring-2 focus:ring-blue-600/40 outline-none"
              />
            </div>
          ))}
        </div>

        {/* HIGHLIGHTS */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(ratingSummary.highlights).map(([key, value]) => (
            <div key={key}>
              <label className="text-xs text-blue-400/70 capitalize">
                {key}
              </label>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) =>
                  updateHighlight(
                    key as keyof RatingSummary["highlights"],
                    Number(e.target.value)
                  )
                }
                className="mt-1 w-full px-3 py-2 rounded-lg bg-blue-950/40 text-blue-200 border border-blue-900/40 focus:ring-2 focus:ring-blue-600/40 outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}