"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ArrowRight,
  Clock,
  FileCode,
  Sparkles,
  ArrowUpDown,
  FileText,
} from "lucide-react";
import { getMyEvaluations } from "@/services/resumeService";

export default function EvaluationHistoryTable() {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");

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
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchHistory();

    return () => {
      mounted = false;
    };
  }, []);

  // Filter & Search logic
  const filteredList = evaluations.filter((item) => {
    const term = searchTerm.toLowerCase();
    const nameMatch =
      (item.candidateName && item.candidateName.toLowerCase().includes(term)) ||
      (item.filename && item.filename.toLowerCase().includes(term));

    const tierMatch =
      selectedTier === "ALL" ||
      (item.candidateTier &&
        item.candidateTier.toUpperCase() === selectedTier.toUpperCase());

    return nameMatch && tierMatch;
  });

  // Sort logic
  const sortedList = [...filteredList].sort((a, b) => {
    if (sortOrder === "NEWEST") {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortOrder === "HIGHEST") {
      return (b.overallScore || 0) - (a.overallScore || 0);
    }
    if (sortOrder === "LOWEST") {
      return (a.overallScore || 0) - (b.overallScore || 0);
    }
    return 0;
  });

  const getScoreBadge = (score) => {
    if (score >= 80) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 65) return "bg-indigo-50 text-indigo-700 border-indigo-200";
    if (score >= 50) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Evaluation History
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View all previous resume analyses, ATS reports, and framework evaluations.
          </p>
        </div>

        <Link
          href="/resume-analyzer/analyze"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs self-start md:self-auto transition"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by resume title or candidate name..."
            className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>

        {/* Tier Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="ALL">All Tiers</option>
            <option value="Fresher">Fresher</option>
            <option value="Entry-level">Entry-level</option>
            <option value="Experienced professional">Experienced professional</option>
            <option value="Career switcher">Career switcher</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="NEWEST">Newest First</option>
            <option value="HIGHEST">Highest Score</option>
            <option value="LOWEST">Lowest Score</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-400">
          Loading evaluations...
        </div>
      ) : sortedList.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No Evaluations Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm || selectedTier !== "ALL"
              ? "No assessments match your current filters. Try resetting search criteria."
              : "You haven't run any resume evaluations yet. Upload your first PDF to get started!"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Assessment Name</th>
                <th className="pb-3">Candidate Tier</th>
                <th className="pb-3 text-center">Resume Score</th>
                <th className="pb-3 text-center">Job Match</th>
                <th className="pb-3">Evaluated On</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sortedList.map((item) => {
                const scoreBadge = getScoreBadge(item.overallScore);
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
                      <div>
                        <span className="block font-semibold">
                          {item.filename || item.candidateName || "Resume Assessment"}
                        </span>
                        {item.filename && item.candidateName && (
                          <span className="text-[11px] text-slate-400">
                            {item.candidateName}
                          </span>
                        )}
                      </div>
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
                        <span className="text-slate-400">—</span>
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
  );
}
