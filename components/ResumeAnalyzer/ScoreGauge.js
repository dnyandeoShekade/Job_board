"use client";

import React from "react";
import { Award, CheckCircle, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";

export default function ScoreGauge({ score = 0, candidateTier = "Experienced professional", scoreExplanation = "" }) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Gauge calculation
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getScoreTheme = (val) => {
    if (val >= 80) {
      return {
        stroke: "#10b981", // emerald-500
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        badge: "bg-emerald-100 text-emerald-800",
        status: "ATS Ready - Highly Competitive",
        icon: CheckCircle,
      };
    }
    if (val >= 65) {
      return {
        stroke: "#4f46e5", // indigo-600
        bg: "bg-indigo-50",
        text: "text-indigo-700",
        border: "border-indigo-200",
        badge: "bg-indigo-100 text-indigo-800",
        status: "Good - Minor Enhancements Suggested",
        icon: ShieldCheck,
      };
    }
    if (val >= 50) {
      return {
        stroke: "#f59e0b", // amber-500
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        badge: "bg-amber-100 text-amber-800",
        status: "Moderate - Key Frameworks Missing",
        icon: AlertTriangle,
      };
    }
    return {
      stroke: "#ef4444", // red-500
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      badge: "bg-red-100 text-red-800",
      status: "Needs Comprehensive Revision",
      icon: XCircle,
    };
  };

  const theme = getScoreTheme(normalizedScore);
  const StatusIcon = theme.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Circular Meter */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-44 h-44 -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Foreground progress */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={theme.stroke}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {normalizedScore}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Out of 100
            </span>
          </div>
        </div>

        {/* Right: Score Insights */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${theme.badge}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {theme.status}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              <Award className="w-3.5 h-3.5 text-indigo-500" />
              Tier: <strong className="font-semibold text-slate-900 ml-1">{candidateTier}</strong>
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Resume Quality Score
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {scoreExplanation ||
              "Calculated deterministically using verified weights across ATS Readability (20%), Work Experience (25%), Skills (15%), Projects (15%), Achievements (10%), Education (5%), and Grammar (10%)."}
          </p>

          <div className="pt-2 text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Evidence-based scoring: No invented numbers or unverified deductions.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
