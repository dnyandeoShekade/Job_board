const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

const getUserDashboard = async (req, res) => {
  try {
    console.log("\n=== DASHBOARD REQUEST ===");
    console.log("User from middleware:", req.user ? req.user._id : "NONE");

    const userId = req.user._id;

    // Get logged-in user
    const user = await User.findById(userId).select("-password");

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✓ User found:", user.email);

    // Get user's applications
    const applications = await Application.find({ userId })
      .populate("jobId", "title company location")
      .sort({ createdAt: -1 });

    console.log("✓ Applications found:", applications.length);

    // Calculate statistics
    const stats = {
      totalApplications: applications.length,

      savedJobs: Array.isArray(user.savedJobs) ? user.savedJobs.length : 0,

      reviewed: applications.filter((app) => app.status === "Reviewed").length,

      selected: applications.filter((app) => app.status === "Selected").length,

      rejected: applications.filter((app) => app.status === "Rejected").length,
    };

    // Recent applications
    const recentApplications = applications.slice(0, 5).map((application) => ({
      _id: application._id,
      jobId: application.jobId?._id,
      jobTitle: application.jobId?.title || "Unknown Job",
      company: application.jobId?.company || "Unknown Company",
      location: application.jobId?.location || "Unknown Location",
      status: application.status,
      appliedDate: application.createdAt,
    }));

    // Quick actions
    const quickActions = [
      {
        label: "Find Jobs",
        href: "/jobs",
      },
      {
        label: "My Applications",
        href: "/dashboard/applications",
      },
      {
        label: "Edit Profile",
        href: "/dashboard/profile",
      },
    ];

    console.log("✓ Dashboard data prepared successfully");
    console.log("=== END DASHBOARD REQUEST ===\n");

    return res.status(200).json({
      success: true,

      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profileImage: user.profileImage,
        },

        stats,

        recentApplications,

        quickActions,
      },
    });
  } catch (error) {
    console.error("❌ GET USER DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
const getAdminDashboard = async (req, res) => {
  try {
    const [totalUsers, totalJobs, totalApplications, activeJobs] =
      await Promise.all([
        User.countDocuments(),
        Job.countDocuments(),
        Application.countDocuments(),
        Job.countDocuments({ status: "Active" }),
      ]);

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalJobs,
          totalApplications,
          activeJobs,
        },
        recentApplications: [],
      },
    });
  } catch (error) {
    console.error("GET ADMIN DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = { getUserDashboard, getAdminDashboard };
