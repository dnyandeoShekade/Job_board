import { getSavedJobsData } from '@/app/actions/jobActions';
import SavedJobsDashboard from '@/components/Dashboard/saved';

export const metadata = {
  title: 'Saved Jobs | JobPortal',
};

export default async function Page() {
  const response = await getSavedJobsData();
  const jobs = response.success ? response.data : [];

  return <SavedJobsDashboard jobs={jobs} />;
}
