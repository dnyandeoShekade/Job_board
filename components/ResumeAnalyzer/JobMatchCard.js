"use client";

import React from "react";
import { Target, CheckCircle2, AlertCircle } from "lucide-react";

export default function JobMatchCard({ jobMatch = null }) {
  if (!jobMatch) return null;

  const score = typeof jobMatch.jobMatchScore === "number" ? jobMatch.jobMatchScore : 0;
  const breakdown = jobMatch.breakdown || {};
  const matchedSkills = jobMatch.matchedSkills || [];
  const missingSkills = jobMatch.missingSkills || [];

  const getScoreTheme = (val) => {
    if (val >= 80) return { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500", label: "Strong Match" };
    if (val >= 60) return { text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", bar: "bg-indigo-600", label: "Moderate Fit" };
    return { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", bar: "bg-amber-500", label: "Skills Gap" };
  };

  const theme = getScoreTheme(score);

  const criteria = [
    { label: "Required Skills", score: breakdown.requiredSkills ?? 0, max: 35 },
    { label: "Relevant Experience", score: breakdown.relevantExperience ?? 0, max: 25 },
    { label: "Responsibilities Fit", score: breakdown.responsibilities ?? 0, max: 20 },
    { label: "Qualifications", score: breakdown.qualifications ?? 0, max: 10 },
    { label: "Relevant Projects", score: breakdown.relevantProjects ?? 0, max: 10 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Job Match Analysis
            </h3>
          </div>

          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${theme.bg} ${theme.border}`}>
            <span className="text-[11px] font-semibold text-slate-500">Match:</span>
            <span className={`text-sm font-extrabold ${theme.text}`}>
              {score}%
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              ({theme.label})
            </span>
          </div>
        </div>

        {/* Criteria Breakdown */}
        <div className="space-y-2 mb-4">
          {criteria.map((item, idx) => {
            const pct = Math.min(100, Math.round((item.score / item.max) * 100));
            return (
              <div key={idx} className="space-y-0.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-slate-600">{item.label}</span>
                  <span className="font-bold text-slate-700">
                    {item.score} <span className="text-slate-400 font-normal">/ {item.max}</span>
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${theme.bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matched vs Missing Skills */}
      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
        {matchedSkills.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Matched Skills ({matchedSkills.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {matchedSkills.slice(0, 8).map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/70 rounded text-[10px] font-semibold"
                >
                  {sk}
                </span>
              ))}
              {matchedSkills.length > 8 && (
                <span className="text-[10px] text-slate-400 self-center">
                  +{matchedSkills.length - 8} more
                </span>
              )}
            </div>
          </div>
        )}

        {missingSkills.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
              Missing Target Keywords ({missingSkills.length})
            </span>
            <div className="flex flex-wrap gap-1">
              {missingSkills.slice(0, 6).map((sk, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/70 rounded text-[10px] font-semibold"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
