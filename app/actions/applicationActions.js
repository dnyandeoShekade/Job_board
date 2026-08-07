import BASE_URL from "@/utils/api";

export async function submitApplication(applicationData) {
  const response = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicationData),
  });

  return await response.json();
}

export async function getUserApplications(userId, token) {
  const response = await fetch(`${BASE_URL}/applications/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return await response.json();
}

export async function getAllApplications(token) {
  const response = await fetch(`${BASE_URL}/applications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return await response.json();
}

export async function updateApplicationStatus(applicationId, status, token) {
  const response = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  return await response.json();
}
