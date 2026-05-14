import { NextResponse } from "next/server";
import { getAllAdminDashboardDataServices } from "@/src/services/admin/dashboardServices";

export async function getAllAdminDashboardData() {
    
  try {
    const dashboardCounts = await getAllAdminDashboardDataServices();

    console.log(dashboardCounts);

    return NextResponse.json(
      {
        success: true,
        data: dashboardCounts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error Mesage", error);
    return NextResponse.json(
      {
        success: false,
        message: "failed to get dashboard data. There Are Some Errors",
      },
      { status: 500 },
    );
  }
}
