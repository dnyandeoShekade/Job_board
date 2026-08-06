"use client";

import { FileText, CheckCircle2, XCircle, Mail, Briefcase, User } from "lucide-react";

export default function ManageApplicationsPage({ applications }) {
  if (!applications) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 mt-2">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Manage Applications</h1>
            <p className="text-[11px] text-slate-500">Review, approve, or reject candidate submissions for open positions.</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100/60">
          {applications.length} Total
        </span>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-3">Applicant</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-indigo-100/60">
                        {app.applicant.charAt(0)}
                      </div>
                      <span className="truncate">{app.applicant}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{app.jobTitle}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{app.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      app.status === "pending" ? "bg-amber-50 text-amber-700 border border-amber-200/60" :
                      app.status === "approved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" :
                      "bg-rose-50 text-rose-700 border border-rose-200/60"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1.5">
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 rounded-lg transition cursor-pointer">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Approve
                    </button>
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-lg transition cursor-pointer">
                      <XCircle className="w-3 h-3 text-rose-600" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}