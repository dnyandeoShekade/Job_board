import { apiClient } from "./apiClient";

/**
 * Formats a single application object for dashboard display
 * Extracts and reformats relevant fields from the application data
 */
export function formatApplication(application) {
  if (!application) return application;

  return {
    id: application._id || application.id,
    fullName: application.fullName || application.name || "",
    email: application.email || "",
    jobTitle: application.jobTitle || application.position || "",
    status: application.status || application.applicationStatus || "pending",
    appliedDate: application.appliedDate || application.createdAt || "",
    resumeFile: application.resumeFile || application.resume || "",
    coverLetter: application.coverLetter || "",
  };
}

export async function submitApplication(applicationData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("fullName", applicationData.fullName);
  formData.append("email", applicationData.email);
  formData.append("phone", applicationData.phone);
  formData.append("coverLetter", applicationData.coverLetter || "");
  formData.append("jobId", applicationData.jobId);

  if (applicationData.resumeFile) {
    formData.append("resume", applicationData.resumeFile);
  }

  return apiClient("/applications/submit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function getMyApplications() {
  const token = localStorage.getItem("token");

  return apiClient("/applications/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

// Alias for getUserApplications - same functionality
export const getUserApplications = getMyApplications;

export async function getAllApplications() {
  const token = localStorage.getItem("token");

  return apiClient("/applications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

export async function updateApplicationStatus(applicationId, status) {
  const token = localStorage.getItem("token");

  return apiClient(`/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
}