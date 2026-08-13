// import JobSearchDashboard from "@/components/JobSearchDashboard/JobSearchDashboard";
// import { getJobsData } from "../actions/getJobsData";

// export const dynamic = "force-dynamic";

// export default async function JobPage() {
//   const jobsResponse = await getJobsData();
//   const jobs = jobsResponse.success ? jobsResponse.data : [];

//   return (
//     <JobSearchDashboard
//       jobs={jobs}
//       hero={{
//         title: "Find Your Dream Job",
//         description:
//           "Explore thousands of job opportunities from top companies",
//         stats: {
//           count: "1,000+",
//           label: "candidates",
//           sublabel: "matched today",
//         },
//       }}
//     />
//   );
// }
"use client";

import { useEffect, useState } from "react";
import JobSearchDashboard from "@/components/JobSearchDashboard/JobSearchDashboard";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`${BASE_URL}/jobs`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch jobs");
        }

        setJobs(result.data || result.jobs || []);
      } catch (error) {
        console.error("GET JOBS ERROR:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="p-10">Loading jobs...</div>;
  }

  return (
    <JobSearchDashboard
      jobs={jobs}
      hero={{
        title: "Find Your Dream Job",
        description:
          "Explore thousands of job opportunities from top companies",
        stats: {
          count: "1,000+",
          label: "candidates",
          sublabel: "matched today",
        },
      }}
    />
  );
}
