"use server";

import {
  getJobs,
  getJobBySlug,
  getJobApplication,
} from "@/services/jobService";

// Get all jobs
export async function getJobsData() {
  try {
    const result = await getJobs();

    return {
      success: true,
      data: result.jobs,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
    };
  }
}

// Get single job by slug
export async function getJobBySlugData(slug) {
  try {
    const result = await getJobBySlug(slug);

    return result;
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: null,
    };
  }
}

// Get application page data
export async function getJobApplicationData(slug) {
  try {
    const result = await getJobApplication(slug);
    return result;
  } catch (error) {
    console.error("ERROR in getJobApplicationData:", error);
    return {
      success: false,
      data: null,
    };
  }
}
