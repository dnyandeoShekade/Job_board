"use client";

import { useEffect, useState } from "react";
import MyApplications from "@/components/Dashboard/MyApplications";
import { formatApplication, getUserApplications } from "@/services/applicationService";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log("Fetching applications...");
        const response = await getUserApplications();
        console.log("Response:", response);
     if (response.success) {
  const applications = response.applications.map(formatApplication);

  setApplications(applications);
} else {
  setError(response.message || "Failed to fetch applications");
}
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError(err.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-sm text-slate-500">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center max-w-md">
          <p className="text-red-500 mb-2">⚠️ {error}</p>
          <p className="text-xs text-slate-500 mb-4">Check browser console for details</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-indigo-600 hover:text-indigo-700 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return <MyApplications applications={applications} />;
}