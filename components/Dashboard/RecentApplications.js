import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function RecentApplications({ applications }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="font-bold text-slate-900 text-sm">Recent Applications</h2>
        <Link href="/dashboard/applications" className="text-xs text-indigo-600 font-semibold hover:underline">
          View All
        </Link>
      </div>
      <ul className="divide-y divide-slate-100">
        {applications.map((app) => (
          <li key={app.id}>
            <Link
              href={`/job/${app.slug}`}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                style={{ backgroundColor: app.logoColor }}
              >
                {app.logo}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{app.title}</p>
                <p className="text-xs text-slate-500 truncate">{app.company} • {app.location}</p>
                <p className="text-xs text-slate-400 mt-0.5">{app.appliedDate}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <StatusBadge status={app.status} color={app.statusColor} />
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
