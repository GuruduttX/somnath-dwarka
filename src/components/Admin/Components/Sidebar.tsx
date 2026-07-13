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
    { name: "Packages", icon: Package, slug: "/admin-x9AqP7mK2/packages" },
    { name: "Content", icon: Settings, slug: "/admin-x9AqP7mK2/content" },
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
      bg-[#0b1220] border-r border-blue-900/40
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Logo */}
            <div className="border-b border-blue-900/40">
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
              text-blue-300 hover:bg-blue-900/30 cursor-pointer transition">
                            <item.icon size={18} />
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}

                {/* Logout */}
                <button
                    onClick={async () => {
                        await fetch("/api/auth/logout", { method: "POST" });
                        router.push("/x9AqP7mK2-login");
                        router.refresh();
                    }}
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