"use client";

import { BarChart3, Building2, TrendingUp, Briefcase } from "lucide-react";

export default function ReportsPage({ data }) {
  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <div className="inline-block w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs text-slate-500 mt-2">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Reports & Analytics</h1>
          <p className="text-[11px] text-slate-500">Platform performance metrics, hiring activity, and top organization statistics.</p>
        </div>
      </div>

      {/* Top Companies Card */}
      <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm space-y-3.5">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-indigo-600" /> Top Performing Companies
          </h2>
          <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
            Ranked by Applications
          </span>
        </div>

        <div className="space-y-2.5">
          {data.topCompanies.map((company, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3.5 bg-slate-50/60 hover:bg-slate-50 border border-slate-200/60 rounded-xl transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100/60">
                  #{idx + 1}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {company.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-400" /> {company.jobs} jobs posted
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-base sm:text-lg font-extrabold text-indigo-600 leading-tight">{company.applications}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">applications</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}