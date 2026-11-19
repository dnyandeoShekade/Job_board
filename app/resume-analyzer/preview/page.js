"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import ResumeDetailView from "@/components/ResumeAnalyzer/ResumeDetailView";

export default function ResumePreviewPage() {
  const router = useRouter();
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("latestEvaluation");
      if (stored) {
        try {
          setEvaluation(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse stored evaluation:", e);
        }
      }
    }
  }, []);

  if (!evaluation) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">No Evaluation in Session</h3>
        <p className="text-xs text-slate-600">
          Upload or paste your resume to view the comprehensive evidence-based report.
        </p>
        <Link
          href="/resume-analyzer/analyze"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Go to Resume Upload</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Informative notice for guest */}
      <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-4 text-xs text-indigo-900 flex items-center justify-between">
        <span>
          <strong>Guest Preview:</strong> This evaluation is currently stored in your browser session. Sign in to save evaluations to your permanent history.
        </span>
        <Link
          href="/auth/login"
          className="text-xs font-bold text-indigo-700 underline shrink-0 ml-4"
        >
          Sign In
        </Link>
      </div>

      <ResumeDetailView
        evaluation={evaluation}
        onAnalyzeAnother={() => router.push("/resume-analyzer/analyze")}
      />
    </div>
  );
}
