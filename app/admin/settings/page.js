import { getAdminSettingsData } from "../../actions/jobActions";
import AdminSettingsPage from "../../../components/Admin/AdminSettingsPage";

export default async function AdminSettings() {
  const response = await getAdminSettingsData();
  const settings = response.success ? response.data : null;
  return <AdminSettingsPage settings={settings} />;
}
