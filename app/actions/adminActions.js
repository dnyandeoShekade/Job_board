"use server";

import { getAdminDashboard } from "@/services/adminService";

// import { getAdminDashboard } from "@/services/adminService";

export async function getAdminDashboardData() {
  try {
    const result = await getAdminDashboard();

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}