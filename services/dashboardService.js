import { cookies } from "next/headers";
import BASE_URL from "@/utils/api";

export async function getDashboard() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  console.log("Dashboard URL:", `${BASE_URL}/dashboard/user`);
  console.log("Cookie exists:", cookieHeader ? "Yes" : "No");

  const response = await fetch(`${BASE_URL}/dashboard/user`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
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