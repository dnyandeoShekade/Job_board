const express = require("express");
const router = express.Router();

const {
  applyJob,
  getAllApplications,
  getUserApplications,
  submitApplication,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

// Submit application with resume upload (requires auth)
router.post(
  "/submit",
  authMiddleware,
  upload.single("resume"),
  submitApplication,
);

// Apply for a job (simple version)
router.post("/apply", authMiddleware, applyJob);

// Get logged-in user's applications
router.get("/me", authMiddleware, getUserApplications);

// All authenticated users can view all applications and update status
router.get("/", authMiddleware, getAllApplications);
router.patch("/:id", authMiddleware, updateApplicationStatus);

module.exports = router;

// This gives you:

// POST /api/applications/apply → Apply for a job (logged-in users)
// GET /api/applications/user/:userId → Get a user's applications
// GET /api/applications/ → Get all applications (admin only)
