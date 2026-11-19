"use client";

import React from "react";
import { Target, CheckCircle2, XCircle, Sparkles, AlertCircle } from "lucide-react";

export default function JobMatchCard({ jobMatch = null }) {
  if (!jobMatch) return null;

  const score = typeof jobMatch.jobMatchScore === "number" ? jobMatch.jobMatchScore : 0;
  const breakdown = jobMatch.breakdown || {};
  const matchedSkills = jobMatch.matchedSkills || [];
  const missingSkills = jobMatch.missingSkills || [];

  const getScoreTheme = (val) => {
    if (val >= 80) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500", label: "Strong Candidate Match" };
    if (val >= 60) return { text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", bar: "bg-indigo-600", label: "Moderate Job Fit" };
    return { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", bar: "bg-amber-500", label: "Skills Gap Detected" };
  };

  const theme = getScoreTheme(score);

  const criteria = [
    { label: "Required Skills Alignment", score: breakdown.requiredSkills ?? 0, max: 35 },
    { label: "Relevant Experience", score: breakdown.relevantExperience ?? 0, max: 25 },
    { label: "Key Responsibilities Fit", score: breakdown.responsibilities ?? 0, max: 20 },
    { label: "Qualifications & Degrees", score: breakdown.qualifications ?? 0, max: 10 },
    { label: "Relevant Projects & Portfolio", score: breakdown.relevantProjects ?? 0, max: 10 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Job Match Score (Independent Analysis)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluates candidate profile specifically against the provided Job Description.
          </p>
        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${theme.bg} ${theme.border}`}>
          <span className="text-xs font-semibold text-slate-600">Match:</span>
          <span className={`text-xl font-extrabold ${theme.text}`}>
            {score}%
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            ({theme.label})
          </span>
        </div>
      </div>

      {/* Criteria Breakdown */}
      <div className="space-y-3 mb-6">
        {criteria.map((item, idx) => {
          const pct = Math.min(100, Math.round((item.score / item.max) * 100));
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">{item.label}</span>
                <span className="font-bold text-slate-800">
                  {item.score} <span className="text-slate-400 font-normal">/ {item.max} pts</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${theme.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Matched vs Missing Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
        {/* Matched Skills */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Matched Skills & Keywords ({matchedSkills.length})
          </span>
          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {matchedSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-md text-[11px] font-semibold"
                >
                  {sk}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No exact keyword matches found.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Target Skills to Emphasize ({missingSkills.length})
          </span>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-md text-[11px] font-semibold"
                >
                  {sk}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">All key required skills were identified in your resume.</p>
          )}
        </div>
      </div>
    </div>
  );
}
