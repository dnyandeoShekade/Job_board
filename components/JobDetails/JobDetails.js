"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bookmark,
  Send,
  MapPin,
  Briefcase,
  Clock,
  Eye,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Link as LinkIcon,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookF,
  FaXTwitter,
} from "react-icons/fa6";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function JobDetails({ job }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/job" },
    { label: job.title, href: null },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Breadcrumb Header */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Main Content & Description */}
        <div className="lg:col-span-8 space-y-6">
          {/* Top Job Summary Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="w-30 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 shrink-0">
                  {job.logoUrl ? (
                    <Image
                      src={job.logoUrl}
                      alt={`${job.company} logo`}
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-slate-700">
                      {job.logo}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {job.title}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-sm">
                    <span className="font-medium text-slate-700">
                      {job.company}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center transition ${
                    isBookmarked
                      ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? "fill-indigo-600" : ""}`}
                  />
                </button>
                <Link
                  href={`/job/${job.slug}/apply`}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm shadow-indigo-500/20 text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </Link>
              </div>
            </div>

            {/* Sub-meta details bar */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Posted {job.postedAgo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <span>{job.views} Views</span>
              </div>
            </div>

            {/* Grid Highlights Cards inside Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>Salary</span>
                </div>
                <div className="font-semibold text-slate-900 text-sm sm:text-base">
                  {job.salary}
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Experience</span>
                </div>
                <div className="font-semibold text-slate-900 text-sm sm:text-base">
                  {job.experience}
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                  <span className="w-3.5 h-3.5 flex items-center justify-center font-bold">
                    #
                  </span>
                  <span>Category</span>
                </div>
                <div className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                  {job.category}
                </div>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Job Type</span>
                </div>
                <div className="font-semibold text-slate-900 text-sm sm:text-base">
                  {job.type}
                </div>
              </div>
            </div>
          </div>

          {/* Job Detailed Description Box */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700">
            {job.description && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  Job Description
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {job.description}
                </p>
              </div>
            )}

            {/* Key Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-sm">
                  Key Responsibilities
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {job.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-sm">
                  Requirements
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {job.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nice to Have */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <div>
                <h3 className="font-bold text-slate-900 mb-3 text-sm">
                  Nice to Have
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {job.niceToHave.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="lg:col-span-4 space-y-6">
          {/* Share this job Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              Share this job
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
                title="Copy Link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
              </button>

              <button
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition"
                title="Share on LinkedIn"
              >
                <FaLinkedinIn className="text-[#0A66C2] text-lg" />
              </button>

              <button
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
                title="Share on X"
              >
                <FaXTwitter className="text-black text-lg" />
              </button>

              <button
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition"
                title="Share on Facebook"
              >
                <FaFacebookF className="text-[#1877F2] text-lg" />
              </button>

              <button
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-green-50 transition"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="text-[#25D366] text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Ready to apply for this job?
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Join thousands of successful candidates who found their dream
                jobs with us.
              </p>
            </div>
          </div>
          <Link
            href={`/job/${job.slug || "frontend-developer-google"}/apply`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-sm shadow-indigo-500/20 text-sm whitespace-nowrap w-full sm:w-auto justify-center"
          >
            <Send className="w-4 h-4" />
            <span>Apply Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
