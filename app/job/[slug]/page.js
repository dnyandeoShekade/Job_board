import JobDetailsClient from "@/components/JobDetails/JobDetailsClient";

export default async function JobDetailsPage({ params }) {
  const { slug } = await params;

  return <JobDetailsClient slug={slug} />;
}
