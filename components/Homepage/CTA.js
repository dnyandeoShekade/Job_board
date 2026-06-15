"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 rounded-3xl p-12 md:p-16 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex items-center gap-6">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Rocket className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
              </motion.div>

              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
                  Ready to Start Your
                  <br />
                  Career Journey?
                </h2>
                <p className="text-white/80 text-sm md:text-base">
                  Join thousands of professionals and find your dream job today.
                </p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#2f6fff] rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all"
              >
                Browse Jobs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-base hover:bg-white/10 transition-all"
              >
                Create Account
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
