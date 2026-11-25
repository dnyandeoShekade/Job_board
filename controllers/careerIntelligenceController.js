const fs = require("fs");
const { analyzeSkillGaps } = require("../services/careerIntelligence/skillGapService");

/**
 * Helper to extract plain text from an uploaded PDF resume file.
 */
const extractTextFromPdf = async (filePath) => {
  const pdfParsePkg = require("pdf-parse");
  const dataBuffer = fs.readFileSync(filePath);

  if (typeof pdfParsePkg === "function") {
    const pdfData = await pdfParsePkg(dataBuffer);
    return pdfData.text || "";
  }

  if (pdfParsePkg.PDFParse) {
    const parser = new pdfParsePkg.PDFParse({ data: dataBuffer });
    try {
      const result = await parser.getText();
      return result.text || "";
    } finally {
      if (typeof parser.destroy === "function") {
        await parser.destroy().catch(() => {});
      }
    }
  }

  throw new Error("Compatible PDF parser interface not found.");
};

/**
 * Controller for Skill Gap Intelligence analysis
 * Handles both JSON payload (raw text) and multipart/form-data (file upload).
 */
const analyzeSkillGapHandler = async (req, res) => {
  try {
    let resumeText = req.body.resumeText || "";
    const jobDescription = req.body.jobDescription || "";

    // If a PDF file was uploaded with the request
    if (req.file) {
      try {
        const extracted = await extractTextFromPdf(req.file.path);
        if (extracted && extracted.trim().length > 0) {
          resumeText = extracted;
        }
      } catch (fileErr) {
        return res.status(422).json({
          success: false,
          message: "Failed to extract text from the uploaded PDF resume: " + fileErr.message,
        });
      }
    }

    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Resume content is required. Please provide resumeText or upload a PDF document.",
      });
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Job description is required to perform Skill Gap Intelligence (minimum 20 characters).",
      });
    }

    const analysisResult = await analyzeSkillGaps(resumeText, jobDescription);

    return res.status(200).json({
      success: true,
      message: "Skill Gap Intelligence successfully generated.",
      data: analysisResult,
    });
  } catch (error) {
    console.error("[CareerIntelligence] Skill gap error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to perform Skill Gap Intelligence analysis.",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeSkillGapHandler,
};
