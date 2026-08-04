"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Tv,
  ShoppingCart,
  ShoppingBag,
  PlayCircle,
} from "lucide-react";

const brands = [
  { name: "Google", Icon: Globe, hoverColor: "hover:text-[#4285F4]" },
  { name: "Netflix", Icon: PlayCircle, hoverColor: "hover:text-[#E50914]" },
  { name: "Microsoft", Icon: Tv, hoverColor: "hover:text-[#00A4EF]" },
  { name: "Amazon", Icon: ShoppingCart, hoverColor: "hover:text-[#FF9900]" },
  { name: "Shopify", Icon: ShoppingBag, hoverColor: "hover:text-[#95BF47]" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function TrustedBrands() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="flex-1 h-px bg-gray-200"></div>
        <div className="w-2.5 h-2.5 bg-[#7eb356] rotate-45 rounded-sm"></div>

        <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
          Trusted by top brands
        </h2>

        <div className="w-2.5 h-2.5 bg-[#7eb356] rotate-45 rounded-sm"></div>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-5"
      >
        {brands.map((brand, index) => {
          const Icon = brand.Icon;

          return (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -3 }}
              className={`w-40 h-[72px] rounded-2xl border border-gray-100 bg-white flex items-center justify-center gap-3 text-gray-500 transition-all duration-300 cursor-pointer ${
                index === 0
                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                  : "shadow-sm hover:shadow-lg"
              } ${brand.hoverColor}`}
            >
              <Icon className="w-6 h-6" />

              <span className="font-semibold text-slate-700 text-sm">
                {brand.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}