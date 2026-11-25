"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Cpu, Layers, BookOpen, Compass } from "lucide-react";

const STAGES = [
  { text: "Extracting competencies across resume & job description...", icon: Layers },
  { text: "Verifying supporting project & work experience evidence...", icon: Cpu },
  { text: "Validating intelligence payload via strict Zod schema...", icon: Sparkles },
  { text: "Synthesizing portfolio projects to bridge missing skills...", icon: BookOpen },
  { text: "Generating 3-stage personalized learning roadmap...", icon: Compass },
];

export default function SkillGapSkeleton() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const ActiveIcon = STAGES[currentStage].icon;

  return (
    <div className="space-y-6 animate-pulse">
      {/* Live AI Status Ticker */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-5 border border-indigo-500/20 shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
            <ActiveIcon className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-300">
                AI Career Intelligence Engine Active
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100 transition-all duration-300">
              {STAGES[currentStage].text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {STAGES.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentStage
                  ? "w-8 bg-indigo-400"
                  : idx < currentStage
                  ? "w-3 bg-emerald-400"
                  : "w-3 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Top Banner Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-slate-200 shrink-0" />
          <div className="flex-1 w-full space-y-3">
            <div className="h-6 bg-slate-200 rounded-md w-1/3" />
            <div className="h-4 bg-slate-100 rounded-md w-full" />
            <div className="h-4 bg-slate-100 rounded-md w-4/5" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 2, 3].map((col) => (
          <div key={col} className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 bg-slate-200 rounded w-1/2" />
              <div className="h-5 bg-slate-100 rounded-full w-8" />
            </div>
            {[1, 2, 3].map((card) => (
              <div key={card} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-100 rounded w-full" />
                <div className="h-3 bg-slate-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Project Recommendations Skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-4">
        <div className="h-5 bg-slate-200 rounded w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded-full w-16" />
                <div className="h-6 bg-slate-200 rounded-full w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
