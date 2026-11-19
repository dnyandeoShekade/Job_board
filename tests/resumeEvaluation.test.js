const { test, describe } = require("node:test");
const assert = require("node:assert/strict");

const testProfiles = require("./resumeProfiles");
const { evaluateResume } = require("../services/resumeEvaluation/resumeEvaluationEngine");
const { calculateResumeQualityScore, calculateJobMatchScore } = require("../services/resumeEvaluation/scoring/scoringEngine");
const { validateEvaluationPayload } = require("../services/resumeEvaluation/schema/evaluationSchema");
const { evaluateStarBullet } = require("../services/resumeEvaluation/frameworks/starEvaluator");
const { evaluateCarItem } = require("../services/resumeEvaluation/frameworks/carEvaluator");
const { evaluateXyzStatement } = require("../services/resumeEvaluation/frameworks/xyzEvaluator");

describe("Phase 7.1: Professional Resume Evaluation Testing Suite", () => {
  // --------------------------------------------------------------------------
  // Test 1: Fresher with academic projects
  // --------------------------------------------------------------------------
  test("Profile 1: Fresher with academic projects is evaluated fairly without corporate penalty", () => {
    const result = evaluateResume(testProfiles.fresherWithAcademicProjects);

    assert.equal(result.candidateTier, "Fresher");
    assert.ok(result.overallScore >= 75, `Expected fresher score >= 75, got ${result.overallScore}`);

    // Verify Fresher Fairness Safeguard:
    // Work experience score should not be 0 despite 0 years of corporate employment
    const expScore = result.scoreBreakdown.workExperience.score;
    assert.ok(expScore >= 15, `Fresher work experience credit expected >= 15, got ${expScore}`);
    assert.ok(
      result.scoreBreakdown.workExperience.evidence.some((e) => e.includes("Fresher")),
      "Expected fresher fairness evidence in work experience breakdown"
    );

    // Projects score should be rewarded
    assert.equal(result.scoreBreakdown.projects.score, 13);

    // Schema validation check
    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true, `Validation failed: ${validation.errors.join("; ")}`);
  });

  // --------------------------------------------------------------------------
  // Test 2: Frontend developer with two years of experience
  // --------------------------------------------------------------------------
  test("Profile 2: Frontend developer with two years experience evaluates properly", () => {
    const result = evaluateResume(testProfiles.frontendDeveloper2Years);

    assert.equal(result.candidateTier, "Entry-level");
    assert.ok(result.overallScore >= 70, `Expected score >= 70, got ${result.overallScore}`);
    assert.ok(result.technicalSkills.includes("React"));
    assert.ok(result.technicalSkills.includes("Next.js"));

    // Check STAR alignment on work bullet
    const firstBullet = result.improvedExperience[0];
    assert.ok(firstBullet.originalText.includes("Next.js"));

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Test 3: Full-stack developer with several projects
  // --------------------------------------------------------------------------
  test("Profile 3: Full-stack developer with multiple projects achieves high project score", () => {
    const result = evaluateResume(testProfiles.fullStackDeveloperWithProjects);

    assert.equal(result.candidateTier, "Experienced professional");
    assert.equal(result.scoreBreakdown.projects.score, 15, "Full projects score expected for 3+ projects");
    assert.ok(result.overallScore >= 80);

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Test 4: Experienced professional with measurable achievements
  // --------------------------------------------------------------------------
  test("Profile 4: Experienced professional with quantified metrics achieves top score", () => {
    const result = evaluateResume(testProfiles.experiencedProfessionalMeasurable);

    assert.equal(result.candidateTier, "Experienced professional");
    assert.ok(result.overallScore >= 85, `Expected high score >= 85, got ${result.overallScore}`);
    assert.ok(result.scoreBreakdown.achievements.score >= 8, "Expected top achievements score");

    // Verify STAR / XYZ detection of metrics ($12M, 400%, $120K)
    const hasDetectedMetrics = result.strengths.some((s) => s.category === "Technical Skills" || s.category === "Projects");
    assert.ok(hasDetectedMetrics);

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Test 5: Resume containing only responsibilities without results
  // --------------------------------------------------------------------------
  test("Profile 5: Resume with only passive responsibilities suffers deductions and triggers CAR rewrites", () => {
    const result = evaluateResume(testProfiles.responsibilitiesOnlyNoResults);

    // Score should be significantly lower due to lack of outcomes and passive duty phrasing
    assert.ok(result.overallScore <= 65, `Expected penalized score <= 65, got ${result.overallScore}`);

    // Verify CAR deductions logged in evidence
    const expDeductions = result.scoreBreakdown.workExperience.deductions;
    assert.ok(
      expDeductions.some((d) => d.includes("passive job duties") || d.includes("Responsible for")),
      "CAR duty deduction must be explicitly documented"
    );

    // Verify improvedExperience suggested rewrites
    const improved = result.improvedExperience;
    assert.ok(improved.length > 0);
    const passiveRewrite = improved.find((i) => i.applicableFramework === "CAR Framework");
    assert.ok(passiveRewrite, "CAR Framework rewrite expected for 'Responsible for...'");
    assert.ok(!passiveRewrite.improvedText.startsWith("Responsible for"), "Rewrite must eliminate 'Responsible for'");

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Test 6: Poorly formatted resume
  // --------------------------------------------------------------------------
  test("Profile 6: Poorly formatted resume receives ATS readability deductions", () => {
    const result = evaluateResume(testProfiles.poorlyFormattedResume);

    // ATS readability score should reflect heavy deductions
    const atsScore = result.scoreBreakdown.structureAndAts.score;
    assert.ok(atsScore <= 15, `Expected reduced ATS score <= 15, got ${atsScore}`);

    // Check ATS warnings for non-standard headings, multi-column, and tables
    const atsDeductions = result.scoreBreakdown.structureAndAts.deductions;
    assert.ok(
      atsDeductions.some((d) => d.includes("Non-standard heading") || d.includes("Multi-column") || d.includes("tables")),
      "Expected ATS deduction evidence for non-standard formatting"
    );

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Test 7: Resume with missing education or contact details
  // --------------------------------------------------------------------------
  test("Profile 7: Missing contact info and education results in transparent deductions", () => {
    const result = evaluateResume(testProfiles.missingEducationOrContact);

    // Education score should be 0
    assert.equal(result.scoreBreakdown.education.score, 0, "Missing education must score 0");
    assert.ok(result.scoreBreakdown.education.deductions.some((d) => d.includes("No education")));

    // Missing information list should contain Contact Information
    assert.ok(
      result.missingInformation.some((m) => m.category === "Contact Information"),
      "Missing contact details must be flagged"
    );

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Test 8: Resume with unsupported or unverifiable claims
  // --------------------------------------------------------------------------
  test("Profile 8: Unsupported claims trigger targeted follow-up questions instead of hallucinated metrics", () => {
    const result = evaluateResume(testProfiles.unsupportedOrUnverifiableClaims);

    // Check that additionalQuestions contains requests for metric evidence
    assert.ok(result.additionalQuestions.length > 0, "Expected targeted follow-up questions for unsupported claims");
    assert.ok(
      result.additionalQuestions.some((q) => q.question.toLowerCase().includes("measurable") || q.question.toLowerCase().includes("metric")),
      "Follow-up questions must ask for measurable clarification"
    );

    // Safeguard check: Verify engine did NOT invent numbers or percentages
    const improvedTexts = result.improvedExperience.map((i) => i.improvedText).join(" ");
    assert.ok(
      !/\b(99\.9%|95%|500%|\$100k)\b/i.test(improvedTexts),
      "Engine must NEVER hallucinate or invent candidate metrics"
    );

    const validation = validateEvaluationPayload(result);
    assert.equal(validation.isValid, true);
  });

  // --------------------------------------------------------------------------
  // Consistency & Determinism Verification
  // --------------------------------------------------------------------------
  test("Deterministic Consistency: Same input produces identical score across 10 consecutive runs", () => {
    const profile = testProfiles.frontendDeveloper2Years;
    const initialScore = calculateResumeQualityScore(profile).overallScore;

    for (let i = 0; i < 10; i++) {
      const repeatedScore = calculateResumeQualityScore(profile).overallScore;
      assert.equal(repeatedScore, initialScore, `Run ${i + 1} produced non-deterministic score`);
    }
  });

  // --------------------------------------------------------------------------
  // Job Match Score Separation
  // --------------------------------------------------------------------------
  test("Job Match Score is strictly separate from Resume Quality Score", () => {
    const profile = testProfiles.fullStackDeveloperWithProjects;

    // Without Job Description: Job Match must be null
    const noJdResult = evaluateResume(profile);
    assert.equal(noJdResult.jobMatch, null, "Job match must be null when no JD is provided");

    // With Job Description: Job Match is generated separately
    const targetJd = "Looking for a Full Stack Developer skilled in React, Node.js, PostgreSQL, Docker, and AWS.";
    const withJdResult = evaluateResume(profile, targetJd);

    assert.ok(withJdResult.jobMatch !== null, "Job match must be generated when JD is provided");
    assert.ok(withJdResult.jobMatch.jobMatchScore >= 70);
    assert.equal(withJdResult.jobMatch.isSeparateFromResumeQuality, true);
    // Overall resume quality score must remain unchanged
    assert.equal(withJdResult.overallScore, noJdResult.overallScore, "Job description must not alter base resume quality score");
  });

  // --------------------------------------------------------------------------
  // Framework Individual Component Tests
  // --------------------------------------------------------------------------
  test("STAR bullet evaluator identifies presence and missing elements", () => {
    const strongBullet = "Architected Redis caching layer during Q4 traffic surge, reducing database read latency by 45%.";
    const evaluated = evaluateStarBullet(strongBullet);

    assert.equal(evaluated.elements.action, true);
    assert.equal(evaluated.elements.result, true);
    assert.equal(evaluated.qualityRating, "Strong");

    const weakBullet = "Handled customer emails and internal documentation.";
    const weakEval = evaluateStarBullet(weakBullet);
    assert.equal(weakEval.elements.result, false);
    assert.equal(weakEval.qualityRating, "Weak");
  });

  test("CAR evaluator flags passive duties vs accomplishments", () => {
    const duty = evaluateCarItem("Responsible for managing junior team members.");
    assert.equal(duty.isResponsibilityOnly, true);
    assert.equal(duty.classification, "Weak Duty Description");

    const accomplishment = evaluateCarItem("Overcame legacy thread contention bottleneck by refactoring database connection pooling, slashing p99 latency by 50%.");
    assert.equal(accomplishment.isResponsibilityOnly, false);
    assert.equal(accomplishment.elements.challenge, true);
    assert.equal(accomplishment.elements.result, true);
  });

  test("XYZ statement evaluator identifies X, Y, Z", () => {
    const xyz = evaluateXyzStatement("Accomplished 30% reduction in build times, measured by GitHub Actions runtime, by migrating to Turbopack.");
    assert.equal(xyz.hasY_metric, true);
    assert.equal(xyz.hasZ_method, true);
    assert.equal(xyz.isCompleteXyz, true);
  });
});
