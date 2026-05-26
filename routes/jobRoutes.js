const express = require("express");

const {
  createJob,
  getALlJobs,
  getSingleJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

// Add Job Route

router.post("/create", createJob);

router.get("/", getALlJobs);

router.get("/:id", getSingleJob);

router.put("/:id", updateJob);

router.delete("/:id",deleteJob);

module.exports = router;
