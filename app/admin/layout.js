import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminShell from "../../components/Admin/AdminShell";
import BASE_URL from "@/utils/api";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  // No authentication cookie
  if (!cookieHeader) {
    redirect("/login");
  }

  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      redirect("/login");
    }

    const result = await response.json();

    const user = result.user || result.data;

    // User is authenticated but not admin
    if (!user || user.role !== "admin") {
      redirect("/");
    }

    return <AdminShell>{children}</AdminShell>;
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);
    redirect("/login");
  }
}