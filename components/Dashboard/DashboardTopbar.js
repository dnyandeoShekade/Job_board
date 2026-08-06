'use client';

import { Bell, Menu, Search, Sparkles } from 'lucide-react';

export default function DashboardTopbar({ user, notifications, onMenuClick }) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center gap-4 sticky top-0 z-20">
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden p-2 rounded-xl hover:bg-slate-100/80 text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onClick={onMenuClick}
        aria-label="Open Menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search Input Bar */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search jobs, companies, or keywords..."
          className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-slate-50/80 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white text-slate-800 placeholder-slate-400 transition shadow-2xs"
        />
      </div>

      {/* Right Side Actions */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notification Bell */}
        <button 
          className="relative p-2.5 rounded-xl hover:bg-slate-100/80 text-slate-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label="View notifications"
        >
          <Bell className="w-4 h-4" />
          {notifications > 0 && (
            <>
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-400 rounded-full animate-ping" />
            </>
          )}
        </button>

        <div className="h-6 w-px bg-slate-200/80 hidden sm:block" />

        {/* User Avatar + Details */}
        <div className="flex items-center gap-3 pl-1">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm shadow-indigo-200">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name || 'Candidate'}</p>
            <p className="text-[11px] text-indigo-600 font-medium mt-0.5">{user?.role || 'Frontend Developer'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}