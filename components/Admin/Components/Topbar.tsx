"use client";

import { Bell, Mail, Menu } from "lucide-react";

export default function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50
      bg-[#1e0d14] border-b border-pink-900/40
      px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-pink-300 cursor-pointer">
          <Menu />
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="bg-pink-950/40 px-4 py-2 rounded-lg outline-none text-pink-200 text-sm"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 text-pink-300">
        <Mail />
        <Bell />

        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm">Admin</span>
        </div>
      </div>
    </header>
  );
}