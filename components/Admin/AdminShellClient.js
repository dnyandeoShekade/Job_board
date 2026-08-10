"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "./AdminShell";

export default function AdminShellClient({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAdminAuth() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/auth/login');
          return;
        }

        const result = await res.json();
        const user = result.user || result.data;

        // Check if user is admin
        if (!user || user.role !== "admin") {
          router.push('/');
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Admin auth check error:", error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    }

    checkAdminAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <AdminShell>{children}</AdminShell>;
}
