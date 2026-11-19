// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Search,
//   MapPin,
//   ArrowRight,
//   Briefcase,
//   Building,
//   Users,
// } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Hero() {
//   const router = useRouter();
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();

//     // Build query parameters
//     const params = new URLSearchParams();
//     if (searchKeyword.trim()) {
//       params.append('keyword', searchKeyword.trim());
//     }
//     if (searchLocation.trim()) {
//       params.append('location', searchLocation.trim());
//     }

//     // Navigate to job page with search params
//     const queryString = params.toString();
//     router.push(`/job${queryString ? `?${queryString}` : ''}`);
//   };

//   // Animation variants for floating elements
//   const floatAnimation = (delay) => ({
//     animate: {
//       y: [0, -10, 0],
//       transition: {
//         duration: 4,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//         delay,
//       },
//     },
//   });

//   return (
//     <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#f8f9ff] via-[#f0f4ff] to-[#f4eeff] py-16 md:py-20 lg:py-28 min-h-screen flex items-center">
//       {/* Background Decorative Elements */}
//       <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
//       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3"></div>

//       {/* Background Dots Pattern (Top Right & Bottom Left approximations) */}
//       <div className="absolute top-10 right-10 grid grid-cols-4 gap-2 opacity-20">
//         {[...Array(16)].map((_, i) => (
//           <div
//             key={`dot-tr-${i}`}
//             className="w-1.5 h-1.5 bg-blue-500 rounded-full"
//           ></div>
//         ))}
//       </div>
//       <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-2 opacity-20">
//         {[...Array(16)].map((_, i) => (
//           <div
//             key={`dot-bl-${i}`}
//             className="w-1.5 h-1.5 bg-blue-500 rounded-full"
//           ></div>
//         ))}
//       </div>

//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
//           {/* Left Content Side */}
//           <motion.div
//             className="w-full lg:col-span-6 xl:col-span-6"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             {/* Main Heading */}
//             <h1 className="text-[44px] font-extrabold tracking-tight text-[#0f172a] sm:text-5xl md:text-[64px] md:leading-[1.1]">
//               Find Your <br />
//               <span className="bg-gradient-to-r from-[#2f6fff] to-[#8b5cf6] bg-clip-text text-transparent">
//                 Dream Job
//               </span>{" "}
//               <br />
//               Today
//             </h1>

//             {/* Description */}
//             <p className="mt-6 max-w-md text-base font-medium text-gray-500 sm:text-lg">
//               Explore thousands of opportunities from top companies worldwide.
//             </p>

//             {/* Main Search Bar Container */}
//             <form onSubmit={handleSearch} className="mt-10 flex w-full max-w-[600px] flex-col gap-3 rounded-full bg-white p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center">
//               <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
//                 {/* Job Title Input */}
//                 <div className="flex flex-1 items-center gap-3 px-4 py-2 sm:py-0">
//                   <Search className="h-5 w-5 text-gray-400 shrink-0" />
//                   <input
//                     type="text"
//                     value={searchKeyword}
//                     onChange={(e) => setSearchKeyword(e.target.value)}
//                     className="w-full bg-transparent text-[15px] font-medium text-gray-900 outline-none placeholder:text-gray-400"
//                     placeholder="Job title or keyword"
//                   />
//                 </div>

//                 {/* Divider */}
//                 <div className="hidden h-8 w-px bg-gray-200 sm:block"></div>

//                 {/* Location Input */}
//                 <div className="flex flex-1 items-center gap-3 px-4 py-2 sm:py-0">
//                   <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
//                   <input
//                     type="text"
//                     value={searchLocation}
//                     onChange={(e) => setSearchLocation(e.target.value)}
//                     className="w-full bg-transparent text-[15px] font-medium text-gray-900 outline-none placeholder:text-gray-400"
//                     placeholder="Location"
//                   />
//                 </div>
//               </div>

//               {/* Inside Search Action Button */}
//               <button type="submit" className="rounded-full bg-[#3b5bdb] px-8 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#2f4ac4] hover:shadow-lg active:scale-[0.98]">
//                 Search Jobs
//               </button>
//             </form>

