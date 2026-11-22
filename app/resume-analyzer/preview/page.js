"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Info } from "lucide-react";
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
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center space-y-3 max-w-md mx-auto shadow-xs">
        <h3 className="text-base font-bold text-slate-800">No Evaluation in Session</h3>
        <p className="text-xs text-slate-500">
          Upload or paste your resume to view the comprehensive evidence-based report.
        </p>
        <Link
          href="/resume-analyzer/analyze"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Upload Resume</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Slim Guest Preview Notice */}
      <div className="bg-indigo-50/70 border border-indigo-200/60 rounded-xl px-3.5 py-2 text-xs text-indigo-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span>
            <strong>Guest Preview:</strong> This evaluation is saved in your browser session.
          </span>
        </div>
        <Link
          href="/auth/login"
          className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline shrink-0 ml-3"
        >
          Sign In to Save
        </Link>
      </div>

      <ResumeDetailView
        evaluation={evaluation}
        onAnalyzeAnother={() => router.push("/resume-analyzer/analyze")}
      />
    </div>
  );
}
