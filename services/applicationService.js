import BASE_URL from "@/utils/api";

export const submitApplication = async (applicationData) => {
  const formData = new FormData();
  formData.append("fullName", applicationData.fullName);
  formData.append("email", applicationData.email);
  formData.append("phone", applicationData.phone);
  formData.append("coverLetter", applicationData.coverLetter || "");
  formData.append("jobId", applicationData.jobId);

  if (applicationData.resumeFile) {
    formData.append("resume", applicationData.resumeFile);
  }

  const response = await fetch(`${BASE_URL}/applications/submit`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }

  return await response.json();
};

export async function getUserApplications() {
  const response = await fetch(`${BASE_URL}/applications/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }

  return await response.json();
}
export const formatApplication = (application) => {
  const job = application.jobId;

  return {
    ...application,
    title: job?.title || "N/A",
    company: job?.company || "N/A",
    location: job?.location || "N/A",
    slug: job?.slug || "",
    type: "Full Time",
    appliedDate: application.createdAt
      ? new Date(application.createdAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A",
    logo: job?.company?.charAt(0)?.toUpperCase() || "J",
    logoColor: "#4F46E5",
  };
};