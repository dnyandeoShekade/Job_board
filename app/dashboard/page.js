import { getDashboardData } from '@/app/actions/jobActions';
import Dashboard from '@/components/Dashboard/Dashboard';

export const metadata = {
  title: 'Dashboard | JobPortal',
};

export default async function DashboardPage() {
  const response = await getDashboardData();
  const data = response.success ? response.data : null;

  if (!data) {
    return <p className="text-slate-500 p-6">Failed to load dashboard.</p>;
  }

  return <Dashboard data={data} />;
}
