const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    console.log("\n=== AUTH MIDDLEWARE ===");
    console.log(
      "Cookies received:",
      req.cookies ? Object.keys(req.cookies) : "NONE",
    );

    // Try to get token from cookie first (primary method)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log("✓ Token found in cookie");
    }
    // Fallback: Check Authorization header (for backward compatibility or testing)
    else if (req.header("Authorization")) {
      const authHeader = req.header("Authorization");
      token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7).trim()
        : authHeader.trim();
      console.log("✓ Token found in Authorization header");
    }

    // No token found
    if (!token) {
      console.log("❌ No token found in cookie or header");
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✓ Token verified, user ID:", decoded.id);

    // Find user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("✓ User authenticated:", user.email);
    console.log("=== END AUTH MIDDLEWARE ===\n");

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.log("❌ AUTH ERROR:", error.message);
    console.log("=== END AUTH MIDDLEWARE ===\n");

    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
