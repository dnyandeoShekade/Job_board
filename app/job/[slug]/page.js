import Link from "next/link";
// import { getJobBySlugData } from "@/app/actions/jobActions";
import JobDetails from "@/components/JobDetails/JobDetails";
import { getJobBySlugData } from "@/app/actions/getJobsData";

export default async function JobDetailsPage({ params }) {
  const { slug } = await params;

  const response = await getJobBySlugData(slug);

  if (!response.success || !response.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Job Not Found</h1>

          <Link href="/jobs" className="text-blue-600 mt-5 inline-block">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return <JobDetails job={response.data} />;
}
