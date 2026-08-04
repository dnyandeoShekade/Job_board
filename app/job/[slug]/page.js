import Link from 'next/link';
import { getJobBySlug } from '@/app/actions/jobActions';
import JobDetails from '@/components/JobDetails/JobDetails';

export default async function JobDetailsPage({ params }) {
  // Next.js 15: params is now a Promise and must be awaited
  const { slug } = await params;
  
  console.log('Fetching job for slug:', slug);
  
  // Fetch job data from backend API via action
  const response = await getJobBySlug(slug);
  
  console.log('Job response:', response);

  // Handle job not found
  if (!response.success || !response.data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Job Not Found</h1>
          <p className="text-slate-500 mb-4">The job you're looking for doesn't exist.</p>
          <Link href="/job" className="text-indigo-600 hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Pass job data to reusable JobDetails component
  return <JobDetails job={response.data} />;
}
