import DashboardShellClient from '@/components/Dashboard/DashboardShellClient';

export default function DashboardLayout({ children }) {
  return (
    <DashboardShellClient>
      {children}
    </DashboardShellClient>
  );
}
