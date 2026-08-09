import { cookies } from "next/headers";
import BASE_URL from "@/utils/api";

export async function getAdminDashboard() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${BASE_URL}/dashboard/admin`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error(data.message || "Admin dashboard API failed");
  }

  return data;
}
