/**
 * Strict Response Validation Schema (Phase 3.4)
 * 
 * Verifies that every resume evaluation payload strictly complies with the
 * required schema structure before persisting to MongoDB:
 * 
 * - overallScore (Number, 0-100)
 * - scoreBreakdown (Object with 7 dimensions)
 * - scoreExplanation (String)
 * - atsReadability (Object)
 * - detectedSkills (Array of Strings)
 * - technicalSkills (Array of Strings)
 * - softSkills (Array of Strings)
 * - experienceAnalysis (Array)
 * - projectAnalysis (Array)
 * - educationAnalysis (Array)
 * - certificationAnalysis (Array)
 * - strengths (Array)
 * - weaknesses (Array of Objects)
 * - missingInformation (Array)
 * - improvementSuggestions (Array)
 * - frameworkEvaluation (Array of { frameworkName, evaluatedContent, identifiedIssues, suggestions })
 * - improvedSummary (String)
 * - improvedExperience (Array of { originalText, improvedText, frameworkUsed, missingEvidence, requiresUserConfirmation })
 * - additionalQuestions (Array)
 */

function validateEvaluationPayload(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { isValid: false, errors: ["Evaluation data must be a non-null object."] };
  }

  // 1. overallScore
  if (typeof data.overallScore !== "number" || isNaN(data.overallScore) || data.overallScore < 0 || data.overallScore > 100) {
    errors.push("overallScore must be a number between 0 and 100.");
  }

  // 2. scoreBreakdown
  if (!data.scoreBreakdown || typeof data.scoreBreakdown !== "object") {
    errors.push("scoreBreakdown object is required.");
  } else {
    const requiredBreakdownFields = [
      "structureAndAts",
      "workExperience",
      "technicalSkills",
      "projects",
      "achievements",
      "education",
      "grammarAndReadability"
    ];
    for (const field of requiredBreakdownFields) {
      if (!data.scoreBreakdown[field] || typeof data.scoreBreakdown[field].score !== "number") {
        errors.push(`scoreBreakdown.${field} must contain a numeric score.`);
      }
    }
  }

  // 3. scoreExplanation
  if (typeof data.scoreExplanation !== "string" || data.scoreExplanation.trim().length === 0) {
    errors.push("scoreExplanation must be a non-empty string.");
  }

  // 4. atsReadability
  if (!data.atsReadability || typeof data.atsReadability !== "object") {
    errors.push("atsReadability must be an object.");
  }

  // 5. Skills arrays
  if (!Array.isArray(data.detectedSkills)) errors.push("detectedSkills must be an array.");
  if (!Array.isArray(data.technicalSkills)) errors.push("technicalSkills must be an array.");
  if (!Array.isArray(data.softSkills)) errors.push("softSkills must be an array.");

  // 6. Section analysis arrays
  if (!Array.isArray(data.experienceAnalysis)) errors.push("experienceAnalysis must be an array.");
  if (!Array.isArray(data.projectAnalysis)) errors.push("projectAnalysis must be an array.");
  if (!Array.isArray(data.educationAnalysis)) errors.push("educationAnalysis must be an array.");
  if (!Array.isArray(data.certificationAnalysis)) errors.push("certificationAnalysis must be an array.");

  // 7. Qualitative feedback arrays
  if (!Array.isArray(data.strengths)) errors.push("strengths must be an array.");
  if (!Array.isArray(data.weaknesses)) errors.push("weaknesses must be an array.");
  if (!Array.isArray(data.missingInformation)) errors.push("missingInformation must be an array.");
  if (!Array.isArray(data.improvementSuggestions)) errors.push("improvementSuggestions must be an array.");

  // 8. frameworkEvaluation structure
  if (!Array.isArray(data.frameworkEvaluation)) {
    errors.push("frameworkEvaluation must be an array.");
  } else {
    data.frameworkEvaluation.forEach((fw, idx) => {
      if (!fw.frameworkName || !fw.evaluatedContent) {
        errors.push(`frameworkEvaluation[${idx}] missing frameworkName or evaluatedContent.`);
      }
    });
  }

  // 9. improvedSummary
  if (typeof data.improvedSummary !== "string") {
    errors.push("improvedSummary must be a string.");
  }

  // 10. improvedExperience structure
  if (!Array.isArray(data.improvedExperience)) {
    errors.push("improvedExperience must be an array.");
  } else {
    data.improvedExperience.forEach((item, idx) => {
      if (!item.originalText || !item.improvedText) {
        errors.push(`improvedExperience[${idx}] must contain originalText and improvedText.`);
      }
    });
  }

  // 11. additionalQuestions
  if (!Array.isArray(data.additionalQuestions)) {
    errors.push("additionalQuestions must be an array.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  validateEvaluationPayload
};
