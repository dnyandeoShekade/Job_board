const mongoose = require("mongoose");

/**
 * ResumeEvaluation Schema
 * Stores validated evaluations conforming to Phase 3.4 structured JSON specification
 */
const ResumeEvaluationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false, // Optional for public evaluation demo
    },
    candidateName: {
      type: String,
      default: "Candidate",
    },
    filename: {
      type: String,
      default: null,
    },
    fileUrl: {
      type: String,
      default: null,
    },
    candidateTier: {
      type: String,
      enum: ["Fresher", "Entry-level", "Experienced professional", "Career switcher"],
      default: "Experienced professional",
    },
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    scoreBreakdown: {
      structureAndAts: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
      workExperience: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
      technicalSkills: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
      projects: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
      achievements: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
      education: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
      grammarAndReadability: {
        score: Number,
        maxScore: Number,
        evidence: [String],
        deductions: [String],
      },
    },
    scoreExplanation: {
      type: String,
      required: true,
    },
    atsReadability: {
      type: mongoose.Schema.Types.Mixed,
    },
    detectedSkills: [String],
    technicalSkills: [String],
    softSkills: [String],
    experienceAnalysis: [mongoose.Schema.Types.Mixed],
    projectAnalysis: [mongoose.Schema.Types.Mixed],
    educationAnalysis: [mongoose.Schema.Types.Mixed],
    certificationAnalysis: [mongoose.Schema.Types.Mixed],
    strengths: [mongoose.Schema.Types.Mixed],
    weaknesses: [mongoose.Schema.Types.Mixed],
    missingInformation: [mongoose.Schema.Types.Mixed],
    improvementSuggestions: [String],
    frameworkEvaluation: [
      {
        frameworkName: String,
        evaluatedContent: String,
        identifiedIssues: [String],
        suggestions: [String],
      },
    ],
    improvedSummary: String,
    improvedExperience: [
      {
        originalText: String,
        improvedText: String,
        frameworkUsed: String,
        missingEvidence: [String],
        requiresUserConfirmation: Boolean,
      },
    ],
    additionalQuestions: [
      {
        context: String,
        question: String,
      },
    ],
    jobMatch: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

ResumeEvaluationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("ResumeEvaluation", ResumeEvaluationSchema);
