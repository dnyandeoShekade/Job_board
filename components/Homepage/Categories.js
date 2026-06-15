"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Layers,
  GitBranch,
  Palette,
  BarChart3,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Frontend Development",
    jobs: "3,450 Jobs",
    icon: Code,
    color: "blue",
    gradient: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    name: "Backend Development",
    jobs: "1,980 Jobs",
    icon: Server,
    color: "green",
    gradient: "from-green-50 to-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    name: "Full Stack Development",
    jobs: "3,270 Jobs",
    icon: Layers,
    color: "orange",
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 4,
    name: "DevOps",
    jobs: "1,560 Jobs",
    icon: GitBranch,
    color: "purple",
    gradient: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 5,
    name: "UI/UX Design",
    jobs: "1,670 Jobs",
    icon: Palette,
    color: "pink",
    gradient: "from-pink-50 to-pink-100",
    iconColor: "text-pink-600",
  },
  {
    id: 6,
    name: "Data Science",
    jobs: "2,380 Jobs",
    icon: BarChart3,
    color: "cyan",
    gradient: "from-cyan-50 to-cyan-100",
    iconColor: "text-cyan-600",
  },
];

export default function Categories() {
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
          Browse by Categories
        </motion.h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-8 h-8 ${category.iconColor}`} />
                  </motion.div>

                  {/* Category Name */}
                  <h3 className="text-sm font-bold text-[#0b1220] mb-2 line-clamp-2 min-h-[40px]">
                    {category.name}
                  </h3>

                  {/* Job Count */}
                  <p className="text-xs text-gray-400 font-medium">
                    {category.jobs}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
