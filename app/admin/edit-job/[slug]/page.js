import EditJobPage from "../../../../components/Admin/EditJobPage";

export default async function EditJob({ params }) {
  const { slug } = await params;

  return <EditJobPage jobSlug={slug} />;
}
