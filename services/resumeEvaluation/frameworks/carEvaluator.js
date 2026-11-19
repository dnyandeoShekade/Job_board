/**
 * CAR Framework Evaluator
 * Evaluates achievement descriptions using Challenge, Action, and Result.
 * Identifies weak responsibility-based descriptions ("Responsible for...", "Duties included...")
 * and contrasts them with accomplishment-oriented descriptions.
 */

const RESPONSIBILITY_PATTERNS = [
  /^responsible for\b/i,
  /^duties included\b/i,
  /^worked on\b/i,
  /^assisted in\b/i,
  /^helped with\b/i,
  /^involved in\b/i,
  /^handled\b/i,
  /^participated in\b/i,
  /^tasked to\b/i,
  /^supported the team with\b/i
];

const CHALLENGE_PATTERNS = [
  /\b(tackl|resolv|overcom|overcame|complex|critical|bottleneck|downtime|legacy|escalat|bug|defect|outage|in response to|latency|inefficient|unstable)\b/i,
  /\b(challenging|high-traffic|tight deadline|mission-critical|distributed)\b/i
];

const ACTION_PATTERNS = [
  /\b(architect\w*|engineer\w*|built|build\w*|refactor\w*|spearhead\w*|revamp\w*|automat\w*|migrat\w*|optimiz\w*|develop\w*|design\w*|implement\w*|streamlin\w*)\b/i
];

const RESULT_PATTERNS = [
  /\b(yielding|resulting in|driving|achieving|scaling|saving|reducing|improving|boosting|delivering|slashing|cutting|halving)\b/i,
  /\b\d+(\.\d+)?%/,
  /\b(from\s+\d+.*to\s+\d+)\b/i,
  /\b\$\d+/i,
  /\b\d+\s*(users|clients|requests|transactions|seconds|ms|hours)\b/i
];

/**
 * Evaluates a single achievement or bullet using CAR
 * @param {string} text 
 * @returns {object}
 */
function evaluateCarItem(text) {
  if (!text || typeof text !== "string") {
    return {
      text: "",
      isResponsibilityOnly: true,
      challengeDetected: false,
      actionDetected: false,
      resultDetected: false,
      score: 0,
      classification: "Weak / Passive"
    };
  }

  const trimmed = text.trim();
  const isResponsibilityOnly = RESPONSIBILITY_PATTERNS.some((p) => p.test(trimmed));
  const challengeDetected = CHALLENGE_PATTERNS.some((p) => p.test(trimmed));
  const actionDetected = ACTION_PATTERNS.some((p) => p.test(trimmed));
  const resultDetected = RESULT_PATTERNS.some((p) => p.test(trimmed));

  let score = 0;
  if (actionDetected) score += 40;
  if (resultDetected) score += 40;
  if (challengeDetected) score += 20;

  // Heavy penalty for weak passive phrases at start
  if (isResponsibilityOnly) {
    score = Math.max(10, score - 30);
  }

  let classification = "Weak Duty Description";
  if (score >= 80) classification = "Strong Accomplishment";
  else if (score >= 50) classification = "Moderate Contribution";

  return {
    text: trimmed,
    isResponsibilityOnly,
    elements: {
      challenge: challengeDetected,
      action: actionDetected,
      result: resultDetected
    },
    score,
    classification
  };
}

/**
 * Evaluates experience list through CAR framework
 * @param {string[]} items 
 * @returns {object}
 */
function evaluateCarFramework(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      frameworkName: "CAR",
      totalItems: 0,
      responsibilityCount: 0,
      accomplishmentCount: 0,
      averageScore: 0,
      identifiedIssues: [],
      suggestions: []
    };
  }

  const results = items.map(evaluateCarItem);
  const responsibilityCount = results.filter((r) => r.isResponsibilityOnly).length;
  const accomplishmentCount = results.filter((r) => r.classification === "Strong Accomplishment").length;
  const totalScore = results.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = Math.round(totalScore / results.length);

  const identifiedIssues = [];
  const suggestions = [];

  if (responsibilityCount > 0) {
    identifiedIssues.push({
      issue: `${responsibilityCount} statement(s) phrased as passive job duties rather than active accomplishments`,
      severity: "HIGH",
      evidence: results.filter((r) => r.isResponsibilityOnly).map((r) => r.text)
    });
    suggestions.push(
      "Replace passive phrases like 'Responsible for' or 'Worked on' with strong action verbs that explain what problem you tackled and the resulting outcome."
    );
  }

  return {
    frameworkName: "CAR",
    totalItems: results.length,
    responsibilityCount,
    accomplishmentCount,
    averageScore,
    identifiedIssues,
    suggestions,
    details: results
  };
}

module.exports = {
  evaluateCarItem,
  evaluateCarFramework
};
