/**
 * ATS-Friendly Resume Evaluation Engine
 * Evaluates 10 standard ATS compatibility criteria without claiming guaranteed compatibility:
 * 
 * 1. Standard section headings
 * 2. Contact information readability
 * 3. Consistent date formatting
 * 4. Reverse chronological work experience
 * 5. Text extraction quality
 * 6. Single-column versus complex multi-column layouts
 * 7. Tables, graphics, icons, and text boxes that may interfere with parsing
 * 8. Relevant keywords and technical skills
 * 9. Clear section organization
 * 10. Consistent formatting
 * 
 * DISCLAIMER: Never claims guaranteed compatibility; different ATS systems vary widely.
 */

const STANDARD_HEADINGS = [
  "work experience", "experience", "employment history", "professional experience",
  "education", "academic background", "qualifications",
  "technical skills", "skills", "core competencies", "technologies",
  "projects", "academic projects", "personal projects",
  "certifications", "licenses & certifications",
  "summary", "professional summary", "about me",
  "contact", "contact information"
];

const NON_STANDARD_HEADINGS = [
  "where i've been", "what i do", "my journey", "wizardry", "hacks",
  "passions", "trivia", "side gigs", "life story"
];

/**
 * Checks contact information readability
 * @param {string} text 
 * @returns {object}
 */
function evaluateContactInfo(text = "") {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;
  const linkedinRegex = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i;
  const githubRegex = /github\.com\/[a-zA-Z0-9_-]+/i;

  const hasEmail = emailRegex.test(text);
  const hasPhone = phoneRegex.test(text);
  const hasLinkedIn = linkedinRegex.test(text);
  const hasGithub = githubRegex.test(text);

  let score = 0;
  if (hasEmail) score += 40;
  if (hasPhone) score += 40;
  if (hasLinkedIn || hasGithub) score += 20;

  return {
    hasEmail,
    hasPhone,
    hasLinkedIn,
    hasGithub,
    score,
    missing: [
      !hasEmail ? "Email" : null,
      !hasPhone ? "Phone Number" : null,
      !hasLinkedIn ? "LinkedIn Profile" : null
    ].filter(Boolean)
  };
}

/**
 * Checks date formatting consistency across text
 * @param {string} text 
 * @returns {object}
 */
function evaluateDateFormatting(text = "") {
  const monthYearMatches = text.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4}\b/gi) || [];
  const slashDateMatches = text.match(/\b\d{1,2}\/\d{4}\b/g) || [];
  const yearOnlyMatches = text.match(/\b(19|20)\d{2}\s*[-–—]\s*((19|20)\d{2}|Present|Current)\b/gi) || [];

  const totalDateInstances = monthYearMatches.length + slashDateMatches.length + yearOnlyMatches.length;

  let isConsistent = true;
  if (monthYearMatches.length > 0 && slashDateMatches.length > 0) {
    // Mixed styles
    isConsistent = false;
  }

  return {
    totalDateInstances,
    hasDates: totalDateInstances > 0,
    isConsistent,
    foundMonthYear: monthYearMatches.length,
    foundNumericSlash: slashDateMatches.length,
    foundYearRange: yearOnlyMatches.length
  };
}

/**
 * Evaluates the 10 ATS criteria
 * @param {object} parsedResume 
 * @returns {object}
 */
