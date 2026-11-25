"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  ArrowLeft,
  AlertCircle,
  FileText,
  Target,
  Layers,
} from "lucide-react";
import SkillGapForm from "./SkillGapForm";
import SkillGapDashboard from "./SkillGapDashboard";
import SkillGapSkeleton from "./SkillGapSkeleton";
import { analyzeSkillGap } from "@/services/resumeService";

export default function SkillGapContainer() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async ({ file, resumeText, jobDescription }) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await analyzeSkillGap({ file, resumeText, jobDescription });
      if (response && response.success && response.data) {
        setData(response.data);
      } else {
        throw new Error(response?.message || "Failed to analyze skill gaps.");
      }
    } catch (err) {
      console.error("Skill Gap Analysis Error:", err);
      setError(err.message || "An error occurred while generating Skill Gap Intelligence.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/resume-analyzer"
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-600">
                Career Intelligence Platform
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700">
                Feature 3: Skill Gap
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Skill Gap Intelligence & Learning Roadmap
            </h1>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <Link
            href="/resume-analyzer"
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all"
          >
            ATS Audit
          </Link>
          <Link
            href="/resume-analyzer/analyze"
            className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition-all"
          >
            Upload Resume
          </Link>
          <Link
            href="/resume-analyzer/skill-intelligence"
            className="px-3 py-1.5 rounded-lg bg-white text-indigo-700 shadow-xs transition-all"
          >
            Skill Gap Intelligence
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => setError("")}
            className="text-xs font-bold text-rose-900 hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Content Areas */}
      {loading ? (
        <SkillGapSkeleton />
      ) : data ? (
        <SkillGapDashboard data={data} onReset={handleReset} />
      ) : (
        <SkillGapForm onSubmit={handleSubmit} loading={loading} />
      )}
    </div>
  );
}
