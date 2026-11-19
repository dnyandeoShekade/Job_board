import { apiClient } from "./apiClient";

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