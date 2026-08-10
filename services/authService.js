import BASE_URL from "@/utils/api";

export const registerUser = async (userData) => {
  try {
    console.log("Attempting to register with URL:", `${BASE_URL}/auth/register`);
    console.log("User data:", userData);

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `Server error: ${response.status} ${response.statusText}`
      }));
      return {
        success: false,
        message: errorData.message || "Registration failed"
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Network error during registration:", error);
    return {
      success: false,
      message: `Network error: ${error.message}`
    };
  }
};

export const loginUser = async (userData) => {
  try {
    console.log("Attempting to login with URL:", `${BASE_URL}/auth/login`);

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `Server error: ${response.status} ${response.statusText}`
      }));
      return {
        success: false,
        message: errorData.message || "Login failed"
      };
    }

    return await response.json();
  } catch (error) {
    console.error("Network error during login:", error);
    return {
      success: false,
      message: `Network error: ${error.message}`
    };
  }
};

export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.user : null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}