"use client";

import { Menu } from "lucide-react";

export default function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50
      bg-[#0b1220] border-b border-blue-900/40
      px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-blue-300 cursor-pointer">
          <Menu />
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="bg-blue-950/40 px-4 py-2 rounded-lg outline-none text-blue-200 text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 text-blue-300">
        <span className="text-sm">Admin</span>
      </div>
    </header>
  );
}