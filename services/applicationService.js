import BASE_URL from "@/utils/api";

export const submitApplication = async (applicationData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const formData = new FormData();
  formData.append("fullName", applicationData.fullName);
  formData.append("email", applicationData.email);
  formData.append("phone", applicationData.phone);
  formData.append("coverLetter", applicationData.coverLetter || "");
  formData.append("jobId", applicationData.jobId);

  if (applicationData.resumeFile) {
    formData.append("resume", applicationData.resumeFile); // field name must match multer config
  }

  const response = await fetch(`${BASE_URL}/applications/submit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // ⚠️ Content-Type mat set karo — browser khud multipart boundary set karega
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${response.status}`);
  }

  return await response.json();
};
