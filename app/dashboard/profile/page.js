import { getProfileData } from '@/app/actions/jobActions';
import ProfilePage from '@/components/Dashboard/ProfilePage';

export const metadata = {
  title: 'Profile | JobPortal',
};

export default async function Page() {
  const response = await getProfileData();
  const profile = response.success ? response.data : null;

  if (!profile) {
    return <p className="text-slate-500 p-6">Failed to load profile.</p>;
  }

  return <ProfilePage profile={profile} />;
}
