import { getJobByIdData } from "@/app/actions/jobActions";
import EditJobPage from "../../../../components/Admin/EditJobPage";

export default async function EditJob({ params }) {
  const { slug } = await params;

  const response = await getJobByIdData(slug);

  if (!response.success || !response.data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-700">Job not found</p>
          <p className="text-sm text-slate-500 mt-1">
            {response.message || "The job you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return <EditJobPage jobSlug={slug} initialJob={response.data} />;
}
