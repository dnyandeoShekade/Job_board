import BASE_URL from "@/utils/api";

export const logoutUser = async () => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
    }
    
    // Clear local storage regardless of API response
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    // Still clear local storage on error
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    throw error;
  }
};
