import ResumeUploadForm from "@/components/ResumeAnalyzer/ResumeUploadForm";
import { Sparkles, ShieldCheck, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Analyze Resume | AI Resume Analyzer",
  description: "Upload your PDF resume or paste text to receive deterministic scoring and framework improvements.",
};

export default function AnalyzeResumePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Professional Career Frameworks</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Evaluate Your Resume
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Upload your resume PDF or paste your raw text. Our engine applies STAR, CAR, Action+Task+Result, and 10-Pillar ATS parsing standards.
        </p>
      </div>

      {/* Main Upload Form */}
      <ResumeUploadForm />

      {/* Trust & Methodology Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/70">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-800">Deterministic Scoring</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Strict 100 pt category weights. No random or hallucinated score reductions.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/70">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-800">No Fabricated Metrics</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              We never invent metrics or numbers. We prompt you with questions when data is missing.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200/70">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-slate-800">Fairness by Tier</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Freshers are evaluated on academic projects without employment penalties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
