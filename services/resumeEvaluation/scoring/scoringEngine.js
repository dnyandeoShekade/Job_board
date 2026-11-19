/**
 * Deterministic Resume Scoring Engine (Phase 3.2)
 * 
 * Computes:
 * 1. Resume Quality Score (100 points)
 *    - Structure & ATS readability: 20
 *    - Work experience & STAR/CAR quality: 25
 *    - Technical and professional skills: 15
 *    - Projects and practical contributions: 15
 *    - Achievements and measurable impact: 10
 *    - Education and certifications: 5
 *    - Grammar and readability: 10
 * 
 * 2. Job Match Score (separate 100 points, only when Job Description is supplied)
 *    - Required skill alignment: 35
 *    - Relevant experience: 25
 *    - Responsibilities alignment: 20
 *    - Qualifications alignment: 10
 *    - Relevant projects: 10
 * 
 * Safeguards:
 * - Deterministic arithmetic: Category scores are summed in backend code.
 * - Fair evaluation for Freshers (reallocates work experience weight into projects/academics).
 * - No penalties for missing optional sections.
 * - Concrete evidence logged for each point deduction.
 */

const { classifyCandidateTier, EXPERIENCE_TIERS } = require("../frameworks/structureEvaluator");
const { evaluateStarFramework } = require("../frameworks/starEvaluator");
const { evaluateCarFramework } = require("../frameworks/carEvaluator");
const { evaluateActionVerbFramework } = require("../frameworks/actionVerbEvaluator");
const { evaluateXyzFramework } = require("../frameworks/xyzEvaluator");
const { evaluateAtsReadability } = require("../frameworks/atsEvaluator");

/**
 * Calculates deterministic Resume Quality Score
 * @param {object} parsedResume 
 * @returns {object} Score breakdown, explanation, and total
 */
