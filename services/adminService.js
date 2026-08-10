import BASE_URL from "@/utils/api";

export async function getAdminDashboard() {
  // Since this is server-side, we can't access localStorage
  // The token should be passed from the client component
  const response = await fetch(`${BASE_URL}/dashboard/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error(data.message || "Admin dashboard API failed");
  }

  return data;
}
