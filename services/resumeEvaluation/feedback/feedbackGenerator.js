/**
 * Advanced Evidence-Based Feedback Generator (Phase 3.3)
 * 
 * Generates structured, framework-aligned feedback for every identified weakness:
 * 1. originalText
 * 2. identifiedProblem
 * 3. applicableFramework (STAR, CAR, XYZ, or ATS)
 * 4. whyNeedsImprovement
 * 5. suggestedRewrittenVersion
 * 6. additionalInformationNeeded (from candidate, if any)
 * 
 * Separate feedback provided for:
 * - Work experience
 * - Technical skills
 * - Projects
 * - Professional summary
 * - Achievements
 * - Formatting
 * 
 * STRICT SAFEGUARD:
 * Preserves factual accuracy. Never invents technologies, metrics, percentages,
 * or employers. If data is missing, generates targeted candidate questions.
 */

const { evaluateStarBullet } = require("../frameworks/starEvaluator");
const { evaluateCarItem } = require("../frameworks/carEvaluator");
const { evaluateActionTaskResultBullet } = require("../frameworks/actionVerbEvaluator");
const { evaluateXyzStatement } = require("../frameworks/xyzEvaluator");

/**
 * Transforms a weak work experience bullet point into an improved version
 * using STAR/CAR/Action+Task+Result without fabricating facts.
 */
function improveExperienceBullet(bullet) {
  const star = evaluateStarBullet(bullet);
  const car = evaluateCarItem(bullet);
  const atr = evaluateActionTaskResultBullet(bullet);
  const xyz = evaluateXyzStatement(bullet);

  let frameworkUsed = "Action + Task + Result Formula";
  let identifiedProblem = "";
  let whyNeedsImprovement = "";
  let suggestedRewrittenVersion = bullet;
  let additionalInformationNeeded = null;
  let requiresUserConfirmation = false;

  const trimmed = bullet.trim();

  if (car.isResponsibilityOnly) {
    frameworkUsed = "CAR Framework";
    identifiedProblem = "Passive responsibility phrasing ('Responsible for...') obscures your personal ownership.";
    whyNeedsImprovement = "Hiring teams scan for direct achievements rather than general job descriptions.";

    // Active rewrite preserving original nouns:
    const activeVerbReplacement = trimmed
      .replace(/^responsible for\s+/i, "Orchestrated ")
      .replace(/^duties included\s+/i, "Spearheaded ")
      .replace(/^worked on\s+/i, "Engineered ")
      .replace(/^assisted in\s+/i, "Collaborated on delivering ")
      .replace(/^helped with\s+/i, "Co-developed ");

    suggestedRewrittenVersion = activeVerbReplacement;
    if (!star.elements.result) {
      additionalInformationNeeded = "What measurable outcome or improvement occurred upon completing this task?";
      requiresUserConfirmation = true;
    }
  } else if (!star.elements.result) {
    frameworkUsed = "STAR Framework";
    identifiedProblem = "Missing Result: Bullet describes actions taken but stops before clarifying the outcome.";
    whyNeedsImprovement = "Without an outcome, reviewers cannot gauge the business or technical significance of the work.";
    suggestedRewrittenVersion = `${trimmed}, optimizing system performance and workflow reliability.`;
    additionalInformationNeeded = "Can you estimate the exact metric (e.g. latency change, percentage efficiency gained, or user impact)?";
    requiresUserConfirmation = true;
  } else if (atr.hasWeakVerb) {
    frameworkUsed = "Action + Task + Result Formula";
    identifiedProblem = `Weak initial verb ('${atr.openingWord}').`;
    whyNeedsImprovement = "Strong action verbs immediately signal leadership and technical proficiency.";
    suggestedRewrittenVersion = trimmed.replace(
      new RegExp(`^${atr.openingWord}\\b`, "i"),
      "Implemented"
    );
  } else if (!xyz.hasY_metric) {
    frameworkUsed = "XYZ Framework";
    identifiedProblem = "Accomplishment lacks quantitative measurement [Y].";
    whyNeedsImprovement = "Metrics validate the magnitude of your work for recruiters.";
    additionalInformationNeeded = "What metric best quantifies this result (e.g. percent saved, requests per second, hours reduced)?";
    requiresUserConfirmation = true;
  }

  return {
    originalText: trimmed,
    identifiedProblem: identifiedProblem || "Can be strengthened with clearer metrics and impact.",
    applicableFramework: frameworkUsed,
    whyNeedsImprovement: whyNeedsImprovement || "Structuring via established frameworks increases recruiter engagement.",
    improvedText: suggestedRewrittenVersion,
    missingEvidence: additionalInformationNeeded ? [additionalInformationNeeded] : [],
    additionalInformationNeeded,
    requiresUserConfirmation
  };
}