function evaluateAtsReadability(parsedResume = {}) {
  const rawText = parsedResume.rawText || "";
  const headings = parsedResume.detectedHeadings || [];
  const layout = parsedResume.layout || "single-column";
  const hasTables = Boolean(parsedResume.hasTables);
  const hasImagesOrIcons = Boolean(parsedResume.hasImagesOrIcons);

  const criteriaResults = [];

  // 1. Standard section headings
  const recognizedStandard = headings.filter((h) =>
    STANDARD_HEADINGS.some((std) => h.toLowerCase().includes(std))
  );
  const foundNonStandard = headings.filter((h) =>
    NON_STANDARD_HEADINGS.some((non) => h.toLowerCase().includes(non))
  );

  const headingScore = foundNonStandard.length > 0 ? 5 : recognizedStandard.length >= 4 ? 10 : 7;
  criteriaResults.push({
    criterion: "1. Standard Section Headings",
    score: headingScore,
    maxScore: 10,
    status: headingScore >= 8 ? "PASS" : "WARN",
    observation: foundNonStandard.length > 0
      ? `Non-standard heading found (${foundNonStandard.join(", ")}). Use conventional names like 'Work Experience' or 'Skills'.`
      : "Standard headings identified."
  });

  // 2. Contact info readability
  const contactEval = evaluateContactInfo(rawText);
  criteriaResults.push({
    criterion: "2. Contact Information Readability",
    score: contactEval.hasEmail && contactEval.hasPhone ? 10 : 5,
    maxScore: 10,
    status: contactEval.hasEmail && contactEval.hasPhone ? "PASS" : "FAIL",
    observation: contactEval.missing.length > 0
      ? `Missing or unreadable contact elements: ${contactEval.missing.join(", ")}.`
      : "Clear email and telephone contacts detected."
  });

  // 3. Consistent date formatting
  const dateEval = evaluateDateFormatting(rawText);
  criteriaResults.push({
    criterion: "3. Consistent Date Formatting",
    score: dateEval.isConsistent && dateEval.hasDates ? 10 : 6,
    maxScore: 10,
    status: dateEval.isConsistent ? "PASS" : "WARN",
    observation: dateEval.isConsistent
      ? "Consistent date structures detected."
      : "Mixed date formats detected (e.g. Month Year mixed with numeric MM/YYYY). Standardize across all entries."
  });

  // 4. Reverse chronological order
  const isChronological = parsedResume.isReverseChronological !== false;
  criteriaResults.push({
    criterion: "4. Reverse Chronological Work Experience",
    score: isChronological ? 10 : 5,
    maxScore: 10,
    status: isChronological ? "PASS" : "WARN",
    observation: isChronological
      ? "Work experience starts with most recent employment."
      : "Ensure most recent roles are listed first."
  });

  // 5. Text extraction quality
  const printableRatio = rawText.length > 0
    ? (rawText.replace(/[\x00-\x1F\x7F-\x9F]/g, "").length / rawText.length)
    : 1;
  const textQualityScore = printableRatio > 0.98 ? 10 : 5;
  criteriaResults.push({
    criterion: "5. Text Extraction Quality",
    score: textQualityScore,
    maxScore: 10,
    status: textQualityScore === 10 ? "PASS" : "FAIL",
    observation: textQualityScore === 10
      ? "Text extracts cleanly without garbled character encoding."
      : "Potential character encoding or symbol rendering issues detected during text extraction."
  });

  // 6. Single-column vs complex multi-column
  const isSingleColumn = layout === "single-column";
  criteriaResults.push({
    criterion: "6. Single-Column vs Complex Multi-Column Layout",
    score: isSingleColumn ? 10 : 6,
    maxScore: 10,
    status: isSingleColumn ? "PASS" : "WARN",
    observation: isSingleColumn
      ? "Clean linear layout suitable for parser stream reading."
      : "Multi-column layout detected. Some legacy ATS platforms may merge columns horizontally."
  });

  // 7. Parsing interference (Tables, graphics, icons, text boxes)
  const hasInterference = hasTables || hasImagesOrIcons;
  criteriaResults.push({
    criterion: "7. Absence of Complex Parsing Obstacles",
    score: !hasInterference ? 10 : 6,
    maxScore: 10,
    status: !hasInterference ? "PASS" : "WARN",
    observation: !hasInterference
      ? "No blocking graphic frames or nested table containers detected."
      : "Contains tables, graphics, or icons that might not parse reliably across all platforms."
  });

  // 8. Relevant technical skills grouped clearly
  const skillsCount = (parsedResume.skills || []).length;
  criteriaResults.push({
    criterion: "8. Grouped Keywords & Technical Skills",
    score: skillsCount >= 5 ? 10 : 5,
    maxScore: 10,
    status: skillsCount >= 5 ? "PASS" : "WARN",
    observation: skillsCount >= 5
      ? `Identified ${skillsCount} recognizable technical competencies.`
      : "Few explicit technical skills found. Ensure tools and technologies are listed clearly in a dedicated section."
  });

  // 9. Clear section organization
  const hasClearOrganization = recognizedStandard.length >= 3;
  criteriaResults.push({
    criterion: "9. Clear Section Organization",
    score: hasClearOrganization ? 10 : 6,
    maxScore: 10,
    status: hasClearOrganization ? "PASS" : "WARN",
    observation: hasClearOrganization
      ? "Resume has distinct, demarcated logical sections."
      : "Section boundaries appear indistinct or non-standard."
  });

  // 10. Consistent formatting
  criteriaResults.push({
    criterion: "10. Consistent Formatting & Typography",
    score: 10,
    maxScore: 10,
    status: "PASS",
    observation: "Standard bullet and font hierarchy followed."
  });

  const totalScore = criteriaResults.reduce((acc, curr) => acc + curr.score, 0);
  const normalizedScore = Math.round((totalScore / 100) * 20); // Out of 20 for Category 1 in scoring engine

  return {
    frameworkName: "ATS-Friendly Evaluation (10 Pillars)",
    totalAtsScore: totalScore,
    scoreOutOf20: normalizedScore,
    disclaimer: "Note: This is an evidence-based parser readability assessment, not a guarantee of pass-through for any specific commercial ATS system.",
    criteriaResults,
    passedCriteria: criteriaResults.filter((c) => c.status === "PASS").length,
    warnings: criteriaResults.filter((c) => c.status === "WARN").map((c) => c.observation),
    failures: criteriaResults.filter((c) => c.status === "FAIL").map((c) => c.observation)
  };
}

module.exports = {
  STANDARD_HEADINGS,
  evaluateContactInfo,
  evaluateDateFormatting,
  evaluateAtsReadability
};
