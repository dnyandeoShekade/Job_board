import EvaluationHistoryTable from "@/components/ResumeAnalyzer/EvaluationHistoryTable";

export const metadata = {
  title: "Evaluation History | AI Resume Analyzer",
  description: "View and review all past resume evaluations, ATS scores, and framework rewrites.",
};

export default function ResumeHistoryPage() {
  return <EvaluationHistoryTable />;
}
