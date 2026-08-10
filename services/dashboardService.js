import BASE_URL from "@/utils/api";

export async function getDashboard() {
  // Since this is server-side, we can't access localStorage
  // The token should be passed from the client component
  console.log("Dashboard URL:", `${BASE_URL}/dashboard/user`);

  const response = await fetch(`${BASE_URL}/dashboard/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await response.text();

  console.log("Dashboard status:", response.status);
  console.log("Dashboard raw response:", text);

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Backend returned non-JSON response: ${text}`);
  }

  if (!response.ok) {
    throw new Error(data.message || "Dashboard API failed");
  }

  return data;
}