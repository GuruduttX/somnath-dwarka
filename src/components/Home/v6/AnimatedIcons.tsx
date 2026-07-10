import React from "react";

interface IconProps {
  className?: string;
}

// 1. Temple Yatra (Flagship / circuits)
export function TempleYatraIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-orange-600 transition-transform duration-300 ${className}`}
    >
      {/* Radiating spiritual rings */}
      <circle
        cx="32"
        cy="26"
        r="14"
        className="stroke-orange-300/40 animate-pulse-ring"
        strokeWidth="1.5"
      />
      <circle
        cx="32"
        cy="26"
        r="20"
        className="stroke-orange-200/20 animate-pulse-ring"
        strokeWidth="1"
        style={{ animationDelay: "1s" }}
      />
      
      {/* Path / Yatra road */}
      <path
        d="M8 56C12 50 20 46 32 46C44 46 52 50 56 56"
        stroke="url(#yatraPathGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Temple Structure */}
      <path
        d="M18 46H46V40H18V46Z"
        fill="url(#templeBaseGrad)"
      />
      <path
        d="M22 40L32 18L42 40H22Z"
        fill="url(#templeShikharaGrad)"
        stroke="#E87722"
        strokeWidth="1"
      />

      {/* Golden Kalash Dome */}
      <circle cx="32" cy="17" r="2.5" fill="#FFB800" />

      {/* Waving Flag */}
      <g className="animate-wave">
        <line x1="32" y1="17" x2="32" y2="8" stroke="#E87722" strokeWidth="1.5" />
        <path
          d="M32 8C35 9 39 8 43 9.5V13C39 11.5 35 12 32 11V8Z"
          fill="#FF6B00"
          stroke="#E87722"
          strokeWidth="0.5"
        />
      </g>

      <defs>
        <linearGradient id="yatraPathGrad" x1="8" y1="51" x2="56" y2="51" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#F97316" />
          <stop offset="1" stopColor="#F97316" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="templeBaseGrad" x1="18" y1="43" x2="46" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C85A0A" />
          <stop offset="1" stopColor="#E87722" />
        </linearGradient>
        <linearGradient id="templeShikharaGrad" x1="22" y1="29" x2="42" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E87722" />
          <stop offset="1" stopColor="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 2. Lion Forest (Gir / Wildlife / Somnath-Dwarka-Gir)
export function LionForestIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-emerald-600 transition-transform duration-300 ${className}`}
    >
      {/* Background Forest Leaves (Swaying) */}
      <g className="animate-float-slow">
        <path
          d="M48 16C48 24 40 28 40 28C40 28 44 20 48 16Z"
          fill="#10B981"
          fillOpacity="0.25"
        />
        <path
          d="M16 12C20 18 16 26 16 26C16 26 12 20 16 12Z"
          fill="#10B981"
          fillOpacity="0.15"
          style={{ animationDelay: "1.5s" }}
        />
      </g>

      {/* Sun / Rays */}
      <circle cx="46" cy="18" r="5" fill="#FBBF24" fillOpacity="0.2" />
      <line x1="46" y1="10" x2="46" y2="12" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="52" y1="14" x2="54" y2="13" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="54" y1="20" x2="52" y2="20" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.4" />

      {/* Lion Profile/Mane Outline */}
      <path
        d="M24 16C28 14 34 16 38 20C42 24 43 30 41 35C43 37 45 41 43 45C41 49 35 52 30 52C24 52 18 48 16 42C15 39 16 36 18 34C15 31 16 26 19 22C20 20 22 17 24 16Z"
        fill="url(#lionManeGrad)"
        fillOpacity="0.15"
        stroke="#047857"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Lion Face Lines */}
      <path
        d="M26 26C28 26 30 27 31 29M26 38H29M25 32H28"
        stroke="#065F46"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M33 33V37L30 40H26"
        stroke="#065F46"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient id="lionManeGrad" x1="16" y1="34" x2="43" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 3. Gujarat Compass (Gujarat general)
