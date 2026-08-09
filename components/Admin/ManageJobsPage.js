"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, DollarSign, Clock, Edit3, Trash2 } from "lucide-react";
import { deleteJobData } from "@/app/actions/jobActions";
export default function ManageJobsPage({ jobs }) {
  const [jobList, setJobList] = useState(jobs || []);
  const [deletingSlug, setDeletingSlug] = useState(null);

  async function handleDelete(slug, title) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingSlug(slug);

      const result = await deleteJobData(slug);

      if (!result.success) {
        alert(result.message || "Failed to delete job");
        return;
      }

      setJobList((prev) =>
        prev.filter((job) => job.slug !== slug)
      );

      alert("Job deleted successfully");
    } catch (error) {
      alert(error.message || "Failed to delete job");
    } finally {
      setDeletingSlug(null);
    }
  }
  if (!jobList || jobList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-10 max-w-md mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">No jobs found</h3>
          <p className="text-sm text-slate-500 mt-1">There are currently no job listings available to manage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Jobs</h1>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-semibold text-slate-700">{jobList.length}</span> total job listings
          </p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-4">
{jobList.map((job) => (
            <div 
            key={job._id} 
            className="group bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Left Side: Job Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    job.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {job.status || 'active'}
                  </span>
                </div>

                <p className="text-sm font-medium text-slate-600 mt-0.5">{job.company}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Right Side: Action Buttons */}
              <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <Link
                  href={`/admin/edit-job/${job.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </Link>

             <button
  type="button"
  disabled={deletingSlug === job.slug}
  onClick={() => handleDelete(job.slug, job.title)}
  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-white border border-slate-300 rounded-lg hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Trash2 className="w-3.5 h-3.5" />

  <span>
    {deletingSlug === job.slug ? "Deleting..." : "Delete"}
  </span>
</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}