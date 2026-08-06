import { getAdminDashboardData } from "../actions/adminActions";
import AdminDashboard from "../../components/Admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const response = await getAdminDashboardData();
  const data = response.success ? response.data : null;
  return <AdminDashboard data={data} />;
}
