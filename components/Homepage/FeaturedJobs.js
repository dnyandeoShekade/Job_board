"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, CircleDollarSign, Bookmark, ArrowRight, Briefcase } from "lucide-react";
import BASE_URL from "@/utils/api";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`${BASE_URL}/jobs`, {
          cache: "no-store",
        });
        const data = await response.json();
        
        if (data.success && data.jobs) {
          // Get first 6 jobs for featured section
          setJobs(data.jobs.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-[#f0f4ff] to-[#f4eeff] py-16 lg:py-24">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4"></div>

      {/* Dot Patterns */}
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-3 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div
            key={`dot-tl-${i}`}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          ></div>
        ))}
      </div>
      <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-3 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div
            key={`dot-br-${i}`}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          ></div>
        ))}
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-[38px] font-extrabold text-[#0f172a] tracking-tight">
              Featured Jobs
            </h2>
            <p className="mt-3 text-base text-gray-500 font-medium">
              Top opportunities from leading companies. Apply now and take the
              next step in your career.
            </p>
          </div>
          <Link
            href="/job"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2f6fff] hover:text-[#2052c9] transition-colors"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 animate-pulse">
                <div className="h-12 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <Link
                key={job._id}
                href={`/job/${job.slug}`}
                className="group flex flex-col bg-white rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 relative border border-gray-100"
              >
                {/* Bookmark Icon */}
                <button 
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 transition-colors z-10"
                >
                  <Bookmark className="w-5 h-5" strokeWidth={2} />
                </button>

                {/* Header: Logo + Title + Company in ONE ROW */}
                <div className="flex items-start gap-3 mb-6 pr-6">
                  {/* Company Logo Box */}
                  <div className="w-[46px] h-[46px] shrink-0 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 mt-0.5 overflow-hidden">
                    {(job.logo || job.companyLogo || job.logoUrl) ? (
                      <img 
                        src={job.logo || job.companyLogo || job.logoUrl} 
                        alt={`${job.company} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<span class="text-slate-700 font-bold text-sm">${job.company?.charAt(0) || "J"}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-slate-700 font-bold text-sm">{job.company?.charAt(0) || "J"}</span>
                    )}
                  </div>

                  {/* Title & Company Wrapper */}
                  <div className="flex flex-col">
                    <h3 className="text-[16px] font-bold text-slate-900 leading-tight mb-1 line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[13px] font-semibold text-slate-600">
                      {job.company}
                      {/* Verified Badge */}
                      <svg
                        className="w-[14px] h-[14px] text-[#2f6fff]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Location & Salary */}
                <div className="flex flex-col gap-2.5 mb-5">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-[18px] h-[18px] stroke-[1.5]" />
                    <span className="text-[13px] font-medium">
                      {job.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <CircleDollarSign className="w-[18px] h-[18px] stroke-[1.5]" />
                    <span className="text-[13px] font-medium">{job.salary}</span>
                  </div>
                </div>

                {/* Push content down */}
                <div className="mt-auto">
                  {/* Job Type & Category Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.jobType && (
                      <span className="inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide bg-green-50 text-green-700">
                        {job.jobType}
                      </span>
                    )}
                    {job.category && (
                      <span className="inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide bg-purple-50 text-purple-700">
                        {job.category}
                      </span>
                    )}
                  </div>

                  {/* Apply Button */}
                  <button
                    className="w-full py-3 rounded-xl text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors bg-[#155DFC] hover:bg-[#0d47c9]"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No jobs available at the moment</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