function calculateResumeQualityScore(parsedResume = {}) {
  const tier = classifyCandidateTier(parsedResume);
  const isFresher = tier === EXPERIENCE_TIERS.FRESHER;

  const scoreBreakdown = {
    structureAndAts: { score: 0, maxScore: 20, evidence: [], deductions: [] },
    workExperience: { score: 0, maxScore: 25, evidence: [], deductions: [] },
    technicalSkills: { score: 0, maxScore: 15, evidence: [], deductions: [] },
    projects: { score: 0, maxScore: 15, evidence: [], deductions: [] },
    achievements: { score: 0, maxScore: 10, evidence: [], deductions: [] },
    education: { score: 0, maxScore: 5, evidence: [], deductions: [] },
    grammarAndReadability: { score: 0, maxScore: 10, evidence: [], deductions: [] },
  };

  // 1. Structure & ATS Readability (20 pts)
  const atsResult = evaluateAtsReadability(parsedResume);
  scoreBreakdown.structureAndAts.score = atsResult.scoreOutOf20;
  scoreBreakdown.structureAndAts.evidence.push(
    `Passed ${atsResult.passedCriteria} of 10 ATS readability pillars.`
  );
  if (atsResult.warnings.length > 0) {
    scoreBreakdown.structureAndAts.deductions.push(...atsResult.warnings);
  }
  if (atsResult.failures.length > 0) {
    scoreBreakdown.structureAndAts.deductions.push(...atsResult.failures);
  }

  // Extract bullets for experience and project evaluations
  const experienceBullets = (parsedResume.workExperience || [])
    .flatMap((exp) => exp.bullets || (exp.description ? [exp.description] : []));

  const projectBullets = (parsedResume.projects || [])
    .flatMap((proj) => proj.bullets || (proj.description ? [proj.description] : []));

  // 2. Work Experience & STAR/CAR Quality (25 pts)
  if (isFresher) {
    // FRESHER FAIRNESS GUARANTEE:
    // Do NOT penalize freshers for zero corporate employment.
    // Grade based on practical project implementation bullets instead.
    scoreBreakdown.workExperience.evidence.push(
      "Candidate evaluated as Fresher: Corporate experience expectation waived; practical development depth evaluated via projects and coursework."
    );

    const projectStarEval = evaluateStarFramework(projectBullets);
    let fresherExpScore = 15; // Baseline credit for fresh graduates
    if (projectStarEval.bulletsWithAction > 0) fresherExpScore += 5;
    if (projectStarEval.bulletsWithResult > 0) fresherExpScore += 5;

    scoreBreakdown.workExperience.score = Math.min(25, fresherExpScore);
  } else {
    // Experienced & Entry level
    const starEval = evaluateStarFramework(experienceBullets);
    const carEval = evaluateCarFramework(experienceBullets);
    const verbEval = evaluateActionVerbFramework(experienceBullets);

    let expScore = 25;

    if (experienceBullets.length === 0) {
      expScore = 5;
      scoreBreakdown.workExperience.deductions.push("No work experience bullet points found.");
    } else {
      // Deductions for missing results
      if (starEval.bulletsWithResult === 0) {
        expScore -= 7;
        scoreBreakdown.workExperience.deductions.push("Bullet points lack measurable results or outcomes.");
      } else if (starEval.bulletsWithResult < experienceBullets.length / 2) {
        expScore -= 4;
        scoreBreakdown.workExperience.deductions.push("Less than 50% of experience bullets specify a concrete result.");
      }

      // Deductions for passive / responsibility-only phrasing
      if (carEval.responsibilityCount > 0) {
        const penalty = Math.min(6, carEval.responsibilityCount * 2);
        expScore -= penalty;
        scoreBreakdown.workExperience.deductions.push(
          `${carEval.responsibilityCount} statement(s) phrased as passive job duties ('Responsible for...') instead of accomplishments.`
        );
      }

      // Deductions for weak opening verbs
      if (verbEval.weakVerbCount > 0) {
        const penalty = Math.min(4, verbEval.weakVerbCount * 1.5);
        expScore -= Math.round(penalty);
        scoreBreakdown.workExperience.deductions.push(
          `${verbEval.weakVerbCount} bullet(s) start with weak or passive verbs.`
        );
      }
    }

    scoreBreakdown.workExperience.score = Math.max(0, Math.min(25, expScore));
    scoreBreakdown.workExperience.evidence.push(
      `Evaluated ${experienceBullets.length} experience statements using STAR, CAR, and Action+Task+Result.`
    );
  }

  // 3. Technical & Professional Skills (15 pts)
  const skills = parsedResume.skills || [];
  let skillsScore = 0;
  if (skills.length >= 10) {
    skillsScore = 15;
    scoreBreakdown.technicalSkills.evidence.push(`Robust repertoire of ${skills.length} technical skills identified.`);
  } else if (skills.length >= 6) {
    skillsScore = 12;
    scoreBreakdown.technicalSkills.evidence.push(`${skills.length} technical skills identified.`);
  } else if (skills.length >= 3) {
    skillsScore = 9;
    scoreBreakdown.technicalSkills.deductions.push("Skill list is sparse. Add relevant frameworks, languages, and developer tools.");
  } else {
    skillsScore = 4;
    scoreBreakdown.technicalSkills.deductions.push("Very few technical skills identified (fewer than 3).");
  }
  scoreBreakdown.technicalSkills.score = skillsScore;

  // 4. Projects & Practical Contributions (15 pts)
  const projects = parsedResume.projects || [];
  let projectScore = 0;
  if (projects.length >= 3) {
    projectScore = 15;
    scoreBreakdown.projects.evidence.push(`${projects.length} distinct technical projects documented.`);
  } else if (projects.length === 2) {
    projectScore = 13;
    scoreBreakdown.projects.evidence.push("2 technical projects documented.");
  } else if (projects.length === 1) {
    projectScore = isFresher ? 8 : 10;
    scoreBreakdown.projects.deductions.push("Only 1 project documented. Adding 1-2 additional portfolio projects provides broader skill proof.");
  } else {
    projectScore = isFresher ? 0 : 7;
    scoreBreakdown.projects.deductions.push(
      isFresher
        ? "No projects found. Projects are vital for freshers to demonstrate technical ability."
        : "No standalone projects section found."
    );
  }
  scoreBreakdown.projects.score = projectScore;

  // 5. Achievements & Measurable Impact (10 pts)
  const allBullets = [
    ...experienceBullets,
    ...projectBullets,
    ...(parsedResume.achievements || []),
  ];
  const xyzEval = evaluateXyzFramework(allBullets);
  let achievementScore = 0;

  const quantifiedBulletsCount = allBullets.filter((b) => /\b\d+(\.\d+)?%|\$\s*\d+|\b\d+\s*(ms|sec|k|m)\b/i.test(b)).length;

  if (xyzEval.completeXyzCount >= 2 || (xyzEval.completeXyzCount >= 1 && quantifiedBulletsCount >= 2)) {
    achievementScore = 10;
    scoreBreakdown.achievements.evidence.push(`${xyzEval.completeXyzCount} statement(s) adhere to the full XYZ achievement standard with ${quantifiedBulletsCount} quantified metrics.`);
  } else if (xyzEval.completeXyzCount === 1 || (parsedResume.achievements && parsedResume.achievements.length > 0)) {
    achievementScore = 7;
    scoreBreakdown.achievements.evidence.push("Measurable achievements present, with room for additional quantified metrics.");
  } else if (allBullets.some((b) => /\b\d+(\.\d+)?%/.test(b))) {
    achievementScore = 5;
    scoreBreakdown.achievements.deductions.push("Limited measurable metrics found in work descriptions.");
  } else {
    achievementScore = isFresher ? 4 : 2;
    scoreBreakdown.achievements.deductions.push(
      "No quantitative metrics or clear achievement statements found (percentages, time saved, scale)."
    );
  }
  scoreBreakdown.achievements.score = achievementScore;

  // 6. Education & Certifications (5 pts)
  const education = parsedResume.education || [];
  const certifications = parsedResume.certifications || [];
  let educationScore = 0;

  if (education.length > 0) {
    educationScore += 4;
    scoreBreakdown.education.evidence.push(`Verified educational background: ${education[0].degree || "Degree present"}.`);
  } else {
    scoreBreakdown.education.deductions.push("No education section or university credentials detected.");
  }

  // Certifications are optional, give 1 bonus point if present
  if (certifications.length > 0) {
    educationScore += 1;
    scoreBreakdown.education.evidence.push(`${certifications.length} professional certification(s) noted.`);
  } else {
    // If no certifications, but education has good detail (e.g. GPA or field of study), award full 5
    if (education.length > 0 && (education[0].field || education[0].year)) {
      educationScore += 1;
    }
  }
  scoreBreakdown.education.score = Math.min(5, educationScore);

  // 7. Grammar & Readability (10 pts)
  let grammarScore = 10;
  const rawText = parsedResume.rawText || "";
  const spellCheckIssues = parsedResume.grammarIssues || [];

  if (spellCheckIssues.length > 3) {
    grammarScore -= 4;
    scoreBreakdown.grammarAndReadability.deductions.push(`${spellCheckIssues.length} spelling or grammatical inconsistencies detected.`);
  } else if (spellCheckIssues.length > 0) {
    grammarScore -= 2;
    scoreBreakdown.grammarAndReadability.deductions.push("Minor typos or punctuation inconsistencies identified.");
  }

  // Word length check
  const wordCount = rawText.split(/\s+/).length;
  if (wordCount < 150) {
    grammarScore -= 3;
    scoreBreakdown.grammarAndReadability.deductions.push("Resume is very short (<150 words), lacking descriptive depth.");
  } else if (wordCount > 1000 && !isFresher) {
    grammarScore -= 1;
    scoreBreakdown.grammarAndReadability.deductions.push("Resume exceeds 1000 words. Consider condensing to 1-2 pages.");
  }

  scoreBreakdown.grammarAndReadability.score = Math.max(2, grammarScore);

  // DETERMINISTIC TOTAL CALCULATION (Sums individual category scores)
  const overallScore = Object.values(scoreBreakdown).reduce(
    (acc, category) => acc + category.score,
    0
  );

  const scoreExplanation = `Resume scored ${overallScore}/100 across 7 transparent evaluation dimensions. ` +
    `Structure & ATS Readability: ${scoreBreakdown.structureAndAts.score}/20, ` +
    `Experience (STAR/CAR): ${scoreBreakdown.workExperience.score}/25, ` +
    `Technical Skills: ${scoreBreakdown.technicalSkills.score}/15, ` +
    `Projects: ${scoreBreakdown.projects.score}/15, ` +
    `Achievements: ${scoreBreakdown.achievements.score}/10, ` +
    `Education: ${scoreBreakdown.education.score}/5, ` +
    `Grammar: ${scoreBreakdown.grammarAndReadability.score}/10.`;

  return {
    overallScore,
    candidateTier: tier,
    scoreBreakdown,
    scoreExplanation,
    methodology: {
      frameworksUsed: ["STAR", "CAR", "Action+Task+Result", "XYZ", "10-Pillar ATS"],
      deterministic: true,
      aiGeneratedTotal: false
    }
  };
}

