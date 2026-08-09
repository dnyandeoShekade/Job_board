"use server";

import { getDashboard } from "@/services/dashboardService";

export async function getDashboardData() {
  try {
    const result = await getDashboard();

    return {
      success: result.success,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);

    return {
      success: false,
      data: null,
      message: error.message || "Failed to load dashboard",
    };
  }
}