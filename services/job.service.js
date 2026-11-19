import { apiClient } from "./apiClient";

export async function getJobs({
  page = 1,
  limit = 10,
  keyword = "",
  location = "",
  category = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    keyword,
    location,
    category,
  });

  return apiClient(`/jobs?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });
}
export async function getJobBySlug(slug) {
  return apiClient(`/jobs/${slug}`, {
    method: "GET",
    cache: "no-store",
  });
}

export async function getJobById(id) {
  return apiClient(`/jobs/${id}`, {
    method: "GET",
    cache: "no-store",
  });
}

export async function createJob(jobData) {
  return apiClient("/jobs", {
    method: "POST",
    body: JSON.stringify(jobData),
  });
}

export async function updateJob(id, jobData) {
  return apiClient(`/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(jobData),
  });
}

export async function deleteJob(id) {
  return apiClient(`/jobs/${id}`, {
    method: "DELETE",
  });
}

export async function getJobApplicationData(slug) {
  return apiClient(`/jobs/${slug}/apply`, {
    method: "GET",
    cache: "no-store",
  });
}