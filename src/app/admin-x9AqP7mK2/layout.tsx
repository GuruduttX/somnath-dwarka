import type { Metadata } from "next";
import DashboardLayout from "@/src/components/Admin/Components/DashboardLayout";
import { Toaster } from "react-hot-toast";

/**
 * The admin surface is disallowed in robots.txt, but a disallowed URL can still
 * be indexed from an inbound link — only a noindex tag removes it. The admin
 * pages are client components and cannot export metadata themselves, so the
 * tag is declared here and inherited by every route beneath.
 */
export const metadata: Metadata = {
    title: "Admin",
    robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#020617]">
            <DashboardLayout>{children}</DashboardLayout>
            <Toaster />
        </div>
    );
}