export function GujaratCompassIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-indigo-600 transition-transform duration-300 ${className}`}
    >
      {/* Outer Compass Dial */}
      <circle cx="32" cy="32" r="26" stroke="#4F46E5" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="32" cy="32" r="22" stroke="#818CF8" strokeWidth="1" strokeOpacity="0.4" />

      {/* Dial Ticks (N, E, S, W) */}
      <path d="M32 6V10M32 54V58M6 32H10M54 32H58" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />

      {/* Rotating Compass Needle */}
      <g className="animate-spin-slow">
        {/* North Pointer (Orange/Saffron) */}
        <path d="M32 32L26 26L32 12L38 26L32 32Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1" />
        {/* South Pointer (Slate Blue) */}
        <path d="M32 32L38 38L32 52L26 38L32 32Z" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />
        {/* Center Pivot */}
        <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// 4. Mountain Temple (Ambaji)
export function MountainTempleIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-rose-600 transition-transform duration-300 ${className}`}
    >
      {/* Floating Clouds */}
      <g className="animate-float-slow">
        <path
          d="M8 22C8 20.3 9.3 19 11 19C11.5 19 12 19.1 12.5 19.3C13.2 17.9 14.7 17 16.5 17C18.8 17 20.7 18.7 21 21C21.6 21 22 21.5 22 22.1C22 22.8 21.4 23.4 20.7 23.4H9.3C8.6 23.4 8 22.8 8 22Z"
          fill="#CBD5E1"
          fillOpacity="0.4"
        />
        <path
          d="M44 14C44 12.6 45.1 11.5 46.5 11.5C46.9 11.5 47.3 11.6 47.7 11.8C48.3 10.6 49.5 9.8 51 9.8C52.9 9.8 54.5 11.2 54.8 13.1C55.3 13.1 55.7 13.5 55.7 14C55.7 14.6 55.2 15.1 54.6 15.1H45.1C44.5 15.1 44 14.6 44 14Z"
          fill="#CBD5E1"
          fillOpacity="0.3"
          style={{ animationDelay: "2s" }}
        />
      </g>

      {/* Mountain outline */}
      <path
        d="M6 54L28 22L44 42L58 54H6Z"
        fill="url(#mountainGrad)"
        stroke="#B45309"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Small Temple on Mountaintop */}
      <rect x="25" y="16" width="6" height="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      <path d="M24 16L28 9L32 16H24Z" fill="#EF4444" stroke="#B45309" strokeWidth="1" />
      
      {/* Animated Flag */}
      <g className="animate-wave">
        <line x1="28" y1="9" x2="28" y2="4" stroke="#B45309" strokeWidth="1" />
        <path d="M28 4L33 6L28 8V4Z" fill="#F59E0B" />
      </g>

      <defs>
        <linearGradient id="mountainGrad" x1="6" y1="54" x2="58" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78350F" />
          <stop offset="0.7" stopColor="#D97706" />
          <stop offset="1" stopColor="#F59E0B" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 5. Desert & Moon (Kutch)
export function DesertMoonIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-cyan-600 transition-transform duration-300 ${className}`}
    >
      {/* Twinkling Stars */}
      <g className="animate-flicker">
        <circle cx="16" cy="14" r="1" fill="#FBBF24" />
        <circle cx="48" cy="12" r="1.5" fill="#FBBF24" style={{ animationDelay: "0.5s" }} />
        <circle cx="56" cy="20" r="1" fill="#FBBF24" style={{ animationDelay: "1s" }} />
      </g>

      {/* Crescent Moon */}
      <path
        d="M38 8C33 8 28.5 11 26 15.5C28.5 15.5 32 17.5 33.5 21C35 24.5 34.5 28.5 32.5 31C35.5 29 38.5 25.5 39.5 21.5C40.5 17.5 40 12 38 8Z"
        fill="#FBBF24"
        fillOpacity="0.8"
        stroke="#D97706"
        strokeWidth="0.5"
      />

      {/* Rann Desert Dunes */}
      <path
        d="M6 52C20 44 32 54 58 46V56H6V52Z"
        fill="url(#duneGrad1)"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <path
        d="M6 56C16 52 28 58 58 52V58H6V56Z"
        fill="url(#duneGrad2)"
        stroke="#F1F5F9"
        strokeWidth="1"
      />

      <defs>
        <linearGradient id="duneGrad1" x1="6" y1="50" x2="58" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="duneGrad2" x1="6" y1="55" x2="58" y2="55" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 6. Statue of Unity
export function StatueUnityIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-amber-700 transition-transform duration-300 ${className}`}
    >
      {/* River Waves underneath (sliding/flowing) */}
      <path
        d="M6 56C12 54 18 58 24 56C30 54 36 58 42 56C48 54 54 58 58 56"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
        className="animate-road-slide"
        strokeDasharray="8 4"
      />

      {/* Pedestal / Base */}
      <rect x="22" y="44" width="20" height="8" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
      <line x1="26" y1="48" x2="38" y2="48" stroke="#475569" strokeWidth="1" />

      {/* Tall Statue Silhouette */}
      <path
        d="M26 44L28 14H36L38 44H26Z"
        fill="url(#statueGrad)"
        stroke="#B45309"
        strokeWidth="1"
      />

      {/* Head/Shoulders */}
      <circle cx="32" cy="11" r="3.5" fill="#D97706" stroke="#B45309" strokeWidth="1" />
      <path d="M28 14C28 14 30 12.5 32 12.5C34 12.5 36 14 36 14" stroke="#B45309" strokeWidth="1.5" />

      {/* Drapes / Robe lines */}
      <path d="M30 16V40M34 16V40" stroke="#78350F" strokeWidth="1" />

      <defs>
        <linearGradient id="statueGrad" x1="26" y1="29" x2="38" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D97706" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 7. Temple Bell & Diya (Temples / Interest)
