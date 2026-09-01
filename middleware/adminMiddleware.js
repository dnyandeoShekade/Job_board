// Checks if the logged-in user is an admin.
const adminOnly = (req, res, next) => {
  // Check if logged-in user is admin
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  // Continue to next middleware
  next();
};


module.exports = adminOnly;
// Its purpose is to check whether the user is an admin before allowing access to certain routes.
