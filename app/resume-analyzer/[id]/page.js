"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, RefreshCw, ArrowLeft, ShieldAlert } from "lucide-react";
import { getEvaluationById } from "@/services/resumeService";
import ResumeDetailView from "@/components/ResumeAnalyzer/ResumeDetailView";

export default function ResumeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isForbidden, setIsForbidden] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchRecord() {
      if (!id) return;

      try {
        setLoading(true);
        setError("");
        setIsForbidden(false);

        const res = await getEvaluationById(id);

        if (!mounted) return;

        if (res.success && res.data) {
          setEvaluation(res.data);
        } else {
          setError(res.message || "Failed to load evaluation.");
        }
      } catch (err) {
        if (!mounted) return;
        console.error("Error loading evaluation:", err);
        if (err.message && err.message.toLowerCase().includes("forbidden")) {
          setIsForbidden(true);
          setError("You do not have permission to view this candidate evaluation record.");
        } else if (err.message && err.message.toLowerCase().includes("authentication")) {
          setError("Please sign in to view this saved evaluation.");
        } else {
          setError(err.message || "Could not retrieve evaluation.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchRecord();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
        <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
        <h3 className="text-base font-bold text-slate-800">
          Loading Evaluation Report...
        </h3>
        <p className="text-xs text-slate-500">
          Retrieving verified scores, ATS audits, and framework rewrites.
        </p>
      </div>
    );
  }

  if (isForbidden) {
    return (
      <div className="bg-white rounded-3xl border border-rose-200 p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Access Restricted</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {error}
        </p>
        <Link
          href="/resume-analyzer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to My Evaluations</span>
        </Link>
      </div>
    );
  }

  if (error || !evaluation) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Evaluation Not Found</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          {error || "We could not find the requested evaluation record."}
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/resume-analyzer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/resume-analyzer/analyze"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
          >
            <span>Analyze New Resume</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ResumeDetailView
      evaluation={evaluation}
      onAnalyzeAnother={() => router.push("/resume-analyzer/analyze")}
    />
  );
}
