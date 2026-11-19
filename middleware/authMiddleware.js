const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Checks if the user is logged in/authenticated.
// Simple, straightforward authentication without in-memory cache.
// Each request validates the token and fetches user from DB.
// This ensures role changes, password updates, and user deletions take effect immediately.
// Cache would introduce staleness and security risks (blocked users can access until TTL expires).
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7).trim()
      : authHeader.trim();

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user - no cache, always fresh from DB
    // This ensures immediate effect of role changes, deletions, etc.
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
