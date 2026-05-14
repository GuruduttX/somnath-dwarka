"use client"

import { useState, useRef, useEffect } from "react"

export const COUNTRY_CODES = [
  { name: "India",          flag: "🇮🇳", dial: "+91"  },
  { name: "Afghanistan",    flag: "🇦🇫", dial: "+93"  },
  { name: "Albania",        flag: "🇦🇱", dial: "+355" },
  { name: "Algeria",        flag: "🇩🇿", dial: "+213" },
  { name: "Argentina",      flag: "🇦🇷", dial: "+54"  },
  { name: "Australia",      flag: "🇦🇺", dial: "+61"  },
  { name: "Austria",        flag: "🇦🇹", dial: "+43"  },
  { name: "Bahrain",        flag: "🇧🇭", dial: "+973" },
  { name: "Bangladesh",     flag: "🇧🇩", dial: "+880" },
  { name: "Belgium",        flag: "🇧🇪", dial: "+32"  },
  { name: "Brazil",         flag: "🇧🇷", dial: "+55"  },
  { name: "Canada",         flag: "🇨🇦", dial: "+1"   },
  { name: "Chile",          flag: "🇨🇱", dial: "+56"  },
  { name: "China",          flag: "🇨🇳", dial: "+86"  },
  { name: "Colombia",       flag: "🇨🇴", dial: "+57"  },
  { name: "Czech Republic", flag: "🇨🇿", dial: "+420" },
  { name: "Denmark",        flag: "🇩🇰", dial: "+45"  },
  { name: "Egypt",          flag: "🇪🇬", dial: "+20"  },
  { name: "Finland",        flag: "🇫🇮", dial: "+358" },
  { name: "France",         flag: "🇫🇷", dial: "+33"  },
  { name: "Germany",        flag: "🇩🇪", dial: "+49"  },
  { name: "Ghana",          flag: "🇬🇭", dial: "+233" },
  { name: "Greece",         flag: "🇬🇷", dial: "+30"  },
  { name: "Hong Kong",      flag: "🇭🇰", dial: "+852" },
  { name: "Hungary",        flag: "🇭🇺", dial: "+36"  },
  { name: "Indonesia",      flag: "🇮🇩", dial: "+62"  },
  { name: "Iran",           flag: "🇮🇷", dial: "+98"  },
  { name: "Iraq",           flag: "🇮🇶", dial: "+964" },
  { name: "Ireland",        flag: "🇮🇪", dial: "+353" },
  { name: "Israel",         flag: "🇮🇱", dial: "+972" },
  { name: "Italy",          flag: "🇮🇹", dial: "+39"  },
  { name: "Japan",          flag: "🇯🇵", dial: "+81"  },
  { name: "Jordan",         flag: "🇯🇴", dial: "+962" },
  { name: "Kenya",          flag: "🇰🇪", dial: "+254" },
  { name: "Kuwait",         flag: "🇰🇼", dial: "+965" },
  { name: "Lebanon",        flag: "🇱🇧", dial: "+961" },
  { name: "Malaysia",       flag: "🇲🇾", dial: "+60"  },
  { name: "Mexico",         flag: "🇲🇽", dial: "+52"  },
  { name: "Morocco",        flag: "🇲🇦", dial: "+212" },
  { name: "Myanmar",        flag: "🇲🇲", dial: "+95"  },
  { name: "Nepal",          flag: "🇳🇵", dial: "+977" },
  { name: "Netherlands",    flag: "🇳🇱", dial: "+31"  },
  { name: "New Zealand",    flag: "🇳🇿", dial: "+64"  },
  { name: "Nigeria",        flag: "🇳🇬", dial: "+234" },
  { name: "Norway",         flag: "🇳🇴", dial: "+47"  },
  { name: "Oman",           flag: "🇴🇲", dial: "+968" },
  { name: "Pakistan",       flag: "🇵🇰", dial: "+92"  },
  { name: "Philippines",    flag: "🇵🇭", dial: "+63"  },
  { name: "Poland",         flag: "🇵🇱", dial: "+48"  },
  { name: "Portugal",       flag: "🇵🇹", dial: "+351" },
  { name: "Qatar",          flag: "🇶🇦", dial: "+974" },
  { name: "Romania",        flag: "🇷🇴", dial: "+40"  },
  { name: "Russia",         flag: "🇷🇺", dial: "+7"   },
  { name: "Saudi Arabia",   flag: "🇸🇦", dial: "+966" },
  { name: "Singapore",      flag: "🇸🇬", dial: "+65"  },
  { name: "South Africa",   flag: "🇿🇦", dial: "+27"  },
  { name: "South Korea",    flag: "🇰🇷", dial: "+82"  },
  { name: "Spain",          flag: "🇪🇸", dial: "+34"  },
  { name: "Sri Lanka",      flag: "🇱🇰", dial: "+94"  },
  { name: "Sweden",         flag: "🇸🇪", dial: "+46"  },
  { name: "Switzerland",    flag: "🇨🇭", dial: "+41"  },
  { name: "Taiwan",         flag: "🇹🇼", dial: "+886" },
  { name: "Tanzania",       flag: "🇹🇿", dial: "+255" },
  { name: "Thailand",       flag: "🇹🇭", dial: "+66"  },
  { name: "Turkey",         flag: "🇹🇷", dial: "+90"  },
  { name: "UAE",            flag: "🇦🇪", dial: "+971" },
  { name: "Uganda",         flag: "🇺🇬", dial: "+256" },
  { name: "Ukraine",        flag: "🇺🇦", dial: "+380" },
  { name: "United Kingdom", flag: "🇬🇧", dial: "+44"  },
  { name: "United States",  flag: "🇺🇸", dial: "+1"   },
  { name: "Vietnam",        flag: "🇻🇳", dial: "+84"  },
  { name: "Yemen",          flag: "🇾🇪", dial: "+967" },
  { name: "Zimbabwe",       flag: "🇿🇼", dial: "+263" },
]

