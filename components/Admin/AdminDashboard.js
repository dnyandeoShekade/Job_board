"use client";

import { Users, Briefcase, FileText, LayoutDashboard, ArrowUpRight } from "lucide-react";

export default function AdminDashboard({ data }) {
  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 mt-2">Loading dashboard...</p>
      </div>
    );
  }

  const stats = [
    { label: "Total Jobs", value: data.stats.totalJobs, icon: Briefcase, bg: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Active Jobs", value: data.stats.activeJobs, icon: Briefcase, bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { label: "Applications", value: data.stats.totalApplications, icon: FileText, bg: "bg-purple-50 text-purple-600 border-purple-100" },
    { label: "Total Users", value: data.stats.totalUsers, icon: Users, bg: "bg-amber-50 text-amber-600 border-amber-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
          <LayoutDashboard className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-[11px] text-slate-500">Overview of platform metrics, jobs, and recent candidate activity.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl border ${stat.bg} shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications Section */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Applications</h2>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
            Live Feed
          </span>
        </div>

        <div className="space-y-2.5">
          {data.recentApplications.map((app) => (
            <div 
              key={app.id} 
              className="flex items-center justify-between p-3.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 rounded-xl transition"
            >
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">{app.applicant}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{app.jobTitle}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                app.status === "pending" ? "bg-amber-50 text-amber-700 border border-amber-200/60" :
                app.status === "approved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" :
                "bg-rose-50 text-rose-700 border border-rose-200/60"
              }`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}