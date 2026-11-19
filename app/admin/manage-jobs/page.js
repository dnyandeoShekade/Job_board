// import ManageJobsPage from "../../../components/Admin/ManageJobsPage";
// // import { getManageJobsData } from "../../actions/jobActions";
// import { getJobs } from "@/services/job.service";

// export default async function ManageJobs() {
//   const response = await getJobs();
//   const jobs = response.success ? response.data : [];
//   return <ManageJobsPage jobs={jobs} />;
// }
import ManageJobsPage from "@/components/Admin/ManageJobsPage";
import { getJobs } from "@/services/job.service";

export default async function ManageJobs() {
  try {
    const response = await getJobs({ page: 1, limit: 100 });

    const jobs = response?.jobs ?? response?.data?.jobs ?? [];

    return <ManageJobsPage jobs={jobs} />;
  } catch (error) {
    console.error("Failed to load jobs:", error);
    return <ManageJobsPage jobs={[]} />;
  }
}
