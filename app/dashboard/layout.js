// import { getDashboardData } from '@/app/actions/jobActions';
import DashboardShell from '@/components/Dashboard/DashboardShell';
import { getDashboardData } from "@/app/actions/dashboardActions";

export default async function DashboardLayout({ children }) {
  const response = await getDashboardData();
  const data = response.success ? response.data : null;

  const user = data?.user ?? { name: 'User', email: '', phone: '', role: 'Job Seeker' };
  const notifications = data?.notifications ?? 0;

  return (
    <DashboardShell user={user} notifications={notifications}>
      {children}
    </DashboardShell>
  );
}
