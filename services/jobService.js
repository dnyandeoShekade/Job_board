import BASE_URL from "@/utils/api";

export async function getJobs() {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch jobs");
  }

  return data;
}

export async function getJobBySlug(slug) {
  const response = await fetch(`${BASE_URL}/jobs/${slug}`, {
    cache: "no-store",
  });

  return response.json();
}

export async function getJobApplication(slug) {
  const response = await fetch(`${BASE_URL}/jobs/${slug}/apply`, {
    cache: "no-store",
  });

  return response.json();
}

export async function createJob(jobData) {
  // This is server-side, token needs to be passed from client
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create job");
  }

  return data;
}

export async function getJobById(id) {
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch job");
  }

  return data;
}

export async function updateJob(id, jobData) {
  // This is server-side, token needs to be passed from client
  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update job");
  }

  return data;
}

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

export async function deleteJob(slug) {
  // This is server-side, token needs to be passed from client
  const response = await fetch(`${BASE_URL}/jobs/${slug}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete job");
  }

  return data;
}