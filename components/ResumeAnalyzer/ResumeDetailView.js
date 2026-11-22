"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Sparkles,
  FileText,
  Calendar,
  Award,
  CheckCircle,
  ShieldCheck,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import ScoreBreakdownCard from "./ScoreBreakdownCard";
import AtsComplianceCard from "./AtsComplianceCard";
import BulletComparisonCard from "./BulletComparisonCard";
import JobMatchCard from "./JobMatchCard";
import FrameworksFeedbackCard from "./FrameworksFeedbackCard";

export default function ResumeDetailView({ evaluation = null, onAnalyzeAnother }) {
  if (!evaluation) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
        <FileText className="w-8 h-8 text-slate-300 mx-auto" />
        <h3 className="text-sm font-bold text-slate-800">No Evaluation Loaded</h3>
        <p className="text-xs text-slate-500">
          The requested resume assessment could not be found or has not been loaded.
        </p>
        <Link
          href="/resume-analyzer/analyze"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
        >
          <Sparkles className="w-3 h-3" />
          <span>Start New Analysis</span>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const formattedDate = evaluation.createdAt
    ? new Date(evaluation.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Evaluated";

  const score = Math.max(0, Math.min(100, Math.round(evaluation.overallScore || 0)));

  // Gauge calculation (Compact)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreTheme = (val) => {
    if (val >= 80) {
      return {
        stroke: "#10b981",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        status: "ATS Ready - Highly Competitive",
        icon: CheckCircle,
      };
    }
    if (val >= 65) {
      return {
        stroke: "#4f46e5",
        badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
        status: "Good - Minor Enhancements Suggested",
        icon: ShieldCheck,
      };
    }
    if (val >= 50) {
      return {
        stroke: "#f59e0b",
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        status: "Moderate - Needs Key Frameworks",
        icon: AlertTriangle,
      };
    }
    return {
      stroke: "#ef4444",
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      status: "Needs Comprehensive Revision",
      icon: XCircle,
    };
  };

  const theme = getScoreTheme(score);
  const StatusIcon = theme.icon;

  return (
    <div className="space-y-4 print:p-0">
      {/* Top Breadcrumb & Quick Nav */}
      <div className="flex items-center justify-between text-xs print:hidden">
        <Link
          href="/resume-analyzer"
          className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Unified Compact Hero Assessment & Score Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Candidate Information & Overview */}
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 flex items-center gap-1">
                <Award className="w-3 h-3" />
                Tier: <strong className="font-bold">{evaluation.candidateTier || "Entry-level"}</strong>
              </span>

              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${theme.badge}`}>
                <StatusIcon className="w-3 h-3" />
                {theme.status}
              </span>

              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              {evaluation.candidateName || "Candidate Resume"}
            </h1>

            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              {evaluation.scoreExplanation ||
                "Evidence-based evaluation across STAR/CAR frameworks, action verbs, and 10-Pillar ATS parsing rules."}
            </p>
          </div>

          {/* Right: Compact Score Meter + Actions */}
          <div className="flex items-center gap-4 shrink-0 self-end md:self-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
            {/* 80px SVG Meter */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 90 90">
                <circle
                  cx="45"
                  cy="45"
                  r={radius}
                  stroke="#f1f5f9"
                  strokeWidth="7"
                  fill="transparent"
                />
                <circle
                  cx="45"
                  cy="45"
                  r={radius}
                  stroke={theme.stroke}
                  strokeWidth="7"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-slate-900 leading-none">
                  {score}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1.5 print:hidden">
              <Link
                href="/resume-analyzer/analyze"
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-[11px] font-bold text-white shadow-2xs transition"
              >
                <Sparkles className="w-3 h-3" />
                <span>Analyze Another</span>
              </Link>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 transition"
              >
                <Printer className="w-3 h-3 text-slate-500" />
                <span>Print Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid (Side-by-side on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Job Match (if present) OR ATS Compliance */}
        {evaluation.jobMatch ? (
          <JobMatchCard jobMatch={evaluation.jobMatch} />
        ) : (
          <AtsComplianceCard atsReadability={evaluation.atsReadability} />
        )}

        {/* Right Column: Deterministic 7-Category Breakdown */}
        <ScoreBreakdownCard scoreBreakdown={evaluation.scoreBreakdown} />
      </div>

      {/* If Job Match was present, render ATS Compliance below it */}
      {evaluation.jobMatch && (
        <AtsComplianceCard atsReadability={evaluation.atsReadability} />
      )}

      {/* Bullet Point Rewrites (STAR, CAR, XYZ, Action Verb) */}
      <BulletComparisonCard improvedExperience={evaluation.improvedExperience} />

      {/* Frameworks Feedback: Summary, Skills Matrix, Strengths & Weaknesses */}
      <FrameworksFeedbackCard
        improvedSummary={evaluation.improvedSummary}
        strengths={evaluation.strengths}
        weaknesses={evaluation.weaknesses}
        improvementSuggestions={evaluation.improvementSuggestions}
        additionalQuestions={evaluation.additionalQuestions}
        technicalSkills={evaluation.technicalSkills || evaluation.detectedSkills}
        softSkills={evaluation.softSkills}
      />
    </div>
  );
}
