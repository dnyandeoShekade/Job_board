import BASE_URL from "@/utils/api";

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
