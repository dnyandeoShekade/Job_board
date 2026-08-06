import { getCategoriesData } from "../../actions/adminActions";
import CategoriesPage from "../../../components/Admin/CategoriesPage";

export default async function Categories() {
  const response = await getCategoriesData();
  const categories = response.success ? response.data : [];
  return <CategoriesPage categories={categories} />;
}