export function TempleBellIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-amber-500 transition-transform duration-300 ${className}`}
    >
      {/* Hanging Chain & Bell Group */}
      <g className="animate-swing">
        {/* Support chain */}
        <line x1="32" y1="2" x2="32" y2="16" stroke="#D97706" strokeWidth="2" strokeDasharray="3 2" />
        
        {/* Hook */}
        <circle cx="32" cy="18" r="2.5" fill="none" stroke="#D97706" strokeWidth="1.5" />
        
        {/* Bell Shape */}
        <path
          d="M24 38C24 28 26 24 32 24C38 24 40 28 40 38H24Z"
          fill="url(#bellGrad)"
          stroke="#B45309"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Bell Rim */}
        <rect x="21" y="38" width="22" height="3" rx="1.5" fill="#D97706" stroke="#B45309" strokeWidth="1" />
        {/* Clapper */}
        <circle cx="32" cy="43" r="2" fill="#B45309" />
      </g>

      {/* Diya at the bottom */}
      <g transform="translate(0, 10)">
        {/* Diya base */}
        <path
          d="M20 42C20 42 22 47 32 47C42 47 44 42 44 42C44 42 40 42 32 42C24 42 20 42 20 42Z"
          fill="#92400E"
          stroke="#78350F"
          strokeWidth="1"
        />
        {/* Cotton Wick */}
        <line x1="32" y1="42" x2="32" y2="38" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        {/* Flickering Flame */}
        <path
          d="M32 38C30.5 35 32 30 32 30C32 30 33.5 35 32 38Z"
          fill="url(#flameGrad)"
          className="animate-flicker"
        />
      </g>

      <defs>
        <linearGradient id="bellGrad" x1="24" y1="31" x2="40" y2="31" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="30" y1="30" x2="34" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EF4444" />
          <stop offset="0.6" stopColor="#F97316" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 8. Taxi Service (Private cabs)
export function TaxiIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-sky-600 transition-transform duration-300 ${className}`}
    >
      {/* Moving Road Lines */}
      <line
        x1="8"
        y1="48"
        x2="56"
        y2="48"
        stroke="#64748B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 54H52"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeDasharray="8 6"
        strokeLinecap="round"
        className="animate-road-slide"
      />

      {/* Cab Body */}
      <path
        d="M14 42H50V36C50 32 46 30 42 28H22C18 30 14 32 14 36V42Z"
        fill="url(#cabBodyGrad)"
        stroke="#0284C7"
        strokeWidth="1.5"
      />
      {/* Windshield */}
      <path
        d="M23 29.5H41L45 35H19L23 29.5Z"
        fill="#E0F2FE"
        stroke="#0284C7"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Headlights */}
      <circle cx="18" cy="39" r="2" fill="#FBBF24" />
      <circle cx="46" cy="39" r="2" fill="#FBBF24" />

      {/* Wheels */}
      <circle cx="20" cy="46" r="4.5" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
      <circle cx="20" cy="46" r="2" fill="#94A3B8" />
      
      <circle cx="44" cy="46" r="4.5" fill="#1E293B" stroke="#0284C7" strokeWidth="1" />
      <circle cx="44" cy="46" r="2" fill="#94A3B8" />

      {/* TAXI Roof Sign */}
      <rect x="27" y="24" width="10" height="4" rx="1" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />

      <defs>
        <linearGradient id="cabBodyGrad" x1="14" y1="35" x2="50" y2="35" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.5" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 9. Stepwell Heritage (Heritage / Interest)
