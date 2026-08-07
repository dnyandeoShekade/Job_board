"use client";
import StatsGrid from "./StatsGrid";
import RecentApplications from "./RecentApplications";
import SavedJobsGrid from "./SavedJobsGrid";
import ProfileCard from "./ProfileCard";
import QuickActions from "./QuickActions";
import JobMatchBanner from "./JobMatchBanner";
import { getProfile } from "@/services/dashboardService";
import { useEffect, useState } from "react";

export default function Dashboard({ data }) {
  // const { user, stats, recentApplications, savedJobs, quickActions } = data;
  const [user, setUser] = useState(data.user);

  useEffect(() => {
    async function loadProfile() {
      const result = await getProfile();

      if (result.success) {
        setUser(result.user);
      }
    }
    loadProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  // const { stats, recentApplications, savedJobs, quickActions } = data;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Welcome back, {user.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your job applications and track your progress.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <StatsGrid stats={data.stats} />
          <RecentApplications applications={data.recentApplications} />
          <SavedJobsGrid jobs={data.savedJobs} />
        </div>
        <div className="space-y-6">
          <ProfileCard user={data.user} />
          <QuickActions actions={data.quickActions} />
          <JobMatchBanner />
        </div>
      </div>
    </div>
  );
}
