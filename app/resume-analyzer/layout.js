"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Sparkles, History, ArrowLeft } from "lucide-react";

export default function ResumeAnalyzerLayout({ children }) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Dashboard", href: "/resume-analyzer", icon: LayoutDashboard },
    { label: "Analyze Resume", href: "/resume-analyzer/analyze", icon: Sparkles },
    { label: "History", href: "/resume-analyzer/history", icon: History },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 pb-20">
      {/* Sub-Header Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Brand / Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                AI
              </div>
              <span className="text-sm font-extrabold text-slate-900 tracking-tight hidden sm:inline">
                Resume Analyzer
              </span>
            </div>

            {/* Middle: Navigation Tabs */}
            <nav className="flex items-center space-x-1 sm:space-x-2">
              {navLinks.map(({ label, href, icon: Icon }) => {
                const isActive =
                  href === "/resume-analyzer"
                    ? pathname === "/resume-analyzer"
                    : pathname.startsWith(href);

                return (
                  <Link
                    key={label}
                    href={href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Quick action */}
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Candidate Hub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
