/**
 * Comprehensive Resume Evaluation Engine (Phases 3.1, 3.2, 3.3, 3.4)
 * 
 * Orchestrates:
 * - Framework Evaluations (STAR, CAR, Action+Task+Result, XYZ, ATS 10-Pillars)
 * - Deterministic Scoring Engine (Resume Quality Score 100 pts + Optional Job Match 100 pts)
 * - Advanced AI Feedback & Rewrites
 * - Strict Schema Validation
 */

const { evaluateStarFramework } = require("./frameworks/starEvaluator");
const { evaluateCarFramework } = require("./frameworks/carEvaluator");
const { evaluateActionVerbFramework } = require("./frameworks/actionVerbEvaluator");
const { evaluateXyzFramework } = require("./frameworks/xyzEvaluator");
const { evaluateAtsReadability } = require("./frameworks/atsEvaluator");
const { evaluateResumeStructure, classifyCandidateTier } = require("./frameworks/structureEvaluator");
const { calculateResumeQualityScore, calculateJobMatchScore } = require("./scoring/scoringEngine");
const { generateAdvancedFeedback } = require("./feedback/feedbackGenerator");
const { validateEvaluationPayload } = require("./schema/evaluationSchema");

/**
 * Normalizes input text / object into a structured resume object
 * @param {string|object} resumeInput 
 * @returns {object}
 */
function normalizeResumeInput(resumeInput) {
  if (typeof resumeInput === "object" && resumeInput !== null) {
    return {
      rawText: resumeInput.rawText || "",
      candidateName: resumeInput.candidateName || "",
      contactInfo: resumeInput.contactInfo || {},
      summary: resumeInput.summary || "",
      skills: Array.isArray(resumeInput.skills) ? resumeInput.skills : [],
      workExperience: Array.isArray(resumeInput.workExperience) ? resumeInput.workExperience : [],
      projects: Array.isArray(resumeInput.projects) ? resumeInput.projects : [],
      education: Array.isArray(resumeInput.education) ? resumeInput.education : [],
      certifications: Array.isArray(resumeInput.certifications) ? resumeInput.certifications : [],
      achievements: Array.isArray(resumeInput.achievements) ? resumeInput.achievements : [],
      yearsOfExperience: resumeInput.yearsOfExperience || 0,
      layout: resumeInput.layout || "single-column",
      detectedHeadings: resumeInput.detectedHeadings || [
        "Contact", "Summary", "Skills", "Experience", "Projects", "Education"
      ],
      grammarIssues: resumeInput.grammarIssues || [],
      explicitTier: resumeInput.explicitTier || null
    };
  }

  // If input is raw plain text string:
  const text = String(resumeInput || "");
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  const skills = extractKeywords(text);
  const bullets = lines.filter((l) => /^[•\-\*]/.test(l) || l.length > 30);

  return {
    rawText: text,
    candidateName: lines[0] || "Candidate",
    contactInfo: {
      email: text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || null,
      phone: text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)?.[0] || null
    },
    summary: lines.find((l) => l.length > 50 && !/^[•\-\*]/.test(l)) || "",
    skills,
    workExperience: [
      {
        company: "Company",
        title: "Developer",
        bullets: bullets.slice(0, 5)
      }
    ],
    projects: [
      {
        name: "Technical Project",
        bullets: bullets.slice(5, 8)
      }
    ],
    education: [
      {
        degree: text.match(/bachelor|master|b\.tech|degree|diploma/i)?.[0] || "Degree",
        school: "University"
      }
    ],
    certifications: [],
    achievements: [],
    yearsOfExperience: text.match(/(\d+)\+?\s*years?\s*(of)?\s*experience/i)?.[1] || 1,
    layout: "single-column",
    detectedHeadings: ["Experience", "Skills", "Education", "Projects"]
  };
}

function extractKeywords(text = "") {
  const dictionary = [
    "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB",
    "PostgreSQL", "SQL", "Python", "Java", "Docker", "AWS", "Git",
    "HTML5", "CSS3", "Tailwind CSS", "Next.js", "GraphQL", "REST API",
    "Redux", "Linux", "Kubernetes", "CI/CD", "Jest", "Agile"
  ];
  return dictionary.filter((k) => new RegExp(`\\b${k}\\b`, "i").test(text));
}

