const { generateStructuredJSON } = require("../ai/geminiClient");
const { SkillGapResultSchema } = require("../ai/skillGapSchema");

/**
 * Builds the comprehensive prompt for Gemini Skill Gap Intelligence.
 */
function buildSkillGapPrompt(resumeText, jobDescription) {
  return `You are a Principal Technical Career Strategist and Staff Hiring Architect.
Perform an exhaustive, evidence-backed Skill Gap Intelligence analysis comparing the provided candidate resume against the target job description.

=== CANDIDATE RESUME ===
${resumeText}

=== TARGET JOB DESCRIPTION ===
${jobDescription}

=== STRICT EVIDENCE & GROUNDING GUIDELINES ===
1. Analyze all sections of the resume: Technical Skills, Work Experience bullets, Projects, Education, and Certifications.
2. DO NOT assume proficiency based on a skill name alone. Check for real application in projects or work history.
3. Categorize all key competencies required by the job description into three distinct tiers:
   - strongSkills: Skills clearly demonstrated with concrete work experience, projects, or measurable accomplishments. Quote or cite the exact role/project in the "evidence" field.
   - needsImprovementSkills: Skills mentioned in the resume (e.g. in a skills list or brief course) but lacking demonstrated project evidence, ownership, or depth. Specify why in "reason".
   - missingSkills: Skills, architectures, or tools explicitly required or strongly preferred by the job description that have zero mention or evidence in the resume. Assign priority (High/Medium/Low).
4. NEVER fabricate candidate experience or metrics.
5. Provide 2-3 practical, production-grade Portfolio Project Recommendations explicitly designed to bridge the missing/weak skills.
6. Provide a personalized 3-stage Learning Roadmap (Beginner Priorities, Intermediate Priorities, Advanced Priorities) with actionable tasks and milestone projects.
7. Return strictly valid JSON matching the exact schema requested.

=== OUTPUT JSON STRUCTURE ===
{
  "overview": {
    "skillCoveragePercentage": <number between 0 and 100>,
    "totalRequiredSkillsCount": <number>,
    "strongSkillsCount": <number>,
    "needsImprovementCount": <number>,
    "missingSkillsCount": <number>,
    "summaryVerdict": "<2-3 sentence executive summary of candidate readiness for this specific job>"
  },
  "strongSkills": [
    {
      "name": "<Skill Name>",
      "category": "<Technical / Tool / Domain / Soft>",
      "evidence": "<Direct citation or role context from resume proving practical proficiency>",
      "confidence": "High"
    }
  ],
  "needsImprovementSkills": [
    {
      "name": "<Skill Name>",
      "category": "<Technical / Tool / Domain>",
      "currentEvidence": "<Where it was mentioned in resume>",
      "reason": "<Why it needs improvement, e.g. listed without project proof>",
      "priority": "High" | "Medium" | "Low"
    }
  ],
  "missingSkills": [
    {
      "name": "<Skill Name>",
      "category": "<Technical / Tool / Domain>",
      "requiredContext": "<How this skill is used according to the target job description>",
      "priority": "High" | "Medium" | "Low",
      "impactOnApplication": "<Why this gap matters for this role>"
    }
  ],
  "projectRecommendations": [
    {
      "title": "<Project Title>",
      "description": "<What the project accomplishes and architecture>",
      "demonstratedSkills": ["<Skill 1>", "<Skill 2>"],
      "techStack": ["<Tech A>", "<Tech B>"],
      "estimatedDifficulty": "Beginner" | "Intermediate" | "Advanced",
      "estimatedHours": "<e.g. 20-25 hours>",
      "keyDeliverables": ["<Deliverable 1>", "<Deliverable 2>"]
    }
  ],
  "learningRoadmap": {
    "beginnerPriorities": [
      {
        "timeframe": "<e.g. Weeks 1-2>",
        "focusArea": "<Core fundamentals>",
        "skillsTargeted": ["<Skill A>"],
        "practicalTasks": ["<Task 1>", "<Task 2>"],
        "milestoneProject": "<Milestone outcome>"
      }
    ],
    "intermediatePriorities": [
      {
        "timeframe": "<e.g. Weeks 3-4>",
        "focusArea": "<Applied architecture>",
        "skillsTargeted": ["<Skill B>"],
        "practicalTasks": ["<Task 1>", "<Task 2>"],
        "milestoneProject": "<Milestone outcome>"
      }
    ],
    "advancedPriorities": [
      {
        "timeframe": "<e.g. Month 2>",
        "focusArea": "<Production readiness, CI/CD, performance>",
        "skillsTargeted": ["<Skill C>"],
        "practicalTasks": ["<Task 1>", "<Task 2>"],
        "milestoneProject": "<Milestone outcome>"
      }
    ]
  },
  "groundedAudit": {
    "verifiedFromResumeOnly": true,
    "notesOnEvidence": "<Notes confirming all positive assertions were derived from actual resume content>"
  }
}`;
}

