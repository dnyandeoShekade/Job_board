import ManageJobsPage from "../../../components/Admin/ManageJobsPage";
import { getManageJobsData } from "../../actions/jobActions";

export default async function ManageJobs() {
  const response = await getManageJobsData();
  const jobs = response.success ? response.data : [];
  return <ManageJobsPage jobs={jobs} />;
}
