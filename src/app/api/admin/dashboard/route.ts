import { NextResponse } from "next/server";
import { getAllAdminDashboardData } from "@/src/controllers/admin/dashboardControlles";
export async function GET() {
       try {
            return  await getAllAdminDashboardData();
       } catch (error) {
        return NextResponse.json({
            success: false,
        })
       }
}