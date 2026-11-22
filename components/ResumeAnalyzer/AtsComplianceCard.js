"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, ShieldAlert, Cpu } from "lucide-react";

export default function AtsComplianceCard({ atsReadability = {} }) {
  const defaultPillars = [
    { name: "Standard Section Headings", status: "pass", evidence: "Headers clearly recognizable." },
    { name: "Contact Information Readability", status: "pass", evidence: "Email & phone readable." },
    { name: "Consistent Date Formatting", status: "pass", evidence: "Standard date format detected." },
    { name: "Reverse Chronological Experience", status: "pass", evidence: "Most recent roles first." },
    { name: "Text Extraction Quality", status: "pass", evidence: "Text cleanly extractable." },
    { name: "Single-Column Compatibility", status: "pass", evidence: "Linear stream layout." },
    { name: "Tables & Graphic Obstacles", status: "pass", evidence: "No blocking frames." },
    { name: "Keywords & Technical Skills", status: "pass", evidence: "Skills categorized." },
    { name: "Clear Section Organization", status: "pass", evidence: "Distinct demarcations." },
    { name: "Consistent Typography & Spacing", status: "pass", evidence: "Standard font hierarchy." },
  ];

  const pillars = Array.isArray(atsReadability.criteriaResults) && atsReadability.criteriaResults.length > 0
    ? atsReadability.criteriaResults.map((c) => ({
        name: c.criterion.replace(/^\d+\.\s*/, ""),
        status: (c.status || "PASS").toLowerCase(),
        evidence: c.observation || c.evidence || "",
      }))
    : atsReadability.pillars || defaultPillars;

  const totalScore = typeof atsReadability.scoreOutOf20 === "number"
    ? atsReadability.scoreOutOf20
    : typeof atsReadability.totalAtsScore === "number"
    ? Math.round((atsReadability.totalAtsScore / 100) * 20)
    : 20;

  const getStatusBadge = (status) => {
    switch (status) {
      case "pass":
        return { icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50 border-emerald-200", text: "Pass" };
      case "warning":
        return { icon: AlertTriangle, color: "text-amber-700 bg-amber-50 border-amber-200", text: "Warning" };
      default:
        return { icon: XCircle, color: "text-rose-700 bg-rose-50 border-rose-200", text: "Fix" };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            10-Pillar ATS Readability Audit
          </h3>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-50 border border-indigo-200/60 text-xs font-bold text-indigo-700">
          <span>{totalScore} / 20 pts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {pillars.map((pillar, idx) => {
          const badge = getStatusBadge(pillar.status);
          const Icon = badge.icon;

          return (
            <div
              key={idx}
              className="border border-slate-100 rounded-xl p-2.5 bg-slate-50/30 flex items-start justify-between gap-2"
            >
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-800 block truncate">
                  {idx + 1}. {pillar.name}
                </span>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {pillar.evidence || "Passed standard criteria"}
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0 ${badge.color}`}
              >
                <Icon className="w-2.5 h-2.5" />
                {badge.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
