"use client";

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  File,
  X,
  Target,
  Sparkles,
  ArrowRight,
  BookOpen,
  Briefcase,
  AlertCircle,
} from "lucide-react";

const SAMPLE_RESUME = `Jane Doe
Senior Full-Stack Engineer | San Francisco, CA | jane.doe@example.com | (555) 123-4567

PROFESSIONAL SUMMARY
Senior Full-Stack Engineer with 5+ years of experience designing scalable microservices, high-traffic React applications, and backend REST APIs using Node.js, Express, and MongoDB.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
- Frontend: React.js, Next.js, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express.js, RESTful APIs
- Databases: MongoDB, PostgreSQL
- Tools: Git, GitHub, Linux

WORK EXPERIENCE
Senior Software Engineer | Acme Corporation | 06/2022 - Present
- Architected and deployed microservices backend using Node.js and MongoDB, decreasing API response latency by 42%.
- Led frontend migration from legacy single-page app to Next.js, improving page load speed by 35% for 120,000 monthly active users.
- Designed automated database querying improvements and indexing strategies, eliminating query timeouts during peak events.

Software Engineer | TechVentures Inc. | 08/2019 - 05/2022
- Developed responsive web interfaces using React.js and Tailwind CSS for enterprise analytics dashboard.
- Integrated payment processing gateway handling $2.4M in annual transaction volume with 99.98% uptime reliability.

PROJECTS
OpenSource DevHub (Next.js, Tailwind, MongoDB) | 2023
- Built full-stack developer portfolio and project showcase platform with GitHub OAuth.

EDUCATION
Bachelor of Science in Computer Science | UC Berkeley | 2015 - 2019`;

const SAMPLE_JOB_DESC = `Role: Senior Cloud & Full-Stack Platform Engineer

Requirements & Competencies:
- 4+ years of production experience with React, Next.js, and TypeScript.
- Strong proficiency in Node.js and distributed backend microservices.
- Essential hands-on experience with Docker containerization, Kubernetes orchestration, and AWS cloud services (ECS, S3, Lambda).
- Solid experience setting up automated CI/CD deployment pipelines (GitHub Actions) and comprehensive unit/integration testing (Jest, Cypress).
- Practical familiarity with distributed caching (Redis) and message queues (Kafka or RabbitMQ).
- Track record of mentoring junior developers and driving technical excellence.`;

export default function SkillGapForm({ onSubmit, loading }) {
  const fileInputRef = useRef(null);
  const [inputMode, setInputMode] = useState("file"); // "file" | "text"
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    validateAndSetFile(selected);
  };

  const validateAndSetFile = (f) => {
    setFileError("");
    setValidationError("");
    if (!f) return;

    const isPdf = f.name.toLowerCase().endsWith(".pdf") || f.type === "application/pdf";
    if (!isPdf) {
      setFileError("Please upload a PDF document (.pdf).");
      setFile(null);
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setFileError("File size exceeds 10MB limit.");
      setFile(null);
      return;
    }

    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    validateAndSetFile(dropped);
  };

  const loadSampleData = () => {
    setInputMode("text");
    setResumeText(SAMPLE_RESUME);
    setJobDescription(SAMPLE_JOB_DESC);
    setFile(null);
    setFileError("");
    setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (inputMode === "file" && !file) {
      setValidationError("Please select or drop a PDF resume file.");
      return;
    }

    if (inputMode === "text" && (!resumeText || resumeText.trim().length < 20)) {
      setValidationError("Please paste resume text with at least 20 characters.");
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      setValidationError("Please enter a target job description (at least 20 characters) to analyze skill gaps.");
      return;
    }

    onSubmit({
      file: inputMode === "file" ? file : null,
      resumeText: inputMode === "text" ? resumeText : "",
      jobDescription,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sample Data Quick-Fill Action */}
      <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-100 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs text-indigo-900 font-medium">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Want to explore instantly? Load a production-grade sample profile and job description.</span>
        </div>
        <button
          type="button"
          onClick={loadSampleData}
          className="text-xs font-semibold px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shrink-0"
        >
          Load Sample
        </button>
      </div>

      {validationError && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Resume Input */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Candidate Resume</span>
              </label>

              {/* Input Mode Toggle */}
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setInputMode("file")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    inputMode === "file"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Upload PDF
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    inputMode === "text"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            {inputMode === "file" ? (
              <div className="space-y-3">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50/50"
                      : file
                      ? "border-emerald-400 bg-emerald-50/20"
                      : "border-slate-300 hover:border-indigo-400 bg-slate-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      {file ? file.name : "Drop resume PDF here or click to browse"}
                    </p>
                    <p className="text-[11px] text-slate-400">PDF documents up to 10MB</p>
                  </div>
                </div>

                {file && (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <File className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{file.name}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {fileError && (
                  <p className="text-xs text-rose-600 font-medium">{fileError}</p>
                )}
              </div>
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the full plain text of the resume including Experience, Projects, Skills, and Education..."
                rows={12}
                className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 resize-y"
              />
            )}
          </div>

          <div className="text-[11px] text-slate-400">
            Skills are extracted from Technical Skills, Experience bullets, Projects, and Education.
          </div>
        </div>

        {/* RIGHT COLUMN: Target Job Description */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>Target Job Description</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                Mandatory for Gap Intelligence
              </span>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description (responsibilities, required qualifications, key technologies)..."
              rows={12}
              className="w-full text-xs font-mono p-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 resize-y"
            />
          </div>

          <div className="text-[11px] text-slate-400">
            The AI compares concrete evidence in the resume against these specific job requirements.
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? "Analyzing Skill Gaps..." : "Analyze Skill Gap Intelligence"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
