import JobApplicationClient from "@/components/JobApplication/JobApplicationClient";

export default async function ApplyPage({ params }) {
  const { slug } = await params;

  return <JobApplicationClient slug={slug} />;
}
