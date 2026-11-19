const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  evaluateResumeHandler,
  evaluateFileHandler,
  calculateJobMatchHandler,
  getMyEvaluationsHandler,
  getEvaluationByIdHandler,
} = require("../controllers/resumeEvaluationController");
const authMiddleware = require("../middleware/authMiddleware");

// Optional auth helper: populates req.user if token is present, but does not block if omitted
const optionalAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return next();
  try {
    const jwt = require("jsonwebtoken");
    const User = require("../models/User");
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : authHeader.trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user) req.user = user;
  } catch (e) {
    // Ignore invalid optional token
  }
  next();
};

// Public/authenticated evaluation routes
router.post("/evaluate", optionalAuth, evaluateResumeHandler);
router.post("/evaluate-file", optionalAuth, upload.single("resume"), evaluateFileHandler);
router.post("/job-match", calculateJobMatchHandler);

// Protected routes (requires login)
router.get("/my-evaluations", authMiddleware, getMyEvaluationsHandler);
router.get("/:id", optionalAuth, getEvaluationByIdHandler);

module.exports = router;
