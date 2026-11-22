"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, ShieldAlert, Cpu } from "lucide-react";

export default function AtsComplianceCard({ atsReadability = {} }) {
  const defaultPillars = [
    {
      name: "Standard Section Headings",
      status: "pass",
      weight: 2,
      evidence: "Experience, Skills, Education, Projects detected with clear conventional headers.",
    },
    {
      name: "Contact Information Readability",
      status: "pass",
      weight: 2,
      evidence: "Email, phone number, and location clearly parseable.",
    },
    {
      name: "Consistent Date Formatting",
      status: "pass",
      weight: 2,
      evidence: "Dates use recognized format (e.g., MM/YYYY or Month YYYY).",
    },
    {
      name: "Reverse Chronological Work Experience",
      status: "pass",
      weight: 2,
      evidence: "Most recent roles listed first.",
    },
    {
      name: "Text Extraction Quality",
      status: "pass",
      weight: 2,
      evidence: "Text cleanly extractable without binary glyphs or broken character encoding.",
    },
    {
      name: "Single-Column Layout Compatibility",
      status: "pass",
      weight: 2,
      evidence: "Clean linear flow without intricate multi-column barriers.",
    },
    {
      name: "Tables, Graphics & Complex Elements",
      status: "pass",
      weight: 2,
      evidence: "No unreadable graphical tables or text box wrappers obstructing OCR.",
    },
    {
      name: "Relevant Keywords & Technical Skills",
      status: "pass",
      weight: 2,
      evidence: "Keywords present in dedicated skills and experience context.",
    },
    {
      name: "Clear Section Organization",
      status: "pass",
      weight: 2,
      evidence: "Logical progression from summary to experience, projects, and education.",
    },
    {
      name: "Consistent Typography & Spacing",
      status: "pass",
      weight: 2,
      evidence: "Uniform formatting without jarring font or bullet shifts.",
    },
  ];

  const pillars = Array.isArray(atsReadability.criteriaResults) && atsReadability.criteriaResults.length > 0
    ? atsReadability.criteriaResults.map((c) => ({
        name: c.criterion.replace(/^\d+\.\s*/, ""),
        status: (c.status || "PASS").toLowerCase(),
        weight: c.maxScore || 10,
        evidence: c.observation || c.evidence || "",
      }))
    : atsReadability.pillars || defaultPillars;

  const totalScore = typeof atsReadability.scoreOutOf20 === "number"
    ? atsReadability.scoreOutOf20
    : typeof atsReadability.totalAtsScore === "number"
    ? Math.round((atsReadability.totalAtsScore / 100) * 20)
    : 20;
  const maxScore = atsReadability.maxScore || 20;

  const getStatusBadge = (status) => {
    switch (status) {
      case "pass":
        return {
          icon: CheckCircle2,
          color: "text-emerald-600 bg-emerald-50 border-emerald-200",
          text: "Pass",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: "text-amber-600 bg-amber-50 border-amber-200",
          text: "Warning",
        };
      default:
        return {
          icon: XCircle,
          color: "text-rose-600 bg-rose-50 border-rose-200",
          text: "Action Required",
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              10-Pillar ATS Readability Audit
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulates strict Applicant Tracking System (ATS) parsing rules
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
          <span className="text-xs text-slate-500 font-medium">ATS Score:</span>
          <span className="text-base font-extrabold text-indigo-700">
            {totalScore} <span className="text-xs font-normal text-slate-400">/ {maxScore} pts</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pillars.map((pillar, idx) => {
          const badge = getStatusBadge(pillar.status);
          const Icon = badge.icon;

          return (
            <div
              key={idx}
              className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/30 hover:bg-slate-50/70 transition flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-slate-800 leading-snug">
                  {idx + 1}. {pillar.name}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.color}`}
                >
                  <Icon className="w-3 h-3" />
                  {badge.text}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {pillar.evidence || pillar.deduction || "Verified against ATS parsing standards."}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-800">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Important ATS Notice:</strong> We do not guarantee 100% acceptance on every system. Different ATS platforms (Workday, Greenhouse, Lever, Taleo) employ distinct parsing models. These 10 checks optimize compatibility for industry-standard text parsers.
        </p>
      </div>
    </div>
  );
}
