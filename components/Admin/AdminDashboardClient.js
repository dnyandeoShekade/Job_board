"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default function AdminDashboardClient() {
  const [response, setResponse] = useState({ success: false, data: null, message: "Loading..." });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchAdminDashboard() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/auth/login');
          return;
        }

        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${BASE_URL}/dashboard/admin`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/auth/login');
            return;
          }
          
          if (res.status === 403) {
            router.push('/');
            return;
          }

          setResponse({
            success: false,
            data: null,
            message: data.message || "Failed to load admin dashboard"
          });
        } else {
          setResponse({
            success: true,
            data: data.data || data,
            message: ""
          });
        }
      } catch (error) {
        console.error("Admin dashboard fetch error:", error);
        setResponse({
          success: false,
          data: null,
          message: error.message || "Failed to load admin dashboard"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchAdminDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!response.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">
            ⚠️ {response.message || "Failed to load admin dashboard"}
          </p>
          <p className="text-sm text-slate-500">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return <AdminDashboard data={response.data} />;
}
