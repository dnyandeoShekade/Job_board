"use client";

import React, { useState } from "react";
import { Check, Copy, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

export default function BulletComparisonCard({ improvedExperience = [] }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  if (!improvedExperience || improvedExperience.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm text-center py-10">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
        <h4 className="text-sm font-semibold text-slate-700">No Bullet Rewrites Required</h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
          Your experience bullets already demonstrate strong action verbs and measurable outcomes according to STAR/CAR frameworks.
        </p>
      </div>
    );
  }

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getFrameworkBadge = (framework) => {
    const f = (framework || "STAR").toUpperCase();
    if (f.includes("XYZ")) {
      return {
        bg: "bg-purple-100 text-purple-800 border-purple-200",
        label: "XYZ Framework (Google standard)",
      };
    }
    if (f.includes("CAR")) {
      return {
        bg: "bg-blue-100 text-blue-800 border-blue-200",
        label: "CAR (Challenge-Action-Result)",
      };
    }
    if (f.includes("ACTION")) {
      return {
        bg: "bg-teal-100 text-teal-800 border-teal-200",
        label: "Action Verb + Task + Result",
      };
    }
    return {
      bg: "bg-indigo-100 text-indigo-800 border-indigo-200",
      label: "STAR Framework",
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Evidence-Based Bullet Point Rewrites
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Strengthens weak opening verbs and duty-based phrases without fabricating your actual experience.
          </p>
        </div>

        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full self-start sm:self-auto">
          {improvedExperience.length} Bullet Suggestions
        </span>
      </div>

      <div className="space-y-4">
        {improvedExperience.map((item, idx) => {
          const badge = getFrameworkBadge(item.frameworkUsed);
          const isCopied = copiedIdx === idx;

          return (
            <div
              key={idx}
              className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/20"
            >
              {/* Header: Framework Used & User Confirmation indicator */}
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${badge.bg}`}>
                  {badge.label}
                </span>

                {item.requiresUserConfirmation && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <AlertCircle className="w-3 h-3" />
                    Verify metrics with candidate
                  </span>
                )}
              </div>

              {/* Body: Original vs Improved */}
              <div className="p-4 space-y-3">
                {/* Original */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Original Bullet
                  </span>
                  <div className="text-xs text-slate-600 bg-white border border-slate-200 rounded-lg p-2.5 line-through decoration-rose-400 decoration-1">
                    {item.originalText}
                  </div>
                </div>

                {/* Improved */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                      Recommended High-Impact Revision
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.improvedText, idx)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-slate-900 font-medium bg-emerald-50/50 border border-emerald-200/80 rounded-lg p-2.5 leading-relaxed">
                    {item.improvedText}
                  </div>
                </div>

                {/* Missing Evidence / Questions Tags */}
                {Array.isArray(item.missingEvidence) && item.missingEvidence.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-indigo-500" />
                      Candidate details to plug in:
                    </span>
                    {item.missingEvidence.map((ev, evIdx) => (
                      <span
                        key={evIdx}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded text-[10px] font-semibold"
                      >
                        {ev}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