/**
 * Calculates separate Job Match Score (100 points) based on Job Description
 * Only invoked when user supplies a target job description.
 * 
 * - Required skill alignment: 35
 * - Relevant experience: 25
 * - Responsibilities alignment: 20
 * - Qualifications alignment: 10
 * - Relevant projects: 10
 * 
 * @param {object} parsedResume 
 * @param {object|string} jobDescription 
 * @returns {object}
 */
function calculateJobMatchScore(parsedResume = {}, jobDescription = "") {
  if (!jobDescription) {
    return null; // As specified: Only generate when job description is provided
  }

  const jdText = typeof jobDescription === "string" ? jobDescription : (jobDescription.description || "");
  const jdRequiredSkills = Array.isArray(jobDescription.requiredSkills)
    ? jobDescription.requiredSkills
    : extractSkillsFromText(jdText);

  const candidateSkills = (parsedResume.skills || []).map((s) => s.toLowerCase());

  // 1. Skill alignment (35 pts)
  const matchedSkills = jdRequiredSkills.filter((req) =>
    candidateSkills.some((cs) => cs.includes(req.toLowerCase()) || req.toLowerCase().includes(cs))
  );
  const missingSkills = jdRequiredSkills.filter((req) => !matchedSkills.includes(req));

  const skillMatchRatio = jdRequiredSkills.length > 0 ? (matchedSkills.length / jdRequiredSkills.length) : 0.8;
  const skillScore = Math.round(skillMatchRatio * 35);

  // 2. Relevant experience alignment (25 pts)
  const rawExperience = (parsedResume.workExperience || []).map((e) => `${e.title || ""} ${e.company || ""} ${(e.bullets || []).join(" ")}`).join(" ");
  const expMatchScore = evaluateTextOverlap(rawExperience, jdText, 25);

  // 3. Responsibilities alignment (20 pts)
  const respMatchScore = evaluateTextOverlap(rawExperience + " " + (parsedResume.summary || ""), jdText, 20);

  // 4. Qualifications alignment (10 pts)
  const educationText = (parsedResume.education || []).map((e) => e.degree || "").join(" ");
  let qualScore = 10;
  if (/degree|bachelor|master|b\.tech|b\.e/i.test(jdText) && !/degree|bachelor|master|b\.tech|b\.e/i.test(educationText)) {
    qualScore = 5;
  }

  // 5. Relevant projects (10 pts)
  const rawProjects = (parsedResume.projects || []).map((p) => `${p.name || ""} ${(p.bullets || []).join(" ")}`).join(" ");
  const projScore = evaluateTextOverlap(rawProjects, jdText, 10);

  const totalJobMatch = Math.min(100, Math.round(skillScore + expMatchScore + respMatchScore + qualScore + projScore));

  return {
    jobMatchScore: totalJobMatch,
    matchBreakdown: {
      skillAlignment: { score: skillScore, maxScore: 35, matchedSkills, missingSkills },
      relevantExperience: { score: Math.round(expMatchScore), maxScore: 25 },
      responsibilitiesAlignment: { score: Math.round(respMatchScore), maxScore: 20 },
      qualificationsAlignment: { score: qualScore, maxScore: 10 },
      relevantProjects: { score: Math.round(projScore), maxScore: 10 },
    },
    isSeparateFromResumeQuality: true,
    explanation: `Job Match Score: ${totalJobMatch}/100. Evaluates candidate alignment specifically against the supplied role criteria.`
  };
}

