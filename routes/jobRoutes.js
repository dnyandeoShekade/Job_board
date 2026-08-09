// const express = require("express");
// const router = express.Router();

// const {
//   createJob,
//   getALlJobs,
//   getSingleJob,
//   updateJob,
//   deleteJob,
//   saveJob,
//   getSavedJobs,
//   removeSavedJob,
//   getJobApplication,
// } = require("../controllers/jobController");
// const adminOnly = require("../middleware/adminMiddleware");
// const authMiddleware = require("../middleware/authMiddleware");

// // Add Job Route

// router.get("/", getALlJobs);

// // router.get("/:slug", getSingleJob);

// // router.put("/:id", updateJob);

// // router.delete("/:id",deleteJob);
// // router.post("/create",adminOnly,createJob);

// // Protected routes
// router.post("/", authMiddleware, adminOnly, createJob);
// router.put("/:id", authMiddleware, adminOnly, updateJob);
// router.delete("/:id", authMiddleware, adminOnly, deleteJob);
// router.post(
//   "/save/:jobId",
//   authMiddleware,
//   saveJob
// );
// router.get("/saved", authMiddleware, getSavedJobs);
// router.delete(
//   "/save/:jobId",
//   authMiddleware,
//   removeSavedJob
// );

// router.get("/:slug/apply", getJobApplication);
// router.get("/:slug", getSingleJob); // 👈 Job Detail Page API

// module.exports = router;
const express = require("express");
const router = express.Router();

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
// const { adminMiddleware } = require("../middleware/adminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const uploadLogo = require("../middleware/uploadLogo");
const adminOnly = require("../middleware/adminMiddleware");

// --- Specific/static routes FIRST ---
router.get("/saved", authMiddleware, getSavedJobs);
router.post("/save/:jobId", authMiddleware, saveJob);
router.delete("/save/:jobId", authMiddleware, removeSavedJob);

router.get("/", getALlJobs);
// router.post("/", authMiddleware, createJob); // Any authenticated user can create
router.post(
  "/",
  authMiddleware,
  adminOnly,
  uploadLogo.single("companyLogo"),
  createJob,
);
// --- Dynamic id-based routes ---
router.put("/:slug", authMiddleware, adminOnly, updateJob); // Any authenticated user can update
// router.delete("/:slug", authMiddleware, deleteJob);
router.delete("/:slug", authMiddleware, adminOnly, deleteJob);
// router.delete("/jobs/:slug", authMiddleware, adminOnly, deleteJob); // Any authenticated user can delete

// --- Slug-based routes LAST (most generic) ---
router.get("/:slug/apply", getJobApplication);
router.get("/:slug", getSingleJob); // 👈 Job Detail Page API

module.exports = router;