export function StepwellHeritageIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-stone-700 transition-transform duration-300 ${className}`}
    >
      {/* Sun/Spiritual Mandala in the archway */}
      <circle
        cx="32"
        cy="24"
        r="8"
        className="stroke-amber-500/30 animate-spin-slow"
        strokeWidth="1.5"
        strokeDasharray="4 2"
      />

      {/* Outer Arch */}
      <path
        d="M14 56V26C14 16 22 10 32 10C42 10 50 16 50 26V56"
        stroke="#78716C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner Arch */}
      <path
        d="M18 56V28C18 20 24 15 32 15C40 15 46 20 46 28V56"
        stroke="#A8A29E"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Heritage Stepwell Descending Steps */}
      <path
        d="M20 56H44V50H38V44H32V38H26L20 44V56Z"
        fill="url(#stepGrad)"
        stroke="#57534E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Floating lanterns/light dust */}
      <g className="animate-float-slow">
        <circle cx="28" cy="20" r="1.5" fill="#F59E0B" />
        <circle cx="36" cy="18" r="1.2" fill="#F59E0B" style={{ animationDelay: "1.5s" }} />
      </g>

      <defs>
        <linearGradient id="stepGrad" x1="20" y1="47" x2="44" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78716C" />
          <stop offset="0.5" stopColor="#A8A29E" />
          <stop offset="1" stopColor="#57534E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 10. Family Canopy (Families / Personas)
export function FamilyIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-rose-500 transition-transform duration-300 ${className}`}
    >
      {/* Expanding Canopy/Tree of protection */}
      <path
        d="M12 32C12 20.9 20.9 12 32 12C43.1 12 52 20.9 52 32"
        stroke="url(#canopyGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="animate-pulse-ring"
      />
      <circle cx="32" cy="12" r="1.5" fill="#FDA4AF" />

      {/* Umbrella / Canopy handle */}
      <line x1="32" y1="12" x2="32" y2="52" stroke="#FDA4AF" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Stylized Family silhouettes */}
      {/* Parent 1 (Left) */}
      <path
        d="M20 50C20 46 22 43 25 43C28 43 30 46 30 50"
        fill="#F43F5E"
        stroke="#E11D48"
        strokeWidth="1"
      />
      <circle cx="25" cy="39" r="2.5" fill="#F43F5E" />

      {/* Parent 2 (Right) */}
      <path
        d="M34 50C34 46 36 43 39 43C42 43 44 46 44 50"
        fill="#F43F5E"
        stroke="#E11D48"
        strokeWidth="1"
      />
      <circle cx="39" cy="39" r="2.5" fill="#F43F5E" />

      {/* Child in the middle (Smaller) */}
      <path
        d="M29 50C29 47.5 30.5 45.5 32 45.5C33.5 45.5 35 47.5 35 50"
        fill="#FDA4AF"
        stroke="#F43F5E"
        strokeWidth="1"
      />
      <circle cx="32" cy="42" r="1.8" fill="#FDA4AF" />

      <defs>
        <linearGradient id="canopyGrad" x1="12" y1="22" x2="52" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="0.5" stopColor="#FB7185" />
          <stop offset="1" stopColor="#FDA4AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 11. Support / Seniors Ease of Access (Seniors / Personas)
