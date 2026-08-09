import BASE_URL from "@/utils/api";
import { cookies } from "next/headers";

// export async function getJobs() {
//   const cookieStore = await cookies();
//   const cookieHeader = cookieStore
//     .getAll()
//     .map((cookie) => `${cookie.name}=${cookie.value}`)
//     .join("; ");

//   const response = await fetch(`${BASE_URL}/jobs`, {
//     headers: cookieHeader ? { Cookie: cookieHeader } : {},
//     cache: "no-store",
//   });

//   return response.json();
// }
export async function getJobs() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "GET",
    headers: cookieHeader
      ? {
          Cookie: cookieHeader,
        }
      : {},
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
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
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
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "GET",
    headers: cookieHeader
      ? {
          Cookie: cookieHeader,
        }
      : {},
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch job");
  }

  return data;
}

export async function updateJob(id, jobData) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update job");
  }

  return data;
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
export async function deleteJob(slug) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const response = await fetch(`${BASE_URL}/jobs/${slug}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete job");
  }

  return data;
}