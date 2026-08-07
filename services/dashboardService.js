import BASE_URL from "@/utils/api";

export async function getProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