//             {/* Secondary CTA Quick Actions */}
//             <div className="mt-10 flex items-center gap-5">
//               <Link href="/job" className="group flex items-center gap-2 rounded-xl bg-[#3b5bdb] px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#2f4ac4] hover:shadow-md active:scale-[0.98]">
//                 Find Jobs
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Link>
//               <Link href="/admin/add-job" className="rounded-xl border border-[#3b5bdb]/30 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-[#3b5bdb] transition-all hover:bg-[#3b5bdb]/5 active:scale-[0.98]">
//                 Post a Job
//               </Link>
//             </div>
//           </motion.div>

//           {/* Right Graphical Side */}
//           <motion.div
//             className="relative flex w-full items-center justify-center lg:col-span-6 xl:col-span-6 mt-10 lg:mt-0"
//             initial={{ opacity: 0, scale: 0.96 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
//           >
//             {/* Main Graphics Container */}
//             <div className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] flex items-center justify-center">
//               {/* Outer Thin Circle with Dots */}
//               <div className="absolute inset-2 rounded-full border border-purple-200/60">
//                 {/* Decorative Dots on the outer circle */}
//                 <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-purple-300 rounded-full"></div>
//                 <div className="absolute bottom-[10%] right-[15%] w-2 h-2 bg-blue-300 rounded-full"></div>
//                 <div className="absolute top-[50%] -right-1 w-2 h-2 bg-purple-400 rounded-full"></div>
//               </div>

//               {/* Inner Circle Background */}
//               <div className="absolute inset-8 overflow-hidden rounded-full border-[6px] border-white bg-[#9b9ff0] shadow-xl">
//                 <Image
//                   src="/image/profile.png"
//                   alt="Job Seekers Illustration"
//                   fill
//                   priority
//                   className="object-cover object-bottom"
//                 />
//               </div>

//               {/* --- FLOATING TECH LOGOS --- */}

//               {/* Microsoft */}
//               <motion.div
//                 {...floatAnimation(0.2)}
//                 className="absolute left-6 top-1/4 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
//               >
//                 <Image
//                   src="/image/Microsoft_logo.svg.png"
//                   alt="Microsoft"
//                   width={28}
//                   height={28}
//                   className="object-contain"
//                 />
//               </motion.div>

//               {/* Amazon */}
//               <motion.div
//                 {...floatAnimation(0.6)}
//                 className="absolute right-4 top-1/3 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
//               >
//                 <Image
//                   src="/image/amazon-pay-logo-free-png.webp"
//                   alt="Amazon"
//                   width={32}
//                   height={32}
//                   className="object-contain"
//                 />
//               </motion.div>

//               {/* Meta */}
//               <motion.div
//                 {...floatAnimation(0.9)}
//                 className="absolute right-12 bottom-[20%] z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
//               >
//                 <Image
//                   src="/image/meta.png"
//                   alt="Meta"
//                   width={32}
//                   height={32}
//                   className="object-contain"
//                 />
//               </motion.div>

//               {/* --- FLOATING STAT BADGES --- */}

