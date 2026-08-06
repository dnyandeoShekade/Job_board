import { getManageJobsData } from "../../actions/adminActions";
import ManageJobsPage from "../../../components/Admin/ManageJobsPage";

export default async function ManageJobs() {
  const response = await getManageJobsData();
  const jobs = response.success ? response.data : [];
  return <ManageJobsPage jobs={jobs} />;
}
