import { getResumeData } from '@/app/actions/jobActions';
import ResumePage from '@/components/Dashboard/ResumePage';
export const metadata = {
  title: 'My Resume | JobPortal',
};

export default async function Page() {
  const response = await getResumeData();
  const data = response.success ? response.data : null;

  if (!data) {
    return <p className="text-slate-500 p-6">Failed to load resume data.</p>;
  }

  return <ResumePage data={data} />;
}
