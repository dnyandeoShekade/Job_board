"use client";

import { Menu, Bell, User, Search } from "lucide-react";

export default function AdminTopbar({ toggleSidebar }) {
  return (
    <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Sidebar Toggle & Quick Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search workspace..."
            className="w-56 pl-9 pr-3 py-1.5 text-xs bg-slate-50/70 border border-slate-200/80 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile Action */}
      <div className="flex items-center gap-2">
        <button 
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition relative cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
        </button>

        <div className="h-5 w-px bg-slate-200 mx-1"></div>

        <button className="flex items-center gap-2.5 p-1.5 hover:bg-slate-50 rounded-xl transition cursor-pointer group">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm shadow-indigo-100 group-hover:scale-105 transition">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="text-xs font-bold text-slate-800 block leading-tight">Admin User</span>
            <span className="text-[10px] text-slate-400 font-medium block">Super Admin</span>
          </div>
        </button>
      </div>
    </header>
  );
}