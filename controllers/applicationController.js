const Application = require("../models/Application");
const Job = require("../models/Job");

// Then rest of your code...

const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.body;

    const existingApplication = await Application.findOne({
      userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You already applied for this job",
      });
    }

    const application = await Application.create({
      userId,
      jobId,
    });

    res.status(201).json({
      success: true,
      message: "Job applied successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("userId")
      .populate("jobId");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// Show all jobs that a specific user has applied for.
// const getUserApplications = async (req, res) => {
//   try {
//     // get user ID from URL
//     const userId = req.params.userId;

//     // find applications Give me all applications where userId = 123
//     const applications = await Application.find({
//       userId,
//     }).populate("jobId"); //Get Job Details
//     // send response
//     res.status(200).json({
//       success: true,
//       count: applications.length,
//       applications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error ",
//       error: error.message,
//     });
//   }
// };
const getUserApplications = async (req, res) => {
  try {
    const userId = req.user._id;
    const applications = await Application.find({
      userId,
    }).populate("jobId"); // This requires Job model to be registered

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
// A user applies for a job.
const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { returnDocument: "after" },
    );
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "status updated successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Sever error",
      error: error.message,
    });
  }
};

// Submit Job Application
// const submitApplication = async (req, res) => {
//   try {
//     const { fullName, email, phone, coverLetter, resume, jobId } = req.body;

//     if (!jobId) {
//       return res.status(400).json({
//         success: false,
//         message: "jobId is required",
//       });
//     }

//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({
//         success: false,
//         message: "Job not found",
//       });
//     }

//     const application = await Application.create({
//       fullName,
//       email,
//       phone,
//       coverLetter,
//       resume,
//       job: jobId,
//       userId: req.user?._id, // only if you have auth middleware; otherwise remove
//       status: "Pending",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Application submitted successfully",
//       application,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const submitApplication = async (req, res) => {
  try {
    console.log("\n=== SUBMIT APPLICATION DEBUG ===");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    console.log("req.user:", req.user);

    const { fullName, email, phone, coverLetter, jobId } = req.body;
    const resumePath = req.file ? req.file.path : null;

    // Validate required fields
    if (!fullName || !email || !phone || !jobId) {
      return res.status(400).json({
        success: false,
        message: "fullName, email, phone, and jobId are required",
      });
    }

    if (!resumePath) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    console.log("✅ Job found:", job.title);

    // Get userId from authenticated user (if auth middleware is used)
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required",
      });
    }

    // Check for duplicate application
    const existingApplication = await Application.findOne({
      userId,
      jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      userId,
      jobId,
      fullName,
      email,
      phone,
      coverLetter: coverLetter || "",
      resume: resumePath,
      status: "Applied",
    });

    console.log("✅ Application created successfully");
    console.log("=== END DEBUG ===\n");

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log("❌ Error:", error.message);
    console.log("=== END DEBUG ===\n");

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  applyJob,
  getAllApplications,
  getUserApplications,
  updateApplicationStatus, //A user applies for a job.
  submitApplication,
};
