const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getUserDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/user", authMiddleware, getUserDashboard);
router.get("/admin", authMiddleware, adminOnly, getAdminDashboard);

module.exports = router;
