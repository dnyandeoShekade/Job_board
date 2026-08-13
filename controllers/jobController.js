const Job = require("../models/Job");
const slugify = require("slugify");
const User = require("../models/User");

// Add new job
// const createJob = async (req, res) => {
//   try {
//     const { title, company, location, salary, description, category } = req.body;

//     const job = await Job.create({
//       title,
//       slug: slugify(title, { lower: true, strict: true }),
//       company,
//       location,
//       salary,
//       description,
//       category,
//     });

//     res.status(201).json({
//       success: true,
//       message: "job created successfully",
//       job,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      category,
      description,
      companyLogo,
      experience,
      jobType,
    } = req.body;

    if (
      (!title,
      !company,
      !location,
      !salary,
      !category,
      !description,
      !companyLogo,
      !experience,
      !jobType)
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const slug = `${title}-${company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    // const companyLogo = req.file
    //   ? `/uploads/company-logos/${req.file.filename}`
    //   : "";
    const job = await Job.create({
      title,
      slug,
      company,
      location,
      salary,
      category,
      experience,
      jobType,
      description,
      companyLogo: companyLogo || "",
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const getALlJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const location = req.query.location || "";
    const category = req.query.category || "";

    const jobs = await Job.find({
      title: { $regex: keyword, $options: "i" },
      location: { $regex: location, $options: "i" },
      category: { $regex: category, $options: "i" },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      totalJobs: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error.message,
    });
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
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { slug } = req.params;
    const job = await Job.findOne({ slug });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    const { title, company, location, salary, category, description, status } =
      req.body;
    const updatedJob = await Job.findByIdAndUpdate(
      job._id,
      {
        title,
        company,
        location,
        salary,
        category,
        description,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedJob = await Job.findOneAndDelete({ slug });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const saveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const jobId = req.params.jobId;

    if (user.savedJobs.includes(jobId)) {
      return res
        .status(400)
        .json({ success: false, message: "Job already saved" });
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
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

const removeSavedJob = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { jobId } = req.params;

    user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Saved job removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
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
