"use client";

import { useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, FileText, ArrowRight } from 'lucide-react';

export default function AddJobPage() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
          <Briefcase className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Add New Job</h1>
          <p className="text-[11px] text-slate-500">Create and publish a new job opportunity to reach candidates.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" /> Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" /> Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Location
              </label>
              <input
                type="text"
                placeholder="e.g. San Francisco, CA (or Remote)"
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Salary Range
              </label>
              <input
                type="text"
                placeholder="e.g. $120k - $150k"
                className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" /> Job Description
            </label>
            <textarea
              placeholder="Write a detailed description of the role, requirements, and benefits..."
              className="w-full text-xs sm:text-sm text-slate-800 bg-slate-50/70 border border-slate-200 rounded-lg px-3 py-2.5 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition shadow-sm shadow-indigo-100 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Publishing...' : 'Post Job'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}