/**
 * Action + Task + Result Formula Evaluator
 * Evaluates every important experience bullet point using:
 * [Strong Action Verb] + [Specific Task / Scope] + [Result / Impact]
 * 
 * Detects:
 * - Weak opening verbs
 * - Generic responsibilities
 * - Repetitive action verbs
 * - Vague descriptions ("various tasks", "different features")
 * - Missing context
 * - Missing outcomes
 */

const WEAK_OPENING_VERBS = new Set([
  "helped", "assisted", "worked", "tried", "handled", "managed",
  "did", "supported", "involved", "participated", "contributed", "used", "utilized"
]);

const STRONG_ACTION_VERBS = new Set([
  "accelerated", "accomplished", "achieved", "acquired", "adapted", "administered",
  "analyzed", "architected", "automated", "boosted", "built", "centralized",
  "championed", "collaborated", "composed", "conceptualized", "consolidated",
  "constructed", "converted", "coordinated", "created", "customized", "debugged",
  "decreased", "delivered", "deployed", "designed", "developed", "devised",
  "directed", "discovered", "doubled", "drafted", "eliminated", "enabled",
  "engineered", "enhanced", "established", "evaluated", "executed", "expanded",
  "expedited", "fabricated", "facilitated", "formulated", "founded", "generated",
  "guided", "halved", "harmonized", "headed", "implemented", "improved",
  "increased", "initiated", "innovated", "inspected", "instituted", "instructed",
  "integrated", "introduced", "invented", "investigated", "launched", "lead",
  "led", "maximized", "mentored", "migrated", "minimized", "modernized",
  "negotiated", "optimized", "orchestrated", "organized", "overhauled", "pioneered",
  "planned", "prepared", "produced", "programmed", "promoted", "proposed",
  "published", "rebuilt", "reconciled", "recruited", "redesigned", "reduced",
  "refined", "refactored", "remodeled", "reorganized", "replaced", "resolved",
  "restructured", "revamped", "reviewed", "revitalized", "saved", "scaled",
  "secured", "simplified", "solved", "spearheaded", "standardized", "streamlined",
  "strengthened", "structured", "surpassed", "trained", "transformed", "unified",
  "upgraded", "validated", "yielded"
]);

const VAGUE_PHRASES = [
  /\bvarious (tasks|features|technologies|tools|duties|things)\b/i,
  /\bdifferent (parts|features|modules|aspects)\b/i,
  /\betc\b/i,
  /\band so on\b/i,
  /\bas needed\b/i,
  /\bgeneral maintenance\b/i,
  /\bsome bugs?\b/i,
  /\bother duties\b/i
];

/**
 * Extracts the first word / verb from a bullet point
 * @param {string} text 
 * @returns {string}
 */
function getOpeningWord(text) {
  if (!text) return "";
  const cleaned = text.replace(/^[^a-zA-Z]+/, "").trim();
  const firstWord = cleaned.split(/\s+/)[0]?.toLowerCase() || "";
  return firstWord;
}

/**
 * Evaluates an individual bullet against the Action + Task + Result formula
 * @param {string} bullet 
 * @returns {object}
 */
function evaluateActionTaskResultBullet(bullet) {
  if (!bullet || typeof bullet !== "string") {
    return {
      text: "",
      hasStrongVerb: false,
      hasWeakVerb: true,
      hasVaguePhrasing: false,
      hasTaskContext: false,
      hasOutcome: false,
      issues: ["Empty bullet point"]
    };
  }

  const text = bullet.trim();
  const openingWord = getOpeningWord(text);

  const isWeak = WEAK_OPENING_VERBS.has(openingWord) || /^responsible\b/i.test(openingWord);
  const isStrong = STRONG_ACTION_VERBS.has(openingWord);

  const foundVaguePhrases = VAGUE_PHRASES
    .filter((regex) => regex.test(text))
    .map((r) => text.match(r)?.[0] || "");

  // Check task context (length and technical keywords)
  const wordCount = text.split(/\s+/).length;
  const hasTaskContext = wordCount >= 7 && !foundVaguePhrases.length;

  // Check outcome / result indicators
  const hasOutcome = /\b(\d+%|reduced|increased|boosted|saved|generated|resulting in|achieved|improved|scaled)\b/i.test(text);

  const issues = [];
  if (isWeak) {
    issues.push(`Weak opening verb ('${openingWord}'). Consider starting with a direct active verb.`);
  } else if (!isStrong && openingWord) {
    issues.push(`Opening word ('${openingWord}') is not recognized as a standard impactful action verb.`);
  }

  if (foundVaguePhrases.length > 0) {
    issues.push(`Vague wording detected: "${foundVaguePhrases.join('", "')}". Specify exact technologies or systems.`);
  }

  if (!hasOutcome) {
    issues.push("Missing measurable outcome or clear business/technical impact.");
  }

  if (wordCount < 6) {
    issues.push("Bullet is too brief to provide adequate context on what was built or solved.");
  }

  return {
    text,
    openingWord,
    hasStrongVerb: isStrong,
    hasWeakVerb: isWeak,
    hasVaguePhrasing: foundVaguePhrases.length > 0,
    hasTaskContext,
    hasOutcome,
    issues
  };
}

