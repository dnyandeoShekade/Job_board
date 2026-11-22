export default function ResumeAnalyzerLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
