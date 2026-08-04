import Image from 'next/image';
import { MapPin, Briefcase, IndianRupee, Tag, Calendar, CheckCircle2 } from 'lucide-react';

export default function JobSummaryCard({ job }) {
  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl border border-slate-200 flex items-center justify-center p-2 shadow-sm shrink-0">
            {job.companyLogoUrl ? (
              <Image 
                src={job.companyLogoUrl} 
                alt={`${job.company} logo`}
                width={80}
                height={80}
                className="object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-slate-700">{job.companyLogo}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">{job.company}</h3>
              {job.companyVerified && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
              )}
            </div>
            <p className="text-xs text-slate-500">{job.companyIndustry}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mt-4">{job.title}</h2>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>{job.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{job.postedAt}</span>
          </div>
        </div>
      </div>

      {/* Job Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-3">Job Overview</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {job.jobOverview.description}
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-2">Responsibilities</h4>
            <ul className="space-y-1.5">
              {job.jobOverview.responsibilities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-2">Requirements</h4>
            <ul className="space-y-1.5">
              {job.jobOverview.requirements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
