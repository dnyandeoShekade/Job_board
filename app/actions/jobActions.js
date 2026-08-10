

"use server";

import { getJobs } from "@/services/jobService";

export async function getManageJobsData() {
  try {
    const result = await getJobs();

    return {
      success: true,
      data: result.jobs || [],
    };
  } catch (error) {
    console.error("MANAGE JOBS ERROR:", error);

    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}


export async function createJobData(jobData) {
  try {
    const result = await createJob(jobData);

    return {
      success: true,
      data: result.job,
      message: result.message,
    };
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

// export async function getCategoriesData() {
//   try {
//     const { CATEGORIES_DATA } = await import("@/data/adminData");
//     return { success: true, data: CATEGORIES_DATA };
//   } catch (error) {
//     console.error("CATEGORIES ERROR:", error);
//     return {
//       success: false,
//       data: [],
//       message: error.message,
//     };
//   }
// }

export async function getJobByIdData(id) {
  try {
    const { getJobById } = await import("@/services/jobService");
    const result = await getJobById(id);

    return {
      success: true,
      data: result.job || result.data || result,
    };
  } catch (error) {
    console.error("GET JOB ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function updateJobData(slug, jobData) {
  try {
    // const { updateJob } = await import("@/services/jobService");
    const result = await updateJob(slug, jobData);

    return {
      success: true,
      data: result.job || result.job ,
      message: result.message || "Job updated successfully",
    };
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function getReportsData() {
  try {
    const { REPORTS_DATA } = await import("@/data/adminData");
    return { success: true, data: REPORTS_DATA };
  } catch (error) {
    console.error("REPORTS ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

// Get categories from backend
export async function getCategoriesData() {
  try {
    const result = await getCategories();

    return {
      success: true,
      data: result.categories || [],
    };
  } catch (error) {
    console.error("CATEGORIES ERROR:", error);

    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function getManageApplicationsData() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/applications`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      console.error("Backend API error - not returning JSON");
      return {
        success: false,
        data: [],
        message: "Backend API endpoint not found or returning HTML",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message: result.message || "Failed to fetch applications",
      };
    }

    return {
      success: true,
      data: result.applications || result.data || [],
    };
  } catch (error) {
    console.error("MANAGE APPLICATIONS ERROR:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function getUsersData() {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      console.error("Backend API error - not returning JSON");
      return {
        success: false,
        data: [],
        message: "Backend API endpoint not found or returning HTML",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message: result.message || "Failed to fetch users",
      };
    }

    return {
      success: true,
      data: result.users || result.data || [],
    };
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function getAdminSettingsData() {
  try {
    const { ADMIN_SETTINGS_DATA } = await import("@/data/adminData");
    return { success: true, data: ADMIN_SETTINGS_DATA };
  } catch (error) {
    console.error("ADMIN SETTINGS ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}
export async function deleteJobData(slug) {
  try {
    const { deleteJob } = await import("@/services/jobService");

    const result = await deleteJob(slug);

    return {
      success: true,
      message: result.message || "Job deleted successfully",
    };
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);

    return {
      success: false,
      message: error.message || "Failed to delete job",
    };
  }
}

export async function getJobAlertsData() {
  try {
    const { JOB_ALERTS_DATA } = await import("@/data/dashboardData");
    return { success: true, data: JOB_ALERTS_DATA };
  } catch (error) {
    console.error("JOB ALERTS ERROR:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function getProfileData() {
  try {
    const { PROFILE_DATA } = await import("@/data/dashboardData");
    return { success: true, data: PROFILE_DATA };
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function getResumeData() {
  try {
    const { RESUME_DATA } = await import("@/data/dashboardData");
    return { success: true, data: RESUME_DATA };
  } catch (error) {
    console.error("RESUME ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}

export async function getSavedJobsData() {
  try {
    const { SAVED_JOBS_DATA } = await import("@/data/dashboardData");
    return { success: true, data: SAVED_JOBS_DATA };
  } catch (error) {
    console.error("SAVED JOBS ERROR:", error);
    return {
      success: false,
      data: [],
      message: error.message,
    };
  }
}

export async function getSettingsData() {
  try {
    const { SETTINGS_DATA } = await import("@/data/dashboardData");
    return { success: true, data: SETTINGS_DATA };
  } catch (error) {
    console.error("SETTINGS ERROR:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
}
