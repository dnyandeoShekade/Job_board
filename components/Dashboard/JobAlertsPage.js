'use client';

import React, { useState } from 'react';
import { 
  FiBell, 
  FiPlus, 
  FiSearch, 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiClock, 
  FiEdit2, 
  FiTrash2, 
  FiAlertCircle
} from 'react-icons/fi';

// Mock Data for Job Alerts (Pure JavaScript, no TypeScript annotations)
const initialAlerts = [
  {
    id: 1,
    title: 'Frontend Developer',
    category: 'Frontend Development',
    location: 'Bangalore, Karnataka',
    salary: '₹10 - ₹18 LPA',
    experience: '1-3 Years',
    jobType: 'Remote',
    frequency: 'Instant',
    status: true,
    createdDate: '28 May 2025'
  },
  {
    id: 2,
    title: 'React.js Developer',
    category: 'Frontend Development',
    location: 'Hyderabad, Telangana',
    salary: '₹12 - ₹20 LPA',
    experience: '1-3 Years',
    jobType: 'Full-time',
    frequency: 'Daily',
    status: true,
    createdDate: '24 May 2025'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    category: 'UI/UX Design',
    location: 'Pune, Maharashtra',
    salary: '₹8 - ₹15 LPA',
    experience: '2-4 Years',
    jobType: 'Hybrid',
    frequency: 'Weekly',
    status: false,
    createdDate: '20 May 2025'
  },
  {
    id: 4,
    title: 'Full Stack Engineer',
    category: 'Backend Development',
    location: 'Chennai, Tamil Nadu',
    salary: '₹15 - ₹25 LPA',
    experience: '1-3 Years',
    jobType: 'Full-time',
    frequency: 'Instant',
    status: true,
    createdDate: '15 May 2025'
  }
];

export default function JobAlertsDashboard() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Toggle Alert Status (Active/Paused)
  const handleToggleStatus = (id) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, status: !alert.status } : alert
      )
    );
  };

  // Delete Alert
  const handleDeleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Filtered Alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || alert.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Header Section */}
        <div className="bg-white border border-slate-200/80 rounded-xl px-5 py-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <FiBell className="text-base"/>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Job Alerts</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your automated notifications and get instant alerts for matching roles.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition shadow-sm active:scale-[0.98]">
            <FiPlus className="text-base"/>
            Add New Alert
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Left Column (Search & Alerts List - Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Search and Filters Toolbar */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"/>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search alerts by title or location..." 
                  className="w-full bg-slate-50/50 border border-slate-200/80 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-slate-50/50 border border-slate-200/80 rounded-lg px-3 py-2 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>
            </div>

            {/* Loading State Skeleton */}
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white border border-slate-200/80 rounded-xl p-4 h-32 animate-pulse flex flex-col justify-between">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-8 bg-slate-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : filteredAlerts.length > 0 ? (
              /* Alerts Listings Container */
              <div className="space-y-3">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-sm hover:border-slate-300 transition flex flex-col gap-3.5"
                  >
                    {/* Top Row: Title, Category Badge, and Status Toggle */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xs font-bold text-slate-900 text-base">{alert.title}</h3>
                          <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-medium px-2 py-0.5 rounded">
                            {alert.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <FiMapPin className="text-[11px] text-slate-400"/> {alert.location}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <FiDollarSign className="text-[11px] text-slate-400"/> {alert.salary}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <FiBriefcase className="text-[11px] text-slate-400"/> {alert.experience}
                          </span>
                        </div>
                      </div>

                      {/* Status Toggle Switch Group */}
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          alert.status ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {alert.status ? 'Active' : 'Paused'}
                        </span>
                        
                        {/* Custom Modern Toggle Button */}
                        <button 
                          onClick={() => handleToggleStatus(alert.id)}
                          type="button"
                          aria-label={alert.status ? 'Pause Alert' : 'Activate Alert'}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                            alert.status ? 'bg-indigo-600' : 'bg-slate-200'
                          }`}
                        >
                          <span 
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              alert.status ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Row: Metadata Tags and Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-semibold px-2 py-0.5 rounded">
                          {alert.jobType}
                        </span>
                        <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                          <FiClock className="text-[10px]"/> {alert.frequency} Frequency
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Created on {alert.createdDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition" title="Edit Alert">
                          <FiEdit2 className="text-sm"/>
                        </button>
                        <button 
                          onClick={() => handleDeleteAlert(alert.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" 
                          title="Delete Alert"
                        >
                          <FiTrash2 className="text-sm"/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center flex flex-col items-center justify-center space-y-3 shadow-sm">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xl shadow-inner">
                  <FiAlertCircle/>
                </div>
                <h3 className="text-sm font-bold text-slate-900">No job alerts found</h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  We couldn't find any job alerts matching your search criteria. Try adjusting your filters or create a new alert.
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredAlerts.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs text-slate-500 gap-3">
                <span>Showing 1 to {filteredAlerts.length} of {filteredAlerts.length} alerts</span>
                <div className="flex items-center gap-1">
                  <button className="px-3 py-1.5 border border-slate-200/80 rounded-lg bg-white hover:bg-slate-50 font-medium text-slate-600 transition disabled:opacity-50">
                    Previous
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-semibold flex items-center justify-center shadow-sm">
                    1
                  </button>
                  <button className="px-3 py-1.5 border border-slate-200/80 rounded-lg bg-white hover:bg-slate-50 font-medium text-slate-700 transition">
                    Next
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (Widgets - Spans 1 col) */}
          <div className="space-y-4">
            
            {/* Quick Tips Widget */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">Alert Guidelines</h3>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <p><strong className="text-slate-900">Instant Alerts:</strong> Receive notifications the moment matching positions are published.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <p><strong className="text-slate-900">Refine Keywords:</strong> Keep job titles focused to avoid irrelevant notifications.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                  <p><strong className="text-slate-900">Multiple Filters:</strong> Combine category and location rules for precision matching.</p>
                </div>
              </div>
            </div>

            {/* Alert Summary Widget */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3.5">Alert Status Overview</h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-700">Total Active Alerts</span>
                  <span className="font-bold text-indigo-600">{alerts.filter(a => a.status).length}</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-medium text-slate-700">Paused Alerts</span>
                  <span className="font-bold text-slate-500">{alerts.filter(a => !a.status).length}</span>
                </div>
              </div>
            </div>

            {/* Pro Notification Promotion */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm text-center">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl shadow-inner">
                <FiBell/>
              </div>
              <h4 className="text-xs font-bold text-slate-900">SMS & WhatsApp Alerts</h4>
              <p className="text-[11px] text-slate-500 mt-1 mb-4 leading-relaxed px-2">
                Enable direct phone notifications so you never miss high-paying startup roles.
              </p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-xs font-semibold transition shadow-sm active:scale-[0.98]">
                Upgrade Notifications
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}