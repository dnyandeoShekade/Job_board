import StatsGrid from "./StatsGrid";
import RecentApplications from "./RecentApplications";

export default function Dashboard({ data }) {
  if (!data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
          {/* Subtle error background glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-100/60 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4 shadow-xs">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Failed to load dashboard
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Please try refreshing the page or check your internet connection.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl shadow-md shadow-slate-900/10 transition-all duration-200 hover:shadow-lg active:scale-95"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

const statsData = data.stats || {};
console.log("DASHBOARD DATA:", data);
console.log("DASHBOARD STATS:", data?.stats);
const stats = [
  {
    label: "Total Applications",
    value: statsData.totalApplications || 0,
    sub: "Applications submitted",
    icon: "briefcase",
    color: "indigo",
  },
  {
    label: "Reviewed",
    value: statsData.reviewed || 0,
    sub: "Applications reviewed",
    icon: "check-circle",
    color: "green",
  },
  {
    label: "Selected",
    value: statsData.selected || 0,
    sub: "Applications selected",
    icon: "clock",
    color: "yellow",
  },
  {
    label: "Rejected",
    value: statsData.rejected || 0,
    sub: "Applications rejected",
    icon: "x-circle",
    color: "red",
  },
];
  // Format recent applications for the component
  const recentApplications = (data.recentApplications || []).map((app) => ({
    id: app._id,
    title: app.jobTitle,
    company: app.company,
    location: app.location,
    status: app.status,
    appliedDate: new Date(app.appliedDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    logo: app.company?.charAt(0) || "J",
    logoColor: "#6366f1",
    slug: app.jobId || "#",
    statusColor:
      app.status === "Applied"
        ? "blue"
        : app.status === "Reviewed"
        ? "green"
        : app.status === "Selected"
        ? "yellow"
        : "red",
  }));

  return (
    <div className="relative min-h-screen bg-slate-50/60 text-slate-800 antialiased overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Overview
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back! 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1.5 font-normal">
              Manage your job applications and track your progress in real time.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="transition-all duration-300">
          <StatsGrid stats={stats} />
        </section>

        {/* Recent Applications Section */}
        {recentApplications.length > 0 && (
          <section className="transition-all duration-300">
            <RecentApplications applications={recentApplications} />
          </section>
        )}
      </div>
    </div>
  );
}