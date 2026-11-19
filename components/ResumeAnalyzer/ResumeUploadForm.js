"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  FileText,
  File,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  X,
  Target,
  RefreshCw,
} from "lucide-react";
import { evaluateResumeFile, evaluateResumeText } from "@/services/resumeService";

const SAMPLE_RESUME = `Jane Doe
Senior Full-Stack Engineer | San Francisco, CA | jane.doe@example.com | (555) 123-4567 | linkedin.com/in/janedoe

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 5+ years of experience designing scalable microservices, high-traffic React applications, and cloud-native backend systems using Node.js, Next.js, and AWS.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express.js, RESTful APIs, GraphQL
- Databases: MongoDB, PostgreSQL, Redis
- Cloud & DevOps: AWS (EC2, S3, Lambda), Docker, CI/CD, Git, Jest

WORK EXPERIENCE
Senior Software Engineer | Acme Corporation | San Francisco, CA | 06/2022 - Present
- Architected and deployed microservices backend using Node.js and MongoDB, decreasing API response latency by 42%.
- Led front-end migration from legacy single-page app to Next.js 14, improving page load speed by 35% for 120,000 monthly active users.
- Designed automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle time from 3 hours to 18 minutes.
- Mentored 4 junior engineers on clean architecture patterns, code reviews, and test-driven development.

Software Engineer | TechVentures Inc. | Austin, TX | 08/2019 - 05/2022
- Developed responsive web interfaces using React.js and Tailwind CSS for enterprise analytics dashboard.
- Integrated Stripe payment processing gateway handling $2.4M in annual transaction volume with 99.98% reliability.
- Optimized PostgreSQL database queries and indexing strategies, eliminating bottleneck timeouts during peak traffic.

PROJECTS
OpenSource DevHub (Next.js, Tailwind, MongoDB) | 2023
- Built full-stack developer portfolio and project showcase platform with GitHub OAuth and Markdown blog engine.
- Reached 1,200+ registered active developers with 50+ open-source project submissions.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2015 - 2019`;

const SAMPLE_JOB_DESC = `Job Title: Senior Full-Stack Engineer
Requirements:
- 4+ years of professional software engineering experience
- Strong proficiency in React, Next.js, Node.js, Express, and MongoDB
- Experience with Docker, AWS cloud infrastructure, and CI/CD pipelines
- Proven ability to optimize database performance and architect high-volume REST APIs
- Excellent communication skills and track record of mentoring junior developers`;

export default function ResumeUploadForm({ onEvaluationComplete }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("file"); // "file" | "text"
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    "Reading resume document...",
    "Evaluating STAR, CAR & XYZ frameworks...",
    "Running 10-Pillar ATS compatibility audit...",
    "Calculating deterministic score breakdown...",
  ];

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (selectedFile) => {
    setFileError("");
    setErrorMessage("");

    if (!selectedFile) return false;

    // Check PDF type
    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setFileError("Please upload a valid PDF document (.pdf format only).");
      return false;
    }

    // Check 5MB limit
    const maxSize = 5 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setFileError("File size exceeds 5 MB. Please upload a smaller PDF.");
      return false;
    }

    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLoadSample = () => {
    setActiveTab("text");
    setResumeText(SAMPLE_RESUME);
    setJobDescription(SAMPLE_JOB_DESC);
    setFileError("");
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (activeTab === "file" && !file) {
      setFileError("Please select a PDF file before starting the analysis.");
      return;
    }

    if (activeTab === "text" && (!resumeText || resumeText.trim().length < 50)) {
      setErrorMessage("Please enter at least 50 characters of resume content.");
      return;
    }

    setLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      let result;

      if (activeTab === "file") {
        result = await evaluateResumeFile({
          file,
          jobDescription: jobDescription.trim(),
          saveResult: true,
        });
      } else {
        result = await evaluateResumeText({
          resume: resumeText.trim(),
          jobDescription: jobDescription.trim(),
          saveResult: true,
        });
      }

      clearInterval(stepInterval);
      setLoadingStep(steps.length - 1);

      if (result.success) {
        if (onEvaluationComplete) {
          onEvaluationComplete(result.data, result.savedId);
        }

        const targetId = result.savedId;
        if (targetId) {
          router.push(`/resume-analyzer/${targetId}`);
        } else {
          // Store transient result if anonymous
          if (typeof window !== "undefined") {
            sessionStorage.setItem("latestEvaluation", JSON.stringify(result.data));
            router.push(`/resume-analyzer/preview`);
          }
        }
      } else {
        setErrorMessage(result.message || "Evaluation could not be completed.");
      }
    } catch (err) {
      clearInterval(stepInterval);
      console.error("Resume analysis submission error:", err);
      setErrorMessage(
        err.message || "Failed to analyze resume. Please check your network connection and retry."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200/80 bg-slate-50/50 p-1.5 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("file")}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition ${
            activeTab === "file"
              ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload PDF Document</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("text")}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition ${
            activeTab === "text"
              ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Paste Resume Text</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {/* Sample Resume Quick Button */}
        <div className="flex justify-between items-center bg-indigo-50/50 border border-indigo-100/80 rounded-xl px-4 py-2.5">
          <span className="text-xs text-indigo-900 font-medium">
            Want to test immediately? Load our verified senior developer resume.
          </span>
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 shrink-0 ml-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Load Sample
          </button>
        </div>

        {/* Tab 1: PDF Upload */}
        {activeTab === "file" && (
          <div className="space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-indigo-600 bg-indigo-50/60 scale-[1.01]"
                  : file
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50/60"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileInputChange}
              />

              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <File className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 line-clamp-1">
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to evaluate
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Drag & drop your PDF resume here, or{" "}
                      <span className="text-indigo-600 underline">browse files</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PDF format only (Max file size: 5 MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {fileError && (
              <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{fileError}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Paste Resume Text */}
        {activeTab === "text" && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Resume Text Content
            </label>
            <textarea
              rows={10}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste the full text of your resume here (Summary, Work Experience, Skills, Education, Projects)..."
              className="w-full text-xs font-mono text-slate-800 bg-slate-50/70 border border-slate-200 rounded-2xl p-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
            />
            <span className="text-[11px] text-slate-500 block text-right">
              {resumeText.length} characters
            </span>
          </div>
        )}

        {/* Target Job Description (Optional) */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              Target Job Description (Optional)
            </label>
            <span className="text-[11px] font-medium text-slate-400">
              Enables 100 pt Job Match Score
            </span>
          </div>
          <textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a target job posting or role requirements here to receive a specific Job Compatibility breakdown..."
            className="w-full text-xs text-slate-800 bg-slate-50/70 border border-slate-200 rounded-2xl p-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-2xl p-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Evaluation Notice:</strong>
              <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Loading Progress State */}
        {loading ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-indigo-600">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm font-bold text-slate-800">
                {steps[loadingStep]}
              </span>
            </div>

            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((loadingStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <p className="text-xs text-slate-500">
              Verifying ATS compliance, STAR/CAR structures, and deterministic score weights...
            </p>
          </div>
        ) : (
          /* Submit Button */
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
}
