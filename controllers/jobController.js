
const Job = require("../models/Job");
const slugify = require("slugify");
const User = require("../models/User");

// Add new job
const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description, category } = req.body;

    const job = await Job.create({
      title,
      slug: slugify(title, { lower: true, strict: true }),
      company,
      location,
      salary,
      description,
      category,
    });

    res.status(201).json({
      success: true,
      message: "job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const getALlJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const location = req.query.location || "";
    const category = req.query.category || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const jobs = await Job.find({
      title: { $regex: keyword, $options: "i" },
      location: { $regex: location, $options: "i" },
      category: { $regex: category, $options: "i" },
    })
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments();

    res.status(200).json({
      success: true,
      count: jobs.length,
      totalJobs,
      page,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error", error: error.message });
  }
};

// ---- JOB DETAIL PAGE API (by slug) ----
const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Optional: view count increment (matches "Views" shown on frontend)
    job.views = (job.views || 0) + 1;
    await job.save();

    res.status(200).json({
      success: true,
      data: job, // frontend JobDetails expects `job.data` from getJobBySlugData -> ensure service returns data:job
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, message: "job updated successfully", updatedJob });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ success: false, message: "job not found" });
    }

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const jobId = req.params.jobId;

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ success: false, message: "Job already saved" });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({ success: true, message: "Job saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedJobs");

    res.status(200).json({
      success: true,
      count: user.savedJobs.length,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { jobId } = req.params;

    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    res.status(200).json({ success: true, message: "Saved job removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Apply page data (job + support info)
const getJobApplication = async (req, res) => {
  try {
    const { slug } = req.params;
    const job = await Job.findOne({ slug });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({
      success: true,
      data: {
        job,
        support: {
          email: "support@jobportal.com",
          phone: "+91 9876543210",
          hours: "Mon - Fri, 9AM - 6PM",
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createJob,
  getALlJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  saveJob,
  getSavedJobs,
  removeSavedJob,
  getJobApplication,
};