"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  BookOpen,
  Compass,
  Code2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Clock,
  Briefcase,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export default function SkillGapDashboard({ data, onReset }) {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "strong" | "improve" | "missing" | "projects" | "roadmap"

  if (!data || !data.overview) return null;

  const { overview, strongSkills = [], needsImprovementSkills = [], missingSkills = [], projectRecommendations = [], learningRoadmap = {} } = data;
  const coverage = Math.max(0, Math.min(100, Math.round(overview.skillCoveragePercentage || 0)));

  // Gauge calculation
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (coverage / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 75) return { stroke: "#10b981", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (val >= 50) return { stroke: "#6366f1", text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" };
    return { stroke: "#f59e0b", text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" };
  };

  const theme = getScoreColor(coverage);

  return (
    <div className="space-y-6">
      {/* TOP HEADER: Overview & Coverage Circular Gauge */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 w-full lg:w-auto">
            {/* SVG Circular Gauge */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="48"
                  cy="48"
                  r={radius}
                  stroke={theme.stroke}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-black tracking-tight ${theme.text}`}>
                  {coverage}%
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Coverage
                </span>
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Evidence-Backed Skill Intelligence</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Skill Gap & Competency Analysis
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                {overview.summaryVerdict}
              </p>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Required
              </span>
              <span className="text-xl font-extrabold text-slate-900">
                {overview.totalRequiredSkillsCount}
              </span>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                Strong
              </span>
              <span className="text-xl font-extrabold text-emerald-800">
                {overview.strongSkillsCount}
              </span>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                Improving
              </span>
              <span className="text-xl font-extrabold text-amber-800">
                {overview.needsImprovementCount}
              </span>
            </div>

            <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                Missing
              </span>
              <span className="text-xl font-extrabold text-rose-800">
                {overview.missingSkillsCount}
              </span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          {/* Navigation Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-semibold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
              }`}
            >
              All Competencies ({strongSkills.length + needsImprovementSkills.length + missingSkills.length})
            </button>
            <button
              onClick={() => setActiveTab("strong")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "strong"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80"
              }`}
            >
              Strong Skills ({strongSkills.length})
            </button>
            <button
              onClick={() => setActiveTab("improve")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "improve"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100/80"
              }`}
            >
              Needs Improvement ({needsImprovementSkills.length})
            </button>
            <button
              onClick={() => setActiveTab("missing")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "missing"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-rose-50 text-rose-700 hover:bg-rose-100/80"
              }`}
            >
              Missing Skills ({missingSkills.length})
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "projects"
                  ? "bg-indigo-900 text-white shadow-xs"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100/80"
              }`}
            >
              Portfolio Projects ({projectRecommendations.length})
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "roadmap"
                  ? "bg-indigo-900 text-white shadow-xs"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100/80"
              }`}
            >
              Learning Roadmap
            </button>
          </div>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Analyze Another Job</span>
          </button>
        </div>
      </div>

      {/* THREE-TIER SKILLS BREAKDOWN SECTION */}
      {(activeTab === "all" || activeTab === "strong" || activeTab === "improve" || activeTab === "missing") && (
        <div className="space-y-6">
          {/* 1. STRONG SKILLS */}
          {(activeTab === "all" || activeTab === "strong") && strongSkills.length > 0 && (
            <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Strong Skills (Clearly Supported by Resume Evidence)
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  {strongSkills.length} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {strongSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-800">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-emerald-800 font-semibold">Evidence: </strong>
                      {skill.evidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. NEEDS IMPROVEMENT SKILLS */}
          {(activeTab === "all" || activeTab === "improve") && needsImprovementSkills.length > 0 && (
            <div className="bg-white rounded-2xl border border-amber-100 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Needs Improvement (Mentioned with Limited Evidence)
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  {needsImprovementSkills.length} Identified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {needsImprovementSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-950">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white border border-amber-200 text-amber-800">
                          Priority: {skill.priority}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-amber-800 font-semibold">Where Mentioned: </strong>
                      {skill.currentEvidence}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-amber-800 font-semibold">Why Needs Work: </strong>
                      {skill.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MISSING SKILLS */}
          {(activeTab === "all" || activeTab === "missing") && missingSkills.length > 0 && (
            <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Missing Skills (Required by Job, Absent in Resume)
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                  {missingSkills.length} Missing
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {missingSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-950">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            skill.priority === "High"
                              ? "bg-rose-600 text-white"
                              : "bg-white border border-rose-200 text-rose-800"
                          }`}
                        >
                          {skill.priority} Priority
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-rose-900 font-semibold">Job Requirement: </strong>
                      {skill.requiredContext}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-rose-900 font-semibold">Impact on Application: </strong>
                      {skill.impactOnApplication}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PORTFOLIO PROJECT RECOMMENDATIONS */}
      {(activeTab === "all" || activeTab === "projects") && projectRecommendations.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Targeted Portfolio Project Recommendations
                </h3>
                <p className="text-xs text-slate-500">
                  Practical projects built specifically to bridge your verified skill gaps.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
              {projectRecommendations.length} Actionable Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {projectRecommendations.map((proj, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {proj.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        proj.estimatedDifficulty === "Advanced"
                          ? "bg-purple-100 text-purple-800 border border-purple-200"
                          : proj.estimatedDifficulty === "Intermediate"
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {proj.estimatedDifficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Skills Demonstrated */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Demonstrates Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.demonstratedSkills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-indigo-200 text-indigo-800"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Recommended Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  {proj.keyDeliverables && proj.keyDeliverables.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Key Deliverables
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {proj.keyDeliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Estimated: {proj.estimatedHours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PERSONALIZED LEARNING ROADMAP TIMELINE */}
      {(activeTab === "all" || activeTab === "roadmap") && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Personalized Learning Roadmap
              </h3>
              <p className="text-xs text-slate-500">
                Step-by-step career milestones structured across Beginner, Intermediate, and Advanced priorities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {/* Beginner Stage */}
            <div className="border border-emerald-200 bg-emerald-50/20 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Phase 1: Beginner
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {learningRoadmap.beginnerPriorities?.[0]?.timeframe || "Weeks 1-2"}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900">
                  {learningRoadmap.beginnerPriorities?.[0]?.focusArea || "Core Fundamentals"}
                </h4>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Actionable Tasks
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {learningRoadmap.beginnerPriorities?.[0]?.practicalTasks?.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Milestone Outcome
                </span>
                <p className="text-xs font-semibold text-slate-800">
                  {learningRoadmap.beginnerPriorities?.[0]?.milestoneProject}
                </p>
              </div>
            </div>

            {/* Intermediate Stage */}
            <div className="border border-indigo-200 bg-indigo-50/20 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    Phase 2: Intermediate
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {learningRoadmap.intermediatePriorities?.[0]?.timeframe || "Weeks 3-4"}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900">
                  {learningRoadmap.intermediatePriorities?.[0]?.focusArea || "Applied Architecture"}
                </h4>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Actionable Tasks
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {learningRoadmap.intermediatePriorities?.[0]?.practicalTasks?.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-indigo-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block mb-1">
                  Milestone Outcome
                </span>
                <p className="text-xs font-semibold text-slate-800">
                  {learningRoadmap.intermediatePriorities?.[0]?.milestoneProject}
                </p>
              </div>
            </div>

            {/* Advanced Stage */}
            <div className="border border-purple-200 bg-purple-50/20 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    Phase 3: Advanced
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {learningRoadmap.advancedPriorities?.[0]?.timeframe || "Month 2"}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900">
                  {learningRoadmap.advancedPriorities?.[0]?.focusArea || "Production Readiness"}
                </h4>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Actionable Tasks
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {learningRoadmap.advancedPriorities?.[0]?.practicalTasks?.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block mb-1">
                  Milestone Outcome
                </span>
                <p className="text-xs font-semibold text-slate-800">
                  {learningRoadmap.advancedPriorities?.[0]?.milestoneProject}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
