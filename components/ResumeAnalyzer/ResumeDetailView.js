"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Sparkles,
  FileText,
  Calendar,
  User,
  Share2,
  RefreshCw,
} from "lucide-react";
import ScoreGauge from "./ScoreGauge";
import ScoreBreakdownCard from "./ScoreBreakdownCard";
import AtsComplianceCard from "./AtsComplianceCard";
import BulletComparisonCard from "./BulletComparisonCard";
import JobMatchCard from "./JobMatchCard";
import FrameworksFeedbackCard from "./FrameworksFeedbackCard";

export default function ResumeDetailView({ evaluation = null, onAnalyzeAnother }) {
  if (!evaluation) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center space-y-4">
        <FileText className="w-10 h-10 text-slate-300 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Evaluation Loaded</h3>
        <p className="text-xs text-slate-500">
          The requested resume assessment could not be found or has not been loaded.
        </p>
        <Link
          href="/resume-analyzer/analyze"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
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
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently Evaluated";

  return (
    <div className="space-y-8 print:p-0">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/resume-analyzer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Report</span>
          </button>

          <Link
            href="/resume-analyzer/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-xs transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze Another</span>
          </Link>
        </div>
      </div>

      {/* Candidate & File Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <User className="w-3.5 h-3.5" />
            <span>Candidate Assessment</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {evaluation.candidateName || "Candidate Resume"}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
            {evaluation.filename && (
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {evaluation.filename}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
            Tier: {evaluation.candidateTier || "Experienced"}
          </span>
        </div>
      </div>

      {/* 1. Overall Score Gauge */}
      <ScoreGauge
        score={evaluation.overallScore}
        candidateTier={evaluation.candidateTier}
        scoreExplanation={evaluation.scoreExplanation}
      />

      {/* 2. Job Match Card (Independent JD Analysis if available) */}
      {evaluation.jobMatch && (
        <JobMatchCard jobMatch={evaluation.jobMatch} />
      )}

      {/* 3. Deterministic 7-Category Breakdown */}
      <ScoreBreakdownCard scoreBreakdown={evaluation.scoreBreakdown} />

      {/* 4. 10-Pillar ATS Compliance Audit */}
      <AtsComplianceCard atsReadability={evaluation.atsReadability} />

      {/* 5. Bullet Point Rewrites (STAR, CAR, XYZ, Action Verb) */}
      <BulletComparisonCard improvedExperience={evaluation.improvedExperience} />

      {/* 6. Summary, Skills, Strengths, Weaknesses, Clarifying Questions */}
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