export function SeniorsIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-teal-600 transition-transform duration-300 ${className}`}
    >
      {/* Supporting Path */}
      <path
        d="M8 52C20 52 24 44 36 44C48 44 52 52 56 52"
        stroke="url(#pathGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Ease/Comfort Stepping Stones */}
      <circle cx="16" cy="52" r="2" fill="#0D9488" />
      <circle cx="28" cy="47" r="2" fill="#0D9488" />
      <circle cx="40" cy="45" r="2" fill="#0D9488" />
      <circle cx="50" cy="50" r="2" fill="#0D9488" />

      {/* Supportive Glowing Lantern/Sun (giving safe guidance) */}
      <g className="animate-float-slow">
        {/* Lantern Hook */}
        <path d="M32 14V22" stroke="#0D9488" strokeWidth="1.5" />
        {/* Lantern Body */}
        <rect x="28" y="22" width="8" height="10" rx="2" fill="#FFF" stroke="#0D9488" strokeWidth="1.5" />
        {/* Glowing bulb inside */}
        <circle cx="32" cy="27" r="2.5" fill="#FBBF24" className="animate-flicker" />
      </g>

      {/* Light Rays */}
      <line x1="24" y1="27" x2="21" y2="27" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 1" />
      <line x1="40" y1="27" x2="43" y2="27" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 1" />
      <line x1="32" y1="36" x2="32" y2="39" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 1" />

      <defs>
        <linearGradient id="pathGrad" x1="8" y1="48" x2="56" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0D9488" />
          <stop offset="0.5" stopColor="#5EEAD4" />
          <stop offset="1" stopColor="#0D9488" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 12. Groups & Satsang Mandal (Groups / Personas)
export function GroupsIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-amber-600 transition-transform duration-300 ${className}`}
    >
      {/* Circle of Unity / Satsang Group */}
      <circle cx="32" cy="32" r="22" stroke="#D97706" strokeWidth="1.5" strokeDasharray="5 3" className="animate-spin-slow" />

      {/* People heads around the circle */}
      <circle cx="32" cy="10" r="3.5" fill="#D97706" />
      <circle cx="54" cy="32" r="3.5" fill="#D97706" />
      <circle cx="32" cy="54" r="3.5" fill="#D97706" />
      <circle cx="10" cy="32" r="3.5" fill="#D97706" />

      {/* Diagonal heads */}
      <circle cx="48" cy="16" r="3" fill="#F59E0B" />
      <circle cx="48" cy="48" r="3" fill="#F59E0B" />
      <circle cx="16" cy="48" r="3" fill="#F59E0B" />
      <circle cx="16" cy="16" r="3" fill="#F59E0B" />

      {/* Satsang / Central Sacred Flame (Yajna / Diya) */}
      <g transform="translate(0, -3)">
        <path
          d="M26 38C26 38 28 41 32 41C36 41 38 38 38 38H26Z"
          fill="#B45309"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        {/* Expanding Sacred Flame */}
        <path
          d="M32 38C30 35 32 29 32 29C32 29 34 35 32 38Z"
          fill="url(#fireGrad)"
          className="animate-flicker"
        />
      </g>

      <defs>
        <linearGradient id="fireGrad" x1="30" y1="29" x2="34" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.6" stopColor="#EA580C" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 13. NRI & International (Global Travel)
export function NriGlobeIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-cyan-600 transition-transform duration-300 ${className}`}
    >
      {/* Globe Grid lines */}
      <circle cx="32" cy="32" r="20" stroke="#0891B2" strokeWidth="1.5" />
      {/* Horizontal Latitude */}
      <path d="M12 32H52" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M14.5 22H49.5" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M14.5 42H49.5" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.4" />
      
      {/* Vertical Longitude curve */}
      <path d="M32 12C36 18 36 46 32 52" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M32 12C28 18 28 46 32 52" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.5" />

      {/* Orbiting Plane ring */}
      <ellipse cx="32" cy="32" rx="25" ry="9" stroke="#0891B2" strokeWidth="1" strokeDasharray="3 3" transform="rotate(-20 32 32)" />

      {/* Orbit plane position (Using a rotating group) */}
      <g className="animate-orbit" style={{ transformOrigin: "32px 32px" }}>
        {/* Plane element (Offsets plane to circle radius) */}
        <g transform="translate(32, 6) rotate(60)">
          {/* Stylized Airplane */}
          <path
            d="M-5 -2L0 -8L5 -2L1 -1L0 4L-1 -1L-5 -2Z"
            fill="#EF4444"
            stroke="#DC2626"
            strokeWidth="0.75"
          />
        </g>
      </g>
    </svg>
  );
}

// 14. Default Sacred Kalash (Fallback for general pilgrimage/temple circuits)
export function DefaultCircuitIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-amber-500 transition-transform duration-300 ${className}`}
    >
      {/* Sacred Halo */}
      <circle cx="32" cy="30" r="16" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="3 2" className="animate-spin-slow" />

      {/* Coconut Leaves */}
      <path d="M32 20C28 12 18 16 18 16C18 16 26 22 32 20Z" fill="#059669" stroke="#047857" strokeWidth="0.5" />
      <path d="M32 20C36 12 46 16 46 16C46 16 38 22 32 20Z" fill="#059669" stroke="#047857" strokeWidth="0.5" />
      <path d="M32 20V10" stroke="#047857" strokeWidth="1.5" />

      {/* Coconut Top */}
      <path d="M27 20C27 16 37 16 37 20H27Z" fill="#78350F" />

      {/* Kalash (Holy Pot) */}
      <path
        d="M20 34C20 28 24 24 32 24C40 24 44 28 44 34C44 44 38 48 32 48C26 48 20 44 20 34Z"
        fill="url(#kalashGrad)"
        stroke="#B45309"
        strokeWidth="1.5"
      />
      {/* Kalash Neck Ring */}
      <rect x="23" y="24" width="18" height="2" fill="#D97706" stroke="#B45309" strokeWidth="1" />
      
      {/* Swastika/Decorative line on pot */}
      <path d="M28 34H36M32 30V38" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />

      <defs>
        <linearGradient id="kalashGrad" x1="20" y1="36" x2="44" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 15. Default Destination (Fallback for destinations / other links)
