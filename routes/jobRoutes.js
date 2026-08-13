
const express = require("express");
const router = express.Router();
// app.use(express.json());
// app.use("/api/jobs", jobRoutes);
const {
  createJob,
  getALlJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  saveJob,
  getSavedJobs,
  removeSavedJob,
  getJobApplication,
} = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// --- Specific/static routes FIRST ---
router.get("/saved", authMiddleware, getSavedJobs);
router.post("/save/:jobId", authMiddleware, saveJob);
router.delete("/save/:jobId", authMiddleware, removeSavedJob);

router.get("/", getALlJobs);
router.post("/", authMiddleware, adminOnly, createJob);
// --- Dynamic id-based routes ---
router.put("/:slug", authMiddleware, adminOnly, updateJob); // Any authenticated user can update
router.delete("/:slug", authMiddleware, adminOnly, deleteJob);

// --- Slug-based routes LAST (most generic) ---
router.get("/:slug/apply", getJobApplication);
router.get("/:slug", getSingleJob); // 👈 Job Detail Page API

module.exports = router;
