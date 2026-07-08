/**
 * Decorative row of brass diya lamps hanging on thin threads from the bottom
 * edge of the hero. Pure CSS/SVG (no JS) — each lamp swings gently on a
 * pendulum with a flickering flame and soft glow. Purely ornamental, so it is
 * aria-hidden and ignores pointer events.
 */

// left%, thread length (px), swing timing class, flame delay class
const DIYAS = [
  { h: 60, sway: "hd-s1", fl: "hd-f2", hide: "hidden sm:flex" },
  { h: 104, sway: "hd-s2", fl: "hd-f1", hide: "hidden lg:flex" },
  { h: 78, sway: "hd-s3", fl: "hd-f3", hide: "" },
  { h: 130, sway: "hd-s1", fl: "hd-f2", hide: "" },
  { h: 78, sway: "hd-s2", fl: "hd-f1", hide: "" },
  { h: 104, sway: "hd-s3", fl: "hd-f3", hide: "hidden lg:flex" },
  { h: 60, sway: "hd-s1", fl: "hd-f2", hide: "hidden sm:flex" },
] as const;

function Lamp({ flameDelayClass }: { flameDelayClass: string }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* suspension strings meeting the bowl */}
      <svg width="46" height="20" viewBox="0 0 46 20" className="opacity-70" aria-hidden="true">
        <path d="M23 0 L9 20 M23 0 L23 20 M23 0 L37 20" stroke="#b45309" strokeWidth="0.9" fill="none" />
      </svg>

      <div className="relative -mt-1">
        {/* glow halo */}
        <span className="pointer-events-none absolute left-1/2 top-[-14px] h-12 w-12 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.55)_0%,transparent_70%)] blur-[2px] hd-glow" />

        {/* flame */}
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          className={`absolute left-1/2 top-[-15px] -translate-x-1/2 hd-flame ${flameDelayClass}`}
          aria-hidden="true"
        >
          <path
            d="M7 0C8.5 3 10 4.4 10 7a3 3 0 1 1-6 0c0-1.4.6-2.4 1.4-3.4C6 4.6 6.6 5.4 7 6c.5-.7.6-1.6 0-3-.3-.9-.4-2 0-3Z"
            fill="#FBBF24"
          />
          <path d="M7 4c.9 1.2 1.4 2.2 1.4 3.4a1.4 1.4 0 1 1-2.8 0C5.6 6.2 6.2 5 7 4Z" fill="#FDE68A" />
        </svg>

        {/* brass bowl */}
        <svg width="48" height="26" viewBox="0 0 48 26" aria-hidden="true">
          <defs>
            <linearGradient id="hd-bowl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FCD34D" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* rim */}
          <ellipse cx="24" cy="4" rx="22" ry="4.2" fill="#FBBF24" />
          <ellipse cx="24" cy="3.4" rx="22" ry="3.4" fill="#FDE68A" />
          {/* bowl body with a pinched spout */}
          <path d="M2 4 C2 16 12 24 24 24 C36 24 46 16 46 4 C40 8 8 8 2 4 Z" fill="url(#hd-bowl)" />
          <path d="M0.5 4.2 C4 6 10 7 10 4.6 L6 3 Z" fill="#B45309" />
        </svg>
      </div>
    </div>
  );
}

export default function HangingDiyas() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-6 sm:-top-8 lg:-top-10 z-10 h-0" aria-hidden="true">
      <style>{`
        @keyframes hdSway {
          0%, 100% { transform: translateX(-50%) rotate(-5deg); }
          50% { transform: translateX(-50%) rotate(5deg); }
        }
        @keyframes hdFlicker {
          0%, 100% { transform: translateX(-50%) scaleY(1); opacity:.95; }
          45% { transform: translateX(-50%) scaleY(1.16) scaleX(.92); opacity:1; }
        }
        @keyframes hdGlow {
          0%, 100% { opacity:.55; }
          50% { opacity:.9; }
        }
        .hd-hang {
          transform-origin: top center;
          transform: translateX(-50%);
          animation: hdSway 5.5s ease-in-out infinite;
        }
        .hd-lamp-0 { left: 8%; }
        .hd-lamp-1 { left: 22%; }
        .hd-lamp-2 { left: 26%; }
        .hd-lamp-3 { left: 50%; }
        .hd-lamp-4 { left: 74%; }
        .hd-lamp-5 { left: 78%; }
        .hd-lamp-6 { left: 92%; }
        @media (min-width: 640px) {
          .hd-lamp-2 { left: 37%; }
          .hd-lamp-4 { left: 63%; }
        }
        .hd-s1 { animation-duration: 5.2s; }
        .hd-s2 { animation-duration: 6.4s; animation-delay: -1.5s; }
        .hd-s3 { animation-duration: 5.8s; animation-delay: -3s; }
        .hd-flame {
          transform-origin: bottom center;
          animation: hdFlicker 1.1s ease-in-out infinite;
        }
        .hd-f1 { animation-delay: -.3s; }
        .hd-f2 { animation-delay: -.7s; }
        .hd-f3 { animation-delay: -1.1s; }
        .hd-glow { animation: hdGlow 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hd-hang, .hd-flame, .hd-glow { animation: none !important; }
        }
      `}</style>

      {DIYAS.map((d, i) => (
        <div
          key={i}
          className={`hd-hang hd-lamp-${i} ${d.sway} ${d.hide} absolute top-0 flex flex-col items-center`}
        >
          {/* thread */}
          <span
            className="block w-px bg-gradient-to-b from-amber-700/10 via-amber-700/40 to-amber-700/60"
            style={{ height: d.h }}
          />
          <span className="block -mt-px h-1.5 w-1.5 rounded-full border border-amber-700/60 bg-amber-100" />
          <Lamp flameDelayClass={d.fl} />
        </div>
      ))}
    </div>
  );
}
