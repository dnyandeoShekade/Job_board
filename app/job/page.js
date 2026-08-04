import { getJobsData } from '@/app/actions/jobActions';
import JobSearchDashboard from '@/components/JobSearchDashboard/JobSearchDashboard';

export default async function JobPage() {
  // Fetch jobs data from actions
  const jobsResponse = await getJobsData();
  const jobs = jobsResponse.success ? jobsResponse.data : [];

  return <JobSearchDashboard jobs={jobs} hero={{
    title: 'Find Your Dream Job',
    description: 'Explore thousands of job opportunities from top companies',
    stats: {
      count: '1,000+',
      label: 'candidates',
      sublabel: 'matched today'
    }
  }} />;

}