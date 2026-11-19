/**
 * Professional Resume Structure & Candidate Profile Classifier
 * 
 * Evaluates core sections:
 * - Contact Information (Required)
 * - Professional Summary (Recommended)
 * - Technical Skills (Required)
 * - Work Experience (Required for experienced, Optional/Project-driven for Freshers)
 * - Projects (Critical for Freshers/Entry-level, Complementary for Experienced)
 * - Education (Required)
 * - Certifications (Optional - never penalized)
 * - Achievements (Optional - never penalized)
 * 
 * Adapts expectations by candidate tier:
 * - Fresher
 * - Entry-level (1-2 years)
 * - Experienced professional (3+ years)
 * - Career switcher
 */

const EXPERIENCE_TIERS = {
  FRESHER: "Fresher",
  ENTRY_LEVEL: "Entry-level",
  EXPERIENCED: "Experienced professional",
  CAREER_SWITCHER: "Career switcher"
};

/**
 * Detects candidate profile tier based on education dates and experience history
 * @param {object} parsedResume 
 * @returns {string} One of EXPERIENCE_TIERS
 */
function classifyCandidateTier(parsedResume = {}) {
  if (parsedResume.explicitTier) {
    return parsedResume.explicitTier;
  }

  const workYears = Number(parsedResume.yearsOfExperience || 0);
  const experiences = parsedResume.workExperience || [];
  const projects = parsedResume.projects || [];
  const isCareerSwitching = Boolean(parsedResume.isCareerSwitcher);

  if (isCareerSwitching) {
    return EXPERIENCE_TIERS.CAREER_SWITCHER;
  }

  if (workYears === 0 && experiences.length === 0) {
    return EXPERIENCE_TIERS.FRESHER;
  }

  if (workYears < 3 || experiences.length <= 1) {
    return EXPERIENCE_TIERS.ENTRY_LEVEL;
  }

  return EXPERIENCE_TIERS.EXPERIENCED;
}

/**
 * Evaluates section presence and structure appropriate to the candidate tier
 * @param {object} parsedResume 
 * @returns {object}
 */
function evaluateResumeStructure(parsedResume = {}) {
  const tier = classifyCandidateTier(parsedResume);

  const sectionsDetected = {
    contactInfo: Boolean(parsedResume.contactInfo && (parsedResume.contactInfo.email || parsedResume.contactInfo.phone)),
    summary: Boolean(parsedResume.summary && parsedResume.summary.trim().length > 10),
    skills: Boolean(parsedResume.skills && parsedResume.skills.length > 0),
    experience: Boolean(parsedResume.workExperience && parsedResume.workExperience.length > 0),
    projects: Boolean(parsedResume.projects && parsedResume.projects.length > 0),
    education: Boolean(parsedResume.education && parsedResume.education.length > 0),
    certifications: Boolean(parsedResume.certifications && parsedResume.certifications.length > 0),
    achievements: Boolean(parsedResume.achievements && parsedResume.achievements.length > 0)
  };

  const missingCrucial = [];
  const missingRecommended = [];
  const adaptiveNotes = [];

  // Contact info check
  if (!sectionsDetected.contactInfo) {
    missingCrucial.push("Contact Information (Email, Phone)");
  }

  // Education check
  if (!sectionsDetected.education) {
    missingCrucial.push("Education");
  }

  // Skills check
  if (!sectionsDetected.skills) {
    missingCrucial.push("Technical Skills");
  }

  // Tier-specific section evaluation
  if (tier === EXPERIENCE_TIERS.FRESHER) {
    adaptiveNotes.push("Evaluated as a Fresher: Academic coursework, practical projects, and foundational skills are prioritized over formal corporate employment.");
    if (!sectionsDetected.projects) {
      missingCrucial.push("Projects (Critical for demonstrating hands-on technical competence as a fresher)");
    }
    if (!sectionsDetected.experience) {
      // NOTE: DO NOT penalize freshers for omitting corporate work experience
      adaptiveNotes.push("Zero corporate work experience is normal for fresh graduates. Practical projects provide the primary demonstration of skill.");
    }
  } else if (tier === EXPERIENCE_TIERS.ENTRY_LEVEL) {
    adaptiveNotes.push("Evaluated as Entry-Level (1-2 years): Both early work achievements and practical projects are expected.");
    if (!sectionsDetected.experience) {
      missingRecommended.push("Work Experience (Internship or junior role details)");
    }
  } else if (tier === EXPERIENCE_TIERS.EXPERIENCED) {
    adaptiveNotes.push("Evaluated as Experienced Professional: Emphasis placed on career progression, team collaboration, and measurable business impact.");
    if (!sectionsDetected.experience) {
      missingCrucial.push("Work Experience (Expected for experienced profiles)");
    }
  } else if (tier === EXPERIENCE_TIERS.CAREER_SWITCHER) {
    adaptiveNotes.push("Evaluated as Career Switcher: Projects and transferable cross-domain skills serve as primary qualification bridges.");
    if (!sectionsDetected.projects) {
      missingCrucial.push("Projects demonstrating competence in the target domain");
    }
  }

  if (!sectionsDetected.summary) {
    missingRecommended.push("Professional Summary (Recommended to frame your expertise)");
  }

  // Optional sections notice
  const optionalSectionsPresent = [];
  if (sectionsDetected.certifications) optionalSectionsPresent.push("Certifications");
  if (sectionsDetected.achievements) optionalSectionsPresent.push("Achievements");

  return {
    candidateTier: tier,
    sectionsDetected,
    missingCrucial,
    missingRecommended,
    optionalSectionsPresent,
    adaptiveNotes,
    isValidStructure: missingCrucial.length === 0
  };
}

module.exports = {
  EXPERIENCE_TIERS,
  classifyCandidateTier,
  evaluateResumeStructure
};
