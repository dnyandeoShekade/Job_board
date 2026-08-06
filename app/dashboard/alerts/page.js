import { getJobAlertsData } from '@/app/actions/jobActions';
import JobAlertsPage from '@/components/Dashboard/JobAlertsPage';

export const metadata = { title: 'Job Alerts | JobPortal' };

export default async function Page() {
  const response = await getJobAlertsData();
  const alerts = response.success ? response.data : [];
  return <JobAlertsPage alerts={alerts} />;
}
