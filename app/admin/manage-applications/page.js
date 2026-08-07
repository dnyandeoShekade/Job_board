import { getManageApplicationsData } from "../../actions/jobActions";
import ManageApplicationsPage from "../../../components/Admin/ManageApplicationsPage";

export default async function ManageApplications() {
  const response = await getManageApplicationsData();
  const applications = response.success ? response.data : [];
  return <ManageApplicationsPage applications={applications} />;
}
