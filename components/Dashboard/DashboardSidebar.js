'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  X,
  BriefcaseBusiness,
  Sparkles,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
];

export default function DashboardSidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-20 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-68 bg-white border-r border-slate-200/80 z-30 flex flex-col
        transition-transform duration-300 ease-in-out shadow-sm lg:shadow-none
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen
      `}>
        {/* Logo / Brand Header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-200 text-white shrink-0">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 tracking-tight block">JobPortal</span>
            <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider block">Candidate Hub</span>
          </div>
          <button 
            onClick={onClose}
            className="ml-auto lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition group ${
                  active
                    ? 'bg-indigo-50/80 text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {/* Active indicator bar */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" />
                )}
                <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                  active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'
                }`} />
                <span className="tracking-tight">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Complete Promo Banner */}
        <div className="mx-3 mb-4 p-4 bg-gradient-to-br from-indigo-50/80 to-slate-50 border border-indigo-100/60 rounded-2xl text-left relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-100/40 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs font-bold text-slate-900 leading-tight">Stand out to recruiters</p>
          </div>
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
            Complete your profile details to unlock 3x higher visibility.
          </p>
          <Link
            href="/dashboard/profile"
            className="flex items-center justify-center gap-1.5 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold py-2 rounded-xl transition shadow-xs"
          >
            Complete Profile →
          </Link>
        </div>

        {/* Logout Footer Section */}
        <div className="px-3 pb-5 border-t border-slate-100 pt-3">
          <button className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition w-full group">
            <LogOut className="w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
            <span>Log out account</span>
          </button>
        </div>
      </aside>
    </>
  );
}