/**
 * Basic keyword overlap helper for deterministic matching
 */
function evaluateTextOverlap(sourceText, targetText, maxScore) {
  if (!sourceText || !targetText) return Math.round(maxScore * 0.5);
  const targetWords = targetText.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const stopwords = new Set(["looking", "with", "from", "that", "this", "have", "will", "your", "more", "such"]);
  const meaningfulWords = [...new Set(targetWords)].filter((w) => !stopwords.has(w));
  if (meaningfulWords.length === 0) return maxScore;

  const sourceLower = sourceText.toLowerCase();
  const matched = meaningfulWords.filter((w) => sourceLower.includes(w)).length;
  const ratio = Math.min(1, matched / Math.min(meaningfulWords.length, 8));

  return Math.round(ratio * maxScore);
}

/**
 * Extracts key technology names from JD text
 */
function extractSkillsFromText(text = "") {
  const commonTech = [
    "react", "node", "express", "mongodb", "postgresql", "postgres", "sql",
    "javascript", "typescript", "python", "java", "go", "aws", "docker",
    "kubernetes", "git", "html", "css", "tailwind", "next.js", "rest api",
    "graphql", "redis", "kafka", "microservices"
  ];
  const lower = text.toLowerCase();
  return commonTech.filter((tech) => lower.includes(tech));
}

module.exports = {
  calculateResumeQualityScore,
  calculateJobMatchScore
};