//               {/* Active Jobs Card (Top Right) */}
//               <motion.div
//                 {...floatAnimation(1.2)}
//                 className="absolute -top-4 right-10 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#8b5cf6]">
//                   <Briefcase className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <div className="text-[15px] font-extrabold text-gray-900 leading-tight">
//                     10,000+
//                   </div>
//                   <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
//                     Active Jobs
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Companies Card (Bottom Left) */}
//               <motion.div
//                 {...floatAnimation(1.5)}
//                 className="absolute -left-6 bottom-[15%] z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#3b5bdb]">
//                   <Building className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <div className="text-[15px] font-extrabold text-gray-900 leading-tight">
//                     1,000+
//                   </div>
//                   <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
//                     Companies
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Placements Card (Bottom Right) */}
//               <motion.div
//                 {...floatAnimation(0.8)}
//                 className="absolute -bottom-6 right-[15%] z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#8b5cf6]">
//                   <Users className="h-5 w-5" />
//                 </div>
//                 <div>
//                   <div className="text-[15px] font-extrabold text-gray-900 leading-tight">
//                     50,000+
//                   </div>
//                   <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
//                     Placements
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (searchKeyword.trim()) {
      params.set("keyword", searchKeyword.trim());
    }

    if (searchLocation.trim()) {
      params.set("location", searchLocation.trim());
    }

    const queryString = params.toString();
    router.push(`/job${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto grid min-h-auto max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:min-h-[640px] lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* Left content */}
        <motion.div
          className="relative z-10 w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="mb-5 sm:mb-7 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-slate-50/60 px-3.5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-600">
            <span className="h-2 w-2 rounded-full bg-[#5265ed]" />
            Your next opportunity starts here
          </div>

          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-[#151515] xs:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.08] lg:tracking-[-0.04em]">
            Get Hired Faster
            <br />
            and <span className="text-[#5265ed]">Smarter.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm leading-6 text-gray-500 sm:text-base sm:leading-7 md:text-lg max-w-md mx-auto lg:mx-0">
            Browse, discover, and apply for opportunities that match your skills
            and career goals.
          </p>

          {/* Search form */}
          <form
            onSubmit={handleSearch}
            className="mt-6 sm:mt-9 flex w-full max-w-[590px] flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-[0_12px_45px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:gap-1 mx-auto lg:mx-0"
          >
            <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 py-2 sm:px-3 sm:py-2">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Job title or keyword"
                aria-label="Job title or keyword"
                className="w-full min-w-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </label>

            <div className="hidden h-7 w-px bg-gray-200 sm:block" />

            <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl px-3 py-2 sm:px-3 sm:py-2 border-t border-gray-100 sm:border-t-0">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-gray-400" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Select location"
                aria-label="Job location"
                className="w-full min-w-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </label>

            <button
              type="submit"
              aria-label="Search jobs"
              className="flex h-11 sm:h-12 w-full sm:w-14 shrink-0 items-center justify-center gap-2 rounded-xl sm:rounded-full bg-[#171717] px-5 sm:px-0 text-sm font-semibold text-white transition hover:bg-[#5265ed]"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sm:hidden font-medium">Search Jobs</span>
            </button>
          </form>

          {/* Secondary actions */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5">
            <Link
              href="/job"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition hover:text-[#5265ed]"
            >
              Explore all jobs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <span className="hidden sm:block h-4 w-px bg-gray-200" />

            <Link
              href="/admin/add-job"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <Briefcase className="h-4 w-4" />
              Post a job
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center lg:justify-start gap-6 sm:gap-8 border-t border-gray-100 pt-5 sm:pt-6">
            <div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                50K+
              </p>
              <p className="mt-0.5 text-xs text-gray-500">Active job seekers</p>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                20K+
              </p>
              <p className="mt-0.5 text-xs text-gray-500">Verified companies</p>
            </div>
          </div>
        </motion.div>

        {/* Right hero visual */}
        <motion.div
          className="relative mx-auto flex min-h-[340px] sm:min-h-[460px] lg:min-h-[580px] w-full max-w-[500px] items-end justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          {/* Background circle */}
          <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7f5f1] sm:h-[380px] sm:w-[380px] lg:h-[460px] lg:w-[460px]" />

          {/* Decorative Google mark */}
          <div className="absolute right-2 top-4 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm sm:right-6 sm:top-8">
            <span className="text-lg sm:text-xl font-bold text-[#4285f4]">G</span>
          </div>

          {/* Student image */}
          <div className="relative z-[1] h-[340px] w-full max-w-[340px] sm:h-[460px] sm:max-w-[440px] lg:h-[560px] lg:max-w-[480px]">
            <Image
              src="/image/herosection.png"
              alt="Student holding notebooks and wearing a backpack"
              fill
              priority
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 480px"
              className="object-contain object-bottom"
            />
          </div>

          {/* Floating job card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-2 left-0 sm:bottom-6 sm:left-2 z-10 flex items-center gap-2.5 sm:gap-3 rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
          >
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f2ff] text-[#5265ed]">
              <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                Find your next role
              </p>
              <p className="mt-0.5 text-[10px] sm:text-xs text-gray-500">
                Your career, your future
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
