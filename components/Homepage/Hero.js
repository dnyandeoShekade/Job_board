"use client";

import React from "react";
import Image from "next/image";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  // Animation variants for floating elements
  const floatAnimation = (delay) => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      },
    },
  });

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Content Side */}
          <motion.div
            className="w-full lg:col-span-6 xl:col-span-7"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Main Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl md:text-[56px] md:leading-[1.15]">
              Find Your{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                Dream Job
              </span>{" "}
              Today
              <motion.span
                className="ml-2 inline-block text-3xl sm:text-4xl"
                animate={{ rotate: [0, 12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
              >
                🚀
              </motion.span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-lg text-base font-normal text-gray-500 sm:text-lg">
              Explore thousands of opportunities from top companies worldwide.
            </p>

            {/* Main Search Bar Container */}
            <div className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-gray-150/80 bg-white p-2.5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] sm:flex-row sm:items-center">
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:divide-x sm:divide-gray-200">
                
                {/* Job Title Input */}
                <div className="flex flex-1 items-center gap-2.5 px-2">
                  <Search className="h-5 w-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    className="w-full bg-transparent text-[14px] font-medium text-gray-900 outline-none placeholder:text-gray-400"
                    placeholder="Job title or keyword"
                  />
                </div>

                {/* Location Input */}
                <div className="flex flex-1 items-center gap-2.5 px-2 sm:pl-4">
                  <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    className="w-full bg-transparent text-[14px] font-medium text-gray-900 outline-none placeholder:text-gray-400"
                    placeholder="Location"
                  />
                </div>
              </div>

              {/* Inside Search Action Button */}
              <button className="rounded-xl bg-[#2f6fff] px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#1a5ae5] hover:shadow-md active:scale-[0.98]">
                Search Jobs
              </button>
            </div>

            {/* Secondary CTA Quick Actions */}
            <div className="mt-8 flex items-center gap-4">
              <button className="group flex items-center gap-2 rounded-xl bg-[#2f6fff] px-5 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#1a5ae5] hover:shadow-md active:scale-[0.98]">
                Find Jobs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button className="rounded-xl border border-purple-200 bg-white px-5 py-3 text-[14px] font-semibold text-[#8b5cf6] transition-all hover:bg-purple-50/40 active:scale-[0.98]">
                Post a Job
              </button>
            </div>
          </motion.div>

          {/* Right Graphical Side */}
          <motion.div
            className="relative flex w-full items-center justify-center lg:col-span-6 xl:col-span-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            {/* Aspect Ratio Container for Layout Control */}
            <div className="relative h-[360px] w-[360px] sm:h-[440px] sm:w-[440px]">
              
              {/* Background Accent Purple Circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#dce4ff] via-[#eaeeff] to-[#f3e0ff]" />

              {/* Main Characters Illustration Wrapper */}
              <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-white bg-transparent shadow-sm">
                <Image
                  src="/image/profile.png"
                  alt="Job Seekers Illustration"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>

              {/* --- FLOATING TECH LOGOS --- */}

              {/* Google */}
              <motion.div
                {...floatAnimation(0)}
                className="absolute left-2 top-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
              >
                <Image src="/image/company.png" alt="Google" width={28} height={28} className="object-contain" />
              </motion.div>

              {/* Microsoft */}
              <motion.div
                {...floatAnimation(0.6)}
                className="absolute -left-2 top-36 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
              >
                <Image src="/image/Microsoft_logo.svg.png" alt="Microsoft" width={26} height={26} className="object-contain" />
              </motion.div>

              {/* Amazon */}
              <motion.div
                {...floatAnimation(0.3)}
                className="absolute right-0 top-32 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
              >
                <Image src="/image/amazon-pay-logo-free-png.webp" alt="Amazon" width={28} height={28} className="object-contain" />
              </motion.div>

              {/* Meta */}
              <motion.div
                {...floatAnimation(0.9)}
                className="absolute right-2 bottom-24 flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)]"
              >
                <Image src="/image/meta.png" alt="Meta" width={28} height={28} className="object-contain" />
              </motion.div>

              {/* --- FLOATING STAT BADGES --- */}

              {/* Active Jobs Card (Top Right) */}
              <motion.div
                {...floatAnimation(1.2)}
                className="absolute -right-4 top-4 flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-sm">
                  💼
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-gray-900 leading-tight">10,000+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Active Jobs</div>
                </div>
              </motion.div>

              {/* Companies Card (Bottom Left) */}
              <motion.div
                {...floatAnimation(1.5)}
                className="absolute -left-4 bottom-4 flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm">
                  🏢
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-gray-900 leading-tight">1,000+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Companies</div>
                </div>
              </motion.div>

              {/* Happy Candidates Card (Bottom Right) */}
              <motion.div
                {...floatAnimation(0.8)}
                className="absolute bottom-0 right-8 flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-sm">
                  👥
                </div>
                <div>
                  <div className="text-[13px] font-extrabold text-gray-900 leading-tight">50,000+</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Happy Candidates</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}