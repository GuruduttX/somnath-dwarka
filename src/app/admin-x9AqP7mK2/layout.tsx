import DashboardLayout from "@/src/components/Admin/Components/DashboardLayout";
import { Toaster } from "react-hot-toast";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#020617]">
            <DashboardLayout>{children}</DashboardLayout>
            <Toaster />
        </div>
    );
}
