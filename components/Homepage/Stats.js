"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Building2, Users, Send } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Briefcase,
    number: "5,000+",
    label: "Jobs Available",
  },
  {
    id: 2,
    icon: Building2,
    number: "1,000+",
    label: "Companies Hiring",
  },
  {
    id: 3,
    icon: Users,
    number: "10,000+",
    label: "Candidates",
  },
  {
    id: 4,
    icon: Send,
    number: "500+",
    label: "Daily Applications",
  },
];

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-12 h-12 md:w-14 md:h-14 text-white/90 mb-3" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
