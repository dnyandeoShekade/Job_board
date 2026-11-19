import { apiClient } from "./apiClient";

export async function getCategories() {
  return apiClient("/jobs/categories", {
    method: "GET",
    cache: "no-store",
  });
}