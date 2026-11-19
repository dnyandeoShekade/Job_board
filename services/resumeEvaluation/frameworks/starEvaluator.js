/**
 * STAR Framework Evaluator
 * Evaluates work experience bullet points against Situation, Task, Action, and Result.
 * Note: Does NOT require every bullet point to contain all four elements,
 * but evaluates the overall quality and presence of contextualized actions and outcomes.
 */

const SITUATION_INDICATORS = [
  /during\b/i, /when\b/i, /while\b/i, /facing\b/i, /in response to\b/i,
  /amidst?\b/i, /prior to\b/i, /due to\b/i, /with an existing\b/i,
  /legacy\b/i, /under\b/i, /in an environment where\b/i, /at a time when\b/i
];

const TASK_INDICATORS = [
  /tasked with\b/i, /responsible for\b/i, /assigned to\b/i, /aiming to\b/i,
  /objective was to\b/i, /mandated to\b/i, /in order to\b/i, /targeted with\b/i,
  /goal of\b/i, /needed to\b/i, /sought to\b/i
];

const ACTION_INDICATORS = [
  /\b(developed|engineered|built|designed|implemented|architected|led|spearheaded|created|automated|refactored|deployed|configured|optimized|orchestrated|established|integrated|migrated|authored|debugged|resolved)\b/i
];

const RESULT_INDICATORS = [
  /\b(resulting in|reduced|increased|boosted|saved|improved|achieved|accelerated|generated|decreased|optimized|scaled|delivered|halved|doubled|slashed)\b/i,
  /\b\d+(\.\d+)?%/, // Percentages (e.g. 40%)
  /\b(by|to)\s+\d+(\.\d+)?(x|%|k|m|ms|s|sec|hrs?|hours?|days?)\b/i,
  /\b(revenue|latency|throughput|uptime|costs?|downtime|adoption|conversion|engagement)\b/i
];

/**
 * Evaluates a single bullet point against the STAR framework
 * @param {string} bullet 
 * @returns {object} Evaluation details
 */
function evaluateStarBullet(bullet) {
  if (!bullet || typeof bullet !== "string") {
    return {
      text: "",
      situation: false,
      task: false,
      action: false,
      result: false,
      score: 0,
      missing: ["situation", "task", "action", "result"]
    };
  }

  const text = bullet.trim();
  const situation = SITUATION_INDICATORS.some((regex) => regex.test(text));
  const task = TASK_INDICATORS.some((regex) => regex.test(text));
  const action = ACTION_INDICATORS.some((regex) => regex.test(text));
  const result = RESULT_INDICATORS.some((regex) => regex.test(text));

  const present = [];
  const missing = [];

  if (situation) present.push("Situation"); else missing.push("Situation");
  if (task) present.push("Task"); else missing.push("Task");
  if (action) present.push("Action"); else missing.push("Action");
  if (result) present.push("Result"); else missing.push("Result");

  // Quality calculation: Action and Result are highest priority for resume bullet points
  let score = 0;
  if (action) score += 40;
  if (result) score += 40;
  if (task) score += 10;
  if (situation) score += 10;

  return {
    text,
    elements: { situation, task, action, result },
    present,
    missing,
    score,
    qualityRating: score >= 80 ? "Strong" : score >= 50 ? "Moderate" : "Weak",
  };
}

/**
 * Evaluates a list of work experience bullet points
 * @param {string[]} bullets 
 * @returns {object} Overall STAR evaluation
 */
function evaluateStarFramework(bullets = []) {
  if (!Array.isArray(bullets) || bullets.length === 0) {
    return {
      frameworkName: "STAR",
      totalBulletsEvaluated: 0,
      averageScore: 0,
      bulletsWithAction: 0,
      bulletsWithResult: 0,
      bulletsWithContext: 0,
      identifiedIssues: [
        {
          issue: "No work experience bullet points available for STAR evaluation",
          severity: "HIGH",
          evidence: "Experience section is empty or unstructured"
        }
      ],
      suggestions: [
        "Structure past experience using bullet points that highlight what you did (Action) and the outcome (Result)."
      ],
      details: []
    };
  }

  const details = bullets.map((b) => evaluateStarBullet(b));
  const totalBullets = details.length;

  const bulletsWithAction = details.filter((d) => d.elements.action).length;
  const bulletsWithResult = details.filter((d) => d.elements.result).length;
  const bulletsWithContext = details.filter((d) => d.elements.situation || d.elements.task).length;

  const totalScore = details.reduce((acc, curr) => acc + curr.score, 0);
  const averageScore = Math.round(totalScore / totalBullets);

  const identifiedIssues = [];
  const suggestions = [];

  const resultDeficiencyRate = ((totalBullets - bulletsWithResult) / totalBullets) * 100;
  if (resultDeficiencyRate > 50) {
    identifiedIssues.push({
      issue: `${totalBullets - bulletsWithResult} of ${totalBullets} bullets lack measurable Results`,
      severity: "HIGH",
      evidence: details.filter((d) => !d.elements.result).map((d) => d.text).slice(0, 3)
    });
    suggestions.push(
      "Add outcomes to your bullets by answering: 'What was the measurable benefit or business impact of this work?'"
    );
  }

  const actionDeficiencyRate = ((totalBullets - bulletsWithAction) / totalBullets) * 100;
  if (actionDeficiencyRate > 30) {
    identifiedIssues.push({
      issue: "Multiple bullets lack direct personal Action verbs",
      severity: "MEDIUM",
      evidence: details.filter((d) => !d.elements.action).map((d) => d.text).slice(0, 3)
    });
    suggestions.push(
      "Begin each bullet point with a vigorous action verb describing your direct contribution."
    );
  }

  return {
    frameworkName: "STAR",
    totalBulletsEvaluated: totalBullets,
    averageScore,
    bulletsWithAction,
    bulletsWithResult,
    bulletsWithContext,
    identifiedIssues,
    suggestions,
    details
  };
}

module.exports = {
  evaluateStarBullet,
  evaluateStarFramework
};
