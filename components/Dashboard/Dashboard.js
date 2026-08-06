import StatsGrid from './StatsGrid';
import RecentApplications from './RecentApplications';
import SavedJobsGrid from './SavedJobsGrid';
import ProfileCard from './ProfileCard';
import QuickActions from './QuickActions';
import JobMatchBanner from './JobMatchBanner';

export default function Dashboard({ data }) {
  const { user, stats, recentApplications, savedJobs, quickActions } = data;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your job applications and track your progress.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <StatsGrid stats={stats} />
          <RecentApplications applications={recentApplications} />
          <SavedJobsGrid jobs={savedJobs} />
        </div>
        <div className="space-y-6">
          <ProfileCard user={user} />
          <QuickActions actions={quickActions} />
          <JobMatchBanner />
        </div>
      </div>
    </div>
  );
}
