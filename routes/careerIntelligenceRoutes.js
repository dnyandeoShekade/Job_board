const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { analyzeSkillGapHandler } = require("../controllers/careerIntelligenceController");

// POST /api/career-intelligence/skill-gap (accepts JSON or multipart/form-data with resume file)
router.post("/skill-gap", upload.single("resume"), analyzeSkillGapHandler);

module.exports = router;
