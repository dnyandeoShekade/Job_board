'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FolderOpen, Bookmark, User, FileText,
  Bell, Settings, LogOut, X, BriefcaseBusiness,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard',        icon: LayoutDashboard, href: '/dashboard' },
  { label: 'My Applications',  icon: FolderOpen,      href: '/dashboard/applications' },
  { label: 'Saved Jobs',       icon: Bookmark,        href: '/dashboard/saved' },
  { label: 'Profile',          icon: User,            href: '/dashboard/profile' },
  { label: 'Resume',           icon: FileText,        href: '/dashboard/resume' },
  { label: 'Job Alerts',       icon: Bell,            href: '/dashboard/alerts' },
  { label: 'Settings',         icon: Settings,        href: '/dashboard/settings' },
];

export default function DashboardSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-30 flex flex-col
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-slate-100">
          <BriefcaseBusiness className="w-6 h-6 text-indigo-600" />
          <span className="text-lg font-bold text-indigo-600">JobPortal</span>
          <button className="ml-auto lg:hidden" onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
                  ${active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Profile complete prompt */}
        <div className="mx-3 mb-4 p-4 bg-indigo-50 rounded-2xl text-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
            <FileText className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-xs font-semibold text-slate-700 mb-0.5">Stand out to employers</p>
          <p className="text-xs text-slate-500 mb-3">Complete your profile and increase your chances.</p>
          <Link
            href="/dashboard/profile"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-lg transition"
          >
            Complete Profile →
          </Link>
        </div>

        {/* Logout */}
        <div className="px-3 pb-5 border-t border-slate-100 pt-3">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
