import { getUsersData } from "../../actions/jobActions";
import UsersPage from "../../../components/Admin/UsersPage";

export default async function Users() {
  const response = await getUsersData();
  const users = response.success ? response.data : [];
  return <UsersPage users={users} />;
}