export function DefaultDestinationIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 text-slate-600 transition-transform duration-300 ${className}`}
    >
      {/* Compass grid backing */}
      <circle cx="32" cy="32" r="22" stroke="#E2E8F0" strokeWidth="1" />

      {/* Folder Map */}
      <path
        d="M12 44L24 38L40 44L52 38V16L40 22L24 16L12 22V44Z"
        fill="url(#mapGrad)"
        stroke="#475569"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Map Folds */}
      <path d="M24 16V38M40 22V44" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Location Pin (Pulsing) */}
      <g className="animate-float-slow">
        <path
          d="M32 18C29 18 27 20 27 23C27 27 32 32 32 32C32 32 37 27 37 23C37 20 35 18 32 18Z"
          fill="#EF4444"
          stroke="#B91C1C"
          strokeWidth="1"
        />
        <circle cx="32" cy="22" r="1.5" fill="#FFF" />
      </g>

      <defs>
        <linearGradient id="mapGrad" x1="12" y1="30" x2="52" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1F5F9" />
          <stop offset="0.5" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 16. Dynamic Icon Mapper
interface DynamicIconProps {
  slug: string;
  className?: string;
  defaultType?: "circuit" | "destination" | "interest" | "persona";
}

export function DynamicIcon({ slug, className = "", defaultType = "circuit" }: DynamicIconProps) {
  const normSlug = slug.toLowerCase();
  
  // Specific page/slug checks
  if (normSlug === "somnath-dwarka-tour-package") {
    return <TempleYatraIcon className={className} />;
  }
  if (normSlug.includes("gir") || normSlug.includes("wildlife")) {
    return <LionForestIcon className={className} />;
  }
  if (normSlug.includes("gujarat-tour") || normSlug.includes("gujarat-spiritual")) {
    return <GujaratCompassIcon className={className} />;
  }
  if (normSlug.includes("ambaji")) {
    return <MountainTempleIcon className={className} />;
  }
  if (normSlug.includes("kutch")) {
    return <DesertMoonIcon className={className} />;
  }
  if (normSlug.includes("unity")) {
    return <StatueUnityIcon className={className} />;
  }
  if (normSlug.includes("taxi") || normSlug.includes("cab")) {
    return <TaxiIcon className={className} />;
  }
  if (normSlug.includes("heritage")) {
    return <StepwellHeritageIcon className={className} />;
  }
  if (normSlug.includes("temple")) {
    return <TempleBellIcon className={className} />;
  }
  if (normSlug.includes("family")) {
    return <FamilyIcon className={className} />;
  }
  if (normSlug.includes("senior")) {
    return <SeniorsIcon className={className} />;
  }
  if (normSlug.includes("group") || normSlug.includes("satsang")) {
    return <GroupsIcon className={className} />;
  }
  if (normSlug.includes("nri") || normSlug.includes("international")) {
    return <NriGlobeIcon className={className} />;
  }

  // Fallbacks by type
  if (defaultType === "circuit" || defaultType === "persona") {
    return <DefaultCircuitIcon className={className} />;
  }
  return <DefaultDestinationIcon className={className} />;
}
