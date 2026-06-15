import React from "react";
import Image from "next/image";

const jobs = [
  {
    id: 1,
    logo: "/image/adobe-logo.png",
    title: "Frontend Developer",
    company: "Google",
    location: "Pune, India",
    salary: "₹12 - 20 LPA",
    badge: "Full Time",
  },
  {
    id: 2,
    logo: "/image/google logo.webp",
    title: "Backend Engineer",
    company: "Microsoft",
    location: "Bangalore, India",
    salary: "₹18 - 30 LPA",
    badge: "Full Time",
  },
  {
    id: 3,
    logo: "/image/amazon.webp",
    title: "Full Stack Developer",
    company: "Amazon",
    location: "Hyderabad, India",
    salary: "₹15 - 28 LPA",
    badge: "Full Time",
  },
  {
    id: 4,
    logo: "/image/Logonetflix.png",
    title: "UI/UX Designer",
    company: "Adobe",
    location: "Noida, India",
    salary: "₹10 - 18 LPA",
    badge: "Full Time",
  },
  {
    id: 5,
    logo: "/image/microsoft_PNG3.png",
    title: "DevOps Engineer",
    company: "Meta",
    location: "Bangalore, India",
    salary: "₹20 - 35 LPA",
    badge: "Full Time",
  },
  {
    id: 6,
    logo: "/image/netflix.svg",
    title: "Data Scientist",
    company: "Netflix",
    location: "Mumbai, India",
    salary: "₹25 - 40 LPA",
    badge: "Full Time",
  },
];

export default function FeaturedJobs() {
  return (
    <section className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b1220]">
            Featured Jobs
          </h2>
          <a
            href="#"
            className="text-xs sm:text-sm font-semibold text-[#2f6fff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all jobs →
          </a>
        </div>

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col justify-between min-h-[340px]"
            >
              {/* Top Content (Stacked Vertically) */}
              <div className="flex flex-col items-start text-left">
                {/* Logo */}
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 p-3 border border-gray-200/50">
                  <Image
                    src={job.logo}
                    alt={`${job.company} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                {/* Job Title & Company */}
                <h3 className="text-base font-bold text-[#0b1220] tracking-tight line-clamp-2 leading-snug">
                  {job.title}
                </h3>
                <span className="text-sm text-gray-500 font-semibold mt-1.5">
                  {job.company}
                </span>

                {/* Info Metadata */}
                <div className="mt-5 space-y-2.5 text-xs text-gray-500 font-medium w-full">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="line-clamp-1">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3.5 h-3.5 text-gray-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="mt-4">
                  <span className="inline-block text-[10px] bg-purple-50 text-[#8b5cf6] px-2.5 py-1 rounded-md font-semibold tracking-wide">
                    {job.badge}
                  </span>
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="mt-5 w-full">
                <button className="w-full cursor-pointer bg-[#3b52f6] hover:bg-[#253cc9] text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-[0.98]">
                  Apply Now
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
