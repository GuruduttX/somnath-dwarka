"use client";

export default function CMSHostField({
  host,
  location,
  onChange,
}: {
  host: string;
  location : string;
  onChange: any;
}) {
  return (
    <div>

      <div className="space-y-3">
      
      {/* LABEL */}
      <label className="text-sm text-pink-400/70">
        Location 
      </label>

      {/* INPUT BOX */}
      <div
        className="relative rounded-2xl p-4
        bg-[#1e0d14]
        border border-pink-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]"
      >
        {/* Glow */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-600/10 blur-3xl pointer-events-none" />

        <input
          type="text"
          value={location}
          onChange={(e) => onChange("location", e.target.value)}
          placeholder="location..."
          className="w-full px-4 py-2.5 rounded-xl
          bg-pink-950/40 text-pink-200
          border border-pink-900/40
          focus:ring-2 focus:ring-pink-600/40
          outline-none transition-all duration-200"
          required
        />
      </div>
    </div>


        <div className="space-y-3">
      
      {/* LABEL */}
      <label className="text-sm text-pink-400/70">
        Host Name
      </label>

      {/* INPUT BOX */}
      <div
        className="relative rounded-2xl p-4
        bg-[#1e0d14]
        border border-pink-900/40
        shadow-[0_0_30px_rgba(236,72,153,0.08)]"
      >
        {/* Glow */}
        <div className="absolute -top-10 left-10 w-40 h-40 bg-pink-600/10 blur-3xl pointer-events-none" />

        <input
          type="text"
          value={host}
          onChange={(e) => onChange("host", e.target.value)}
          placeholder="e.g. Managed by Braj Travels"
          className="w-full px-4 py-2.5 rounded-xl
          bg-pink-950/40 text-pink-200
          border border-pink-900/40
          focus:ring-2 focus:ring-pink-600/40
          outline-none transition-all duration-200"
          required
        />
      </div>
    </div>

    </div>

  );
}