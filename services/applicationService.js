const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Submit Job Application
export async function submitApplication(applicationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    });

    // Get the content type to check what was returned
    const contentType = response.headers.get("content-type");
    
    // If response is not JSON, handle it
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response received:", text.substring(0, 200));
      return {
        success: false,
        message: `Server returned an unexpected response. Please ensure the backend API is running at ${API_BASE_URL}`,
      };
    }

    const data = await response.json();
    
    // Check if the response indicates success
    if (!response.ok) {
      return {
        success: false,
        message: data.message || `HTTP error! status: ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: `Unable to connect to the server at ${API_BASE_URL}. Please ensure the backend API is running.`,
    };
  }
}

// Apply for a job (requires authentication)
export async function applyJob(jobId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jobId }),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || `HTTP error! status: ${response.status}`,
        };
      } else {
        return {
          success: false,
          message: `Server error: ${response.status}`,
        };
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error applying for job:", error);
    return {
      success: false,
      message: "Unable to connect to the server",
    };
  }
}

// Get all applications (Admin)
export async function getAllApplications(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch applications",
    };
  }
}

// Get user's applications
export async function getUserApplications(userId, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user applications:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch user applications",
    };
  }
}

// Update application status (Admin)
export async function updateApplicationStatus(applicationId, status, token) {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating application status:", error);
    return {
      success: false,
      message: error.message || "Failed to update application status",
    };
  }
}
