const { z } = require("zod");

const SkillItemSchema = z.object({
  name: z.string(),
  category: z.string().default("Technical"),
  evidence: z.string().describe("Direct evidence or context from the resume proving this skill"),
  confidence: z.enum(["High", "Medium", "Low"]).default("High"),
});

const NeedsImprovementSkillSchema = z.object({
  name: z.string(),
  category: z.string().default("Technical"),
  currentEvidence: z.string().describe("Where or how it is mentioned in the resume"),
  reason: z.string().describe("Why this skill needs improvement (e.g. listed in skills list without supporting bullet points, projects, or metrics)"),
  priority: z.enum(["High", "Medium", "Low"]).default("Medium"),
});

const MissingSkillSchema = z.object({
  name: z.string(),
  category: z.string().default("Technical"),
  requiredContext: z.string().describe("How this skill is used according to the target job description"),
  priority: z.enum(["High", "Medium", "Low"]).default("High"),
  impactOnApplication: z.string().describe("Why missing this skill impacts candidate competitiveness"),
});

const ProjectRecommendationSchema = z.object({
  title: z.string(),
  description: z.string().describe("What the project should accomplish and practical use case"),
  demonstratedSkills: z.array(z.string()).describe("List of missing or improving skills this project demonstrates"),
  techStack: z.array(z.string()).describe("Core technologies, libraries, and frameworks required"),
  estimatedDifficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  estimatedHours: z.string().default("20-30 hours"),
  keyDeliverables: z.array(z.string()),
});

const LearningMilestoneSchema = z.object({
  timeframe: z.string().describe("e.g. Weeks 1-2, Month 1"),
  focusArea: z.string(),
  skillsTargeted: z.array(z.string()),
  practicalTasks: z.array(z.string()),
  milestoneProject: z.string(),
});

const SkillGapResultSchema = z.object({
  overview: z.object({
    skillCoveragePercentage: z.number().min(0).max(100),
    totalRequiredSkillsCount: z.number(),
    strongSkillsCount: z.number(),
    needsImprovementCount: z.number(),
    missingSkillsCount: z.number(),
    summaryVerdict: z.string(),
  }),
  strongSkills: z.array(SkillItemSchema),
  needsImprovementSkills: z.array(NeedsImprovementSkillSchema),
  missingSkills: z.array(MissingSkillSchema),
  projectRecommendations: z.array(ProjectRecommendationSchema),
  learningRoadmap: z.object({
    beginnerPriorities: z.array(LearningMilestoneSchema),
    intermediatePriorities: z.array(LearningMilestoneSchema),
    advancedPriorities: z.array(LearningMilestoneSchema),
  }),
  groundedAudit: z.object({
    verifiedFromResumeOnly: z.boolean().default(true),
    notesOnEvidence: z.string(),
  }),
});

module.exports = {
  SkillGapResultSchema,
  SkillItemSchema,
  NeedsImprovementSkillSchema,
  MissingSkillSchema,
  ProjectRecommendationSchema,
  LearningMilestoneSchema,
};
