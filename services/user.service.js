import { apiClient } from "./apiClient";

export async function getProfile() {
  const token = localStorage.getItem("token");

  return apiClient("/users/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}

export async function updateProfile(userData) {
  const token = localStorage.getItem("token");

  return apiClient("/users/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
}

export async function getUsers() {
  const token = localStorage.getItem("token");

  return apiClient("/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
}