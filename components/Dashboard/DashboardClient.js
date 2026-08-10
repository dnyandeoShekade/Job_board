"use client";

import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

export default function DashboardClient() {
  const [response, setResponse] = useState({ success: false, data: null, message: "Loading..." });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setResponse({
            success: false,
            data: null,
            message: "Access denied. No token provided."
          });
          setLoading(false);
          return;
        }

        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${BASE_URL}/dashboard/user`, {
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
          }
          setResponse({
            success: false,
            data: null,
            message: data.message || "Failed to load dashboard"
          });
        } else {
          setResponse({
            success: true,
            data: data.data || data,
            message: ""
          });
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setResponse({
          success: false,
          data: null,
          message: error.message || "Failed to load dashboard"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-slate-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!response.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">
            ⚠️ {response.message || "Failed to load dashboard"}
          </p>

          <p className="text-sm text-slate-500">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return <Dashboard data={response.data} />;
}
