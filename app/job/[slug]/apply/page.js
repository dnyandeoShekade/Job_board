import Link from "next/link";
import JobApplicationForm from "@/components/JobApplication/JobApplicationForm";
import JobSummaryCard from "@/components/JobApplication/JobSummaryCard";
import SupportSection from "@/components/JobApplication/SupportSection";
import Breadcrumb from "@/components/common/Breadcrumb";
import { getJobApplicationData } from "@/app/actions/getJobsData";

export default async function ApplyPage({ params }) {
  const { slug } = await params;

  const response = await getJobApplicationData(slug);
  const applicationData = response?.data;

  // Check if we have valid data
  if (!response?.success || !applicationData?.job) {
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
  const support = applicationData.support;

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