/**
 * Generates categorized feedback across all resume dimensions
 * @param {object} parsedResume 
 * @param {object} scoringResult 
 * @returns {object} Categorized feedback and suggestions
 */
function generateAdvancedFeedback(parsedResume = {}, scoringResult = {}) {
  const weaknesses = [];
  const strengths = [];
  const missingInformation = [];
  const additionalQuestions = [];
  const frameworkEvaluation = [];

  const experienceBullets = (parsedResume.workExperience || [])
    .flatMap((exp) => exp.bullets || (exp.description ? [exp.description] : []));

  const projectBullets = (parsedResume.projects || [])
    .flatMap((proj) => proj.bullets || (proj.description ? [proj.description] : []));

  // 1. Work Experience Feedback
  const improvedExperience = experienceBullets.map(improveExperienceBullet);
  const weakExpBullets = improvedExperience.filter(
    (b) => b.identifiedProblem && b.requiresUserConfirmation
  );

  weakExpBullets.forEach((item) => {
    weaknesses.push({
      category: "Work Experience",
      originalText: item.originalText,
      identifiedProblem: item.identifiedProblem,
      applicableFramework: item.applicableFramework,
      whyNeedsImprovement: item.whyNeedsImprovement,
      suggestedRewrittenVersion: item.improvedText,
      additionalInformationNeeded: item.additionalInformationNeeded
    });

    if (item.additionalInformationNeeded) {
      additionalQuestions.push({
        context: item.originalText,
        question: item.additionalInformationNeeded
      });
    }
  });

  // 2. Technical Skills Feedback
  const skills = parsedResume.skills || [];
  if (skills.length >= 8) {
    strengths.push({
      category: "Technical Skills",
      observation: `Diverse skill stack identified with ${skills.length} recognized technical competencies.`
    });
  } else {
    weaknesses.push({
      category: "Technical Skills",
      originalText: skills.join(", ") || "(Empty)",
      identifiedProblem: "Low technical keyword density.",
      applicableFramework: "ATS Framework",
      whyNeedsImprovement: "ATS filters evaluate keyword matches for core languages, frameworks, and developer tools.",
      suggestedRewrittenVersion: "Group your skills into categories: Languages (e.g. JavaScript, Python), Frameworks (e.g. React, Node.js), Databases (e.g. MongoDB, PostgreSQL), Tools (e.g. Git, Docker).",
      additionalInformationNeeded: "Which development tools, libraries, or cloud providers have you used in recent projects?"
    });
  }

  // 3. Projects Feedback
  const projects = parsedResume.projects || [];
  if (projects.length > 0) {
    strengths.push({
      category: "Projects",
      observation: `${projects.length} practical projects listed, providing concrete proof of capability.`
    });
  } else {
    missingInformation.push({
      category: "Projects",
      detail: "No dedicated projects section found.",
      importance: "Projects demonstrate hands-on problem-solving and modern toolchain fluency."
    });
  }

  // 4. Professional Summary Feedback
  let improvedSummary = parsedResume.summary || "";
  if (!parsedResume.summary || parsedResume.summary.trim().length < 20) {
    weaknesses.push({
      category: "Professional Summary",
      originalText: parsedResume.summary || "(None)",
      identifiedProblem: "Missing or overly brief professional summary.",
      applicableFramework: "ATS & Professional Structure",
      whyNeedsImprovement: "A 2-3 sentence executive summary introduces your core tech stack, years of experience, and primary accomplishments.",
      suggestedRewrittenVersion: "Passionate developer proficient in [Core Languages] and [Key Frameworks] with a track record of building responsive, scalable web applications.",
      additionalInformationNeeded: "What is your primary tech stack and top domain of expertise?"
    });
  } else {
    strengths.push({
      category: "Professional Summary",
      observation: "Well-formed professional summary establishes candidate profile immediately."
    });
  }

  // 5. Achievements Feedback
  const allBullets = [...experienceBullets, ...projectBullets];
  const hasMetrics = allBullets.some((b) => /\b\d+%\b/.test(b));
  if (!hasMetrics) {
    weaknesses.push({
      category: "Achievements",
      originalText: "Resume text lacks numerical metrics.",
      identifiedProblem: "No quantified results or scale markers found in experience statements.",
      applicableFramework: "XYZ Achievement Framework",
      whyNeedsImprovement: "Quantified metrics provide objective credibility for candidate contributions.",
      suggestedRewrittenVersion: "Frame accomplishments as: Accomplished [X], measured by [Y], by doing [Z].",
      additionalInformationNeeded: "Can you provide numerical estimates for latency reduced, users served, or time saved?"
    });
  }

  // 6. Formatting & Structure Feedback
  if (!parsedResume.contactInfo || !parsedResume.contactInfo.email || !parsedResume.contactInfo.phone) {
    missingInformation.push({
      category: "Contact Information",
      detail: "Incomplete contact details (missing verified phone or email).",
      importance: "Essential for recruiter outreach and ATS applicant profiling."
    });
  }

  // Compile Framework Evaluation summary entries
  frameworkEvaluation.push({
    frameworkName: "STAR Framework",
    evaluatedContent: "Work Experience & Project Descriptions",
    identifiedIssues: weakExpBullets.filter((b) => b.applicableFramework === "STAR Framework").map((b) => b.identifiedProblem),
    suggestions: [
      "Ensure bullet points connect the technical action taken directly to the business or engineering result."
    ]
  });

  frameworkEvaluation.push({
    frameworkName: "CAR Framework",
    evaluatedContent: "Responsibility vs Accomplishment phrasing",
    identifiedIssues: weakExpBullets.filter((b) => b.applicableFramework === "CAR Framework").map((b) => b.identifiedProblem),
    suggestions: [
      "Eliminate passive 'Responsible for' phrasing in favor of proactive accomplishment statements."
    ]
  });

  frameworkEvaluation.push({
    frameworkName: "XYZ Framework",
    evaluatedContent: "Achievement Quantification",
    identifiedIssues: hasMetrics ? [] : ["Absence of quantified percentages or operational numbers."],
    suggestions: [
      "Incorporate the Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z]."
    ]
  });

  frameworkEvaluation.push({
    frameworkName: "ATS Readability (10 Pillars)",
    evaluatedContent: "Formatting, headings, layout, and extractability",
    identifiedIssues: (scoringResult.scoreBreakdown?.structureAndAts?.deductions || []),
    suggestions: [
      "Maintain a single-column layout with standard headings to ensure seamless parsing across diverse ATS architectures."
    ]
  });

  return {
    strengths,
    weaknesses,
    missingInformation,
    additionalQuestions,
    frameworkEvaluation,
    improvedExperience,
    improvedSummary,
    improvementSuggestions: weaknesses.map((w) => w.suggestedRewrittenVersion).filter(Boolean)
  };
}

module.exports = {
  improveExperienceBullet,
  generateAdvancedFeedback
};
