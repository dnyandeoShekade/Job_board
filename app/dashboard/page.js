import { getDashboardData } from "@/app/actions/dashboardActions";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata = {
  title: "Dashboard | JobPortal",
};

export default async function DashboardPage() {
  const response = await getDashboardData();

  if (!response.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">
            ⚠️ {response.message || "Failed to load dashboard"}
          </p>

          <p className="text-sm text-slate-500">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  return <Dashboard data={response.data} />;
}