/**
 * Evaluates full bullet list for formula adherence and repetitive verbs
 * @param {string[]} bullets 
 * @returns {object}
 */
function evaluateActionVerbFramework(bullets = []) {
  if (!Array.isArray(bullets) || bullets.length === 0) {
    return {
      frameworkName: "Action + Task + Result Formula",
      evaluatedCount: 0,
      verbRepetition: {},
      weakVerbCount: 0,
      vaguePhraseCount: 0,
      missingOutcomeCount: 0,
      identifiedIssues: [],
      suggestions: []
    };
  }

  const evaluated = bullets.map(evaluateActionTaskResultBullet);
  const openingVerbs = {};

  evaluated.forEach((item) => {
    if (item.openingWord) {
      openingVerbs[item.openingWord] = (openingVerbs[item.openingWord] || 0) + 1;
    }
  });

  // Repetitive verbs (used > 2 times)
  const repetitiveVerbs = Object.entries(openingVerbs).filter(([verb, count]) => count >= 3);

  const weakVerbCount = evaluated.filter((e) => e.hasWeakVerb).length;
  const vaguePhraseCount = evaluated.filter((e) => e.hasVaguePhrasing).length;
  const missingOutcomeCount = evaluated.filter((e) => !e.hasOutcome).length;

  const identifiedIssues = [];
  const suggestions = [];

  if (repetitiveVerbs.length > 0) {
    repetitiveVerbs.forEach(([verb, count]) => {
      identifiedIssues.push({
        issue: `Verb '${verb}' is repeated ${count} times at the start of bullet points`,
        severity: "MEDIUM",
        evidence: `Repeated verb: ${verb}`
      });
    });
    suggestions.push(
      "Vary your action verbs. Instead of repeating the same verb, use role-appropriate synonyms like 'architected', 'spearheaded', 'orchestrated', or 'implemented'."
    );
  }

  if (weakVerbCount > 0) {
    identifiedIssues.push({
      issue: `${weakVerbCount} bullet point(s) open with passive or weak verbs`,
      severity: "HIGH",
      evidence: evaluated.filter((e) => e.hasWeakVerb).map((e) => e.text)
    });
    suggestions.push(
      "Replace passive openings ('Assisted with', 'Worked on') with definitive action verbs ('Engineered', 'Formulated', 'Streamlined')."
    );
  }

  if (vaguePhraseCount > 0) {
    identifiedIssues.push({
      issue: `${vaguePhraseCount} bullet point(s) contain ambiguous phrases like 'various' or 'as needed'`,
      severity: "MEDIUM",
      evidence: evaluated.filter((e) => e.hasVaguePhrasing).map((e) => e.text)
    });
    suggestions.push(
      "Replace generic terms with concrete nouns (e.g. state 'Redis caching and PostgreSQL queries' instead of 'various tools')."
    );
  }

  return {
    frameworkName: "Action + Task + Result Formula",
    evaluatedCount: evaluated.length,
    repetitiveVerbs: Object.fromEntries(repetitiveVerbs),
    weakVerbCount,
    vaguePhraseCount,
    missingOutcomeCount,
    identifiedIssues,
    suggestions,
    details: evaluated
  };
}

module.exports = {
  WEAK_OPENING_VERBS,
  STRONG_ACTION_VERBS,
  evaluateActionTaskResultBullet,
  evaluateActionVerbFramework
};
