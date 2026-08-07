import { getReportsData } from "../../actions/jobActions";
import ReportsPage from "../../../components/Admin/ReportsPage";

export default async function Reports() {
  const response = await getReportsData();
  const reports = response.success ? response.data : null;
  return <ReportsPage data={reports} />;
}
