"use client";

import React, { useState } from "react";
import { Check, Copy, CheckCircle2, AlertTriangle, HelpCircle, FileText, Zap } from "lucide-react";

export default function FrameworksFeedbackCard({
  improvedSummary = "",
  strengths = [],
  weaknesses = [],
  improvementSuggestions = [],
  additionalQuestions = [],
  technicalSkills = [],
  softSkills = [],
}) {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = () => {
    if (!improvedSummary) return;
    navigator.clipboard.writeText(improvedSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Improved Summary */}
      {improvedSummary && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recommended Professional Summary
              </h3>
            </div>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-4">
            {improvedSummary}
          </p>
        </div>
      )}

      {/* Skills Matrix */}
      {(technicalSkills.length > 0 || softSkills.length > 0) && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Skills Detected & Indexed
            </h3>
          </div>

          <div className="space-y-4">
            {technicalSkills.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Technical & Hard Skills ({technicalSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {technicalSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-indigo-50/80 text-indigo-700 border border-indigo-200/60 rounded-md text-xs font-medium"
                    >
                      {typeof sk === "string" ? sk : sk.name || JSON.stringify(sk)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {softSkills.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Professional & Soft Skills ({softSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {softSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs font-medium"
                    >
                      {typeof sk === "string" ? sk : sk.name || JSON.stringify(sk)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Strengths & Actionable Improvements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Key Strengths & Evidence
            </h3>
          </div>

          {strengths.length > 0 ? (
            <ul className="space-y-2.5">
              {strengths.map((str, idx) => {
                const text = typeof str === "string" ? str : str.claim || str.evidence || JSON.stringify(str);
                return (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">Baseline resume standards met.</p>
          )}
        </div>

        {/* Actionable Improvements */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Actionable Recommendations
            </h3>
          </div>

          {(improvementSuggestions.length > 0 || weaknesses.length > 0) ? (
            <ul className="space-y-2.5">
              {(improvementSuggestions.length > 0 ? improvementSuggestions : weaknesses).map((sug, idx) => {
                const text = typeof sug === "string" ? sug : sug.claim || sug.deduction || JSON.stringify(sug);
                return (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">No major weaknesses identified.</p>
          )}
        </div>
      </div>

      {/* Additional Questions for Candidate */}
      {additionalQuestions.length > 0 && (
        <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Clarifying Questions to Elevate Your Bullets
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Our engine does not invent statistics. Answer these questions to provide exact metrics for your STAR bullet points:
          </p>

          <div className="space-y-3">
            {additionalQuestions.map((q, idx) => (
              <div key={idx} className="bg-white border border-indigo-200/70 rounded-xl p-3 text-xs space-y-1">
                {q.context && (
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">
                    Context: {q.context}
                  </span>
                )}
                <p className="font-medium text-slate-800">{q.question}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
