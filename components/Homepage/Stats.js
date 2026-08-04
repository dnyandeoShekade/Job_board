"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Building2, Users, Send } from "lucide-react";

// Updated data structure to separate the number and suffix for the animation
const stats = [
  {
    id: 1,
    icon: Briefcase,
    number: 5000,
    suffix: "+",
    label: "Jobs Available",
    color: "text-[#3b5bdb]",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    icon: Building2,
    number: 1000,
    suffix: "+",
    label: "Companies Hiring",
    color: "text-[#8b5cf6]",
    bg: "bg-purple-50",
  },
  {
    id: 3,
    icon: Users,
    number: 10000,
    suffix: "+",
    label: "Candidates",
    color: "text-[#ec4899]",
    bg: "bg-pink-50",
  },
  {
    id: 4,
    icon: Send,
    number: 500,
    suffix: "+",
    label: "Daily Applications",
    color: "text-[#f58f0b]",
    bg: "bg-orange-50",
  },
];

// Custom Component for the Counting Animation
function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // Format with commas (e.g., 5,000) and append suffix
        ref.current.textContent =
          Intl.NumberFormat("en-US").format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Subtle Background Accents */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header (Optional, adds nice context) */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight">
            Trusted by professionals worldwide
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            We're connecting top talent with industry-leading companies every
            single day.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col items-center text-center p-8 bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                {/* Icon Container */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${stat.bg} ${stat.color}`}
                >
                  <Icon className="w-8 h-8" strokeWidth={1.5} />
                </div>

                {/* Animated Number */}
                <h3 className="text-3xl md:text-[40px] font-extrabold text-slate-900 mb-2 tracking-tight">
                  <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                </h3>

                {/* Label */}
                <p className="text-[15px] font-semibold text-gray-500">
                  {stat.label}
                </p>

                {/* Decorative Bottom Line on Hover */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-t-full transition-all duration-300 group-hover:w-1/2 ${stat.bg.replace("50", "500")}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
