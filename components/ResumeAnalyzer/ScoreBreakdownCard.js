"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Info, BarChart3 } from "lucide-react";

const CATEGORY_META = {
  structureAndAts: { label: "Structure & ATS", weight: 20 },
  workExperience: { label: "Experience (STAR/CAR)", weight: 25 },
  technicalSkills: { label: "Technical Skills", weight: 15 },
  projects: { label: "Projects & Portfolio", weight: 15 },
  achievements: { label: "Measurable Impact", weight: 10 },
  education: { label: "Education & Credentials", weight: 5 },
  grammarAndReadability: { label: "Grammar & Professional Tone", weight: 10 },
};

export default function ScoreBreakdownCard({ scoreBreakdown = {} }) {
  const [expandedCat, setExpandedCat] = useState(null);

  const toggleCategory = (key) => {
    setExpandedCat((prev) => (prev === key ? null : key));
  };

  const categories = Object.keys(CATEGORY_META);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Deterministic Breakdown (100 pts)
          </h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
          7 Categories
        </span>
      </div>

      <div className="space-y-2">
        {categories.map((key) => {
          const meta = CATEGORY_META[key];
          const catData = scoreBreakdown[key] || {
            score: 0,
            maxScore: meta.weight,
            evidence: [],
            deductions: [],
          };

          const score = typeof catData.score === "number" ? catData.score : 0;
          const maxScore = catData.maxScore || meta.weight;
          const percentage = Math.min(100, Math.round((score / maxScore) * 100));
          const isExpanded = expandedCat === key;

          const getBarColor = (pct) => {
            if (pct >= 80) return "bg-emerald-500";
            if (pct >= 60) return "bg-indigo-600";
            if (pct >= 40) return "bg-amber-500";
            return "bg-rose-500";
          };

          return (
            <div
              key={key}
              className="border border-slate-100 rounded-xl p-2.5 bg-slate-50/40 hover:bg-slate-50 transition"
            >
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleCategory(key)}
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">
                      {meta.label}
                    </span>
                    <span className="font-bold text-slate-800">
                      {score} <span className="text-slate-400 font-normal">/ {maxScore}</span>
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getBarColor(
                        percentage
                      )}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Toggle details"
                  className="p-1 rounded text-slate-400 hover:text-slate-600 transition"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] space-y-2">
                  {Array.isArray(catData.evidence) && catData.evidence.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Strengths:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                        {catData.evidence.map((item, idx) => (
                          <li key={idx} className="leading-snug">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(catData.deductions) && catData.deductions.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-bold text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Areas for improvement:
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-amber-900/80 pl-1">
                        {catData.deductions.map((item, idx) => (
                          <li key={idx} className="leading-snug">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