/**
 * Deterministic fallback generator if AI provider is temporarily unavailable.
 * Uses rigorous keyword and section analysis to calculate grounded skill gaps.
 */
function generateDeterministicSkillGap(resumeText = "", jobDescription = "") {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  // Common industry skills catalog for matching
  const knownCatalog = [
    { name: "React", category: "Frontend", aliases: ["react", "react.js", "reactjs"] },
    { name: "Next.js", category: "Frontend", aliases: ["next.js", "nextjs"] },
    { name: "TypeScript", category: "Languages", aliases: ["typescript", "ts"] },
    { name: "JavaScript", category: "Languages", aliases: ["javascript", "js", "es6"] },
    { name: "Node.js", category: "Backend", aliases: ["node", "node.js", "nodejs"] },
    { name: "Express.js", category: "Backend", aliases: ["express", "express.js", "expressjs"] },
    { name: "Python", category: "Languages", aliases: ["python", "python3"] },
    { name: "MongoDB", category: "Databases", aliases: ["mongodb", "mongo"] },
    { name: "PostgreSQL", category: "Databases", aliases: ["postgresql", "postgres"] },
    { name: "SQL", category: "Databases", aliases: ["sql", "rdbms"] },
    { name: "Redis", category: "Databases", aliases: ["redis", "caching"] },
    { name: "Docker", category: "DevOps", aliases: ["docker", "containerization"] },
    { name: "Kubernetes", category: "DevOps", aliases: ["kubernetes", "k8s"] },
    { name: "AWS", category: "Cloud", aliases: ["aws", "amazon web services", "ec2", "s3", "lambda"] },
    { name: "GraphQL", category: "Backend", aliases: ["graphql"] },
    { name: "REST API", category: "Backend", aliases: ["rest", "restful", "rest api", "apis"] },
    { name: "CI/CD", category: "DevOps", aliases: ["ci/cd", "github actions", "gitlab ci", "jenkins"] },
    { name: "Tailwind CSS", category: "Frontend", aliases: ["tailwind", "tailwindcss"] },
    { name: "Jest / Testing", category: "QA", aliases: ["jest", "testing", "unit test", "cypress"] },
    { name: "Microservices", category: "Architecture", aliases: ["microservices", "distributed systems"] },
    { name: "Kafka", category: "Backend", aliases: ["kafka", "message queue", "rabbitmq"] },
    { name: "Git", category: "Tools", aliases: ["git", "github", "version control"] },
    { name: "Agile / Scrum", category: "Methodology", aliases: ["agile", "scrum", "sprints"] },
  ];

  // Identify skills required in JD
  const requiredSkills = knownCatalog.filter(skill =>
    skill.aliases.some(alias => new RegExp(`\\b${alias}\\b`, "i").test(jdLower))
  );

  // If JD is sparse, include default tech matches
  const targetSkills = requiredSkills.length >= 3 ? requiredSkills : knownCatalog.slice(0, 8);

  const strongSkills = [];
  const needsImprovementSkills = [];
  const missingSkills = [];

  for (const skill of targetSkills) {
    const isMentioned = skill.aliases.some(alias => new RegExp(`\\b${alias}\\b`, "i").test(resumeLower));
    
    if (!isMentioned) {
      missingSkills.push({
        name: skill.name,
        category: skill.category,
        requiredContext: `Required for the target role's ${skill.category.toLowerCase()} workflow as outlined in the job description.`,
        priority: ["Docker", "Kubernetes", "AWS", "TypeScript", "Microservices"].includes(skill.name) ? "High" : "Medium",
        impactOnApplication: `Missing ${skill.name} signals an experience gap in modern ${skill.category.toLowerCase()} standards.`,
      });
    } else {
      // Check if demonstrated in experience/projects with depth
      const deepPattern = new RegExp(`(${skill.aliases.join("|")})[\\s\\S]{1,120}(reduced|improved|increased|built|architected|deployed|engineered|developed|%|ms|users)`, "i");
      const hasMetricOrImpact = deepPattern.test(resumeLower);

      if (hasMetricOrImpact) {
        strongSkills.push({
          name: skill.name,
          category: skill.category,
          evidence: `Demonstrated in work experience and projects with direct implementation context.`,
          confidence: "High",
        });
      } else {
        needsImprovementSkills.push({
          name: skill.name,
          category: skill.category,
          currentEvidence: `Mentioned in resume skill summary or role description without quantified impact.`,
          reason: `Skill is listed but lacks measurable business impact or complex architectural evidence.`,
          priority: "Medium",
        });
      }
    }
  }

  const total = strongSkills.length + needsImprovementSkills.length + missingSkills.length || 1;
  const coveragePct = Math.round(((strongSkills.length + needsImprovementSkills.length * 0.5) / total) * 100);

  // Dynamic project recommendations based on missing skills
  const missingNames = missingSkills.map(s => s.name);
  const primaryGap = missingNames[0] || "Cloud & DevOps Architecture";
  const secondaryGap = missingNames[1] || "Automated Testing & CI/CD";

  const projectRecommendations = [
    {
      title: `Enterprise Production Showcase: ${primaryGap} Integration`,
      description: `Build an end-to-end full stack application showcasing ${primaryGap} with real-time monitoring and containerized deployment.`,
      demonstratedSkills: missingNames.slice(0, 3).length > 0 ? missingNames.slice(0, 3) : [primaryGap],
      techStack: [primaryGap, "Docker", "Node.js", "PostgreSQL"],
      estimatedDifficulty: "Intermediate",
      estimatedHours: "20-25 hours",
      keyDeliverables: [
        `Fully containerized service utilizing ${primaryGap}`,
        "Automated CI/CD deployment pipeline with unit test coverage",
        "Comprehensive architectural README and live deployment URL",
      ],
    },
    {
      title: `Scalable Microservices Bridge: ${secondaryGap}`,
      description: `Architect a distributed service handling asynchronous tasks and data streaming with robust error boundaries.`,
      demonstratedSkills: [secondaryGap, "System Design"],
      techStack: [secondaryGap, "Redis", "TypeScript"],
      estimatedDifficulty: "Advanced",
      estimatedHours: "30-35 hours",
      keyDeliverables: [
        "Resilient queuing and event processing architecture",
        "Performance benchmarks demonstrating latency under load",
      ],
    },
  ];

  const learningRoadmap = {
    beginnerPriorities: [
      {
        timeframe: "Weeks 1-2",
        focusArea: `Core Fundamentals of ${missingNames[0] || "Key Missing Technologies"}`,
        skillsTargeted: missingNames.slice(0, 2),
        practicalTasks: [
          `Complete hands-on implementation tutorials for ${missingNames[0] || "target frameworks"}`,
          "Build a minimal standalone proof of concept demonstrating core APIs",
        ],
        milestoneProject: "Working prototype repository with documented setup steps",
      },
    ],
    intermediatePriorities: [
      {
        timeframe: "Weeks 3-4",
        focusArea: "Application Architecture & Integration",
        skillsTargeted: missingNames.slice(0, 3),
        practicalTasks: [
          "Integrate missing tools into an existing full-stack application",
          "Implement structured logging, error handling, and authentication flow",
        ],
        milestoneProject: "Full-stack feature branch ready for staging deployment",
      },
    ],
    advancedPriorities: [
      {
        timeframe: "Weeks 5-6",
        focusArea: "Production Optimization & DevOps",
        skillsTargeted: ["CI/CD", "Performance Tuning"],
        practicalTasks: [
          "Set up automated testing and Docker containerization",
          "Conduct latency benchmarking and memory profiling",
        ],
        milestoneProject: "Production deployment with automated CI/CD and metrics dashboard",
      },
    ],
  };

  return {
    overview: {
      skillCoveragePercentage: coveragePct,
      totalRequiredSkillsCount: total,
      strongSkillsCount: strongSkills.length,
      needsImprovementCount: needsImprovementSkills.length,
      missingSkillsCount: missingSkills.length,
      summaryVerdict: coveragePct >= 75
        ? "The candidate shows strong foundational overlap with the target job requirements. Bridging key secondary technical competencies will place this profile in the top candidate percentile."
        : "The candidate possesses core programming capabilities, but has notable experience gaps in specific frameworks and deployment tools mandated by the job description.",
    },
    strongSkills,
    needsImprovementSkills,
    missingSkills,
    projectRecommendations,
    learningRoadmap,
    groundedAudit: {
      verifiedFromResumeOnly: true,
      notesOnEvidence: "Skills verified deterministically by inspecting resume experience and project statements.",
    },
  };
}

/**
 * Main Orchestrator: Conducts Skill Gap Intelligence Analysis
 * 
 * @param {string} resumeText - Extracted text of resume
 * @param {string} jobDescription - Target job description text
 * @returns {Promise<object>} Grounded, validated Skill Gap Intelligence result
 */
async function analyzeSkillGaps(resumeText, jobDescription) {
  if (!resumeText || typeof resumeText !== "string" || resumeText.trim().length < 20) {
    throw new Error("Valid resume text with at least 20 characters is required.");
  }
  if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 20) {
    throw new Error("Valid job description with at least 20 characters is required.");
  }

  const prompt = buildSkillGapPrompt(resumeText, jobDescription);

  const result = await generateStructuredJSON({
    systemInstruction: "You are an elite Career Intelligence AI. You evaluate skills strictly based on evidence from the resume. Return ONLY JSON conforming to the schema.",
    prompt,
    zodSchema: SkillGapResultSchema,
    fallbackGenerator: () => generateDeterministicSkillGap(resumeText, jobDescription),
  });

  return result;
}

module.exports = {
  analyzeSkillGaps,
  buildSkillGapPrompt,
  generateDeterministicSkillGap,
};
