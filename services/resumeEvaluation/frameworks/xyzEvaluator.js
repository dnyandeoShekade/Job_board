/**
 * XYZ Achievement Framework Evaluator
 * Structure: "Accomplished [X], measured by [Y], by doing [Z]"
 * 
 * Evaluates whether achievements communicate:
 * 1. What was accomplished (X)
 * 2. What measurable result was achieved (Y)
 * 3. What action produced the result (Z)
 * 
 * Strict safeguard: If numerical info is absent, NEVER invent metrics.
 * Suggest asking the candidate for exact metrics.
 */

// Numerical / quantitative measure indicators
const METRIC_PATTERNS = [
  /\b\d+(\.\d+)?%/, // 35%, 12.5%
  /\b\$\s*\d+([,\.]\d+)?\s*(k|m|b|million|thousand)?\b/i, // $50K, $2M
  /\b\d+(\.\d+)?\s*(x|times)\b/i, // 3x, 10x faster
  /\b\d+\s*(ms|seconds?|minutes?|hours?|days?|weeks?|months?)\b/i, // 200ms, 4 hours
  /\b(increased|reduced|saved|boosted|generated|scaled|decreased|cut|slashed)\s+by\s+\d+/i,
  /\b\d{2,}\s*(users|customers|clients|requests|transactions|downloads|stars|visits|qps)\b/i
];

/**
 * Checks an achievement for X, Y, and Z
 * @param {string} text 
 * @returns {object}
 */
function evaluateXyzStatement(text) {
  if (!text || typeof text !== "string") {
    return {
      text: "",
      hasX_accomplishment: false,
      hasY_metric: false,
      hasZ_method: false,
      score: 0,
      classification: "Incomplete",
      promptForUser: "Provide your key responsibility and the outcome achieved."
    };
  }

  const trimmed = text.trim();

  // Y: Metric
  const hasY_metric = METRIC_PATTERNS.some((p) => p.test(trimmed));

  // Z: Action / Method ("by utilizing...", "through implementing...", "via...", "by doing...")
  const hasZ_method = /\b(by|through|via|utilizing|leveraging|using|implementing|migrating to|introducing)\b/i.test(trimmed);

  // X: Accomplishment (Action verb + objective)
  const hasX_accomplishment = /\b(accomplished|achieved|built|designed|developed|scaled|optimized|improved|reduced|increased|created|automated|launched|delivered|engineered)\b/i.test(trimmed);

  let score = 0;
  if (hasX_accomplishment) score += 35;
  if (hasY_metric) score += 45;
  if (hasZ_method) score += 20;

  let promptForUser = null;
  if (!hasY_metric) {
    promptForUser = "What measurable outcome (e.g., percentage improved, latency reduced, user count, or time saved) resulted from this work?";
  }

  return {
    text: trimmed,
    hasX_accomplishment,
    hasY_metric,
    hasZ_method,
    score,
    isCompleteXyz: hasX_accomplishment && hasY_metric && hasZ_method,
    promptForUser
  };
}

/**
 * Evaluates list of achievements/bullets under XYZ framework
 * @param {string[]} bullets 
 * @returns {object}
 */
function evaluateXyzFramework(bullets = []) {
  if (!Array.isArray(bullets) || bullets.length === 0) {
    return {
      frameworkName: "XYZ Framework (Google Laszlo Bock formula)",
      evaluatedCount: 0,
      completeXyzCount: 0,
      missingMetricCount: 0,
      identifiedIssues: [],
      suggestions: [],
      targetedQuestions: []
    };
  }

  const results = bullets.map(evaluateXyzStatement);
  const completeXyzCount = results.filter((r) => r.isCompleteXyz).length;
  const missingMetricCount = results.filter((r) => !r.hasY_metric).length;

  const identifiedIssues = [];
  const suggestions = [];
  const targetedQuestions = [];

  if (missingMetricCount > 0) {
    identifiedIssues.push({
      issue: `${missingMetricCount} of ${results.length} achievement statements lack measurable [Y] data`,
      severity: "MEDIUM",
      evidence: results.filter((r) => !r.hasY_metric).map((r) => r.text).slice(0, 3)
    });

    suggestions.push(
      "Structure key achievements as: Accomplished [X], as measured by [Y], by doing [Z]. Always ground claims in measurable reality."
    );

    results
      .filter((r) => !r.hasY_metric && r.promptForUser)
      .slice(0, 3)
      .forEach((r) => {
        targetedQuestions.push({
          originalText: r.text,
          question: r.promptForUser
        });
      });
  }

  return {
    frameworkName: "XYZ Framework (Accomplished [X], measured by [Y], by doing [Z])",
    evaluatedCount: results.length,
    completeXyzCount,
    missingMetricCount,
    identifiedIssues,
    suggestions,
    targetedQuestions,
    details: results
  };
}

module.exports = {
  evaluateXyzStatement,
  evaluateXyzFramework
};
