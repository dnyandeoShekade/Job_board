'use client';

export default function DashboardShell({ user, notifications, children }) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <main className="w-full p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}
