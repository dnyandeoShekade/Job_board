// ==========================================
// FILE 1: @/services/jobService.js (or Actions file)
// ==========================================
"use server";

import { JOBS_DATA } from "@/data/jobs";
import { JOB_DETAILS } from "@/data/jobDetails";
import {
  DASHBOARD_DATA,
  ALL_APPLICATIONS,
  PROFILE_DATA,
  RESUME_DATA,
  SAVED_JOBS_DATA,
  JOB_ALERTS_DATA,
  SETTINGS_DATA,
} from "@/data/dashboardData";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Helper: Create response
const createResponse = (success, data, error = null) => ({
  success,
  data,
  error,
});

// Helper: Validate string
const isValid = (str) => typeof str === "string" && str.trim().length > 0;

/**
 * Get all jobs
 */
export async function getJobsData() {
  try {
    return createResponse(true, JOBS_DATA, null);
  } catch (error) {
    console.error("getJobsData error:", error);
    return createResponse(false, null, "Failed to fetch jobs");
  }
}

/**
 * Get filtered jobs
 */
export async function getFilteredJobs(filters = {}) {
  try {
    let jobs = [...JOBS_DATA];

    if (filters.location && filters.location !== "All Locations") {
      jobs = jobs.filter((job) => job.location?.includes(filters.location));
    }

    if (filters.category && filters.category !== "All Categories") {
      jobs = jobs.filter((job) =>
        job.tags?.some((tag) => tag.label === filters.category),
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase().trim();
      jobs = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query),
      );
    }

    return createResponse(true, jobs, null);
  } catch (error) {
    console.error("getFilteredJobs error:", error);
    return createResponse(false, null, "Failed to filter jobs");
  }
}

/**
 * Get job by slug
 */
export async function getJobBySlug(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${slug}`,
      {
        cache: "no-store",
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch job",
    };
  }
}

/**
 * Get dashboard data
 */
// export async function getDashboardData() {
//   try {
//     return createResponse(true, DASHBOARD_DATA, null);
//   } catch (error) {
//     console.error("getDashboardData error:", error);
//     return createResponse(false, null, "Failed to fetch dashboard data");
//   }
// }

export async function getDashboardData() {
  try {
    return createResponse(true, DASHBOARD_DATA, null);
  } catch (error) {
    console.error("getDashboardData error:", error);
    return createResponse(false, null, "Failed to fetch dashboard data");
  }
}
/**
 * Get all applications
 */
export async function getAllApplications() {
  try {
    return createResponse(true, ALL_APPLICATIONS, null);
  } catch (error) {
    console.error("getAllApplications error:", error);
    return createResponse(false, null, "Failed to fetch applications");
  }
}

/**
 * Get profile data
 */
export async function getProfileData() {
  try {
    return createResponse(true, PROFILE_DATA, null);
  } catch (error) {
    console.error("getProfileData error:", error);
    return createResponse(false, null, "Failed to fetch profile data");
  }
}

/**
 * Get resume data
 */
export async function getResumeData() {
  try {
    return createResponse(true, RESUME_DATA, null);
  } catch (error) {
    console.error("getResumeData error:", error);
    return createResponse(false, null, "Failed to fetch resume data");
  }
}

/**
 * Get saved jobs data
 */
export async function getSavedJobsData() {
  try {
    return createResponse(true, SAVED_JOBS_DATA, null);
  } catch (error) {
    console.error("getSavedJobsData error:", error);
    return createResponse(false, null, "Failed to fetch saved jobs");
  }
}

/**
 * Get job alerts data
 */
export async function getJobAlertsData() {
  try {
    return createResponse(true, JOB_ALERTS_DATA, null);
  } catch (error) {
    console.error("getJobAlertsData error:", error);
    return createResponse(false, null, "Failed to fetch job alerts");
  }
}

/**
 * Get settings data
 */
export async function getSettingsData() {
  try {
    return createResponse(true, SETTINGS_DATA, null);
  } catch (error) {
    console.error("getSettingsData error:", error);
    return createResponse(false, null, "Failed to fetch settings");
  }
}
