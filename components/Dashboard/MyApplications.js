'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, MoreVertical, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

const PAGE_SIZE = 6;

const TABS = [
  { label: 'All',             key: 'all' },
  { label: 'Applied',         key: 'Applied' },
  { label: 'Under Review',    key: 'Under Review' },
  { label: 'Interview',       key: 'Interview Scheduled' },
  { label: 'Selected',        key: 'Selected' },
  { label: 'Rejected',        key: 'Rejected' },
];

const SORT_OPTIONS = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Oldest First', value: 'oldest' },
  { label: 'Company A-Z',  value: 'company' },
];

export default function MyApplications({ applications }) {
  const [search, setSearch]         = useState('');
  const [statusFilter, setStatus]   = useState('All Status');
  const [sort, setSort]             = useState('newest');
  const [activeTab, setActiveTab]   = useState('all');
  const [page, setPage]             = useState(1);
  const [openMenu, setOpenMenu]     = useState(null);

  // counts per tab
  const tabCounts = useMemo(() => {
    const counts = { all: applications.length };
    TABS.slice(1).forEach(({ key }) => {
      counts[key] = applications.filter(a => a.status === key).length;
    });
    return counts;
  }, [applications]);

  const filtered = useMemo(() => {
    let list = [...applications];

    // tab filter
    if (activeTab !== 'all') {
      list = list.filter(a => a.status === activeTab);
    }

    // status dropdown filter
    if (statusFilter !== 'All Status') {
      list = list.filter(a => a.status === statusFilter);
    }

    // search
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q)
      );
    }

    // sort
    if (sort === 'newest') {
      list = list.slice().reverse();
    } else if (sort === 'oldest') {
      // already in insertion order
    } else if (sort === 'company') {
      list = list.slice().sort((a, b) => a.company.localeCompare(b.company));
    }

    return list;
  }, [applications, activeTab, statusFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleTabChange(key) {
    setActiveTab(key);
    setPage(1);
    setStatus('All Status');
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">My Applications</h1>
        <p className="text-sm text-slate-500 mt-1">Track and manage all the jobs you have applied for.</p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search applications by job title or company..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Status dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
            className="appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700 cursor-pointer"
          >
            <option>All Status</option>
            <option>Applied</option>
            <option>Under Review</option>
            <option>Interview Scheduled</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="appearance-none pl-4 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-700 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 mb-0 overflow-x-auto">
        {TABS.map(({ label, key }) => {
          const count = tabCounts[key] ?? 0;
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition
                ${active
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              {label}
              <span className={`text-xs rounded-full px-1.5 py-0.5 font-semibold
                ${active ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 border-t-0 rounded-b-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 w-10">No.</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Company</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Job Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    Applied Date
                    <ChevronDown className="w-3 h-3" />
                  </span>
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-slate-400 text-sm">
                    No applications found.
                  </td>
                </tr>
              ) : (
                paginated.map((app, idx) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    {/* No. */}
                    <td className="px-5 py-4 text-slate-400 font-medium">
                      {(currentPage - 1) * PAGE_SIZE + idx + 1}
                    </td>

                    {/* Company */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                          style={{ backgroundColor: app.logoColor }}
                        >
                          {app.logo}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{app.company}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-0.5 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {app.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">{app.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{app.type}</p>
                    </td>

                    {/* Applied Date */}
                    <td className="px-5 py-4 text-slate-600">{app.appliedDate}</td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={app.status} color={app.statusColor} />
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/job/${app.slug}`}
                          className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition whitespace-nowrap"
                        >
                          View Details
                        </Link>
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenu(openMenu === app.id ? null : app.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {openMenu === app.id && (
                            <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1 w-36">
                              <Link
                                href={`/job/${app.slug}`}
                                className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                View Details
                              </Link>
                              <Link
                                href={`/job/${app.slug}/apply`}
                                className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                Apply Again
                              </Link>
                              <button
                                className="block w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50"
                                onClick={() => setOpenMenu(null)}
                              >
                                Withdraw
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: count + pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} to{' '}
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} applications
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 text-xs font-semibold rounded-lg transition
                  ${currentPage === n
                    ? 'bg-indigo-600 text-white'
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
