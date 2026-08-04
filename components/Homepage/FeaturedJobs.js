"use client";

import React from "react";
import Image from "next/image";
import { MapPin, CircleDollarSign, Bookmark, ArrowRight } from "lucide-react";

// Augmented the provided data with theme colors
const jobs = [
  {
    id: 1,
    logo: "/image/adobe-logo.png",
    title: "Frontend Developer",
    company: "Adobe",
    location: "Pune, India",
    salary: "₹12 - 20 LPA",
    badge: "Full Time",
    theme: {
      btn: "bg-[#155DFC]",
      badgeBg: "bg-red-50",
      badgeText: "text-[#ed3833]",
    },
  },
  {
    id: 2,
    logo: "/image/google logo.webp",
    title: "Backend Engineer",
    company: "Google",
    location: "Bangalore, India",
    salary: "₹18 - 30 LPA",
    badge: "Full Time",
    theme: {
      btn: "bg-[#155DFC]",
      badgeBg: "bg-blue-50",
      badgeText: "text-[#2f6fff]",
    },
  },
  {
    id: 3,
    logo: "/image/amazon.webp",
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Hyderabad, India",
    salary: "₹15 - 28 LPA",
    badge: "Full Time",
    theme: {
      btn: "bg-[#155DFC]",
      badgeBg: "bg-orange-50",
      badgeText: "text-[#f58f0b]",
    },
  },
  {
    id: 4,
    logo: "/image/Logonetflix.png",
    title: "UI/UX Designer",
    company: "Netflix",
    location: "Noida, India",
    salary: "₹10 - 18 LPA",
    badge: "Full Time",
    theme: {
      btn: "bg-[#155DFC]",
      badgeBg: "bg-red-50",
      badgeText: "text-[#e50914]",
    },
  },
  {
    id: 5,
    logo: "/image/microsoft_PNG3.png",
    title: "DevOps Engineer",
    company: "Microsoft",
    location: "Bangalore, India",
    salary: "₹20 - 35 LPA",
    badge: "Full Time",
    theme: {
      btn: "bg-[#155DFC]",
      badgeBg: "bg-green-50",
      badgeText: "text-[#2b9e38]",
    },
  },
  {
    id: 6,
    logo: "/image/netflix.svg",
    title: "Data Scientist",
    company: "Meta",
    location: "Mumbai, India",
    salary: "₹25 - 40 LPA",
    badge: "Full Time",
    theme: {
      btn: "bg-[#155DFC]",
      badgeBg: "bg-purple-50",
      badgeText: "text-[#6a4cfc]",
    },
  },
];

export default function FeaturedJobs() {
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
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#2f6fff] hover:text-[#2052c9] transition-colors"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group flex flex-col bg-white rounded-[20px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 relative border border-gray-100"
            >
              {/* Bookmark Icon */}
              <button className="absolute top-5 right-5 text-gray-300 hover:text-gray-500 transition-colors z-10">
                <Bookmark className="w-5 h-5" strokeWidth={2} />
              </button>

              {/* Header: Logo + Title + Company in ONE ROW */}
              <div className="flex items-start gap-3 mb-6 pr-6">
                {/* Company Logo Box */}
                <div className="w-[46px] h-[46px] shrink-0 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-2 mt-0.5">
                  <div className="relative w-full h-full">
                    <Image
                      src={job.logo}
                      alt={job.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title & Company Wrapper */}
                <div className="flex flex-col">
                  <h3 className="text-[16px] font-bold text-slate-900 leading-tight mb-1">
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
                {/* Job Type Badge */}
                <div
                  className={`inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide mb-6 ${job.theme.badgeBg} ${job.theme.badgeText}`}
                >
                  {job.badge}
                </div>

                {/* Apply Button */}
                <button
                  className={`w-full py-3 rounded-xl text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-colors ${job.theme.btn} ${job.theme.hover}`}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
