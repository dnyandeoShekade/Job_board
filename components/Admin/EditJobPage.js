"use client";

import { FolderTree, Plus, Edit2, Trash2, Briefcase } from "lucide-react";

export default function CategoriesPage({ categories = [] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-3.5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
            <FolderTree className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Job Categories</h1>
            <p className="text-[11px] text-slate-500">Manage classification groups and view associated openings.</p>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm shadow-indigo-100 flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-xl p-10 text-center">
          <p className="text-xs text-slate-500">No categories found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white border border-slate-200/80 p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">{cat.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100/60 px-2 py-0.5 rounded-md">
                    <Briefcase className="w-3 h-3" /> {cat.jobCount} jobs
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Active grouping for platform listings.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-100">
                <button className="flex-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer">
                  <Edit2 className="w-3 h-3 text-slate-400" /> Edit
                </button>
                <button className="flex-1 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50/50 hover:bg-rose-50 border border-rose-200/60 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer">
                  <Trash2 className="w-3 h-3 text-rose-400" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}