export function CountryCodeSelector({
  value,
  onChange,
  btnClassName,
}: {
  value: string
  onChange: (dial: string) => void
  btnClassName?: string
}) {
  const [open, setOpen]     = useState(false)
  const [search, setSearch] = useState("")
  const ref = useRef<HTMLDivElement>(null)
  const selected = COUNTRY_CODES.find(c => c.dial === value) ?? COUNTRY_CODES[0]

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(
        c =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search)
      )
    : COUNTRY_CODES

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        type="button"
        className={btnClassName}
        onClick={() => { setOpen(o => !o); setSearch("") }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span style={{ fontSize: 16 }}>{selected.flag}</span>
        <span>{selected.dial}</span>
        <span style={{ fontSize: 9, opacity: 0.5, marginLeft: 1 }}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 9999,
            background: "#fff",
            border: "1.5px solid #E8D5B7",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
            minWidth: 230,
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "8px 10px", borderBottom: "1px solid #EEE4D4" }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              style={{
                width: "100%",
                border: "1px solid #E8D5B7",
                borderRadius: 8,
                padding: "6px 10px",
                fontSize: 12,
                outline: "none",
                background: "#FEFCF9",
                color: "#2D1A0E",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "12px 14px", fontSize: 13, color: "#A0836A", textAlign: "center" }}>
                No countries found
              </div>
            ) : (
              filtered.map(c => (
                <div
                  key={c.name}
                  role="option"
                  aria-selected={c.dial === value}
                  onMouseDown={() => { onChange(c.dial); setOpen(false); setSearch("") }}
                  style={{
                    padding: "9px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: c.dial === value ? "#FFF4E6" : "transparent",
                    fontSize: 13,
                    color: "#2D1A0E",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FAF0E0" }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c.dial === value ? "#FFF4E6" : "transparent" }}
                >
                  <span style={{ fontSize: 18, lineHeight: "1" }}>{c.flag}</span>
                  <span style={{ flex: 1 }}>{c.name}</span>
                  <span style={{ color: "#A0836A", fontWeight: 600, fontSize: 12 }}>{c.dial}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
