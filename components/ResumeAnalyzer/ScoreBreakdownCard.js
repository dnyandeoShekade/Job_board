"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Info } from "lucide-react";

const CATEGORY_META = {
  structureAndAts: {
    label: "Structure & ATS Readability",
    weight: 20,
    description: "Evaluates standard headings, contact info readability, single-column parsing, and formatting.",
  },
  workExperience: {
    label: "Work Experience (STAR/CAR)",
    weight: 25,
    description: "Evaluates action verbs, task context, outcomes, and STAR/CAR framework adherence.",
  },
  technicalSkills: {
    label: "Technical & Professional Skills",
    weight: 15,
    description: "Evaluates categorized hard skills, relevant tools, and keyword density.",
  },
  projects: {
    label: "Projects & Contributions",
    weight: 15,
    description: "Assesses practical applications, tech stack context, and project deliverables.",
  },
  achievements: {
    label: "Achievements & Measurable Impact",
    weight: 10,
    description: "Checks for quantified outcomes, XYZ achievement structures, and metrics.",
  },
  education: {
    label: "Education & Certifications",
    weight: 5,
    description: "Validates degree credibility, institution, graduation timeline, and credentials.",
  },
  grammarAndReadability: {
    label: "Grammar & Professional Tone",
    weight: 10,
    description: "Analyzes sentence structure, repetitive verbs, active voice, and polish.",
  },
};

export default function ScoreBreakdownCard({ scoreBreakdown = {} }) {
  const [expandedCat, setExpandedCat] = useState(null);

  const toggleCategory = (key) => {
    setExpandedCat((prev) => (prev === key ? null : key));
  };

  const categories = Object.keys(CATEGORY_META);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Deterministic Score Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Total 100 points calculated directly from validated category assessments
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
          7 Categories
        </span>
      </div>

      <div className="space-y-4">
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
              className="border border-slate-100 rounded-xl p-3.5 hover:border-slate-200 transition bg-slate-50/40"
            >
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleCategory(key)}
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-800">
                      {meta.label}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {score} <span className="text-slate-400 font-normal">/ {maxScore} pts</span>
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
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
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="mt-4 pt-3 border-t border-slate-200/70 text-xs space-y-3">
                  <p className="text-slate-500 italic">{meta.description}</p>

                  {/* Evidence Points */}
                  {Array.isArray(catData.evidence) && catData.evidence.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified Strengths ({catData.evidence.length}):
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                        {catData.evidence.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Deductions & Missing Items */}
                  {Array.isArray(catData.deductions) && catData.deductions.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="font-semibold text-amber-700 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Areas for Improvement ({catData.deductions.length}):
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
                        {catData.deductions.map((item, idx) => (
                          <li key={idx} className="leading-relaxed text-amber-900/80">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(!catData.evidence?.length && !catData.deductions?.length) && (
                    <div className="text-slate-400 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Standard scoring applied.
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
