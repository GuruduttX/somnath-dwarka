"use client";

import {
    LayoutDashboard,
    FileText,
    Package,
    Users,
    Settings,
    LogOutIcon,
    Hotel,
    Car,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menu = [
    { name: "Dashboard", icon: LayoutDashboard, slug: "/admin-x9AqP7mK2" },
    { name: "Blogs", icon: FileText, slug: "/admin-x9AqP7mK2/blogs" },
    { name: "Pooja", icon: Package, slug: "/admin-x9AqP7mK2/pooja" },
    { name: "Hotels", icon: Hotel, slug: "/admin-x9AqP7mK2/hotels" },
    { name: "Taxi", icon: Car, slug: "/admin-x9AqP7mK2/taxi" },
    { name: "Packages", icon: Package, slug: "/admin-x9AqP7mK2/packages" },
];

export default function Sidebar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const router = useRouter();

    return (
        <aside
            className={`fixed top-0 left-0 h-full w-64 z-50
      bg-[#1e0d14] border-r border-pink-900/40
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Logo */}
            <div className="border-b border-pink-900/40">
                <div className="p-2  bg-white rounded-full m-3">
                    <img
                        src="/images/Experience_my_India.webp"
                        className="h-10"
                    />
                </div>
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-2">
                {menu.map((item) => (
                    <Link key={item.name} href={item.slug} onClick={onClose}>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-lg
              text-pink-300 hover:bg-pink-900/30 cursor-pointer transition">
                            <item.icon size={18} />
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}

                {/* Logout */}
                <button
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
          text-red-400 hover:bg-red-900/30 transition"
                >
                    <LogOutIcon size={18} />
                    Logout
                </button>
            </nav>
        </aside>
    );
}