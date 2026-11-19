import { apiClient } from "./apiClient";

export async function getUserDashboard() {
  const token = localStorage.getItem("token");

  return apiClient("/dashboard/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

export async function getAdminDashboard() {
  const token = localStorage.getItem("token");

  return apiClient("/dashboard/admin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}