const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("http");
require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const careerIntelligenceRoutes = require("../routes/careerIntelligenceRoutes");

const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api/career-intelligence", careerIntelligenceRoutes);
  return app;
};

test("Skill Gap Intelligence Integration Tests", async (t) => {
  const app = createTestApp();
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}/api/career-intelligence/skill-gap`;

  t.after(() => {
    server.close();
  });

  await t.test("Rejects request when resumeText is missing or too short", async () => {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText: "too short", jobDescription: "Requires 5+ years of React development" }),
    });

    const data = await res.json();
    assert.equal(res.status, 400);
    assert.equal(data.success, false);
    assert.match(data.message, /Resume content is required/i);
  });

  await t.test("Rejects request when jobDescription is missing or too short", async () => {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText: "Jane Doe, Senior Software Engineer with 6 years building React and Node.js microservices.",
        jobDescription: "short",
      }),
    });

    const data = await res.json();
    assert.equal(res.status, 400);
    assert.equal(data.success, false);
    assert.match(data.message, /Job description is required/i);
  });

  await t.test("Successfully analyzes skill gaps and returns structured intelligence payload", async () => {
    const payload = {
      resumeText: `
        Alex Mercer - Senior Software Developer
        alex@example.com | (555) 345-6789
        SUMMARY:
        Experienced Full-Stack Developer with 6+ years building React, Node.js, Express, and PostgreSQL web platforms.
        EXPERIENCE:
        Lead Developer at Fintech Cloud (2021 - Present)
        - Architected and released Node.js and PostgreSQL payment services handling 15,000 transactions daily.
        - Spearheaded React and Next.js frontend redesign improving user retention by 28%.
        SKILLS:
        React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Git, Tailwind CSS
      `,
      jobDescription: `
        We are seeking a Senior Cloud & Full-Stack Engineer.
        Must have:
        - Deep proficiency in React, TypeScript, and Node.js.
        - Experience with Docker containers, Kubernetes, and AWS deployment.
        - Track record with automated CI/CD pipelines and unit testing with Jest.
      `,
    };

    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data, "Response should contain data payload");

    const data = body.data;
    // Verify Overview
    assert.ok(typeof data.overview.skillCoveragePercentage === "number");
    assert.ok(data.overview.skillCoveragePercentage >= 0 && data.overview.skillCoveragePercentage <= 100);
    assert.ok(typeof data.overview.summaryVerdict === "string");

    // Verify Categorized Skills
    assert.ok(Array.isArray(data.strongSkills), "strongSkills should be an array");
    assert.ok(Array.isArray(data.needsImprovementSkills), "needsImprovementSkills should be an array");
    assert.ok(Array.isArray(data.missingSkills), "missingSkills should be an array");
    assert.ok(data.strongSkills.length > 0, "Should identify at least one strong skill (e.g. React/Node)");

    // Check evidence field
    const firstStrong = data.strongSkills[0];
    assert.ok(firstStrong.name);
    assert.ok(firstStrong.evidence);

    // Verify Project Recommendations
    assert.ok(Array.isArray(data.projectRecommendations));
    assert.ok(data.projectRecommendations.length >= 1, "Should suggest at least one portfolio project");
    const firstProject = data.projectRecommendations[0];
    assert.ok(firstProject.title);
    assert.ok(firstProject.description);
    assert.ok(Array.isArray(firstProject.techStack));

    // Verify Learning Roadmap
    assert.ok(data.learningRoadmap);
    assert.ok(Array.isArray(data.learningRoadmap.beginnerPriorities));
    assert.ok(Array.isArray(data.learningRoadmap.intermediatePriorities));
    assert.ok(Array.isArray(data.learningRoadmap.advancedPriorities));
  });
});
