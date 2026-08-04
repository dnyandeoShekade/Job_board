"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, UserPlus } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] bg-gradient-to-r from-[#2f6fff] via-[#6366f1] to-[#8b5cf6] p-8 sm:p-12 md:p-16 overflow-hidden shadow-[0_20px_50px_rgba(47,111,255,0.25)]"
        >
          {/* Glowing Background Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

          {/* Abstract Grid Overlay Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              {/* Animated Rocket Icon Container */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner shrink-0"
              >
                <div className="absolute inset-0 rounded-2xl bg-white/5 animate-pulse" />
                <Rocket
                  className="w-10 h-10 md:w-12 md:h-12 text-white"
                  strokeWidth={1.5}
                />
              </motion.div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md border border-white/10">
                  Get Started Today
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                  Ready to Start Your <br className="hidden sm:block" />
                  Career Journey?
                </h2>
                <p className="text-white/80 text-sm sm:text-base max-w-md font-medium">
                  Join thousands of professionals and land your dream job with
                  top companies worldwide.
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#2f6fff] rounded-xl font-bold text-base shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-all"
              >
                Browse Jobs
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-base hover:bg-white/20 transition-all shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                Create Account
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
