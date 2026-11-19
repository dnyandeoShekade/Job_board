const fs = require("fs");
const ResumeEvaluation = require("../models/ResumeEvaluation");
const { evaluateResume } = require("../services/resumeEvaluation/resumeEvaluationEngine");
const { calculateJobMatchScore } = require("../services/resumeEvaluation/scoring/scoringEngine");
const { validateEvaluationPayload } = require("../services/resumeEvaluation/schema/evaluationSchema");

/**
 * Extracts plain text from a PDF file using pdf-parse
 */
const extractTextFromPdf = async (filePath) => {
  const pdfParse = require("pdf-parse");
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text || "";
};

/**
 * Evaluates an uploaded PDF resume file.
 * POST /api/resume/evaluate-file
 */
const evaluateFileHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF resume file is required. Please upload a .pdf document.",
      });
    }

    const filePath = req.file.path;
    const originalFilename = req.file.originalname;
    const { jobDescription, saveResult } = req.body;

    // Extract text from PDF
    let extractedText = "";
    try {
      extractedText = await extractTextFromPdf(filePath);
    } catch (parseErr) {
      console.error("PDF Parsing failed:", parseErr.message);
      return res.status(422).json({
        success: false,
        message: "Could not parse text from the uploaded PDF. Please ensure the file contains extractable text and is not an image-only scan.",
      });
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return res.status(422).json({
        success: false,
        message: "The uploaded PDF appears to be empty or contains insufficient extractable text.",
      });
    }

    // Run evidence-based evaluation engine
    const evaluation = evaluateResume(extractedText, jobDescription);

    // Validate payload against Phase 3.4 strict schema
    const validation = validateEvaluationPayload(evaluation);
    if (!validation.isValid) {
      return res.status(500).json({
        success: false,
        message: "Evaluation output did not meet strict Phase 3.4 schema standards.",
        errors: validation.errors,
      });
    }

    let savedRecord = null;
    const shouldSave = saveResult === true || saveResult === "true" || Boolean(req.user);
    if (shouldSave && req.user) {
      savedRecord = await ResumeEvaluation.create({
        ...evaluation,
        userId: req.user._id,
        candidateName: req.user.name || evaluation.candidateName || "Candidate",
        filename: originalFilename,
        fileUrl: `/uploads/resumes/${req.file.filename}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume PDF successfully parsed and evaluated.",
      data: evaluation,
      filename: originalFilename,
      savedId: savedRecord ? savedRecord._id : null,
    });
  } catch (error) {
    console.error("Evaluate file error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing resume file.",
      error: error.message,
    });
  }
};

/**
 * Evaluates a resume using STAR, CAR, Action+Task+Result, XYZ, and ATS frameworks.
 * POST /api/resume/evaluate
 */
const evaluateResumeHandler = async (req, res) => {
  try {
    const { resume, jobDescription, saveResult } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume content is required (either as raw text or structured JSON).",
      });
    }

    // Run evidence-based evaluation engine
    const evaluation = evaluateResume(resume, jobDescription);

    // Validate payload strictly before any database persistence
    const validation = validateEvaluationPayload(evaluation);
    if (!validation.isValid) {
      return res.status(500).json({
        success: false,
        message: "Internal validation error: Evaluation output did not meet strict Phase 3.4 schema standards.",
        errors: validation.errors,
      });
    }

    let savedRecord = null;
    if (saveResult && req.user) {
      savedRecord = await ResumeEvaluation.create({
        ...evaluation,
        userId: req.user._id,
        candidateName: resume.candidateName || req.user.name || "Candidate",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume successfully evaluated across professional career frameworks.",
      data: evaluation,
      savedId: savedRecord ? savedRecord._id : null,
    });
  } catch (error) {
    console.error("Evaluation error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing resume evaluation.",
      error: error.message,
    });
  }
};

/**
 * Calculates separate Job Match Score against a target Job Description.
 * POST /api/resume/job-match
 */
const calculateJobMatchHandler = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Both resume and jobDescription are required to compute job match.",
      });
    }

    const jobMatch = calculateJobMatchScore(resume, jobDescription);

    res.status(200).json({
      success: true,
      message: "Job match score calculated independently of general resume quality.",
      data: jobMatch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating job match.",
      error: error.message,
    });
  }
};

/**
 * Retrieves saved evaluations for current user
 * GET /api/resume/my-evaluations
 */
const getMyEvaluationsHandler = async (req, res) => {
  try {
    const userId = req.user._id;
    const evaluations = await ResumeEvaluation.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: evaluations.length,
      data: evaluations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching evaluations.",
      error: error.message,
    });
  }
};

/**
 * Retrieves a single evaluation by ID with ownership authorization
 * GET /api/resume/:id
 */
const getEvaluationByIdHandler = async (req, res) => {
  try {
    const evaluation = await ResumeEvaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "Evaluation not found.",
      });
    }

    // Ownership check: If evaluation belongs to a user, ensure requester is the owner or an admin
    if (evaluation.userId) {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required to view this saved evaluation.",
        });
      }

      const isOwner = req.user._id.toString() === evaluation.userId.toString();
      const isAdmin = req.user.role === "admin";

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You are not authorized to view this evaluation record.",
        });
      }
    }

    res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching evaluation.",
      error: error.message,
    });
  }
};

module.exports = {
  evaluateResumeHandler,
  evaluateFileHandler,
  calculateJobMatchHandler,
  getMyEvaluationsHandler,
  getEvaluationByIdHandler,
};
