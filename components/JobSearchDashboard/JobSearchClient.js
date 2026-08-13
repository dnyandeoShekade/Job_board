"use client";

import { useEffect, useState } from "react";
import JobSearchDashboard from "./JobSearchDashboard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function JobSearchClient() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`${BASE_URL}/jobs`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch jobs");
        }

        setJobs(result.data || result.jobs || []);
      } catch (error) {
        console.error("GET JOBS ERROR:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-slate-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <JobSearchDashboard
      jobs={jobs}
      hero={{
        title: "Find Your Dream Job",
        description:
          "Explore thousands of job opportunities from top companies",
        stats: {
          count: "1,000+",
          label: "candidates",
          sublabel: "matched today",
        },
      }}
    />
  );
}
