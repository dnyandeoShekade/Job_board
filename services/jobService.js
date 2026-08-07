import BASE_URL from "@/utils/api";

export async function getJobs() {
  const response = await fetch(`${BASE_URL}/jobs`, {
    cache: "no-store",
  });

  return response.json();
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
