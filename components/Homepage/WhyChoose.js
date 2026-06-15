"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, FileCheck, Briefcase } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Verified Companies",
    description:
      "All companies are verified to provide genuine job opportunities.",
    icon: Shield,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Easy Application Process",
    description: "Simple and quick application process to help you land jobs faster.",
    icon: FileCheck,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: 3,
    title: "Thousands of Opportunities",
    description:
      "Explore thousands of job openings from top companies worldwide.",
    icon: Briefcase,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-[#0b1220] mb-10"
        >
          Why Choose JobSphere?
        </motion.h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
              >
                <div className={`${feature.bgColor} rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-lg`}>
                  <div className="flex flex-col items-start">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <Icon className={`w-16 h-16 ${feature.iconColor}`} strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0b1220] mb-3">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
