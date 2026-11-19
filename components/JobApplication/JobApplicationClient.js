"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";
import JobSummaryCard from "./JobSummaryCard";
import SupportSection from "./SupportSection";
import Breadcrumb from "@/components/common/Breadcrumb";
import BASE_URL from "@/utils/api";

export default function JobApplicationClient({ slug }) {
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApplicationData() {
      try {
        const response = await fetch(`${BASE_URL}/jobs/${slug}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Job not found");
        }

        const result = await response.json();
        const job = result.job || result.data?.job || result.data || result;

        if (!job || !job.slug) {
          throw new Error("Invalid job response");
        }

        setApplicationData({
          job,
          support: null,
        });
      } catch (err) {
        setError(err.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    }

    fetchApplicationData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !applicationData?.job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Application Not Found
          </h1>
          <p className="text-slate-500 mb-4">
            This job application is not available.
          </p>
          <Link href="/job" className="text-indigo-600 hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const job = applicationData.job;
  const support = applicationData.support ?? {};

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/job" },
    { label: job.title, href: `/job/${slug}` },
    { label: "Apply", href: null },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Application Form */}
          <div className="lg:col-span-7">
            <JobApplicationForm applicationData={job} />
          </div>

          {/* Right: Job Summary */}
          <div className="lg:col-span-5">
            <JobSummaryCard job={job} />
          </div>
        </div>
      </div>

      <SupportSection support={support} />
    </div>
  );
}
