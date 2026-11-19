import { apiClient } from "./apiClient";

/**
 * Evaluates a resume from raw text or structured object
 * @param {Object} payload { resume: string|object, jobDescription?: string, saveResult?: boolean }
 */
export async function evaluateResumeText({ resume, jobDescription = "", saveResult = true }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return apiClient("/resume/evaluate", {
    method: "POST",
    headers,
    body: JSON.stringify({
      resume,
      jobDescription,
      saveResult,
    }),
  });
}

/**
 * Evaluates an uploaded PDF resume file via Multer
 * @param {File} file PDF File
 * @param {string} jobDescription Optional target job description
 * @param {boolean} saveResult Whether to save to user history
 */
export async function evaluateResumeFile({ file, jobDescription = "", saveResult = true }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const formData = new FormData();
  formData.append("resume", file);
  if (jobDescription) {
    formData.append("jobDescription", jobDescription);
  }
  formData.append("saveResult", String(saveResult));

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return apiClient("/resume/evaluate-file", {
    method: "POST",
    headers,
    body: formData,
  });
}

/**
 * Calculates Job Match Score independently against a Job Description
 */
export async function calculateJobMatch({ resume, jobDescription }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return apiClient("/resume/job-match", {
    method: "POST",
    headers,
    body: JSON.stringify({ resume, jobDescription }),
  });
}

/**
 * Fetches current candidate's evaluation history
 */
export async function getMyEvaluations() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return { success: true, count: 0, data: [] };
  }

  return apiClient("/resume/my-evaluations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

/**
 * Fetches a single evaluation by ID
 */
export async function getEvaluationById(id) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return apiClient(`/resume/${id}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });
}
