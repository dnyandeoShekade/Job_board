"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  FileText,
  TrendingUp,
  Award,
  ArrowRight,
  Clock,
  Target,
  PlusCircle,
  History,
  CheckCircle2,
  AlertCircle,
  FileCode,
} from "lucide-react";
import { getMyEvaluations } from "@/services/resumeService";

export default function ResumeDashboard() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchHistory() {
      try {
        const res = await getMyEvaluations();
        if (!mounted) return;
        if (res && res.success && Array.isArray(res.data)) {
          setEvaluations(res.data);
        }
      } catch (err) {
        if (!mounted) return;
        console.error("Failed to load evaluations:", err);
        setError("Could not load previous evaluations. Please make sure you are signed in.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchHistory();

    return () => {
      mounted = false;
    };
  }, []);

  // Compute live statistics without hardcoding
  const totalCount = evaluations.length;
  const latestEvaluation = totalCount > 0 ? evaluations[0] : null;
  const latestScore = latestEvaluation ? latestEvaluation.overallScore : null;

  const averageScore =
    totalCount > 0
      ? Math.round(
          evaluations.reduce((acc, curr) => acc + (curr.overallScore || 0), 0) /
            totalCount
        )
      : null;

  const latestJobMatch = evaluations.find(
    (e) => e.jobMatch && typeof e.jobMatch.jobMatchScore === "number"
  );
  const latestJobMatchScore = latestJobMatch
    ? latestJobMatch.jobMatch.jobMatchScore
    : null;

  const recentList = evaluations.slice(0, 5);

  const getScoreColorBadge = (score) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (score >= 65) return "bg-indigo-100 text-indigo-800 border-indigo-200";
    if (score >= 50) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-rose-100 text-rose-800 border-rose-200";
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Phase 3 Evidence-Based Evaluation Engine</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            AI Resume Analyzer
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Evaluate your resume against verified hiring frameworks: STAR, CAR, Action+Task+Result, and Google XYZ. Optimize for 10-Pillar ATS compatibility with deterministic scoring.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/resume-analyzer/analyze"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-900 hover:bg-slate-100 font-bold text-sm shadow-md transition transform active:scale-95"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              <span>Analyze New Resume</span>
            </Link>

            <Link
              href="/resume-analyzer/history"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-800/80 hover:bg-indigo-700/80 border border-indigo-600/50 text-white font-semibold text-sm transition"
            >
              <History className="w-4 h-4" />
              <span>View History ({totalCount})</span>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Resumes */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Resumes
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading ? "..." : totalCount}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">Evaluations recorded</span>
          </div>
        </div>

        {/* Card 2: Latest Quality Score */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Latest Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading
                ? "..."
                : latestScore !== null
                ? `${latestScore}/100`
                : "—"}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              {latestEvaluation
                ? latestEvaluation.candidateTier || "Validated quality"
                : "No evaluations yet"}
            </span>
          </div>
        </div>

        {/* Card 3: Average Quality Score */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Average Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading
                ? "..."
                : averageScore !== null
                ? `${averageScore}/100`
                : "—"}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">Across saved versions</span>
          </div>
        </div>

        {/* Card 4: Latest Job Match */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Latest Job Match
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading
                ? "..."
                : latestJobMatchScore !== null
                ? `${latestJobMatchScore}%`
                : "—"}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              {latestJobMatchScore !== null ? "Job alignment fit" : "No JD provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/resume-analyzer/analyze"
          className="group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
              Upload New PDF
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Drag-and-drop your PDF resume for instant ATS and STAR bullet evaluation.
            </p>
          </div>
        </Link>

        <Link
          href="/resume-analyzer/analyze"
          className="group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition">
              Target Job Match
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Compare your resume against any job description to discover missing keywords.
            </p>
          </div>
        </Link>

        <Link
          href="/resume-analyzer/history"
          className="group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
              Past Evaluations
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Review progression, track improvements, and revisit previous bullet suggestions.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Evaluations Table or Empty State */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Recent Evaluations
            </h3>
            <p className="text-xs text-slate-500">
              History of analyzed resumes and scores
            </p>
          </div>

          {recentList.length > 0 && (
            <Link
              href="/resume-analyzer/history"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            Loading your evaluations...
          </div>
        ) : recentList.length === 0 ? (
          /* Empty State */
          <div className="py-12 px-4 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">
                No Resumes Evaluated Yet
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Upload your resume PDF or paste your text to get an instant evidence-based score, ATS compliance check, and STAR/CAR rewrites.
              </p>
            </div>
            <Link
              href="/resume-analyzer/analyze"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Analyze Your First Resume</span>
            </Link>
          </div>
        ) : (
          /* Table of Recent Evaluations */
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Resume / File</th>
                  <th className="pb-3">Candidate Tier</th>
                  <th className="pb-3 text-center">Quality Score</th>
                  <th className="pb-3 text-center">Job Match</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentList.map((item) => {
                  const scoreBadge = getScoreColorBadge(item.overallScore);
                  const dateStr = item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recent";

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 pl-2 font-medium text-slate-900 flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span className="truncate max-w-[200px]">
                          {item.filename || item.candidateName || "Resume Assessment"}
                        </span>
                      </td>

                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {item.candidateTier || "Experienced"}
                        </span>
                      </td>

                      <td className="py-3.5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-xs border ${scoreBadge}`}
                        >
                          {item.overallScore} / 100
                        </span>
                      </td>

                      <td className="py-3.5 text-center">
                        {item.jobMatch && typeof item.jobMatch.jobMatchScore === "number" ? (
                          <span className="inline-block px-2 py-0.5 rounded-full font-bold text-xs bg-purple-50 text-purple-700 border border-purple-200">
                            {item.jobMatch.jobMatchScore}%
                          </span>
                        ) : (
                          <span className="text-slate-400 font-normal">—</span>
                        )}
                      </td>

                      <td className="py-3.5 text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{dateStr}</span>
                        </div>
                      </td>

                      <td className="py-3.5 pr-2 text-right">
                        <Link
                          href={`/resume-analyzer/${item._id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                          <span>View Report</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