/**
 * Main evaluation pipeline conforming to Phase 3.1 - 3.4
 * @param {string|object} resumeInput 
 * @param {string|object} [jobDescription=null] 
 * @returns {object} Strict Phase 3.4 validated payload
 */
function evaluateResume(resumeInput, jobDescription = null) {
  const parsedResume = normalizeResumeInput(resumeInput);

  // 1. Structure & Tier Analysis
  const tier = classifyCandidateTier(parsedResume);
  const structureEval = evaluateResumeStructure(parsedResume);

  // 2. Framework Evaluations (Phase 3.1)
  const experienceBullets = (parsedResume.workExperience || [])
    .flatMap((exp) => exp.bullets || (exp.description ? [exp.description] : []));
  const projectBullets = (parsedResume.projects || [])
    .flatMap((proj) => proj.bullets || (proj.description ? [proj.description] : []));

  const starEval = evaluateStarFramework(experienceBullets);
  const carEval = evaluateCarFramework(experienceBullets);
  const verbEval = evaluateActionVerbFramework(experienceBullets);
  const xyzEval = evaluateXyzFramework([...experienceBullets, ...projectBullets]);
  const atsReadability = evaluateAtsReadability(parsedResume);

  // 3. Deterministic Scoring Engine (Phase 3.2)
  const scoringResult = calculateResumeQualityScore(parsedResume);
  const jobMatchResult = jobDescription ? calculateJobMatchScore(parsedResume, jobDescription) : null;

  // 4. Advanced Evidence-Based AI Feedback (Phase 3.3)
  const feedback = generateAdvancedFeedback(parsedResume, scoringResult);

  // 5. Build Comprehensive Output according to Phase 3.4 schema
  const detectedSkills = parsedResume.skills || [];
  const technicalSkills = detectedSkills.filter((s) => !/communication|leadership|teamwork|problem-solving/i.test(s));
  const softSkills = detectedSkills.filter((s) => /communication|leadership|teamwork|problem-solving/i.test(s));

  const finalResponse = {
    overallScore: scoringResult.overallScore,
    scoreBreakdown: scoringResult.scoreBreakdown,
    scoreExplanation: scoringResult.scoreExplanation,
    atsReadability,
    detectedSkills,
    technicalSkills,
    softSkills,
    candidateTier: tier,
    experienceAnalysis: parsedResume.workExperience.map((exp) => ({
      company: exp.company || "Company",
      role: exp.title || "Role",
      bulletCount: (exp.bullets || []).length,
      starScore: starEval.averageScore
    })),
    projectAnalysis: parsedResume.projects.map((proj) => ({
      name: proj.name || "Project",
      bulletCount: (proj.bullets || []).length,
      technologies: proj.technologies || []
    })),
    educationAnalysis: parsedResume.education.map((edu) => ({
      degree: edu.degree || "Degree",
      institution: edu.school || edu.institution || "Institution",
      year: edu.year || null
    })),
    certificationAnalysis: (parsedResume.certifications || []).map((c) => ({
      name: typeof c === "string" ? c : (c.name || "Certification"),
      issuer: c.issuer || null
    })),
    strengths: feedback.strengths,
    weaknesses: feedback.weaknesses,
    missingInformation: feedback.missingInformation,
    improvementSuggestions: feedback.improvementSuggestions,
    frameworkEvaluation: feedback.frameworkEvaluation,
    improvedSummary: feedback.improvedSummary,
    improvedExperience: feedback.improvedExperience,
    additionalQuestions: feedback.additionalQuestions,
    jobMatch: jobMatchResult
  };

  // 6. Strict Validation (Phase 3.4)
  const validation = validateEvaluationPayload(finalResponse);
  if (!validation.isValid) {
    throw new Error(`Resume evaluation payload failed strict validation schema: ${validation.errors.join("; ")}`);
  }

  return finalResponse;
}

module.exports = {
  normalizeResumeInput,
  evaluateResume
};
