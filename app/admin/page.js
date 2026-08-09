import { getAdminDashboardData } from "../actions/adminActions";
import AdminDashboard from "../../components/Admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const response = await getAdminDashboardData();
  return <AdminDashboard data={response.data} />;
}
