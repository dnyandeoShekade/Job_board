import { getAllApplications } from '@/app/actions/jobActions';
import MyApplications from '@/components/Dashboard/MyApplications';

export const metadata = {
  title: 'My Applications | JobPortal',
};

export default async function ApplicationsPage() {
  const response = await getAllApplications();
  const applications = response.success ? response.data : [];

  return <MyApplications applications={applications} />;
}
