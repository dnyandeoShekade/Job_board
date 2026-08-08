"use server";

import { getDashboard } from "@/services/dashboardService";

export async function getDashboardData() {
  try {
    const result = await getDashboard();

    if (!result.success) {
      return {
        success: false,
        data: null,
        message: result.message || "Failed to load dashboard",
      };
    }

    // Backend returns: { success: true, data: { user, stats, recentApplications, quickActions } }
    // Extract the nested data structure
    const dashboardData = result.data || {};
    const stats = dashboardData.stats || {};

    return {
      success: true,
      data: {
        totalApplications: stats.totalApplications || 0,
        savedJobs: stats.savedJobs || 0,
        reviewed: stats.reviewed || 0,
        selected: stats.selected || 0,
        rejected: stats.rejected || 0,
        user: dashboardData.user,
        recentApplications: dashboardData.recentApplications || [],
        quickActions: dashboardData.quickActions || [],
      },
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