'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, ChevronDown, MapPin, MoreVertical, Bookmark,
  Briefcase, ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles,
} from 'lucide-react';

const PAGE_SIZE = 6;

const CATEGORIES = [
  'All Categories',
  'Frontend Development',
  'Backend Development',
  'UI/UX Design',
  'DevOps',
  'Mobile Development',
];

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship'];

export default function SavedJobsDashboard({ jobs }) {
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('All Categories');
  const [sort, setSort]           = useState('newest');
  const [typeFilter, setType]     = useState([]);
  const [openMenu, setOpenMenu]   = useState(null);
  const [page, setPage]           = useState(1);

  // type counts from data
  const typeCounts = useMemo(() => {
    const counts = {};
    jobs.forEach(j => { counts[j.type] = (counts[j.type] || 0) + 1; });
    return counts;
  }, [jobs]);

  const filtered = useMemo(() => {
    let list = [...jobs];

    if (category !== 'All Categories') {
      list = list.filter(j => j.category === category);
    }
    if (typeFilter.length > 0) {
      list = list.filter(j => typeFilter.includes(j.type));
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q)
      );
    }
    if (sort === 'newest') list = list.slice().reverse();
    else if (sort === 'salary-high') {
      list = list.slice().sort((a, b) => {
        const parse = s => parseInt(s.replace(/[^\d]/g, '')) || 0;
        return parse(b.salary) - parse(a.salary);
      });
    } else if (sort === 'salary-low') {
      list = list.slice().sort((a, b) => {
        const parse = s => parseInt(s.replace(/[^\d]/g, '')) || 0;
        return parse(a.salary) - parse(b.salary);
      });
    }
    return list;
  }, [jobs, category, typeFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function toggleType(t) {
    setPage(1);
    setType(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 bg-gradient-to-r from-indigo-50/50 via-white to-white px-5 py-4 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
            <Bookmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Saved Jobs</h1>
            <p className="text-xs text-slate-500">Review, manage, or apply to your bookmarked positions.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 px-3 py-1 rounded-lg border border-slate-200/80">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-700">{filtered.length} Saved Opportunities</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left: Search + List */}
        <div className="lg:col-span-2 space-y-3.5">

          {/* Search + Sort Toolbar */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search saved jobs by title or company..."
                className="w-full pl-10 pr-4 text-slate-800 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={category}
                  onChange={e => { setCategory(e.target.value); setPage(1); }}
                  className="appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 cursor-pointer transition"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => { setSort(e.target.value); setPage(1); }}
                  className="appearance-none pl-3 pr-8 py-2 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 cursor-pointer transition"
                >
                  <option value="newest">Most Recent</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Job List Container (Separate Cards) */}
          <div className="space-y-3">
            {paginated.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-xl py-14 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                  <Search className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-slate-700">No saved jobs found</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Try adjusting your search criteria or filters.</p>
              </div>
            ) : (
              paginated.map(job => (
                <div 
                  key={job.id} 
                  className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm transition-transform group-hover:scale-105"
                      style={{ backgroundColor: job.logoColor }}
                    >
                      {job.logo}
                    </div>
                    <div>
                      <Link href={`/job/${job.slug}`} className="text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 transition">
                        {job.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-slate-700">{job.company}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-0.5 text-slate-500">
                          <MapPin className="w-3 h-3 text-slate-400" />{job.location}
                        </span>
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-medium px-2 py-0.5 rounded">
                          {job.type}
                        </span>
                        {job.mode && (
                          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200/60 text-[10px] font-medium px-2 py-0.5 rounded">
                            {job.mode}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2.5 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-900">{job.salary}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Saved {job.savedDate}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/job/${job.slug}`}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm shadow-indigo-100 transition"
                      >
                        View Job
                      </Link>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === job.id ? null : job.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenu === job.id && (
                          <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 w-32 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <Link href={`/job/${job.slug}`} className="block px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 transition" onClick={() => setOpenMenu(null)}>View Details</Link>
                            <Link href={`/job/${job.slug}/apply`} className="block px-3 py-1.5 text-[11px] text-slate-700 hover:bg-slate-50 transition" onClick={() => setOpenMenu(null)}>Apply Now</Link>
                            <button className="block w-full text-left px-3 py-1.5 text-[11px] text-red-600 hover:bg-red-50 transition font-medium" onClick={() => setOpenMenu(null)}>Remove</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-1">
            <span className="font-medium">
              Showing <span className="font-semibold text-slate-700">{filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
              <span className="font-semibold text-slate-700">{Math.min(currentPage * PAGE_SIZE, filtered.length)}</span> of{' '}
              <span className="font-semibold text-slate-700">{filtered.length}</span> saved jobs
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 font-medium text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition shadow-sm
                    ${currentPage === n ? 'bg-indigo-600 text-white shadow-indigo-100' : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700'}`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-sm"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Filters + Widgets */}
        <div className="space-y-3.5">

          {/* Job Type Filter */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Filter by Job Type</h3>
            </div>
            <div className="space-y-2.5">
              <label className="flex items-center justify-between text-xs cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={typeFilter.length === 0}
                    onChange={() => { setType([]); setPage(1); }}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                  />
                  <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition">All Types</span>
                </div>
              </label>
              {JOB_TYPES.map(t => (
                <label key={t} className="flex items-center justify-between text-xs cursor-pointer text-slate-600 hover:text-slate-900 group">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={typeFilter.includes(t)}
                      onChange={() => toggleType(t)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer"
                    />
                    <span className="group-hover:text-indigo-600 transition">{t}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-semibold">
                    {typeCounts[t] || 0}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Job Categories</h3>
            <div className="space-y-1">
              {CATEGORIES.map(c => {
                const count = c === 'All Categories' ? jobs.length : jobs.filter(j => j.category === c).length;
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setPage(1); }}
                    className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg transition font-medium
                      ${active ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <span>{c}</span>
                    {c !== 'All Categories' && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Better Matches CTA */}
          <div className="bg-gradient-to-b from-indigo-900 to-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm text-center text-white relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto mb-2.5 border border-white/10">
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </div>
            <p className="text-xs font-bold tracking-tight text-white">Find better matches</p>
            <p className="text-[11px] text-indigo-200/80 mt-0.5 mb-3.5 leading-relaxed px-1">
              Get personalized job recommendations customized to your profile.
            </p>
            <Link
              href="/dashboard/profile"
              className="block w-full bg-white hover:bg-slate-100 text-slate-900 py-2 rounded-lg text-xs font-bold transition shadow-sm"
            >
              Update Preferences
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}