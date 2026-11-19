"use server";

import { getJobs, deleteJob, updateJob } from "@/services/job.service";

export async function getManageJobsData() {
  try {
    const result = await getJobs({
      page: 1,
      limit: 100,
    });

    return {
      success: result.success ?? true,
      data: result.data,
      message: result.message ?? "Jobs loaded successfully",
    };
  } catch (error) {
    console.error("MANAGE JOBS ERROR:", error);

    return {
      success: false,
      data: null,
      message: error.message || "Failed to load jobs",
    };
  }
}
