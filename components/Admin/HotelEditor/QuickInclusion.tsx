"use client";

type QuickInclusions = {
  freeWifi: boolean;
  breakfast: boolean;
  parking: boolean;
};

export default function QuickInclusion({
  quickInclusions,
  setQuickInclusions,
}: {
  quickInclusions: QuickInclusions;
  setQuickInclusions: React.Dispatch<React.SetStateAction<QuickInclusions>>;
}) {
  const toggle = (key: keyof QuickInclusions) => {
    setQuickInclusions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-4">
      
      {/* LABEL */}
      <label className="text-sm text-pink-400/70">
        Quick Inclusions
      </label>

      {/* CONTAINER */}
      <div
        className="relative rounded-2xl p-5
        bg-[#1e0d14]
        border border-pink-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]"
      >
        {/* Glow */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-600/10 blur-3xl pointer-events-none" />

        {/* OPTIONS */}
        <div className="grid grid-cols-2 gap-4 relative z-10">

          {[
            { key: "freeWifi", label: "Free Wifi" },
            { key: "breakfast", label: "Breakfast" },
            { key: "parking", label: "Parking" },
          ].map((item) => (
            <label
              key={item.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
              border transition-all duration-200
              ${
                quickInclusions[item.key as keyof QuickInclusions]
                  ? "bg-pink-600/20 border-pink-500/40"
                  : "bg-pink-950/30 border-pink-900/40 hover:border-pink-700"
              }`}
            >
              <input
                type="checkbox"
                checked={quickInclusions[item.key as keyof QuickInclusions]}
                onChange={() =>
                  toggle(item.key as keyof QuickInclusions)
                }
                className="accent-pink-500 w-4 h-4"
              />

              <span className="text-sm text-pink-200">
                {item.label}
              </span>
            </label>
          ))}

        </div>
      </div>
    </div>
  );
}