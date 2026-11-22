"use server";

import { getJobs, deleteJob, updateJob } from "@/services/job.service";
import { getCategories } from "@/services/category.service";
import { getUsers } from "@/services/user.service";

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

export async function getCategoriesData() {
  try {
    const result = await getCategories();

    return {
      success: result.success ?? true,
      data: result.data || [],
      message: result.message ?? "Categories loaded successfully",
    };
  } catch (error) {
    console.error("CATEGORIES ERROR:", error);

    return {
      success: false,
      data: null,
      message: error.message || "Failed to load categories",
    };
  }
}

export async function getUsersData() {
  try {
    const result = await getUsers();

    return {
      success: result.success ?? true,
      data: result.data || [],
      message: result.message ?? "Users loaded successfully",
    };
  } catch (error) {
    console.error("USERS ERROR:", error);

    return {
      success: false,
      data: null,
      message: error.message || "Failed to load users",
    };
  }
}
