import Link from 'next/link';
import { Bookmark } from 'lucide-react';

export default function SavedJobsGrid({ jobs }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="font-bold text-slate-900 text-sm">Saved Jobs</h2>
        <Link href="/dashboard/saved" className="text-xs text-indigo-600 font-semibold hover:underline">
          View All
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/job/${job.slug}`}
            className="flex flex-col gap-3 p-4 hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                style={{ backgroundColor: job.logoColor }}
              >
                {job.logo}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{job.title}</p>
                <p className="text-xs text-slate-500">{job.company}</p>
              </div>
              <Bookmark className="w-4 h-4 text-indigo-500 fill-indigo-500 ml-auto shrink-0" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{job.location}</p>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{job.salary}</p>
              <p className="text-xs text-slate-400 mt-1">{job.savedAgo}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
