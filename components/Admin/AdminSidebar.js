"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Edit,
  FileText,
  Users,
  FolderTree,
  BarChart3,
  Settings,
  ShieldCheck,
} from "lucide-react";

export default function AdminSidebar({ isOpen }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Jobs", href: "/admin/manage-jobs", icon: Briefcase },
    { name: "Add Job", href: "/admin/add-job", icon: PlusCircle },
    { name: "Edit Job", href: "/admin/edit-job", icon: Edit },
    { name: "Manage Applications", href: "/admin/manage-applications", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-0"
      } bg-white border-r border-slate-200/80 transition-all duration-300 overflow-hidden flex flex-col shrink-0 select-none`}
    >
      {/* Brand Logo Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-indigo-50/40 via-white to-white">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-100">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="overflow-hidden">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 block">Workspace</span>
          <h1 className="text-sm font-bold text-slate-900 truncate tracking-tight">Admin Portal</h1>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-3 space-y-1 overflow-y-auto flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-bold shadow-sm shadow-indigo-50/50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Meta */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="px-3 py-2 rounded-lg bg-white border border-slate-200/60 shadow-2xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Status</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-slate-700">All services online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}