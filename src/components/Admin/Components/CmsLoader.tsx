export default function CmsLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* Outer glow ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full bg-pink-600/20 blur-2xl animate-pulse" />

        {/* Spinning gradient ring */}
        <div
          className="w-16 h-16 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #db2777 40%, #9d174d 70%, transparent 100%)",
            animation: "spin 1s linear infinite",
          }}
        />

        {/* Inner dark circle to create ring effect */}
        <div className="absolute w-11 h-11 rounded-full bg-[#1e0d14]" />

        {/* Center dot */}
        <div className="absolute w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_2px_rgba(236,72,153,0.8)]" />
      </div>

      {/* Shimmer text */}
      <p
        className="text-sm font-medium tracking-widest uppercase"
        style={{
          background: "linear-gradient(90deg, #9d174d, #ec4899, #f9a8d4, #ec4899, #9d174d)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 2.5s linear infinite",
        }}
      >
        Loading
      </p>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}
