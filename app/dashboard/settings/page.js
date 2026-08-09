import { getSettingsData } from '@/app/actions/jobActions';
import SettingsPage from '@/components/Dashboard/SettingsPage';

export const metadata = { title: 'Settings | JobPortal' };

export default async function Page() {
  const response = await getSettingsData();
  const settings = response.success ? response.data : null;
  if (!settings) return <p className="text-slate-500 p-6">Faile to load settings.</p>;
  return <SettingsPage settings={settings} />;
}
