"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const handleCategoryClick = (categoryName) => {
    router.push(`/job?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center sm:text-left mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-[#0b1220]"
          >
            Browse by Categories
          </motion.h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-500">
            Explore diverse career paths tailored to your expertise
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
                onClick={() => handleCategoryClick(category.name)}
                className="cursor-pointer"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full justify-between">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, -8, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-3 shrink-0`}
                  >
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${category.iconColor}`} />
                  </motion.div>

                  {/* Category Name */}
                  <h3 className="text-xs sm:text-sm font-bold text-[#0b1220] mb-1 line-clamp-2">
                    {category.name}
                  </h3>

                  {/* Job Count */}
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
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
