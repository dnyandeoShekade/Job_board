

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
    const response = await fetch("http://localhost:5000/api/applications", {
      method: "GET",
      credentials: "include",
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
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      credentials: "include",
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
