"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import JobDetails from "./JobDetails";
import BASE_URL from "@/utils/api";

export default function JobDetailsClient({ slug }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const response = await fetch(`${BASE_URL}/jobs/${slug}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          setError("Job not found");
          setLoading(false);
          return;
        }

        const result = await response.json();
        const jobData = result.job || result.data || result;
        setJob(jobData);
      } catch (err) {
        setError(err.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Job Not Found</h1>
          <Link href="/job" className="text-blue-600 mt-5 inline-block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return <JobDetails job={job} />;
}
